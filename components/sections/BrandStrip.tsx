'use client';
import type { SectionProps } from '@/lib/sections/types';

export default function BrandStrip({ config }: SectionProps) {
  const p = config.props || {};
  const brands = (p.brands as string[]) || ['ACME Corp', 'Aura Goods', 'Luxe Label', 'Minimalist', 'Nova Tech'];

  return (
    <div className="py-8 border-y" style={{ backgroundColor: 'var(--sf-bg)', borderColor: 'var(--sf-border)' }}>
      <div className="sf-container flex flex-wrap items-center justify-around gap-6 opacity-60">
        {brands.map((brand, i) => (
          <span key={i} className="text-base sm:text-lg font-bold tracking-wider uppercase" style={{ color: 'var(--sf-text-muted)', fontFamily: 'var(--sf-heading-font)' }}>
            {brand}
          </span>
        ))}
      </div>
    </div>
  );
}
