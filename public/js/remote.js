// Logic Smartphone Remote Controller (Browser Mobile) - ALMERA
document.addEventListener('DOMContentLoaded', () => {
  const socket = io();

  const connIndicator = document.getElementById('conn-indicator');
  const roomCodeText = document.getElementById('room-code-text');
  const roomPillBtn = document.getElementById('room-pill-btn');
  const btnThemeToggle = document.getElementById('btn-theme-toggle');
  const themeIcon = document.getElementById('theme-icon');
  const themeLabel = document.getElementById('theme-label');
  const wakelockStatus = document.getElementById('wakelock-status');
  const remoteTimer = document.getElementById('remote-timer');
  const remoteSlideNum = document.getElementById('remote-slide-num');
  const remoteSlideTitle = document.getElementById('remote-slide-title');
  const substepDots = document.getElementById('substep-dots');
  const btnPrev = document.getElementById('btn-prev');
  const btnNext = document.getElementById('btn-next');
  const disconnectOverlay = document.getElementById('disconnect-overlay');
  const reconnectingBox = document.getElementById('reconnecting-box');
  const roomInputCard = document.getElementById('room-input-card');
  const formManualRoom = document.getElementById('form-manual-room');
  const manualRoomInput = document.getElementById('manual-room-input');
  const btnManualJoin = document.getElementById('btn-manual-join');
  const roomJoinError = document.getElementById('room-join-error');

  // Ambil roomId dari parameter URL
  const urlParams = new URLSearchParams(window.location.search);
  let currentRoomId = (urlParams.get('room') || 'ALMERA').trim().toUpperCase();
  let currentTheme = 'dark';

  roomCodeText.innerText = currentRoomId;

  let lastActionTime = 0;
  let wakeLock = null;
  let hasAlerted8Min = false;

  // ==========================================================
  // 1. OVERLAY & RESILIENCE HELPERS (R-34)
  // ==========================================================
  function showReconnecting(title = 'Koneksi Terputus', desc = 'Mencoba menghubungkan ulang ke proyektor...') {
    if (disconnectOverlay) disconnectOverlay.classList.add('active');
    if (reconnectingBox) reconnectingBox.style.display = 'block';
    if (roomInputCard) roomInputCard.style.display = 'none';
    const t = document.getElementById('disconnect-title');
    const d = document.getElementById('disconnect-desc');
    if (t) t.innerText = title;
    if (d) d.innerText = desc;
  }

  function showRoomInputCard(errorMsg = '') {
    if (disconnectOverlay) disconnectOverlay.classList.add('active');
    if (reconnectingBox) reconnectingBox.style.display = 'none';
    if (roomInputCard) roomInputCard.style.display = 'block';
    if (manualRoomInput) {
      manualRoomInput.value = currentRoomId;
      setTimeout(() => manualRoomInput.focus(), 120);
    }
    if (roomJoinError) {
      if (errorMsg) {
        roomJoinError.innerText = errorMsg;
        roomJoinError.style.display = 'block';
      } else {
        roomJoinError.style.display = 'none';
      }
    }
  }

  function hideOverlay() {
    if (disconnectOverlay) disconnectOverlay.classList.remove('active');
    if (roomInputCard) roomInputCard.style.display = 'none';
    if (reconnectingBox) reconnectingBox.style.display = 'block';
  }

  function joinRoom(targetRoomId) {
    if (!targetRoomId) return;
    currentRoomId = targetRoomId.trim().toUpperCase();
    roomCodeText.innerText = currentRoomId;
    showReconnecting('Menghubungkan...', `Mencoba bergabung ke room ${currentRoomId}...`);

    socket.emit('room:join', { roomId: currentRoomId }, (res) => {
      if (res && res.success) {
        hideOverlay();
        connIndicator.classList.remove('offline');
        updateUIState(res.state);

        // Perbarui query parameter di address bar tanpa reload
        try {
          const newUrl = new URL(window.location.href);
          newUrl.searchParams.set('room', currentRoomId);
          window.history.replaceState({}, '', newUrl.toString());
        } catch (e) {}
      } else {
        connIndicator.classList.add('offline');
        const reason = (res && res.message) ? res.message : 'Room tidak ditemukan';
        showRoomInputCard(`${reason}. Pastikan presenter sudah aktif dan masukkan kode room yang sesuai.`);
      }
    });
  }

  // Event listener manual input room fallback
  if (formManualRoom) {
    formManualRoom.addEventListener('submit', (e) => {
      e.preventDefault();
      const code = manualRoomInput.value.trim().toUpperCase();
      if (code) joinRoom(code);
    });
  }

  if (btnManualJoin) {
    btnManualJoin.addEventListener('click', (e) => {
      e.preventDefault();
      const code = manualRoomInput.value.trim().toUpperCase();
      if (code) joinRoom(code);
    });
  }

  if (roomPillBtn) {
    roomPillBtn.addEventListener('click', () => {
      showRoomInputCard('');
    });
    roomPillBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        showRoomInputCard('');
      }
    });
  }

  // ==========================================================
  // 2. SCREEN WAKE LOCK API (Layar Tidak Mati)
  // ==========================================================
  async function enableWakeLock() {
    try {
      if ('wakeLock' in navigator) {
        wakeLock = await navigator.wakeLock.request('screen');
        wakelockStatus.style.display = 'flex';
        
        wakeLock.addEventListener('release', () => {
          console.log('Screen Wake Lock dilepas.');
        });
      }
    } catch (err) {
      console.warn('Wake Lock error:', err);
    }
  }

  document.addEventListener('visibilitychange', async () => {
    if (wakeLock !== null && document.visibilityState === 'visible') {
      await enableWakeLock();
    }
  });

  enableWakeLock();

  // ==========================================================
  // 3. HAPTIC FEEDBACK (Getaran Halus)
  // ==========================================================
  function triggerHaptic(duration = 45) {
    if ('vibrate' in navigator) {
      try {
        navigator.vibrate(duration);
      } catch (e) {
        // Fallback jika ditolak izin
      }
    }
  }

  // ==========================================================
  // 4. SOCKET.IO PAIRING & SYNC
  // ==========================================================
  socket.on('connect', () => {
    joinRoom(currentRoomId);
  });

  socket.on('disconnect', () => {
    connIndicator.classList.add('offline');
    showReconnecting('Koneksi Terputus', 'Mencoba menghubungkan ulang ke proyektor...');
  });

  socket.on('sync:state', (state) => {
    updateUIState(state);
    if (state && state.theme) {
      applyTheme(state.theme);
    }
  });

  socket.on('slide:sync', (state) => {
    updateUIState(state);
  });

  socket.on('theme:sync', ({ theme }) => {
    applyTheme(theme);
  });

  function applyTheme(theme) {
    currentTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (document.body) {
      document.body.classList.toggle('theme-light', currentTheme === 'light');
    }

    if (themeIcon && themeLabel) {
      if (currentTheme === 'light') {
        themeIcon.className = 'ri-sun-line';
        themeLabel.innerText = 'Light';
      } else {
        themeIcon.className = 'ri-moon-line';
        themeLabel.innerText = 'Dark';
      }
    }
  }

  if (btnThemeToggle) {
    btnThemeToggle.addEventListener('click', (e) => {
      e.preventDefault();
      triggerHaptic(40);
      socket.emit('action:theme-toggle', { roomId: currentRoomId });
    });
  }

  socket.on('timer:sync', ({ stopwatchSeconds }) => {
    const mins = Math.floor(stopwatchSeconds / 60);
    const secs = stopwatchSeconds % 60;
    remoteTimer.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    remoteTimer.classList.remove('stage-amber', 'stage-coral');
    if (mins >= 8) {
      remoteTimer.classList.add('stage-coral');
      if (!hasAlerted8Min) {
        triggerHaptic([60, 40, 60]); // Getar peringatan 8 menit
        hasAlerted8Min = true;
      }
    } else if (mins >= 5) {
      remoteTimer.classList.add('stage-amber');
    }
  });

  function updateUIState(state) {
    if (!state) return;
    const cur = String(state.currentSlide).padStart(2, '0');
    const tot = String(state.totalSlides).padStart(2, '0');
    remoteSlideNum.innerText = `Slide ${cur} / ${tot}`;

    if (remoteSlideTitle && state.slideTitle) {
      remoteSlideTitle.innerText = state.slideTitle;
    }

    const steps = state.totalStepsForSlide || 0;
    const step = state.currentStep || 0;

    if (substepDots) {
      substepDots.innerHTML = '';
      if (steps > 0) {
        for (let i = 1; i <= steps; i++) {
          const dot = document.createElement('span');
          dot.className = `step-dot ${i <= step ? 'active' : ''} ${i === step ? 'current' : ''}`;
          substepDots.appendChild(dot);
        }
      }
    }
  }

  // ==========================================================
  // 5. ACTION DISPATCH WITH ANTI-DOUBLE-TAP
  // ==========================================================
  function handleNext(e) {
    if (e) e.preventDefault();
    const now = Date.now();
    if (now - lastActionTime < 180) return; // Anti-spam 180ms
    lastActionTime = now;

    triggerHaptic(50);
    socket.emit('action:next', { roomId: currentRoomId });
  }

  function handlePrev(e) {
    if (e) e.preventDefault();
    const now = Date.now();
    if (now - lastActionTime < 180) return;
    lastActionTime = now;

    triggerHaptic(30);
    socket.emit('action:prev', { roomId: currentRoomId });
  }

  // Pointerdown untuk latensi tercepat (<10ms)
  btnNext.addEventListener('pointerdown', handleNext);
  btnPrev.addEventListener('pointerdown', handlePrev);
  
  // Keyboard support untuk testing / accessible remote
  btnNext.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handleNext(e);
    }
  });
  btnPrev.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      handlePrev(e);
    }
  });
});
