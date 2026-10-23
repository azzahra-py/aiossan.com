'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookId, BookLang, ChapterData } from '@/types/books';
import { MarkdownRenderer } from './MarkdownRenderer';
import { ShareQuoteModal } from './ShareQuoteModal';
import { PaywallModal } from './PaywallModal';
import { ChapterIllustration } from '@/components/doodle/ChapterIllustration';
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
  ArrowLeft,
  ArrowRight,
} from 'lucide-react';

interface InteractiveReaderClientProps {
  bookId: BookId;
  bookTitle: string;
  lang: BookLang;
  currentChapter: ChapterData;
  displayContent: string;
  hasAccess: boolean;
  allChapters: Omit<ChapterData, 'content'>[];
  userEmail?: string | null;
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
  userEmail,
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
      const savedTheme = localStorage.getItem(
        'aiossan:paper-theme'
      ) as PaperTheme;
      if (savedTheme) setPaperTheme(savedTheme);
      const savedScale = localStorage.getItem(
        'aiossan:font-scale'
      ) as FontScale;
      if (savedScale) setFontScale(savedScale);
      const savedMode = localStorage.getItem(
        'aiossan:display-mode'
      ) as DisplayMode;
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

  const prevChapter =
    currentChapter.index > 0 ? allChapters[currentChapter.index - 1] : null;
  const nextChapter =
    currentChapter.index < allChapters.length - 1
      ? allChapters[currentChapter.index + 1]
      : null;

