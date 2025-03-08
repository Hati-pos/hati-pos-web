import StockTopBar from '@/components/base/StockTopBar';

export default function StocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <StockTopBar />
        {children}
      </main>
    </div>
  );
}
