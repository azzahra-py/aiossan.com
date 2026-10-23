'use client';

import React from 'react';
import { BookId, BookLang } from '@/types/books';
import { getChapterIllustration } from '@/lib/illustrations';
import { WoodlandMascotSvg, MascotCharacter } from './WoodlandMascotSvg';
import { Sparkles, Compass, ShieldCheck, Layers } from 'lucide-react';

interface ChapterIllustrationProps {
  bookId: BookId;
  chapterIndex?: number;
  chapterSlug?: string;
  lang?: BookLang;
}

const MASCOT_CYCLE: MascotCharacter[] = [
  'capybara',
  'otter',
  'owl',
  'redpanda',
  'tortoise',
];

const BOOK_BANNER_PALETTE: Record<
  BookId,
  { bg: string; tape: string; pill: string; label: string }
> = {
  'book-1': {
    bg: 'from-[#EFF6FF] via-[#FFFDF9] to-[#FEF9C3]',
    tape: 'bg-[#FFE66D]',
    pill: 'bg-[#DBEAFE] text-[#1E3A8A] border-[#1E3A8A]',
    label: 'Kapi & Kru • Playbook Vol. 01',
  },
  'book-2': {
    bg: 'from-[#FFF7ED] via-[#FFFDF9] to-[#CCFBF1]',
    tape: 'bg-[#99F6E4]',
    pill: 'bg-[#FFEDD5] text-[#9A3412] border-[#9A3412]',
    label: 'Kapi & Toti • Resilience Vol. 02',
  },
  'book-3': {
    bg: 'from-[#F0FDFA] via-[#FFFDF9] to-[#EDE9FE]',
    tape: 'bg-[#DDD6FE]',
    pill: 'bg-[#CCFBF1] text-[#065F46] border-[#065F46]',
    label: 'Kapi & Bubu • Division Lead Vol. 03',
  },
};

export function ChapterIllustration({
  bookId,
  chapterIndex,
  chapterSlug,
  lang = 'id-kasual',
}: ChapterIllustrationProps) {
  // Resolve numeric index and slug reliably
  const slug = chapterSlug || `ch-${chapterIndex ?? 0}`;
  const rawIdx =
    typeof chapterIndex === 'number'
      ? chapterIndex
      : parseInt(slug.replace(/\D/g, '') || '0', 10);
  const safeIdx = isNaN(rawIdx) ? 0 : rawIdx;

  const meta = getChapterIllustration(bookId, slug);
  const caption =
    lang === 'en'
      ? meta?.captionEn || 'Tactical leadership illustration.'
      : meta?.captionId || 'Ilustrasi kepemimpinan taktis.';

  const palette = BOOK_BANNER_PALETTE[bookId] || BOOK_BANNER_PALETTE['book-1'];
  const primaryMascot = MASCOT_CYCLE[safeIdx % MASCOT_CYCLE.length];
  const secondaryMascot = MASCOT_CYCLE[(safeIdx + 2) % MASCOT_CYCLE.length];

  return (
    <figure className="relative my-7 rounded-2xl border-2 border-[#18181B] bg-white p-4 sm:p-6 shadow-[4px_4px_0px_#18181B] overflow-hidden">
      <div
        aria-hidden="true"
        className={`absolute -top-2.5 left-1/2 -translate-x-1/2 h-5 w-32 -rotate-1 border border-[#18181B] ${palette.tape} opacity-90 shadow-sm`}
      />

      <div
        className={`relative rounded-xl border-2 border-[#18181B] bg-gradient-to-br ${palette.bg} p-5 sm:p-6 overflow-hidden`}
      >
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-0.5 font-mono text-[11px] font-bold ${palette.pill}`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            {palette.label}
          </span>
          <span className="font-mono text-[11px] font-bold text-[#52525B] bg-white/80 px-2.5 py-0.5 rounded-md border border-[#18181B]">
            {lang === 'en'
              ? `Chapter ${safeIdx === 0 ? 'Introduction' : safeIdx} • Visual Sketch`
              : `Bab ${safeIdx === 0 ? 'Pendahuluan' : safeIdx} • Visual Sketsa`}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 py-2">
          <div className="flex items-center gap-3">
            <div className="relative transition-transform duration-300 hover:scale-105">
              <WoodlandMascotSvg character={primaryMascot} className="w-24 h-24 sm:w-28 sm:h-28" />
            </div>

            <div className="flex flex-col items-center">
              <div className="rounded-xl border-2 border-[#18181B] bg-[#FFE66D] px-3 py-1.5 shadow-[2px_2px_0px_#18181B] flex items-center gap-1.5">
                {safeIdx % 3 === 0 ? (
                  <Compass className="w-4 h-4 text-[#18181B]" />
                ) : safeIdx % 3 === 1 ? (
                  <ShieldCheck className="w-4 h-4 text-[#18181B]" />
                ) : (
                  <Layers className="w-4 h-4 text-[#18181B]" />
                )}
                <span className="font-hand text-sm font-bold text-[#18181B]">
                  {lang === 'en'
                    ? safeIdx <= 2
                      ? 'Tactical Foundation'
                      : safeIdx <= 6
                      ? '4 Core Skills'
                      : safeIdx <= 10
                      ? 'Dialogue Scripts'
                      : 'Simulation & Action'
                    : safeIdx <= 2
                    ? 'Fondasi Taktis'
                    : safeIdx <= 6
                    ? '4 Skill Inti'
                    : safeIdx <= 10
                    ? 'Skrip Dialog'
                    : 'Simulasi & Aksi'}
                </span>
              </div>
              <svg className="w-20 h-5 text-[#18181B] mt-1" viewBox="0 0 80 20" fill="none">
                <path
                  d="M4 10 Q 40 2, 72 10 M66 5 L74 10 L66 15"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="4 3"
                />
              </svg>
            </div>

            <div className="relative hidden xs:block transition-transform duration-300 hover:scale-105">
              <WoodlandMascotSvg character={secondaryMascot} className="w-20 h-20 sm:w-24 sm:h-24" />
            </div>
          </div>
        </div>
      </div>

      <figcaption className="mt-3 flex items-center justify-center gap-2 text-center font-hand text-base sm:text-lg text-[#18181B]">
        <span className="inline-block h-2 w-2 rounded-full bg-[#2563EB]" />
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
