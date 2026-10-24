'use client';

import React, { useState } from 'react';
import { BookLang } from '@/types/books';
import { X, Copy, Check, Sparkles } from 'lucide-react';

interface ShareQuoteModalProps {
  quote: string | null;
  bookTitle: string;
  chapterTitle: string;
  lang?: BookLang;
  onClose: () => void;
}

export function ShareQuoteModal({
  quote,
  bookTitle,
  chapterTitle,
  lang = 'id-kasual',
  onClose,
}: ShareQuoteModalProps) {
  const [copied, setCopied] = useState(false);

  if (!quote) return null;

  const handleCopyQuote = () => {
    const formatted = `"${quote}"\n\n— ${bookTitle} (${chapterTitle})\n${lang === 'en' ? 'Read more at https://aiossan.com' : 'Baca selengkapnya di https://aiossan.com'}`;
    navigator.clipboard.writeText(formatted);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md rounded-2xl border border-[#E5E1D8] bg-white p-5 sm:p-6 shadow-2xl">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 rounded-lg border border-zinc-200 bg-zinc-50 p-1.5 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-colors"
        >
          <X className="h-4 w-4 text-[#18181B]" />
        </button>

        <div className="mb-3 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#1E40AF]" />
          <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#1E40AF]">
            {lang === 'en' ? 'Quote Card Ready to Share (IG Story / LinkedIn)' : 'Kartu Kutipan Siap Share (IG Story / LinkedIn)'}
          </span>
        </div>

        <div className="rounded-xl border border-[#E5E1D8] bg-[#FAF8F5] p-6 shadow-xs">
          <div className="mb-4 flex items-center justify-between">
            <span className="rounded-md border border-blue-200 bg-blue-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-[#1E40AF]">
              AIOSSAN LEADERSHIP PLAYBOOK
            </span>
            <span className="font-hand text-xs font-bold text-[#52525B]">
              aiossan.com
            </span>
          </div>

          <blockquote className="my-4 font-bold text-base sm:text-lg leading-snug text-[#18181B]">
            “{quote.length > 220 ? quote.slice(0, 220) + '...' : quote}”
          </blockquote>

          <div className="mt-5 flex items-center justify-between border-t border-dashed border-zinc-200 pt-3">
            <div>
              <p className="text-xs font-bold text-[#18181B]">
                {bookTitle}
              </p>
              <p className="font-hand text-xs text-[#52525B]">{chapterTitle}</p>
            </div>
            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-blue-200 bg-white text-[#1E40AF] shadow-xs shrink-0">
              <span className="font-mono text-[11px] font-bold">AI/26</span>
            </div>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="font-hand text-xs text-[#52525B]">
            {lang === 'en' ? 'Screenshot the card above for IG Story, or copy the text:' : 'Screenshot kartu di atas untuk IG Story atau salin teksnya:'}
          </p>
          <button
            type="button"
            onClick={handleCopyQuote}
            className="doodle-button inline-flex items-center gap-1.5 bg-[#1E40AF] px-4 py-2 text-xs font-extrabold text-white hover:bg-[#1D4ED8] shrink-0"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-300" />
                <span>{lang === 'en' ? 'Copied!' : 'Tersalin!'}</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4" />
                <span>{lang === 'en' ? 'Copy Quote' : 'Salin Kutipan'}</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
