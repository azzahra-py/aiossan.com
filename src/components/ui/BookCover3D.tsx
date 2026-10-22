import React from 'react';
import { BookId, BookLang, BOOK_CATALOG } from '@/types/books';
import { Compass, Flame, Shield } from 'lucide-react';

interface BookCover3DProps {
  bookId: BookId;
  lang?: BookLang;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function BookCover3D({
  bookId,
  lang = 'id-kasual',
  size = 'md',
  className = '',
}: BookCover3DProps) {
  const book = BOOK_CATALOG.find((b) => b.id === bookId) || BOOK_CATALOG[0];

  const palette = {
    'book-1': {
      spine: 'bg-[#1D4ED8]',
      badge: 'bg-[#EFF6FF] text-[#1D4ED8] border-[#BFDBFE]',
      ring: 'border-[#1D4ED8]/30 bg-[#EFF6FF]/60',
      icon: <Compass className="w-6 h-6 text-[#1D4ED8]" />,
    },
    'book-2': {
      spine: 'bg-[#EA580C]',
      badge: 'bg-[#FFF7ED] text-[#EA580C] border-[#FED7AA]',
      ring: 'border-[#EA580C]/30 bg-[#FFF7ED]/60',
      icon: <Flame className="w-6 h-6 text-[#EA580C]" />,
    },
    'book-3': {
      spine: 'bg-[#0F766E]',
      badge: 'bg-[#F0FDFA] text-[#0F766E] border-[#99F6E4]',
      ring: 'border-[#0F766E]/30 bg-[#F0FDFA]/60',
      icon: <Shield className="w-6 h-6 text-[#0F766E]" />,
    },
  }[bookId];

  const sizeClasses = {
    sm: 'w-44 h-60',
    md: 'w-56 h-76',
    lg: 'w-64 h-88',
  }[size];

  return (
    <div className={`relative select-none group mx-auto ${sizeClasses} ${className}`}>
      {/* Hardcover Page Fore-Edge Stack */}
      <div className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-r-xl rounded-l-sm bg-[#E4E2DD] border border-[#111113]/80 shadow-[0_14px_28px_-8px_rgba(17,17,19,0.22)]" />
      <div className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-r-xl rounded-l-sm bg-[#FBF9F5] border border-[#111113]/60" />

      {/* Front Cover */}
      <div className="relative h-full w-full rounded-r-xl rounded-l-sm bg-white border-[1.5px] border-[#111113] flex overflow-hidden transition-transform duration-200 group-hover:-translate-y-1">
        {/* Cloth Spine */}
        <div
          className={`w-5 sm:w-6 h-full ${palette.spine} border-r border-[#111113] flex flex-col items-center justify-between py-3 shrink-0`}
        >
          <span
            className="font-mono text-[8px] font-bold text-white/90 tracking-widest rotate-180 uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            AIOSSAN PRESS • {book.volumeCode}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
        </div>

        {/* Swiss Editorial Cover Layout */}
        <div className="flex-1 flex flex-col justify-between p-4 bg-[#FBF9F5] swiss-grid-bg">
          {/* Top Index Header */}
          <div className="flex items-center justify-between border-b border-[#111113]/15 pb-2">
            <span
              className={`font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border ${palette.badge}`}
            >
              {book.volumeCode}
            </span>
            <span className="font-mono text-[9px] uppercase tracking-wider text-[#71717A]">
              15 CH • A5 PDF
            </span>
          </div>

          {/* Title & Subtitle */}
          <div className="my-2">
            <h4 className="font-serif text-base sm:text-lg font-bold text-[#111113] leading-snug mb-1">
              {book.titles[lang]}
            </h4>
            <p className="font-sans text-[11px] text-[#52525B] line-clamp-2 leading-relaxed">
              {book.subtitles[lang]}
            </p>
          </div>

          {/* Geometric Emblem Window */}
          <div
            className={`rounded-lg border ${palette.ring} p-3 flex items-center justify-center my-1`}
          >
            <div className="w-11 h-11 rounded-full bg-white border border-[#111113]/20 flex items-center justify-center shadow-xs">
              {palette.icon}
            </div>
          </div>

          {/* Footer Publisher Colophon */}
          <div className="pt-2 border-t border-[#111113]/15 flex items-center justify-between font-mono text-[9px] text-[#71717A]">
            <span>AIOSSAN EDITION</span>
            <span className="font-bold text-[#111113]">3 REGISTERS</span>
          </div>
        </div>
      </div>
    </div>
  );
}
