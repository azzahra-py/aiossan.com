import fs from 'fs';
import path from 'path';
import { CHAPTER_ILLUSTRATIONS, SchematicMotif } from '../src/lib/illustrations-editorial';
import { BOOK_CATALOG, BookLang } from '../src/types/books';

const PUBLIC_DIR = path.join(process.cwd(), 'public');

function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function renderMotifVector(motif: SchematicMotif, accent: string): string {
  switch (motif) {
    case 'compass':
    case 'lighthouse':
      return `
        <circle cx="400" cy="195" r="78" fill="#FFFFFF" stroke="#111113" stroke-width="2.5"/>
        <circle cx="400" cy="195" r="64" fill="none" stroke="${accent}" stroke-width="1.5" stroke-dasharray="4 4"/>
        <polygon points="400,125 418,195 400,182 382,195" fill="${accent}" stroke="#111113" stroke-width="2"/>
        <polygon points="400,265 418,195 400,208 382,195" fill="#E4E2DD" stroke="#111113" stroke-width="2"/>
        <circle cx="400" cy="195" r="7" fill="#111113"/>
      `;
    case 'gears':
    case 'calibration':
    case 'gauge':
      return `
        <circle cx="355" cy="195" r="56" fill="#FFFFFF" stroke="#111113" stroke-width="2.5"/>
        <circle cx="355" cy="195" r="24" fill="${accent}" fill-opacity="0.18" stroke="${accent}" stroke-width="2"/>
        <circle cx="455" cy="195" r="42" fill="#FFFFFF" stroke="#111113" stroke-width="2.5"/>
        <circle cx="455" cy="195" r="16" fill="#111113"/>
        <line x1="280" y1="195" x2="520" y2="195" stroke="#111113" stroke-width="1.5" stroke-dasharray="5 5"/>
      `;
    case 'matrix':
    case 'calendar':
    case 'cadence':
      return `
        <rect x="290" y="125" width="220" height="140" rx="8" fill="#FFFFFF" stroke="#111113" stroke-width="2.5"/>
        <line x1="290" y1="170" x2="510" y2="170" stroke="#111113" stroke-width="1.5"/>
        <line x1="290" y1="215" x2="510" y2="215" stroke="#111113" stroke-width="1.5"/>
        <line x1="365" y1="125" x2="365" y2="265" stroke="#111113" stroke-width="1.5"/>
        <line x1="435" y1="125" x2="435" y2="265" stroke="#111113" stroke-width="1.5"/>
        <rect x="302" y="135" width="50" height="24" rx="4" fill="${accent}"/>
        <rect x="377" y="180" width="46" height="24" rx="4" fill="${accent}" fill-opacity="0.25" stroke="${accent}" stroke-width="1.5"/>
        <rect x="447" y="225" width="50" height="24" rx="4" fill="#111113"/>
      `;
    case 'bridge':
    case 'relay':
    case 'gateway':
      return `
        <rect x="260" y="155" width="70" height="95" rx="6" fill="#FFFFFF" stroke="#111113" stroke-width="2.5"/>
        <rect x="470" y="155" width="70" height="95" rx="6" fill="#FFFFFF" stroke="#111113" stroke-width="2.5"/>
        <path d="M 330 185 Q 400 130 470 185" fill="none" stroke="${accent}" stroke-width="4"/>
        <line x1="330" y1="205" x2="470" y2="205" stroke="#111113" stroke-width="3"/>
        <circle cx="400" cy="205" r="14" fill="${accent}" stroke="#111113" stroke-width="2"/>
      `;
    default:
      return `
        <rect x="285" y="125" width="230" height="140" rx="12" fill="#FFFFFF" stroke="#111113" stroke-width="2.5"/>
        <circle cx="400" cy="195" r="46" fill="${accent}" fill-opacity="0.14" stroke="${accent}" stroke-width="2.5"/>
        <circle cx="400" cy="195" r="18" fill="${accent}" stroke="#111113" stroke-width="2"/>
        <line x1="250" y1="195" x2="335" y2="195" stroke="#111113" stroke-width="2"/>
        <line x1="465" y1="195" x2="550" y2="195" stroke="#111113" stroke-width="2"/>
      `;
  }
}

