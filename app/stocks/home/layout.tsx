import OrderSummary from "@/components/base/OrderSummary";
import StockTopBar from "@/components/base/StockTopBar";

export default function StocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <StockTopBar />
          <div className="col-span-1">{children}</div>
        </div>
        <div>
          <OrderSummary />
        </div>

      </div>
    </div>
  );
}

