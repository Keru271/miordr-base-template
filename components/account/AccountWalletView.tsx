'use client';

import React, { useState } from 'react';
import {
  Wallet,
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  CreditCard,
  Gift,
  CheckCircle2,
  Clock,
} from 'lucide-react';
import type { ThemeConfig } from '@/lib/api/types';
import { useToast } from '@/context/ToastContext';
import { formatPrice } from '@/lib/currency';

interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  title: string;
  orderRef?: string;
  date: string;
  amount: number;
  status: 'completed' | 'processing';
}

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: 'tx-101',
    type: 'credit',
    title: 'Referral Cashback Reward',
    date: 'Nov 18, 2026',
    amount: 25.0,
    status: 'completed',
  },
  {
    id: 'tx-102',
    type: 'debit',
    title: 'Order Payment #OMS-9204',
    orderRef: '#OMS-9204',
    date: 'Nov 12, 2026',
    amount: 64.5,
    status: 'completed',
  },
  {
    id: 'tx-103',
    type: 'credit',
    title: 'Store Voucher Top-Up',
    date: 'Nov 02, 2026',
    amount: 100.0,
    status: 'completed',
  },
  {
    id: 'tx-104',
    type: 'credit',
    title: 'Returned Item Refund #OMS-8841',
    orderRef: '#OMS-8841',
    date: 'Oct 24, 2026',
    amount: 45.0,
    status: 'completed',
  },
];

export default function AccountWalletView({ theme }: { theme: ThemeConfig }) {
  const { show } = useToast();
  const currency = theme.currency || 'USD';
  const [balance, setBalance] = useState(125.0);
  const [voucherCode, setVoucherCode] = useState('');
  const [redeeming, setRedeeming] = useState(false);

  const handleRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!voucherCode.trim()) return;

    setRedeeming(true);
    setTimeout(() => {
      setBalance((b) => b + 50.0);
      setVoucherCode('');
      setRedeeming(false);
      show('Gift voucher redeemed! $50.00 added to your wallet.', 'success');
    }, 700);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}
        >
          Wallet & Store Credits
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--sf-text-muted)' }}>
          View store credit balances, redeem vouchers, and track cashback rewards.
        </p>
      </div>

      {/* Balance Card Banner */}
      <div
        className="p-8 rounded-3xl border relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between gap-6 shadow-sm"
        style={{
          background: `linear-gradient(135deg,
            var(--sf-surface) 0%,
            color-mix(in srgb, var(--sf-primary) 12%, var(--sf-surface)) 100%)`,
          borderColor: 'var(--sf-border)',
        }}
      >
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span
              className="p-2 rounded-xl text-white"
              style={{ backgroundColor: 'var(--sf-primary)' }}
            >
              <Wallet size={20} />
            </span>
            <span
              className="text-xs font-bold uppercase tracking-wider"
              style={{ color: 'var(--sf-text-muted)' }}
            >
              Available Balance
            </span>
          </div>

          <div
            className="text-4xl sm:text-5xl font-extrabold tracking-tight"
            style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}
          >
            {formatPrice(balance, currency)}
          </div>

          <p className="text-xs flex items-center gap-1.5 pt-1" style={{ color: 'var(--sf-success)' }}>
            <Sparkles size={13} />
            <span>450 Reward Points ($4.50 auto-applied at checkout)</span>
          </p>
        </div>

        {/* Voucher Redeem Box */}
        <div
          className="p-4 rounded-2xl border max-w-sm w-full"
          style={{
            backgroundColor: 'var(--sf-bg)',
            borderColor: 'var(--sf-border)',
          }}
        >
          <div className="flex items-center gap-2 mb-2">
            <Gift size={16} style={{ color: 'var(--sf-primary)' }} />
            <span className="text-xs font-bold" style={{ color: 'var(--sf-text)' }}>
              Redeem Gift Card or Promo
            </span>
          </div>

          <form onSubmit={handleRedeem} className="flex gap-2">
            <input
              type="text"
              placeholder="e.g. VIPGIFT50"
              value={voucherCode}
              onChange={(e) => setVoucherCode(e.target.value.toUpperCase())}
              className="flex-1 px-3 py-2 rounded-xl text-xs font-mono border outline-none uppercase"
              style={{
                backgroundColor: 'var(--sf-surface)',
                borderColor: 'var(--sf-border)',
                color: 'var(--sf-text)',
              }}
            />
            <button
              type="submit"
              disabled={redeeming}
              className="sf-btn-primary px-3.5 py-2 text-xs font-semibold shrink-0"
            >
              {redeeming ? 'Applying...' : 'Apply'}
            </button>
          </form>
        </div>
      </div>

      {/* Transaction History Card */}
      <div
        className="p-6 rounded-2xl border space-y-4"
        style={{
          backgroundColor: 'var(--sf-surface)',
          borderColor: 'var(--sf-border)',
        }}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold" style={{ color: 'var(--sf-text)' }}>
            Transaction History
          </h2>
          <span className="text-xs" style={{ color: 'var(--sf-text-muted)' }}>
            Last 30 Days
          </span>
        </div>

        <div className="divide-y" style={{ borderColor: 'var(--sf-border)' }}>
          {SAMPLE_TRANSACTIONS.map((tx) => {
            const isCredit = tx.type === 'credit';
            return (
              <div
                key={tx.id}
                className="py-3.5 flex items-center justify-between gap-4 first:pt-0 last:pb-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      backgroundColor: isCredit
                        ? 'color-mix(in srgb, var(--sf-success) 15%, transparent)'
                        : 'color-mix(in srgb, var(--sf-error) 15%, transparent)',
                      color: isCredit ? 'var(--sf-success)' : 'var(--sf-error)',
                    }}
                  >
                    {isCredit ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
                  </div>

                  <div className="min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{ color: 'var(--sf-text)' }}
                    >
                      {tx.title}
                    </p>
                    <p className="text-xs flex items-center gap-2" style={{ color: 'var(--sf-text-muted)' }}>
                      <span>{tx.date}</span>
                      <span>•</span>
                      <span className="uppercase text-[10px] font-mono">{tx.id}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span
                    className="text-sm font-bold block"
                    style={{
                      color: isCredit ? 'var(--sf-success)' : 'var(--sf-text)',
                    }}
                  >
                    {isCredit ? '+' : '-'} {formatPrice(tx.amount, currency)}
                  </span>
                  <span
                    className="text-[10px] font-semibold flex items-center justify-end gap-1"
                    style={{ color: 'var(--sf-text-muted)' }}
                  >
                    <CheckCircle2 size={11} className="text-emerald-500" /> Settled
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
