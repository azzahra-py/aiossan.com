'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BookId, BookLang } from '@/types/books';
import { cn } from '@/lib/utils';
import { ChevronDown, Languages } from 'lucide-react';

interface LanguageMenuProps {
  bookId: BookId;
  currentLang: BookLang;
  chapterSlug: string;
}

const REGISTERS: {
  lang: BookLang;
  flag: string;
  short: string;
  label: string;
  activeClass: string;
}[] = [
  {
    lang: 'id-kasual',
    flag: '🇮🇩',
    short: 'Kasual',
    label: 'Kasual (Gue / Lo)',
    activeClass: 'bg-[#FFE66D] text-[#18181B]',
  },
  {
    lang: 'id-standar',
    flag: '🇮🇩',
    short: 'Standar',
    label: 'Standar (Saya / Kamu)',
    activeClass: 'bg-[#DBEAFE] text-[#1E3A8A]',
  },
  {
    lang: 'en',
    flag: '🌐',
    short: 'English',
    label: 'Global English',
    activeClass: 'bg-[#CCFBF1] text-[#065F46]',
  },
];

export function LanguageMenu({ bookId, currentLang, chapterSlug }: LanguageMenuProps) {
  const [open, setOpen] = useState(false);
  const current = REGISTERS.find((r) => r.lang === currentLang) ?? REGISTERS[0];

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-2.5 py-1.5 text-xs font-bold text-[#18181B] shadow-xs hover:border-zinc-300 hover:shadow-sm transition-all sm:px-3"
      >
        <Languages className="hidden sm:block w-3.5 h-3.5 text-[#2563EB]" />
        <span className="text-base leading-none">{current.flag}</span>
        <span className="hidden sm:inline">{current.short}</span>
        <ChevronDown
          className={cn('hidden sm:block w-3.5 h-3.5 transition-transform', open && 'rotate-180')}
        />
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label={currentLang === 'en' ? 'Close language menu' : 'Tutup menu bahasa'}
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div className="absolute right-0 top-full z-50 mt-2 w-60 rounded-2xl border border-[#E7E2D9] bg-white p-1.5 shadow-xl">
            {REGISTERS.map((reg) => {
              const isActive = currentLang === reg.lang;
              return (
                <Link
                  key={reg.lang}
                  href={`/read/${bookId}/${reg.lang}/${chapterSlug}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-extrabold transition-colors',
                    isActive
                      ? reg.activeClass
                      : 'text-[#52525B] hover:bg-[#FAF7F2]'
                  )}
                >
                  <span>{reg.flag}</span>
                  <span>{reg.label}</span>
                  {isActive && <span className="ml-auto">✓</span>}
                </Link>
              );
            })}
            <p className="mt-1 border-t border-dashed border-[#E4E4E7] px-3 pb-1.5 pt-2 text-[11px] leading-snug text-[#52525B]">
              {currentLang === 'en'
                ? 'Indonesian comes in two styles, Casual and Standard. English is a separate language.'
                : 'Bahasa Indonesia punya dua gaya: Kasual dan Standar. English adalah bahasa terpisah.'}
            </p>
          </div>
        </>
      )}
    </div>
  );
}
