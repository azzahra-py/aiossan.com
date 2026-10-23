'use client';

import React from 'react';
import Link from 'next/link';
import { BookId, BookLang, BOOK_CATALOG } from '@/types/books';
import { PricingGridDoodle } from '@/components/doodle/PricingGridDoodle';
import { WoodlandMascotSvg } from '@/components/doodle/WoodlandMascotSvg';
import { Lock, LogIn } from 'lucide-react';

export interface PaywallModalProps {
  bookId?: BookId;
  bookTitle?: string;
  chapterTitle?: string;
  lang?: BookLang;
  userEmail?: string | null;
}

export function PaywallModal({
  bookId = 'book-1',
  bookTitle,
  chapterTitle = 'Bab Ini',
  lang = 'id-kasual',
  userEmail,
}: PaywallModalProps) {
  const resolvedBookTitle =
    bookTitle ||
    BOOK_CATALOG.find((b) => b.id === bookId)?.titles[lang] ||
    'Playbook';

  return (
    <section className="my-10 rounded-3xl border-2 border-[#18181B] bg-gradient-to-b from-[#FEF9C3] via-[#FAF7F2] to-white p-6 sm:p-8 shadow-[6px_6px_0px_#18181B]">
      <div className="mx-auto max-w-3xl text-center mb-8">
        <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-2xl border-2 border-[#18181B] bg-white shadow-[3px_3px_0px_#18181B]">
          <WoodlandMascotSvg character="capybara" className="h-16 w-16" />
        </div>

        <span className="inline-flex items-center gap-1.5 rounded-full border-2 border-[#18181B] bg-[#FFE66D] px-3.5 py-1 font-mono text-xs font-extrabold text-[#18181B]">
          <Lock className="w-3.5 h-3.5" />
          {lang === 'en' ? 'Locked Chapter • Unlock the Full Playbook' : 'Bab Terkunci • Buka Akses Seluruh Playbook'}
        </span>

        <h3 className="mt-3 text-2xl sm:text-3xl font-extrabold text-[#18181B]">
          {lang === 'en' ? 'Continue Reading ' : 'Lanjutkan Membaca '}“{chapterTitle}” {lang === 'en' ? 'in' : 'di'} {resolvedBookTitle}
        </h3>
        <p className="mt-2 text-sm sm:text-base text-[#52525B]">
          {lang === 'en'
            ? 'You just read a preview of this chapter. Unlock full access to all 15 chapters, copy-paste 1-on-1 dialogue scripts, the interactive Chapter 12 simulation, and PDF downloads in all 3 language editions at once!'
            : 'Kamu baru saja membaca cuplikan awal bab ini. Buka akses penuh ke seluruh 15 bab, skrip dialog 1-on-1 siap salin, simulasi interaktif Bab 12, dan unduhan PDF dalam 3 edisi bahasa sekaligus!'}
        </p>

        {!userEmail && (
          <div className="mt-4 inline-flex flex-wrap items-center justify-center gap-2 rounded-xl border border-[#18181B] bg-white px-4 py-2 text-xs font-bold text-[#52525B]">
            <span>{lang === 'en' ? 'Purchased before?' : 'Sudah pernah membeli sebelumnya?'}</span>
            <Link
              href="/login"
              className="inline-flex items-center gap-1 font-extrabold text-[#2563EB] underline"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Sign in with Purchase Email' : 'Masuk dengan Email Pembelian'}</span>
            </Link>
          </div>
        )}
      </div>

      <PricingGridDoodle lang={lang} userEmail={userEmail} columns={2} />
    </section>
  );
}
