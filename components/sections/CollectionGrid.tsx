'use client';
import Link from 'next/link';
import type { SectionProps } from '@/lib/sections/types';

export default function CollectionGrid({ config, data }: SectionProps) {
  const p = config.props || {};
  const title = (p.title as string) || 'Curated Collections';
  const collections = data?.collections || [];

  return (
    <section className="sf-container py-16">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>{title}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.slice(0, 6).map(c => (
          <Link key={c.id} href={`/collections/${c.slug}`}
            className="group relative overflow-hidden rounded-xl aspect-[16/9] flex items-end p-6"
            style={{ backgroundColor: 'var(--sf-surface)' }}>
            {c.image && <img src={c.image} alt={c.name} className="absolute inset-0 w-full h-full object-cover transition-transform group-hover:scale-105" />}
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-white drop-shadow">{c.name}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
