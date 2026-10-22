import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { syncAndGetUserEntitlements } from '@/lib/entitlements';
import { getPresignedPdfUrl } from '@/lib/r2';
import { BookId, BookLang } from '@/types/books';

const VALID_BOOKS: BookId[] = ['book-1', 'book-2', 'book-3'];
const VALID_LANGS: BookLang[] = ['id-kasual', 'id-standar', 'en'];

export const dynamic = 'force-dynamic';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const bookId = (searchParams.get('book') || searchParams.get('bookId')) as BookId;
    const lang = (searchParams.get('lang') || 'id-kasual') as BookLang;

    if (!bookId || !VALID_BOOKS.includes(bookId)) {
      return NextResponse.json({ error: 'Invalid book parameter.' }, { status: 400 });
    }

    if (!VALID_LANGS.includes(lang)) {
      return NextResponse.json({ error: 'Invalid lang parameter.' }, { status: 400 });
    }

    const cookieStore = cookies();
    const supabase = createClient(cookieStore);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: 'Silakan masuk terlebih dahulu untuk mengunduh Master PDF.' },
        { status: 401 }
      );
    }

    const unlockedBooks = await syncAndGetUserEntitlements(user.id, user.email);
    if (!unlockedBooks.includes(bookId)) {
      return NextResponse.json(
        { error: 'Buku ini belum termasuk dalam hak akses akun kamu.' },
        { status: 403 }
      );
    }

    const downloadUrl = await getPresignedPdfUrl(bookId, lang);
    return NextResponse.redirect(downloadUrl, 307);
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || 'Gagal menyiapkan tautan unduh PDF.' },
      { status: 500 }
    );
  }
}
