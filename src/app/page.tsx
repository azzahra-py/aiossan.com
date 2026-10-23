'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BOOK_CATALOG, BookId, BookLang } from '@/types/books';
import { formatIDR } from '@/lib/utils';
import { NavbarDoodle } from '@/components/doodle/NavbarDoodle';
import { LandingLanguageMenu } from '@/components/doodle/LandingLanguageMenu';
import { BookCoverMockup } from '@/components/doodle/BookCoverMockup';
import { WoodlandMascotSvg } from '@/components/doodle/WoodlandMascotSvg';
import { RoughHighlight } from '@/components/doodle/RoughHighlight';
import { LeadershipQuizDoodle } from '@/components/doodle/LeadershipQuizDoodle';
import { PricingGridDoodle } from '@/components/doodle/PricingGridDoodle';
import { RemotionPlayerWrapper } from '@/components/remotion/RemotionPlayerWrapper';
import { HeroTrilogyShowcaseComp } from '@/components/remotion/HeroTrilogyShowcaseComp';
import { Framework3KLoopComp } from '@/components/remotion/Framework3KLoopComp';
import { PRICING_TIERS } from '@/lib/pricing';
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

const CREW: {
  character: 'capybara' | 'tortoise' | 'owl';
  name: string;
  roleBadge: string;
  lines: Record<BookLang, string>;
}[] = [
  {
    character: 'capybara',
    name: 'Kapi si Kapibara',
    roleBadge: 'VOL. 01 GUIDE',
    lines: {
      'id-kasual':
        'Nemenin lo dari hari pertama jadi leader: target 3K, obrolan 1-on-1, koreksi tanpa baper.',
      'id-standar':
        'Pendamping sejak hari pertama memimpin: perumusan target 3K, dialog 1-on-1, dan koreksi terukur.',
      en: 'With you from day one as a lead: 3C targets, 1-on-1 talks, and drama-free course corrections.',
    },
  },
  {
    character: 'tortoise',
    name: 'Toti si Kura-Kura',
    roleBadge: 'VOL. 02 GUIDE',
    lines: {
      'id-kasual':
        'Ngajakin napas panjang: perisai Glass Shield, tolak tugas monyet, dan bangun sistem otomatis.',
      'id-standar':
        'Mengajarkan ritme berkelanjutan: teknik perisai kaca, cegah burnout, dan kaderisasi tangan kanan.',
      en: 'Teaches the long game: Glass Shield emotional filter, anti-monkey delegation, and 6 PM detachment.',
    },
  },
  {
    character: 'owl',
    name: 'Bubu si Burung Hantu',
    roleBadge: 'VOL. 03 GUIDE',
    lines: {
      'id-kasual':
        'Ngintip dari mercusuar divisi: melatih para Team Leader dan nyambungin silo lintas tim.',
      'id-standar':
        'Melihat gambaran besar divisi: membina para leader dan menyelaraskan silo lintas tim.',
      en: 'Sees the divisional big picture: coaching team leads and eliminating cross-team silos.',
    },
  },
];

