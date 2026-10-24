import React from 'react';
import { BookId, BookLang, BOOK_CATALOG } from '@/types/books';
import { WhiteboardSceneSvg, WhiteboardScene } from './WhiteboardSceneSvg';

interface BookCoverMockupProps {
  bookId: BookId;
  lang?: BookLang;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const THEME_MAP: Record<
  BookId,
  {
    vol: string;
    accentBg: string;
    spineBg: string;
    badgeBg: string;
    scene: WhiteboardScene;
    tagText: Record<BookLang, string>;
  }
> = {
  'book-1': {
    vol: 'VOL. 01',
    accentBg: 'bg-[#EFF6FF]',
    spineBg: 'bg-[#1E40AF]',
    badgeBg: 'bg-[#DBEAFE]',
    scene: 'one-on-one',
    tagText: {
      'id-kasual': 'Vol 1 • Memimpin Tim Mandiri',
      'id-standar': 'Vol 1 • Memimpin Tim Mandiri',
      en: 'Vol 1 • First-Time Lead',
    },
  },
  'book-2': {
    vol: 'VOL. 02',
    accentBg: 'bg-[#FFFBEB]',
    spineBg: 'bg-[#D97706]',
    badgeBg: 'bg-[#FEF3C7]',
    scene: 'sprint-board',
    tagText: {
      'id-kasual': 'Vol 2 • Anti-Burnout & Ritme',
      'id-standar': 'Vol 2 • Ketahanan & Kapasitas',
      en: 'Vol 2 • Anti-Burnout Systems',
    },
  },
  'book-3': {
    vol: 'VOL. 03',
    accentBg: 'bg-[#F0FDF4]',
    spineBg: 'bg-[#059669]',
    badgeBg: 'bg-[#DCFCE7]',
    scene: 'strategy-meeting',
    tagText: {
      'id-kasual': 'Vol 3 • Skalabilitas Manajer',
      'id-standar': 'Vol 3 • Penyelarasan Divisi',
      en: 'Vol 3 • Lead of Leads',
    },
  },
};

export function BookCoverMockup({
  bookId,
  lang = 'id-kasual',
  size = 'md',
  className = '',
}: BookCoverMockupProps) {
  const book = BOOK_CATALOG.find((b) => b.id === bookId) || BOOK_CATALOG[0];
  const theme = THEME_MAP[bookId];

  const dimensions =
    size === 'sm'
      ? 'w-44 h-64'
      : size === 'lg'
      ? 'w-64 h-[22rem]'
      : 'w-56 h-[19rem]';

  return (
    <div
      className={`relative select-none group ${dimensions} ${className}`}
      style={{ perspective: '900px' }}
    >
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-r-2xl rounded-l-md bg-[#FAF7F2] border border-[#DFD9CE] shadow-md" />

      <div className="relative h-full w-full rounded-r-2xl rounded-l-md bg-white border border-zinc-200 flex overflow-hidden shadow-lg transition-transform duration-200 group-hover:-translate-y-1.5">
        <div
          className={`w-5 h-full ${theme.spineBg} border-r border-black/10 flex flex-col items-center justify-between py-3 shrink-0`}
        >
          <span
            className="font-mono text-[9px] font-bold text-white tracking-widest rotate-180"
            style={{ writingMode: 'vertical-rl' }}
          >
            AIOSSAN PLAYBOOK
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFE66D] border border-black/10" />
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between bg-[#FFFDF9] relative">
          <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-2">
            <span
              className={`font-mono text-[10px] font-extrabold px-2 py-0.5 ${theme.badgeBg} border border-black/10 rounded shadow-2xs`}
            >
              {theme.vol}
            </span>
            <span className="font-hand text-xs font-bold text-[#52525B]">
              15 Bab + PDF
            </span>
          </div>

          <div
            className={`my-2 min-h-[7.25rem] rounded-xl border border-black/10 ${theme.accentBg} p-2 flex flex-col items-center justify-center shadow-xs`}
          >
            <WhiteboardSceneSvg scene={theme.scene} className="w-20 h-20 mb-1" />
            <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider text-[#18181B] bg-white/95 px-2 py-0.5 rounded border border-black/10 shadow-2xs">
              {theme.tagText[lang]}
            </span>
          </div>

          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-[#18181B] leading-tight mb-1 min-h-[2.5rem]">
              {book.titles[lang]}
            </h4>
            <p className="text-[11px] text-[#52525B] line-clamp-2 leading-snug">
              {book.subtitles[lang]}
            </p>
          </div>

          <div className="pt-2 border-t border-dashed border-[#D4D4D8] flex items-center justify-between text-[10px] font-mono text-[#52525B]">
            <span>aiossan.com</span>
            <span className="font-bold text-[#2563EB]">ID + EN</span>
          </div>
        </div>
      </div>
    </div>
  );
}
