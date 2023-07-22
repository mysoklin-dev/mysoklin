import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
// eslint-disable-next-line consistent-return
export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    const token = request.cookies.get('token');
    if (!token) {
      return NextResponse.rewrite(new URL('/admin/login', request.url));
    }
  }

  const response = NextResponse.next();

  return response;
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
};
