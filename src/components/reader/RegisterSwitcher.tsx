'use client';

import React from 'react';
import Link from 'next/link';
import { BookId, BookLang, ReaderTheme } from '@/types/books';
import { cn } from '@/lib/utils';
import { Sun, BookOpen, Moon } from 'lucide-react';

export interface RegisterSwitcherProps {
  bookId: BookId;
  currentLang: BookLang;
  chapterSlug: string;
  theme?: ReaderTheme;
  onThemeChange?: (t: ReaderTheme) => void;
}

const REGISTERS: { lang: BookLang; label: string; sub: string }[] = [
  { lang: 'id-kasual', label: 'ID Kasual', sub: 'Gue/Lo' },
  { lang: 'id-standar', label: 'ID Standar', sub: 'Saya/Kamu' },
  { lang: 'en', label: 'EN', sub: 'Global' },
];

export function RegisterSwitcher({
  bookId,
  currentLang,
  chapterSlug,
  theme = 'paper',
  onThemeChange,
}: RegisterSwitcherProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {/* Language Register Selector */}
      <div className="flex items-center gap-1 p-1 bg-white border border-[#E4E2DD] rounded-lg">
        {REGISTERS.map((reg) => {
          const isActive = currentLang === reg.lang;
          return (
            <Link
              key={reg.lang}
              href={`/read/${bookId}/${reg.lang}/${chapterSlug}`}
              className={cn(
                'px-2.5 py-1 text-xs font-sans font-semibold rounded-md transition-all flex items-center gap-1',
                isActive
                  ? 'bg-[#111113] text-white'
                  : 'text-[#52525B] hover:bg-[#F3F0E8] hover:text-[#111113]'
              )}
            >
              <span>{reg.label}</span>
              <span className="text-[10px] font-mono opacity-75">({reg.sub})</span>
            </Link>
          );
        })}
      </div>

      {/* Reader Theme Selector (Paper / Sepia / Night) */}
      {onThemeChange && (
        <div className="flex items-center gap-0.5 p-1 bg-white border border-[#E4E2DD] rounded-lg">
          {(
            [
              { id: 'paper', label: 'Paper', icon: <Sun className="w-3.5 h-3.5" /> },
              { id: 'sepia', label: 'Sepia', icon: <BookOpen className="w-3.5 h-3.5" /> },
              { id: 'night', label: 'Night', icon: <Moon className="w-3.5 h-3.5" /> },
            ] as { id: ReaderTheme; label: string; icon: React.ReactNode }[]
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => onThemeChange(t.id)}
              title={`Theme: ${t.label}`}
              className={cn(
                'px-2 py-1 rounded text-[11px] font-mono flex items-center gap-1 transition-colors cursor-pointer',
                theme === t.id
                  ? 'bg-[#EA580C] text-white font-bold'
                  : 'text-[#52525B] hover:bg-[#F3F0E8]'
              )}
            >
              {t.icon}
              <span className="hidden sm:inline">{t.label}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
