import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import {
  getSingleChapter,
  BOOK_CATALOG,
  extractSafePreview,
} from '@/lib/books';
import { BookId, BookLang } from '@/types/books';
import { NavbarDoodle } from '@/components/doodle/NavbarDoodle';
import { LanguageMenu } from '@/components/reader/LanguageMenu';
import { InteractiveReaderClient } from '@/components/reader/InteractiveReaderClient';
import { createClient } from '@/utils/supabase/server';
import { syncAndGetUserEntitlements } from '@/lib/entitlements';
import { Lock, CheckCircle2 } from 'lucide-react';

interface PageProps {
  params: {
    bookId: string;
    lang: string;
    chapterSlug: string;
  };
}

export default async function ReaderPage({ params }: PageProps) {
  const bookId = params.bookId as BookId;
  const lang = params.lang as BookLang;
  const { chapterSlug } = params;

  const validBooks: BookId[] = ['book-1', 'book-2', 'book-3'];
  const validLangs: BookLang[] = ['id-kasual', 'id-standar', 'en'];

  if (!validBooks.includes(bookId) || !validLangs.includes(lang)) {
    notFound();
  }

  const data = getSingleChapter(bookId, lang, chapterSlug);
  if (!data) {
    notFound();
  }

  const { chapter: currentChapter, allChapters } = data;
  const bookMeta = BOOK_CATALOG.find((b) => b.id === bookId)!;

  let hasEntitlement = false;
  let userEmail: string | null = null;

  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      userEmail = user.email ?? null;
      const unlockedBooks = await syncAndGetUserEntitlements(
        user.id,
        user.email
      );
      if (unlockedBooks.includes(bookId)) {
        hasEntitlement = true;
      }
    }
  } catch {
    // Fallback to free sample mode if Supabase env is not yet configured
  }

  const hasAccess = currentChapter.isFreeSample || hasEntitlement;
  const displayContent = hasAccess
    ? currentChapter.content
    : extractSafePreview(currentChapter.content);

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarDoodle
        userEmail={userEmail}
        lang={lang}
        langMenu={
          <LanguageMenu
            bookId={bookId}
            currentLang={lang}
            chapterSlug={chapterSlug}
          />
        }
      />

      <div className="mx-auto w-full max-w-[1600px] flex-1 px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-7 items-start">
        {/* Left Sticky Sidebar: Volume Switcher & Chapter TOC */}
        <aside className="hidden lg:block w-72 shrink-0 sticky top-20">
          <div className="doodle-panel-flat p-4 max-h-[83vh] overflow-y-auto">
            {/* Quick Volume Pills */}
            <div className="mb-3 grid grid-cols-3 gap-1 rounded-xl border border-[#DFD9CE] bg-[#FAF7F2] p-1">
              {BOOK_CATALOG.map((b) => {
                const active = b.id === bookId;
                return (
                  <Link
                    key={b.id}
                    href={`/read/${b.id}/${lang}/ch-0`}
                    className={`rounded-lg py-1 text-center font-mono text-[10px] font-extrabold transition-colors ${
                      active
                        ? 'bg-[#FFE66D] border border-amber-300 text-[#18181B] shadow-2xs'
                        : 'text-[#52525B] hover:text-[#18181B]'
                    }`}
                  >
                    VOL.0{b.number}
                  </Link>
                );
              })}
            </div>

            <div className="mb-3 pb-2.5 border-b border-[#DFD9CE]">
              <h2 className="font-extrabold text-base text-[#18181B] leading-snug">
                {bookMeta.titles[lang]}
              </h2>
              <p className="text-[11px] text-[#52525B] mt-0.5 line-clamp-1">
                {bookMeta.subtitles[lang]}
              </p>
            </div>

            <nav className="space-y-1">
              {allChapters.map((ch) => {
                const isCurrent = ch.slug === currentChapter.slug;
                const unlocked = ch.isFreeSample || hasEntitlement;
                return (
                  <Link
                    key={ch.slug}
                    href={`/read/${bookId}/${lang}/${ch.slug}`}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-colors border ${
                      isCurrent
                        ? 'bg-[#FEF9C3] border-amber-300 text-[#18181B] shadow-xs'
                        : 'border-transparent hover:bg-[#FAF7F2] text-[#52525B]'
                    }`}
                  >
                    <span className="line-clamp-1">{ch.title}</span>
                    {unlocked ? (
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#0D9488] shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-[#A1A1AA] shrink-0" />
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* Center + Right Aligned Reader Workspace */}
        <div className="flex-1 min-w-0 w-full">
          <InteractiveReaderClient
            bookId={bookId}
            bookTitle={bookMeta.titles[lang]}
            lang={lang}
            currentChapter={currentChapter}
            displayContent={displayContent}
            hasAccess={hasAccess}
            allChapters={allChapters}
            userEmail={userEmail}
          />
        </div>
      </div>
    </div>
  );
}
