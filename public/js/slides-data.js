// Data 12 Slide Presentasi Rencana Bisnis ALMERA (SMK Negeri 2 Sragen)
// Dilengkapi dengan konfigurasi subSteps untuk mendukung dual-level transition (per-item reveal)

const SLIDES_DATA = [
  // ==========================================
  // SLIDE 1: Cover & Branding Usaha
  // ==========================================
  {
    id: 1,
    title: "Cover & Branding Usaha",
    subSteps: 0,
    render: () => `
      <div class="slide-content slide-cover anim-slide-1">
        <div class="cover-kicker anim-kicker">
          <span class="kicker-tag">Aktivitas Pembelajaran KIK</span>
          <span class="kicker-sep">/</span>
          <span class="kicker-school">SMK Negeri 2 Sragen</span>
        </div>

        <div class="brand-showcase anim-brand-hero">
          <div class="almera-logo-wrap anim-logo-3d">
            <div class="logo-backdrop-glow"></div>
            <img class="almera-logo-img" src="/img/Almera.png" alt="Logo ALMERA">
            <div class="brand-headings">
              <h1 class="brand-title anim-title-reveal">ALMERA</h1>
              <span class="brand-subtitle-tag anim-subtitle-reveal">CREATIVE DESIGN & MERCHANDISE</span>
            </div>
          </div>
          <p class="brand-tagline anim-tagline">
            <em>One-Stop Solution</em> Desain Grafis & Pembuatan Merchandise Khusus Ekskul Sekolah
          </p>
        </div>

        <div class="cover-footer">
          <div class="cover-pill anim-pill-1">
            <span class="pill-icon"><i class="ri-time-line"></i></span>
            <span class="pill-label">Durasi Target:</span>
            <span class="pill-value">5 – 10 Menit</span>
          </div>
          <div class="cover-pill highlight anim-pill-2">
            <span class="pill-icon"><i class="ri-rocket-2-line"></i></span>
            <span class="pill-label">Unit Usaha:</span>
            <span class="pill-value">Kreatif Siswa Mandiri</span>
          </div>
          <div class="cover-pill accent anim-pill-3">
            <span class="pill-icon"><i class="ri-shield-check-line"></i></span>
            <span class="pill-label">Model Bisnis:</span>
            <span class="pill-value">Zero-Risk DP 50%</span>
          </div>
        </div>
      </div>
    `
  },

  // ==========================================
  // SLIDE 2: Profil Anggota Tim Almera
  // ==========================================
  {
    id: 2,
    title: "Profil Anggota Tim Almera",
    subSteps: 4,
    render: (step) => `
      <div class="slide-content anim-slide-2">
        <div class="slide-header anim-header">
          <span class="slide-eyebrow">Tim Pengembang & Eksekutor</span>
          <h2 class="slide-heading">Kelompok Usaha "ALMERA"</h2>
          <p class="slide-desc">Sinergi 4 siswa berkeahlian saling melengkapi dalam teknologi, desain visual, negosiasi vendor, dan tata kelola keuangan.</p>
        </div>

        <div class="team-grid">
          <div class="team-card card-tl sub-item ${step >= 1 ? 'revealed' : ''} ${step === 1 ? 'focus-active' : ''}" data-step="1">
            <div class="team-card-inner">
              <div class="avatar-box avatar-lead">
                <img class="avatar-img" src="/img/Almera.png" alt="Foto Kelvin">
                <div class="avatar-ring"></div>
                <div class="avatar-flare"></div>
              </div>
              <div class="member-info">
                <div class="member-header">
                  <h3 class="member-name">Kelvin Nur Ramadhan</h3>
                  <span class="member-badge-presensi">Presensi: 02</span>
                </div>
                <span class="member-role">Procurement Marketing</span>
                <p class="member-desc">Memasarkan produk secara efektif untuk mendorong penjualan konsumen, sekaligus menegosiasikan harga terendah, kelonggaran MOQ, dan sistem tempo kepada vendor, guna mengamankan pasokan berkualitas tanpa menguras modal awal.</p>
                <div class="skill-chips">
                  <span class="chip chip-1">Vendor Negotiation</span>
                  <span class="chip chip-2">Social Marketing</span>
                </div>
              </div>
            </div>
          </div>

          <div class="team-card card-tr sub-item ${step >= 2 ? 'revealed' : ''} ${step === 2 ? 'focus-active' : ''}" data-step="2">
            <div class="team-card-inner">
              <div class="avatar-box avatar-creative">
                <img class="avatar-img" src="/img/Almera.png" alt="Foto Mandala">
                <div class="avatar-ring"></div>
                <div class="avatar-flare"></div>
              </div>
              <div class="member-info">
                <div class="member-header">
                  <h3 class="member-name">Mandala Adi Santoso</h3>
                  <span class="member-badge-role">Presensi: 09</span>
                </div>
                <span class="member-role">Creative Design Lead & Mockup Specialist</span>
                <p class="member-desc">Mengeksekusi konsep visual kreatif, mock-up baju PDH, desain vector merchandise ekskul, dan katalog produk.</p>
                <div class="skill-chips">
                  <span class="chip chip-1">Vector Design</span>
                  <span class="chip chip-2">Apparel Mockup</span>
                </div>
              </div>
            </div>
          </div>

          <div class="team-card card-bl sub-item ${step >= 3 ? 'revealed' : ''} ${step === 3 ? 'focus-active' : ''}" data-step="3">
            <div class="team-card-inner">
              <div class="avatar-box avatar-vendor">
                <img class="avatar-img" src="/img/Almera.png" alt="Foto Uzairon">
                <div class="avatar-ring"></div>
                <div class="avatar-flare"></div>
              </div>
              <div class="member-info">
                <div class="member-header">
                  <h3 class="member-name">Muhammad Uzairon Ibrahim</h3>
                  <span class="member-badge-role">Presensi: 12</span>
                </div>
                <span class="member-role">Coordinator & Strategic Planning</span>
                <p class="member-desc">Memimpin perancangan strategi bisnis, manajemen timeline, dan koordinasi antar divisi kerja.</p>
                <div class="skill-chips">
                  <span class="chip chip-1">Project Mgmt</span>
                  <span class="chip chip-2">Client Relation</span>
                </div>
              </div>
            </div>
          </div>

          <div class="team-card card-br sub-item ${step >= 4 ? 'revealed' : ''} ${step === 4 ? 'focus-active' : ''}" data-step="4">
            <div class="team-card-inner">
              <div class="avatar-box avatar-finance">
                <img class="avatar-img" src="/img/Almera.png" alt="Foto Rangga">
                <div class="avatar-ring"></div>
                <div class="avatar-flare"></div>
              </div>
              <div class="member-info">
                <div class="member-header">
                  <h3 class="member-name">Rangga Aji Hidayatullah</h3>
                  <span class="member-badge-role">Presensi: 22</span>
                </div>
                <span class="member-role">Management Financial</span>
                <p class="member-desc">Mencari pendanaan, mengelola arus kas, dan membuat laporan keuangan perusahaan.</p>
                <div class="skill-chips">
                  <span class="chip chip-1">Financial Ops</span>
                  <span class="chip chip-2">Cash Flow</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ==========================================
  // SLIDE 3: Observasi Lingkungan (8 Masalah)
  // ==========================================
  {
    id: 3,
    title: "Observasi 8 Masalah Sekolah",
    subSteps: 5,
    render: (step) => `
      <div class="slide-content anim-slide-3">
        <div class="slide-header anim-header">
          <span class="slide-eyebrow">Riset Lapangan & Problem Discovery</span>
          <h2 class="slide-heading">8 Permasalahan Nyata di SMK Negeri 2 Sragen</h2>
          <p class="slide-desc">Observasi cermat mengidentifikasi kebutuhan siswa dan guru, menyaring peluang bisnis berpotensi tertinggi.</p>
        </div>

        <div class="problems-grid">
          <div class="problem-card sub-item ${step >= 1 ? 'revealed' : ''} ${step === 1 ? 'focus-active' : ''}" style="--order: 1;" data-step="1">
            <div class="card-top-meta">
              <span class="card-num">#01</span>
              <span class="card-category">Infrastruktur</span>
            </div>
            <div class="card-body">
              <h4>Keterbatasan PC Jurusan</h4>
              <p>Rasio jumlah unit komputer per siswa di lab kejuruan belum mencukupi.</p>
            </div>
          </div>

          <div class="problem-card sub-item ${step >= 1 ? 'revealed' : ''} ${step === 1 ? 'focus-active' : ''}" style="--order: 2;" data-step="1">
            <div class="card-top-meta">
              <span class="card-num">#02</span>
              <span class="card-category">Akademik</span>
            </div>
            <div class="card-body">
              <h4>Dasar Kejuruan TKJ</h4>
              <p>Sebagian siswa kelas awal masih butuh penguatan fondasi teknis.</p>
            </div>
          </div>

          <div class="problem-card sub-item ${step >= 2 ? 'revealed' : ''} ${step === 2 ? 'focus-active' : ''}" style="--order: 3;" data-step="2">
            <div class="card-top-meta">
              <span class="card-num">#03</span>
              <span class="card-category">Fasilitas</span>
            </div>
            <div class="card-body">
              <h4>Alat Praktek Tertinggal</h4>
              <p>Perlu program peremajaan & tukar tambah perangkat praktikum lama.</p>
            </div>
          </div>

          <div class="problem-card sub-item ${step >= 2 ? 'revealed' : ''} ${step === 2 ? 'focus-active' : ''}" style="--order: 4;" data-step="2">
            <div class="card-top-meta">
              <span class="card-num">#04</span>
              <span class="card-category">Digital Tools</span>
            </div>
            <div class="card-body">
              <h4>Kebutuhan Template Slide</h4>
              <p>Siswa sering kesulitan membuat desain presentasi tugas sekolah.</p>
            </div>
          </div>

          <div class="problem-card sub-item ${step >= 3 ? 'revealed' : ''} ${step === 3 ? 'focus-active' : ''}" style="--order: 5;" data-step="3">
            <div class="card-top-meta">
              <span class="card-num">#05</span>
              <span class="card-category">Organisasi & Ekskul</span>
            </div>
            <div class="card-body">
              <h4>Merchandise Ekskul Sulit</h4>
              <p>Organisasi & ekskul kesulitan membuat kemeja PDH, pin, dan banner terjangkau.</p>
            </div>
          </div>

          <div class="problem-card sub-item ${step >= 3 ? 'revealed' : ''} ${step === 3 ? 'focus-active' : ''}" style="--order: 6;" data-step="3">
            <div class="card-top-meta">
              <span class="card-num">#06</span>
              <span class="card-category">Media Data</span>
            </div>
            <div class="card-body">
              <h4>Dokumentasi Acara Pecah</h4>
              <p>File foto/video panitia berantakan saat dikirim terkompres via WA.</p>
            </div>
          </div>

          <div class="problem-card sub-item ${step >= 4 ? 'revealed' : ''} ${step === 4 ? 'focus-active' : ''}" style="--order: 7;" data-step="4">
            <div class="card-top-meta">
              <span class="card-num">#07</span>
              <span class="card-category">Bantuan Guru</span>
            </div>
            <div class="card-body">
              <h4>Input Kuis Digital Guru</h4>
              <p>Guru butuh asisten mengubah bank soal fisik ke platform kuis digital.</p>
            </div>
          </div>

          <div class="problem-card sub-item ${step >= 4 ? 'revealed' : ''} ${step === 4 ? 'focus-active' : ''}" style="--order: 8;" data-step="4">
            <div class="card-top-meta">
              <span class="card-num">#08</span>
              <span class="card-category">Jaringan</span>
            </div>
            <div class="card-body">
              <h4>Kepadatan Wi-Fi Sekolah</h4>
              <p>Jaringan lambat akibat pemakaian bandwidth untuk game daring.</p>
            </div>
          </div>
        </div>

        <!-- Spotlight Popup Modal for Problem #5 (Substep 5) -->
        <div class="problem-spotlight-overlay ${step === 5 ? 'active' : ''}">
          <div class="problem-spotlight-modal">
            <div class="spotlight-top-bar">
              <div class="spotlight-badge">
                <i class="ri-focus-3-line"></i>
                <span>PELUANG BISNIS TERPILIH</span>
              </div>
              <span class="spotlight-num">MASALAH #05</span>
            </div>

            <div class="spotlight-content">
              <div class="spotlight-header-group">
                <span class="spotlight-category">Kategori: Organisasi & Ekstrakurikuler</span>
                <h3 class="spotlight-title">Ekskul Kesulitan Desain & Produksi Merchandise Resmi</h3>
              </div>

              <p class="spotlight-desc">
                Seluruh organisasi sekolah (OSIS, Pramuka, PMR, Rohis, Paskibra, Tim Olahraga) selalu menghadapi kendala yang sama setiap tahun: kesulitan mendesain kemeja PDH, gantungan kunci pelantikan, totebag, dan banner dengan harga yang ramah kantong pelajar.
              </p>

              <div class="spotlight-anchor-box">
                <div class="anchor-icon-wrap">
                  <i class="ri-lightbulb-line anim-bulb-pulse"></i>
                </div>
                <div class="anchor-text-wrap">
                  <span class="anchor-title">Bibit Kelahiran Unit Usaha ALMERA:</span>
                  <p class="anchor-desc">Kebutuhan nyata dengan perputaran <em>repeat-order</em> tinggi setiap tahun ajaran baru, risiko modal nol (skema DP 50%), dan margin profit optimal.</p>
                </div>
              </div>

              <div class="spotlight-chips-row">
                <div class="spotlight-chip anim-chip-s1"><i class="ri-check-line"></i> Modal Nol</div>
                <div class="spotlight-chip anim-chip-s2"><i class="ri-check-line"></i> Transaksi Langsung di Sekolah</div>
                <div class="spotlight-chip anim-chip-s3"><i class="ri-check-line"></i> Zero-Risk DP 50%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ==========================================
  // SLIDE 4: Brainstorming 8 Ide Solusi
  // ==========================================
  {
    id: 4,
    title: "Brainstorming 8 Ide Solusi",
    subSteps: 2,
    render: (step) => `
      <div class="slide-content anim-slide-4">
        <div class="slide-header anim-header">
          <span class="slide-eyebrow">Divergent Thinking & Analisis Indikator</span>
          <h2 class="slide-heading">Eksplorasi 8 Ide & 8 Parameter Uji Kelayakan</h2>
          <p class="slide-desc">Seluruh ide dicatat bebas tanpa kritik, kemudian dievaluasi menyeluruh melalui 8 parameter usaha.</p>
        </div>

        <div class="split-layout">
          <div class="box-panel panel-left sub-item ${step >= 1 ? 'revealed' : ''}" data-step="1">
            <div class="panel-header-badge">
              <h3 class="panel-title">8 Ide Solusi yang Dieksplorasi</h3>
              <span class="panel-tag">Brainstorming</span>
            </div>
            <ol class="bullet-styled">
              <li style="--li-i: 1;"><span class="li-num">1</span> Proposal penambahan unit PC perangkat jurusan.</li>
              <li style="--li-i: 2;"><span class="li-num">2</span> Kelas tutor sebaya berbasis konten pembelajaran digital.</li>
              <li style="--li-i: 3;"><span class="li-num">3</span> Jasa tukar tambah alat praktek kejuruan TKJ.</li>
              <li style="--li-i: 4;"><span class="li-num">4</span> Jasa pembuatan template presentasi kanvas & tugas.</li>
              <li style="--li-i: 5;" class="bold-highlight anim-champion-row">
                <span class="li-num highlight">5</span>
                <strong>Jasa Desain Grafis & Merchandise Ekskul (ALMERA)</strong>
                <span class="li-badge anim-badge-pulse">PILIHAN TERBAIK</span>
              </li>
              <li style="--li-i: 6;"><span class="li-num">6</span> Pembangunan penyimpanan Local Cloud dokumentasi sekolah.</li>
              <li style="--li-i: 7;"><span class="li-num">7</span> Jasa digitalisasi bank soal kuis ujian guru.</li>
              <li style="--li-i: 8;"><span class="li-num">8</span> Jasa optimasi konfigurasi bandwidth & keamanan Wi-Fi.</li>
            </ol>
          </div>

          <div class="box-panel panel-right sub-item ${step >= 2 ? 'revealed' : ''}" data-step="2">
            <div class="panel-header-badge">
              <h3 class="panel-title">8 Parameter Analisis Kelayakan</h3>
              <span class="panel-tag">Framework KIK</span>
            </div>
            <div class="params-matrix">
              <div class="param-card" style="--param-i: 1;"><span class="p-ico"><i class="ri-team-line"></i></span><span class="p-txt">1. Konsumen</span></div>
              <div class="param-card" style="--param-i: 2;"><span class="p-ico"><i class="ri-focus-2-line"></i></span><span class="p-txt">2. Kebutuhan</span></div>
              <div class="param-card" style="--param-i: 3;"><span class="p-ico"><i class="ri-sword-line"></i></span><span class="p-txt">3. Kompetitor</span></div>
              <div class="param-card" style="--param-i: 4;"><span class="p-ico"><i class="ri-money-dollar-circle-line"></i></span><span class="p-txt">4. Modal Awal</span></div>
              <div class="param-card" style="--param-i: 5;"><span class="p-ico"><i class="ri-computer-line"></i></span><span class="p-txt">5. Peralatan</span></div>
              <div class="param-card" style="--param-i: 6;"><span class="p-ico"><i class="ri-palette-line"></i></span><span class="p-txt">6. Keterampilan</span></div>
              <div class="param-card" style="--param-i: 7;"><span class="p-ico"><i class="ri-price-tag-3-line"></i></span><span class="p-txt">7. Harga Jasa</span></div>
              <div class="param-card" style="--param-i: 8;"><span class="p-ico"><i class="ri-shield-keyhole-line"></i></span><span class="p-txt">8. Risiko Usaha</span></div>
            </div>
            <div class="analysis-quote anim-quote-box">
              <div class="quote-mark">“</div>
              <p>Fokus kami adalah memilih ide bisnis dengan <strong>kebutuhan pasar tertinggi</strong>, <strong>risiko modal nol</strong>, dan <strong>margin keuntungan terbaik</strong> bagi kantong siswa sekolah.</p>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ==========================================
  // SLIDE 5: Seleksi Ide & Matriks Scoring
  // ==========================================
  {
    id: 5,
    title: "Seleksi Ide & Matriks Scoring",
    subSteps: 2,
    render: (step) => `
      <div class="slide-content anim-slide-5">
        <div class="slide-header anim-header">
          <span class="slide-eyebrow">Pengambilan Keputusan Terukur</span>
          <h2 class="slide-heading">Matriks Scoring 8 Ide Bisnis (Skala 1–5)</h2>
          <p class="slide-desc">Penilaian obyektif terhadap 7 kriteria kelayakan menunjukkan Ide 5 mengungguli seluruh alternatif.</p>
        </div>

        <div class="table-container sub-item ${step >= 1 ? 'revealed' : ''}" data-step="1">
          <table class="scoring-table anim-table-scan">
            <thead>
              <tr>
                <th class="th-kriteria">Kriteria Evaluasi</th>
                <th>Ide 1</th>
                <th>Ide 2</th>
                <th>Ide 3</th>
                <th>Ide 4</th>
                <th class="winner-col winner-th anim-winner-beam">Ide 5 (Almera) <i class="ri-vip-crown-fill crown-wobble"></i></th>
                <th>Ide 6</th>
                <th>Ide 7</th>
                <th>Ide 8</th>
              </tr>
            </thead>
            <tbody>
              <tr style="--row-i: 1;">
                <td class="td-kriteria">1. Kebutuhan Pasar</td><td>3</td><td>3</td><td>3</td><td>4</td><td class="winner-col">3</td><td>4</td><td>4</td><td>3</td>
              </tr>
              <tr style="--row-i: 2;">
                <td class="td-kriteria">2. Kemudahan Pelaksanaan</td><td>3</td><td>3</td><td>2</td><td>4</td><td class="winner-col">4</td><td>2</td><td>4</td><td>2</td>
              </tr>
              <tr style="--row-i: 3;">
                <td class="td-kriteria">3. Kebutuhan Modal</td><td>4</td><td>5</td><td>2</td><td>4</td><td class="winner-col">3</td><td>2</td><td>4</td><td>3</td>
              </tr>
              <tr style="--row-i: 4;">
                <td class="td-kriteria">4. Kemampuan Teknis</td><td>3</td><td>4</td><td>2</td><td>3</td><td class="winner-col">4</td><td>3</td><td>3</td><td>3</td>
              </tr>
              <tr style="--row-i: 5;">
                <td class="td-kriteria">5. Tingkat Keuntungan</td><td>2</td><td>2</td><td>2</td><td>3</td><td class="winner-col highlight-cell">5 <i class="ri-star-fill star-pop"></i></td><td>3</td><td>3</td><td>3</td>
              </tr>
              <tr style="--row-i: 6;">
                <td class="td-kriteria">6. Keunikan Solusi</td><td>2</td><td>4</td><td>2</td><td>2</td><td class="winner-col">3</td><td>4</td><td>3</td><td>3</td>
              </tr>
              <tr style="--row-i: 7;">
                <td class="td-kriteria">7. Potensi Pengembangan</td><td>3</td><td>5</td><td>2</td><td>4</td><td class="winner-col highlight-cell">5 <i class="ri-star-fill star-pop"></i></td><td>4</td><td>3</td><td>4</td>
              </tr>
            </tbody>
            <tfoot>
              <tr class="total-row">
                <td class="td-kriteria total-label">TOTAL SKOR AKHIR</td>
                <td>20</td><td>26</td><td>15</td><td>24</td>
                <td class="winner-col winner-total anim-trophy-pulse"><i class="ri-trophy-fill"></i> 27</td>
                <td>22</td><td>24</td><td>21</td>
              </tr>
            </tfoot>
          </table>
        </div>

        <div class="verdict-banner sub-item ${step >= 2 ? 'revealed' : ''} anim-verdict" data-step="2">
          <div class="badge-champion">
            <span class="trophy-icon"><i class="ri-trophy-fill anim-bounce-subtle"></i></span>
            <span>PEMENANG: IDE 5 (SKOR 27)</span>
          </div>
          <p class="verdict-text">
            Almera unggul mutlak pada <strong>Tingkat Keuntungan Maksimal (5/5)</strong> dan <strong>Potensi Pengembangan Berkelanjutan (5/5)</strong> berkat repeat-order organisasi sekolah yang tidak pernah berhenti.
          </p>
        </div>
      </div>
    `
  },

  // ==========================================
  // SLIDE 6: Solusi Terpilih - ALMERA
  // ==========================================
  {
    id: 6,
    title: "Identitas Usaha & Filosofi Logo",
    subSteps: 6,
    render: (step) => `
      <div class="slide-content slide-logo-cinematic anim-slide-6" data-phase="${step}">
        <!-- Slide Header (Slides up & disappears on step >= 2) -->
        <div class="slide-header s6-header ${step >= 2 ? 'header-docked-out' : ''}">
          <span class="slide-eyebrow">Brand Identity & Makna Visual</span>
          <h2 class="slide-heading">Identitas Usaha & Filosofi Logo ALMERA</h2>
          <p class="slide-desc">Desain logo yang memadukan identitas nama, dorongan kemajuan, dan kecerdasan visual dalam satu simbol yang kuat.</p>
        </div>

        <!-- Stage Area: Handles Logo Centering -> Left Docking & Points Reveal -->
        <div class="s6-stage-area">
          
          <!-- Brand Anchor (Morphs from Center to Left) -->
          <div class="s6-brand-anchor">
            <div class="s6-logo-frame">
              <div class="s6-logo-glow"></div>
              <img class="s6-logo-img" src="/img/Almera.png" alt="Logo ALMERA">
            </div>

            <div class="s6-brand-identity">
              <h3 class="s6-brand-title">ALMERA</h3>
              <span class="s6-brand-subtitle">CREATIVE DESIGN & MERCHANDISE</span>
              <p class="s6-brand-tagline">
                <em>One-Stop Solution</em> Desain Grafis & Pembuatan Merchandise Khusus Ekskul Sekolah
              </p>
              <div class="s6-brand-pills">
                <span class="s6-pill"><i class="ri-palette-line"></i> 100% Custom</span>
                <span class="s6-pill"><i class="ri-truck-line"></i> 0 Ongkir</span>
                <span class="s6-pill"><i class="ri-shield-check-line"></i> Proteksi DP 50%</span>
              </div>
            </div>
          </div>

          <!-- Right Column: 5 Analogi Points -->
          <div class="s6-analogy-deck">
            <div class="s6-analogy-header">
              <span class="s6-deck-kicker"><i class="ri-compasses-2-line"></i> DEKONSTRUKSI VISUAL</span>
              <h3 class="s6-deck-title">5 Analogi Makna Filosofis Logo</h3>
            </div>

            <div class="s6-analogy-cards">
              <!-- Point 1: Huruf A (Step 2) -->
              <div class="s6-point-card ${step >= 2 ? 'revealed' : ''} ${step === 2 ? 'focus-active' : ''}" data-point="1">
                <div class="s6-point-icon"><i class="ri-character-recognition-line"></i></div>
                <div class="s6-point-body">
                  <div class="s6-point-top">
                    <span class="s6-point-num">01</span>
                    <h4>Huruf 'A' (Identitas Utama)</h4>
                    <span class="s6-point-tag">Brand Character</span>
                  </div>
                  <p>Melambangkan huruf pertama dari nama ALMERA sebagai identitas utama yang mudah dikenali dan diingat. Bentuk tegas menunjukkan karakter brand yang kuat dan percaya diri.</p>
                </div>
              </div>

              <!-- Point 2: Panah ke Atas (Step 3) -->
              <div class="s6-point-card ${step >= 3 ? 'revealed' : ''} ${step === 3 ? 'focus-active' : ''}" data-point="2">
                <div class="s6-point-icon"><i class="ri-arrow-up-circle-line"></i></div>
                <div class="s6-point-body">
                  <div class="s6-point-top">
                    <span class="s6-point-num">02</span>
                    <h4>Tanda Panah ke Atas (Pertumbuhan)</h4>
                    <span class="s6-point-tag">Growth & Vision</span>
                  </div>
                  <p>Melambangkan pertumbuhan, kemajuan, dan kesuksesan. Menggambarkan bahwa ALMERA selalu bergerak maju dan terus berkembang, memberikan kesan optimis dan visioner.</p>
                </div>
              </div>

              <!-- Point 3: Negative Space (Step 4) -->
              <div class="s6-point-card ${step >= 4 ? 'revealed' : ''} ${step === 4 ? 'focus-active' : ''}" data-point="3">
                <div class="s6-point-icon"><i class="ri-contrast-drop-2-line"></i></div>
                <div class="s6-point-body">
                  <div class="s6-point-top">
                    <span class="s6-point-num">03</span>
                    <h4>Ruang Negatif (Negative Space)</h4>
                    <span class="s6-point-tag">Creative Opportunity</span>
                  </div>
                  <p>Panah dibentuk dari ruang kosong di tengah huruf A. Menggambarkan bahwa peluang selalu ada bagi mereka yang melihat dari sudut pandang berbeda; modern, cerdas, dan minimalis.</p>
                </div>
              </div>

              <!-- Point 4: Bentuk Geometris (Step 5) -->
              <div class="s6-point-card ${step >= 5 ? 'revealed' : ''} ${step === 5 ? 'focus-active' : ''}" data-point="4">
                <div class="s6-point-icon"><i class="ri-layout-masonry-line"></i></div>
                <div class="s6-point-body">
                  <div class="s6-point-top">
                    <span class="s6-point-num">04</span>
                    <h4>Bentuk Geometris (Presisi & Mutu)</h4>
                    <span class="s6-point-tag">Precision</span>
                  </div>
                  <p>Garis-garis simetris yang memberikan kesan profesional, stabil, presisi, dan jaminan hasil produk berkualitas tinggi.</p>
                </div>
              </div>

              <!-- Point 5: Warna Hitam (Step 6) -->
              <div class="s6-point-card ${step >= 6 ? 'revealed' : ''} ${step === 6 ? 'focus-active' : ''}" data-point="5">
                <div class="s6-point-icon"><i class="ri-shield-star-line"></i></div>
                <div class="s6-point-body">
                  <div class="s6-point-top">
                    <span class="s6-point-num">05</span>
                    <h4>Warna Hitam (Elegan & Kepercayaan)</h4>
                    <span class="s6-point-tag">Premium Tone</span>
                  </div>
                  <p>Melambangkan keanggunan elegan, kesan premium, kekuatan usaha, dan integritas kepercayaan pelanggan.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `
  },

  // ==========================================
  // SLIDE 7: Skema Finansial & Sistem DP 50%
  // ==========================================
  {
    id: 7,
    title: "Skema Modal & Sistem DP 50%",
    subSteps: 2,
    render: (step) => `
      <div class="slide-content anim-slide-7">
        <div class="slide-header anim-header">
          <span class="slide-eyebrow">Manajemen Keuangan & Mitigasi Risiko</span>
          <h2 class="slide-heading">Modal Awal Minim & Proteksi Cash-Flow DP 50%</h2>
          <p class="slide-desc">Strategi cerdas mengelola bisnis mandiri tanpa modal besar dan tanpa potensi risiko kerugian (*Zero Financial Risk*).</p>
        </div>

        <div class="finance-layout">
          <div class="finance-card sub-item ${step >= 1 ? 'revealed' : ''}" data-step="1">
            <div class="fin-badge-row">
              <span class="fin-badge">MODAL AWAL KELOMPOK</span>
              <span class="fin-status-pill">Mandiri</span>
            </div>
            <div class="fin-amount anim-amount-pop">Rp 100.000</div>
            <p class="fin-caption">Dialokasikan semata-mata untuk operasional komunikasi, kuota internet riset, dan pembuatan portofolio fisik sampel merchandise awal.</p>
            <div class="fin-list">
              <div class="fin-check-item anim-chk-1"><span class="chk"><i class="ri-check-line"></i></span> <span>Tanpa biaya sewa ruko / workshop fisik</span></div>
              <div class="fin-check-item anim-chk-2"><span class="chk"><i class="ri-check-line"></i></span> <span>Memanfaatkan laptop & software pribadi tim</span></div>
              <div class="fin-check-item anim-chk-3"><span class="chk"><i class="ri-check-line"></i></span> <span>Distribusi langsung di lingkungan sekolah</span></div>
            </div>
          </div>

          <div class="finance-card highlight-card sub-item ${step >= 2 ? 'revealed' : ''}" data-step="2">
            <div class="fin-badge-row">
              <span class="fin-badge safe">SISTEM CASH-FLOW ZERO-RISK</span>
              <span class="fin-status-pill safe">Aman & Terlindungi</span>
            </div>
            <h3 class="fin-title">Mekanisme DP 50% Anti-Rugi</h3>
            <p class="fin-caption">
              Konsumen membayar <strong>Down Payment (DP) 50%</strong> saat pesanan disetujui. Dana DP ini langsung digunakan untuk menutup biaya produksi vendor rekanan.
            </p>
            
            <div class="flow-pipeline">
              <div class="flow-step-card anim-pipe-1">
                <span class="step-num">Step 1</span>
                <h4>Pesan & DP 50%</h4>
                <p>Pelanggan bayar DP untuk mengunci pesanan</p>
              </div>
              <div class="flow-connector"><i class="ri-arrow-right-line flow-arrow-march"></i></div>
              <div class="flow-step-card anim-pipe-2">
                <span class="step-num">Step 2</span>
                <h4>Produksi Vendor</h4>
                <p>Biaya cetak ditutup 100% dari uang DP</p>
              </div>
              <div class="flow-connector"><i class="ri-arrow-right-line flow-arrow-march"></i></div>
              <div class="flow-step-card anim-pipe-3">
                <span class="step-num">Step 3</span>
                <h4>Pelunasan 50%</h4>
                <p>Serah terima barang & profit masuk ke kas Almera</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ==========================================
  // SLIDE 8: Katalog Produk & Layanan Merchandise
  // ==========================================
  {
    id: 8,
    title: "Katalog Produk & Layanan",
    subSteps: 4,
    render: (step) => `
      <div class="slide-content anim-slide-8">
        <div class="slide-header anim-header">
          <span class="slide-eyebrow">Portofolio Layanan Terintegrasi</span>
          <h2 class="slide-heading">Produk & Jasa yang Ditawarkan Almera</h2>
          <p class="slide-desc">Dua pilar utama: Layanan Jasa Desain Grafis Digital Murni & Pembuatan Fisik Aneka Merchandise melalui 2 Mitra Vendor.</p>
        </div>

        <div class="catalog-grid">
          <div class="catalog-card sub-item ${step >= 1 ? 'revealed' : ''} ${step === 1 ? 'focus-active' : ''}" style="--cat-i: 1;" data-step="1">
            <div class="card-badge-row">
              <span class="cat-badge">PAKET PANITIA</span>
              <span class="cat-price-pill anim-price-shimmer">Rp 12,5k–16k</span>
            </div>
            <div class="cat-icon-wrap anim-prod-float-1"><i class="ri-id-card-line"></i></div>
            <h3>ID Card & Tali Lanyard</h3>
            <p>Paket kartu identitas panitia/peserta pelantikan lengkap dengan tali lanyard cetak custom 1 sisi atau 2 sisi. Mitra: <strong>Utama Grafika</strong>.</p>
            <div class="card-features">
              <span class="feat-line"><i class="ri-check-line"></i> Kartu Tebal & Tali Halus</span>
              <span class="feat-line"><i class="ri-check-line"></i> Order Fleksibel 50–150 pcs</span>
            </div>
          </div>

          <div class="catalog-card sub-item ${step >= 2 ? 'revealed' : ''} ${step === 2 ? 'focus-active' : ''}" style="--cat-i: 2;" data-step="2">
            <div class="card-badge-row">
              <span class="cat-badge">SOUVENIR RESMI</span>
              <span class="cat-price-pill anim-price-shimmer">Rp 4k–6k</span>
            </div>
            <div class="cat-icon-wrap anim-prod-float-2"><i class="ri-key-2-line"></i></div>
            <h3>Ganci Akrilik & Pin Peniti</h3>
            <p>Gantungan kunci akrilik bening presisi laser cut 2 sisi dan pin peniti glossy premium sebagai tanda pelantikan anggota ekskul. Mitra: <strong>Bagja & Utama Grafika</strong>.</p>
            <div class="card-features">
              <span class="feat-line"><i class="ri-check-line"></i> Akrilik Anti Gores</span>
              <span class="feat-line"><i class="ri-check-line"></i> Peniti Anti Karat</span>
            </div>
          </div>

          <div class="catalog-card sub-item ${step >= 3 ? 'revealed' : ''} ${step === 3 ? 'focus-active' : ''}" style="--cat-i: 3;" data-step="3">
            <div class="card-badge-row">
              <span class="cat-badge">MEDIA PUBLIKASI</span>
              <span class="cat-price-pill anim-price-shimmer">Rp 9k–22k/m</span>
            </div>
            <div class="cat-icon-wrap anim-prod-float-3"><i class="ri-flag-2-line"></i></div>
            <h3>Banner MMT, Paperbag & Stiker</h3>
            <p>Spanduk flexi outdoor tahan cuaca dengan mata ayam siap pasang, paperbag ekskul eksklusif, dan cetak stiker meteran full colour. Mitra: <strong>Bagja</strong>.</p>
            <div class="card-features">
              <span class="feat-line"><i class="ri-check-line"></i> Flexi Outdoor 280g Awet</span>
              <span class="feat-line"><i class="ri-check-line"></i> Cetak Cepat 1–2 Hari Jadi</span>
            </div>
          </div>

          <div class="catalog-card sub-item ${step >= 4 ? 'revealed' : ''} ${step === 4 ? 'focus-active' : ''}" style="--cat-i: 4;" data-step="4">
            <div class="card-badge-row">
              <span class="cat-badge highlight-badge">KREATIF MURNI</span>
              <span class="cat-price-pill anim-price-shimmer">Rp 25k–50k</span>
            </div>
            <div class="cat-icon-wrap anim-prod-float-4"><i class="ri-t-shirt-2-line"></i></div>
            <h3>Desain Baju PDH & Topi Ekskul</h3>
            <p>Jasa perancangan visual mockup 3D kemeja PDH resmi, polo shirt, dan topi ekskul siap jahit & bordir komputer. <strong>Produksi murni tim Almera (HPP Rp 0)</strong>.</p>
            <div class="card-features">
              <span class="feat-line"><i class="ri-check-line"></i> Mockup 3 Sudut HD</span>
              <span class="feat-line"><i class="ri-check-line"></i> File Vector Siap Konveksi</span>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ==========================================
  // SLIDE 9: Keunggulan Kompetitif Almera
  // ==========================================
  {
    id: 9,
    title: "Keunggulan Kompetitif Almera",
    subSteps: 3,
    render: (step) => `
      <div class="slide-content anim-slide-9">
        <div class="slide-header anim-header">
          <span class="slide-eyebrow">Value Proposition & Diferensiasi</span>
          <h2 class="slide-heading">Mengapa Almera Jadi Pilihan Terbaik?</h2>
          <p class="slide-desc">Tiga keunggulan strategis yang membedakan Almera dari vendor luar sekolah pada umumnya.</p>
        </div>

        <div class="features-row">
          <div class="feature-box sub-item ${step >= 1 ? 'revealed' : ''} ${step === 1 ? 'focus-active' : ''}" style="--feat-i: 1;" data-step="1">
            <div class="feature-number anim-watermark">01</div>
            <div class="feat-icon-wrap anim-feat-halo-1"><i class="ri-paint-brush-line"></i></div>
            <h3>100% Desain Orisinil & Custom</h3>
            <p>Desain disesuaikan sepenuhnya dengan karakter, filosofi lambang, dan warna identitas setiap ekskul, bukan sekadar mendownload template pasaran.</p>
            <div class="feat-badge-chip">Eksklusif & Bernilai Tinggi</div>
          </div>

          <div class="feature-box sub-item ${step >= 2 ? 'revealed' : ''} ${step === 2 ? 'focus-active' : ''}" style="--feat-i: 2;" data-step="2">
            <div class="feature-number anim-watermark">02</div>
            <div class="feat-icon-wrap anim-feat-halo-2"><i class="ri-wallet-3-line"></i></div>
            <h3>Harga Ramah Kantong Pelajar</h3>
            <p>Skema tarif sangat terjangkau karena Almera mengeliminasi biaya sewa ruko fisik dan beban margin perantara pihak ketiga.</p>
            <div class="feat-badge-chip">Hemat 20%–30% Dibanding Vendor Luar</div>
          </div>

          <div class="feature-box sub-item ${step >= 3 ? 'revealed' : ''} ${step === 3 ? 'focus-active' : ''}" style="--feat-i: 3;" data-step="3">
            <div class="feature-number anim-watermark">03</div>
            <div class="feat-icon-wrap anim-feat-halo-3"><i class="ri-map-pin-user-line"></i></div>
            <h3>Satu Lingkungan Sekolah</h3>
            <p>Koordinasi tatap muka langsung saat jam istirahat, revisi super cepat, dan penyerahan barang tanpa ongkir maupun risiko barang hilang di ekspedisi.</p>
            <div class="feat-badge-chip">Cepat, Aman & Transparan</div>
          </div>
        </div>
      </div>
    `
  },

  // ==========================================
  // SLIDE 10: Rantai Pasok Vendor, HPP & Analisis BEP
  // ==========================================
  {
    id: 10,
    title: "Rantai Pasok, HPP & Analisis BEP",
    subSteps: 4,
    render: (step) => `
      <div class="slide-content slide-financial-cinematic anim-slide-10" data-phase="${step}">
        <!-- Header (Slides up when step >= 1 to give massive stage room) -->
        <div class="slide-header s10-header ${step >= 1 ? 'header-docked-out' : ''}">
          <span class="slide-eyebrow">Manajemen Rantai Pasok & Titik Impas</span>
          <h2 class="slide-heading">Rantai Pasok Vendor, Rincian HPP & Analisis BEP</h2>
          <p class="slide-desc">Transparansi rantai pasok dua vendor rekanan, kalkulasi margin sehat, dan pembuktian kelayakan usaha melalui titik impas (Break Even Point).</p>
        </div>

        <!-- Stage Area -->
        <div class="s10-stage-area">
          
          <!-- Left Navigation Pillar Deck (Morphs from Center on step 0 to Left Sidebar on step >= 1) -->
          <div class="s10-master-pillar">
            <div class="s10-pillar-top-bar">
              <div class="s10-pillar-badge">
                <span class="pillar-dot"></span>
                <span>ARSITEKTUR KEUANGAN ALMERA</span>
              </div>
              <div class="s10-dock-back-btn ${step >= 1 ? 'visible' : ''}" role="button" tabindex="0" title="Kembali ke Ikhtisar Pilar">
                <i class="ri-arrow-left-s-line"></i> <span>Ikhtisar</span>
              </div>
            </div>
            
            <div class="s10-pillar-hero" role="button" tabindex="0" title="Klik untuk fokus ikhtisar">
              <div class="s10-hero-icon"><i class="ri-funds-box-line"></i></div>
              <div class="s10-hero-text">
                <h3 class="s10-hero-title">Model Bisnis & Profitabilitas</h3>
                <p class="s10-hero-sub">Kelayakan usaha diuji melalui 4 pilar finansial terukur</p>
              </div>
            </div>

            <!-- 4 Interactive Step Tabs -->
            <div class="s10-nav-tabs">
              <div class="s10-nav-pillar ${step === 1 ? 'active-pillar' : ''} ${step > 1 ? 'passed-pillar' : ''}" data-step="1" role="button" tabindex="0">
                <span class="p-num">01</span>
                <div class="p-info">
                  <strong>2 Mitra Vendor & Biaya Tetap</strong>
                  <span>Utama Grafika & Bagja • FC Rp 350k</span>
                </div>
                <span class="p-status"><i class="${step > 1 ? 'ri-check-line' : (step === 1 ? 'ri-arrow-right-line' : 'ri-arrow-right-s-line')}"></i></span>
              </div>

              <div class="s10-nav-pillar ${step === 2 ? 'active-pillar' : ''} ${step > 2 ? 'passed-pillar' : ''}" data-step="2" role="button" tabindex="0">
                <span class="p-num">02</span>
                <div class="p-info">
                  <strong>Matriks HPP vs Harga Jual</strong>
                  <span>9 Komoditas Produk • Margin 31%–100%</span>
                </div>
                <span class="p-status"><i class="${step > 2 ? 'ri-check-line' : (step === 2 ? 'ri-arrow-right-line' : 'ri-arrow-right-s-line')}"></i></span>
              </div>

              <div class="s10-nav-pillar ${step === 3 ? 'active-pillar' : ''} ${step > 3 ? 'passed-pillar' : ''}" data-step="3" role="button" tabindex="0">
                <span class="p-num">03</span>
                <div class="p-info">
                  <strong>Break Even Point (BEP)</strong>
                  <span>Target Impas • Bukti 1 Event 129%</span>
                </div>
                <span class="p-status"><i class="${step > 3 ? 'ri-check-line' : (step === 3 ? 'ri-arrow-right-line' : 'ri-arrow-right-s-line')}"></i></span>
              </div>

              <div class="s10-nav-pillar ${step === 4 ? 'active-pillar' : ''} ${step > 4 ? 'passed-pillar' : ''}" data-step="4" role="button" tabindex="0">
                <span class="p-num">04</span>
                <div class="p-info">
                  <strong>Bagi Hasil 4 Anggota Tim</strong>
                  <span>Rp 254.000 – Rp 608.000 / orang / bln</span>
                </div>
                <span class="p-status"><i class="${step > 4 ? 'ri-check-line' : (step === 4 ? 'ri-arrow-right-line' : 'ri-arrow-right-s-line')}"></i></span>
              </div>
            </div>

            <div class="s10-step0-hint">
              <i class="ri-cursor-line"></i> Klik salah satu pilar atau tekan <strong>[1-4]</strong> / <strong>Spasi</strong> untuk eksplorasi interaktif
            </div>
          </div>

          <!-- Right Dynamic Inspection Showcase -->
          <div class="s10-showcase-deck">
            
            <!-- Panel 1: Vendor Rekanan & Rantai Pasok (Step 1) -->
            <div class="s10-focus-panel panel-step-1 ${step === 1 ? 'panel-active' : ''}" data-step="1">
              <div class="s10-panel-header">
                <div class="s10-tag-wrap">
                  <span class="s10-tag"><i class="ri-store-2-line"></i> PILAR 01</span>
                  <span class="s10-tag-sub">Rantai Pasok Produksi Mandiri</span>
                </div>
                <h3 class="s10-panel-title">2 Mitra Vendor Rekanan & Struktur Biaya Tetap</h3>
              </div>

              <div class="s10-vendors-grid">
                <div class="s10-vendor-card card-v1">
                  <div class="vcard-top">
                    <div class="vcard-badge">VENDOR 01</div>
                    <span class="vcard-loc"><i class="ri-map-pin-2-line"></i> Solo Raya</span>
                  </div>
                  <h4 class="vcard-name">Utama Grafika</h4>
                  <p class="vcard-desc">Mitra produksi cetak presisi untuk atribut kartu identitas dan pin peniti seragam. Menawarkan MOQ fleksibel mulai 50 pcs ramah kantong organisasi sekolah.</p>
                  <div class="vcard-products">
                    <div class="vp-item">
                      <span class="vp-name">Pin Peniti Glossy</span>
                      <strong class="vp-price">HPP: Rp 2.000</strong>
                    </div>
                    <div class="vp-item">
                      <span class="vp-name">Tali Lanyard Saja (50-150 pcs)</span>
                      <strong class="vp-price">HPP: Rp 8.500</strong>
                    </div>
                    <div class="vp-item">
                      <span class="vp-name">Paket ID Card + Lanyard (1 Sisi)</span>
                      <strong class="vp-price">HPP: Rp 8.500</strong>
                    </div>
                    <div class="vp-item">
                      <span class="vp-name">Paket ID Card + Lanyard (2 Sisi)</span>
                      <strong class="vp-price">HPP: Rp 10.500</strong>
                    </div>
                  </div>
                </div>

                <div class="s10-vendor-card card-v2">
                  <div class="vcard-top">
                    <div class="vcard-badge">VENDOR 02</div>
                    <span class="vcard-loc"><i class="ri-map-pin-2-line"></i> Sragen</span>
                  </div>
                  <h4 class="vcard-name">Bagja</h4>
                  <p class="vcard-desc">Mitra produksi akrilik laser cut, digital printing outdoor, packaging, dan stiker. Waktu pengerjaan ekspres 1–2 hari kerja siap ambil tanpa biaya ongkos kirim ekspedisi.</p>
                  <div class="vcard-products">
                    <div class="vp-item">
                      <span class="vp-name">Ganci Akrilik Custom</span>
                      <strong class="vp-price">HPP: Rp 3.500</strong>
                    </div>
                    <div class="vp-item">
                      <span class="vp-name">Banner MMT Flexi 280g</span>
                      <strong class="vp-price">HPP: Rp 15.000/m</strong>
                    </div>
                    <div class="vp-item">
                      <span class="vp-name">Paperbag Ekskul Custom</span>
                      <strong class="vp-price">HPP: Rp 10.000</strong>
                    </div>
                    <div class="vp-item">
                      <span class="vp-name">Stiker Cetak Meteran / A3</span>
                      <strong class="vp-price">HPP: Rp 4.500/m</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div class="s10-fixed-cost-bar">
                <div class="fc-bar-left">
                  <div class="fc-bar-ico"><i class="ri-shield-keyhole-line"></i></div>
                  <div>
                    <strong>Biaya Tetap Operasional (Fixed Cost Bulanan):</strong>
                    <p>Biaya operasional yang harus tertutup setiap bulan agar bisnis tetap berjalan sehat</p>
                  </div>
                </div>
                <div class="fc-bar-right">
                  <div class="fc-amount">Rp 350.000 <small>/ bln</small></div>
                  <div class="fc-chips">
                    <span>Kuota: 100k</span> • <span>Bensin Kurir: 100k</span> • <span>Kemasan/Label: 75k</span> • <span>Cadangan Garansi: 75k</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Panel 2: Matriks Detail HPP & Margin (Step 2) -->
            <div class="s10-focus-panel panel-step-2 ${step === 2 ? 'panel-active' : ''}" data-step="2">
              <div class="s10-panel-header">
                <div class="s10-tag-wrap">
                  <span class="s10-tag"><i class="ri-scales-3-line"></i> PILAR 02</span>
                  <span class="s10-tag-sub">Kalkulasi Margin Sehat</span>
                </div>
                <h3 class="s10-panel-title">Struktur HPP, Harga Jual & Margin Kotor 9 Produk</h3>
              </div>

              <div class="s10-table-card">
                <table class="s10-matrix-table">
                  <thead>
                    <tr>
                      <th>No</th>
                      <th>Komoditas Produk / Jasa</th>
                      <th>Sumber Produksi</th>
                      <th>HPP Vendor</th>
                      <th>Harga Jual Siswa</th>
                      <th>Margin Bersih</th>
                      <th>Persentase</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td class="td-no">1</td>
                      <td><strong>Paket ID Card + Lanyard (1 Sisi)</strong></td>
                      <td><span class="source-tag v1">Utama Grafika</span></td>
                      <td>Rp 8.500</td>
                      <td>Rp 13.500</td>
                      <td class="td-profit">+Rp 5.000</td>
                      <td><span class="pct-badge">37,0%</span></td>
                    </tr>
                    <tr>
                      <td class="td-no">2</td>
                      <td><strong>Paket ID Card + Lanyard (2 Sisi)</strong></td>
                      <td><span class="source-tag v1">Utama Grafika</span></td>
                      <td>Rp 10.500</td>
                      <td>Rp 16.000</td>
                      <td class="td-profit">+Rp 5.500</td>
                      <td><span class="pct-badge">34,4%</span></td>
                    </tr>
                    <tr>
                      <td class="td-no">3</td>
                      <td><strong>Tali Lanyard Saja (50–150 pcs)</strong></td>
                      <td><span class="source-tag v1">Utama Grafika</span></td>
                      <td>Rp 8.500</td>
                      <td>Rp 12.500</td>
                      <td class="td-profit">+Rp 4.000</td>
                      <td><span class="pct-badge">32,0%</span></td>
                    </tr>
                    <tr>
                      <td class="td-no">4</td>
                      <td><strong>Pin Peniti Glossy Bulat</strong></td>
                      <td><span class="source-tag v1">Utama Grafika</span></td>
                      <td>Rp 2.000</td>
                      <td>Rp 4.000</td>
                      <td class="td-profit highlight-profit">+Rp 2.000</td>
                      <td><span class="pct-badge high">50,0%</span></td>
                    </tr>
                    <tr>
                      <td class="td-no">5</td>
                      <td><strong>Gantungan Kunci Akrilik 2 Sisi</strong></td>
                      <td><span class="source-tag v2">Bagja</span></td>
                      <td>Rp 3.500</td>
                      <td>Rp 6.000</td>
                      <td class="td-profit highlight-profit">+Rp 2.500</td>
                      <td><span class="pct-badge high">41,7%</span></td>
                    </tr>
                    <tr>
                      <td class="td-no">6</td>
                      <td><strong>Banner MMT Outdoor (per meter)</strong></td>
                      <td><span class="source-tag v2">Bagja</span></td>
                      <td>Rp 15.000</td>
                      <td>Rp 22.000</td>
                      <td class="td-profit">+Rp 7.000</td>
                      <td><span class="pct-badge">31,8%</span></td>
                    </tr>
                    <tr>
                      <td class="td-no">7</td>
                      <td><strong>Paperbag Ekskul Tebal</strong></td>
                      <td><span class="source-tag v2">Bagja</span></td>
                      <td>Rp 10.000</td>
                      <td>Rp 15.000</td>
                      <td class="td-profit">+Rp 5.000</td>
                      <td><span class="pct-badge">33,3%</span></td>
                    </tr>
                    <tr>
                      <td class="td-no">8</td>
                      <td><strong>Stiker Meteran / A3 Cetak</strong></td>
                      <td><span class="source-tag v2">Bagja</span></td>
                      <td>Rp 4.500</td>
                      <td>Rp 9.000</td>
                      <td class="td-profit highlight-profit">+Rp 4.500</td>
                      <td><span class="pct-badge high">50,0%</span></td>
                    </tr>
                    <tr class="row-pure-service">
                      <td class="td-no star">★</td>
                      <td><strong>Jasa Desain Baju PDH & Topi</strong></td>
                      <td><span class="source-tag internal">Internal Almera</span></td>
                      <td><strong>Rp 0</strong></td>
                      <td>Rp 25.000 – 50.000</td>
                      <td class="td-profit max-profit">+Rp 25k–50k</td>
                      <td><span class="pct-badge crown">100% LABA</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <!-- Panel 3: Formula Titik Impas & Pembuktian 1 Event (Step 3) -->
            <div class="s10-focus-panel panel-step-3 ${step === 3 ? 'panel-active' : ''}" data-step="3">
              <div class="s10-panel-header">
                <div class="s10-tag-wrap">
                  <span class="s10-tag"><i class="ri-pie-chart-2-line"></i> PILAR 03</span>
                  <span class="s10-tag-sub">Metode Titik Impas</span>
                </div>
                <h3 class="s10-panel-title">Analisis Break Even Point (BEP) & Pembuktian 1 Event</h3>
              </div>

              <div class="s10-bep-split">
                <div class="s10-bep-formula-box">
                  <span class="bep-box-kicker">FORMULA DASAR TITIK IMPAS</span>
                  <div class="bep-formula-display">
                    <span class="f-part">BEP Unit</span>
                    <span class="f-eq">=</span>
                    <span class="f-fraction">
                      <span class="f-top">Fixed Cost (Rp 350.000)</span>
                      <span class="f-bottom">Margin Kontribusi per Unit</span>
                    </span>
                  </div>

                  <div class="bep-targets-list">
                    <div class="bep-tar-row">
                      <span class="b-prod"><i class="ri-id-card-line"></i> Paket ID Card + Lanyard:</span>
                      <span class="b-math">350k / 5k</span>
                      <strong class="b-target">70 Paket</strong>
                    </div>
                    <div class="bep-tar-row">
                      <span class="b-prod"><i class="ri-key-2-line"></i> Ganci Akrilik Custom:</span>
                      <span class="b-math">350k / 2.5k</span>
                      <strong class="b-target">140 Pcs</strong>
                    </div>
                    <div class="bep-tar-row">
                      <span class="b-prod"><i class="ri-flag-2-line"></i> Banner MMT Outdoor:</span>
                      <span class="b-math">350k / 7k</span>
                      <strong class="b-target">50 Meter</strong>
                    </div>
                    <div class="bep-tar-row">
                      <span class="b-prod"><i class="ri-t-shirt-2-line"></i> Jasa Desain Baju PDH:</span>
                      <span class="b-math">350k / 35k</span>
                      <strong class="b-target">10 Pesanan</strong>
                    </div>
                  </div>
                </div>

                <div class="s10-bep-proof-box">
                  <div class="proof-top">
                    <div class="proof-crown"><i class="ri-trophy-fill"></i></div>
                    <div>
                      <span class="proof-badge">PEMBUKTIAN KELAYAKAN RIIL</span>
                      <h4 class="proof-title">Simulasi 1 Kepanitiaan Event Ekskul</h4>
                    </div>
                  </div>
                  <p class="proof-scenario">
                    1 Event Pelantikan Gabungan (OSIS / PMR / Pramuka) memesan paket kepanitiaan standar Almera:
                  </p>

                  <div class="proof-ledger">
                    <div class="ledger-row">
                      <span>50 Paket ID Card + Lanyard (@Rp 5.000):</span>
                      <strong>Rp 250.000</strong>
                    </div>
                    <div class="ledger-row">
                      <span>50 Ganci Akrilik Pelantikan (@Rp 2.500):</span>
                      <strong>Rp 125.000</strong>
                    </div>
                    <div class="ledger-row">
                      <span>2 Banner MMT 3x1m (6 meter @Rp 7.000):</span>
                      <strong>Rp 42.000</strong>
                    </div>
                    <div class="ledger-row">
                      <span>1 Desain Baju PDH Panitia (@Rp 35.000):</span>
                      <strong>Rp 35.000</strong>
                    </div>
                    <div class="ledger-divider"></div>
                    <div class="ledger-row ledger-gross">
                      <span>Total Laba Kotor Terkumpul:</span>
                      <strong>Rp 452.000</strong>
                    </div>
                    <div class="ledger-row ledger-fc">
                      <span>Biaya Tetap Operasional (FC):</span>
                      <span class="neg-fc">- Rp 350.000</span>
                    </div>
                    <div class="ledger-row ledger-net">
                      <span>Laba Bersih Kas Langsung:</span>
                      <span class="net-profit">+ Rp 102.000</span>
                    </div>
                  </div>

                  <div class="proof-verdict">
                    <i class="ri-checkbox-circle-fill"></i>
                    <span><strong>BEP Tercapai 129%!</strong> Hanya butuh 1 event dalam sebulan untuk langsung balik modal dan membukukan laba bersih!</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Panel 4: Proyeksi Profit Sharing 4 Anggota (Step 4) -->
            <div class="s10-focus-panel panel-step-4 ${step === 4 ? 'panel-active' : ''}" data-step="4">
              <div class="s10-panel-header">
                <div class="s10-tag-wrap">
                  <span class="s10-tag"><i class="ri-group-line"></i> PILAR 04</span>
                  <span class="s10-tag-sub">Bagi Hasil & Kesejahteraan Anggota</span>
                </div>
                <h3 class="s10-panel-title">Proyeksi Penghasilan 4 Anggota Tim per Bulan</h3>
              </div>

              <div class="s10-members-strip">
                <div class="m-pill">
                  <img src="/img/Almera.png" alt="Kelvin" class="m-avatar">
                  <div class="m-info">
                    <strong>Kelvin N. R.</strong>
                    <span>Procurement Marketing</span>
                  </div>
                </div>
                <div class="m-pill">
                  <img src="/img/Almera.png" alt="Mandala" class="m-avatar">
                  <div class="m-info">
                    <strong>Mandala A. S.</strong>
                    <span>Creative Design Lead</span>
                  </div>
                </div>
                <div class="m-pill">
                  <img src="/img/Almera.png" alt="Uzairon" class="m-avatar">
                  <div class="m-info">
                    <strong>M. Uzairon I.</strong>
                    <span>Coordinator & Strategic</span>
                  </div>
                </div>
                <div class="m-pill">
                  <img src="/img/Almera.png" alt="Rangga" class="m-avatar">
                  <div class="m-info">
                    <strong>Rangga Aji H.</strong>
                    <span>Management Financial</span>
                  </div>
                </div>
              </div>

              <div class="s10-scenarios-grid">
                <!-- Skenario 1: Bulan Normal -->
                <div class="scenario-box normal">
                  <div class="sc-header">
                    <span class="sc-badge">TARGET NORMAL (2–3 EVENT / BULAN)</span>
                    <span class="sc-freq">Bulan Sekolah Reguler</span>
                  </div>
                  <div class="sc-calc">
                    <div class="sc-item">
                      <span>Omset Penjualan:</span>
                      <strong>Rp 4.200.000</strong>
                    </div>
                    <div class="sc-item">
                      <span>Laba Kotor Terkumpul:</span>
                      <strong>Rp 1.620.000</strong>
                    </div>
                    <div class="sc-item">
                      <span>Biaya Tetap Operasional (FC):</span>
                      <strong class="neg">- Rp 350.000</strong>
                    </div>
                    <div class="sc-item sc-net">
                      <span>Laba Bersih Usaha:</span>
                      <strong class="net-highlight">Rp 1.270.000</strong>
                    </div>
                  </div>
                  <div class="sc-split-bar">
                    <div class="split-kas">
                      <span>Kas Tabungan Almera (20%):</span>
                      <strong>Rp 254.000</strong>
                    </div>
                    <div class="split-members">
                      <span class="split-lbl">BAGI HASIL PER ORANG (25%):</span>
                      <div class="split-val anim-glow-val">Rp 254.000 <small>/ org / bln</small></div>
                    </div>
                  </div>
                </div>

                <!-- Skenario 2: Peak Season -->
                <div class="scenario-box peak">
                  <div class="sc-header">
                    <span class="sc-badge peak-badge">PEAK SEASON (MUSIM RAMAI)</span>
                    <span class="sc-freq">MPLS, Pelantikan Serentak & Classmeeting</span>
                  </div>
                  <div class="sc-calc">
                    <div class="sc-item">
                      <span>Omset Penjualan:</span>
                      <strong>Rp 8.500.000</strong>
                    </div>
                    <div class="sc-item">
                      <span>Laba Kotor Terkumpul:</span>
                      <strong>Rp 3.490.000</strong>
                    </div>
                    <div class="sc-item">
                      <span>Biaya Tetap Operasional (FC):</span>
                      <strong class="neg">- Rp 450.000</strong>
                    </div>
                    <div class="sc-item sc-net">
                      <span>Laba Bersih Usaha:</span>
                      <strong class="net-highlight peak-text">Rp 3.040.000</strong>
                    </div>
                  </div>
                  <div class="sc-split-bar">
                    <div class="split-kas">
                      <span>Kas Tabungan Almera (20%):</span>
                      <strong>Rp 608.000</strong>
                    </div>
                    <div class="split-members peak-members">
                      <span class="split-lbl">BAGI HASIL PER ORANG (25%):</span>
                      <div class="split-val anim-glow-val peak-glow">Rp 608.000 <small>/ org / bln</small></div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="s10-conclusion-note">
                <div class="note-icon"><i class="ri-lightbulb-flash-line"></i></div>
                <p>
                  <strong>Simpulan Kesejahteraan Tim:</strong> Di sela jam sekolah di SMK Negeri 2 Sragen, setiap anggota kelompok Almera memperoleh penghasilan mandiri <strong>Rp 254.000 – Rp 608.000 per bulan</strong> sekaligus membangun aset kas usaha cadangan secara berkelanjutan.
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    `
  },

  // ==========================================
  // SLIDE 11: Struktur Harga & Interactive Profit Calculator
  // ==========================================
  {
    id: 11,
    title: "Struktur Harga & Simulasi Omset",
    subSteps: 0,
    render: () => `
      <div class="slide-content anim-slide-11">
        <div class="slide-header anim-header">
          <span class="slide-eyebrow">Pricing Strategy & Interactive Simulation</span>
          <h2 class="slide-heading">Daftar Harga & Simulasi Omset Interaktif</h2>
          <p class="slide-desc">Pricelist kompetitif dengan margin sehat yang dapat disimulasikan secara langsung di hadapan dewan penguji.</p>
        </div>

        <div class="pricing-simulator-grid">
          <div class="pricing-list-box">
            <div class="box-header-flex">
              <h3 class="box-heading">Pricelist Resmi Almera</h3>
              <span class="box-tag">Katalog 2026</span>
            </div>
            <div class="price-row anim-prow-1">
              <div class="prod-meta">
                <span class="prod-name">Paket ID Card + Lanyard</span>
                <span class="prod-sub">Cetak custom 1 / 2 sisi glossy</span>
              </div>
              <span class="tag-price">Rp 13.500 – 16.000 / pkt</span>
            </div>
            <div class="price-row anim-prow-2">
              <div class="prod-meta">
                <span class="prod-name">Ganci Akrilik Custom</span>
                <span class="prod-sub">Laser cut 2 sisi anti-gores</span>
              </div>
              <span class="tag-price">Rp 6.000 / pcs</span>
            </div>
            <div class="price-row anim-prow-3">
              <div class="prod-meta">
                <span class="prod-name">Pin Peniti Glossy</span>
                <span class="prod-sub">Lapis glossy anti-karat</span>
              </div>
              <span class="tag-price">Rp 4.000 / pcs</span>
            </div>
            <div class="price-row anim-prow-4">
              <div class="prod-meta">
                <span class="prod-name">Banner MMT Outdoor</span>
                <span class="prod-sub">Flexi 280g + ring mata ayam</span>
              </div>
              <span class="tag-price">Rp 22.000 / meter</span>
            </div>
            <div class="price-row anim-prow-5">
              <div class="prod-meta">
                <span class="prod-name">Jasa Desain Baju PDH</span>
                <span class="prod-sub">Vector & mockup siap konveksi</span>
              </div>
              <span class="tag-price">Rp 25.000 – 50.000</span>
            </div>
          </div>

          <div class="calc-widget-box anim-calc-box">
            <div class="box-header-flex">
              <h3 class="box-heading">Simulasi Pesanan Ekskul (Live)</h3>
              <span class="live-pill"><span class="pulse-dot"></span> LIVE CALCULATOR</span>
            </div>
            
            <div class="calc-controls">
              <div class="calc-field">
                <label for="calc-product">Pilih Kategori Produk:</label>
                <div class="custom-select-wrap">
                  <select id="calc-product" class="calc-input">
                    <option value="idcard">Paket ID Card + Lanyard (Jual: Rp 13.5k • Margin: Rp 5k/pkt)</option>
                    <option value="ganci">Ganci Akrilik (Jual: Rp 6k • Margin: Rp 2.5k/pcs)</option>
                    <option value="pin">Pin Peniti Glossy (Jual: Rp 4k • Margin: Rp 2k/pcs)</option>
                    <option value="mmt">Banner MMT 3x1m (Jual: Rp 66k • Margin: Rp 21k/pcs)</option>
                    <option value="paperbag">Paperbag Ekskul (Jual: Rp 15k • Margin: Rp 5k/pcs)</option>
                    <option value="desain_pdh">Jasa Desain PDH (Jual: Rp 35k • Margin: Rp 35k/desain)</option>
                  </select>
                </div>
              </div>
              
              <div class="calc-field">
                <label for="calc-qty">Estimasi Jumlah Pesanan (Pcs/Paket):</label>
                <input id="calc-qty" type="number" class="calc-input" value="50" min="1" max="500" />
              </div>
            </div>

            <div class="calc-result-panel">
              <div class="result-item">
                <span class="res-lbl">Total Nilai Omset:</span>
                <strong id="res-omset">Rp 675.000</strong>
              </div>
              <div class="result-item">
                <span class="res-lbl">Uang Muka (DP 50% Masuk):</span>
                <strong id="res-dp">Rp 337.500</strong>
              </div>
              <div class="result-item highlight-profit anim-profit-breathe">
                <span class="res-lbl">Estimasi Keuntungan Bersih:</span>
                <strong id="res-profit">Rp 250.000</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ==========================================
  // SLIDE 12: Target Konsumen & Strategi Promosi
  // ==========================================
  {
    id: 12,
    title: "Target Konsumen & Strategi Promosi",
    subSteps: 3,
    render: (step) => `
      <div class="slide-content anim-slide-12">
        <div class="slide-header anim-header">
          <span class="slide-eyebrow">Strategi Pemasaran & Kanal Distribusi</span>
          <h2 class="slide-heading">Target Pasar Spesifik & Taktik Penjualan</h2>
          <p class="slide-desc">Menjangkau konsumen potensial di lingkungan SMK Negeri 2 Sragen melalui kanal komunikasi yang paling efektif.</p>
        </div>

        <div class="promo-grid">
          <div class="promo-card card-wa sub-item ${step >= 1 ? 'revealed' : ''} ${step === 1 ? 'focus-active' : ''}" data-step="1">
            <div class="promo-icon-box anim-wa-icon"><i class="ri-whatsapp-line"></i></div>
            <span class="promo-tag">Kanal Prioritas #1</span>
            <h3>Grup WA Ketua Kelas & Ekskul</h3>
            <p>Promosi langsung ke para pengambil keputusan utama: Ketua OSIS, Pembina Pramuka, Rohis, PMR, Paskibra, Tim Olahraga, serta Ketua Kelas.</p>
            <div class="promo-meta-chips">
              <span class="p-chip">Direct Chat</span>
              <span class="p-chip">Fast Response</span>
            </div>
          </div>

          <div class="promo-card card-social sub-item ${step >= 2 ? 'revealed' : ''} ${step === 2 ? 'focus-active' : ''}" data-step="2">
            <div class="promo-icon-box anim-social-icon"><i class="ri-smartphone-line"></i></div>
            <span class="promo-tag">Kanal Visual #2</span>
            <h3>Media Sosial (Instagram & TikTok)</h3>
            <p>Konten video proses desain (*behind-the-scenes*), unboxing sampel produk merchandise fisik, serta testimoni kepuasan anggota ekskul.</p>
            <div class="promo-meta-chips">
              <span class="p-chip">Reels / TikTok</span>
              <span class="p-chip">Visual Showcase</span>
            </div>
          </div>

          <div class="promo-card card-pdf sub-item ${step >= 3 ? 'revealed' : ''} ${step === 3 ? 'focus-active' : ''}" data-step="3">
            <div class="promo-icon-box anim-pdf-icon"><i class="ri-file-pdf-2-line"></i></div>
            <span class="promo-tag">Kanal Portofolio #3</span>
            <h3>Katalog Digital Canva & PDF</h3>
            <p>Brosur interaktif berisi pricelist lengkap, simulasi perhitungan harga borongan, dan foto mockup sampel yang mudah disebarkan via tautan.</p>
            <div class="promo-meta-chips">
              <span class="p-chip">Interactive PDF</span>
              <span class="p-chip">E-Catalog Link</span>
            </div>
          </div>
        </div>
      </div>
    `
  },

  // ==========================================
  // SLIDE 13: Kesimpulan, Harapan & Sesi Q&A
  // ==========================================
  {
    id: 13,
    title: "Kesimpulan, Harapan & Sesi Q&A",
    subSteps: 1,
    render: (step) => `
      <div class="slide-content slide-closing anim-slide-13">
        <div class="slide-header anim-header text-center">
          <span class="slide-eyebrow">Penutup Presentasi Rencana Usaha</span>
          <h2 class="slide-heading">Kesimpulan & Komitmen Berkelanjutan</h2>
        </div>

        <div class="closing-summary">
          <div class="summary-box box-left anim-box-left">
            <div class="summary-icon anim-icon-glow"><i class="ri-lightbulb-line"></i></div>
            <h4>Kesimpulan Rencana Bisnis</h4>
            <p>Tingginya kebutuhan ekskul terhadap identitas seragam dan merchandise bermutu membuka peluang usaha yang sangat terukur bagi <strong>ALMERA</strong> sebagai unit wirausaha siswa yang mandiri, berdaya saing, dan berisiko modal nol (*zero risk*).</p>
          </div>

          <div class="summary-box box-right anim-box-right">
            <div class="summary-icon anim-icon-glow"><i class="ri-rocket-2-line"></i></div>
            <h4>Harapan Jangka Panjang</h4>
            <p>Almera bertekad menjadi mitra kreatif nomor satu bagi seluruh organisasi di SMK Negeri 2 Sragen, mempermudah siswa memiliki seragam dan cenderamata resmi yang membanggakan, serta menjadi inspirasi wirausaha kejuruan nyata.</p>
          </div>
        </div>

        <div class="qa-banner sub-item ${step >= 1 ? 'revealed' : ''} anim-qa-banner" data-step="1">
          <div class="qa-content">
            <div class="qa-badge-top anim-qa-badge">SESI DISKUSI TERBUKA</div>
            <h3 class="qa-title">Sesi Tanya Jawab (Q&A) Dibuka</h3>
            <p class="qa-desc">Terima kasih atas perhatian Bapak/Ibu Guru Pembimbing, Dewan Penguji, serta rekan-rekan sekalian.</p>
          </div>
          <div class="qa-action-box">
            <div class="qa-pulse-disc anim-ripple-disc">
              <span class="qa-mic-icon"><i class="ri-chat-smile-3-line"></i></span>
              <div class="ripple-ring r1"></div>
              <div class="ripple-ring r2"></div>
              <div class="ripple-ring r3"></div>
            </div>
            <div class="qa-badge anim-qa-pill">Kelompok ALMERA • SMK N 2 Sragen</div>
          </div>
        </div>
      </div>
    `
  }
];

// Ekspor ke window jika di browser atau module.exports jika di Node
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SLIDES_DATA;
}
