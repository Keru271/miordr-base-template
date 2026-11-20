export const dynamic = 'force-dynamic';
export default function MaintenancePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center" style={{ backgroundColor: 'var(--sf-bg)' }}>
      <div className="text-center px-4">
        <div className="text-6xl mb-6">🛠️</div>
        <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--sf-text)' }}>We'll Be Right Back</h1>
        <p className="text-lg" style={{ color: 'var(--sf-text-muted)' }}>Our store is undergoing maintenance. We appreciate your patience.</p>
      </div>
    </div>
  );
}
