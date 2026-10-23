import React from 'react';
import { BookId, BookLang, BOOK_CATALOG } from '@/types/books';
import { WoodlandMascotSvg, MascotCharacter } from './WoodlandMascotSvg';

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
    mascot: MascotCharacter;
    tagText: Record<BookLang, string>;
  }
> = {
  'book-1': {
    vol: 'VOL. 01',
    accentBg: 'bg-[#DBEAFE]',
    spineBg: 'bg-[#2563EB]',
    badgeBg: 'bg-[#FFE66D]',
    mascot: 'capybara',
    tagText: {
      'id-kasual': 'Kapi • First-Time Leader',
      'id-standar': 'Kapi • Pemimpin Tim Baru',
      en: 'Kapi • First-Time Lead',
    },
  },
  'book-2': {
    vol: 'VOL. 02',
    accentBg: 'bg-[#FFEDD5]',
    spineBg: 'bg-[#EA580C]',
    badgeBg: 'bg-[#99F6E4]',
    mascot: 'tortoise',
    tagText: {
      'id-kasual': 'Kapi & Toti • Anti-Burnout',
      'id-standar': 'Kapi & Toti • Ketahanan Diri',
      en: 'Kapi & Toti • Anti-Burnout',
    },
  },
  'book-3': {
    vol: 'VOL. 03',
    accentBg: 'bg-[#CCFBF1]',
    spineBg: 'bg-[#0D9488]',
    badgeBg: 'bg-[#DDD6FE]',
    mascot: 'owl',
    tagText: {
      'id-kasual': 'Kapi & Bubu • Level Manajer',
      'id-standar': 'Kapi & Bubu • Manajer Divisi',
      en: 'Kapi & Bubu • Lead of Leads',
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
      ? 'w-64 h-88'
      : 'w-56 h-76';

  return (
    <div
      className={`relative select-none group ${dimensions} ${className}`}
      style={{ perspective: '900px' }}
    >
      <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-r-2xl rounded-l-md bg-[#FAF7F2] border-2 border-[#18181B] shadow-[4px_4px_0px_#18181B]" />

      <div className="relative h-full w-full rounded-r-2xl rounded-l-md bg-white border-2 border-[#18181B] flex overflow-hidden transition-transform duration-200 group-hover:-translate-y-1.5">
        <div
          className={`w-5 h-full ${theme.spineBg} border-r-2 border-[#18181B] flex flex-col items-center justify-between py-3 shrink-0`}
        >
          <span
            className="font-mono text-[9px] font-bold text-white tracking-widest rotate-180"
            style={{ writingMode: 'vertical-rl' }}
          >
            AIOSSAN PLAYBOOK
          </span>
          <span className="w-2.5 h-2.5 rounded-full bg-[#FFE66D] border border-[#18181B]" />
        </div>

        <div className="flex-1 p-4 flex flex-col justify-between bg-[#FFFDF9] relative">
          <div className="flex items-center justify-between border-b border-[#E4E4E7] pb-2">
            <span
              className={`font-mono text-[10px] font-extrabold px-2 py-0.5 ${theme.badgeBg} border border-[#18181B] rounded shadow-[1px_1px_0px_#18181B]`}
            >
              {theme.vol}
            </span>
            <span className="font-hand text-xs font-bold text-[#52525B]">
              15 Bab + PDF
            </span>
          </div>

          <div
            className={`my-2 rounded-xl border-2 border-[#18181B] ${theme.accentBg} p-2.5 flex flex-col items-center justify-center shadow-[2px_2px_0px_#18181B]`}
          >
            <WoodlandMascotSvg character={theme.mascot} className="w-16 h-16 mb-1" />
            <span className="font-mono text-[9px] font-extrabold uppercase tracking-wider text-[#18181B] bg-white/90 px-2 py-0.5 rounded border border-[#18181B]">
              {theme.tagText[lang]}
            </span>
          </div>

          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-[#18181B] leading-tight mb-1">
              {book.titles[lang]}
            </h4>
            <p className="text-[11px] text-[#52525B] line-clamp-2 leading-snug">
              {book.subtitles[lang]}
            </p>
          </div>

          <div className="pt-2 border-t border-dashed border-[#D4D4D8] flex items-center justify-between text-[10px] font-mono text-[#52525B]">
            <span>aiossan.com</span>
            <span className="font-bold text-[#2563EB]">3 Edisi Bahasa</span>
          </div>
        </div>
      </div>
    </div>
  );
}
