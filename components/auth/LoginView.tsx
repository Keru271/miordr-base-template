'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function LoginView() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold mb-6 text-center" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>Sign In</h1>
      <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)}
          className="px-4 py-3 rounded-lg text-sm outline-none w-full" style={{ border: '1px solid var(--sf-border)', color: 'var(--sf-text)', backgroundColor: 'var(--sf-bg)' }} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)}
          className="px-4 py-3 rounded-lg text-sm outline-none w-full" style={{ border: '1px solid var(--sf-border)', color: 'var(--sf-text)', backgroundColor: 'var(--sf-bg)' }} />
        <button type="submit" className="sf-btn-primary w-full">Sign In</button>
      </form>
      <p className="text-sm text-center mt-4" style={{ color: 'var(--sf-text-muted)' }}>
        Don't have an account? <Link href="/auth/signup" style={{ color: 'var(--sf-primary)' }}>Sign Up</Link>
      </p>
    </div>
  );
}