  return (
    <>
      {showCelebration && (
        <div
          className={`fixed top-20 right-4 z-50 flex items-center gap-3 px-4 py-3 ${
            isPro
              ? 'rounded-xl border border-[#D4D4D8] bg-white shadow-lg'
              : 'rounded-2xl border border-amber-300 bg-[#FFE66D] shadow-md animate-bounce'
          }`}
        >
          {isPro ? (
            <CheckCircle2 className="h-6 w-6 text-[#0D9488]" />
          ) : (
            <PartyPopper className="h-6 w-6 text-[#18181B]" />
          )}
          <div>
            <p className="text-xs font-extrabold text-[#18181B]">
              {lang === 'en'
                ? '🎉 All Chapter Exercises Complete!'
                : '🎉 Semua Latihan Bab Ini Tuntas!'}
            </p>
            {!isPro && (
              <p className="font-hand text-xs text-[#18181B]">
                {lang === 'en'
                  ? 'Kapi the Capybara stamps a star for you!'
                  : 'Kapi si Kapibara memberikan stempel bintang untuk lo!'}
              </p>
            )}
          </div>
        </div>
      )}

      <div className="flex flex-col-reverse gap-6 lg:flex-row lg:items-start">
        {/* Aligned Central Reading Column: Header + Illustration + Article + Paywall + Prev/Next */}
        <div className="min-w-0 flex-1 max-w-[1360px] mx-auto w-full">
          {/* Chapter Breadcrumb & Status Badges */}
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="font-mono text-xs font-extrabold px-2.5 py-0.5 rounded-md border border-zinc-200 bg-white shadow-2xs">
              {lang === 'en'
                ? `Chapter ${currentChapter.index + 1} of ${allChapters.length}`
                : `Bab ${currentChapter.index + 1} dari ${allChapters.length}`}
            </span>
            {currentChapter.isFreeSample ? (
              <span className="font-hand text-sm px-2.5 py-0.5 rounded-md border border-teal-200 bg-[#CCFBF1] text-[#065F46] font-bold shadow-2xs">
                {lang === 'en'
                  ? '★ Free Reading Sample'
                  : '★ Sampel Baca Gratis'}
              </span>
            ) : !hasAccess ? (
              <span className="font-mono text-xs px-2.5 py-0.5 rounded-md border border-amber-300 bg-[#FFE66D] text-[#18181B] font-extrabold inline-flex items-center gap-1 shadow-2xs">
                <Lock className="w-3 h-3" />
                {lang === 'en' ? 'Preview Mode' : 'Mode Cuplikan'}
              </span>
            ) : null}
          </div>

          <h1 className="font-extrabold text-2xl sm:text-4xl text-[#18181B] mb-4 leading-tight">
            {currentChapter.title}
          </h1>

          {/* Remotion-Powered Animated Chapter Illustration */}
          <ChapterIllustration
            bookId={bookId}
            chapterIndex={currentChapter.index}
            chapterSlug={currentChapter.slug}
            lang={lang}
          />

          {/* Article Surface */}
          <div
            className={`reader-protected relative w-full p-6 sm:p-10 transition-colors duration-200 ${paperClasses} ${fontScaleClasses} ${
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

            {/* Smooth Gradient Fade-Out Teaser When Chapter is Locked */}
            {!hasAccess && (
              <div className="mt-2 pt-12 pb-2 text-center border-t border-dashed border-[#DFD9CE]">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300 bg-[#FFE66D] px-3.5 py-1 font-mono text-xs font-extrabold text-[#18181B] shadow-2xs">
                  <Lock className="w-3.5 h-3.5" />
                  {lang === 'en'
                    ? 'Full Diagram, 1-on-1 Scripts & Exercises Continue Below'
                    : 'Diagram Alur, Skrip 1-on-1 & Latihan Bab Ini Berlanjut di Bawah'}
                </span>
              </div>
            )}
          </div>

          {!hasAccess && (
            <PaywallModal
              bookId={bookId}
              bookTitle={bookTitle}
              lang={lang}
              chapterSlug={currentChapter.slug}
              chapterTitle={currentChapter.title}
              userEmail={userEmail}
            />
          )}

          {hasAccess && (
            <div className="no-print mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl border border-[#DFD9CE] bg-white shadow-xs">
              {prevChapter ? (
                <Link
                  href={`/read/${bookId}/${lang}/${prevChapter.slug}`}
                  className="doodle-button bg-white px-4 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2 justify-center"
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                  <span className="line-clamp-1">
                    {lang === 'en' ? 'Previous: ' : 'Sebelumnya: '}
                    {prevChapter.title}
                  </span>
                </Link>
              ) : (
                <span className="font-mono text-xs font-bold text-[#71717A] px-2 py-1">
                  {lang === 'en' ? '• Start of Book' : '• Awal Naskah Buku'}
                </span>
              )}

              {nextChapter ? (
                <Link
                  href={`/read/${bookId}/${lang}/${nextChapter.slug}`}
                  className="doodle-button bg-[#FFE66D] px-5 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2 justify-center"
                >
                  <span className="line-clamp-1 font-extrabold">
                    {lang === 'en' ? 'Next: ' : 'Lanjut: '}
                    {nextChapter.title}
                  </span>
                  <ArrowRight className="w-4 h-4 shrink-0" />
                </Link>
              ) : (
                <span className="font-mono text-xs font-bold text-[#71717A] px-2 py-1">
                  {lang === 'en' ? '• End of Book' : '• Akhir Naskah Buku'}
                </span>
              )}
            </div>
          )}
        </div>

        {/* Right Sticky Display Controls Toolbar */}
        <div className="no-print shrink-0 doodle-panel-flat p-3.5 lg:sticky lg:top-20 lg:w-44 w-full">
          <p className="mb-2 hidden font-mono text-[11px] font-extrabold uppercase tracking-wider text-[#18181B] lg:block border-b border-[#DFD9CE] pb-1.5">
            {lang === 'en' ? 'Display' : 'Tampilan'}
          </p>
          <div className="grid grid-cols-2 gap-3 lg:flex lg:flex-col">
            <div>
              <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#71717A]">
                {lang === 'en' ? 'Paper' : 'Kertas'}
              </p>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleThemeChange('cream')}
                  className={`flex w-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors ${
                    paperTheme === 'cream'
                      ? 'border-amber-300 bg-[#FAF7F2] shadow-xs'
                      : 'border-transparent text-[#52525B] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Sun className="w-3.5 h-3.5 text-[#D97706]" />
                  <span>Cream</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeChange('sepia')}
                  className={`flex w-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors ${
                    paperTheme === 'sepia'
                      ? 'border-[#E2D3B8] bg-[#F4ECD8] shadow-xs'
                      : 'border-transparent text-[#52525B] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <span>Sepia</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleThemeChange('midnight')}
                  className={`flex w-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors ${
                    paperTheme === 'midnight'
                      ? 'border-zinc-700 bg-[#18181B] text-white shadow-xs'
                      : 'border-transparent text-[#52525B] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Moon className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Night' : 'Malam'}</span>
                </button>
              </div>
            </div>

            <div>
              <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#71717A]">
                Mode
              </p>
              <div className="flex flex-col gap-1">
                <button
                  type="button"
                  onClick={() => handleModeChange('santai')}
                  className={`flex w-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors ${
                    !isPro
                      ? 'border-amber-300 bg-[#FFE66D] shadow-xs'
                      : 'border-transparent text-[#52525B] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <PencilLine className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Relaxed' : 'Santai'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleModeChange('pro')}
                  className={`flex w-full items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-bold transition-colors ${
                    isPro
                      ? 'border-blue-200 bg-[#EFF6FF] text-[#1E3A8A] shadow-xs'
                      : 'border-transparent text-[#52525B] hover:bg-[#FAF7F2]'
                  }`}
                >
                  <Briefcase className="w-3.5 h-3.5" />
                  <span>{lang === 'en' ? 'Professional' : 'Profesional'}</span>
                </button>
              </div>
            </div>

            <div>
              <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-wider text-[#71717A]">
                {lang === 'en' ? 'Text size' : 'Ukuran huruf'}
              </p>
              <div className="flex items-center justify-between rounded-lg border border-zinc-200 bg-[#FAF7F2] p-0.5 shadow-2xs">
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
                className="doodle-button flex w-full items-center justify-center gap-1.5 bg-[#FEF3C7] px-2.5 py-2 text-xs font-extrabold text-[#92400E] hover:bg-[#FFE66D]"
              >
                <Search className="w-3.5 h-3.5" />
                <span>{lang === 'en' ? 'Topic Search' : 'SOS Topik'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Floating Chapter List Button */}
      <div className="no-print fixed bottom-4 left-1/2 z-40 -translate-x-1/2 lg:hidden">
        <button
          type="button"
          onClick={() => setMobileDrawerOpen(true)}
          className="doodle-button flex items-center gap-2 rounded-full bg-[#18181B] px-5 py-2.5 text-xs font-extrabold text-[#FFE66D] shadow-md hover:shadow-lg"
        >
          <Menu className="h-4 w-4" />
          <span>
            {lang === 'en' ? 'Chapter List' : 'Daftar Bab'} (
            {currentChapter.index + 1}/{allChapters.length})
          </span>
        </button>
      </div>

      {mobileDrawerOpen && (
        <div className="fixed inset-0 z-50 flex flex-col justify-end bg-black/60 backdrop-blur-xs lg:hidden">
          <div className="max-h-[80vh] w-full rounded-t-3xl border-t border-zinc-200 bg-[#FAF7F2] p-5 shadow-2xl flex flex-col">
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
                className="rounded-lg border border-zinc-200 bg-white p-1 shadow-2xs"
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
                    className={`flex items-center justify-between rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-colors ${
                      isCurrent
                        ? 'border-amber-300 bg-[#FEF9C3] text-[#18181B] shadow-2xs'
                        : 'border-[#E4E4E7] bg-white text-[#52525B] hover:bg-[#FAF7F2]'
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
          <div className="w-full max-w-lg rounded-2xl border border-zinc-200 bg-[#FAF7F2] p-5 shadow-xl">
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-xs font-extrabold uppercase text-[#92400E]">
                {lang === 'en'
                  ? '🚨 SOS Quick Chapter & Script Search'
                  : '🚨 SOS Pencarian Cepat Bab & Skrip Leader'}
              </span>
              <button
                type="button"
                onClick={() => setSosOpen(false)}
                className="rounded-lg border border-zinc-200 bg-white p-1 shadow-2xs"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <input
              type="text"
              autoFocus
              value={sosQuery}
              onChange={(e) => setSosQuery(e.target.value)}
              placeholder={
                lang === 'en'
                  ? 'Search a situation (e.g. Correction, Appreciation, 3C Target, Burnout, Silos)...'
                  : 'Cari situasi (misal: Koreksi, Apresiasi, Target 3K, Burnout, Silo)...'
              }
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm font-bold text-[#18181B] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/20 shadow-2xs"
            />
            <div className="mt-3 max-h-72 overflow-y-auto space-y-1.5">
              {filteredChapters.map((ch) => (
                <Link
                  key={ch.slug}
                  href={`/read/${bookId}/${lang}/${ch.slug}`}
                  onClick={() => setSosOpen(false)}
                  className="flex items-center justify-between rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-xs font-bold shadow-2xs hover:bg-[#FFE66D] transition-colors"
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
