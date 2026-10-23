/**
 * Upload generated PDFs from ./pdf-out/{book}/{lang}.pdf to Cloudflare R2
 * under the keys the download route expects: pdf/{book}/{lang}.pdf
 * Credentials come from .env.local (R2_ENDPOINT, R2_ACCESS_KEY_ID,
 * R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME). Run: npx tsx scripts/upload-pdfs.ts
 */
import fs from 'node:fs';
import path from 'node:path';
import { S3Client, PutObjectCommand, HeadObjectCommand } from '@aws-sdk/client-s3';

const BOOKS = ['book-1', 'book-2', 'book-3'] as const;
const LANGS = ['id-kasual', 'id-standar', 'en'] as const;

function loadEnvLocal() {
  const file = path.join(process.cwd(), '.env.local');
  for (const line of fs.readFileSync(file, 'utf-8').split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#') || !trimmed.includes('=')) continue;
    const [key, ...rest] = trimmed.split('=');
    if (!process.env[key.trim()]) {
      process.env[key.trim()] = rest.join('=').trim().replace(/^"|"$/g, '');
    }
  }
}

async function main() {
  loadEnvLocal();
  const endpoint = process.env.R2_ENDPOINT;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucket = process.env.R2_BUCKET_NAME || 'aiossan-ebook-assets';
  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error('R2 credentials missing in .env.local');
  }

  const client = new S3Client({
    region: 'auto',
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });

  for (const book of BOOKS) {
    for (const lang of LANGS) {
      const local = path.join(process.cwd(), 'pdf-out', book, `${lang}.pdf`);
      const key = `pdf/${book}/${lang}.pdf`;
      const body = fs.readFileSync(local);
      await client.send(
        new PutObjectCommand({
          Bucket: bucket,
          Key: key,
          Body: body,
          ContentType: 'application/pdf',
        })
      );
      const head = await client.send(new HeadObjectCommand({ Bucket: bucket, Key: key }));
      console.log(`OK ${key} (${Math.round((head.ContentLength || 0) / 1024)} KB)`);
    }
  }
  console.log('All 9 PDFs uploaded and verified in bucket', bucket);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
