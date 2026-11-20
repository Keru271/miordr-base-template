'use client';
import Link from 'next/link';
import type { ThemeConfig, Category } from '@/lib/api/types';

interface Props { theme: ThemeConfig; categories: Category[]; }

export default function CategoryGridView({ categories }: Props) {
  if (categories.length === 0) {
    return (
      <div className="sf-container py-24 text-center">
        <div className="text-5xl mb-4">🗂️</div>
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--sf-text)' }}>No categories yet</h2>
        <p style={{ color: 'var(--sf-text-muted)' }}>Create categories from the CMS to organize your products.</p>
      </div>
    );
  }
  return (
    <div className="sf-container py-10">
      <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>All Categories</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map(cat => (
          <Link key={cat.id} href={`/categories/${cat.slug}`}
            className="group relative rounded-xl overflow-hidden aspect-square flex items-end p-4 transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: 'var(--sf-surface)' }}>
            {cat.image && <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover" />}
            <div className="relative">
              <div className="font-semibold text-sm text-white drop-shadow">{cat.name}</div>
              {cat.productCount !== undefined && <div className="text-xs text-white/70">{cat.productCount} products</div>}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
