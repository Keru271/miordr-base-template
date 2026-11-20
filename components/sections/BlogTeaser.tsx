'use client';
import Link from 'next/link';
import type { SectionProps } from '@/lib/sections/types';

export default function BlogTeaser({ config }: SectionProps) {
  const p = config.props || {};
  const title = (p.title as string) || 'From the Journal';

  return (
    <section className="sf-container py-16">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>{title}</h2>
        <Link href="/blog" className="text-sm font-semibold hover:opacity-70" style={{ color: 'var(--sf-primary)' }}>View All Posts →</Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <div key={i} className="rounded-xl overflow-hidden" style={{ backgroundColor: 'var(--sf-surface)', border: '1px solid var(--sf-border)' }}>
            <div className="aspect-video" style={{ backgroundColor: 'var(--sf-surface-alt)' }} />
            <div className="p-5">
              <span className="text-xs font-semibold uppercase" style={{ color: 'var(--sf-accent)' }}>Article</span>
              <h3 className="font-bold text-base mt-1 mb-2 line-clamp-2" style={{ color: 'var(--sf-text)' }}>Styling Trends for the Upcoming Season</h3>
              <p className="text-xs line-clamp-2" style={{ color: 'var(--sf-text-muted)' }}>Explore the curated looks, textures, and color palettes that define this month.</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
