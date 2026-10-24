'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookLang } from '@/types/books';
import { WhiteboardSceneSvg, WhiteboardScene } from './WhiteboardSceneSvg';
import { Sparkles, RotateCcw, ArrowRight, CheckCircle2 } from 'lucide-react';

interface QuizQuestion {
  q: Record<BookLang, string>;
  options: {
    label: Record<BookLang, string>;
    targetBook: 'book-1' | 'book-2' | 'book-3';
  }[];
}

const QUESTIONS: QuizQuestion[] = [
  {
    q: {
      'id-kasual':
        '1. Apa kejadian yang paling sering bikin kepala lo cenat-cenut minggu ini?',
      'id-standar':
        '1. Situasi apa yang paling sering menguras pikiran kamu minggu ini?',
      en: '1. Which workplace situation drained your energy the most this week?',
    },
    options: [
      {
        label: {
          'id-kasual':
            'Sungkan negur anak buah yang kerjanya meleset, akhirnya gw kerjain sendiri.',
          'id-standar':
            'Sungkan menegur staf yang hasilnya meleset, sehingga saya kerjakan sendiri.',
          en: 'Hesitating to correct a teammate’s missed work and redoing it myself.',
        },
        targetBook: 'book-1',
      },
      {
        label: {
          'id-kasual':
            'Kalender penuh rapat & chat malem, rasanya kayak pemadam kebakaran tiap hari.',
          'id-standar':
            'Kalender penuh rapat & pesan malam hari, terasa seperti pemadam kebakaran.',
          en: 'Back-to-back meetings and late-night pings—constantly firefighting.',
        },
        targetBook: 'book-2',
      },
      {
        label: {
          'id-kasual':
            'Para Team Leader di bawah gw jalan sendiri-sendiri & sering saling lempar salah.',
          'id-standar':
            'Para Team Leader di bawah saya kurang selaras dan terjebak ego antar-tim.',
          en: 'Team leads under me operate in silos and escalate every small conflict.',
        },
        targetBook: 'book-3',
      },
    ],
  },
  {
    q: {
      'id-kasual':
        '2. Saat anggota tim nanya "Kak, ini bagusnya gimana ya?", apa respons otomatis lo?',
      'id-standar':
        '2. Saat anggota tim bertanya "Sebaiknya ini bagaimana ya?", apa respons kamu?',
      en: '2. When a teammate asks "How should I do this?", what is your default move?',
    },
    options: [
      {
        label: {
          'id-kasual': 'Langsung gw kasih tahu jawabannya biar cepet beres.',
          'id-standar':
            'Langsung memberikan solusinya agar pekerjaan cepat selesai.',
          en: 'Give them the exact answer right away so it gets done fast.',
        },
        targetBook: 'book-1',
      },
      {
        label: {
          'id-kasual':
            'Gw bilang "Sini gw cek dulu", eh malah numpuk di meja gw sampai lembur.',
          'id-standar':
            'Mengambil alih untuk diperiksa, namun akhirnya menumpuk di meja saya.',
          en: 'Take the monkey onto my own back and review it late at night.',
        },
        targetBook: 'book-2',
      },
      {
        label: {
          'id-kasual':
            'Staf level bawah lompat langsung nanya ke gw, melewati Team Leader mereka.',
          'id-standar':
            'Staf melompati Team Leader mereka dan bertanya langsung kepada saya.',
          en: 'Frontline staff bypass their own team lead and come straight to me.',
        },
        targetBook: 'book-3',
      },
    ],
  },
  {
    q: {
      'id-kasual':
        '3. Apa target terbesar yang pengen lo capai dalam 30 hari ke depan?',
      'id-standar':
        '3. Apa sasaran utama yang ingin kamu capai dalam 30 hari ke depan?',
      en: '3. What is your #1 leadership goal for the next 30 days?',
    },
    options: [
      {
        label: {
          'id-kasual':
            'Punya skrip 1-on-1 yang tegas tapi manusiawi buat ngarahin & negur tim.',
          'id-standar':
            'Memiliki skrip 1-on-1 yang tegas dan terstruktur untuk membimbing tim.',
          en: 'Have plug-and-play 1-on-1 scripts to set clear targets and give feedback.',
        },
        targetBook: 'book-1',
      },
      {
        label: {
          'id-kasual':
            'Bisa pulang tenggo jam 6 sore dengan tenang karena sistem tim jalan otomatis.',
          'id-standar':
            'Memiliki batas kerja sehat dan kader tangan kanan agar tidak burnout.',
          en: 'Unplug at 6 PM guilt-free with a self-running team and strong second-in-command.',
        },
        targetBook: 'book-2',
      },
      {
        label: {
          'id-kasual':
            'Bikin para Team Leader di divisi gw mandiri dan kompak tanpa drama silo.',
          'id-standar':
            'Membangun kemandirian dan keselarasan antar-Team Leader di divisi saya.',
          en: 'Coach my team leads to solve cross-team bottlenecks without my micromanagement.',
        },
        targetBook: 'book-3',
      },
    ],
  },
];

