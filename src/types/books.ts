export type BookId = 'book-1' | 'book-2' | 'book-3';
export type BookLang = 'id-kasual' | 'id-standar' | 'en';
export type ReaderTheme = 'paper' | 'sepia' | 'night';

export interface ChapterMeta {
  index: number;          // 0 = Intro, 1..13 = Chapters, 14 = Appendix
  slug: string;           // 'ch-0' .. 'ch-14'
  title: string;
  isFreeSample: boolean;  // true when index <= 1
}

export interface ChapterData extends ChapterMeta {
  content: string;
}

export interface BookCatalogItem {
  id: BookId;
  number: 1 | 2 | 3;
  volumeCode: string;
  priceIdr: number;
  accentHex: string;
  titles: Record<BookLang, string>;
  subtitles: Record<BookLang, string>;
  targetRole: Record<BookLang, string>;
  keyFrameworks: Record<BookLang, string[]>;
}

export const BOOK_CATALOG: BookCatalogItem[] = [
  {
    id: 'book-1',
    number: 1,
    volumeCode: 'VOL. 01',
    priceIdr: 49000,
    accentHex: '#1D4ED8',
    titles: {
      'id-kasual': 'Mahir Memimpin Tim',
      'id-standar': 'Mahir Memimpin Tim',
      en: 'Practical Team Leadership',
    },
    subtitles: {
      'id-kasual': 'Strategi Bikin Tim Jadi Mandiri',
      'id-standar': 'Strategi Menciptakan Tim yang Mandiri',
      en: 'Developing Autonomous Teams',
    },
    targetRole: {
      'id-kasual': 'First-Time Leader, Supervisor & Tech Lead Baru',
      'id-standar': 'Pemimpin Tim Baru, Supervisor & Koordinator',
      en: 'First-Time Team Leads, Supervisors & Tech Leads',
    },
    keyFrameworks: {
      'id-kasual': [
        'Kerangka Kerja 4x4 (4 Obrolan Inti & 4 Skill Komunikasi)',
        'Rumus 3K (Keluaran, Kriteria Sukses, Kalender)',
        'Kalibrasi Kesiapan L1–L4 & Simulasi 4 Minggu',
      ],
      'id-standar': [
        'Kerangka Kerja 4x4 (4 Obrolan Inti & 4 Keterampilan)',
        'Rumus 3K (Keluaran, Kriteria Sukses, Kalender)',
        'Kalibrasi Kesiapan Tim L1–L4 & Simulasi 4 Pekan',
      ],
      en: [
        'The 4x4 Framework (4 Core Conversations & 4 Skills)',
        'The 3D Brief (Deliverable, Definition of Done, Deadline)',
        'L1–L4 Situational Readiness & 4-Week Coaching Simulation',
      ],
    },
  },
  {
    id: 'book-2',
    number: 2,
    priceIdr: 49000,
    volumeCode: 'VOL. 02',
    accentHex: '#EA580C',
    titles: {
      'id-kasual': 'Napas Panjang Memimpin Tim',
      'id-standar': 'Napas Panjang Memimpin Tim',
      en: 'Sustaining Your Leadership',
    },
    subtitles: {
      'id-kasual': 'Strategi Atasi Jenuh dan Bangun Sistem Kerja Otomatis',
      'id-standar': 'Strategi Mengatasi Kejenuhan dan Membangun Sistem Kerja Mandiri',
      en: 'Practical Strategies to Beat Burnout and Build Self-Running Teams',
    },
    targetRole: {
      'id-kasual': 'Leader yang Kewalahan, Sering Lembur & Hampir Burnout',
      'id-standar': 'Pemimpin Tim yang Kewalahan Operasional & Rentan Jenuh',
      en: 'Overwhelmed Leads Stuck in Daily Firefighting',
    },
    keyFrameworks: {
      'id-kasual': [
        'Audit Kalender 3P & Protokol Detachment Jam 6 Sore',
        'Anti-Monkey Management (Stop Ambil Alih Tugas Anak Tim)',
        'Cetak Biru Kaderisasi Tangan Kanan & Job Crafting 30/70',
      ],
      'id-standar': [
        'Audit Kalender 3P & Protokol Pemutusan Pikiran Jam 18.00',
        'Manajemen Anti-Ambil Alih Tugas & Negosiasi Kapasitas',
        'Kaderisasi Pelapis Kedua & Perancangan Peran 30/70',
      ],
      en: [
        '3R Weekly Calendar Audit & 6 PM Detachment Protocol',
        'Anti-Monkey Management & Data-Backed Capacity Negotiation',
        'Second-in-Command Bench Strength & 30/70 Job Crafting',
      ],
    },
  },
  {
    id: 'book-3',
    number: 3,
    priceIdr: 99000,
    volumeCode: 'VOL. 03',
    accentHex: '#0F766E',
    titles: {
      'id-kasual': 'Memimpin Para Leader',
      'id-standar': 'Memimpin Para Leader',
      en: 'Leading Other Leaders',
    },
    subtitles: {
      'id-kasual': 'Strategi Naik Kelas dari Mengatur Tim ke Menggerakkan Divisi',
      'id-standar': 'Strategi Naik Kelas dari Mengarahkan Tim ke Menggerakkan Divisi',
      en: 'Practical Strategies for Moving from Team Lead to Manager of Managers',
    },
    targetRole: {
      'id-kasual': 'Head of Dept, Engineering Manager, VP & Manajer Divisi',
      'id-standar': 'Kepala Divisi, Manajer Senior & Pemimpin Lintas Tim',
      en: 'Department Heads, Senior Managers & Directors',
    },
    keyFrameworks: {
      'id-kasual': [
        'Coaching the Coach & Jaga Wibawa Komando (Anti-Skip-Level)',
        'Piagam Sasaran Bersama 3S & Mediasi Silo 15 Menit',
        'Audit 1-on-1 Level Manajer (4P) & Cetak Biru 90 Hari',
      ],
      'id-standar': [
        'Membina Pemimpin Tim & Menjaga Rantai Komando (Anti-Skip-Level)',
        'Piagam Penyelarasan Lintas Tim 3S & Mediasi Gesekan Silo',
        'Bedah Sistem 4P & Cetak Biru Transisi Divisi 90 Hari',
      ],
      en: [
        'Coaching the Coach & Anti-Skip-Level Authority Guardrails',
        '3S Cross-Team Shared Charter & 15-Minute Seam Mediation',
        '4P System Audit & 90-Day Divisional Transition Blueprint',
      ],
    },
  },
];
