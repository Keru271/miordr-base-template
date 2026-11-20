'use client';
import { Star } from 'lucide-react';
import type { SectionProps } from '@/lib/sections/types';

export default function TestimonialCarousel({ config }: SectionProps) {
  const p = config.props || {};
  const title = (p.title as string) || 'What our customers say';
  const testimonials = (p.testimonials as Array<{ author: string; text: string; role?: string }>) || [
    { author: 'Sarah M.', text: 'Outstanding quality and fast delivery. I order from here every month!', role: 'Verified Buyer' },
    { author: 'James K.', text: 'Customer service went above and beyond. Truly a 5-star experience.', role: 'Verified Buyer' },
    { author: 'Elena R.', text: 'The designs are stunning and the packaging felt like unboxing a luxury gift.', role: 'Verified Buyer' },
  ];

  return (
    <section className="py-16" style={{ backgroundColor: 'var(--sf-surface)' }}>
      <div className="sf-container">
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>
          {title}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="p-6 rounded-xl flex flex-col justify-between" style={{ backgroundColor: 'var(--sf-bg)', border: '1px solid var(--sf-border)' }}>
              <div>
                <div className="flex gap-1 mb-4" style={{ color: 'var(--sf-warning)' }}>
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-sm italic mb-6 leading-relaxed" style={{ color: 'var(--sf-text)' }}>"{t.text}"</p>
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: 'var(--sf-text)' }}>{t.author}</div>
                {t.role && <div className="text-xs" style={{ color: 'var(--sf-text-muted)' }}>{t.role}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
