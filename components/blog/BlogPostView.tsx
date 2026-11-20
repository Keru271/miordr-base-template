'use client';
import type { ThemeConfig } from '@/lib/api/types';

interface Props { theme: ThemeConfig; slug: string; }

export default function BlogPostView({ slug }: Props) {
  return (
    <div className="py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-6" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>{slug}</h1>
      <p style={{ color: 'var(--sf-text-muted)' }}>Post content managed from the CMS.</p>
    </div>
  );
}
