'use client';
import Link from 'next/link';
import { useState } from 'react';
export default function ForgotPasswordView() {
  const [email, setEmail] = useState('');
  return (
    <div className="w-full max-w-sm">
      <h1 className="text-2xl font-bold mb-2 text-center" style={{ color: 'var(--sf-text)', fontFamily: 'var(--sf-heading-font)' }}>Reset Password</h1>
      <p className="text-sm text-center mb-6" style={{ color: 'var(--sf-text-muted)' }}>Enter your email and we'll send you a reset link.</p>
      <form className="flex flex-col gap-4" onSubmit={e => e.preventDefault()}>
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="px-4 py-3 rounded-lg text-sm outline-none" style={{ border: '1px solid var(--sf-border)', color: 'var(--sf-text)', backgroundColor: 'var(--sf-bg)' }} />
        <button type="submit" className="sf-btn-primary w-full">Send Reset Link</button>
      </form>
      <p className="text-sm text-center mt-4" style={{ color: 'var(--sf-text-muted)' }}><Link href="/auth/login" style={{ color: 'var(--sf-primary)' }}>Back to Sign In</Link></p>
    </div>
  );
}
