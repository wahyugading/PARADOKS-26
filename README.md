# Culinary Journey: Menjelajahi Rasa Nusantara 🇮🇩🍲

Selamat datang di repositori **Culinary Journey: Menjelajahi Rasa Nusantara**! Proyek ini adalah sebuah *web story* interaktif dan *visual essay scrollytelling* yang menyajikan perjalanan kuliner imersif dari tiga wilayah ikonik di Indonesia: **Yogyakarta**, **Sumatera Selatan**, dan **Nusa Tenggara Barat**.

Proyek ini menggabungkan narasi budaya yang kaya dengan visualisasi data interaktif menggunakan dataset kuliner riil (dataset Kaggle) guna menghadirkan representasi komprehensif atas profil rasa dan nilai gizi kuliner khas nusantara.

---

## 📂 Struktur Repositori

Berikut adalah pemetaan terperinci dari struktur folder dan berkas dalam repositori ini:

```text
PARADOKS-26-1/
├── BERKAS ADM/                     # Berkas Administrasi & Laporan Proyek
│   ├── Laporan-Pengerjaan-Culinary-Journey.docx    # Dokumen laporan resmi (Word)
│   ├── Laporan-Pengerjaan-Culinary-Journey.md      # Laporan proyek dalam format Markdown
│   ├── kerangka-kerja-culinary-journey.md          # Dokumen kerangka kerja (framing & requirements)
│   └── teori visualisasi.md                        # Catatan teori dan konsep visualisasi data yang digunakan
│
├── DESIGN/                         # Aset & Rancangan Desain UI/UX
│   ├── stitch_rasa_nusantara_visual_essay.zip      # Arsip kompresi seluruh aset desain
│   └── stitch_rasa_nusantara_visual_essay/         # Folder aset desain visual essay
│       ├── data_insights_dashboard/                # Desain dashboard wawasan data
│       ├── landing_page_culinary_journey/          # Desain beranda utama
│       ├── nusantara_narrative/                    # Desain alur narasi nusantara
│       └── region_exploration_yogyakarta/          # Desain halaman eksplorasi wilayah (Yogyakarta)
│
├── REFERENSI DATA/                 # Dokumen Referensi & Data Mentah Pendukung
│   ├── food-and-beverage-service-actvities-statistics-2023.pdf  # PDF statistik F&B 2023
│   ├── statistik-penyediaan-makanan-minuman-2024.pdf            # PDF statistik F&B 2024
│   ├── map_paradoks.json                            # Data geoJSON peta Indonesia untuk visualisasi
│   └── peta-rasa-nusantara.html                     # Prototipe peta interaktif rasa nusantara
│
└── culinary-journey/               # Aplikasi Web Utama (Frontend Web Story)
    ├── index.html                  # Halaman Utama (Landing Page & Hero Section)
    ├── insight.html                # Halaman Dashboard Analisis & Perbandingan Data Kuliner
    ├── yogyakarta.html             # Eksplorasi Kuliner Wilayah D.I. Yogyakarta
    ├── sumatera-selatan.html       # Eksplorasi Kuliner Wilayah Sumatera Selatan
    ├── nusa-tenggara-barat.html    # Eksplorasi Kuliner Wilayah Nusa Tenggara Barat
    │
    ├── assets/                     # Aset Statis Website
    │   ├── css/
    │   │   └── main.css            # Styling utama website
    │   ├── js/
    │   │   ├── main.js             # Logika interaktivitas umum & navigasi
    │   │   ├── region.js           # Logika interaktif eksplorasi kuliner wilayah
    │   │   └── charts.js           # Konfigurasi visualisasi grafik
    │   └── media/                  # Galeri Media & Gambar (Hasil Generate AI Premium)
    │       ├── ntb/                # Galeri Foto Makanan & Kain Tenun NTB (Kustom)
    │       ├── sumsel/             # Galeri Foto Makanan & Songket Sumsel
    │       └── yogya/              # Galeri Foto Makanan & Batik Yogyakarta
    │
    └── data/                       # File Data JSON untuk Dinamisasi Konten Kuliner
        ├── insight.json            # Data statistik perbandingan gizi & rasa antar wilayah
        ├── yogyakarta.json         # Data kuliner detail Yogyakarta
        ├── sumatera-selatan.json   # Data kuliner detail Sumatera Selatan
        └── nusa-tenggara-barat.json # Data kuliner detail Nusa Tenggara Barat
```

