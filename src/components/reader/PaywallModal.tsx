'use client';

import React from 'react';
import Link from 'next/link';
import { BookId, BookLang, BOOK_CATALOG } from '@/types/books';
import { PricingGridDoodle } from '@/components/doodle/PricingGridDoodle';
import { Lock, LogIn } from 'lucide-react';

export interface PaywallModalProps {
  bookId?: BookId;
  bookTitle?: string;
  chapterSlug?: string;
  chapterTitle?: string;
  lang?: BookLang;
  userEmail?: string | null;
}

export function PaywallModal({
  bookId = 'book-1',
  bookTitle,
  chapterSlug = 'ch-2',
  chapterTitle = 'Bab Ini',
  lang = 'id-kasual',
  userEmail,
}: PaywallModalProps) {
  const resolvedBookTitle =
    bookTitle ||
    BOOK_CATALOG.find((b) => b.id === bookId)?.titles[lang] ||
    'Playbook';

  const redirectPath = `/read/${bookId}/${lang}/${chapterSlug}`;

  return (
    <section className="my-8 doodle-box bg-white p-6 sm:p-8 border-2 border-[#18181B] shadow-[4px_4px_0px_#18181B]">
      <div className="mx-auto max-w-2xl text-center mb-7">
        <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-[#18181B] bg-[#EFF6FF] text-[#1E40AF] shadow-[2px_2px_0px_#18181B]">
          <Lock className="h-8 w-8" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#18181B] bg-[#F59E0B] px-3.5 py-1 font-mono text-xs font-extrabold text-[#18181B] shadow-[1px_1px_0px_#18181B]">
          <Lock className="w-3.5 h-3.5" />
          {lang === 'en'
            ? 'Locked Chapter • Unlock Full Playbook Access'
            : 'Bab Terkunci • Buka Akses Seluruh Playbook'}
        </span>

        <h3 className="mt-3 text-xl sm:text-2xl font-extrabold text-[#18181B] leading-snug">
          {lang === 'en' ? 'Continue Reading ' : 'Lanjutkan Membaca '}“
          {chapterTitle}” {lang === 'en' ? 'in' : 'di'} {resolvedBookTitle}
        </h3>
        <p className="mt-2 text-xs sm:text-sm text-[#52525B] leading-relaxed">
          {lang === 'en'
            ? 'You just read the opening preview of this chapter. Unlock full access to all 15 chapters, copy-paste 1-on-1 dialogue scripts, the interactive Chapter 12 simulator, and official A5 PDF downloads in Indonesian (Casual & Standard) and English!'
            : 'Kamu baru saja membaca cuplikan awal bab ini. Buka akses penuh ke seluruh 15 bab, skrip dialog 1-on-1 siap salin, simulasi interaktif Bab 12, dan unduhan PDF A5 dalam Bahasa Indonesia (gaya Kasual & Standar) serta English!'}
        </p>

        {!userEmail && (
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-bold text-[#52525B] shadow-xs">
            <span>
              {lang === 'en'
                ? 'Purchased before?'
                : 'Sudah pernah membeli sebelumnya?'}
            </span>
            <Link
              href={`/auth/login?redirect=${encodeURIComponent(redirectPath)}`}
              className="inline-flex items-center gap-1 font-extrabold text-[#2563EB] underline hover:text-[#1D4ED8]"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>
                {lang === 'en'
                  ? 'Sign in with Purchase Email'
                  : 'Masuk dengan Email Pembelian'}
              </span>
            </Link>
          </div>
        )}
      </div>

      <PricingGridDoodle
        lang={lang}
        userEmail={userEmail}
        columns={1}
        compactForBookId={bookId}
      />
    </section>
  );
}