const DIAGNOSIS_MAP: Record<
  'book-1' | 'book-2' | 'book-3',
  {
    scene: WhiteboardScene;
    badge: Record<BookLang, string>;
    title: Record<BookLang, string>;
    desc: Record<BookLang, string>;
    color: string;
  }
> = {
  'book-1': {
    scene: 'one-on-one',
    badge: {
      'id-kasual': 'Profil Lo: The Frontline Lead (Level 1)',
      'id-standar': 'Profil Kamu: The Frontline Lead (Tingkat 1)',
      en: 'Your Profile: The Frontline Lead (Level 1)',
    },
    title: {
      'id-kasual':
        'Lo Butuh Fondasi Obrolan 1-on-1 & Delegasi Tanpa Rasa Sungkan!',
      'id-standar':
        'Kamu Membutuhkan Kerangka Komunikasi 1-on-1 & Delegasi Terukur!',
      en: 'You Need Tactical 1-on-1 Scripts & Delegation Without Awkwardness!',
    },
    desc: {
      'id-kasual':
        'Mulai dari Buku 1 (Mahir Memimpin Tim) untuk menguasai Rumus Target 3K dan skrip koreksi 4 mata, lalu lanjutkan ke Buku 2 agar ritme kerja lo tetap awet.',
      'id-standar':
        'Mulailah dari Buku 1 (Mahir Memimpin Tim) untuk menguasai Rumus Target 3K dan koreksi empat mata, lalu kombinasikan dengan Buku 2.',
      en: 'Start with Book 1 (Practical Team Leadership) for the 3C Goal Formula and private course-correction scripts.',
    },
    color: 'from-[#EFF6FF] via-[#FFFFFF] to-[#EFF6FF]',
  },
  'book-2': {
    scene: 'sprint-board',
    badge: {
      'id-kasual': 'Profil Lo: The Crisis Stabilizer (Level 2)',
      'id-standar': 'Profil Kamu: The Crisis Stabilizer (Tingkat 2)',
      en: 'Your Profile: The Crisis Stabilizer (Level 2)',
    },
    title: {
      'id-kasual':
        'Waktunya Berhenti Jadi Pemadam Kebakaran & Mulai Bangun Sistem!',
      'id-standar':
        'Saatnya Beralih dari Pemadam Masalah ke Arsitek Sistem Kerja!',
      en: 'Stop Carrying Every Monkey—Build Your Anti-Burnout Team System!',
    },
    desc: {
      'id-kasual':
        'Buku 2 (Napas Panjang Memimpin Tim) dirancang khusus buat lo: cara menolak lemparan "monyet" tugas anak buah, negosiasi beban kerja pakai data ke bos, dan matikan pikiran kerja jam 6 sore.',
      'id-standar':
        'Buku 2 (Napas Panjang Memimpin Tim) akan membantu kamu membangun perisai emosi, mendelegasikan wewenang ke kader tangan kanan, dan mencegah burnout.',
      en: 'Book 2 (Sustaining Your Leadership) gives you the Glass Shield framework, capacity negotiation scripts, and 6 PM detachment rituals.',
    },
    color: 'from-[#FFFBEB] via-[#FFFFFF] to-[#FFFBEB]',
  },
  'book-3': {
    scene: 'strategy-meeting',
    badge: {
      'id-kasual': 'Profil Lo: The Strategic Navigator (Level 3)',
      'id-standar': 'Profil Kamu: The Strategic Navigator (Tingkat 3)',
      en: 'Your Profile: The Strategic Navigator (Level 3)',
    },
    title: {
      'id-kasual':
        'Level Lo Udah Di Atas Team Lead: Saatnya Melatih Para Kapten!',
      'id-standar':
        'Kamu Berada di Level Manajer Divisi: Saatnya Melatih Para Leader!',
      en: 'You Are Leading Other Leaders: Master Coaching the Coach & Anti-Silo!',
    },
    desc: {
      'id-kasual':
        'Buku 3 (Memimpin Para Leader) + Paket Bundel 3 Buku sangat cocok dipakai sebagai standar kurikulum seluruh Team Leader di bawah divisi lo.',
      'id-standar':
        'Buku 3 (Memimpin Para Leader) beserta Bundel Trilogi sangat ideal untuk menyelaraskan seluruh Team Leader di departemen kamu.',
      en: 'Book 3 (Leading Other Leaders) plus the Full 3-Book Trilogy Bundle gives you and your team leads a shared operating system.',
    },
    color: 'from-[#F0FDF4] via-[#FFFFFF] to-[#F0FDF4]',
  },
};

