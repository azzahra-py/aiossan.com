'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookId, BookLang, BOOK_CATALOG, ChapterMeta, ReaderTheme } from '@/types/books';
import { RegisterSwitcher } from './RegisterSwitcher';
import { ChapterBlueprintCard } from '@/components/ui/ChapterBlueprintCard';
import { MarkdownRenderer } from './MarkdownRenderer';
import { PaywallCard } from './PaywallCard';
import { TacticalButton } from '@/components/ui/TacticalButton';
import {
  ChevronLeft,
  ArrowLeft,
  ArrowRight,
  Lock,
  CheckCircle2,
  User,
} from 'lucide-react';

interface ReaderClientShellProps {
  bookId: BookId;
  lang: BookLang;
  chapterSlug: string;
  chapterTitle: string;
  chapterIndex: number;
  isFreeSample: boolean;
  hasAccess: boolean;
  isLoggedIn: boolean;
  fullContent: string;
  previewContent: string;
  chapters: ChapterMeta[];
}

export function ReaderClientShell({
  bookId,
  lang,
  chapterSlug,
  chapterTitle,
  chapterIndex,
  isFreeSample,
  hasAccess,
  isLoggedIn,
  fullContent,
  previewContent,
  chapters,
}: ReaderClientShellProps) {
  const [theme, setTheme] = useState<ReaderTheme>('paper');
  const isEn = lang === 'en';

  useEffect(() => {
    try {
      const saved = localStorage.getItem('aiossan:reader-theme') as ReaderTheme | null;
      if (saved && ['paper', 'sepia', 'night'].includes(saved)) {
        setTheme(saved);
      }
    } catch {
      // Ignore
    }
  }, []);

  const handleThemeChange = (next: ReaderTheme) => {
    setTheme(next);
    try {
      localStorage.setItem('aiossan:reader-theme', next);
    } catch {
      // Ignore
    }
  };

  const catalogItem = BOOK_CATALOG.find((b) => b.id === bookId);
  const prevChapter = chapterIndex > 0 ? chapters[chapterIndex - 1] : null;
  const nextChapter = chapterIndex < chapters.length - 1 ? chapters[chapterIndex + 1] : null;
  const progressPct = Math.round(((chapterIndex + 1) / chapters.length) * 100);

  return (
    <div
      data-reader-theme={theme}
      className="min-h-screen flex flex-col bg-[var(--reader-bg,#FBF9F5)] text-[var(--reader-ink,#111113)] transition-colors duration-200"
    >
      {/* Top Sticky Reader Control Bar */}
      <header className="sticky top-0 z-30 border-b border-[var(--reader-border,#E4E2DD)] bg-[var(--reader-bg,#FBF9F5)]/90 backdrop-blur-md px-4 py-2.5">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-start">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider px-2.5 py-1.5 rounded-lg border border-[var(--reader-border,#E4E2DD)] bg-[var(--reader-surface,#FFFFFF)] hover:border-[#EA580C]"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>{isEn ? 'Index' : 'Beranda'}</span>
            </Link>

            {/* Volume Switcher */}
            <div className="flex items-center gap-1 p-0.5 rounded-lg border border-[var(--reader-border,#E4E2DD)] bg-[var(--reader-surface,#FFFFFF)]">
              {BOOK_CATALOG.map((b) => {
                const active = b.id === bookId;
                return (
                  <Link
                    key={b.id}
                    href={`/read/${b.id}/${lang}/ch-0`}
                    className={`px-2 py-1 rounded text-[11px] font-mono font-bold transition-colors ${
                      active
                        ? 'bg-[#111113] text-white'
                        : 'text-[var(--reader-muted,#52525B)] hover:text-[var(--reader-ink,#111113)]'
                    }`}
                  >
                    VOL.0{b.number}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto">
            <RegisterSwitcher
              bookId={bookId}
              currentLang={lang}
              chapterSlug={chapterSlug}
              theme={theme}
              onThemeChange={handleThemeChange}
            />
            <Link
              href={isLoggedIn ? '/dashboard' : '/auth/login'}
              className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--reader-border,#E4E2DD)] bg-[var(--reader-surface,#FFFFFF)] font-mono text-xs font-semibold"
            >
              <User className="w-3.5 h-3.5 text-[#EA580C]" />
              <span>{isLoggedIn ? 'Library' : 'Login'}</span>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="flex-1 max-w-7xl mx-auto w-full flex flex-col lg:flex-row">
        {/* Left Sidebar: Architectural Chapter Index */}
        <aside className="w-full lg:w-80 border-b lg:border-b-0 lg:border-r border-[var(--reader-border,#E4E2DD)] p-4 lg:p-5 bg-[var(--reader-surface,#FFFFFF)] shrink-0 lg:max-h-[calc(100vh-57px)] lg:sticky lg:top-[57px] lg:overflow-y-auto">
          <div className="mb-4 pb-3 border-b border-[var(--reader-border,#E4E2DD)]">
            <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#EA580C] block mb-0.5">
              {catalogItem?.volumeCode} // TABLE OF CONTENTS
            </span>
            <h2 className="font-serif font-bold text-base leading-snug mb-2">
              {catalogItem?.titles[lang]}
            </h2>
            <div className="flex items-center justify-between text-[11px] font-mono text-[var(--reader-muted,#52525B)] mb-1.5">
              <span>
                CH {chapterIndex + 1} / {chapters.length}
              </span>
              <span className="font-bold">{progressPct}%</span>
            </div>
            <div className="w-full h-1 bg-[var(--reader-subtle,#F3F0E8)] rounded-full overflow-hidden">
              <div className="h-full bg-[#EA580C]" style={{ width: `${progressPct}%` }} />
            </div>
          </div>

          <nav className="flex flex-col gap-1 max-h-56 lg:max-h-none overflow-y-auto">
            {chapters.map((ch) => {
              const isActive = ch.slug === chapterSlug;
              const unlocked = ch.isFreeSample || hasAccess;
              return (
                <Link
                  key={ch.slug}
                  href={`/read/${bookId}/${lang}/${ch.slug}`}
                  className={`px-3 py-2 rounded-lg text-xs font-sans transition-all flex items-start justify-between gap-2 ${
                    isActive
                      ? 'bg-[#111113] text-white font-semibold'
                      : 'hover:bg-[var(--reader-subtle,#F3F0E8)] text-[var(--reader-muted,#52525B)]'
                  }`}
                >
                  <span className="line-clamp-2 leading-snug">
                    <span className="font-mono text-[10px] opacity-70 mr-1.5">
                      {ch.index < 10 ? `0${ch.index}` : ch.index}
                    </span>
                    {ch.title
                      .replace(/^Bab\s+\d+:\s*/i, '')
                      .replace(/^Chapter\s+\d+:\s*/i, '')}
                  </span>
                  {ch.isFreeSample ? (
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4] shrink-0">
                      Free
                    </span>
                  ) : unlocked ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0F766E] shrink-0 mt-0.5" />
                  ) : (
                    <Lock className="w-3.5 h-3.5 opacity-40 shrink-0 mt-0.5" />
                  )}
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Reading Pane */}
        <main className="flex-1 p-4 sm:p-8 lg:p-12 max-w-4xl mx-auto w-full">
          <article className="rounded-2xl border border-[var(--reader-border,#E4E2DD)] bg-[var(--reader-surface,#FFFFFF)] p-6 sm:p-12 mb-8 shadow-xs">
            <header className="mb-8 pb-6 border-b border-[var(--reader-border,#E4E2DD)]">
              <div className="flex flex-wrap items-center gap-2 mb-3 font-mono text-[11px] uppercase tracking-wider">
                <span className="px-2 py-0.5 rounded bg-[var(--reader-subtle,#F3F0E8)] font-bold">
                  {catalogItem?.volumeCode} • {chapterSlug.toUpperCase()}
                </span>
                {isFreeSample ? (
                  <span className="px-2 py-0.5 rounded bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4] font-bold">
                    {isEn ? 'FREE SAMPLE EDITION' : 'BAB SAMPEL GRATIS'}
                  </span>
                ) : hasAccess ? (
                  <span className="px-2 py-0.5 rounded bg-[#F0FDFA] text-[#0F766E] border border-[#99F6E4] font-bold">
                    {isEn ? 'FULL LICENSE ACTIVE' : 'AKSES PENUH TERBUKA'}
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-[#FFF7ED] text-[#EA580C] border border-[#FED7AA] font-bold">
                    {isEn ? 'LOCKED PLAYBOOK CHAPTER' : 'BAB PLAYBOOK BERBAYAR'}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight leading-tight">
                {chapterTitle}
              </h1>
            </header>

            <ChapterBlueprintCard
              bookId={bookId}
              chapterSlug={chapterSlug}
              lang={lang}
            />

            {hasAccess ? (
              <MarkdownRenderer
                content={fullContent}
                storagePrefix={`checklist:${bookId}:${chapterSlug}`}
              />
            ) : (
              <div>
                <div className="relative mb-6">
                  <MarkdownRenderer content={previewContent} />
                </div>
                <PaywallCard
                  bookId={bookId}
                  lang={lang}
                  chapterTitle={chapterTitle}
                />
              </div>
            )}
          </article>

          {/* Prev / Next Footer Navigation */}
          <nav className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-16">
            {prevChapter ? (
              <Link href={`/read/${bookId}/${lang}/${prevChapter.slug}`}>
                <TacticalButton variant="secondary" size="md">
                  <ArrowLeft className="w-4 h-4" />
                  <span>
                    {prevChapter.index === 0
                      ? isEn
                        ? 'Introduction'
                        : 'Pendahuluan'
                      : `CH 0${prevChapter.index}`}
                  </span>
                </TacticalButton>
              </Link>
            ) : (
              <div />
            )}

            {nextChapter ? (
              <Link href={`/read/${bookId}/${lang}/${nextChapter.slug}`}>
                <TacticalButton variant="primary" size="md">
                  <span>
                    {nextChapter.index === 14
                      ? isEn
                        ? 'Appendix & Citations'
                        : 'Lampiran & Riset'
                      : `Next: CH ${nextChapter.index < 10 ? `0${nextChapter.index}` : nextChapter.index}`}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </TacticalButton>
              </Link>
            ) : (
              <div />
            )}
          </nav>
        </main>
      </div>
    </div>
  );
}
