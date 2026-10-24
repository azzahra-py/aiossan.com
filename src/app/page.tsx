'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BOOK_CATALOG, BookId, BookLang } from '@/types/books';
import { formatIDR } from '@/lib/utils';
import { NavbarDoodle } from '@/components/doodle/NavbarDoodle';
import { LandingLanguageMenu } from '@/components/doodle/LandingLanguageMenu';
import { BookCoverMockup } from '@/components/doodle/BookCoverMockup';
import { WhiteboardSceneSvg, WhiteboardScene } from '@/components/doodle/WhiteboardSceneSvg';
import { RoughHighlight } from '@/components/doodle/RoughHighlight';
import { LeadershipQuizDoodle } from '@/components/doodle/LeadershipQuizDoodle';
import { PricingGridDoodle } from '@/components/doodle/PricingGridDoodle';
import { RemotionPlayerWrapper } from '@/components/remotion/RemotionPlayerWrapper';
import { HeroTrilogyShowcaseComp } from '@/components/remotion/HeroTrilogyShowcaseComp';
import { Framework3KLoopComp } from '@/components/remotion/Framework3KLoopComp';
import { PRICING_TIERS, getTier } from '@/lib/pricing';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  ArrowRight,
  Layers,
  ShieldCheck,
  MessageSquareText,
  HelpCircle,
  ChevronDown,
} from 'lucide-react';

const LEVEL_TAGS: Record<BookId, Record<BookLang, string>> = {
  'book-1': {
    'id-kasual': 'VOL. 01 • LEADER BARU',
    'id-standar': 'VOL. 01 • PEMIMPIN TIM BARU',
    en: 'VOL. 01 • FIRST-TIME LEAD',
  },
  'book-2': {
    'id-kasual': 'VOL. 02 • ANTI-BURNOUT',
    'id-standar': 'VOL. 02 • KETAHANAN DIRI',
    en: 'VOL. 02 • BEAT BURNOUT',
  },
  'book-3': {
    'id-kasual': 'VOL. 03 • LEVEL MANAJER',
    'id-standar': 'VOL. 03 • MANAJER DIVISI',
    en: 'VOL. 03 • DIVISION LEAD',
  },
};



