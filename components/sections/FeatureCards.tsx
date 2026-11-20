'use client';
import { ShieldCheck, Truck, RotateCcw, Headphones } from 'lucide-react';
import type { SectionProps } from '@/lib/sections/types';

export default function FeatureCards({ config }: SectionProps) {
  const p = config.props || {};
  const items = (p.items as Array<{ title: string; desc: string }>) || [
    { title: 'Free Shipping', desc: 'On orders over $75' },
    { title: 'Secure Payment', desc: '100% encrypted checkout' },
    { title: 'Easy Returns', desc: '30-day money-back guarantee' },
    { title: '24/7 Support', desc: 'Dedicated customer service' },
  ];
  const icons = [Truck, ShieldCheck, RotateCcw, Headphones];

  return (
    <section className="sf-container py-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((item, idx) => {
          const Icon = icons[idx % icons.length];
          return (
            <div key={idx} className="flex items-center gap-4 p-5 rounded-xl" style={{ backgroundColor: 'var(--sf-surface)', border: '1px solid var(--sf-border)' }}>
              <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--sf-bg)', color: 'var(--sf-primary)' }}>
                <Icon size={22} />
              </div>
              <div>
                <h4 className="font-semibold text-sm" style={{ color: 'var(--sf-text)' }}>{item.title}</h4>
                <p className="text-xs" style={{ color: 'var(--sf-text-muted)' }}>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
