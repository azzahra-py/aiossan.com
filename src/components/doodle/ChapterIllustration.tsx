'use client';

import React from 'react';
import { BookId, BookLang } from '@/types/books';
import { getChapterIllustration } from '@/lib/illustrations';
import { RemotionPlayerWrapper } from '@/components/remotion/RemotionPlayerWrapper';
import { ChapterSceneBannerComp } from '@/components/remotion/ChapterSceneBannerComp';

interface ChapterIllustrationProps {
  bookId: BookId;
  chapterIndex?: number;
  chapterSlug?: string;
  lang?: BookLang;
}

export function ChapterIllustration({
  bookId,
  chapterIndex,
  chapterSlug,
  lang = 'id-kasual',
}: ChapterIllustrationProps) {
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
  const iconType = meta?.iconType || 'compass';

  return (
    <figure className="my-6 rounded-2xl border border-zinc-200/90 bg-white p-3.5 sm:p-4 shadow-sm overflow-hidden">
      <RemotionPlayerWrapper
        component={ChapterSceneBannerComp}
        inputProps={{
          bookId,
          chapterIndex: safeIdx,
          iconType,
          lang,
        }}
        durationInFrames={180}
        compositionWidth={800}
        compositionHeight={250}
        fps={30}
        badgeLabel={lang === 'en' ? 'Animated Sketch' : 'Sketsa Hidup'}
      />

      <figcaption className="mt-3 flex items-center justify-center gap-2 px-2 text-center font-hand text-base sm:text-lg text-[#18181B]">
        <span className="inline-block h-2 w-2 shrink-0 rounded-full bg-[#2563EB]" />
        <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
