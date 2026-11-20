'use client';
import { useState } from 'react';
import type { SectionProps } from '@/lib/sections/types';

export default function NewsletterSignup({ config }: SectionProps) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const p = config.props || {};
  const title = (p.title as string) || 'Subscribe to our newsletter';
  const subtitle = (p.subtitle as string) || 'Get 10% off your first order plus secret deals in your inbox.';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) setDone(true);
  };

  return (
    <section className="sf-container py-16">
      <div className="rounded-2xl p-8 sm:p-14 text-center max-w-3xl mx-auto" style={{ backgroundColor: 'var(--sf-surface)' }}>
        <h2 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>
          {title}
        </h2>
        <p className="text-sm sm:text-base mb-8 max-w-md mx-auto" style={{ color: 'var(--sf-text-muted)' }}>
          {subtitle}
        </p>
        {done ? (
          <p className="font-semibold text-sm" style={{ color: 'var(--sf-success)' }}>Thank you for subscribing!</p>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input type="email" required placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)}
              className="flex-1 px-4 py-3 rounded-lg text-sm outline-none"
              style={{ border: '1px solid var(--sf-border)', backgroundColor: 'var(--sf-bg)', color: 'var(--sf-text)' }} />
            <button type="submit" className="sf-btn-primary">Subscribe</button>
          </form>
        )}
      </div>
    </section>
  );
}
