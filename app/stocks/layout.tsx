import OrderSummary from '@/components/base/OrderSummary';
import StockTopBar from '@/components/base/StockTopBar';

export default function StocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <StockTopBar />
      <div className="flex h-[calc(100vh-64px)]">
        {/* Main content area */}
        <div className="flex-1 p-4 overflow-auto">
          {children}
        </div>

        {/* Vertical divider */}
        <div className="w-px bg-gray-300" />
        {/* Order summary sidebar */}
        <div className="w-96 p-4 overflow-auto">
          <OrderSummary />
        </div>
      </div>
    </div>
  );
}