function generateChapterSvg(meta: (typeof CHAPTER_ILLUSTRATIONS)[string]): string {
  const accent =
    meta.bookId === 'book-1'
      ? '#1D4ED8'
      : meta.bookId === 'book-2'
      ? '#EA580C'
      : '#0F766E';
  const volLabel = meta.bookId.toUpperCase().replace('-', ' ');

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 380" width="100%" height="100%">
  <defs>
    <pattern id="swiss-grid-${meta.bookId}-${meta.slug}" width="24" height="24" patternUnits="userSpaceOnUse">
      <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#E4E2DD" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Canvas Background -->
  <rect width="800" height="380" rx="16" fill="#FBF9F5" stroke="#111113" stroke-width="2"/>
  <rect x="16" y="48" width="768" height="276" fill="url(#swiss-grid-${meta.bookId}-${meta.slug})" stroke="#E4E2DD" stroke-width="1"/>

  <!-- Top Swiss Editorial Header Bar -->
  <line x1="0" y1="48" x2="800" y2="48" stroke="#111113" stroke-width="1.5"/>
  <rect x="18" y="12" width="110" height="24" rx="4" fill="${accent}"/>
  <text x="73" y="28" font-family="monospace" font-size="11" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${escapeXml(meta.figCode)}</text>
  <text x="144" y="28" font-family="monospace" font-size="11" font-weight="bold" fill="#52525B">${escapeXml(volLabel)} // ARCHITECTURAL SCHEMATIC</text>
  <text x="780" y="28" font-family="monospace" font-size="11" fill="#71717A" text-anchor="end">AIOSSAN PRESS</text>

  <!-- Left & Right Technical Reference Annotations -->
  <g opacity="0.88">
    <rect x="44" y="140" width="160" height="96" rx="8" fill="#FFFFFF" stroke="#111113" stroke-width="1.5"/>
    <rect x="56" y="154" width="48" height="8" rx="2" fill="${accent}"/>
    <rect x="56" y="172" width="120" height="6" rx="2" fill="#E4E2DD"/>
    <rect x="56" y="186" width="96" height="6" rx="2" fill="#E4E2DD"/>
    <rect x="56" y="208" width="72" height="12" rx="3" fill="#F3F0E8"/>
    <line x1="204" y1="190" x2="285" y2="190" stroke="#111113" stroke-width="1.5" stroke-dasharray="4 4"/>
  </g>

  <g opacity="0.88">
    <rect x="596" y="140" width="160" height="96" rx="8" fill="#FFFFFF" stroke="#111113" stroke-width="1.5"/>
    <rect x="608" y="154" width="56" height="8" rx="2" fill="#111113"/>
    <rect x="608" y="172" width="124" height="6" rx="2" fill="#E4E2DD"/>
    <rect x="608" y="186" width="104" height="6" rx="2" fill="#E4E2DD"/>
    <rect x="608" y="208" width="84" height="12" rx="3" fill="${accent}" fill-opacity="0.2"/>
    <line x1="515" y1="190" x2="596" y2="190" stroke="#111113" stroke-width="1.5" stroke-dasharray="4 4"/>
  </g>

  <!-- Center Schematic Vector Motif -->
  ${renderMotifVector(meta.motif, accent)}

  <!-- Bottom Caption Strip -->
  <line x1="0" y1="324" x2="800" y2="324" stroke="#111113" stroke-width="1.5"/>
  <text x="400" y="356" font-family="Georgia, serif" font-style="italic" font-size="14" fill="#111113" text-anchor="middle">${escapeXml(meta.captionId.slice(0, 95))}${meta.captionId.length > 95 ? '...' : ''}</text>
</svg>`;
}

function generateBookCoverSvg(bookId: 'book-1' | 'book-2' | 'book-3', lang: BookLang): string {
  const book = BOOK_CATALOG.find((b) => b.id === bookId)!;
  const title = book.titles[lang];
  const subtitle = book.subtitles[lang];
  const accent = book.accentHex;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 680" width="100%" height="100%">
  <rect width="480" height="680" rx="12" fill="#FBF9F5" stroke="#111113" stroke-width="4"/>
  <rect x="0" y="0" width="36" height="680" fill="${accent}" stroke="#111113" stroke-width="2"/>
  <line x1="36" y1="90" x2="480" y2="90" stroke="#111113" stroke-width="1.5"/>
  <text x="64" y="56" font-family="monospace" font-size="16" font-weight="bold" fill="${accent}">${escapeXml(book.volumeCode)} // AIOSSAN PRESS</text>
  <text x="64" y="160" font-family="Georgia, serif" font-size="34" font-weight="bold" fill="#111113">${escapeXml(title)}</text>
  <text x="64" y="205" font-family="sans-serif" font-size="15" fill="#52525B">${escapeXml(subtitle.slice(0, 52))}</text>
  <rect x="64" y="260" width="360" height="260" rx="12" fill="#FFFFFF" stroke="#111113" stroke-width="2"/>
  <circle cx="244" cy="390" r="76" fill="${accent}" fill-opacity="0.15" stroke="${accent}" stroke-width="3"/>
  <circle cx="244" cy="390" r="28" fill="${accent}"/>
  <line x1="36" y1="580" x2="480" y2="580" stroke="#111113" stroke-width="1.5"/>
  <text x="64" y="630" font-family="monospace" font-size="13" font-weight="bold" fill="#111113">15 CHAPTERS • INTERACTIVE WEB + A5 PDF</text>
</svg>`;
}

function main() {
  let illCount = 0;
  for (const key of Object.keys(CHAPTER_ILLUSTRATIONS)) {
    const meta = CHAPTER_ILLUSTRATIONS[key];
    const targetPath = path.join(PUBLIC_DIR, meta.svgPath);
    fs.mkdirSync(path.dirname(targetPath), { recursive: true });
    fs.writeFileSync(targetPath, generateChapterSvg(meta), 'utf-8');
    illCount++;
  }

  let covCount = 0;
  const langs: BookLang[] = ['id-kasual', 'id-standar', 'en'];
  for (const book of BOOK_CATALOG) {
    for (const lang of langs) {
      const covPath = path.join(PUBLIC_DIR, 'covers', `${book.id}-${lang}.svg`);
      fs.mkdirSync(path.dirname(covPath), { recursive: true });
      fs.writeFileSync(covPath, generateBookCoverSvg(book.id, lang), 'utf-8');
      covCount++;
    }
  }

  console.log(`[generate-illustrations] Generated ${illCount} chapter SVGs and ${covCount} cover SVGs.`);
}

main();
