'use client';

import React, { useState } from 'react';
import { User, Mail, Phone, Lock, Bell, Check, ShieldCheck } from 'lucide-react';
import type { ThemeConfig } from '@/lib/api/types';
import { useToast } from '@/context/ToastContext';

interface Props {
  theme: ThemeConfig;
}

export default function AccountInfoView({ theme }: Props) {
  const { show } = useToast();
  const [saving, setSaving] = useState(false);

  // Form states
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 (555) 234-5678');
  const [orderAlerts, setOrderAlerts] = useState(true);
  const [marketingEmails, setMarketingEmails] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      show('Account information updated successfully!', 'success');
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1
          className="text-2xl sm:text-3xl font-bold tracking-tight"
          style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}
        >
          Personal Information
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--sf-text-muted)' }}>
          Manage your personal profile, contact information, and notifications.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div
          className="p-6 rounded-2xl border space-y-5"
          style={{
            backgroundColor: 'var(--sf-surface)',
            borderColor: 'var(--sf-border)',
          }}
        >
          <h2
            className="text-base font-bold flex items-center gap-2"
            style={{ color: 'var(--sf-text)' }}
          >
            <User size={18} style={{ color: 'var(--sf-primary)' }} />
            Profile Details
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--sf-text-muted)' }}
              >
                First Name
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition-colors"
                style={{
                  backgroundColor: 'var(--sf-bg)',
                  borderColor: 'var(--sf-border)',
                  color: 'var(--sf-text)',
                }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--sf-text-muted)' }}
              >
                Last Name
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition-colors"
                style={{
                  backgroundColor: 'var(--sf-bg)',
                  borderColor: 'var(--sf-border)',
                  color: 'var(--sf-text)',
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--sf-text-muted)' }}
              >
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none border transition-colors"
                  style={{
                    backgroundColor: 'var(--sf-bg)',
                    borderColor: 'var(--sf-border)',
                    color: 'var(--sf-text)',
                  }}
                />
                <Mail
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--sf-text-muted)' }}
                />
              </div>
            </div>
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--sf-text-muted)' }}
              >
                Phone Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm outline-none border transition-colors"
                  style={{
                    backgroundColor: 'var(--sf-bg)',
                    borderColor: 'var(--sf-border)',
                    color: 'var(--sf-text)',
                  }}
                />
                <Phone
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2"
                  style={{ color: 'var(--sf-text-muted)' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Security & Password Card */}
        <div
          className="p-6 rounded-2xl border space-y-4"
          style={{
            backgroundColor: 'var(--sf-surface)',
            borderColor: 'var(--sf-border)',
          }}
        >
          <div className="flex items-center justify-between">
            <h2
              className="text-base font-bold flex items-center gap-2"
              style={{ color: 'var(--sf-text)' }}
            >
              <Lock size={18} style={{ color: 'var(--sf-primary)' }} />
              Password & Security
            </h2>
            <span
              className="text-xs flex items-center gap-1 font-semibold"
              style={{ color: 'var(--sf-success)' }}
            >
              <ShieldCheck size={14} /> 2FA Active
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--sf-text-muted)' }}
              >
                New Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none border"
                style={{
                  backgroundColor: 'var(--sf-bg)',
                  borderColor: 'var(--sf-border)',
                  color: 'var(--sf-text)',
                }}
              />
            </div>
            <div>
              <label
                className="block text-xs font-semibold uppercase tracking-wider mb-2"
                style={{ color: 'var(--sf-text-muted)' }}
              >
                Confirm New Password
              </label>
              <input
                type="password"
                placeholder="••••••••••••"
                className="w-full px-4 py-2.5 rounded-xl text-sm outline-none border"
                style={{
                  backgroundColor: 'var(--sf-bg)',
                  borderColor: 'var(--sf-border)',
                  color: 'var(--sf-text)',
                }}
              />
            </div>
          </div>
        </div>

        {/* Notification Preferences */}
        <div
          className="p-6 rounded-2xl border space-y-4"
          style={{
            backgroundColor: 'var(--sf-surface)',
            borderColor: 'var(--sf-border)',
          }}
        >
          <h2
            className="text-base font-bold flex items-center gap-2"
            style={{ color: 'var(--sf-text)' }}
          >
            <Bell size={18} style={{ color: 'var(--sf-primary)' }} />
            Communication & Notifications
          </h2>

          <div className="space-y-3 pt-1">
            <label className="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:opacity-90"
              style={{ backgroundColor: 'var(--sf-bg)', borderColor: 'var(--sf-border)' }}>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--sf-text)' }}>
                  Order Updates & Tracking Alerts
                </p>
                <p className="text-xs" style={{ color: 'var(--sf-text-muted)' }}>
                  Receive SMS & Email notifications on shipments and delivery changes.
                </p>
              </div>
              <input
                type="checkbox"
                checked={orderAlerts}
                onChange={(e) => setOrderAlerts(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl border cursor-pointer hover:opacity-90"
              style={{ backgroundColor: 'var(--sf-bg)', borderColor: 'var(--sf-border)' }}>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--sf-text)' }}>
                  Marketing & VIP Promotions
                </p>
                <p className="text-xs" style={{ color: 'var(--sf-text-muted)' }}>
                  Exclusive invitations to new seasonal drops and private flash sales.
                </p>
              </div>
              <input
                type="checkbox"
                checked={marketingEmails}
                onChange={(e) => setMarketingEmails(e.target.checked)}
                className="w-4 h-4 rounded text-indigo-600"
              />
            </label>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="sf-btn-primary px-8 py-3 text-sm font-semibold"
          >
            {saving ? 'Saving Changes...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
