'use client';
import React, { createContext, useContext, useState, useCallback } from 'react';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast { id: string; message: string; type: ToastType; }

interface ToastContextValue {
  toasts: Toast[];
  show: (message: string, type?: ToastType) => void;
  dismiss: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const show = useCallback((message: string, type: ToastType = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 4000);
  }, []);
  const dismiss = useCallback((id: string) => setToasts(prev => prev.filter(t => t.id !== id)), []);
  return (
    <ToastContext.Provider value={{ toasts, show, dismiss }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
        {toasts.map(toast => (
          <div key={toast.id} className="pointer-events-auto px-4 py-3 rounded-lg shadow-lg text-sm font-medium text-white max-w-sm"
            style={{ backgroundColor: toast.type === 'success' ? 'var(--sf-success)' : toast.type === 'error' ? 'var(--sf-error)' : toast.type === 'warning' ? 'var(--sf-warning)' : 'var(--sf-info)' }}>
            {toast.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
