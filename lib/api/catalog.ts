import { apiFetch } from './client';
import type { Category, Collection, Menu } from './types';

export async function getCategories(): Promise<Category[]> {
  try {
    const res = await apiFetch<{ data: Category[] } | Category[]>('/api/categories');
    return Array.isArray(res) ? res : res.data || [];
  } catch { return []; }
}

export async function getCollections(): Promise<Collection[]> {
  try {
    const res = await apiFetch<{ data: Collection[] } | Collection[]>('/api/collections');
    return Array.isArray(res) ? res : res.data || [];
  } catch { return []; }
}

export async function getMenu(handle: string): Promise<Menu | null> {
  try {
    return await apiFetch<Menu>(`/api/menus/${handle}`);
  } catch { return null; }
}
