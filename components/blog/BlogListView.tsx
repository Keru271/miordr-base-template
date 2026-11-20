'use client';
import type { ThemeConfig } from '@/lib/api/types';

interface Props { theme: ThemeConfig; }

export default function BlogListView({ theme }: Props) {
  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold mb-8" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>Blog</h1>
      <div className="text-center py-16 border-2 border-dashed rounded-xl" style={{ borderColor: 'var(--sf-border)', color: 'var(--sf-text-muted)' }}>
        <div className="text-4xl mb-3">📝</div>
        <p className="font-medium">No blog posts yet</p>
        <p className="text-sm mt-1">Publish your first post from the CMS.</p>
      </div>
    </div>
  );
}
