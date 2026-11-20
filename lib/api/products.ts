import { apiFetch } from './client';
import type { Product, ProductDetail, ListResponse } from './types';

interface ProductsQuery {
  limit?: number;
  page?: number;
  categoryId?: string;
  collectionId?: string;
  search?: string;
  sort?: string;
}

export async function getProducts(query: ProductsQuery = {}): Promise<Product[]> {
  try {
    const params = new URLSearchParams();
    if (query.limit) params.set('limit', String(query.limit));
    if (query.page) params.set('page', String(query.page));
    if (query.categoryId) params.set('categoryId', query.categoryId);
    if (query.search) params.set('search', query.search);
    if (query.sort) params.set('sort', query.sort);
    const res = await apiFetch<ListResponse<Product> | Product[]>(`/api/products?${params}`);
    return Array.isArray(res) ? res : res.data || [];
  } catch { return []; }
}

export async function getProduct(slug: string): Promise<ProductDetail | null> {
  try {
    return await apiFetch<ProductDetail>(`/api/products/${slug}`);
  } catch { return null; }
}

export async function getProductsByCategory(slug: string): Promise<Product[]> {
  try {
    const res = await apiFetch<ListResponse<Product> | Product[]>(`/api/products?categorySlug=${slug}&limit=24`);
    return Array.isArray(res) ? res : res.data || [];
  } catch { return []; }
}

export async function getProductsByCollection(slug: string): Promise<Product[]> {
  try {
    const res = await apiFetch<ListResponse<Product> | Product[]>(`/api/products?collectionSlug=${slug}&limit=24`);
    return Array.isArray(res) ? res : res.data || [];
  } catch { return []; }
}

export async function submitProductReview(
  productId: string,
  data: {
    userName: string;
    userEmail?: string;
    rating: number;
    title?: string;
    comment: string;
  },
): Promise<{ success: boolean; message: string }> {
  const apiBase = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const res = await fetch(`${apiBase}/api/products/${productId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  const body = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(body.message || `Failed to submit review: ${res.status}`);
  }
  return body;
}
