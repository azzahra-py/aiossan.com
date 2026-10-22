import React from 'react';
import { notFound } from 'next/navigation';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { getBookChapters, extractSafePreview } from '@/lib/books';
import { syncAndGetUserEntitlements } from '@/lib/entitlements';
import { BookId, BookLang } from '@/types/books';
import { ReaderClientShell } from '@/components/reader/ReaderClientShell';

interface ReadPageProps {
  params: {
    bookId: string;
    lang: string;
    chapterSlug: string;
  };
}

export const dynamic = 'force-dynamic';

export default async function ReadPage({ params }: ReadPageProps) {
  const { bookId, lang, chapterSlug } = params;

  const validBooks: BookId[] = ['book-1', 'book-2', 'book-3'];
  const validLangs: BookLang[] = ['id-kasual', 'id-standar', 'en'];

  if (!validBooks.includes(bookId as BookId) || !validLangs.includes(lang as BookLang)) {
    notFound();
  }

  const typedBookId = bookId as BookId;
  const typedLang = lang as BookLang;

  const chapters = getBookChapters(typedBookId, typedLang);
  const currentChapter = chapters.find((c) => c.slug === chapterSlug);

  if (!currentChapter) {
    notFound();
  }

  let hasAccess = currentChapter.isFreeSample;
  let isLoggedIn = false;

  try {
    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      isLoggedIn = true;
      if (!hasAccess) {
        const unlocked = await syncAndGetUserEntitlements(user.id, user.email);
        if (unlocked.includes(typedBookId)) {
          hasAccess = true;
        }
      }
    }
  } catch {
    // Guest reader
  }

  const previewContent = !hasAccess ? extractSafePreview(currentChapter.content) : '';
  const chapterMetaList = chapters.map(({ index, slug, title, isFreeSample }) => ({
    index,
    slug,
    title,
    isFreeSample,
  }));

  return (
    <ReaderClientShell
      bookId={typedBookId}
      lang={typedLang}
      chapterSlug={currentChapter.slug}
      chapterTitle={currentChapter.title}
      chapterIndex={currentChapter.index}
      isFreeSample={currentChapter.isFreeSample}
      hasAccess={hasAccess}
      isLoggedIn={isLoggedIn}
      fullContent={hasAccess ? currentChapter.content : ''}
      previewContent={previewContent}
      chapters={chapterMetaList}
    />
  );
}
