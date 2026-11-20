'use client';

import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2, X } from 'lucide-react';
import type { ThemeConfig } from '@/lib/api/types';
import { useToast } from '@/context/ToastContext';

interface Address {
  id: string;
  name: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  isDefaultShipping: boolean;
  isDefaultBilling: boolean;
}

const INITIAL_ADDRESSES: Address[] = [
  {
    id: 'addr-1',
    name: 'John Doe (Home)',
    street: '742 Evergreen Terrace, Apt 4B',
    city: 'Springfield',
    state: 'OR',
    postalCode: '97477',
    country: 'United States',
    phone: '+1 (555) 234-5678',
    isDefaultShipping: true,
    isDefaultBilling: true,
  },
  {
    id: 'addr-2',
    name: 'John Doe (Studio / Work)',
    street: '100 Silicon Way, Suite 300',
    city: 'San Francisco',
    state: 'CA',
    postalCode: '94107',
    country: 'United States',
    phone: '+1 (555) 987-6543',
    isDefaultShipping: false,
    isDefaultBilling: false,
  },
];

export default function AccountAddressesView({ theme }: { theme: ThemeConfig }) {
  const { show } = useToast();
  const [addresses, setAddresses] = useState<Address[]>(INITIAL_ADDRESSES);
  const [showModal, setShowModal] = useState(false);

  // Form states
  const [formName, setFormName] = useState('');
  const [formStreet, setFormStreet] = useState('');
  const [formCity, setFormCity] = useState('');
  const [formState, setFormState] = useState('');
  const [formZip, setFormZip] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleDelete = (id: string) => {
    setAddresses((prev) => prev.filter((a) => a.id !== id));
    show('Address deleted successfully.', 'info');
  };

  const handleSetDefault = (id: string) => {
    setAddresses((prev) =>
      prev.map((a) => ({
        ...a,
        isDefaultShipping: a.id === id,
      }))
    );
    show('Default shipping address updated.', 'success');
  };

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formStreet || !formCity) return;

    const newAddr: Address = {
      id: `addr-${Date.now()}`,
      name: formName || 'My Address',
      street: formStreet,
      city: formCity,
      state: formState,
      postalCode: formZip,
      country: 'United States',
      phone: formPhone || '+1 (555) 000-0000',
      isDefaultShipping: isDefault || addresses.length === 0,
      isDefaultBilling: isDefault,
    };

    if (isDefault) {
      setAddresses((prev) => [
        newAddr,
        ...prev.map((a) => ({ ...a, isDefaultShipping: false })),
      ]);
    } else {
      setAddresses((prev) => [newAddr, ...prev]);
    }

    setShowModal(false);
    show('New delivery address saved!', 'success');
    setFormName('');
    setFormStreet('');
    setFormCity('');
    setFormState('');
    setFormZip('');
    setFormPhone('');
    setIsDefault(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1
            className="text-2xl sm:text-3xl font-bold tracking-tight"
            style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}
          >
            My Addresses
          </h1>
          <p className="text-sm mt-1" style={{ color: 'var(--sf-text-muted)' }}>
            Manage delivery locations, default shipping, and billing destinations.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="sf-btn-primary px-4 py-2.5 text-xs font-semibold shrink-0"
        >
          <Plus size={16} /> Add New Address
        </button>
      </div>

      {/* Address Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {addresses.map((addr) => (
          <div
            key={addr.id}
            className="p-6 rounded-2xl border flex flex-col justify-between transition-shadow hover:shadow-md relative"
            style={{
              backgroundColor: 'var(--sf-surface)',
              borderColor: addr.isDefaultShipping ? 'var(--sf-primary)' : 'var(--sf-border)',
            }}
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span
                  className="font-bold text-sm flex items-center gap-2"
                  style={{ color: 'var(--sf-text)' }}
                >
                  <MapPin size={16} style={{ color: 'var(--sf-primary)' }} />
                  {addr.name}
                </span>
                {addr.isDefaultShipping && (
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: 'var(--sf-primary)',
                      color: 'var(--sf-text-inverse)',
                    }}
                  >
                    Default
                  </span>
                )}
              </div>

              <div className="text-sm space-y-1 mb-6" style={{ color: 'var(--sf-text-muted)' }}>
                <p className="font-medium" style={{ color: 'var(--sf-text)' }}>{addr.street}</p>
                <p>{addr.city}, {addr.state} {addr.postalCode}</p>
                <p>{addr.country}</p>
                <p className="text-xs pt-1">{addr.phone}</p>
              </div>
            </div>

            <div
              className="pt-4 border-t flex items-center justify-between gap-2"
              style={{ borderColor: 'var(--sf-border)' }}
            >
              {!addr.isDefaultShipping ? (
                <button
                  onClick={() => handleSetDefault(addr.id)}
                  className="text-xs font-semibold hover:underline"
                  style={{ color: 'var(--sf-primary)' }}
                >
                  Set as Default
                </button>
              ) : (
                <span
                  className="text-xs font-medium flex items-center gap-1"
                  style={{ color: 'var(--sf-success)' }}
                >
                  <CheckCircle2 size={13} /> Active Default
                </span>
              )}

              <div className="flex items-center gap-1">
                <button
                  onClick={() => handleDelete(addr.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors"
                  title="Delete address"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Address Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-lg rounded-2xl border p-6 shadow-2xl relative"
            style={{
              backgroundColor: 'var(--sf-bg)',
              borderColor: 'var(--sf-border)',
            }}
          >
            <div className="flex items-center justify-between mb-5">
              <h3
                className="text-lg font-bold"
                style={{ color: 'var(--sf-text)' }}
              >
                Add Delivery Address
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg hover:opacity-70"
                style={{ color: 'var(--sf-text-muted)' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleAddAddress} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--sf-text-muted)' }}>
                  Address Label (e.g. Home, Office)
                </label>
                <input
                  type="text"
                  placeholder="Home"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border outline-none"
                  style={{
                    backgroundColor: 'var(--sf-surface)',
                    borderColor: 'var(--sf-border)',
                    color: 'var(--sf-text)',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--sf-text-muted)' }}>
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  placeholder="123 Market St, Suite 400"
                  value={formStreet}
                  onChange={(e) => setFormStreet(e.target.value)}
                  className="w-full px-3.5 py-2 rounded-xl text-sm border outline-none"
                  style={{
                    backgroundColor: 'var(--sf-surface)',
                    borderColor: 'var(--sf-border)',
                    color: 'var(--sf-text)',
                  }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--sf-text-muted)' }}>
                    City
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="New York"
                    value={formCity}
                    onChange={(e) => setFormCity(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl text-sm border outline-none"
                    style={{
                      backgroundColor: 'var(--sf-surface)',
                      borderColor: 'var(--sf-border)',
                      color: 'var(--sf-text)',
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--sf-text-muted)' }}>
                    State / Region
                  </label>
                  <input
                    type="text"
                    placeholder="NY"
                    value={formState}
                    onChange={(e) => setFormState(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl text-sm border outline-none"
                    style={{
                      backgroundColor: 'var(--sf-surface)',
                      borderColor: 'var(--sf-border)',
                      color: 'var(--sf-text)',
                    }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--sf-text-muted)' }}>
                    Postal Code
                  </label>
                  <input
                    type="text"
                    placeholder="10001"
                    value={formZip}
                    onChange={(e) => setFormZip(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl text-sm border outline-none"
                    style={{
                      backgroundColor: 'var(--sf-surface)',
                      borderColor: 'var(--sf-border)',
                      color: 'var(--sf-text)',
                    }}
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--sf-text-muted)' }}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={formPhone}
                    onChange={(e) => setFormPhone(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl text-sm border outline-none"
                    style={{
                      backgroundColor: 'var(--sf-surface)',
                      borderColor: 'var(--sf-border)',
                      color: 'var(--sf-text)',
                    }}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2 pt-1 text-xs cursor-pointer font-medium" style={{ color: 'var(--sf-text)' }}>
                <input
                  type="checkbox"
                  checked={isDefault}
                  onChange={(e) => setIsDefault(e.target.checked)}
                  className="rounded text-indigo-600"
                />
                Set as default shipping address
              </label>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-lg hover:opacity-75"
                  style={{ color: 'var(--sf-text-muted)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="sf-btn-primary px-5 py-2 text-xs font-semibold"
                >
                  Save Address
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
