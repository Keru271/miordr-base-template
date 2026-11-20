'use client';
import Link from 'next/link';
import { useState } from 'react';
export default function SignupView() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>Create Account</h1>
      <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
        <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} className="px-4 py-3 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--sf-border)', color: 'var(--sf-text)', backgroundColor: 'var(--sf-bg)' }} />
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="px-4 py-3 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--sf-border)', color: 'var(--sf-text)', backgroundColor: 'var(--sf-bg)' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="px-4 py-3 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--sf-border)', color: 'var(--sf-text)', backgroundColor: 'var(--sf-bg)' }} />
        <button type="submit" className="sf-btn-primary w-full">Create Account</button>
      </form>
      <p className="text-sm text-center mt-4" style={{ color: 'var(--sf-text-muted)' }}>Already have an account? <Link href="/auth/login" style={{ color: 'var(--sf-primary)' }}>Sign In</Link></p>
    </div>
  );
}
