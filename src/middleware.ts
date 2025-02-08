import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import PocketBase from 'pocketbase';

const pb = new PocketBase(process.env.NEXT_PUBLIC_PB_URL);

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Abaikan halaman archive (/articles)
  if (pathname === '/articles' || pathname === '/articles/') {
    return NextResponse.next();
  }

  // Proses hanya untuk path /articles/:slug
  if (pathname.startsWith('/articles/')) {
    const slug = pathname.replace('/articles/', '');

    if (!slug) return NextResponse.next();

    try {
      // Cek apakah slug sudah benar
      const currentArticle = await pb
        .collection('articles')
        .getFirstListItem(`slug = "${slug}"`);
      if (currentArticle) {
        return NextResponse.next(); // Slug valid, tidak perlu redirect
      }
    } catch {
      // Jika slug tidak ditemukan, cek previous_slugs
      const result = await pb.collection('articles').getList(1, 1, {
        filter: `previous_slugs ~ "${slug}"`,
      });

      if (result.items.length > 0) {
        const article = result.items[0];
        // Tambahkan pengecekan eksplisit untuk memastikan article tidak undefined
        if (article && article.slug !== slug) {
          const newUrl = new URL(`/articles/${article.slug}`, request.url);
          return NextResponse.redirect(newUrl);
        }
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/articles/:slug*'], // Middleware hanya memproses path dengan slug
};
