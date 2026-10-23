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
import { PaywallModal } from '@/components/reader/PaywallModal';
import { ChapterIllustration } from '@/components/doodle/ChapterIllustration';
import { InteractiveReaderClient } from '@/components/reader/InteractiveReaderClient';
import { createClient } from '@/utils/supabase/server';
import { syncAndGetUserEntitlements } from '@/lib/entitlements';
import { Lock, CheckCircle2, ArrowLeft, ArrowRight } from 'lucide-react';

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

  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
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

  const prevChapter =
    currentChapter.index > 0 ? allChapters[currentChapter.index - 1] : null;
  const nextChapter =
    currentChapter.index < allChapters.length - 1
      ? allChapters[currentChapter.index + 1]
      : null;

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarDoodle
        lang={lang}
        langMenu={
          <LanguageMenu
            bookId={bookId}
            currentLang={lang}
            chapterSlug={chapterSlug}
          />
        }
      />

      <div className="mx-auto w-full max-w-[1440px] flex-1 px-5 lg:px-10 py-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="hidden lg:block lg:col-span-3 order-2">
          <div className="doodle-box p-4 sticky top-24 max-h-[82vh] overflow-y-auto">
            <div className="mb-3 pb-2 border-b border-[#E7E2D9]">
              <span className="font-mono text-xs font-extrabold uppercase px-2 py-0.5 bg-[#FFE66D] border border-[#18181B] rounded">
                Vol. 0{bookMeta.number}
              </span>
              <h2 className="font-extrabold text-lg mt-1 text-[#18181B]">
                {bookMeta.titles[lang]}
              </h2>
            </div>

            <nav className="space-y-1.5">
              {allChapters.map((ch) => {
                const isCurrent = ch.slug === currentChapter.slug;
                const unlocked = ch.isFreeSample || hasEntitlement;
                return (
                  <Link
                    key={ch.slug}
                    href={`/read/${bookId}/${lang}/${ch.slug}`}
                    className={`flex items-center justify-between gap-2 px-3 py-2 rounded-xl text-xs font-bold transition-colors border ${
                      isCurrent
                        ? 'bg-[#FEF9C3] border-transparent text-[#18181B] shadow-[inset_4px_0_0_0_#2563EB]'
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

        <main className="lg:col-span-9 order-1">
          <div className="mb-4 flex items-center gap-2">
            <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-md border border-[#18181B] bg-white">
              {lang === 'en'
                ? `Chapter ${currentChapter.index + 1} of ${allChapters.length}`
                : `Bab ${currentChapter.index + 1} dari ${allChapters.length}`}
            </span>
            {currentChapter.isFreeSample && (
              <span className="font-hand text-sm px-2.5 py-0.5 rounded-md border border-[#18181B] bg-[#CCFBF1] text-[#065F46] font-bold">
                {lang === 'en' ? '★ Free Reading Sample' : '★ Sampel Baca Gratis'}
              </span>
            )}
          </div>

          <h1 className="font-extrabold text-2xl sm:text-4xl text-[#18181B] mb-4 leading-tight">
            {currentChapter.title}
          </h1>

          <ChapterIllustration
            bookId={bookId}
            chapterIndex={currentChapter.index}
            lang={lang}
          />

          <InteractiveReaderClient
            bookId={bookId}
            bookTitle={bookMeta.titles[lang]}
            lang={lang}
            currentChapter={currentChapter}
            displayContent={displayContent}
            hasAccess={hasAccess}
            allChapters={allChapters}
          />

          {!hasAccess && (
            <PaywallModal
              bookId={bookId}
              lang={lang}
              chapterTitle={currentChapter.title}
            />
          )}

          {hasAccess && (
            <div className="no-print mt-8 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 p-4 rounded-2xl border border-[#E7E2D9] bg-white shadow-sm">
              {prevChapter ? (
                <Link
                  href={`/read/${bookId}/${lang}/${prevChapter.slug}`}
                  className="doodle-button bg-white px-4 py-2.5 text-xs sm:text-sm inline-flex items-center gap-2 justify-center"
                >
                  <ArrowLeft className="w-4 h-4 shrink-0" />
                  <span className="line-clamp-1">{lang === 'en' ? 'Previous: ' : 'Sebelumnya: '}{prevChapter.title}</span>
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
                    {lang === 'en' ? 'Next: ' : 'Lanjut: '}{nextChapter.title}
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
        </main>
      </div>
    </div>
  );
}
