'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Trash2, ShoppingCart } from 'lucide-react';
import type { ThemeConfig } from '@/lib/api/types';
import { useCart } from '@/context/CartContext';
import { formatPrice } from '@/lib/currency';

interface Props { theme: ThemeConfig; }

export default function CartView({ theme }: Props) {
  const { cart, remove, updateQty } = useCart();
  const currency = theme.currency || 'USD';
  if (cart.items.length === 0) {
    return (
      <div className="sf-container py-24 text-center">
        <ShoppingCart size={48} className="mx-auto mb-4" style={{ color: 'var(--sf-border-strong)' }} />
        <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--sf-text)' }}>Your cart is empty</h2>
        <p className="mb-6" style={{ color: 'var(--sf-text-muted)' }}>Add products to get started.</p>
        <Link href="/products" className="sf-btn-primary">Browse Products</Link>
      </div>
    );
  }
  return (
    <div className="sf-container py-10">
      <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 flex flex-col gap-4">
          {cart.items.map(item => (
            <div key={item.id} className="flex gap-4 p-4 rounded-xl" style={{ backgroundColor: 'var(--sf-surface)', border: '1px solid var(--sf-border)' }}>
              <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0" style={{ backgroundColor: 'var(--sf-surface-alt)' }}>
                {item.image && <Image src={item.image} alt={item.name} fill className="object-cover" />}
              </div>
              <div className="flex-1">
                <Link href={`/products/${item.slug}`} className="text-sm font-medium line-clamp-2" style={{ color: 'var(--sf-text)' }}>{item.name}</Link>
                <p className="text-sm font-bold mt-1" style={{ color: 'var(--sf-text)' }}>{formatPrice(item.price, currency)}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center rounded-lg overflow-hidden" style={{ border: '1px solid var(--sf-border)' }}>
                  <button onClick={() => updateQty(item.id, item.quantity - 1)} className="px-2 py-1 text-sm" style={{ color: 'var(--sf-text)' }}>−</button>
                  <span className="px-3 py-1 text-sm" style={{ color: 'var(--sf-text)' }}>{item.quantity}</span>
                  <button onClick={() => updateQty(item.id, item.quantity + 1)} className="px-2 py-1 text-sm" style={{ color: 'var(--sf-text)' }}>+</button>
                </div>
                <button onClick={() => remove(item.id)} className="p-1.5 rounded hover:opacity-70" style={{ color: 'var(--sf-error)' }}><Trash2 size={14} /></button>
              </div>
            </div>
          ))}
        </div>
        <div className="p-6 rounded-xl h-fit" style={{ backgroundColor: 'var(--sf-surface)', border: '1px solid var(--sf-border)' }}>
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--sf-text)' }}>Order Summary</h2>
          <div className="flex justify-between mb-2 text-sm" style={{ color: 'var(--sf-text-muted)' }}>
            <span>Subtotal</span><span style={{ color: 'var(--sf-text)' }}>{formatPrice(cart.subtotal, currency)}</span>
          </div>
          <div className="pt-4 mt-4" style={{ borderTop: '1px solid var(--sf-border)' }}>
            <div className="flex justify-between font-bold mb-4" style={{ color: 'var(--sf-text)' }}>
              <span>Total</span><span>{formatPrice(cart.total, currency)}</span>
            </div>
            <Link href="/checkout" className="sf-btn-primary w-full text-center block">Proceed to Checkout</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
