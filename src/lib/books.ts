import fs from 'fs';
import path from 'path';
import { BookId, BookLang, ChapterData } from '@/types/books';

const LANG_DIR_MAP: Record<BookLang, string> = {
  'id-kasual': path.join('books', 'id', 'casual'),
  'id-standar': path.join('books', 'id', 'standar'),
  en: path.join('books', 'en'),
};

export { BOOK_CATALOG } from '@/types/books';

export function extractSafePreview(content: string): string {
  const withoutCodeAndDetails = content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/<details[\s\S]*?<\/details>/gi, '');

  const paragraphs = withoutCodeAndDetails
    .split(/\r?\n\r?\n/)
    .map((p) => p.trim())
    .filter(
      (p) =>
        p.length > 0 &&
        !p.startsWith('|') &&
        !p.startsWith('[^') &&
        !p.startsWith('---')
    );

  return paragraphs.slice(0, 3).join('\n\n');
}

export function getBookChapters(bookId: BookId, lang: BookLang): ChapterData[] {
  const filePath = path.join(process.cwd(), LANG_DIR_MAP[lang], `${bookId}.md`);
  const raw = fs.readFileSync(filePath, 'utf-8');

  // 1. Extract all footnote definitions [^n]: ... from full manuscript
  const footnoteDefs: Record<string, string> = {};
  const fnDefRegex = /^\[\^([^\]]+)\]:\s*(.+)$/gm;
  let fnMatch: RegExpExecArray | null;
  while ((fnMatch = fnDefRegex.exec(raw)) !== null) {
    footnoteDefs[fnMatch[1]] = fnMatch[0];
  }

  // 2. Split manuscript by "## "
  const sections = raw.split(/\r?\n(?=## )/g);
  const chapters: ChapterData[] = [];

  for (const sec of sections) {
    const trimmed = sec.trim();
    if (!trimmed.startsWith('## ')) continue;
    const firstNewline = trimmed.indexOf('\n');
    const headingLine =
      firstNewline !== -1 ? trimmed.slice(3, firstNewline).trim() : trimmed.slice(3).trim();
    const body = firstNewline !== -1 ? trimmed.slice(firstNewline + 1).trim() : '';

    const lowerHeading = headingLine.toLowerCase();
    if (lowerHeading.includes('daftar isi') || lowerHeading.includes('table of contents')) {
      continue;
    }

    if (
      !lowerHeading.startsWith('lampiran') &&
      !lowerHeading.startsWith('appendix') &&
      (lowerHeading.includes('rujukan riset') ||
        lowerHeading.includes('primary research citations'))
    ) {
      if (chapters.length > 0) {
        chapters[chapters.length - 1].content += `\n\n## ${headingLine}\n\n${body}`;
      }
      continue;
    }

    // 3. Inject referenced footnote definitions into this chapter
    const usedRefs = new Set<string>();
    const refRegex = /\[\^([^\]]+)\](?!:)/g;
    let refMatch: RegExpExecArray | null;
    while ((refMatch = refRegex.exec(body)) !== null) {
      usedRefs.add(refMatch[1]);
    }

    let enrichedBody = body;
    const missingDefs: string[] = [];
    usedRefs.forEach((key) => {
      if (footnoteDefs[key] && !body.includes(`[^${key}]:`)) {
        missingDefs.push(footnoteDefs[key]);
      }
    });

    if (missingDefs.length > 0) {
      enrichedBody += '\n\n' + missingDefs.join('\n');
    }

    const idx = chapters.length;
    chapters.push({
      index: idx,
      slug: `ch-${idx}`,
      title: headingLine.replace(/\*/g, ''),
      isFreeSample: idx <= 1,
      content: enrichedBody,
    });
  }

  return chapters;
}

export function getChapter(
  bookId: BookId,
  lang: BookLang,
  slug: string
): ChapterData | undefined {
  const chapters = getBookChapters(bookId, lang);
  return chapters.find((ch) => ch.slug === slug);
}

// Design-B reader pages call this getSingleChapter and expect the chapter
// bundled with the full chapter list (content stripped).
export function getSingleChapter(
  bookId: BookId,
  lang: BookLang,
  chapterSlug: string
): {
  chapter: ChapterData;
  allChapters: Omit<ChapterData, 'content'>[];
} | null {
  const chapters = getBookChapters(bookId, lang);
  const found = chapters.find((c) => c.slug === chapterSlug);
  if (!found) return null;
  return {
    chapter: found,
    allChapters: chapters.map(({ content: _, ...rest }) => rest),
  };
}
