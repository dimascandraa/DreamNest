// ============================================================
// MODEL — data.js
// Berisi semua data statis dan state aplikasi
// ============================================================

// ─── STATE GLOBAL ───
const AppState = {
  stats: {
    students: 350,
    teachers: 25,
    success: 98
  },
  waNumber: '6288994658865',
  heroBannerSrc: null,
  pendingAdmin: {
    heroSrc: null,
    galleryItems: [],
    teamPhotos: {},
    stats: {
      students: 350,
      teachers: 25,
      success: 98
    },
    waNumber: '6288994658865',
  },
  pendingDelete: null,
  lastSavedSnapshot: null,
  galleryImages: [],
  teamPhotos: {},
  currentGalleryFilter: 'all',
  lightboxIndex: 0,
  visibleGallery: [],
  adminLoggedIn: false,
  uploadTarget: null,
  ADMIN_PASSWORD: 'admin123',
};

// ─── DATA PROGRAM ───
const programs = [{
  level: 'SD',
  badge: 'Kelas 1–6',
  title: 'Bimbel Sekolah Dasar',
  desc: 'Program belajar menyenangkan untuk anak SD. Fokus pada pemahaman dasar Matematika, Bahasa Indonesia, dan IPA.',
  duration: '2× seminggu',
  students: '8–12 siswa',
  price: 'Rp 350.000',
  period: '/bulan',
  color: '#4A7C1F',
  emoji: '📚',
}, {
  level: 'SMP',
  badge: 'Kelas 7–9',
  title: 'Bimbel Sekolah Menengah',
  desc: 'Persiapan UN dan penguatan materi SMP. Matematika, IPA, IPS, Bahasa Inggris, dan Bahasa Indonesia.',
  duration: '3× seminggu',
  students: '6–10 siswa',
  price: 'Rp 500.000',
  period: '/bulan',
  color: '#1B3A6E',
  emoji: '🔬',
}, {
  level: 'SMA',
  badge: 'Kelas 10–12',
  title: 'Bimbel Sekolah Menengah Atas',
  desc: 'Persiapan UN, SNBT, dan UTBK. Semua mata pelajaran IPA/IPS dengan tutor spesialis.',
  duration: '4× seminggu',
  students: '4–8 siswa',
  price: 'Rp 750.000',
  period: '/bulan',
  color: '#E8652A',
  emoji: '🎯',
}, {
  level: 'UTBK',
  badge: 'Intensif',
  title: 'Persiapan SNBT & UTBK',
  desc: 'Program intensif khusus calon mahasiswa. Try out, pembahasan soal, dan strategi mengerjakan ujian.',
  duration: '5× seminggu',
  students: '4–6 siswa',
  price: 'Rp 1.200.000',
  period: '/bulan',
  color: '#C04E18',
  emoji: '🏆',
}, ];

// ─── DATA TESTIMONI ───
const testimonials = [{
  stars: 5,
  text: 'Anak saya yang tadinya takut Matematika sekarang jadi salah satu yang terbaik di kelas. Pengajarnya sabar dan metodenya menyenangkan sekali!',
  name: 'Ibu Susi W.',
  role: 'Orang tua siswa SMP',
  avatar: '👩',
}, {
  stars: 5,
  text: 'Alhamdulillah berkat bimbingan DreamNest, saya diterima di PTN impian saya. Try out rutin dan pembahasan soal sangat membantu!',
  name: 'Rizky Pratama',
  role: 'Alumni – Unair 2024',
  avatar: '👨‍🎓',
}, {
  stars: 5,
  text: 'Pelayanannya profesional, pengajarnya ramah, dan materinya selalu update. Sangat worth it!',
  name: 'Ibu Dewi R.',
  role: 'Orang tua siswa SD',
  avatar: '👩‍💼',
}, {
  stars: 5,
  text: 'Nilai rapot naik drastis setelah ikut bimbel di sini. Gurunya jago banget jelasin materi yang susah jadi gampang dipahami.',
  name: 'Anisa Putri',
  role: 'Siswa SMA Kelas 11',
  avatar: '👧',
}, {
  stars: 5,
  text: 'Fasilitas lengkap, bisa online maupun offline. Anakku jadi lebih semangat belajar dan nilainya terus meningkat.',
  name: 'Bapak Hendra K.',
  role: 'Orang tua siswa SMP',
  avatar: '👨',
}, {
  stars: 5,
  text: 'Program UTBK-nya intensif dan terstruktur. Pembahasan soal-soal SNBT sangat membantu persiapan saya.',
  name: 'Daffa Ardiansyah',
  role: 'Alumni – ITS 2024',
  avatar: '👨‍💻',
}, ];

// ─── DATA TIM PENGAJAR ───
const teamMembers = [{
  name: 'Budi Santoso, S.Pd',
  role: 'Pengajar Matematika',
  bio: 'Lulusan terbaik Pendidikan Matematika UNESA. 8 tahun pengalaman mengajar.',
  emoji: '👨‍🏫',
}, {
  name: 'Sari Dewi, M.Pd',
  role: 'Pengajar IPA / Biologi',
  bio: 'Master Pendidikan IPA dari UNAIR. Spesialis persiapan UTBK jurusan sains.',
  emoji: '👩‍🔬',
}, {
  name: 'Ahmad Fauzi, S.Kom',
  role: 'Pengajar TIK / Informatika',
  bio: 'Praktisi IT dan educator berpengalaman dalam kurikulum Informatika terbaru.',
  emoji: '👨‍💻',
}, {
  name: 'Rini Lestari, S.Pd',
  role: 'Pengajar Bahasa Inggris',
  bio: 'Certified IELTS trainer dengan nilai 8.0. Berpengalaman 6 tahun.',
  emoji: '👩‍💼',
}, ];

// ─── DATA GALERI DEFAULT ───
const defaultGallery = [{
  id: 1,
  category: 'kelas',
  caption: 'Suasana belajar kelompok SMP',
  src: null
}, {
  id: 2,
  category: 'prestasi',
  caption: 'Juara 1 Olimpiade Matematika',
  src: null
}, {
  id: 3,
  category: 'event',
  caption: 'Try Out Nasional Bersama',
  src: null
}, {
  id: 4,
  category: 'kelas',
  caption: 'Kelas intensif persiapan UN',
  src: null
}, {
  id: 5,
  category: 'prestasi',
  caption: 'Wisuda batch terbaik 2024',
  src: null
}, {
  id: 6,
  category: 'event',
  caption: 'Seminar motivasi belajar',
  src: null
}, ];

// Inisialisasi gallery dari default
AppState.galleryImages = [...defaultGallery];