export function LeadershipQuizDoodle({ lang }: { lang: BookLang }) {
  const [step, setStep] = useState(0);
  const [picks, setPicks] = useState<('book-1' | 'book-2' | 'book-3')[]>([]);

  const handleSelect = (book: 'book-1' | 'book-2' | 'book-3') => {
    const next = [...picks, book];
    setPicks(next);
    setStep(step + 1);
  };

  const resetQuiz = () => {
    setPicks([]);
    setStep(0);
  };

  const getWinner = (): 'book-1' | 'book-2' | 'book-3' => {
    const counts = { 'book-1': 0, 'book-2': 0, 'book-3': 0 };
    picks.forEach((p) => counts[p]++);
    if (counts['book-3'] >= 2) return 'book-3';
    if (counts['book-2'] >= 2) return 'book-2';
    return picks[0] || 'book-1';
  };

  const finished = step >= QUESTIONS.length;
  const winner = finished ? getWinner() : 'book-1';
  const result = DIAGNOSIS_MAP[winner];
  const progressPct = finished
    ? 100
    : Math.round(((step + 1) / QUESTIONS.length) * 100);

  return (
    <div
      id="quiz"
      className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-9 shadow-sm relative overflow-hidden"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-zinc-100">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-3 py-0.5 font-mono text-xs font-bold text-blue-800">
          <Sparkles className="h-3.5 w-3.5 text-blue-600" />
          {lang === 'en'
            ? 'Leadership Diagnostic'
            : 'Diagnosis Tantangan Leader'}
        </span>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-bold text-zinc-600">
            {finished
              ? lang === 'en'
                ? '✓ Diagnosis Complete!'
                : '✓ Hasil Diagnosis Siap!'
              : `${lang === 'en' ? 'Step' : 'Langkah'} ${step + 1} / ${
                  QUESTIONS.length
                }`}
          </span>
          <div className="h-2 w-20 overflow-hidden rounded-full border border-zinc-200 bg-zinc-100">
            <div
              className="h-full bg-zinc-900 transition-all duration-300"
              style={{ width: `${progressPct}%` }}
            />
          </div>
        </div>
      </div>

      {!finished ? (
        <div>
          <h3 className="text-lg sm:text-2xl font-bold text-zinc-900 mb-5 leading-snug">
            {QUESTIONS[step].q[lang]}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {QUESTIONS[step].options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(opt.targetBook)}
                className="group flex items-center justify-between gap-4 rounded-xl border border-zinc-200 bg-zinc-50/60 p-4 sm:p-4.5 text-left transition-all hover:border-zinc-900 hover:bg-white hover:shadow-xs"
              >
                <div className="flex items-center gap-3.5">
                  <span className="flex h-7.5 w-7.5 sm:h-8 sm:w-8 shrink-0 items-center justify-center rounded-lg border border-zinc-200 bg-white font-mono text-xs font-bold text-zinc-700 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-zinc-800 group-hover:text-zinc-900 leading-relaxed">
                    {opt.label[lang]}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-zinc-400 transition-transform group-hover:translate-x-1 group-hover:text-zinc-900" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div
          className="rounded-2xl border border-zinc-200/90 bg-white p-6 sm:p-8 shadow-md"
        >
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 sm:gap-7">
            <div className="rounded-2xl border border-blue-100 bg-[#EFF6FF] p-3 shadow-xs shrink-0">
              <WhiteboardSceneSvg
                scene={result.scene}
                className="w-28 h-28 sm:w-32 sm:h-32 shrink-0"
              />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <span className="inline-block rounded-md border border-amber-300/80 bg-[#FEF3C7] text-[#92400E] px-2.5 py-0.5 font-mono text-xs font-bold shadow-2xs mb-2">
                {result.badge[lang]}
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-[#18181B] mb-2">
                {result.title[lang]}
              </h4>
              <p className="text-sm sm:text-base text-[#52525B] leading-relaxed mb-5">
                {result.desc[lang]}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <Link
                  href={`/read/${winner}/${lang}/ch-0`}
                  className="rounded-xl bg-zinc-900 text-white hover:bg-zinc-800 px-4.5 py-2.5 text-xs sm:text-sm font-bold shadow-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>
                    {lang === 'en'
                      ? `Read Free Sample (${winner.toUpperCase()})`
                      : `Baca Sample Gratis (${winner.toUpperCase()})`}
                  </span>
                </Link>
                <a
                  href="#pricing"
                  className="rounded-xl bg-white text-zinc-900 border border-zinc-300 hover:bg-zinc-50 px-4 py-2.5 text-xs sm:text-sm font-bold shadow-2xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <span>
                    {lang === 'en'
                      ? 'See Trilogy Bundle (Rp 149k)'
                      : 'Ambil Paket Bundel Hemat (Rp 149rb)'}
                  </span>
                </a>
                <button
                  type="button"
                  onClick={resetQuiz}
                  className="inline-flex items-center gap-1 font-mono text-xs font-bold text-zinc-500 hover:text-zinc-900 px-2 py-1 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Retake' : 'Ulangi Kuis'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
