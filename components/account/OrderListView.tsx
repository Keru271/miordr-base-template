'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Package, Truck, CheckCircle2, Clock, ChevronRight, ShoppingBag } from 'lucide-react';
import { formatPrice } from '@/lib/currency';

interface MockOrder {
  id: string;
  date: string;
  status: 'delivered' | 'processing' | 'shipped';
  total: number;
  itemCount: number;
  items: Array<{ name: string; image: string }>;
}

const MOCK_ORDERS: MockOrder[] = [
  {
    id: 'OMS-9842',
    date: 'Nov 16, 2026',
    status: 'delivered',
    total: 184.0,
    itemCount: 2,
    items: [
      { name: 'Pure Cashmere Sweater', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&q=80' },
      { name: 'Silk Knit Scarf', image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=200&q=80' },
    ],
  },
  {
    id: 'OMS-9204',
    date: 'Nov 12, 2026',
    status: 'shipped',
    total: 64.5,
    itemCount: 1,
    items: [
      { name: 'Handcrafted Ceramic Mug', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=200&q=80' },
    ],
  },
];

export default function OrderListView() {
  const [filter, setFilter] = useState<'all' | 'shipped' | 'delivered'>('all');

  const filtered = MOCK_ORDERS.filter((o) => {
    if (filter === 'all') return true;
    return o.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}
          >
            My Orders
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--sf-text-muted)' }}>
            Track deliveries, view itemized receipts, and order history.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 p-1 rounded-xl border bg-slate-900/10 shrink-0"
          style={{ borderColor: 'var(--sf-border)' }}>
          {(['all', 'shipped', 'delivered'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold capitalize transition-all"
              style={{
                backgroundColor: filter === tab ? 'var(--sf-primary)' : 'transparent',
                color: filter === tab ? 'var(--sf-text-inverse)' : 'var(--sf-text-muted)',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filtered.map((order) => {
          const isDelivered = order.status === 'delivered';
          return (
            <div
              key={order.id}
              className="p-5 sm:p-6 rounded-2xl border space-y-4 transition-shadow hover:shadow-md"
              style={{
                backgroundColor: 'var(--sf-surface)',
                borderColor: 'var(--sf-border)',
              }}
            >
              {/* Order Header bar */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b"
                style={{ borderColor: 'var(--sf-border)' }}>
                <div className="flex items-center gap-3">
                  <Package size={18} style={{ color: 'var(--sf-primary)' }} />
                  <div>
                    <span className="font-bold text-sm" style={{ color: 'var(--sf-text)' }}>
                      Order #{order.id}
                    </span>
                    <span className="text-xs block" style={{ color: 'var(--sf-text-muted)' }}>
                      Placed on {order.date}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1.5"
                    style={{
                      backgroundColor: isDelivered
                        ? 'color-mix(in srgb, var(--sf-success) 15%, transparent)'
                        : 'color-mix(in srgb, var(--sf-accent) 15%, transparent)',
                      color: isDelivered ? 'var(--sf-success)' : 'var(--sf-accent)',
                    }}
                  >
                    {isDelivered ? <CheckCircle2 size={13} /> : <Truck size={13} />}
                    {isDelivered ? 'Delivered' : 'In Transit'}
                  </span>
                  <span className="font-bold text-sm" style={{ color: 'var(--sf-text)' }}>
                    {formatPrice(order.total)}
                  </span>
                </div>
              </div>

              {/* Items thumbnails preview */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto">
                  {order.items.map((item, i) => (
                    <img
                      key={i}
                      src={item.image}
                      alt={item.name}
                      className="w-14 h-14 rounded-xl object-cover border"
                      style={{ borderColor: 'var(--sf-border)' }}
                    />
                  ))}
                  <span className="text-xs pl-2 font-medium" style={{ color: 'var(--sf-text-muted)' }}>
                    {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
                  </span>
                </div>

                <Link
                  href={`/account/orders/${order.id}`}
                  className="sf-btn-outline px-4 py-2 text-xs font-semibold shrink-0"
                >
                  View Details <ChevronRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
