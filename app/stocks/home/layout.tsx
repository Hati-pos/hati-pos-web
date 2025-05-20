import OrderSummary from "@/components/base/OrderSummary";
import StockTopBar from "@/components/base/StockTopBar";
import { Box } from '@mui/material';

export default function StocksLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      bgcolor: 'background.default'
    }}>
      <div className="grid grid-cols-3">
        <div className="col-span-2">
          <StockTopBar />
          <div className="col-span-1">{children}</div>
        </div>
        <div>
          <OrderSummary />
        </div>
      </div>
    </Box>
  );
}