function PricingCompareTable({ lang }: { lang: BookLang }) {
  const en = lang === 'en';
  const tierB1 = getTier('book-1');
  const tierB2 = getTier('book-2');
  const tierB3 = getTier('book-3');
  const tierTrilogy = getTier('bundle-trilogy');

  const b1Price = formatIDR(tierB1?.priceIdr ?? 49000);
  const b2Price = formatIDR(tierB2?.priceIdr ?? 49000);
  const b3Price = formatIDR(tierB3?.priceIdr ?? 99000);
  const trilogyPrice = formatIDR(tierTrilogy?.priceIdr ?? 149000);
  const trilogySave = tierTrilogy?.strikePriceIdr
    ? Math.round(
        ((tierTrilogy.strikePriceIdr - tierTrilogy.priceIdr) /
          tierTrilogy.strikePriceIdr) *
          100
      )
    : 25;

  const columns = [
    { id: 'buku-1', name: en ? 'Book 1' : 'Buku 1', isHighlight: false },
    { id: 'buku-2', name: en ? 'Book 2' : 'Buku 2', isHighlight: false },
    { id: 'buku-3', name: en ? 'Book 3' : 'Buku 3', isHighlight: false },
    { id: 'trilogy', name: en ? 'Complete Trilogy' : 'Trilogi Lengkap', isHighlight: true },
  ];

  const rows = [
    {
      label: en ? 'Target Level / Role' : 'Fokus Level / Peran',
      values: [
        en ? 'First-Time Lead & Supervisor' : 'Leader Baru & Supervisor',
        en ? 'Team Stamina & Anti-Burnout' : 'Ketahanan & Anti-Burnout',
        en ? 'Manager of Managers & Silos' : 'Manajer Divisi & Lintas Tim',
        en ? 'All Leadership Levels (End-to-End)' : 'Seluruh Level Kepemimpinan',
      ],
    },
    {
      label: en ? 'Chapters & Official PDFs' : 'Total Bab & File Master PDF',
      values: [
        en ? '15 Chapters + 3 Master PDFs' : '15 Bab + 3 File Master PDF',
        en ? '15 Chapters + 3 Master PDFs' : '15 Bab + 3 File Master PDF',
        en ? '15 Chapters + 3 Master PDFs' : '15 Bab + 3 File Master PDF',
        en ? '45 Full Chapters + 9 Master PDFs' : '45 Bab Penuh + 9 File Master PDF',
      ],
    },
    {
      label: en ? 'Core Frameworks Included' : 'Framework & Tool Inti',
      values: [
        en ? '3C Goal Formula & 1-on-1 Scripting' : 'Rumus Target 3K & Koreksi 4 Mata',
        en ? 'Glass Shield & 6 PM Detachment' : 'Perisai Kaca & Detachment 18:00',
        en ? 'Coaching the Coach & 3S Silo Formula' : 'Coaching the Coach & Rumus 3S',
        en ? 'All Frameworks (CCL, Harvard, Gallup)' : 'Seluruh Framework (CCL, Harvard, Gallup)',
      ],
    },
    {
      label: en ? 'Investment (Lifetime Access)' : 'Investasi (Sekali Bayar)',
      values: [
        b1Price,
        b2Price,
        b3Price,
        en ? `${trilogyPrice} (Save ${trilogySave}%)` : `${trilogyPrice} (Hemat ${trilogySave}%)`,
      ],
    },
  ];

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white shadow-sm mx-auto mt-10 p-5 sm:p-7">
      <h3 className="mb-4 text-center font-extrabold text-lg sm:text-xl text-zinc-900">
        {en
          ? 'Curriculum & Value Comparison Matrix'
          : lang === 'id-standar'
          ? 'Tabel Perbandingan Materi & Nilai Antar Paket'
          : 'Tabel Perbandingan Cepat Antar Paket'}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[600px] border-collapse text-center text-xs sm:text-sm">
          <thead>
            <tr className="border-b-2 border-zinc-200">
              <th className="px-4 py-3 text-left font-bold text-zinc-500 uppercase font-mono text-xs" />
              {columns.map((col) => (
                <th
                  key={col.id}
                  className={`px-4 py-3 font-bold text-zinc-900 ${
                    col.isHighlight ? 'bg-amber-50 rounded-t-xl text-zinc-900 border-x border-t border-amber-200' : ''
                  }`}
                >
                  {col.name}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIdx) => {
              const isLastRow = rowIdx === rows.length - 1;
              return (
                <tr
                  key={row.label}
                  className="border-b border-zinc-100 last:border-0"
                >
                  <td className="px-4 py-3.5 text-left font-bold text-zinc-900 text-xs sm:text-sm">
                    {row.label}
                  </td>
                  {row.values.map((v, i) => (
                    <td
                      key={i}
                      className={`px-4 py-3.5 font-medium text-zinc-700 text-xs sm:text-sm ${
                        columns[i].isHighlight
                          ? `bg-amber-50/60 font-bold text-zinc-900 border-x border-amber-200/80 ${
                              isLastRow ? 'border-b border-amber-200 rounded-b-xl' : ''
                            }`
                          : ''
                      }`}
                    >
                      {v}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const BOOK_TINTS: Record<BookId, string> = {
  'book-1': 'bg-gradient-to-b from-[#DBEAFE]/70 to-[#FEF9C3]/40',
  'book-2': 'bg-gradient-to-b from-[#FFEDD5]/80 to-[#CCFBF1]/40',
  'book-3': 'bg-gradient-to-b from-[#CCFBF1]/75 to-[#EDE9FE]/50',
};

const SAMPLE_SCRIPTS: Record<
  BookLang,
  { context: string; script: (name: string) => string }
> = {
  'id-kasual': {
    context:
      'Skenario Bab 9: Menegur anggota tim yang hasil kerjanya meleset dari kesepakatan (Tanpa Bikin Baper)',
    script: (name) =>
      `"Eh ${name}, makasih ya udah kirim draf laporannya tadi pagi. Gw perhatiin di bagian kesimpulan, datanya baru mencakup bulan ini, padahal kemarin di Rumus 3K kita sepakat masukin perbandingan 3 bulan terakhir supaya direksi bisa lihat trennya. Menurut lo, bagian mana yang perlu kita rapiin dulu biar jam 4 sore nanti siap dikirim?"`,
  },
  'id-standar': {
    context:
      'Skenario Bab 9: Mengoreksi hasil kerja anggota tim secara empat mata (Fokus Fakta, Bukan Menyerang Pribadi)',
    script: (name) =>
      `"Halo ${name}, terima kasih sudah mengirimkan draf laporannya pagi ini. Saya mencermati pada bagian kesimpulan, data yang tercantum baru mencakup bulan berjalan, sedangkan kesepakatan 3K kita kemarin adalah menyertakan perbandingan 3 bulan terakhir. Menurut kamu, langkah apa yang paling efektif untuk melengkapinya sebelum pukul 16.00 nanti?"`,
  },
  en: {
    context:
      'Chapter 9 Scenario: Private Course Correction When a Deliverable Misses the 3C Target',
    script: (name) =>
      `"Hey ${name}, thanks for sending over the draft report this morning. Looking at the summary section, I noticed it only covers this month's numbers, whereas our 3C agreement yesterday was to include a 3-month comparison trend. What do you think is the fastest way for us to plug that gap before the 4 PM review?"`,
  },
};

const BOOK_HIGHLIGHTS: Record<
  'book-1' | 'book-2' | 'book-3',
  Record<BookLang, string[]>
> = {
  'book-1': {
    'id-kasual': [
      '4 Skill Inti & 4 Obrolan Wajib (Rumus Target 3K, Apresiasi, Koreksi 4 Mata, Evaluasi)',
      'Kalibrasi Gaya Pendampingan L1–L4 ke G1–G4 + Simulasi Skor Bab 12',
      'Puluhan Skrip WA/Slack & 1-on-1 Siap Copy-Paste',
    ],
    'id-standar': [
      '4 Keterampilan Inti & 4 Percakapan Kunci (Rumus 3K, Apresiasi, Koreksi, Evaluasi)',
      'Kalibrasi Tingkat Kesiapan Tim L1–L4 ke Gaya G1–G4 + Simulasi Bab 12',
      'Puluhan Skrip Dialog Profesional Siap Salin',
    ],
    en: [
      '4 Core Skills & 4 Essential Conversations (3C Targets, Praise, Redirection, Review)',
      'Task Readiness Calibration (L1–L4 to G1–G4) + Chapter 12 Interactive Simulator',
      'Dozens of Copy-Paste 1-on-1 & Slack Scripts',
    ],
  },
  'book-2': {
    'id-kasual': [
      'Teknik Glass Shield (Memilah Fakta Masalah vs Curhatan Emosi Anak Buah)',
      'Anti-Monkey Delegation & Negosiasi Kapasitas ke Bos Pakai Data Neraca',
      'Audit Kalender Rumus 3P & Ritual Matikan Pikiran Kerja Jam 6 Sore',
    ],
    'id-standar': [
      'Teknik Perisai Kaca (Memisahkan Fakta Kerja dari Beban Emosi Tim)',
      'Pencegahan Ambil Alih Tugas & Negosiasi Kapasitas Berbasis Data',
      'Audit Kalender Rumus 3P & Ritual Pemulihan Energi Pasca-Kerja',
    ],
    en: [
      'The Glass Shield Technique (Filtering Actionable Facts from Emotional Venting)',
      'Anti-Monkey Delegation & Data-Driven Capacity Negotiation with Executives',
      '3P Calendar Audit & 6 PM Psychological Detachment Rituals',
    ],
  },
  'book-3': {
    'id-kasual': [
      'Coaching the Coach (Melatih Team Leader Tanpa Merampas Mikrofon Mereka)',
      'Protokol Anti-Skip-Level & Mediasi Konflik Silo Antar-Tim (Rumus 3S)',
      'Menerjemahkan Visi Abstrak Direksi Jadi Langkah Konkret Divisi',
    ],
    'id-standar': [
      'Melatih Para Leader (Coaching the Coach) Tanpa Mengambil Alih Wewenang',
      'Protokol Anti-Skip-Level & Penyelarasan Lintas Tim (Rumus 3S)',
      'Penerjemahan Strategi Eksekutif ke Eksekusi Departemen',
    ],
    en: [
      'Coaching the Coach (Developing Team Leads Without Stealing Their Microphone)',
      'Anti-Skip-Level Protocol & Cross-Team Silo Mediation (3S Formula)',
      'Translating Executive Vision into Departmental Execution',
    ],
  },
};

const FAQ_ITEMS: {
  q: Record<BookLang, string>;
  a: Record<BookLang, string>;
}[] = [
  {
    q: {
      'id-kasual':
        '1. Kalau gw beli 1 buku atau bundel, apakah langsung dapet Bahasa Indonesia (Kasual & Standar) sekaligus English?',
      'id-standar':
        '1. Apakah satu kali pembelian sudah mencakup edisi Bahasa Indonesia (Kasual & Standar) serta Bahasa Inggris?',
      en: '1. Does a single purchase unlock both Indonesian (Casual & Standard) and Global English editions?',
    },
    a: {
      'id-kasual':
        'Betul banget! Sekali beli, akun lo langsung kebuka untuk Bahasa Indonesia (bisa bebas gonta-ganti gaya Kasual Gue/Lo atau Standar Saya/Kamu) dan Global English—baik di Web Reader interaktif maupun file unduhan Master PDF A5-nya.',
      'id-standar':
        'Benar. Satu kali pembelian langsung membuka akses ke edisi Bahasa Indonesia (gaya Kasual maupun Standar) dan Global English di Web Reader interaktif serta unduhan berkas PDF A5 resmi.',
      en: 'Yes! One purchase unlocks both Indonesian (switch freely between Casual Gue/Lo and Standard Saya/Kamu registers) and Global English in the interactive Web Reader and A5 PDF downloads.',
    },
  },
  {
    q: {
      'id-kasual':
        '2. Apakah ini biaya langganan bulanan atau sekali bayar untuk selamanya?',
      'id-standar':
        '2. Apakah akses ini berbayar bulanan atau sekali bayar untuk selamanya?',
      en: '2. Is this a monthly subscription or a one-time payment for lifetime access?',
    },
    a: {
      'id-kasual':
        '100% sekali bayar untuk akses seumur hidup (lifetime access). Tidak ada tagihan berulang bulanan atau biaya tersembunyi.',
      'id-standar':
        '100% sekali bayar untuk akses selamanya (lifetime access). Tidak ada biaya langganan bulanan.',
      en: '100% one-time payment for lifetime access. Zero recurring fees.',
    },
  },
  {
    q: {
      'id-kasual':
        '3. Apa bedanya baca di Web Reader Interaktif vs download file PDF A5?',
      'id-standar':
        '3. Apa perbedaan fitur antara Web Reader Interaktif dan berkas Master PDF A5?',
      en: '3. What is the difference between the Interactive Web Reader and the A5 Master PDFs?',
    },
    a: {
      'id-kasual':
        'Di Web Reader interaktif, lo bisa ketik nama anak buah buat personalisasi otomatis seluruh skrip 1-on-1, centang checklist latihan 30 hari, cari situasi darurat via tombol SOS Topik (Ctrl+K), dan ganti tema kertas (Cream, Sepia, Malam). File PDF A5 dirancang khusus dengan ukuran font yang nyaman dibaca offline di layar HP atau tablet kapan saja.',
      'id-standar':
        'Web Reader menyediakan fitur personalisasi nama staf pada skrip dialog, pelacak progres checklist latihan, pencarian instan SOS Topik, dan mode tampilan (Cream/Sepia/Malam). Adapun Master PDF A5 diformat khusus agar nyaman dibaca secara luring (offline) di ponsel maupun tablet.',
      en: 'The Web Reader includes live teammate-name script personalization, interactive exercise checklists, Ctrl+K SOS topic search, and Cream/Sepia/Night reading themes. The A5 PDFs are formatted for comfortable offline mobile reading.',
    },
  },
  {
    q: {
      'id-kasual':
        '4. Gw masih bingung harus mulai dari Buku 1, Buku 2, atau langsung ambil Paket Trilogi?',
      'id-standar':
        '4. Bagaimana cara memilih antara Buku 1, Buku 2, Buku 3, atau Paket Lengkap Trilogi?',
      en: '4. Should I start with Book 1, Book 2, Book 3, or the Complete Trilogy Box Set?',
    },
    a: {
      'id-kasual':
        'Kalau lo baru diangkat jadi leader atau masih sering sungkan negur tim, mulai dari Buku 1. Kalau lo udah jalan tapi kalender penuh rapat dan hampir burnout, baca Buku 2. Kalau lo membawahi beberapa Team Leader, Buku 3 wajib buat lo. Ambil Complete Trilogy Box Set (Rp 149.000) kalau lo pengen hemat Rp 48.000 dan punya pegangan lengkap dari level Team Lead sampai Manajer Divisi.',
      'id-standar':
        'Buku 1 dirancang untuk pemimpin tim baru; Buku 2 untuk pemimpin yang ingin mengatasi kejenuhan operasional; Buku 3 untuk manajer yang membawahi para Team Leader. Paket Complete Trilogy Box Set (Rp 149.000) menghemat Rp 48.000 dan memberikan kurikulum utuh untuk pertumbuhan karier jangka panjang.',
      en: 'Book 1 is built for first-time leads; Book 2 for overwhelmed leads battling burnout; Book 3 for managers leading other team leads. The Complete Trilogy Box Set (Rp 149k) saves Rp 48k and equips you across every stage.',
    },
  },
  {
    q: {
      'id-kasual':
        '5. Gimana cara pembayaran dan seberapa cepat buku bisa langsung diakses?',
      'id-standar':
        '5. Metode pembayaran apa yang tersedia dan bagaimana proses aktivasi aksesnya?',
      en: '5. What payment methods are supported and how fast is access unlocked?',
    },
    a: {
      'id-kasual':
        'Pembayaran diproses secara instan & aman lewat Mayar.id (mendukung QRIS, GoPay, OVO, ShopeePay, dan Virtual Account semua bank). Begitu pembayaran terkonfirmasi, akses ke seluruh bab dan PDF langsung aktif detik itu juga di email yang lo daftarkan.',
      'id-standar':
        'Transaksi diproses secara otomatis melalui Mayar.id dengan dukungan QRIS, E-Wallet, dan Virtual Account. Segera setelah pembayaran berhasil, seluruh bab dan unduhan PDF langsung terbuka otomatis untuk alamat email Anda.',
      en: 'Checkout is powered by Mayar.id supporting QRIS, E-Wallets, and Virtual Accounts. Your books and PDF downloads unlock automatically the second payment completes.',
    },
  },
  {
    q: {
      'id-kasual':
        '6. Apakah pembelian ini bisa diklaim ke kantor (reimbursement)?',
      'id-standar':
        '6. Apakah pembelian ini dapat diajukan untuk klaim reimbursement kantor?',
      en: '6. Can I expense this purchase or claim corporate reimbursement?',
    },
    a: {
      'id-kasual':
        'Bisa banget! Setelah pembayaran berhasil via Mayar, lo otomatis menerima tanda terima dan invoice resmi berstempel digital ke email lo. Invoice ini mencantumkan rincian transaksi yang valid untuk klaim anggaran tunjangan belajar atau pengembangan profesional di kantor.',
      'id-standar':
        'Ya, tentu bisa. Segera setelah pembayaran berhasil diproses melalui Mayar, Anda akan menerima tanda terima dan invoice resmi berstempel digital via email. Dokumen ini valid dan siap dilampirkan untuk pengajuan klaim tunjangan belajar atau biaya pengembangan profesional di perusahaan Anda.',
      en: 'Yes. Upon checkout via Mayar, an official receipt and digital-stamped tax invoice are emailed to you instantly, valid for corporate professional development reimbursement.',
    },
  },
  {
    q: {
      'id-kasual':
        '7. Bisa dibaca offline di iPad, Kindle, atau dicetak?',
      'id-standar':
        '7. Apakah buku ini bisa dibaca offline di iPad, Kindle, atau dicetak?',
      en: '7. Can I read offline on iPad, Kindle, or print it out?',
    },
    a: {
      'id-kasual':
        'Bisa! Selain Web Reader interaktif, lo dapet file Master PDF A5 resolusi tinggi yang bisa lo simpan di iPad, Kindle, tablet, atau dicetak jadi buku saku meja kerja.',
      'id-standar':
        'Tentu saja. Anda mendapatkan berkas Master PDF A5 resolusi tinggi yang dapat disimpan di iPad, Kindle, tablet Android, maupun dicetak sebagai buku saku fisik.',
      en: 'Absolutely. Alongside the Web Reader, you receive high-resolution official A5 PDFs optimized for iPad, Kindle, tablets, and physical desk-side printing.',
    },
  },
  {
    q: {
      'id-kasual':
        '8. Tim gw bukan tim teknis (marketing, ops, agensi), apakah tetap relevan?',
      'id-standar':
        '8. Apakah materi ini relevan untuk tim non-teknis (operasional, marketing, agensi)?',
      en: '8. Is this framework relevant for non-technical teams (marketing, operations, agency)?',
    },
    a: {
      'id-kasual':
        '100% relevan. Masalah komunikasi tim, delegasi meleset, dan rasa sungkan menegur itu dialami semua leader di berbagai bidang. Rumus 3K dan 40+ skrip dialog di buku ini fokus pada dinamika manusia dan koordinasi kerja nyata.',
      'id-standar':
        'Sangat relevan. Tantangan keselarasan target, delegasi, dan komunikasi empat mata berlaku universal di semua fungsi kerja. Framework 3K dan puluhan skrip percakapan dirancang berbasis riset perilaku manajerial yang berlaku lintas industri.',
      en: '100% relevant. Target alignment, delegation, and private redirection are universal leadership challenges that apply to any cross-functional team.',
    },
  },
];

export default function LandingPage() {
  const [lang, setLang] = useState<BookLang>('id-kasual');
  const [activeHeroBook, setActiveHeroBook] = useState<BookId>('book-1');
  const [demoName, setDemoName] = useState<string>('Budi');
  const [copiedDemo, setCopiedDemo] = useState(false);

  useEffect(() => {
    let cancelled = false;
    try {
      const saved = localStorage.getItem('aiossan:lang') as BookLang;
      if (saved && ['id-kasual', 'id-standar', 'en'].includes(saved)) {
        setLang(saved);
        return;
      }
    } catch {
      // Ignore
    }
    fetch('/api/geo')
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data && data.country && data.country !== 'ID') {
          setLang('en');
        }
      })
      .catch(() => {
        // Ignore
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSelectLang = (next: BookLang) => {
    setLang(next);
    try {
      localStorage.setItem('aiossan:lang', next);
    } catch {
      // Ignore
    }
  };

  const handleCopyDemo = () => {
    const text = SAMPLE_SCRIPTS[lang].script(demoName.trim() || 'Budi');
    navigator.clipboard.writeText(text);
    setCopiedDemo(true);
    setTimeout(() => setCopiedDemo(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarDoodle
        lang={lang}
        langMenu={
          <LandingLanguageMenu lang={lang} onSelect={handleSelectLang} />
        }
      />

      {/* HERO SECTION */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Hero Copy */}
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200/90 bg-white px-3.5 py-1 shadow-xs">
              <BookOpen className="w-3.5 h-3.5 text-blue-600" />
              <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#18181B]">
                Leadership Field Playbook
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#18181B] leading-[1.13]">
              {lang === 'id-kasual' && (
                <>
                  Baru Jadi Leader atau Mulai{' '}
                  <RoughHighlight type="highlight" color="yellow">
                    Kewalahan
                  </RoughHighlight>{' '}
                  Ngurusin Tim? Ini{' '}
                  <RoughHighlight type="underline" color="blue">
                    Contekan Meja Kerja
                  </RoughHighlight>{' '}
                  Lo.
                </>
              )}
              {lang === 'id-standar' && (
                <>
                  Panduan Taktis{' '}
                  <RoughHighlight type="highlight" color="yellow">
                    Memimpin Tim
                  </RoughHighlight>{' '}
                  & Menjaga{' '}
                  <RoughHighlight type="underline" color="teal">
                    Ketahanan Diri
                  </RoughHighlight>{' '}
                  Tanpa Teori Bertele-tele.
                </>
              )}
              {lang === 'en' && (
                <>
                  Promoted to Lead or Feeling{' '}
                  <RoughHighlight type="highlight" color="yellow">
                    Burned Out?
                  </RoughHighlight>{' '}
                  Here Is Your{' '}
                  <RoughHighlight type="underline" color="blue">
                    Tactical Field Playbook
                  </RoughHighlight>
                  .
                </>
              )}
            </h1>

            <p className="text-base sm:text-lg text-[#52525B] leading-relaxed">
              {lang === 'id-kasual' &&
                'Nggak usah nunggu baper atau lembur sendirian tiap malam. Dapatkan 3 buku tactical playbook bergaya catatan whiteboard, lengkap dengan skrip 1-on-1 siap copy-paste ke WA/Slack, diagram alur sistem, dan simulasi kepemimpinan.'}
              {lang === 'id-standar' &&
                'Dirancang untuk pemimpin tim baru hingga manajer divisi. Berisi kerangka kerja teruji (CCL, Harvard, Gallup), puluhan skrip percakapan empat mata siap salin, bagan alur interaktif, serta latihan 30 hari yang langsung bisa dipraktikkan.'}
              {lang === 'en' &&
                'Skip the 300-page academic fluff. Get 3 tactical field playbooks with clean whiteboard schematics, packed with copy-paste 1-on-1 scripts, animated framework diagrams, and interactive leadership simulators.'}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href={`/read/${activeHeroBook}/${lang}/ch-0`}
                className="rounded-xl bg-zinc-900 px-6 py-3.5 text-sm sm:text-base font-bold text-white hover:bg-zinc-800 transition-colors shadow-sm inline-flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5 text-amber-300" />
                <span>
                  {lang === 'en'
                    ? 'Read Free Sample (Ch 0 & 1)'
                    : 'Baca Gratis Bab 1 Sekarang'}
                </span>
              </Link>
              <a
                href="#pricing"
                className="rounded-xl border border-zinc-300 bg-white px-6 py-3.5 text-sm sm:text-base font-bold text-zinc-900 hover:bg-zinc-50 hover:border-zinc-400 transition-colors shadow-2xs inline-flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-blue-600" />
                <span>
                  {lang === 'en'
                    ? 'See Packages (From Rp 49k)'
                    : 'Lihat Paket Harga (Mulai Rp 49rb)'}
                </span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t border-zinc-200 text-xs font-semibold text-zinc-700">
              <div className="flex items-center gap-2 rounded-xl bg-zinc-50/80 px-3 py-2 border border-zinc-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'ID (Casual & Standard) + EN'
                    : 'ID (Kasual & Standar) + EN'}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-zinc-50/80 px-3 py-2 border border-zinc-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'en'
                    ? '40+ Plug-and-Play 1-on-1 Scripts'
                    : '40+ Skrip 1-on-1 Siap Salin'}
                </span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-zinc-50/80 px-3 py-2 border border-zinc-200/80">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>
                  {lang === 'en'
                    ? 'Lifetime Access • No Subscription'
                    : 'Sekali Bayar Selamanya'}
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive Remotion Studio */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-zinc-200 bg-white p-3.5 sm:p-4 shadow-sm">
              <RemotionPlayerWrapper
                component={HeroTrilogyShowcaseComp}
                inputProps={{ activeBookId: activeHeroBook, lang }}
                durationInFrames={240}
                compositionWidth={640}
                compositionHeight={460}
                fps={30}
                badgeLabel={lang === 'en' ? 'Live Studio' : 'Studio Interaktif'}
              />

              {/* Interactive Volume Switcher Tabs */}
              <div className="mt-3 grid grid-cols-3 gap-2">
                {BOOK_CATALOG.map((b) => {
                  const isActive = b.id === activeHeroBook;
                  const shortTitles: Record<BookId, Record<BookLang, string>> = {
                    'book-1': {
                      'id-kasual': 'Mahir Memimpin',
                      'id-standar': 'Mahir Memimpin',
                      en: 'Team Lead',
                    },
                    'book-2': {
                      'id-kasual': 'Napas Panjang',
                      'id-standar': 'Napas Panjang',
                      en: 'Beat Burnout',
                    },
                    'book-3': {
                      'id-kasual': 'Pimpin Leader',
                      'id-standar': 'Pimpin Leader',
                      en: 'Lead Leaders',
                    },
                  };
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setActiveHeroBook(b.id)}
                      className={`rounded-xl border px-2.5 py-2 text-left transition-all ${
                        isActive
                          ? 'border-zinc-900 bg-zinc-900 text-white shadow-xs'
                          : 'border-zinc-200 bg-zinc-50 hover:bg-white text-zinc-600'
                      }`}
                    >
                      <div className={`font-mono text-[10px] font-extrabold ${isActive ? 'text-zinc-300' : 'text-zinc-400'}`}>
                        {b.volumeCode}
                      </div>
                      <div className={`text-xs font-bold leading-tight ${isActive ? 'text-white' : 'text-zinc-800'}`}>
                        {shortTitles[b.id][lang]}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* INTERACTIVE 45-SECOND QUIZ SECTION */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="text-center max-w-3xl mx-auto mb-8">
          <p className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-widest text-blue-800 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            {lang === 'en' ? '45-SECOND ASSESSMENT' : 'DIAGNOSIS 45 DETIK'}
          </p>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
            {lang === 'en'
              ? 'Not Sure Which Playbook to Start With?'
              : lang === 'id-kasual'
              ? 'Bingung Mau Mulai dari Buku yang Mana?'
              : 'Bingung Memulai dari Buku yang Mana?'}
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-600">
            {lang === 'en'
              ? 'Answer 3 quick questions to discover the playbook tailored to your current leadership challenge.'
              : lang === 'id-kasual'
              ? 'Jawab 3 pertanyaan kilat buat nemuin playbook yang paling pas sama fase tim lo saat ini.'
              : 'Jawab 3 pertanyaan singkat untuk menemukan playbook yang paling sesuai dengan fase kepemimpinan Anda.'}
          </p>
        </div>
        <div className="max-w-4xl lg:max-w-5xl mx-auto">
          <LeadershipQuizDoodle lang={lang} />
        </div>
      </section>

      {/* 3 BOOKS CURRICULUM SHOWCASE */}
      <section
        id="books"
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-18"
      >
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="inline-flex items-center justify-center gap-1.5 rounded-full border border-blue-200 bg-[#EFF6FF] px-3.5 py-1 font-mono text-xs font-extrabold uppercase tracking-widest text-[#1E3A8A] mb-3 shadow-2xs">
            <Layers className="w-3.5 h-3.5" />
            {lang === 'en'
              ? 'LEADERSHIP CAREER LADDER CURRICULUM'
              : 'KURIKULUM TANGGA KARIER LEADER'}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 leading-tight">
            {lang === 'en'
              ? '3 Tactical Playbooks for Every Stage of Your Leadership Journey'
              : lang === 'id-kasual'
              ? '3 Buku Playbook Sesuai Fase Tantangan Kepemimpinan Lo'
              : '3 Buku Playbook Sesuai Fase Tantangan Kepemimpinan Anda'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          {BOOK_CATALOG.map((book) => {
            const highlights = BOOK_HIGHLIGHTS[book.id][lang];
            const levelTag = LEVEL_TAGS[book.id][lang];
            return (
              <div
                key={book.id}
                className="rounded-2xl border border-zinc-200 bg-white flex h-full flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                {/* Top Studio Book Stage */}
                <div
                  className={`flex justify-center border-b border-zinc-100 px-6 py-7 ${BOOK_TINTS[book.id]}`}
                >
                  <BookCoverMockup bookId={book.id} lang={lang} size="md" />
                </div>

                {/* Card Content Body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2.5 flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md border border-zinc-200 bg-zinc-50 text-zinc-800">
                      {levelTag}
                    </span>
                    <span className="font-mono font-extrabold text-base text-zinc-900">
                      {formatIDR(book.priceIdr)}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-zinc-900 mb-1.5">
                    {book.titles[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-600 mb-3 leading-relaxed">
                    {book.subtitles[lang]}
                  </p>

                  <div className="mb-4 rounded-xl border border-zinc-200 bg-zinc-50/70 px-3 py-2 text-xs">
                    <span className="font-mono text-[10px] font-bold uppercase text-zinc-500 block mb-0.5">
                      {lang === 'en' ? 'Ideal For:' : 'Cocok Untuk:'}
                    </span>
                    <span className="font-bold text-zinc-900">
                      {book.targetRole[lang]}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-6 border-t border-zinc-100 pt-4 text-xs sm:text-sm text-zinc-700">
                    {highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center gap-2.5 pt-2">
                    <Link
                      href={`/read/${book.id}/${lang}/ch-0`}
                      className="flex-1 rounded-xl border border-zinc-300 bg-zinc-50 hover:bg-white text-zinc-800 py-2.5 px-3 text-xs font-bold text-center inline-flex items-center justify-center gap-1.5 transition-colors shadow-2xs"
                    >
                      <BookOpen className="w-3.5 h-3.5 text-zinc-500" />
                      <span>
                        {lang === 'en' ? 'Read Free Ch 0 & 1' : 'Baca Gratis Bab 1'}
                      </span>
                    </Link>
                    <a
                      href="#pricing"
                      className="rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white py-2.5 px-4 text-xs font-bold inline-flex items-center gap-1 transition-colors shadow-xs"
                    >
                      <span>{lang === 'en' ? 'Buy' : 'Beli'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* LIVE SCRIPT PERSONALIZER + REMOTION 3K LOOP SECTION */}
      <section
        id="scripts"
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16"
      >
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="mb-6 pb-4 border-b border-zinc-100">
            <p className="flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-widest text-blue-700 mb-1.5">
              <MessageSquareText className="w-3.5 h-3.5" />
              {lang === 'en'
                ? 'WEB READER INTERACTIVE FEATURE DEMO'
                : 'DEMO FITUR UNGGULAN WEB READER'}
            </p>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 tracking-tight">
              {lang === 'en'
                ? 'Try the Live Script Personalizer & Animated 3C Loop'
                : 'Coba Sendiri: Ganti Nama Staf & Lihat Siklus Rumus 3K Secara Live!'}
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-zinc-600 font-medium">
              {lang === 'en'
                ? 'The 3C Framework: Communication (Align Perception) → Commitment (Lock Targets) → Confirmation (Review Progress).'
                : 'Siklus Rumus 3K: Komunikasi (Samakan Persepsi) → Kesepakatan (Kunci Target) → Konfirmasi (Pemeriksaan Berkala).'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 7 Cols: Interactive Script Bubble */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-xl border border-zinc-200 bg-zinc-50/50 p-5">
              <div>
                <div className="mb-3.5 flex flex-wrap items-center justify-between gap-3 border-b border-zinc-200/80 pb-3">
                  <div className="flex items-center gap-2">
                    <label
                      htmlFor="demo-staff-name"
                      className="text-xs font-bold text-zinc-700"
                    >
                      {lang === 'en' ? 'Team Member Name:' : 'Nama Anggota Tim:'}
                    </label>
                    <input
                      id="demo-staff-name"
                      type="text"
                      value={demoName}
                      onChange={(e) => setDemoName(e.target.value)}
                      placeholder="Budi"
                      className="w-32 sm:w-36 rounded-lg border border-zinc-300 bg-white px-2.5 py-1 text-xs font-bold text-zinc-900 focus:border-blue-500 focus:outline-none shadow-2xs"
                    />
                  </div>

                  <div className="flex items-center gap-1">
                    {(['id-kasual', 'id-standar', 'en'] as BookLang[]).map(
                      (l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => handleSelectLang(l)}
                          className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold transition-colors ${
                            lang === l
                              ? 'border-zinc-900 bg-zinc-900 text-white shadow-2xs'
                              : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                          }`}
                        >
                          {l.toUpperCase()}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div className="mb-2">
                  <span className="font-mono text-[11px] font-bold text-blue-700 block mb-1">
                    {SAMPLE_SCRIPTS[lang].context}
                  </span>
                  <p className="font-mono text-sm leading-relaxed text-zinc-900 bg-white p-4 rounded-xl border border-zinc-200 shadow-2xs">
                    {SAMPLE_SCRIPTS[lang].script(demoName.trim() || 'Budi')}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-zinc-200/80 flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-medium text-zinc-600">
                  {lang === 'en' ? (
                    <>
                      ✨ Inside the playbooks: <strong>40+ plug-and-play scripts</strong> for tough team scenarios!
                    </>
                  ) : (
                    <>
                      ✨ Di dalam buku ada <strong>40+ skrip</strong> siap salin untuk berbagai situasi sulit!
                    </>
                  )}
                </span>
                <button
                  type="button"
                  onClick={handleCopyDemo}
                  className="rounded-xl bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 text-xs font-bold inline-flex items-center gap-1.5 transition-colors shadow-xs"
                >
                  {copiedDemo ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span>{lang === 'en' ? 'Copied to Clipboard!' : 'Tersalin ke Clipboard!'}</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>{lang === 'en' ? 'Copy Sample Script' : 'Salin Contoh Skrip Ini'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right 5 Cols: Animated Remotion 3K Loop */}
            <div className="lg:col-span-5 flex flex-col justify-center">
              <RemotionPlayerWrapper
                component={Framework3KLoopComp}
                inputProps={{
                  lang,
                  teammateName: demoName.trim() || 'Budi',
                }}
                durationInFrames={180}
                compositionWidth={680}
                compositionHeight={340}
                fps={30}
                badgeLabel={lang === 'en' ? '3C Loop' : 'Siklus 3K'}
              />
            </div>
          </div>
        </div>
      </section>

      {/* PRICING SECTION */}
      <section
        id="pricing"
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-18"
      >
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="inline-flex items-center justify-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-3.5 py-1 font-mono text-xs font-bold uppercase tracking-widest text-amber-900 mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            {lang === 'en'
              ? 'ONE-TIME INVESTMENT • LIFETIME ACCESS'
              : 'INVESTASI SEKALI BAYAR • AKSES SEUMUR HIDUP'}
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 leading-tight mb-3">
            {lang === 'en'
              ? 'Choose Your Playbook Package (Instant Web + PDF Access)'
              : lang === 'id-kasual'
              ? 'Pilih Paket Playbook Sesuai Kebutuhan Lo'
              : 'Pilih Paket Playbook Sesuai Kebutuhan Anda'}
          </h2>
          <p className="text-sm sm:text-base text-zinc-600">
            {lang === 'en'
              ? 'Every purchase unlocks both languages at once: Indonesian (Casual Gue/Lo and Standard Saya/Kamu styles) and Global English, plus mobile-friendly A5 PDF downloads.'
              : 'Setiap pembelian langsung membuka kedua bahasa sekaligus: Bahasa Indonesia (pilih gaya Kasual Gue/Lo atau Standar Saya/Kamu) dan Bahasa Inggris, beserta unduhan PDF A5 ramah HP.'}
          </p>
        </div>

        <PricingGridDoodle lang={lang} />

        <PricingCompareTable lang={lang} />
      </section>

      {/* INTERACTIVE FAQ ACCORDION SECTION */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-8 shadow-sm">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-200 bg-blue-50 shadow-2xs">
              <HelpCircle className="w-5 h-5 text-blue-700" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-900">
                {lang === 'en'
                  ? 'Frequently Asked Questions (FAQ)'
                  : 'Pertanyaan yang Sering Ditanyakan (FAQ)'}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-500">
                {lang === 'en'
                  ? 'Everything you need to know about access, languages, corporate reimbursement, and one-time licensing.'
                  : lang === 'id-kasual'
                  ? 'Semua yang perlu lo ketahui tentang akses Web Reader, PDF, reimbursement kantor, dan lisensi sekali bayar.'
                  : 'Semua informasi penting terkait akses Web Reader, berkas PDF, reimbursement kantor, dan lisensi sekali bayar.'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <details
                key={idx}
                open={idx === 0}
                className="group rounded-xl border border-zinc-200 bg-white open:border-zinc-300 open:shadow-xs transition-colors overflow-hidden"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-bold text-sm sm:text-base text-zinc-900 hover:bg-zinc-50/60 transition-colors">
                  <span>{item.q[lang]}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-180 group-open:text-zinc-900" />
                </summary>
                <div className="border-t border-zinc-100 bg-zinc-50/40 px-5 py-4 text-xs sm:text-sm leading-relaxed text-zinc-600">
                  {item.a[lang]}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* COMPLETE PROFESSIONAL FOOTER */}
      <footer className="mt-auto border-t border-zinc-200 bg-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-zinc-100">
            <div className="md:col-span-2 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-zinc-900 bg-zinc-900 text-white shadow-2xs shrink-0">
                  <span className="font-mono text-[10px] font-black">ai</span>
                </div>
                <span className="font-extrabold text-base text-zinc-900">
                  aiossan.com
                </span>
              </div>
              <p className="text-xs sm:text-sm text-zinc-500 max-w-sm leading-relaxed">
                {lang === 'en'
                  ? 'Interactive Leadership Field Playbook Trilogy. Research-backed operating systems for modern team leads and managers.'
                  : 'Trilogi Tactical Playbook Kepemimpinan Lapangan. Kerangka kerja teruji untuk pemimpin tim dan manajer modern.'}
              </p>
              <div className="flex items-center gap-2 pt-1 text-xs text-zinc-500">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Instant Checkout Powered by Mayar.id • QRIS & Virtual Account</span>
              </div>
            </div>

            <div>
              <p className="font-mono text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
                {lang === 'en' ? 'Quick Navigation' : 'Navigasi Cepat'}
              </p>
              <ul className="space-y-2 text-xs font-medium text-zinc-600">
                <li>
                  <a href="#books" className="hover:text-zinc-900 transition-colors">
                    {lang === 'en' ? '3-Book Curriculum' : 'Katalog 3 Buku'}
                  </a>
                </li>
                <li>
                  <a href="#quiz" className="hover:text-zinc-900 transition-colors">
                    {lang === 'en' ? '45-Second Assessment' : 'Diagnosis Kuis 45 Detik'}
                  </a>
                </li>
                <li>
                  <a href="#scripts" className="hover:text-zinc-900 transition-colors">
                    {lang === 'en' ? 'Live Script Tool' : 'Demo Skrip & Rumus 3K'}
                  </a>
                </li>
                <li>
                  <a href="#pricing" className="hover:text-zinc-900 transition-colors">
                    {lang === 'en' ? 'Trilogy Pricing' : 'Paket Harga & Trilogi'}
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-mono text-xs font-bold text-zinc-900 uppercase tracking-wider mb-3">
                {lang === 'en' ? 'Help & Support' : 'Bantuan & Jaminan'}
              </p>
              <ul className="space-y-2 text-xs font-medium text-zinc-600">
                <li>
                  <a
                    href="mailto:support@aiossan.com"
                    className="hover:text-zinc-900 transition-colors inline-block"
                  >
                    Email: support@aiossan.com
                  </a>
                </li>
                <li>
                  <span className="text-zinc-400">
                    {lang === 'en'
                      ? 'One-Time Lifetime License'
                      : 'Lisensi Sekali Bayar Selamanya'}
                  </span>
                </li>
                <li>
                  <span className="text-zinc-400">
                    {lang === 'en'
                      ? 'Web Reader + Master A5 PDF Included'
                      : 'Garansi Akses Web + PDF A5'}
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-zinc-400">
            <p>© {new Date().getFullYear()} aiossan.com. All rights reserved.</p>
            <p>Designed for pragmatic leaders. Zero academic fluff.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
