import { apiFetch } from './client';
import type { ThemeConfig } from './types';

const FALLBACK_THEME: ThemeConfig = {
  id: 'fallback',
  storeId: 'fallback',
  storeName: 'My Store',
  primaryColor: '#18181b',
  secondaryColor: '#71717a',
  accentColor: '#3b82f6',
  backgroundColor: '#ffffff',
  language: 'en',
  currency: 'USD',
};

export async function getTheme(): Promise<ThemeConfig> {
  try {
    return await apiFetch<ThemeConfig>('/api/theme');
  } catch {
    return FALLBACK_THEME;
  }
}
