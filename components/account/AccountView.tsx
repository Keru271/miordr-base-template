'use client';
import Link from 'next/link';
import { User, Package } from 'lucide-react';
import type { ThemeConfig } from '@/lib/api/types';
export default function AccountView({ theme }: { theme: ThemeConfig }) {
  return (
    <div className="sf-container py-10">
      <h1 className="text-2xl font-bold mb-8" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>My Account</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md">
        <Link href="/account" className="flex items-center gap-3 p-5 rounded-xl transition-shadow hover:shadow-md" style={{ backgroundColor: 'var(--sf-surface)', border: '1px solid var(--sf-border)' }}>
          <User size={20} style={{ color: 'var(--sf-primary)' }} />
          <span className="font-medium" style={{ color: 'var(--sf-text)' }}>Profile</span>
        </Link>
        <Link href="/account/orders" className="flex items-center gap-3 p-5 rounded-xl transition-shadow hover:shadow-md" style={{ backgroundColor: 'var(--sf-surface)', border: '1px solid var(--sf-border)' }}>
          <Package size={20} style={{ color: 'var(--sf-primary)' }} />
          <span className="font-medium" style={{ color: 'var(--sf-text)' }}>Orders</span>
        </Link>
      </div>
    </div>
  );
}
