import { headers } from 'next/headers';
import { notFound } from 'next/navigation';
import { getBookChapters } from '@/lib/books';
import { BOOK_CATALOG, BookId, BookLang } from '@/types/books';
import { MarkdownRenderer } from '@/components/reader/MarkdownRenderer';
import { ChapterIllustration } from '@/components/doodle/ChapterIllustration';

export const dynamic = 'force-dynamic';

const VALID_BOOKS: BookId[] = ['book-1', 'book-2', 'book-3'];
const VALID_LANGS: BookLang[] = ['id-kasual', 'id-standar', 'en'];

interface PrintPageProps {
  params: { bookId: string; lang: string };
}

// Internal full-book print view used only by scripts/generate-pdfs.ts.
// Guarded by the PDF_PRINT_KEY header so it never serves the public.
export default function PrintBookPage({ params }: PrintPageProps) {
  // Primary key: PDF_PRINT_KEY. Until that env var is provisioned, the
  // Supabase service role key (already a server-only production secret)
  // is accepted as a fallback so PDF generation is never blocked.
  const expectedKey = process.env.PDF_PRINT_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;
  const givenKey = headers().get('x-print-key');
  if (!expectedKey || !givenKey || givenKey !== expectedKey) {
    notFound();
  }

  const bookId = params.bookId as BookId;
  const lang = params.lang as BookLang;
  if (!VALID_BOOKS.includes(bookId) || !VALID_LANGS.includes(lang)) {
    notFound();
  }

  const book = BOOK_CATALOG.find((b) => b.id === bookId);
  const chapters = getBookChapters(bookId, lang);
  if (!book || chapters.length === 0) {
    notFound();
  }

  return (
    <main className="print-book mx-auto max-w-[148mm] bg-white px-2 py-4 text-[#18181B]">
      <style>{`
        @page { size: A5; margin: 13mm 12mm 15mm 12mm; }
        @media print {
          .fixed { display: none !important; }
          body { background: #ffffff !important; }
          .print-chapter { break-before: page; }
          .print-chapter:first-of-type { break-before: auto; }
        }
      `}</style>

      <header className="print-chapter mb-10 text-center">
        <p className="text-xs uppercase tracking-widest">aiossan.com</p>
        <h1 className="mt-4 text-3xl font-bold leading-snug">{book.titles[lang]}</h1>
        <p className="mt-3 text-base">{book.subtitles[lang]}</p>
      </header>

      {chapters.map((chapter) => (
        <section key={chapter.slug} className="print-chapter">
          <ChapterIllustration bookId={bookId} chapterSlug={chapter.slug} lang={lang} />
          <MarkdownRenderer
            content={chapter.content}
            bookId={bookId}
            chapterSlug={chapter.slug}
            lang={lang}
          />
        </section>
      ))}
    </main>
  );
}
