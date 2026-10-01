# ALMERA • Presentasi Rencana Bisnis KIK

Aplikasi web presentasi interaktif dan remote kontrol nirkabel berbasis **Node.js, Express, dan Socket.io** untuk pemaparan Rencana Bisnis KIK (Kewirausahaan dan Inovasi Kejuruan) kelompok **ALMERA** di **SMK Negeri 2 Sragen**.

---

## Ringkasan Proyek

**ALMERA** (*Creative Design & Merchandise*) adalah unit usaha rintisan siswa yang bergerak di bidang jasa desain grafis dan pembuatan merchandise kustom (baju PDH ekskul, gantungan kunci akrilik, totebag, dan banner) khusus untuk organisasi dan ekstrakurikuler sekolah dengan skema *zero-risk* uang muka (DP 50%).

Aplikasi ini menggabungkan tampilan slide presentasi resolusi tinggi di layar proyektor laptop dengan kendali penuh dari smartphone presenter melalui jaringan Wi-Fi lokal.

---

## Fitur Unggulan

### 1. Web Slide Presenter (Tampilan Laptop / Proyektor)
- **13 Slide Bisnis Interaktif:** Memuat analisis masalah sekolah, 8 ide solusi, matriks scoring terukur, profil tim, skema keuangan DP 50%, katalog 9 produk riil, analisis HPP & BEP vendor, hingga kalkulator harga live.
- **Koreografi Animasi Kinetik:** Animasi GPU-accelerated 60 FPS pada setiap pergantian slide dan sub-step.
- **Dekonstruksi Filosofi Logo (Slide 6):** Transisi sinematik *morphing* logo dan 5 poin analogi filosofis logo dengan efek sorot fokus tajam.
- **Rantai Pasok Vendor & Analisis BEP (Slide 10):** Transparansi kemitraan vendor (*Utama Grafika* & *Bagja*), matriks HPP per unit, pembuktian titik impas (BEP 1 event 129%), dan simulasi bagi hasil 4 anggota tim.
- **Kalkulator Simulasi Profit Live (Slide 11):** Widget interaktif untuk menghitung estimasi omset, DP 50%, dan margin keuntungan secara langsung saat presentasi berlangsung.
- **Dual-Theme Engine (Light & Dark Mode):** Mendukung Mode Gelap (*Dark Umber Earth*) dan Mode Terang (*Warm Artisanal Linen*) yang ramah proyektor dan berstandar aksesibilitas WCAG AAA/AA.

### 2. Mobile Remote Controller (Smartphone Web Clicker)
- **Koneksi Nirkabel Tanpa Aplikasi:** Cukup scan QR code di layar proyektor atau buka URL lokal via browser HP.
- **Sinkronisasi Realtime Socket.io:** Navigasi tombol *GIANT NEXT* dan *PREVIOUS* dengan latensi instan (<10ms).
- **Anti-Double-Tap & Haptic Feedback:** Proteksi debouncing 180ms serta getaran haptic pada smartphone saat menekan tombol.
- **Screen Wake Lock API:** Menjaga layar smartphone presenter tetap menyala selama durasi pemaparan.
- **Remote Theme Toggle:** Tombol pengubah tema di HP yang otomatis mengubah tema layar presenter secara *realtime*.
- **Live Stopwatch & Telemetry:** Pemantau waktu presentasi terpadu dengan indikator tahapan (0–5 menit Aman, 5–8 menit Inti, 8–10 menit Kritis).

---

## Anggota Tim Pengembang (Kelompok ALMERA)

| Nama Siswa | No. Presensi | Peran & Tanggung Jawab |
| :--- | :---: | :--- |
| **Kelvin Nur Ramadhan** | 02 | *Coordinator & Strategic Planning* |
| **Mandala Adi Santoso** | - | *Creative Design Lead & Mockup Specialist* |
| **Muhammad Uzairon Ibrahim** | - | *Vendor & Production Quality Controller* |
| **Rangga Aji Hidayatullah** | - | *Marketing, Digital Promo & Financial Ops* |

**Instansi:** SMK Negeri 2 Sragen  
**Program:** Kewirausahaan dan Inovasi Kejuruan (KIK)

---

## Struktur Direktori

```
almera/
├── public/
│   ├── css/
│   │   ├── presenter.css   # Stylesheet tampilan proyektor & animasi kinetik
│   │   └── remote.css      # Stylesheet smartphone remote clicker
│   ├── img/
│   │   └── Almera.png      # Aset logo resmi ALMERA
│   ├── js/
│   │   ├── presenter.js    # Logika presenter, rendering slide, & keyboard handler
│   │   ├── remote.js       # Logika remote clicker, haptic, & wake lock
│   │   └── slides-data.js  # Konten data & struktur template 12 slide
│   ├── index.html          # Halaman utama Presenter (Laptop)
│   └── remote.html         # Halaman Web Remote (Smartphone)
├── .gitignore              # Konfigurasi pengabaian file Git
├── package.json            # Manifest dependensi & skrip Node.js
├── README.md               # Dokumentasi proyek
└── server.js               # Server Express & Socket.io Room State Engine
```

---

## Panduan Instalasi & Menjalankan Aplikasi

### Prasyarat
- [Node.js](https://nodejs.org/) versi 18.x atau lebih baru.
- Laptop dan smartphone terhubung pada jaringan Wi-Fi yang sama (atau via hotspot seluler).

### Langkah Menjalankan

1. **Clone repositori:**
   ```bash
   git clone https://github.com/rnggajihdyt/almera.git
   cd almera
   ```

2. **Instal dependensi:**
   ```bash
   npm install
   ```

3. **Jalankan server aplikasi:**
   ```bash
   node server.js
   ```

4. **Buka aplikasi:**
   - **Tampilan Presenter:** Buka `http://localhost:3000` di browser laptop.
   - **Tampilan Remote HP:** Scan QR code yang muncul di pojok kanan atas layar laptop (atau tekan tombol **Q**), atau ketik URL lokal yang tertera di terminal (contoh: `http://192.168.1.x:3000/remote?room=ALMERA-XXXX`).

---

## Pintasan Keyboard (Laptop Presenter)

| Tombol Keyboard | Aksi |
| :--- | :--- |
| `Space` / `ArrowRight` / `PageDown` | Lanjut ke sub-step / slide berikutnya (*Next*) |
| `ArrowLeft` / `PageUp` | Kembali ke sub-step / slide sebelumnya (*Previous*) |
| `F` | Masuk / keluar mode layar penuh (*Fullscreen*) |
| `Q` | Membuka / menutup modal QR Code Pairing Remote |
| `T` | Mengganti tema (*Dark Earth* / *Warm Linen*) secara manual |

---

## Lisensi & Hak Cipta
Hak Cipta (c) 2026 Tim ALMERA • SMK Negeri 2 Sragen.
Dikembangkan khusus untuk keperluan Uji Rencana Bisnis & Pembelajaran KIK.
