'use client';

import * as React from 'react';
import { Box, Card, CardContent, Typography, Divider, Grid } from '@mui/material';

interface OrderSummaryProps {
  subtotal?: number;
  shipping?: number;
  tax?: number;
  total?: number;
  items?: Array<{
    id: string;
    name: string;
    quantity: number;
    price: number;
  }>;
}

const formatCurrency = (value: number) => 
  new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(value);

const OrderSummary: React.FC<OrderSummaryProps> = ({
  subtotal = 199000,
  shipping = 15000,
  tax = 19900,
  total = 233900,
  items = [
    { id: "1", name: "Product A", quantity: 2, price: 75000 },
    { id: "2", name: "Product B", quantity: 1, price: 49000 }
  ]
}) => {
  return (
    <Card sx={{ borderRadius: 0, height: '100vh' }} elevation={2}>
      <CardContent>
        <Typography variant="h6" component="h2" gutterBottom>
          Order Summary
        </Typography>

        {items.length > 0 && (
          <>
            <Box sx={{ mb: 2 }}>
              {items.map(({ id, name, quantity, price }) => (
                <Grid container key={id} sx={{ mb: 1 }}>
                  <Grid item xs={7}>
                    <Typography variant="body2">
                      {name} x{quantity}
                    </Typography>
                  </Grid>
                  <Grid item xs={5} sx={{ textAlign: 'right' }}>
                    <Typography variant="body2">
                      {formatCurrency(price * quantity)}
                    </Typography>
                  </Grid>
                </Grid>
              ))}
            </Box>
            <Divider sx={{ my: 2 }} />
          </>
        )}

        <Grid container spacing={1}>
          {[
            { label: 'Subtotal', value: subtotal },
            { label: 'Shipping', value: shipping },
            { label: 'Tax', value: tax }
          ].map(({ label, value }) => (
            <React.Fragment key={label}>
              <Grid item xs={7}>
                <Typography variant="body2">{label}</Typography>
              </Grid>
              <Grid item xs={5} sx={{ textAlign: 'right' }}>
                <Typography variant="body2">{formatCurrency(value)}</Typography>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Grid container>
          <Grid item xs={7}>
            <Typography variant="subtitle1" fontWeight="bold">Total</Typography>
          </Grid>
          <Grid item xs={5} sx={{ textAlign: 'right' }}>
            <Typography variant="subtitle1" fontWeight="bold">
              {formatCurrency(total)}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default OrderSummary;
