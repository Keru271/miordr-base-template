'use client';
import type { ThemeConfig } from '@/lib/api/types';
export default function CheckoutView({ theme }: { theme: ThemeConfig }) {
  return (
    <div className="sf-container py-10">
      <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>Checkout</h1>
      <p style={{ color: 'var(--sf-text-muted)' }}>Checkout flow is configured from the CMS.</p>
    </div>
  );
}
