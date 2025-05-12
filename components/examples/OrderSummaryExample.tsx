'use client';

import React from 'react';
import OrderSummary from '../base/OrderSummary';

export default function OrderSummaryExample() {
  // Example order data
  const orderData = {
    items: [
      {
        id: '1',
        name: 'Nasi Goreng Special',
        quantity: 2,
        price: 25000
      },
      {
        id: '2',
        name: 'Es Teh Manis',
        quantity: 1,
        price: 5000
      },
      {
        id: '3',
        name: 'Kentang Goreng',
        quantity: 1,
        price: 15000
      }
    ],
    subtotal: 70000, // Sum of all items (2x25000 + 5000 + 15000)
    shipping: 10000,
    tax: 7000, // 10% of subtotal
    total: 87000 // subtotal + shipping + tax
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto' }}>
      <OrderSummary
        items={orderData.items}
        subtotal={orderData.subtotal}
        shipping={orderData.shipping}
        tax={orderData.tax}
        total={orderData.total}
      />
    </div>
  );
} 