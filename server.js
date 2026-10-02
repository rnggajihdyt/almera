const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const qrcode = require('qrcode');
const os = require('os');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

const PORT = process.env.PORT || 3005;

// Helper: Deteksi IP Wi-Fi / LAN Lokal Laptop (Prioritaskan kartu jaringan fisik)
function getLocalIpAddress() {
  const interfaces = os.networkInterfaces();
  let fallbackCandidate = null;

  for (const name of Object.keys(interfaces)) {
    const isVirtual = /vEthernet|WSL|Virtual|VMware|Pseudo|Hyper-V|Loopback/i.test(name);
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        if (!isVirtual) {
          // Kartu jaringan fisik asli (Wi-Fi / Ethernet)
          return iface.address;
        }
        if (!fallbackCandidate) {
          fallbackCandidate = iface.address;
        }
      }
    }
  }
  return fallbackCandidate || 'localhost';
}

app.use(express.static(path.join(__dirname, 'public')));

// Routing
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/remote', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'remote.html'));
});

// In-Memory Rooms State
const rooms = new Map();

io.on('connection', (socket) => {
  // Inisialisasi Room Presenter (Laptop)
  socket.on('room:create', async ({ totalSlides, slideSteps, slideTitles, clientOrigin }, callback) => {
    const roomId = 'ALMERA-' + Math.random().toString(36).substring(2, 6).toUpperCase();
    socket.join(roomId);

    let baseUrl;
    if (clientOrigin && !clientOrigin.includes('localhost') && !clientOrigin.includes('127.0.0.1')) {
      baseUrl = clientOrigin;
    } else {
      const localIp = getLocalIpAddress();
      baseUrl = `http://${localIp}:${PORT}`;
    }
    const remoteUrl = `${baseUrl}/remote?room=${roomId}`;

    let qrDataUrl = '';
    try {
      qrDataUrl = await qrcode.toDataURL(remoteUrl, {
        margin: 1,
        color: {
          dark: '#473C33',
          light: '#F2F2F2'
        },
        width: 260
      });
    } catch (err) {
      console.error('Error generating QR:', err);
    }

    const roomState = {
      roomId,
      presenterSocketId: socket.id,
      remoteSocketId: null,
      currentSlide: 1,
      currentStep: 0,
      totalSlides: totalSlides || 13,
      slideSteps: slideSteps || {},
      slideTitles: slideTitles || [],
      stopwatchSeconds: 0,
      isTimerRunning: true,
      theme: 'dark',
      remoteUrl,
      qrDataUrl
    };

    rooms.set(roomId, roomState);

    if (typeof callback === 'function') {
      callback({
        success: true,
        roomId,
        remoteUrl,
        qrDataUrl,
        state: roomState
      });
    }

    console.log(`[Room Created] ${roomId} by ${socket.id} (Remote URL: ${remoteUrl})`);
  });

  // Mobile Remote Join Room
  socket.on('room:join', ({ roomId }, callback) => {
    const room = rooms.get(roomId);
    if (!room) {
      if (typeof callback === 'function') {
        callback({ success: false, message: 'Room tidak ditemukan' });
      }
      return;
    }

    socket.join(roomId);
    room.remoteSocketId = socket.id;

    // Beritahu presenter bahwa remote terhubung
    io.to(room.presenterSocketId).emit('remote:status', { connected: true });

    const response = {
      success: true,
      state: {
        currentSlide: room.currentSlide,
        currentStep: room.currentStep,
        totalSlides: room.totalSlides,
        slideTitle: (room.slideTitles && room.slideTitles[room.currentSlide - 1]) || '',
        totalStepsForSlide: (room.slideSteps && room.slideSteps[room.currentSlide]) || 0,
        stopwatchSeconds: room.stopwatchSeconds,
        isTimerRunning: room.isTimerRunning,
        theme: room.theme || 'dark'
      }
    };

    if (typeof callback === 'function') {
      callback(response);
    }

    socket.emit('sync:state', response.state);
    socket.emit('theme:sync', { theme: room.theme || 'dark' });
    console.log(`[Remote Joined] Phone ${socket.id} paired to room ${roomId} (Theme: ${room.theme || 'dark'})`);
  });

  // Perintah Navigasi NEXT
  socket.on('action:next', ({ roomId }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    const maxStepsForCurrentSlide = (room.slideSteps && room.slideSteps[room.currentSlide]) || 0;

    // Cek apakah slide saat ini masih memiliki sub-step (item/grid) yang belum di-reveal
    if (room.currentStep < maxStepsForCurrentSlide) {
      room.currentStep += 1;
    } else {
      // Jika semua sub-step sudah selesai, pindah ke slide berikutnya
      if (room.currentSlide < room.totalSlides) {
        room.currentSlide += 1;
        room.currentStep = 0;
      }
    }

    broadcastSlideState(room);
  });

  // Perintah Navigasi PREV
  socket.on('action:prev', ({ roomId }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    if (room.currentStep > 0) {
      room.currentStep -= 1;
    } else {
      if (room.currentSlide > 1) {
        room.currentSlide -= 1;
        const prevSlideMaxSteps = (room.slideSteps && room.slideSteps[room.currentSlide]) || 0;
        room.currentStep = prevSlideMaxSteps;
      }
    }

    broadcastSlideState(room);
  });

  // Perintah GOTO Slide
  socket.on('action:goto', ({ roomId, slideIndex }) => {
    const room = rooms.get(roomId);
    if (!room) return;

    if (slideIndex >= 1 && slideIndex <= room.totalSlides) {
      room.currentSlide = slideIndex;
      room.currentStep = 0;
      broadcastSlideState(room);
    }
  });

  // Perintah GOTO Sub-step Spesifik
  socket.on('action:step', ({ roomId, step }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    const maxSteps = (room.slideSteps && room.slideSteps[room.currentSlide]) || 0;
    if (step >= 0 && step <= maxSteps) {
      room.currentStep = step;
      broadcastSlideState(room);
    }
  });

  // Stopwatch Controls
  socket.on('timer:toggle', ({ roomId }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    room.isTimerRunning = !room.isTimerRunning;
    io.to(room.roomId).emit('timer:sync', {
      stopwatchSeconds: room.stopwatchSeconds,
      isTimerRunning: room.isTimerRunning
    });
  });

  socket.on('timer:reset', ({ roomId }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    room.stopwatchSeconds = 0;
    io.to(room.roomId).emit('timer:sync', {
      stopwatchSeconds: room.stopwatchSeconds,
      isTimerRunning: room.isTimerRunning
    });
  });

  // Theme Controls (Realtime Remote & Keyboard Theme Sync)
  socket.on('action:theme-toggle', ({ roomId }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    room.theme = room.theme === 'light' ? 'dark' : 'light';
    io.to(room.roomId).emit('theme:sync', { theme: room.theme });
    console.log(`[Theme Changed] Room ${roomId} switched to ${room.theme}`);
  });

  socket.on('action:theme-set', ({ roomId, theme }) => {
    const room = rooms.get(roomId);
    if (!room) return;
    room.theme = theme === 'light' ? 'light' : 'dark';
    io.to(room.roomId).emit('theme:sync', { theme: room.theme });
    console.log(`[Theme Changed] Room ${roomId} explicitly set to ${room.theme}`);
  });

  // Disconnect
  socket.on('disconnect', () => {
    for (const [roomId, room] of rooms.entries()) {
      if (room.remoteSocketId === socket.id) {
        room.remoteSocketId = null;
        io.to(room.presenterSocketId).emit('remote:status', { connected: false });
        console.log(`[Remote Disconnected] from room ${roomId}`);
      }
    }
  });
});

