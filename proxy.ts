import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Edge Middleware — Multi-Tenant Store Resolution
 * SACRED: Never modify via AI Editor or CMS tools.
 */
export function proxy(request: NextRequest) {
  const host = request.headers.get('x-forwarded-host') || request.headers.get('host') || '';
  let cleanHost = host.split(':')[0].toLowerCase().trim();

  const { searchParams } = request.nextUrl;
  const storeIdParam = searchParams.get('storeId');
  const storeSlugParam = searchParams.get('storeSlug');

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-store-host', cleanHost);

  const cookieSlug = request.cookies.get('storeSlug')?.value;
  const cookieStoreId = request.cookies.get('storeId')?.value;

  const effectiveStoreId = storeIdParam || cookieStoreId || process.env.NEXT_PUBLIC_STORE_ID || '';
  const effectiveStoreSlug = storeSlugParam || cookieSlug || process.env.NEXT_PUBLIC_STORE_SLUG || '';

  if (effectiveStoreId) requestHeaders.set('x-store-id', effectiveStoreId);
  if (effectiveStoreSlug) requestHeaders.set('x-store-slug', effectiveStoreSlug);

  const parts = cleanHost.split('.');
  if (parts.length >= 2) {
    const subdomain = parts[0];
    if (subdomain && !['www', 'localhost', '127', 'api', 'cms'].includes(subdomain)) {
      if (!requestHeaders.has('x-store-slug')) {
        requestHeaders.set('x-store-slug', subdomain);
      }
    }
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (storeIdParam) response.cookies.set('storeId', storeIdParam, { path: '/', maxAge: 604800 });
  if (storeSlugParam) response.cookies.set('storeSlug', storeSlugParam, { path: '/', maxAge: 604800 });
  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