---

## 🛠️ Stack Teknologi

Aplikasi web ini dibangun dengan teknologi modern, optimal, dan responsif tanpa *overhead* berlebih:

* **Markup**: HTML5 (Semantic HTML untuk struktur yang SEO-friendly)
* **Styling**: CSS3 (Variabel warna khusus tema nusantara & keyframe animasi)
* **Interaktivitas**: Vanilla JavaScript (Manipulasi DOM native untuk performa maksimal)
* **Visualisasi Grafik**: Chart.js / D3.js (Radar chart rasa 5 dimensi & bar chart gizi)
* **Scrollytelling & Efek**: Intersection Observer API (Efek transisi scroll & trigger animasi)
* **Pengolahan Data**: Python (Pandas) untuk *preprocessing* awal dataset kuliner

---

## 🌟 Fitur Utama Website

1. **Scrollytelling Nusantara**: Narasi interaktif yang membawa pengguna menyusuri peta kuliner seiring dengan digulirnya halaman.
2. **Eksplorasi 3 Wilayah**: Halaman eksplorasi interaktif khusus Yogyakarta, Sumatera Selatan, dan Nusa Tenggara Barat.
3. **Dashboard Analisis Nutrisi (Page Insight)**: Dashboard visualisasi data interaktif untuk membandingkan kalori, lemak, protein, dan karbohidrat kuliner antardaerah.
4. **Desain Immersive Responsif**: Tampilan visual kelas premium dengan mode gelap yang dioptimalkan penuh untuk seluler (*mobile*), tablet, dan desktop.

---

## 🌊 Fitur Khusus & Interaktivitas Halaman Nusa Tenggara Barat (NTB)

Halaman Nusa Tenggara Barat didesain khusus menggunakan pendekatan **Webstory Visual Imersif** dengan estetika terracotta hangat dan kain tradisional Sasak:

* **Immersive Hero Cover**: Halaman pembuka satu layar penuh (`100dvh`) menampilkan panorama Gunung Rinjani dan pemukiman Sasak di kala senja keemasan dengan efek **Parallax Depth Zoom** saat digulir.
* **Bilah Progres Membaca (Reading Progress Bar)**: Bar indikator kustom di atas layar yang berjalan seiring guliran kursor untuk memberi kesan storybook digital.
* **Peta Kuliner Lombok-Sumbawa**: Peta interaktif menampilkan siluet bentuk pulau asli Lombok, Sumbawa, Moyo, dan Sangeang dengan tooltip info kuliner yang stabil (bebas flicker).
* **Roda Kompas Rasa Sasak**: Kompas sirkular interaktif untuk menyaring hidangan berdasarkan arah rasa dengan jarum logam beranimasi memantul (*mechanical pegas wobble*).
* **Lontar Digital Sasak**: Modal visual tumpukan daun lontar bertingkat 3D yang terbuka secara berangsur (*staggered 3D unfolding*) dari kiri ke kanan saat menu diklik. Menampilkan resep, nutrisi, dan indikator rasa alami (elemen Api, Daun, Air).
* **Warung Sambal Ulek Sasak (Mini-Game)**: Arena ulekan interaktif di mana pengguna dapat memasukkan bahan baku pilihan ke cobek batu. Menekan tombol "Ulek Sambal!" memicu:
  * Cobek batu berguncang fisik.
  * Bar indikator tingkat proses ulekan berjalan linear 0% ke 100%.
  * Partikel serpihan kecil memuncrat secara dinamis dengan **warna yang disesuaikan bahan masukan** (Merah cabai/tomat, Hijau jeruk limau, Cokelat terasi, Ungu bawang).
  * Menghasilkan **11 kombinasi resep sambal Sasak** yang berbeda (tanpa menggunakan ikon emoji berlebih).