// Helper Broadcast Slide State
function broadcastSlideState(room) {
  const payload = {
    currentSlide: room.currentSlide,
    currentStep: room.currentStep,
    totalSlides: room.totalSlides,
    slideTitle: (room.slideTitles && room.slideTitles[room.currentSlide - 1]) || '',
    totalStepsForSlide: (room.slideSteps && room.slideSteps[room.currentSlide]) || 0
  };
  io.to(room.roomId).emit('slide:sync', payload);
}

// Global Stopwatch Ticker per detik
setInterval(() => {
  for (const [, room] of rooms.entries()) {
    if (room.isTimerRunning) {
      room.stopwatchSeconds += 1;
      io.to(room.roomId).emit('timer:sync', {
        stopwatchSeconds: room.stopwatchSeconds,
        isTimerRunning: room.isTimerRunning
      });
    }
  }
}, 1000);

server.listen(PORT, () => {
  const localIp = getLocalIpAddress();
  console.log(`\n==================================================`);
  console.log(`🚀 ALMERA Web Slide Presenter Server Aktif!`);
  console.log(`💻 Laptop Presenter View : http://localhost:${PORT}`);
  console.log(`📱 Local Wi-Fi Access   : http://${localIp}:${PORT}`);
  console.log(`==================================================\n`);
});
