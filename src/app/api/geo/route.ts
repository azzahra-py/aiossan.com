import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

// Returns the visitor country as detected by Vercel from the request IP
// (x-vercel-ip-country header). Null when the header is absent, for
// example in local development. Used by the landing page only to pick a
// sensible default language; a saved manual choice always wins.
export async function GET(request: Request) {
  const country = request.headers.get('x-vercel-ip-country');
  return NextResponse.json({
    country: country ? country.toUpperCase() : null,
  });
}
