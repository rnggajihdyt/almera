// Logic Presenter View (Laptop) - ALMERA
document.addEventListener('DOMContentLoaded', () => {
  const socket = typeof io !== 'undefined' ? io({ autoConnect: true, reconnectionAttempts: 2, timeout: 2000 }) : null;
  const slideCanvas = document.getElementById('slide-canvas');
  const slideWrapper = document.getElementById('slide-wrapper');
  const timerDisplay = document.getElementById('timer-display');
  const timerPill = document.getElementById('timer-pill');
  const slideCounter = document.getElementById('slide-counter');
  const progressFill = document.getElementById('progress-fill');
  const statusDot = document.getElementById('status-dot');
  const statusText = document.getElementById('status-text');
  const qrModal = document.getElementById('qr-modal');
  const qrImg = document.getElementById('qr-img');
  const remoteUrlText = document.getElementById('remote-url-text');
  const btnQrModal = document.getElementById('btn-qr-modal');
  const btnCloseModal = document.getElementById('btn-close-modal');
  const btnFullscreen = document.getElementById('btn-fullscreen');
  const remoteStatusBtn = document.getElementById('remote-status-btn');
  const overviewOverlay = document.getElementById('overview-overlay');
  const overviewGrid = document.getElementById('overview-grid');

  let overviewBuilt = false;

  let currentRoomId = null;
  let currentSlide = 1;
  let currentStep = 0;
  const totalSlides = SLIDES_DATA.length;

  // Bangun map subSteps & judul per slide berbasis indeks urutan 1..N
  const slideStepsMap = {};
  const slideTitles = [];
  SLIDES_DATA.forEach((s, index) => {
    slideStepsMap[index + 1] = s.subSteps || 0;
    slideTitles.push(s.title || `Slide ${index + 1}`);
  });

  // ==========================================================
  // 1. AUTO-SCALING 16:9 CANVAS RESOLUTION
  // ==========================================================
  function resizeCanvas() {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    slideCanvas.style.transform = `scale(${scale})`;
    if (overviewOverlay.classList.contains('active')) scaleOverview();
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // ==========================================================
  // 2. SOCKET.IO ROOM INITIALIZATION & PAIRING
  // ==========================================================
  // ==========================================================
  // 2. PAIRING & REALTIME SYNC (WebRTC PeerJS + Socket.io Fallback)
  // ==========================================================
  const peerConnections = new Set();
  let stopwatchSeconds = 0;
  let isTimerRunning = true;

  // Generate Room ID acak jika belum ada
  if (!currentRoomId) {
    currentRoomId = 'ALMERA-' + Math.random().toString(36).substring(2, 6).toUpperCase();
  }

  function getSlidePayload() {
    return {
      currentSlide,
      currentStep,
      totalSlides,
      slideTitle: (slideTitles && slideTitles[currentSlide - 1]) || '',
      totalStepsForSlide: slideStepsMap[currentSlide] || 0
    };
  }

  function broadcastSlideSync() {
    const payload = { type: 'slide:sync', state: getSlidePayload() };
    for (const conn of peerConnections) {
      if (conn.open) {
        try { conn.send(payload); } catch (e) {}
      }
    }
  }

  function broadcastTimerSync(secs, running) {
    const payload = { type: 'timer:sync', stopwatchSeconds: secs, isTimerRunning: running };
    for (const conn of peerConnections) {
      if (conn.open) {
        try { conn.send(payload); } catch (e) {}
      }
    }
  }

  function broadcastThemeSync(th) {
    const payload = { type: 'theme:sync', theme: th };
    for (const conn of peerConnections) {
      if (conn.open) {
        try { conn.send(payload); } catch (e) {}
      }
    }
  }

  // Tampilkan QR Code pairing secara lokal di browser
  function setupLocalQRCode(roomId) {
    currentRoomId = roomId;
    const remoteUrl = `${window.location.origin}/remote?room=${currentRoomId}`;
    if (remoteUrlText) remoteUrlText.innerText = remoteUrl;

    const qrBox = document.querySelector('.qr-image-box');
    if (qrBox && typeof QRCode !== 'undefined') {
      qrBox.innerHTML = '';
      new QRCode(qrBox, {
        text: remoteUrl,
        width: 220,
        height: 220,
        colorDark: '#473C33',
        colorLight: '#F2F2F2',
        correctLevel: QRCode.CorrectLevel.M
      });
    }
  }

  setupLocalQRCode(currentRoomId);

  // Inisialisasi WebRTC PeerJS (Bekerja 100% tanpa server backend di Vercel)
  function initPresenterPeer() {
    if (typeof Peer === 'undefined') return;
    try {
      const peerId = currentRoomId.toLowerCase();
      const peer = new Peer(peerId);

      peer.on('open', (id) => {
        console.log('[WebRTC] Presenter peer aktif dengan ID:', id);
      });

      peer.on('connection', (conn) => {
        console.log('[WebRTC] Remote smartphone terhubung!');
        peerConnections.add(conn);
        statusDot.classList.add('connected');
        statusText.innerText = 'Remote HP Terhubung!';
        qrModal.classList.remove('active');

        conn.on('open', () => {
          conn.send({ type: 'sync:state', state: getSlidePayload() });
          conn.send({ type: 'theme:sync', theme: document.documentElement.getAttribute('data-theme') || 'dark' });
          conn.send({ type: 'timer:sync', stopwatchSeconds, isTimerRunning });
        });

        conn.on('data', (data) => {
          if (!data || !data.type) return;
          if (data.type === 'action:next') triggerNext();
          else if (data.type === 'action:prev') triggerPrev();
          else if (data.type === 'action:goto') {
            if (data.slideIndex) goToSlide(data.slideIndex);
          }
          else if (data.type === 'action:step') {
            if (typeof data.step === 'number') {
              currentStep = data.step;
              updateSubStep(currentStep);
              broadcastSlideSync();
            }
          }
          else if (data.type === 'action:theme-toggle') triggerThemeToggle();
          else if (data.type === 'timer:toggle') {
            isTimerRunning = !isTimerRunning;
            broadcastTimerSync(stopwatchSeconds, isTimerRunning);
          }
          else if (data.type === 'timer:reset') {
            stopwatchSeconds = 0;
            updateTimerHUD(0);
            broadcastTimerSync(0, isTimerRunning);
          }
        });

        conn.on('close', () => {
          peerConnections.delete(conn);
          if (peerConnections.size === 0) {
            statusDot.classList.remove('connected');
            statusText.innerText = 'Remote HP Terputus';
          }
        });

        conn.on('error', () => {
          peerConnections.delete(conn);
          if (peerConnections.size === 0) {
            statusDot.classList.remove('connected');
            statusText.innerText = 'Remote HP Terputus';
          }
        });
      });

      peer.on('error', (err) => {
        console.warn('[WebRTC] Notice:', err.type);
      });
    } catch (e) {
      console.warn('[WebRTC] Init notice:', e);
    }
  }

  initPresenterPeer();

  // Socket.io (Tetap aktif jika dijalankan dengan node server.js)
  if (socket) {
    socket.emit('room:create', { 
      totalSlides, 
      slideSteps: slideStepsMap, 
      slideTitles,
      clientOrigin: window.location.origin 
    }, (response) => {
      if (response && response.success) {
        currentRoomId = response.roomId;
        setupLocalQRCode(currentRoomId);
        console.log('Room Presenter berhasil dibuat via Socket:', currentRoomId);
      }
    });

    socket.on('remote:status', ({ connected }) => {
      if (connected) {
        statusDot.classList.add('connected');
        statusText.innerText = 'Remote HP Terhubung!';
        qrModal.classList.remove('active');
      } else if (peerConnections.size === 0) {
        statusDot.classList.remove('connected');
        statusText.innerText = 'Remote HP Terputus';
      }
    });

    socket.on('slide:sync', (state) => {
      const prevSlide = currentSlide;
      const prevStep = currentStep;
      currentSlide = state.currentSlide;
      currentStep = state.currentStep;

      if (currentSlide !== prevSlide) {
        const direction = currentSlide > prevSlide ? 'next' : 'prev';
        renderSlide(direction);
      } else if (currentStep !== prevStep) {
        updateSubStep(currentStep);
      }

      if (isOverviewOpen()) markCurrentOverview();
      broadcastSlideSync();
    });

    socket.on('theme:sync', ({ theme }) => {
      applyTheme(theme);
      broadcastThemeSync(theme);
    });

    socket.on('timer:sync', ({ stopwatchSeconds: totalSecs }) => {
      stopwatchSeconds = totalSecs;
      updateTimerHUD(stopwatchSeconds);
      broadcastTimerSync(stopwatchSeconds, isTimerRunning);
    });
  }

  function applyTheme(theme) {
    const targetTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    if (document.body) {
      document.body.classList.toggle('theme-light', targetTheme === 'light');
    }
  }

  // Stopwatch mandiri (aktif terus di laptop tanpa bergantung server)
  setInterval(() => {
    if (isTimerRunning) {
      stopwatchSeconds += 1;
      updateTimerHUD(stopwatchSeconds);
      broadcastTimerSync(stopwatchSeconds, isTimerRunning);
    }
  }, 1000);

  function updateTimerHUD(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    timerDisplay.innerText = formatted;

    timerPill.classList.remove('stage-amber', 'stage-coral');
    if (mins >= 8) {
      timerPill.classList.add('stage-coral');
    } else if (mins >= 5) {
      timerPill.classList.add('stage-amber');
    }
  }

  // ==========================================================
  // 3. SLIDE RENDERER & INTERACTIVE WIDGETS
  // ==========================================================
  function renderSlide(direction = 'none') {
    const slideData = SLIDES_DATA[currentSlide - 1];
    if (!slideData) return;

    // Animasi pergantian slide
    slideWrapper.className = 'slide-wrapper';
    if (direction === 'next') slideWrapper.classList.add('slide-entering-next');
    if (direction === 'prev') slideWrapper.classList.add('slide-entering-prev');

    // Render HTML slide
    slideWrapper.innerHTML = slideData.render(currentStep);

    // Sinkronkan status sub-item in-place
    updateSubStep(currentStep);

    // Update Counter & Progress Bar
    slideCounter.innerText = `${String(currentSlide).padStart(2, '0')} / ${String(totalSlides).padStart(2, '0')}`;
    const progressPercent = (currentSlide / totalSlides) * 100;
    progressFill.style.width = `${progressPercent}%`;

    // Inisialisasi widget interaktif jika ada di slide saat ini
    if (currentSlide === 10) {
      setupFinancialPillarsClick();
    } else if (currentSlide === 11) {
      setupPriceCalculator();
    }
  }

  // Pembaruan granular elemen sub-step tanpa re-render keseluruhan DOM
  // root_opsional: thumbnail overview memakai akar sendiri agar conditions
  // reveal identik dengan slide sungguhan pada step yang sama.
  function updateSubStep(step, root = slideWrapper) {
    // 1. Slide 6 Cinematic Multi-Phase Morphing
    const slide6 = root.querySelector('.slide-logo-cinematic');
    if (slide6) {
      slide6.setAttribute('data-phase', step);

      const s6Header = slide6.querySelector('.s6-header');
      if (s6Header) {
        s6Header.classList.toggle('header-docked-out', step >= 2);
      }

      const pointCards = slide6.querySelectorAll('.s6-point-card');
      pointCards.forEach((card) => {
        const pNum = parseInt(card.getAttribute('data-point'), 10);
        // Point 1 corresponds to step 2, Point 2 to step 3, etc.
        const requiredStep = pNum + 1;

        if (step >= requiredStep) {
          card.classList.add('revealed');
        } else {
          card.classList.remove('revealed');
        }

        if (step === requiredStep) {
          card.classList.add('focus-active');
        } else {
          card.classList.remove('focus-active');
        }
      });
    }

    // 2. Slide 10 Cinematic Financial Morphing
    const slide10 = root.querySelector('.slide-financial-cinematic');
    if (slide10) {
      slide10.setAttribute('data-phase', step);

      const s10Header = slide10.querySelector('.s10-header');
      if (s10Header) {
        s10Header.classList.toggle('header-docked-out', step >= 1);
      }

      const dockBackBtn = slide10.querySelector('.s10-dock-back-btn');
      if (dockBackBtn) {
        dockBackBtn.classList.toggle('visible', step >= 1);
      }

      const s10Pillars = slide10.querySelectorAll('.s10-nav-pillar');
      s10Pillars.forEach((pillar) => {
        const pStep = parseInt(pillar.getAttribute('data-step'), 10);
        const isActive = step === pStep;
        const isPassed = step > pStep;
        pillar.classList.toggle('active-pillar', isActive);
        pillar.classList.toggle('passed-pillar', isPassed);
        const icon = pillar.querySelector('.p-status i');
        if (icon) {
          if (isActive) {
            icon.className = 'ri-arrow-right-line';
          } else if (isPassed) {
            icon.className = 'ri-check-line';
          } else {
            icon.className = 'ri-arrow-right-s-line';
          }
        }
      });

      const focusPanels = slide10.querySelectorAll('.s10-focus-panel');
      focusPanels.forEach((panel) => {
        const panelStep = parseInt(panel.getAttribute('data-step'), 10);
        panel.classList.toggle('panel-active', step === panelStep);
      });
    }

    // 3. Standard .sub-item elements on other slides
    const subItems = root.querySelectorAll('.sub-item');
    subItems.forEach((el) => {
      const itemStep = parseInt(el.getAttribute('data-step'), 10) || 1;
      const isCardWithFocus = el.matches('.team-card, .problem-card, .catalog-card, .feature-box, .promo-card, .bep-panel');

      if (step >= itemStep) {
        el.classList.add('revealed');
      } else {
        el.classList.remove('revealed');
      }

      if (isCardWithFocus && step === itemStep && step > 0) {
        el.classList.add('focus-active');
      } else {
        el.classList.remove('focus-active');
      }
    });

    // 4. Spotlight Modal Overlay untuk Masalah #5 di Slide 3
    const spotlightOverlay = root.querySelector('.problem-spotlight-overlay');
    if (spotlightOverlay) {
      spotlightOverlay.classList.toggle('active', step === 5);
    }
  }

  // Interaktivitas Tab Pilar Finansial Slide 10
  function setupFinancialPillarsClick() {
    const slide10 = slideWrapper.querySelector('.slide-financial-cinematic');
    if (!slide10) return;

    const navigateToStep = (targetStep) => {
      if (currentRoomId && socket.connected) {
        socket.emit('action:step', { roomId: currentRoomId, step: targetStep });
      } else {
        currentStep = targetStep;
        updateSubStep(currentStep);
      }
    };

    // 1. Klik & Keydown pada 4 Tab Pilar
    const pillars = slide10.querySelectorAll('.s10-nav-pillar');
    pillars.forEach((pillar) => {
      const stepTarget = parseInt(pillar.getAttribute('data-step'), 10);
      if (!isNaN(stepTarget)) {
        pillar.addEventListener('click', () => navigateToStep(stepTarget));
        pillar.addEventListener('keydown', (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            navigateToStep(stepTarget);
          }
        });
      }
    });

    // 2. Tombol & Header Ikhtisar (Kembali ke Step 0)
    const dockBackBtn = slide10.querySelector('.s10-dock-back-btn');
    if (dockBackBtn) {
      dockBackBtn.addEventListener('click', () => navigateToStep(0));
      dockBackBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          navigateToStep(0);
        }
      });
    }

    const pillarHero = slide10.querySelector('.s10-pillar-hero');
    if (pillarHero) {
      pillarHero.addEventListener('click', () => {
        if (currentStep > 0) navigateToStep(0);
      });
    }
  }

  // Widget Interaktif Kalkulator Profit (Slide 10)
  function setupPriceCalculator() {
    const productSelect = document.getElementById('calc-product');
    const qtyInput = document.getElementById('calc-qty');
    const resOmset = document.getElementById('res-omset');
    const resDp = document.getElementById('res-dp');
    const resProfit = document.getElementById('res-profit');

    if (!productSelect || !qtyInput) return;

    const priceConfig = {
      idcard: { price: 13500, margin: 5000 },
      ganci: { price: 6000, margin: 2500 },
      pin: { price: 4000, margin: 2000 },
      mmt: { price: 66000, margin: 21000 },
      paperbag: { price: 15000, margin: 5000 },
      desain_pdh: { price: 35000, margin: 35000 }
    };

    function recalculate() {
      const selected = productSelect.value;
      const qty = parseInt(qtyInput.value, 10) || 0;
      const config = priceConfig[selected] || priceConfig.idcard;

      const totalOmset = config.price * qty;
      const totalDp = totalOmset * 0.5;
      const totalProfit = config.margin * qty;

      resOmset.innerText = `Rp ${totalOmset.toLocaleString('id-ID')}`;
      resDp.innerText = `Rp ${totalDp.toLocaleString('id-ID')}`;
      resProfit.innerText = `Rp ${totalProfit.toLocaleString('id-ID')}`;

      // Micro-animation shimmer on update
      resProfit.classList.remove('val-updated');
      void resProfit.offsetWidth; // trigger reflow
      resProfit.classList.add('val-updated');
    }

    productSelect.addEventListener('change', recalculate);
    qtyInput.addEventListener('input', recalculate);
    recalculate();
  }

  // Render initial slide
  renderSlide();

  // ==========================================================
  // 4. EMERGENCY KEYBOARD FAIL-SAFE & FULLSCREEN
  // ==========================================================
  window.addEventListener('keydown', (e) => {
    // Abaikan jika sedang mengetik di input kalkulator
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;

    // Overview terbuka: navigasi diserahkan ke scroll grid, slide tidak berubah
    if (isOverviewOpen()) {
      if (e.key === 'o' || e.key === 'O' || e.key === 'Escape') {
        e.preventDefault();
        toggleOverview(false);
      }
      return;
    }

    if (e.key === 'o' || e.key === 'O') {
      e.preventDefault();
      toggleOverview(true);
      return;
    }

    // Pintasan Angka Khusus Slide 10 (Pilar Finansial)
    if (currentSlide === 10 && ['0', '1', '2', '3', '4'].includes(e.key)) {
      e.preventDefault();
      const targetStep = parseInt(e.key, 10);
      if (currentRoomId && socket.connected) {
        socket.emit('action:step', { roomId: currentRoomId, step: targetStep });
      } else {
        currentStep = targetStep;
        updateSubStep(currentStep);
      }
      return;
    }

    if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
      e.preventDefault();
      triggerNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
      e.preventDefault();
      triggerPrev();
    } else if (e.key === 'f' || e.key === 'F') {
      e.preventDefault();
      toggleFullscreen();
    } else if (e.key === 'q' || e.key === 'Q') {
      e.preventDefault();
      toggleQrModal();
    } else if (e.key === 't' || e.key === 'T') {
      e.preventDefault();
      triggerThemeToggle();
    }
  });

  function triggerThemeToggle() {
    const current = document.documentElement.getAttribute('data-theme') || 'dark';
    const nextTheme = current === 'light' ? 'dark' : 'light';
    applyTheme(nextTheme);
    broadcastThemeSync(nextTheme);

    if (currentRoomId && socket && socket.connected) {
      socket.emit('action:theme-toggle', { roomId: currentRoomId });
    }
  }

  function triggerNext() {
    if (currentRoomId && socket && socket.connected) {
      socket.emit('action:next', { roomId: currentRoomId });
    } else {
      const maxSteps = slideStepsMap[currentSlide] || 0;
      if (currentStep < maxSteps) {
        currentStep += 1;
        updateSubStep(currentStep);
        broadcastSlideSync();
      } else if (currentSlide < totalSlides) {
        currentSlide += 1;
        currentStep = 0;
        renderSlide('next');
        broadcastSlideSync();
      }
    }
  }

  function triggerPrev() {
    if (currentRoomId && socket && socket.connected) {
      socket.emit('action:prev', { roomId: currentRoomId });
    } else {
      if (currentStep > 0) {
        currentStep -= 1;
        updateSubStep(currentStep);
        broadcastSlideSync();
      } else if (currentSlide > 1) {
        currentSlide -= 1;
        currentStep = slideStepsMap[currentSlide] || 0;
        renderSlide('prev');
        broadcastSlideSync();
      }
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => {
        console.warn('Fullscreen error:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }

  function toggleQrModal() {
    qrModal.classList.toggle('active');
  }

  // ==========================================================
  // 5. OVERVIEW MODE - Peta grid semua slide (tekan 'O')
  // ==========================================================
  const OV_STAGE_W = 1920;

  // Ubah id menjadi data-ov-id supaya tidak bentrok dengan
  // elemen slide yang sedang aktif (mis. kalkulator slide 11).
  function neutralizeIds(html) {
    return html.replace(/\sid="([^"]*)"/g, ' data-ov-id="$1"');
  }

  function buildOverview() {
    if (overviewBuilt) return;
    overviewBuilt = true;

    const frag = document.createDocumentFragment();

    SLIDES_DATA.forEach((slideData, index) => {
      const num = index + 1;
      const maxStep = slideData.subSteps || 0;

      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'ov-item';
      item.dataset.index = String(num);
      item.setAttribute('aria-label', `Slide ${num}: ${slideData.title || ''}`);

      const frame = document.createElement('div');
      frame.className = 'ov-frame';

      const stage = document.createElement('div');
      stage.className = 'ov-stage';
      // Render pada step maksimum agar seluruh konten ter-reveal,
      // bukan versi kosong step 0.
      stage.innerHTML = neutralizeIds(slideData.render(maxStep));
      // Pakai logika reveal yang sama dengan slide sungguhan agar
      // slide 6 & 10 (yang pakai data-phase, bukan .revealed)
      // tampil dalam kondisi final yang sama.
      updateSubStep(maxStep, stage);

      const label = document.createElement('span');
      label.className = 'ov-label';
      label.innerText = `${String(num).padStart(2, '0')} · ${slideData.title || 'Slide ' + num}`;

      frame.appendChild(stage);
      item.append(frame, label);
      frag.appendChild(item);
    });

    overviewGrid.appendChild(frag);
  }

  function scaleOverview() {
    overviewGrid.querySelectorAll('.ov-item').forEach((item) => {
      const stage = item.querySelector('.ov-stage');
      const width = item.clientWidth;
      if (stage && width > 0) {
        stage.style.setProperty('--ov-scale', width / OV_STAGE_W);
      }
    });
  }

  function markCurrentOverview() {
    overviewGrid.querySelectorAll('.ov-item').forEach((item) => {
      const isCurrent = parseInt(item.dataset.index, 10) === currentSlide;
      item.classList.toggle('is-current', isCurrent);
      if (isCurrent) item.setAttribute('aria-current', 'true');
      else item.removeAttribute('aria-current');
    });
  }

  function isOverviewOpen() {
    return overviewOverlay.classList.contains('active');
  }

  function toggleOverview(force) {
    const open = typeof force === 'boolean' ? force : !isOverviewOpen();
    // Class harus dipasang lebih dulu: overlay ber-display:none sampai
    // .active aktif, jadi clientWidth hanya terbaca setelah layout terjadi.
    overviewOverlay.classList.toggle('active', open);
    if (open) {
      buildOverview();
      scaleOverview();
      markCurrentOverview();
    }
  }

  // Loncat ke slide tujuan melalui jalur yang sama dengan navigasi lain:
  // server yang berwenang, dengan fallback lokal bila belum ada room.
  function goToSlide(index) {
    if (currentRoomId && socket && socket.connected) {
      socket.emit('action:goto', { roomId: currentRoomId, slideIndex: index });
    } else {
      currentSlide = index;
      currentStep = 0;
      renderSlide('next');
      broadcastSlideSync();
    }
  }

  overviewGrid.addEventListener('click', (e) => {
    const item = e.target.closest('.ov-item');
    if (!item) return;
    const target = parseInt(item.dataset.index, 10);
    if (!isNaN(target) && target >= 1 && target <= totalSlides) {
      goToSlide(target);
      toggleOverview(false);
    }
  });

  overviewOverlay.addEventListener('click', (e) => {
    if (e.target === overviewOverlay) toggleOverview(false);
  });

  // Modal event listeners
  btnQrModal.addEventListener('click', toggleQrModal);
  remoteStatusBtn.addEventListener('click', toggleQrModal);
  btnCloseModal.addEventListener('click', () => qrModal.classList.remove('active'));
  btnFullscreen.addEventListener('click', toggleFullscreen);

  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) qrModal.classList.remove('active');
  });
});
