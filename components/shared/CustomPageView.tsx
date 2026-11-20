'use client';
import type { ThemeConfig } from '@/lib/api/types';

interface Props { theme: ThemeConfig; slug: string; }

export default function CustomPageView({ theme, slug }: Props) {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold mb-4" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>
        {slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
      </h1>
      <p style={{ color: 'var(--sf-text-muted)' }}>Page content is managed from the CMS.</p>
    </div>
  );
}
