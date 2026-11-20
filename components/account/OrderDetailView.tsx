'use client';
interface Props { orderId: string; }
export default function OrderDetailView({ orderId }: Props) {
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold mb-4" style={{ color: 'var(--sf-text)' }}>Order #{orderId}</h1>
      <p style={{ color: 'var(--sf-text-muted)' }}>Order details are loaded from the CMS backend.</p>
    </div>
  );
}
