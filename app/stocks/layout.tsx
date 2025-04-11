import StockTopBar from '@/components/base/StockTopBar';

export default function StocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <main >
        <StockTopBar />
        {children}
      </main>
    </div>
  );
}
