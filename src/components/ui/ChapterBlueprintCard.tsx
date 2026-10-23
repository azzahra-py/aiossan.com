'use client';

import React from 'react';
import { BookId, BookLang } from '@/types/books';
import { getChapterIllustration } from '@/lib/illustrations-editorial';

interface ChapterBlueprintCardProps {
  bookId: BookId;
  chapterSlug: string;
  lang?: BookLang;
  className?: string;
}

export function ChapterBlueprintCard({
  bookId,
  chapterSlug,
  lang = 'id-kasual',
  className = '',
}: ChapterBlueprintCardProps) {
  const meta = getChapterIllustration(bookId, chapterSlug);
  if (!meta) return null;

  const caption = lang === 'en' ? meta.captionEn : meta.captionId;

  return (
    <figure
      className={`my-8 rounded-xl border border-[#E4E2DD] bg-white overflow-hidden shadow-[0_2px_12px_-4px_rgba(17,17,19,0.06)] ${className}`}
    >
      <div className="bg-[#FBF9F5] p-3 sm:p-4 border-b border-[#E4E2DD]">
        <img
          src={meta.svgPath}
          alt={caption}
          className="w-full h-auto rounded-lg block mx-auto"
          loading="eager"
        />
      </div>
      <figcaption className="px-4 py-3 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <span className="font-mono font-bold text-[#111113] uppercase tracking-wider shrink-0">
          {meta.figCode}
        </span>
        <span className="font-serif italic text-[#52525B] text-sm">{caption}</span>
      </figcaption>
    </figure>
  );
}
