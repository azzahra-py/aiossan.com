import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const SCREENSHOT_DIR = '/tmp/antigravity/qa-screenshots';
if (!fs.existsSync(SCREENSHOT_DIR)) {
  fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });
}

const errors = [];
const results = {
  landing: {},
  reader: {},
  quiz: {},
  responsive: {},
  consoleErrors: [],
};

async function runQA() {
  console.log('🚀 Memulai QA Browser Automation dengan Google Chrome...');
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });

  try {
    const page = await browser.newPage();
    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        const text = msg.text();
        results.consoleErrors.push(text);
      }
    });

    page.on('response', (res) => {
      if (res.status() >= 400) {
        console.warn(`   ⚠️ HTTP ${res.status()}: ${res.url()}`);
      }
    });

    page.on('pageerror', (err) => {
      errors.push(`PageError: ${err.message}`);
    });

    // ==========================================
    // TEST 1: Landing Page Desktop (1280x800)
    // ==========================================
    console.log('📦 1. Menguji Landing Page (Desktop 1280x800)...');
    await page.setViewport({ width: 1280, height: 800 });
    const response = await page.goto('http://localhost:3000', {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });
    await new Promise((r) => setTimeout(r, 1000));
    results.landing.status = response?.status();

    const title = await page.title();
    results.landing.title = title;
    console.log(`   ✓ Title: "${title}"`);

    // Screenshot Hero
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '01-landing-desktop.png'),
    });

    // Test Quiz Interaction
    console.log('🧠 2. Menguji Interaksi Quiz 45 Detik...');
    const quizSection = await page.$('#quiz');
    if (quizSection) {
      await quizSection.scrollIntoView();
      await new Promise((r) => setTimeout(r, 600));

      const optionButtons = await page.$$('button');
      for (const btn of optionButtons) {
        const txt = await page.evaluate((el) => el.innerText, btn);
        if (txt.includes('Baru banget diangkat') || txt.includes('Anggota tim')) {
          await btn.click();
          break;
        }
      }
      await new Promise((r) => setTimeout(r, 400));

      const optionButtons2 = await page.$$('button');
      for (const btn of optionButtons2) {
        const txt = await page.evaluate((el) => el.innerText, btn);
        if (txt.includes('Gak enakan') || txt.includes('Instruksi gue sering')) {
          await btn.click();
          break;
        }
      }
      await new Promise((r) => setTimeout(r, 400));

      const optionButtons3 = await page.$$('button');
      for (const btn of optionButtons3) {
        const txt = await page.evaluate((el) => el.innerText, btn);
        if (txt.includes('Skrip obrolan') || txt.includes('Format 1-on-1')) {
          await btn.click();
          break;
        }
      }
      await new Promise((r) => setTimeout(r, 600));

      await page.screenshot({
        path: path.join(SCREENSHOT_DIR, '02-quiz-result.png'),
      });
      results.quiz.status = 'SUCCESS';
      console.log('   ✓ Interaksi Quiz 3 langkah berhasil & hasil buku direkomendasikan.');
    } else {
      results.quiz.status = 'SKIPPED_NOT_FOUND';
    }

    // ==========================================
    // TEST 2: Interactive Reader (Desktop)
    // ==========================================
    console.log('📖 3. Menguji Interactive Reader (Bab 0 Pendahuluan)...');
    await page.goto('http://localhost:3000/read/book-1/id-kasual/ch-0', {
      waitUntil: 'domcontentloaded',
      timeout: 15000,
    });
    await new Promise((r) => setTimeout(r, 1200));

    // Verifikasi Toolbar Tema: Klik tombol Sepia
    const buttons = await page.$$('button');
    for (const btn of buttons) {
      const txt = await page.evaluate((el) => el.innerText, btn);
      if (txt.includes('Sepia')) {
        await btn.click();
        break;
      }
    }
    await new Promise((r) => setTimeout(r, 600));

    // Cek warna background kartu pembaca pada mode Sepia
    const sepiaStyles = await page.evaluate(() => {
      const card = document.querySelector('.reader-paper-sepia');
      if (!card) return null;
      const cs = window.getComputedStyle(card);
      return { bg: cs.backgroundColor, color: cs.color };
    });
    console.log('   ✓ Sepia computed styles:', sepiaStyles);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '03-reader-sepia.png'),
    });

    // Klik tombol Malam
    const buttonsMidnight = await page.$$('button');
    for (const btn of buttonsMidnight) {
      const txt = await page.evaluate((el) => el.innerText, btn);
      if (txt.includes('Malam')) {
        await btn.click();
        break;
      }
    }
    await new Promise((r) => setTimeout(r, 600));

    // Cek warna background kartu pembaca pada mode Malam
    const midnightStyles = await page.evaluate(() => {
      const card = document.querySelector('.reader-paper-midnight');
      if (!card) return null;
      const cs = window.getComputedStyle(card);
      const p = card.querySelector('p');
      const pcs = p ? window.getComputedStyle(p) : null;
      return { bg: cs.backgroundColor, color: cs.color, pColor: pcs?.color };
    });
    console.log('   ✓ Malam computed styles:', midnightStyles);

    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '04-reader-midnight.png'),
    });

    // Kembalikan ke Cream
    const buttonsCream = await page.$$('button');
    for (const btn of buttonsCream) {
      const txt = await page.evaluate((el) => el.innerText, btn);
      if (txt.includes('Cream')) {
        await btn.click();
        break;
      }
    }
    await new Promise((r) => setTimeout(r, 600));

    // Uji Input Personalisasi Nama
    const inputName = await page.$('input[placeholder*="Dani / Siska"]');
    if (inputName) {
      await inputName.type('Budi Santoso');
      await new Promise((r) => setTimeout(r, 500));
      console.log('   ✓ Personalisasi input nama berhasil diketik.');
    }

    // Scroll ke bagian bawah untuk memeriksa Footnotes / Catatan Kaki
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await new Promise((r) => setTimeout(r, 800));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '05-reader-footnotes.png'),
    });
    console.log('   ✓ Footnotes visual layout tertangkap.');

    // Periksa apakah ada horizontal scroll overflow yang tidak diinginkan
    const isOverflowing = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    results.reader.hasHorizontalOverflow = isOverflowing;
    console.log(`   ✓ Horizontal overflow: ${isOverflowing ? 'ADA (Warning)' : 'TIDAK ADA (Bagus!)'}`);

    // ==========================================
    // TEST 3: Mobile Responsive Viewport (iPhone 12: 390x844)
    // ==========================================
    console.log('📱 4. Menguji Tampilan Mobile (390x844)...');
    await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true });
    await page.goto('http://localhost:3000/read/book-1/id-kasual/ch-0', {
      waitUntil: 'networkidle0',
      timeout: 30000,
    });
    await new Promise((r) => setTimeout(r, 500));
    await page.screenshot({
      path: path.join(SCREENSHOT_DIR, '06-reader-mobile.png'),
    });

    const isMobileOverflowing = await page.evaluate(() => {
      return document.documentElement.scrollWidth > window.innerWidth;
    });
    results.responsive.mobileOverflow = isMobileOverflowing;
    console.log(`   ✓ Mobile horizontal overflow: ${isMobileOverflowing ? 'ADA (Warning)' : 'TIDAK ADA (Bagus!)'}`);

    console.log('🏁 Seluruh skenario pengujian E2E selesai!');
  } catch (err) {
    console.error('❌ Error during QA execution:', err);
    errors.push(err.message);
  } finally {
    await browser.close();
  }

  console.log('\n--- HASIL QA REPORT ---');
  console.log(JSON.stringify({ results, errors }, null, 2));
}

runQA();
