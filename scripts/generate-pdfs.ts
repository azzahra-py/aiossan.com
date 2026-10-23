/**
 * Generate the 9 master PDFs (3 books x 3 language editions) by printing the
 * internal /print/[bookId]/[lang] pages with headless Chrome.
 *
 * Required env:
 *   PRINT_KEY    value sent as the x-print-key header (must match the server)
 *   BASE_URL     where the Next.js server runs (default http://localhost:3100)
 *   CHROME_PATH  Chrome/Chromium executable (default /usr/bin/google-chrome)
 *   OUT_DIR      output root (default ./pdf-out) -> {book}/{lang}.pdf files,
 *                mirroring the R2 key layout pdf/{book}/{lang}.pdf
 *
 * Run: npx tsx scripts/generate-pdfs.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer-core';

const BOOKS = ['book-1', 'book-2', 'book-3'] as const;
const LANGS = ['id-kasual', 'id-standar', 'en'] as const;

async function main() {
  const baseUrl = process.env.BASE_URL || 'http://localhost:3100';
  const printKey = process.env.PRINT_KEY || '';
  const chromePath = process.env.CHROME_PATH || '/usr/bin/google-chrome';
  const outDir = process.env.OUT_DIR || path.join(process.cwd(), 'pdf-out');

  if (!printKey) {
    throw new Error('PRINT_KEY env is required.');
  }

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-dev-shm-usage'],
  });

  try {
    for (const book of BOOKS) {
      for (const lang of LANGS) {
        const url = `${baseUrl}/print/${book}/${lang}`;
        const target = path.join(outDir, book, `${lang}.pdf`);
        fs.mkdirSync(path.dirname(target), { recursive: true });

        const page = await browser.newPage();
        await page.setExtraHTTPHeaders({ 'x-print-key': printKey });
        const response = await page.goto(url, {
          waitUntil: 'networkidle2',
          timeout: 240_000,
        });
        if (!response || response.status() !== 200) {
          throw new Error(`Print page ${url} answered ${response?.status()}`);
        }
        // Give client-side Mermaid diagrams time to finish drawing.
        await new Promise((resolve) => setTimeout(resolve, 4_000));
        await page.pdf({ path: target, preferCSSPageSize: true, printBackground: true });
        await page.close();

        const sizeKb = Math.round(fs.statSync(target).size / 1024);
        console.log(`OK ${book}/${lang}.pdf (${sizeKb} KB)`);
      }
    }
  } finally {
    await browser.close();
  }

  console.log('All 9 PDFs generated in', outDir);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
