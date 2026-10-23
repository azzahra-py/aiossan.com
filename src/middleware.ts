import { NextResponse, type NextRequest } from 'next/server';

// Coming Soon mode (main branch): every route except the homepage itself
// redirects to '/', so production serves a single Coming Soon page.
// The full application lives on the `development` branch.
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname !== '/') {
    return NextResponse.redirect(new URL('/', request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
  ],
};
