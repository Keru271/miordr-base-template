/**
 * OmniStore API Client — SACRED
 * Reads store context from Next.js request headers injected by middleware.
 * Falls back to env vars for static generation and direct store access.
 */

import { headers } from 'next/headers';

function getApiBase(): string {
  return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
}

async function getStoreHeaders(): Promise<Record<string, string>> {
  const h: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  try {
    const headersList = await headers();
    const storeId = headersList.get('x-store-id') || process.env.NEXT_PUBLIC_STORE_ID || '';
    const storeSlug = headersList.get('x-store-slug') || process.env.NEXT_PUBLIC_STORE_SLUG || '';
    const storeHost = headersList.get('x-store-host') || '';

    if (storeId) h['x-store-id'] = storeId;
    if (storeSlug) h['x-store-slug'] = storeSlug;
    if (storeHost) h['x-store-host'] = storeHost;
  } catch {
    // headers() may not be available in all contexts; fall back to env
    if (process.env.NEXT_PUBLIC_STORE_ID) h['x-store-id'] = process.env.NEXT_PUBLIC_STORE_ID;
    if (process.env.NEXT_PUBLIC_STORE_SLUG) h['x-store-slug'] = process.env.NEXT_PUBLIC_STORE_SLUG;
  }

  return h;
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const storeHeaders = await getStoreHeaders();
  const url = `${getApiBase()}${path}`;

  const res = await fetch(url, {
    ...options,
    headers: { ...storeHeaders, ...(options?.headers as Record<string, string> || {}) },
    next: { revalidate: 0 },
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${path}`);
  }

  return res.json() as Promise<T>;
}
