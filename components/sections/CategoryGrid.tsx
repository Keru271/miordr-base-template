'use client';
import Link from 'next/link';
import type { SectionProps } from '@/lib/sections/types';

export default function CategoryGrid({ config, data }: SectionProps) {
  const p = config.props || {};
  const title = (p.title as string) || 'Shop by Category';
  const categories = data?.categories || [];

  return (
    <section className="py-16" style={{ backgroundColor: 'var(--sf-surface)' }}>
      <div className="sf-container">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>
          {title}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {categories.slice(0, 8).map(cat => (
            <Link key={cat.id} href={`/categories/${cat.slug}`}
              className="group relative overflow-hidden rounded-xl aspect-square flex items-end p-4 transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: 'var(--sf-surface-alt)' }}>
              {cat.image && <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover" />}
              <div className="relative z-10 font-semibold text-sm text-white drop-shadow">
                {cat.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
