'use client';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';
export default function CheckoutSuccessView() {
  return (
    <div className="sf-container py-24 text-center">
      <CheckCircle size={56} className="mx-auto mb-4" style={{ color: 'var(--sf-success)' }} />
      <h1 className="text-3xl font-bold mb-3" style={{ color: 'var(--sf-text)' }}>Order Confirmed!</h1>
      <p className="mb-6" style={{ color: 'var(--sf-text-muted)' }}>Thank you for your purchase. You'll receive a confirmation email shortly.</p>
      <Link href="/products" className="sf-btn-primary">Continue Shopping</Link>
    </div>
  );
}
