'use client';

import React, { useEffect, useState } from 'react';
import { BookLang } from '@/types/books';

interface DoodleCheckboxProps {
  storageKey: string;
  children: React.ReactNode;
  lang?: BookLang;
  onToggle?: () => void;
}

export function DoodleCheckbox({
  storageKey,
  children,
  lang = 'id-kasual',
  onToggle,
}: DoodleCheckboxProps) {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved === 'true') setChecked(true);
    } catch {
      // Ignore storage errors
    }
  }, [storageKey]);

  const handleToggle = () => {
    const next = !checked;
    setChecked(next);
    try {
      localStorage.setItem(storageKey, String(next));
      if (typeof window !== 'undefined' && 'vibrate' in navigator && next) {
        navigator.vibrate(15);
      }
      window.dispatchEvent(new CustomEvent('aiossan:checklist-updated'));
    } catch {
      // Ignore storage errors
    }
    if (onToggle) onToggle();
  };

  return (
    <li
      onClick={handleToggle}
      className={`my-2.5 flex cursor-pointer items-start gap-3 rounded-xl border-2 p-3.5 transition-all select-none ${
        checked
          ? 'border-[#0D9488] bg-[#ECFDF5] shadow-[2px_2px_0px_#0D9488]'
          : 'border-[#18181B] bg-[#FFFDF9] hover:bg-[#FEFCE8] shadow-[3px_3px_0px_#18181B]'
      }`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={(e) => {
          e.stopPropagation();
          handleToggle();
        }}
        className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 border-[#18181B] transition-colors ${
          checked ? 'bg-[#FFE66D]' : 'bg-white'
        }`}
      >
        {checked && (
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-4 w-4 text-[#18181B]"
          >
            <path
              d="M4 12.5L9.5 18L20 6"
              stroke="currentColor"
              strokeWidth="3.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </button>
      <div
        className={`flex-1 text-sm sm:text-base leading-relaxed transition-colors ${
          checked ? 'line-through text-[#52525B]' : 'text-[#18181B] font-medium'
        }`}
      >
        {children}
      </div>
      {checked && (
        <span className="shrink-0 rounded-full border border-[#0D9488] bg-white px-2 py-0.5 font-hand text-xs font-bold text-[#0D9488]">
          {lang === 'en' ? '✓ Done!' : '✓ Beres!'}
        </span>
      )}
    </li>
  );
}
