import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BookId, BookLang } from '@/types/books';

export async function getPresignedPdfUrl(bookId: BookId, lang: BookLang): Promise<string> {
  const endpoint = process.env.R2_ENDPOINT;
  const accessKeyId = process.env.R2_ACCESS_KEY_ID;
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
  const bucketName = process.env.R2_BUCKET_NAME || 'aiossan-ebook-assets';

  if (!endpoint || !accessKeyId || !secretAccessKey) {
    throw new Error('Kredensial Cloudflare R2 belum dikonfigurasi.');
  }

  const client = new S3Client({
    region: 'auto',
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
  });

  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: `pdf/${bookId}/${lang}.pdf`,
    ResponseContentDisposition: `attachment; filename="aiossan-${bookId}-${lang}.pdf"`,
  });

  return getSignedUrl(client, command, { expiresIn: 900 });
}
