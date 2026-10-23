'use client';

import React, { useState } from 'react';
import { BookLang } from '@/types/books';
import { cn } from '@/lib/utils';
import { ChevronDown, Languages } from 'lucide-react';

interface LandingLanguageMenuProps {
  lang: BookLang;
  onSelect: (lang: BookLang) => void;
}

const OPTIONS: {
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
    label: 'Bahasa Indonesia, Kasual (Gue / Lo)',
    activeClass: 'bg-[#FFE66D] text-[#18181B]',
  },
  {
    lang: 'id-standar',
    flag: '🇮🇩',
    short: 'Standar',
    label: 'Bahasa Indonesia, Standar (Saya / Kamu)',
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

export function LandingLanguageMenu({ lang, onSelect }: LandingLanguageMenuProps) {
  const [open, setOpen] = useState(false);
  const current = OPTIONS.find((o) => o.lang === lang) ?? OPTIONS[0];

  const handlePick = (next: BookLang) => {
    onSelect(next);
    setOpen(false);
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={lang === 'en' ? 'Choose language' : 'Pilih bahasa'}
        className="inline-flex items-center gap-1.5 rounded-xl border-2 border-[#18181B] bg-white px-2.5 py-1.5 text-xs font-bold text-[#18181B] hover:bg-[#EFF6FF] sm:px-3"
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
            aria-label={lang === 'en' ? 'Close language menu' : 'Tutup menu bahasa'}
            className="fixed inset-0 z-40 cursor-default"
            onClick={() => setOpen(false)}
          />
          <div
            role="menu"
            className="absolute right-0 top-full z-50 mt-2 w-72 rounded-2xl border-2 border-[#18181B] bg-white p-1.5 shadow-[4px_4px_0px_#18181B]"
          >
            {OPTIONS.map((opt) => {
              const isActive = lang === opt.lang;
              return (
                <button
                  key={opt.lang}
                  type="button"
                  role="menuitem"
                  onClick={() => handlePick(opt.lang)}
                  className={cn(
                    'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-extrabold transition-colors',
                    isActive ? opt.activeClass : 'text-[#52525B] hover:bg-[#FAF7F2]'
                  )}
                >
                  <span>{opt.flag}</span>
                  <span>{opt.label}</span>
                  {isActive && <span className="ml-auto">✓</span>}
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
