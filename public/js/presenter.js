// Logic Presenter View (Laptop) - ALMERA
document.addEventListener('DOMContentLoaded', () => {
  const socket = io();
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

  let currentRoomId = null;
  let currentSlide = 1;
  let currentStep = 0;
  const totalSlides = SLIDES_DATA.length;

  // Bangun map subSteps & judul per slide
  const slideStepsMap = {};
  const slideTitles = [];
  SLIDES_DATA.forEach(s => {
    slideStepsMap[s.id] = s.subSteps || 0;
    slideTitles.push(s.title || `Slide ${s.id}`);
  });

  // ==========================================================
  // 1. AUTO-SCALING 16:9 CANVAS RESOLUTION
  // ==========================================================
  function resizeCanvas() {
    const scale = Math.min(window.innerWidth / 1920, window.innerHeight / 1080);
    slideCanvas.style.transform = `scale(${scale})`;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  // ==========================================================
  // 2. SOCKET.IO ROOM INITIALIZATION & PAIRING
  // ==========================================================
  socket.emit('room:create', { totalSlides, slideSteps: slideStepsMap, slideTitles }, (response) => {
    if (response && response.success) {
      currentRoomId = response.roomId;
      qrImg.src = response.qrDataUrl;
      remoteUrlText.innerText = response.remoteUrl;
      console.log('Room Presenter berhasil dibuat:', currentRoomId);
    }
  });

  // Listener Remote Connection Status
  socket.on('remote:status', ({ connected }) => {
    if (connected) {
      statusDot.classList.add('connected');
      statusText.innerText = 'Remote HP Terhubung!';
      qrModal.classList.remove('active');
    } else {
      statusDot.classList.remove('connected');
      statusText.innerText = 'Remote HP Terputus';
    }
  });

  // Listener Slide State Synchronization
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
  });

  // Listener Theme Synchronization
  socket.on('theme:sync', ({ theme }) => {
    applyTheme(theme);
  });

  function applyTheme(theme) {
    const targetTheme = theme === 'light' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    if (document.body) {
      document.body.classList.toggle('theme-light', targetTheme === 'light');
    }
  }

  // Listener Timer Sync
  socket.on('timer:sync', ({ stopwatchSeconds }) => {
    updateTimerHUD(stopwatchSeconds);
  });

  function updateTimerHUD(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    const formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    timerDisplay.innerText = formatted;

    // Tahap waktu: 0-5 menit (Aman), 5-8 menit (Inti), 8-10 menit (Hampir habis)
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
      setupPriceCalculator();
    }
  }

  // Pembaruan granular elemen sub-step tanpa re-render keseluruhan DOM
  function updateSubStep(step) {
    // 1. Slide 6 Cinematic Multi-Phase Morphing
    const slide6 = slideWrapper.querySelector('.slide-logo-cinematic');
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

    // 2. Standard .sub-item elements on other slides
    const subItems = slideWrapper.querySelectorAll('.sub-item');
    subItems.forEach((el) => {
      const itemStep = parseInt(el.getAttribute('data-step'), 10) || 1;
      const isCardWithFocus = el.matches('.team-card, .problem-card, .catalog-card, .feature-box, .promo-card');

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

    // 3. Spotlight Modal Overlay untuk Masalah #5 di Slide 3
    const spotlightOverlay = slideWrapper.querySelector('.problem-spotlight-overlay');
    if (spotlightOverlay) {
      spotlightOverlay.classList.toggle('active', step === 5);
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
      pdh: { price: 125000, margin: 25000 },
      ganci: { price: 7000, margin: 2500 },
      totebag: { price: 28000, margin: 8000 },
      banner: { price: 60000, margin: 20000 }
    };

    function recalculate() {
      const selected = productSelect.value;
      const qty = parseInt(qtyInput.value, 10) || 0;
      const config = priceConfig[selected] || priceConfig.pdh;

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
    if (currentRoomId && socket.connected) {
      socket.emit('action:theme-toggle', { roomId: currentRoomId });
    } else {
      const current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current === 'light' ? 'dark' : 'light');
    }
  }

  function triggerNext() {
    if (currentRoomId && socket.connected) {
      socket.emit('action:next', { roomId: currentRoomId });
    } else {
      const maxSteps = slideStepsMap[currentSlide] || 0;
      if (currentStep < maxSteps) {
        currentStep += 1;
        updateSubStep(currentStep);
      } else if (currentSlide < totalSlides) {
        currentSlide += 1;
        currentStep = 0;
        renderSlide('next');
      }
    }
  }

  function triggerPrev() {
    if (currentRoomId && socket.connected) {
      socket.emit('action:prev', { roomId: currentRoomId });
    } else {
      if (currentStep > 0) {
        currentStep -= 1;
        updateSubStep(currentStep);
      } else if (currentSlide > 1) {
        currentSlide -= 1;
        currentStep = slideStepsMap[currentSlide] || 0;
        renderSlide('prev');
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

  // Modal event listeners
  btnQrModal.addEventListener('click', toggleQrModal);
  remoteStatusBtn.addEventListener('click', toggleQrModal);
  btnCloseModal.addEventListener('click', () => qrModal.classList.remove('active'));
  btnFullscreen.addEventListener('click', toggleFullscreen);

  qrModal.addEventListener('click', (e) => {
    if (e.target === qrModal) qrModal.classList.remove('active');
  });
});
