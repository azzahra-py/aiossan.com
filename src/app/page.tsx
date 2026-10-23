'use client';

import React, { useEffect, useRef, useState } from 'react';
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
import { FrameworkDiagram3K } from '@/components/doodle/FrameworkDiagram3K';
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
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

const CAROUSEL_BOOKS: BookId[] = ['book-1', 'book-2', 'book-3'];

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
  lines: Record<BookLang, string>;
}[] = [
  {
    character: 'capybara',
    name: 'Kapi si Kapibara',
    lines: {
      'id-kasual': 'Nemenin lo dari hari pertama jadi leader: target, obrolan, koreksi.',
      'id-standar': 'Pendamping sejak hari pertama memimpin: target, dialog, koreksi.',
      en: 'With you from day one as a lead: targets, talks, corrections.',
    },
  },
  {
    character: 'tortoise',
    name: 'Toti si Kura-Kura',
    lines: {
      'id-kasual': 'Ngajakin napas panjang: jaga ritme, tolak burnout, bangun sistem.',
      'id-standar': 'Mengajarkan ritme berkelanjutan: cegah burnout, bangun sistem.',
      en: 'Teaches the long game: guard your pace, beat burnout, build systems.',
    },
  },
  {
    character: 'owl',
    name: 'Bubu si Burung Hantu',
    lines: {
      'id-kasual': 'Ngintip dari atas: melatih para leader dan nyambungin silo.',
      'id-standar': 'Melihat gambaran besar: melatih para leader, menyelaraskan silo.',
      en: 'Sees the big picture: coaching leaders, connecting silos.',
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
    <div className="doodle-panel-flat mx-auto mt-12 max-w-4xl p-4 sm:p-6">
      <h3 className="mb-4 text-center font-hand text-xl text-[#18181B]">
        {en
          ? 'Quick comparison'
          : lang === 'id-standar'
          ? 'Perbandingan cepat antar paket'
          : 'Bandingkan cepat antar paket'}
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[620px] border-collapse text-center text-xs sm:text-sm">
          <thead>
            <tr className="border-b-2 border-[#18181B]">
              <th className="px-3 py-2.5 text-left font-extrabold text-[#18181B]" />
              {PRICING_TIERS.map((t, i) => (
                <th
                  key={t.id}
                  className={`px-3 py-2.5 font-extrabold text-[#18181B] ${
                    t.isBestValue ? 'bg-[#FEF9C3]' : ''
                  }`}
                >
                  {shortNames[i]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.label} className="border-b border-[#E4E4E7] last:border-0">
                <td className="px-3 py-2.5 text-left font-bold text-[#18181B]">
                  {row.label}
                </td>
                {row.values.map((v, i) => (
                  <td
                    key={i}
                    className={`px-3 py-2.5 text-[#52525B] ${
                      PRICING_TIERS[i].isBestValue ? 'bg-[#FEF9C3]/60' : ''
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
  'book-1': 'bg-[#FEF9C3]/80',
  'book-2': 'bg-[#CCFBF1]/70',
  'book-3': 'bg-[#DBEAFE]/80',
};

const SAMPLE_SCRIPTS: Record<
  BookLang,
  { context: string; script: (name: string) => string }
> = {
  'id-kasual': {
    context: 'Skenario Bab 9: Menegur anggota tim yang hasil kerjanya meleset dari kesepakatan (Tanpa Bikin Baper)',
    script: (name) =>
      `"Eh ${name}, makasih ya udah kirim draf laporannya tadi pagi. Gw perhatiin di bagian kesimpulan, datanya baru mencakup bulan ini, padahal kemarin di Rumus 3K kita sepakat masukin perbandingan 3 bulan terakhir supaya direksi bisa lihat trennya. Menurut lo, bagian mana yang perlu kita rapiin dulu biar jam 4 sore nanti siap dikirim?"`,
  },
  'id-standar': {
    context: 'Skenario Bab 9: Mengoreksi hasil kerja anggota tim secara empat mata (Fokus Fakta, Bukan Menyerang Pribadi)',
    script: (name) =>
      `"Halo ${name}, terima kasih sudah mengirimkan draf laporannya pagi ini. Saya mencermati pada bagian kesimpulan, data yang tercantum baru mencakup bulan berjalan, sedangkan kesepakatan 3K kita kemarin adalah menyertakan perbandingan 3 bulan terakhir. Menurut kamu, langkah apa yang paling efektif untuk melengkapinya sebelum pukul 16.00 nanti?"`,
  },
  en: {
    context: 'Chapter 9 Scenario: Private Course Correction When a Deliverable Misses the 3C Target',
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

export default function LandingPage() {
  const [lang, setLang] = useState<BookLang>('id-kasual');
  const [demoName, setDemoName] = useState<string>('Budi');
  const [copiedDemo, setCopiedDemo] = useState(false);
  const [coverIndex, setCoverIndex] = useState(0);
  const [coverPaused, setCoverPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    if (coverPaused) return;
    const timer = setTimeout(() => {
      setCoverIndex((i) => (i + 1) % CAROUSEL_BOOKS.length);
    }, 4500);
    return () => clearTimeout(timer);
  }, [coverIndex, coverPaused]);

  const goToCover = (idx: number) => {
    setCoverIndex(((idx % CAROUSEL_BOOKS.length) + CAROUSEL_BOOKS.length) % CAROUSEL_BOOKS.length);
  };

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
    // No saved preference: detect country from the visitor IP (Vercel geo
    // header via /api/geo). Indonesia keeps the Indonesian default, any
    // other detected country starts in English. Undetected stays Indonesian.
    fetch('/api/geo')
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled && data && data.country && data.country !== 'ID') {
          setLang('en');
        }
      })
      .catch(() => {
        // Ignore, keep Indonesian default
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
        langMenu={<LandingLanguageMenu lang={lang} onSelect={handleSelectLang} />}
      />

      <section className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 pt-10 pb-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <div className="inline-flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[#0D9488]" />
              <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-[#71717A]">
                {lang === 'en'
                  ? 'Interactive Web Playbook + Mobile PDF • Indonesian & English'
                  : 'Playbook Web Interaktif + PDF Ramah HP • Bahasa Indonesia & English'}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#18181B] leading-[1.15]">
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
                'Nggak usah nunggu baper atau lembur sendirian tiap malam. Dapatkan 3 buku playbook bergaya buku sketsa bersama Kapi si Kapibara, lengkap dengan skrip 1-on-1 siap copy-paste ke WA/Slack, diagram alur taktis, dan simulasi kepemimpinan.'}
              {lang === 'id-standar' &&
                'Dirancang untuk pemimpin tim baru hingga manajer divisi. Berisi kerangka kerja teruji, puluhan skrip percakapan empat mata siap salin, bagan alur visual, serta latihan 30 hari yang langsung bisa dipraktikkan.'}
              {lang === 'en' &&
                'Skip the 300-page academic fluff. Get 3 illustrated field playbooks featuring Kapi the Capybara, packed with copy-paste 1-on-1 scripts, hand-drawn Mermaid flowcharts, and interactive leadership simulators.'}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href={`/read/book-1/${lang}/ch-0`}
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
                    ? 'See 6 Pricing Packages (From Rp 49k)'
                    : 'Lihat Paket Harga (Mulai Rp 49rb)'}
                </span>
              </a>
            </div>

            <div className="grid grid-cols-3 gap-3 pt-3 border-t-2 border-dashed border-[#D4D4D8] text-xs font-bold text-[#18181B]">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>Bahasa Indonesia & English</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>Web Reader + PDF</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0" />
                <span>Sekali Bayar Selamanya</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="doodle-box relative bg-[#FFFBEB] p-6 sm:p-8">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-lg border border-[#18181B] bg-white px-2.5 py-0.5 font-mono text-[11px] font-extrabold text-[#1E3A8A]">
                  TRILOGI PLAYBOOK KAPI & KRU
                </span>
                <span className="font-hand text-sm font-bold text-[#9A3412]">
                  ★ 45 Bab Taktis + 9 File PDF
                </span>
              </div>

              <div
                className="relative mx-auto max-w-[20rem]"
                role="region"
                aria-roledescription="carousel"
                aria-label={
                  lang === 'en' ? 'Playbook trilogy covers' : 'Cover trilogi playbook'
                }
                onMouseEnter={() => setCoverPaused(true)}
                onMouseLeave={() => setCoverPaused(false)}
                onFocus={() => setCoverPaused(true)}
                onBlur={() => setCoverPaused(false)}
                onTouchStart={(e) => {
                  touchStartX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                  if (touchStartX.current === null) return;
                  const dx = e.changedTouches[0].clientX - touchStartX.current;
                  touchStartX.current = null;
                  if (Math.abs(dx) > 40) goToCover(coverIndex + (dx < 0 ? 1 : -1));
                }}
              >
                <div className="overflow-hidden">
                  <div
                    className="flex transition-transform duration-500 ease-out"
                    style={{ transform: `translateX(-${coverIndex * 100}%)` }}
                  >
                    {CAROUSEL_BOOKS.map((bookId, idx) => {
                      const book =
                        BOOK_CATALOG.find((b) => b.id === bookId) || BOOK_CATALOG[0];
                      return (
                        <div
                          key={bookId}
                          className="min-w-full flex flex-col items-center gap-6"
                          role="group"
                          aria-roledescription="slide"
                          aria-label={`${idx + 1} / ${CAROUSEL_BOOKS.length}: ${book.titles[lang]}`}
                          aria-hidden={idx !== coverIndex}
                        >
                          <BookCoverMockup bookId={bookId} lang={lang} size="sm" />
                          <div className="flex h-7 items-center justify-center gap-2 whitespace-nowrap">
                            <span className="font-mono text-[11px] font-extrabold px-2.5 py-0.5 rounded border border-[#18181B] bg-[#FFE66D]">
                              {LEVEL_TAGS[bookId][lang]}
                            </span>
                            <span className="font-extrabold text-sm text-[#2563EB]">
                              {formatIDR(book.priceIdr)}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => goToCover(coverIndex - 1)}
                  aria-label={lang === 'en' ? 'Previous cover' : 'Cover sebelumnya'}
                  className="doodle-button absolute left-0 top-32 -translate-y-1/2 rounded-full bg-white p-2"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() => goToCover(coverIndex + 1)}
                  aria-label={lang === 'en' ? 'Next cover' : 'Cover berikutnya'}
                  className="doodle-button absolute right-0 top-32 -translate-y-1/2 rounded-full bg-white p-2"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>

                <div className="mt-4 flex items-center justify-center gap-1">
                  {CAROUSEL_BOOKS.map((bookId, idx) => (
                    <button
                      key={bookId}
                      type="button"
                      onClick={() => goToCover(idx)}
                      aria-label={`${lang === 'en' ? 'Show cover' : 'Tampilkan cover'} ${idx + 1}`}
                      aria-current={idx === coverIndex}
                      className="flex h-10 w-10 items-center justify-center"
                    >
                      <span
                        className={`h-3 rounded-full border-2 border-[#18181B] transition-all ${
                          idx === coverIndex
                            ? 'w-8 bg-[#FFE66D]'
                            : 'w-3 bg-white hover:bg-[#DBEAFE]'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-1 font-mono text-[11px] font-bold text-[#52525B]">
                    {coverIndex + 1} / {CAROUSEL_BOOKS.length}
                  </span>
                </div>
              </div>

              <div className="mt-4 rounded-xl border border-[#E7E2D9] bg-white p-3.5 shadow-sm flex items-center gap-3">
                <WoodlandMascotSvg character="capybara" className="w-12 h-12 shrink-0" />
                <p className="font-hand text-sm text-[#18181B] leading-snug">
                  {lang === 'en'
                    ? '“Every book uses 100% gender-neutral woodland animal doodles and real-world scripts you can copy-paste in 5 seconds!”'
                    : '“Semua bab ditemani ilustrasi Kapi si Kapibara dan kru binatang lucu, plus skrip yang bisa langsung lo salin ke chat kantor!”'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 py-12 lg:py-16">
        <div className="mx-auto max-w-4xl">
          <LeadershipQuizDoodle lang={lang} />
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="flex items-center justify-center gap-1.5 font-mono text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-3">
            <Layers className="w-3.5 h-3.5" />
            KURIKULUM TANGGA KARIER LEADER
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#18181B] leading-tight">
            {lang === 'en'
              ? '3 Tactical Playbooks for Every Stage of Your Leadership Journey'
              : '3 Buku Playbook Sesuai Fase Tantangan Kepemimpinan Lo'}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {BOOK_CATALOG.map((book) => {
            const highlights = BOOK_HIGHLIGHTS[book.id][lang];
            const levelTag = LEVEL_TAGS[book.id][lang];
            return (
              <div key={book.id} className="flex h-full flex-col">
                <div
                  className={`flex justify-center rounded-3xl px-6 py-8 ${BOOK_TINTS[book.id]}`}
                >
                  <BookCoverMockup bookId={book.id} lang={lang} size="md" />
                </div>
                <div className="flex flex-1 flex-col px-1 pt-5">

                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded border border-[#18181B] bg-[#FFE66D]">
                      {levelTag}
                    </span>
                    <span className="font-extrabold text-base text-[#2563EB]">
                      {formatIDR(book.priceIdr)}
                    </span>
                  </div>

                  <h3 className="text-xl font-extrabold text-[#18181B] mb-2 min-h-[3.5rem]">
                    {book.titles[lang]}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#52525B] mb-4 leading-relaxed min-h-[2.5rem] line-clamp-2">
                    {book.subtitles[lang]}
                  </p>

                  <ul className="space-y-2 mb-6 border-t border-dashed border-[#E4E4E7] pt-4 text-xs sm:text-sm text-[#18181B]">
                    {highlights.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0D9488] shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                <div className="mt-auto flex items-center gap-2 pt-2">
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
                    className="doodle-button bg-[#18181B] text-[#FFE66D] py-2.5 px-3 text-xs font-extrabold inline-flex items-center gap-1"
                  >
                    <span>Beli</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-1 gap-4 sm:grid-cols-3">
          {CREW.map((member) => (
            <div key={member.name} className="flex items-center gap-3 px-2">
              <WoodlandMascotSvg
                character={member.character}
                className="h-14 w-14 shrink-0"
              />
              <div>
                <p className="font-hand text-base leading-tight text-[#18181B]">
                  {member.name}
                </p>
                <p className="text-xs leading-relaxed text-[#52525B]">
                  {member.lines[lang]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 py-16">
        <div className="doodle-box bg-[#EFF6FF]/70 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
            <div>
              <p className="flex items-center gap-1.5 font-mono text-xs font-extrabold uppercase tracking-widest text-[#2563EB] mb-2">
                <MessageSquareText className="w-3.5 h-3.5" />
                DEMO FITUR UNGGULAN WEB READER
              </p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#18181B]">
                {lang === 'en'
                  ? 'Try the Live Script Personalizer & Language Switcher'
                  : 'Coba Sendiri: Ganti Nama Anak Buah & Gaya Bahasa Secara Live!'}
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <label className="font-mono text-xs font-extrabold text-[#18181B]">
                {lang === 'en' ? 'Teammate Name:' : 'Ketik Nama Staf:'}
              </label>
              <input
                type="text"
                value={demoName}
                onChange={(e) => setDemoName(e.target.value)}
                placeholder="Budi / Siska"
                className="w-36 rounded-xl border-2 border-[#18181B] bg-white px-3 py-1.5 text-sm font-extrabold text-[#2563EB]"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-[#E7E2D9] bg-white p-5 shadow-sm">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-dashed border-[#E4E4E7] pb-2.5">
              <span className="font-mono text-xs font-bold text-[#1E3A8A]">
                {SAMPLE_SCRIPTS[lang].context}
              </span>
              <div className="flex items-center gap-1">
                {(['id-kasual', 'id-standar', 'en'] as BookLang[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => handleSelectLang(l)}
                    className={`rounded-md border px-2 py-0.5 font-mono text-[10px] font-bold ${
                      lang === l
                        ? 'border-[#18181B] bg-[#FFE66D] text-[#18181B]'
                        : 'border-transparent text-[#52525B]'
                    }`}
                  >
                    {l.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <p className="font-mono text-sm sm:text-base leading-relaxed text-[#18181B] bg-[#FFFDF5] p-4 rounded-xl border border-[#E4E4E7]">
              {SAMPLE_SCRIPTS[lang].script(demoName.trim() || 'Budi')}
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="font-hand text-sm text-[#52525B]">
                ✨ Di dalam buku ada <strong>40+ skrip</strong> seperti ini untuk berbagai situasi sulit!
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

          <div className="mt-6 border-t border-dashed border-[#D4D4D8] pt-5">
            <p className="mb-3 font-mono text-xs font-bold text-[#52525B]">
              {lang === 'en'
                ? 'Why does that script sound like that? Because the target was agreed first with the 3C Formula:'
                : lang === 'id-standar'
                ? 'Mengapa skripnya berbunyi seperti itu? Karena targetnya disepakati dulu melalui Rumus 3K:'
                : 'Kenapa skripnya bunyi begitu? Karena targetnya disepakati dulu pakai Rumus 3K:'}
            </p>
            <FrameworkDiagram3K lang={lang} />
          </div>
        </div>
      </section>

      <section id="pricing" className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12 py-16 lg:py-20">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <p className="flex items-center justify-center gap-1.5 font-mono text-xs font-extrabold uppercase tracking-widest text-[#71717A] mb-3">
            <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
            INVESTASI SEKALI BAYAR • AKSES SEUMUR HIDUP
          </p>
          <h2 className="text-2xl sm:text-4xl lg:text-[2.75rem] font-extrabold text-[#18181B] leading-tight mb-3">
            {lang === 'en'
              ? 'Choose Your Playbook Package (Instant Web + PDF Access)'
              : 'Pilih Paket Playbook Sesuai Kebutuhan Lo'}
          </h2>
          <p className="text-sm sm:text-base text-[#52525B]">
            {lang === 'en'
              ? 'Every purchase unlocks both languages at once: Indonesian (choose the Casual Gue/Lo or Standard Saya/Kamu style) and Global English, plus mobile-friendly PDF downloads.'
              : 'Setiap pembelian langsung membuka kedua bahasa sekaligus: Bahasa Indonesia (pilih gaya Kasual Gue/Lo atau Standar Saya/Kamu) dan Bahasa Inggris, beserta unduhan PDF ramah HP.'}
          </p>
        </div>

        <div className="mx-auto mb-10 flex max-w-4xl flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs font-bold text-[#18181B] sm:text-sm">
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 shrink-0 text-[#0D9488]" />
            {lang === 'en'
              ? 'Indonesian (Casual / Standard styles) + English'
              : 'Bahasa Indonesia (gaya Kasual / Standar) + English'}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 shrink-0 text-[#0D9488]" />
            {lang === 'en'
              ? 'A5 mobile PDF + copy-paste scripts for every book in the package'
              : 'PDF A5 ramah HP + skrip siap salin untuk setiap buku di paket'}
          </span>
          <span className="flex items-center gap-1.5">
            <Check className="h-4 w-4 shrink-0 text-[#0D9488]" />
            {lang === 'en'
              ? 'One-time payment, lifetime access'
              : 'Sekali bayar, akses selamanya'}
          </span>
        </div>

        <PricingGridDoodle lang={lang} />

        <PricingCompareTable lang={lang} />
      </section>

      <section className="mx-auto max-w-4xl px-5 py-16">
        <div className="doodle-panel-flat p-6 sm:p-8">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-[#2563EB]" />
            <h3 className="text-xl sm:text-2xl font-extrabold text-[#18181B]">
              {lang === 'en'
                ? 'Frequently Asked Questions'
                : 'Pertanyaan yang Sering Ditanyakan (FAQ)'}
            </h3>
          </div>
          <div className="divide-y divide-[#E4E4E7] text-sm">
            <div className="py-4 first:pt-0">
              <p className="font-extrabold text-[#18181B] mb-1">
                {lang === 'en'
                  ? '1. Do I get both languages with a single purchase?'
                  : '1. Kalau gw beli 1 buku atau bundel, apakah dapet kedua bahasa sekaligus?'}
              </p>
              <p className="text-[#52525B]">
                {lang === 'en'
                  ? 'Yes! One purchase unlocks Indonesian and Global English. For Indonesian, pick the Casual (Gue/Lo) or Standard (Saya/Kamu) style and switch anytime in the Web Reader and PDF downloads.'
                  : 'Betul banget! Sekali beli, lo dapet Bahasa Indonesia dan Bahasa Inggris. Khusus Bahasa Indonesia, lo bebas pilih gaya Kasual (Gue/Lo) atau Standar (Saya/Kamu) dan ganti kapan aja di Web Reader maupun download PDF-nya.'}
              </p>
            </div>
            <div className="py-4 last:pb-0">
              <p className="font-extrabold text-[#18181B] mb-1">
                {lang === 'en'
                  ? '2. Is this a monthly subscription or a one-time payment?'
                  : '2. Apakah ini biaya langganan bulanan atau sekali bayar?'}
              </p>
              <p className="text-[#52525B]">
                {lang === 'en'
                  ? '100% one-time payment for lifetime access. No recurring monthly fees.'
                  : '100% sekali bayar untuk akses selamanya (lifetime access). Tidak ada tagihan bulanan.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="mt-auto border-t border-[#E7E2D9] bg-white py-8 px-5 sm:px-8 lg:px-12">
        <div className="mx-auto w-full max-w-[1440px] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#52525B]">
          <div className="flex items-center gap-2">
            <WoodlandMascotSvg character="capybara" className="w-8 h-8" />
            <span className="font-extrabold text-[#18181B]">
              aiossan.com (Tactical Leadership Playbook Trilogy)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#0D9488]" />
            <span>Instant Checkout Powered by Mayar.id • 100% Original Framework</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
