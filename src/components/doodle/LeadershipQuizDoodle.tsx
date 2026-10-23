'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookLang } from '@/types/books';
import { WoodlandMascotSvg, MascotCharacter } from './WoodlandMascotSvg';
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
      'id-kasual': '1. Apa kejadian yang paling sering bikin kepala lo cenat-cenut minggu ini?',
      'id-standar': '1. Situasi apa yang paling sering menguras pikiran kamu minggu ini?',
      en: '1. Which workplace situation drained your energy the most this week?',
    },
    options: [
      {
        label: {
          'id-kasual': 'Sungkan negur anak buah yang kerjanya meleset, akhirnya gw kerjain sendiri.',
          'id-standar': 'Sungkan menegur staf yang hasilnya meleset, sehingga saya kerjakan sendiri.',
          en: 'Hesitating to correct a teammate’s missed work and redoing it myself.',
        },
        targetBook: 'book-1',
      },
      {
        label: {
          'id-kasual': 'Kalender penuh rapat & chat malem, rasanya kayak pemadam kebakaran tiap hari.',
          'id-standar': 'Kalender penuh rapat & pesan malam hari, terasa seperti pemadam kebakaran.',
          en: 'Back-to-back meetings and late-night pings—constantly firefighting.',
        },
        targetBook: 'book-2',
      },
      {
        label: {
          'id-kasual': 'Para Team Leader di bawah gw jalan sendiri-sendiri & sering saling lempar salah.',
          'id-standar': 'Para Team Leader di bawah saya kurang selaras dan terjebak ego antar-tim.',
          en: 'Team leads under me operate in silos and escalate every small conflict.',
        },
        targetBook: 'book-3',
      },
    ],
  },
  {
    q: {
      'id-kasual': '2. Saat anggota tim nanya "Kak, ini bagusnya gimana ya?", apa respons otomatis lo?',
      'id-standar': '2. Saat anggota tim bertanya "Sebaiknya ini bagaimana ya?", apa respons kamu?',
      en: '2. When a teammate asks "How should I do this?", what is your default move?',
    },
    options: [
      {
        label: {
          'id-kasual': 'Langsung gw kasih tahu jawabannya biar cepet beres.',
          'id-standar': 'Langsung memberikan solusinya agar pekerjaan cepat selesai.',
          en: 'Give them the exact answer right away so it gets done fast.',
        },
        targetBook: 'book-1',
      },
      {
        label: {
          'id-kasual': 'Gw bilang "Sini gw cek dulu", eh malah numpuk di meja gw sampai lembur.',
          'id-standar': 'Mengambil alih untuk diperiksa, namun akhirnya menumpuk di meja saya.',
          en: 'Take the monkey onto my own back and review it late at night.',
        },
        targetBook: 'book-2',
      },
      {
        label: {
          'id-kasual': 'Staf level bawah lompat langsung nanya ke gw, melewati Team Leader mereka.',
          'id-standar': 'Staf melompati Team Leader mereka dan bertanya langsung kepada saya.',
          en: 'Frontline staff bypass their own team lead and come straight to me.',
        },
        targetBook: 'book-3',
      },
    ],
  },
  {
    q: {
      'id-kasual': '3. Apa target terbesar yang pengen lo capai dalam 30 hari ke depan?',
      'id-standar': '3. Apa sasaran utama yang ingin kamu capai dalam 30 hari ke depan?',
      en: '3. What is your #1 leadership goal for the next 30 days?',
    },
    options: [
      {
        label: {
          'id-kasual': 'Punya skrip 1-on-1 yang tegas tapi manusiawi buat ngarahin & negur tim.',
          'id-standar': 'Memiliki skrip 1-on-1 yang tegas dan terstruktur untuk membimbing tim.',
          en: 'Have plug-and-play 1-on-1 scripts to set clear targets and give feedback.',
        },
        targetBook: 'book-1',
      },
      {
        label: {
          'id-kasual': 'Bisa pulang tenggo jam 6 sore dengan tenang karena sistem tim jalan otomatis.',
          'id-standar': 'Memiliki batas kerja sehat dan kader tangan kanan agar tidak burnout.',
          en: 'Unplug at 6 PM guilt-free with a self-running team and strong second-in-command.',
        },
        targetBook: 'book-2',
      },
      {
        label: {
          'id-kasual': 'Bikin para Team Leader di divisi gw mandiri dan kompak tanpa drama silo.',
          'id-standar': 'Membangun kemandirian dan keselarasan antar-Team Leader di divisi saya.',
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
    mascot: MascotCharacter;
    badge: Record<BookLang, string>;
    title: Record<BookLang, string>;
    desc: Record<BookLang, string>;
    color: string;
  }
> = {
  'book-1': {
    mascot: 'capybara',
    badge: {
      'id-kasual': 'Profil Lo: Kapi si First-Time Captain',
      'id-standar': 'Profil Kamu: Kapi si Kapten Tim Baru',
      en: 'Your Profile: Kapi the First-Time Captain',
    },
    title: {
      'id-kasual': 'Lo Butuh Fondasi Obrolan 1-on-1 & Delegasi Tanpa Rasa Sungkan!',
      'id-standar': 'Kamu Membutuhkan Kerangka Komunikasi 1-on-1 & Delegasi Terukur!',
      en: 'You Need Tactical 1-on-1 Scripts & Delegation Without Awkwardness!',
    },
    desc: {
      'id-kasual':
        'Mulai dari Buku 1 (Mahir Memimpin Tim) untuk menguasai Rumus Target 3K dan skrip koreksi 4 mata, lalu lanjutkan ke Buku 2 agar ritme kerja lo tetap awet.',
      'id-standar':
        'Mulailah dari Buku 1 (Mahir Memimpin Tim) untuk menguasai Rumus Target 3K dan koreksi empat mata, lalu kombinasikan dengan Buku 2.',
      en: 'Start with Book 1 (Tactical Team Leadership) for the 3C Goal Formula and private course-correction scripts.',
    },
    color: 'from-[#DBEAFE] via-[#FFFDF9] to-[#FEF9C3]',
  },
  'book-2': {
    mascot: 'tortoise',
    badge: {
      'id-kasual': 'Profil Lo: Toti & Kapi Mode Pemadam Kebakaran',
      'id-standar': 'Profil Kamu: Penjaga Ketahanan & Arsitek Sistem',
      en: 'Your Profile: The Overloaded Firefighter Ready to Architect Systems',
    },
    title: {
      'id-kasual': 'Waktunya Berhenti Jadi Pemadam Kebakaran & Mulai Bangun Sistem!',
      'id-standar': 'Saatnya Beralih dari Pemadam Masalah ke Arsitek Sistem Kerja!',
      en: 'Stop Carrying Every Monkey—Build Your Anti-Burnout Team System!',
    },
    desc: {
      'id-kasual':
        'Buku 2 (Napas Panjang Memimpin Tim) dirancang khusus buat lo: cara menolak lemparan "monyet" tugas anak buah, negosiasi beban kerja pakai data ke bos, dan matikan pikiran kerja jam 6 sore.',
      'id-standar':
        'Buku 2 (Napas Panjang Memimpin Tim) akan membantu kamu membangun perisai emosi, mendelegasikan wewenang ke kader tangan kanan, dan mencegah burnout.',
      en: 'Book 2 (Sustaining Your Leadership Stamina) gives you the Glass Shield framework, capacity negotiation scripts, and 6 PM detachment rituals.',
    },
    color: 'from-[#CCFBF1] via-[#FFFDF9] to-[#FFEDD5]',
  },
  'book-3': {
    mascot: 'owl',
    badge: {
      'id-kasual': 'Profil Lo: Bubu & Kapi Sang Nakhoda Divisi',
      'id-standar': 'Profil Kamu: Pemimpin Lintas Tim (Leader of Leaders)',
      en: 'Your Profile: Bubu & Kapi the Division Navigator',
    },
    title: {
      'id-kasual': 'Level Lo Udah Di Atas Team Lead: Saatnya Melatih Para Kapten!',
      'id-standar': 'Kamu Berada di Level Manajer Divisi: Saatnya Melatih Para Leader!',
      en: 'You Are Leading Other Leaders: Master Coaching the Coach & Anti-Silo!',
    },
    desc: {
      'id-kasual':
        'Buku 3 (Memimpin Para Leader) + Paket Bundel 3 Buku sangat cocok dipakai sebagai standar kurikulum seluruh Team Leader di bawah divisi lo.',
      'id-standar':
        'Buku 3 (Memimpin Para Leader) beserta Bundel Trilogi sangat ideal untuk menyelaraskan seluruh Team Leader di departemen kamu.',
      en: 'Book 3 (Leading Other Leaders) plus the Full 3-Book Trilogy Bundle gives you and your team leads a shared operating system.',
    },
    color: 'from-[#EDE9FE] via-[#FFFDF9] to-[#FEF9C3]',
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

  return (
    <div id="quiz" className="doodle-box relative overflow-hidden bg-gradient-to-br from-[#FFFDF9] via-white to-[#FEFCE8] p-6 sm:p-8">
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#18181B] bg-[#FFE66D] px-3 py-1 font-mono text-xs font-extrabold text-[#18181B] shadow-[2px_2px_0px_#18181B]">
          <Sparkles className="h-3.5 w-3.5" />
          {lang === 'en'
            ? '45-Second Interactive Leadership Diagnostic'
            : 'Kuis Interaktif 45 Detik • Diagnosis Gaya & Beban Kerja Leader'}
        </span>
        <span className="font-hand text-sm font-bold text-[#2563EB]">
          {finished
            ? lang === 'en'
              ? '✨ Diagnosis Complete!'
              : '✨ Hasil Diagnosis Siap!'
            : `${lang === 'en' ? 'Question' : 'Pertanyaan'} ${step + 1} / ${
                QUESTIONS.length
              }`}
        </span>
      </div>

      {!finished ? (
        <div>
          <h3 className="text-lg sm:text-2xl font-extrabold text-[#18181B] mb-5">
            {QUESTIONS[step].q[lang]}
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {QUESTIONS[step].options.map((opt, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSelect(opt.targetBook)}
                className="doodle-button group flex items-center justify-between gap-3 bg-white hover:bg-[#FEF9C3] p-4 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border-2 border-[#18181B] bg-[#DBEAFE] font-mono text-xs font-black text-[#1E3A8A] group-hover:bg-[#FFE66D]">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#18181B]">
                    {opt.label[lang]}
                  </span>
                </div>
                <ArrowRight className="h-4 w-4 shrink-0 text-[#18181B] transition-transform group-hover:translate-x-1" />
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div
          className={`rounded-2xl border-2 border-[#18181B] bg-gradient-to-br ${result.color} p-5 sm:p-6 shadow-[4px_4px_0px_#18181B]`}
        >
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <WoodlandMascotSvg
              character={result.mascot}
              className="w-24 h-24 sm:w-28 sm:h-28 shrink-0"
            />
            <div className="flex-1 text-center sm:text-left">
              <span className="inline-block rounded-md border border-[#18181B] bg-white px-2.5 py-0.5 font-mono text-xs font-extrabold text-[#2563EB] mb-2">
                {result.badge[lang]}
              </span>
              <h4 className="text-xl sm:text-2xl font-extrabold text-[#18181B] mb-2">
                {result.title[lang]}
              </h4>
              <p className="text-sm sm:text-base text-[#18181B] leading-relaxed mb-4">
                {result.desc[lang]}
              </p>
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                <Link
                  href={`/read/${winner}/${lang}/ch-0`}
                  className="doodle-button bg-[#FFE66D] px-4 py-2 text-xs sm:text-sm inline-flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {lang === 'en'
                      ? `Read Free Sample (${winner.toUpperCase()})`
                      : `Baca Gratis Bab 1 (${winner.toUpperCase()})`}
                  </span>
                </Link>
                <a
                  href="#pricing"
                  className="doodle-button bg-[#2563EB] text-white px-4 py-2 text-xs sm:text-sm inline-flex items-center gap-1.5"
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
                  className="inline-flex items-center gap-1 font-mono text-xs font-bold text-[#52525B] hover:text-[#18181B] px-2 py-1"
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
