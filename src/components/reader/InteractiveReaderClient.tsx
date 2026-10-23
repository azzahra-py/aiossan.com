'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookId, BookLang, ChapterData } from '@/types/books';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ShareQuoteModal } from './ShareQuoteModal';
import {
  Search,
  Sun,
  Moon,
  BookOpen,
  Lock,
  CheckCircle2,
  Menu,
  X,
  PartyPopper,
  Briefcase,
  PencilLine,
} from 'lucide-react';

interface InteractiveReaderClientProps {
  bookId: BookId;
  bookTitle: string;
  lang: BookLang;
  currentChapter: ChapterData;
  displayContent: string;
  hasAccess: boolean;
  allChapters: Omit<ChapterData, 'content'>[];
}

type PaperTheme = 'cream' | 'sepia' | 'midnight';
type FontScale = 'normal' | 'lg' | 'xl';
type DisplayMode = 'santai' | 'pro';

export function InteractiveReaderClient({
  bookId,
  bookTitle,
  lang,
  currentChapter,
  displayContent,
  hasAccess,
  allChapters,
}: InteractiveReaderClientProps) {
  const [paperTheme, setPaperTheme] = useState<PaperTheme>('cream');
  const [fontScale, setFontScale] = useState<FontScale>('normal');
  const [displayMode, setDisplayMode] = useState<DisplayMode>('santai');
  const [sosOpen, setSosOpen] = useState(false);
  const [sosQuery, setSosQuery] = useState('');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [activeQuote, setActiveQuote] = useState<string | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    try {
      const savedTheme = localStorage.getItem('aiossan:paper-theme') as PaperTheme;
      if (savedTheme) setPaperTheme(savedTheme);
      const savedScale = localStorage.getItem('aiossan:font-scale') as FontScale;
      if (savedScale) setFontScale(savedScale);
      const savedMode = localStorage.getItem('aiossan:display-mode') as DisplayMode;
      if (savedMode) setDisplayMode(savedMode);
    } catch {
      // Ignore
    }
  }, []);

  useEffect(() => {
    const onCompleted = () => {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 5000);
    };
    window.addEventListener('aiossan:chapter-completed', onCompleted);
    return () =>
      window.removeEventListener('aiossan:chapter-completed', onCompleted);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSosOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleThemeChange = (next: PaperTheme) => {
    setPaperTheme(next);
    try {
      localStorage.setItem('aiossan:paper-theme', next);
    } catch {
      // Ignore
    }
  };

  const handleScaleChange = (next: FontScale) => {
    setFontScale(next);
    try {
      localStorage.setItem('aiossan:font-scale', next);
    } catch {
      // Ignore
    }
  };

  const handleModeChange = (next: DisplayMode) => {
    setDisplayMode(next);
    try {
      localStorage.setItem('aiossan:display-mode', next);
    } catch {
      // Ignore
    }
  };

  const isPro = displayMode === 'pro';

  const paperClasses =
    paperTheme === 'sepia'
      ? 'reader-paper-sepia'
      : paperTheme === 'midnight'
      ? 'reader-paper-midnight'
      : 'reader-paper-cream';

  const fontScaleClasses =
    fontScale === 'xl'
      ? '[&_p]:text-[19px] [&_li]:text-[18px]'
      : fontScale === 'lg'
      ? '[&_p]:text-[17.5px] [&_li]:text-[17px]'
      : '';

  const filteredChapters = allChapters.filter((ch) =>
    ch.title.toLowerCase().includes(sosQuery.toLowerCase())
  );

  return (
    <>
      {showCelebration && (
        <div
          className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 ${
            isPro
              ? 'rounded-xl border border-[#D4D4D8] bg-white shadow-lg'
              : 'rounded-2xl border border-[#E7E2D9] bg-[#FFE66D] shadow-lg animate-bounce'
          }`}
        >
          {isPro ? (
            <CheckCircle2 className="h-6 w-6 text-[#0D9488]" />
          ) : (
            <PartyPopper className="h-6 w-6 text-[#18181B]" />
          )}
          <div>
            <p className="text-xs font-extrabold text-[#18181B]">
              {lang === 'en' ? '🎉 All Chapter Exercises Complete!' : '🎉 Semua Latihan Bab Ini Tuntas!'}
            </p>
            {!isPro && (
              <p className="font-hand text-xs text-[#18181B]">
                {lang === 'en' ? 'Kapi the Capybara stamps a star for you!' : 'Kapi si Kapibara memberikan stempel bintang untuk lo!'}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col-reverse gap-4 lg:flex-row lg:items-start">
        <div className="min-w-0 flex-1">
      <div
        className={`reader-protected mx-auto w-full max-w-[46rem] p-6 sm:p-10 transition-colors duration-200 ${paperClasses} ${fontScaleClasses} ${
          isPro
            ? 'reader-pro rounded-2xl border border-[#D4D4D8] shadow-none'
            : 'doodle-box'
        }`}
      >
        <MarkdownRenderer
          content={displayContent}
          bookId={bookId}
          chapterSlug={currentChapter.slug}
          lang={lang}
          onSelectQuote={(q) => setActiveQuote(q)}
        />
      </div>
        </div>

        <div className="no-print shrink-0 rounded-2xl border border-[#E7E2D9] bg-white p-3 shadow-sm lg:sticky lg:top-24 lg:w-44">
          <p className="mb-2 hidden font-mono text-[11px] font-bold uppercase tracking-wider text-[#52525B] lg:block">
            {lang === 'en' ? 'Display' : 'Tampilan'}
          </p>
          <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-col">
            <div>
              <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA]">
                {lang === 'en' ? 'Paper' : 'Kertas'}
              </p>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleThemeChange('cream')}
                  className={`flex w-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold ${
                    paperTheme === 'cream'
                      ? 'border-[#18181B] bg-[#FAF7F2] shadow-sm'
                      : 'border-transparent text-[#52525B]'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Cream</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeChange('sepia')}
                  className={`flex w-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold ${
                    paperTheme === 'sepia'
                      ? 'border-[#18181B] bg-[#F4ECD8] shadow-sm'
                      : 'border-transparent text-[#52525B]'
                  }`}
                >
                  <span>Sepia</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeChange('midnight')}
                  className={`flex w-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold ${
                    paperTheme === 'midnight'
                      ? 'border-[#18181B] bg-[#18181B] text-white shadow-sm'
                      : 'border-transparent text-[#52525B]'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Night' : 'Malam'}</span>
                </button>
              </div>
            </div>

            <div>
              <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA]">
                Mode
              </p>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleModeChange('santai')}
                  className={`flex w-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold ${
                    !isPro
                      ? 'border-[#18181B] bg-[#FFE66D] shadow-sm'
                      : 'border-transparent text-[#52525B]'
                  }`}
                >
                  <PencilLine className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Relaxed' : 'Santai'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('pro')}
                  className={`flex w-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold ${
                    isPro
                      ? 'border-[#18181B] bg-[#EFF6FF] text-[#1E3A8A] shadow-sm'
                      : 'border-transparent text-[#52525B]'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Professional' : 'Profesional'}</span>
                </button>
              </div>
            </div>

            <div>
              <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA]">
                {lang === 'en' ? 'Text size' : 'Ukuran huruf'}
              </p>
              <div className="flex items-center justify-between rounded-lg border border-[#18181B] bg-[#FAF7F2] p-0.5">
                <button
                  type="button"
                  onClick={() => handleScaleChange('normal')}
                  className={`flex-1 px-2 py-0.5 font-mono text-xs font-bold rounded ${
                    fontScale === 'normal' ? 'bg-[#FFE66D]' : ''
                  }`}
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => handleScaleChange('lg')}
                  className={`flex-1 px-2 py-0.5 font-mono text-xs font-bold rounded ${
                    fontScale === 'lg' ? 'bg-[#FFE66D]' : ''
                  }`}
                >
                  A+
                </button>
                <button
                  type="button"
                  onClick={() => handleScaleChange('xl')}
                  className={`flex-1 px-2 py-0.5 font-mono text-xs font-bold rounded ${
                    fontScale === 'xl' ? 'bg-[#FFE66D]' : ''
                  }`}
                >
                  A++
                </button>
              </div>
            </div>

            <div className="col-span-2 lg:col-span-1">
              <button
                type="button"
                onClick={() => setSosOpen(true)}
                className="flex w-full items-center justify-center gap-1.5 rounded-lg border-[1.5px] border-[#18181B] bg-[#FEF3C7] px-2.5 py-2 text-xs font-extrabold text-[#92400E] hover:bg-[#FFE66D]"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Topic Search' : 'SOS Topik'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="no-print fixed bottom-4 left-1/2 z-40 -translate-x-1/2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="doodle-button flex items-center gap-2 rounded-full bg-[#18181B] px-5 py-2.5 text-xs font-extrabold text-[#FFE66D] shadow-[4px_4px_0px_#2563EB]"
        >
          <Menu className="h-4 w-4" />
          <span>
            {lang === 'en' ? 'Chapter List' : 'Daftar Bab'} ({currentChapter.index + 1}/{allChapters.length})
          </span>
        </button>
      </div>

      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs lg:hidden">
          <div className="max-h-[80vh] w-full rounded-t-3xl border-t-4 border-[#18181B] bg-[#FAF7F2] p-5 shadow-2xl flex flex-col">
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-[#D4D4D8]" />
            <div className="mb-3 flex items-center justify-between border-b border-[#E4E4E7] pb-2.5">
              <div className="flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-[#2563EB]" />
                <span className="font-extrabold text-sm text-[#18181B]">
                  {lang === 'en' ? 'Select Chapter' : 'Pilih Bab'} ({bookTitle})
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(false)}
                className="rounded-lg border border-[#18181B] bg-white p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="overflow-y-auto space-y-1.5 pr-1">
              {allChapters.map((ch) => {
                const isCurrent = ch.slug === currentChapter.slug;
                const unlocked = ch.isFreeSample || hasAccess;
                return (
                  <Link
                    key={ch.slug}
                    href={`/read/${bookId}/${lang}/${ch.slug}`}
                    onClick={() => setMobileDrawerOpen(false)}
                    className={`flex items-center justify-between rounded-xl border-2 px-3.5 py-2.5 text-xs font-bold ${
                      isCurrent
                        ? 'border-[#E7E2D9] bg-[#FEF9C3] text-[#18181B]'
                        : 'border-[#E4E4E7] bg-white text-[#52525B]'
                    }`}
                  >
                    <span className="line-clamp-1">{ch.title}</span>
                    {unlocked ? (
                      <CheckCircle2 className="h-4 w-4 text-[#0D9488] shrink-0" />
                    ) : (
                      <Lock className="h-3.5 w-3.5 text-[#A1A1AA] shrink-0" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {sosOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 pt-20 backdrop-blur-xs">
          <div className="w-full max-w-lg rounded-2xl border border-[#E7E2D9] bg-[#FAF7F2] p-5 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs font-extrabold uppercase text-[#92400E]">
                {lang === 'en' ? '🚨 SOS Quick Chapter & Script Search' : '🚨 SOS Pencarian Cepat Bab & Skrip Leader'}
              </span>
              <button
                type="button"
                onClick={() => setSosOpen(false)}
                className="rounded-lg border border-[#18181B] bg-white p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <input
              type="text"
              autoFocus
              value={sosQuery}
              onChange={(e) => setSosQuery(e.target.value)}
              placeholder={lang === 'en' ? 'Search a situation (e.g. Correction, Appreciation, 3C Target, Burnout, Silos)...' : 'Cari situasi (misal: Koreksi, Apresiasi, Target 3K, Burnout, Silo)...'}
              className="w-full rounded-xl border-2 border-[#18181B] bg-white px-3.5 py-2.5 text-sm font-bold text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
            <div className="mt-3 max-h-72 overflow-y-auto space-y-1.5">
              {filteredChapters.map((ch) => (
                <Link
                  key={ch.slug}
                  href={`/read/${bookId}/${lang}/${ch.slug}`}
                  onClick={() => setSosOpen(false)}
                  className="flex items-center justify-between rounded-xl border border-[#18181B] bg-white px-3.5 py-2.5 text-xs font-bold hover:bg-[#FFE66D]"
                >
                  <span>{ch.title}</span>
                  <span className="font-mono text-[10px] text-[#2563EB]">
                    {lang === 'en' ? 'Open Chapter →' : 'Buka Bab →'}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      <ShareQuoteModal
        quote={activeQuote}
        bookTitle={bookTitle}
        chapterTitle={currentChapter.title}
        lang={lang}
        onClose={() => setActiveQuote(null)}
      />
    </>
  );
}