function PricingCompareTable({ lang }: { lang: BookLang }) {
  const en = lang === 'en';
  const shortNames = en
    ? ['Book 1', 'Book 2', 'Book 3', 'Bundle 1+2', 'Bundle 2+3', 'Trilogy']
    : ['Buku 1', 'Buku 2', 'Buku 3', 'Bundel 1+2', 'Bundel 2+3', 'Trilogi'];
  const rows: { label: string; values: string[] }[] = [
    {
      label: en ? 'Price' : 'Harga',
      values: PRICING_TIERS.map((t) => formatIDR(t.priceIdr)),
    },
    {
      label: en ? 'Books included' : 'Buku yang didapat',
      values: PRICING_TIERS.map((t) =>
        t.includedBooks.map((b) => `Vol. ${b.split('-')[1]}`).join(' + ')
      ),
    },
    {
      label: en ? 'Total chapters' : 'Total bab',
      values: PRICING_TIERS.map((t) => `${t.includedBooks.length * 15}`),
    },
    {
      label: en ? 'Interactive web reader' : 'Web reader interaktif',
      values: PRICING_TIERS.map(() => '✓'),
    },
    {
      label: en ? 'A5 PDF + copy-paste scripts' : 'PDF A5 + skrip siap salin',
      values: PRICING_TIERS.map(() => '✓'),
    },
    {
      label: en ? 'Languages' : 'Bahasa',
      values: PRICING_TIERS.map(() => 'ID + EN'),
    },
  ];

  return (
    <div className="doodle-panel-flat mx-auto mt-10 p-5 sm:p-7">
      <h3 className="mb-4 text-center font-extrabold text-lg sm:text-xl text-[#18181B]">
        {en
          ? 'Complete Package Comparison Matrix'
          : lang === 'id-standar'
          ? 'Tabel Perbandingan Lengkap Antar Paket'
          : 'Tabel Perbandingan Cepat Antar Paket'}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-center text-xs sm:text-sm">
          <thead>
            <tr className="border-b-2 border-zinc-200">
              <th className="px-3 py-3 text-left font-extrabold text-[#18181B]" />
              {PRICING_TIERS.map((t, i) => (
                <th
                  key={t.id}
                  className={`px-3 py-3 font-extrabold text-[#18181B] ${
                    t.isBestValue ? 'bg-[#FEF9C3] rounded-t-lg' : ''
                  }`}
                >
                  {shortNames[i]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={row.label}
                className="border-b border-[#E4E4E7] last:border-0"
              >
                <td className="px-3 py-3 text-left font-bold text-[#18181B]">
                  {row.label}
                </td>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className={`px-3 py-3 font-medium text-[#52525B] ${
                      PRICING_TIERS[i].isBestValue
                        ? 'bg-[#FEF9C3]/55 font-bold text-[#18181B]'
                        : ''
                    }`}
                  >
                    {v === '✓' ? (
                      <Check className="mx-auto h-4 w-4 text-[#0D9488]" />
                    ) : (
                      v
                    )}
                  </td>
                ))}
              </tr>
            ))}
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
              <span className="font-mono text-xs font-extrabold uppercase tracking-wider text-[#18181B]">
                🐾 Leadership Field Playbook
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
                'Nggak usah nunggu baper atau lembur sendirian tiap malam. Dapatkan 3 buku playbook bergaya buku sketsa bersama Kapi si Kapibara, lengkap dengan skrip 1-on-1 siap copy-paste ke WA/Slack, diagram alur hidup, dan simulasi kepemimpinan.'}
              {lang === 'id-standar' &&
                'Dirancang untuk pemimpin tim baru hingga manajer divisi. Berisi kerangka kerja teruji (CCL, Harvard, Gallup), puluhan skrip percakapan empat mata siap salin, bagan alur interaktif, serta latihan 30 hari yang langsung bisa dipraktikkan.'}
              {lang === 'en' &&
                'Skip the 300-page academic fluff. Get 3 illustrated field playbooks featuring Kapi the Capybara, packed with copy-paste 1-on-1 scripts, animated framework diagrams, and interactive leadership simulators.'}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href={`/read/${activeHeroBook}/${lang}/ch-0`}
                className="doodle-button bg-[#FFE66D] px-6 py-3.5 text-sm sm:text-base font-extrabold text-[#18181B] inline-flex items-center gap-2"
              >
                <BookOpen className="w-5 h-5" />
                <span>
                  {lang === 'en'
                    ? 'Read Free Sample (Ch 0 & 1)'
                    : 'Baca Gratis Bab 1 Sekarang'}
                </span>
              </Link>
              <a
                href="#pricing"
                className="doodle-button bg-[#2563EB] text-white px-6 py-3.5 text-sm sm:text-base font-extrabold inline-flex items-center gap-2"
              >
                <Sparkles className="w-5 h-5 text-[#FFE66D]" />
                <span>
                  {lang === 'en'
                    ? 'See Packages (From Rp 49k)'
                    : 'Lihat Paket Harga (Mulai Rp 49rb)'}
                </span>
              </a>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-4 border-t-[1.5px] border-dashed border-[#D6D0C4] text-xs font-bold text-[#18181B]">
              <div className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 border border-[#DFD9CE]">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>ID (Kasual & Standar) + EN</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 border border-[#DFD9CE]">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>40+ Skrip 1-on-1 Siap Salin</span>
              </div>
              <div className="flex items-center gap-2 rounded-xl bg-white/80 px-3 py-2 border border-[#DFD9CE]">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>Sekali Bayar Selamanya</span>
              </div>
            </div>
          </div>

          {/* Right Hero Interactive Remotion Studio */}
          <div className="lg:col-span-5">
            <div className="doodle-box bg-white p-3.5 sm:p-4">
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
                  return (
                    <button
                      key={b.id}
                      type="button"
                      onClick={() => setActiveHeroBook(b.id)}
                      className={`rounded-xl border px-2.5 py-2 text-left transition-all ${
                        isActive
                          ? 'border-amber-300 bg-[#FFE66D] shadow-xs text-[#18181B]'
                          : 'border-[#DFD9CE] bg-[#FAF7F2] hover:bg-white text-[#52525B]'
                      }`}
                    >
                      <div className="font-mono text-[10px] font-extrabold text-[#18181B]">
                        {b.volumeCode}
                      </div>
                      <div className="truncate text-xs font-extrabold text-[#18181B]">
                        {b.titles[lang]}
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
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        <LeadershipQuizDoodle lang={lang} />
      </section>

      {/* 3 BOOKS CURRICULUM SHOWCASE */}
      <section
        id="books"
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-14 lg:py-18"
      >
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="inline-flex items-center justify-center gap-1.5 rounded-full border border-blue-200 bg-[#EFF6FF] px-3.5 py-1 font-mono text-xs font-extrabold uppercase tracking-widest text-[#1E3A8A] mb-3 shadow-2xs">
            <Layers className="w-3.5 h-3.5" />
            KURIKULUM TANGGA KARIER LEADER
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#18181B] leading-tight">
            {lang === 'en'
              ? '3 Tactical Playbooks for Every Stage of Your Leadership Journey'
              : '3 Buku Playbook Sesuai Fase Tantangan Kepemimpinan Lo'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-7 items-stretch">
          {BOOK_CATALOG.map((book) => {
            const highlights = BOOK_HIGHLIGHTS[book.id][lang];
            const levelTag = LEVEL_TAGS[book.id][lang];
            return (
              <div
                key={book.id}
                className="doodle-box flex h-full flex-col overflow-hidden bg-white"
              >
                {/* Top Studio Book Stage */}
                <div
                  className={`flex justify-center border-b border-[#E5E1D8] px-6 py-7 ${BOOK_TINTS[book.id]}`}
                >
                  <BookCoverMockup bookId={book.id} lang={lang} size="md" />
                </div>

                {/* Card Content Body */}
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2.5 flex items-center justify-between gap-2">
                    <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-md border border-amber-300 bg-[#FFE66D] shadow-2xs">
                      {levelTag}
                    </span>
                    <span className="font-mono font-extrabold text-base text-[#2563EB]">
                      {formatIDR(book.priceIdr)}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#18181B] mb-1.5">
                    {book.titles[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525B] mb-3 leading-relaxed">
                    {book.subtitles[lang]}
                  </p>

                  <div className="mb-4 rounded-xl border border-[#DFD9CE] bg-[#FAF7F2] px-3 py-2 text-xs">
                    <span className="font-mono text-[10px] font-extrabold uppercase text-[#2563EB] block">
                      {lang === 'en' ? 'Ideal For:' : 'Cocok Untuk:'}
                    </span>
                    <span className="font-bold text-[#18181B]">
                      {book.targetRole[lang]}
                    </span>
                  </div>

                  <ul className="space-y-2.5 mb-6 border-t border-dashed border-[#DFD9CE] pt-4 text-xs sm:text-sm text-[#18181B]">
                    {highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex items-center gap-2.5 pt-2">
                    <Link
                      href={`/read/${book.id}/${lang}/ch-0`}
                      className="doodle-button flex-1 bg-[#FAF7F2] hover:bg-[#FFE66D] py-2.5 px-3 text-xs font-extrabold text-center inline-flex items-center justify-center gap-1.5"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>
                        {lang === 'en' ? 'Read Free Ch 0 & 1' : 'Baca Gratis Bab 1'}
                      </span>
                    </Link>
                    <a
                      href="#pricing"
                      className="doodle-button bg-[#18181B] text-[#FFE66D] py-2.5 px-4 text-xs font-extrabold inline-flex items-center gap-1"
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

        {/* Framed Woodland Crew Ribbon Card */}
        <div className="doodle-panel-flat mt-10 p-5 sm:p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-dashed divide-[#DFD9CE]">
            {CREW.map((member, idx) => (
              <div
                key={member.name}
                className={`flex items-center gap-3.5 ${
                  idx > 0 ? 'pt-4 md:pt-0 md:pl-6' : ''
                }`}
              >
                <div className="rounded-2xl border border-zinc-200/90 bg-[#FAF7F2] p-1.5 shrink-0 shadow-xs">
                  <WoodlandMascotSvg
                    character={member.character}
                    className="h-12 w-12"
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-hand text-lg font-bold leading-tight text-[#18181B]">
                      {member.name}
                    </p>
                    <span className="rounded border border-amber-300 bg-[#FFE66D] px-1.5 py-0.2 font-mono text-[9px] font-extrabold text-[#18181B]">
                      {member.roleBadge}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-[#52525B]">
                    {member.lines[lang]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE SCRIPT PERSONALIZER + REMOTION 3K LOOP SECTION */}
      <section
        id="scripts"
        className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12"
      >
        <div className="doodle-box bg-gradient-to-br from-[#EFF6FF]/90 via-[#FFFFFF] to-[#FEF9C3]/40 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b-[1.5px] border-dashed border-[#D6D0C4]">
            <div>
              <p className="flex items-center gap-1.5 font-mono text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-1.5">
                <MessageSquareText className="w-3.5 h-3.5" />
                DEMO FITUR UNGGULAN WEB READER
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181B]">
                {lang === 'en'
                  ? 'Try the Live Script Personalizer & Animated 3C Loop'
                  : 'Coba Sendiri: Ganti Nama Staf & Lihat Siklus Rumus 3K Secara Live!'}
              </h2>
            </div>

            <div className="flex items-center gap-2 bg-white px-3.5 py-2 rounded-2xl border border-zinc-200 shadow-xs">
              <label
                htmlFor="demo-staff-name"
                className="font-mono text-xs font-extrabold text-[#18181B]"
              >
                {lang === 'en' ? 'Teammate Name:' : 'Ketik Nama Staf:'}
              </label>
              <input
                id="demo-staff-name"
                type="text"
                value={demoName}
                onChange={(e) => setDemoName(e.target.value)}
                placeholder="Budi / Siska"
                className="w-32 sm:w-36 rounded-lg border border-zinc-200 bg-[#FAF7F2] px-2.5 py-1 text-sm font-extrabold text-[#2563EB] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 shadow-2xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            {/* Left 7 Cols: Interactive Script Bubble */}
            <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-sm">
              <div>
                <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-[#E4E4E7] pb-2.5">
                  <span className="font-mono text-xs font-bold text-[#1E3A8A]">
                    {SAMPLE_SCRIPTS[lang].context}
                  </span>
                  <div className="flex items-center gap-1">
                    {(['id-kasual', 'id-standar', 'en'] as BookLang[]).map(
                      (l) => (
                        <button
                          key={l}
                          type="button"
                          onClick={() => handleSelectLang(l)}
                          className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold transition-colors ${
                            lang === l
                              ? 'border-amber-300 bg-[#FFE66D] text-[#18181B] shadow-2xs'
                              : 'border-transparent text-[#52525B] hover:bg-[#FAF7F2]'
                          }`}
                        >
                          {l.toUpperCase()}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <p className="font-mono text-sm sm:text-base leading-relaxed text-[#18181B] bg-[#FFFDF5] p-4 rounded-xl border border-[#DFD9CE]">
                  {SAMPLE_SCRIPTS[lang].script(demoName.trim() || 'Budi')}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-dashed border-[#E4E4E7] flex flex-wrap items-center justify-between gap-3">
                <span className="font-hand text-sm text-[#52525B]">
                  ✨ Di dalam buku ada <strong>40+ skrip</strong> siap salin untuk berbagai situasi sulit!
                </span>
                <button
                  type="button"
                  onClick={handleCopyDemo}
                  className="doodle-button bg-[#FFE66D] px-4 py-2 text-xs font-extrabold inline-flex items-center gap-1.5"
                >
                  {copiedDemo ? (
                    <>
                      <Check className="w-4 h-4 text-[#065F46]" />
                      <span>Tersalin ke Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Salin Contoh Skrip Ini</span>
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
          <p className="inline-flex items-center justify-center gap-1.5 rounded-full border border-amber-200 bg-[#FEF9C3] px-3.5 py-1 font-mono text-xs font-extrabold uppercase tracking-widest text-[#18181B] mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            INVESTASI SEKALI BAYAR • AKSES SEUMUR HIDUP
          </p>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#18181B] leading-tight mb-3">
            {lang === 'en'
              ? 'Choose Your Playbook Package (Instant Web + PDF Access)'
              : 'Pilih Paket Playbook Sesuai Kebutuhan Lo'}
          </h2>
          <p className="text-sm sm:text-base text-[#52525B]">
            {lang === 'en'
              ? 'Every purchase unlocks both languages at once: Indonesian (Casual Gue/Lo and Standard Saya/Kamu styles) and Global English, plus mobile-friendly A5 PDF downloads.'
              : 'Setiap pembelian langsung membuka kedua bahasa sekaligus: Bahasa Indonesia (pilih gaya Kasual Gue/Lo atau Standar Saya/Kamu) dan Bahasa Inggris, beserta unduhan PDF A5 ramah HP.'}
          </p>
        </div>

        <PricingGridDoodle lang={lang} />

        <PricingCompareTable lang={lang} />
      </section>

      {/* INTERACTIVE FAQ ACCORDION SECTION */}
      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="doodle-panel-flat p-6 sm:p-8">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-blue-200 bg-[#DBEAFE] shadow-2xs">
              <HelpCircle className="w-5 h-5 text-[#1E3A8A]" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-extrabold text-[#18181B]">
                {lang === 'en'
                  ? 'Frequently Asked Questions (FAQ)'
                  : 'Pertanyaan yang Sering Ditanyakan (FAQ)'}
              </h3>
              <p className="text-xs text-[#52525B]">
                {lang === 'en'
                  ? 'Everything you need to know about access, languages, and one-time licensing.'
                  : 'Semua yang perlu lo ketahui tentang akses Web Reader, PDF, dan lisensi sekali bayar.'}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => (
              <details
                key={idx}
                open={idx === 0}
                className="group rounded-2xl border border-[#DFD9CE] bg-[#FAF7F2]/60 open:border-zinc-300 open:bg-white open:shadow-xs transition-colors"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-4 font-extrabold text-sm sm:text-base text-[#18181B]">
                  <span>{item.q[lang]}</span>
                  <ChevronDown className="h-4 w-4 shrink-0 text-[#52525B] transition-transform group-open:rotate-180" />
                </summary>
                <div className="border-t border-dashed border-[#DFD9CE] px-5 py-4 text-xs sm:text-sm leading-relaxed text-[#52525B]">
                  {item.a[lang]}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="mt-auto border-t-[1.5px] border-[#DFD9CE] bg-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#52525B]">
          <div className="flex items-center gap-2.5">
            <WoodlandMascotSvg character="capybara" className="w-8 h-8" />
            <span className="font-extrabold text-[#18181B]">
              aiossan.com — Interactive Leadership Field Playbook Trilogy
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
            <span>
              Instant Checkout Powered by Mayar.id • Research-Backed Frameworks
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