* **Canvas Atmosfer Partikel**: Spawning partikel bara api melayang naik (mode panas) atau daun mint berguguran (mode segar) di belakang grid menu secara dinamis, dengan fitur *auto-idle pause* saat mode netral untuk menghemat CPU.
* **3D Card Hover Tilt**: Seluruh kartu menu hidangan dan kartu bahan baku dapat melayang dan miring 3D mengikuti pergerakan kursor mouse secara dinamis.

---

## 🔌 Cara Instalasi & Menjalankan Proyek Secara Lokal

Karena aplikasi ini memuat data dinamis dari file JSON lokal menggunakan Fetch API (`data/yogyakarta.json`, dll.), browser akan memblokir permintaan tersebut jika Anda membuka file HTML secara langsung dengan mengklik dua kali (protokol `file://`) karena kebijakan keamanan CORS.

Untuk menjalankannya, Anda **wajib** menggunakan server lokal sederhana. Berikut 3 cara termudah untuk menginstalnya:

### Opsi A: Menggunakan VS Code Extension (Paling Praktis)
1. Buka folder `PARADOKS-26-1` menggunakan editor **VS Code**.
2. Masuk ke menu **Extensions** (ikon kotak di sisi kiri, atau tekan `Ctrl + Shift + X`).
3. Cari dan instal ekstensi bernama **Live Server** (oleh Ritwick Dey).
4. Buka file `culinary-journey/index.html`.
5. Klik tombol **Go Live** di pojok kanan bawah VS Code (atau klik kanan pada file HTML dan pilih *Open with Live Server*).
6. Website akan otomatis terbuka di browser pada alamat `http://127.0.0.1:5500/culinary-journey/index.html`.

### Opsi B: Menggunakan Python (Tanpa Instalasi Tambahan)
Jika Anda sudah memiliki Python terinstal di komputer, Anda bisa langsung menjalankan server bawaan:
1. Buka **Command Prompt** (Windows) atau **Terminal** (macOS/Linux).
2. Arahkan ke folder proyek menggunakan perintah `cd`:
   ```bash
   cd e:\paradoks\PARADOKS-26-1
   ```
3. Jalankan perintah server HTTP bawaan Python:
   ```bash
   python -m http.server 8000
   ```
4. Buka browser favorit Anda dan akses alamat berikut:
   ```text
   http://localhost:8000/culinary-journey/index.html
   ```

### Opsi C: Menggunakan Node.js (NPX)
Jika komputer Anda sudah terpasang Node.js, Anda dapat meluncurkan server instan tanpa instalasi global:
1. Buka terminal atau command prompt pada direktori root proyek `PARADOKS-26-1`.
2. Jalankan perintah berikut:
   ```bash
   npx serve
   ```
3. Salin alamat local port yang muncul di terminal (biasanya `http://localhost:3000`) dan tempel ke browser Anda, lalu navigasikan ke folder `culinary-journey/index.html`.

---

## 📝 Catatan Konversi ke Microsoft Word (.docx)

Jika Anda ingin menjadikan isi berkas README ini sebagai dokumen Word (.docx) resmi untuk keperluan administrasi atau laporan:

1. **Copy-Paste Langsung**: Buka berkas ini di editor Markdown (seperti VS Code atau Notepad), salin seluruh teksnya, lalu tempel (*paste*) langsung ke halaman Microsoft Word. Microsoft Word versi terbaru secara otomatis akan mengubah format Markdown (heading `#`, list `-`, dan teks tebal `**`) menjadi gaya teks dokumen Word secara instan dan rapi.
2. **Menggunakan Pandoc**: Jika Anda memiliki utilitas Pandoc terinstal di sistem, Anda bisa mengonversinya langsung via command line:
   ```bash
   pandoc README.md -o README.docx
   ```
