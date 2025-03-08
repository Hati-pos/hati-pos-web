'use client';

import React, { useState } from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import FilterCard from '@/components/base/FilterCard';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import WidgetsTwoToneIcon from '@mui/icons-material/WidgetsTwoTone';

// Mock data for filter categories
const filterCategories = [
  {
    id: 1,
    name: 'All Products',
    count: 120,
    icon: <WidgetsTwoToneIcon color="primary" />,
  },
  {
    id: 2,
    name: 'In Transit',
    count: 15,
    icon: <LocalShippingIcon color="primary" />,
  },
  {
    id: 3,
    name: 'Low Stock',
    count: 8,
    icon: <InventoryIcon color="primary" />,
  },
  {
    id: 4,
    name: 'Warehouse',
    count: 42,
    icon: <WarehouseIcon color="primary" />,
  },
];



export default function Stocks() {
  const [selectedCategory, setSelectedCategory] = useState(1);

  const handleCategorySelect = (categoryId: number) => {
    setSelectedCategory(categoryId);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Container maxWidth="md">
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {filterCategories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.id}>
              <FilterCard
                name={category.name}
                count={category.count}
                icon={category.icon}
                selected={selectedCategory === category.id}
                onClick={() => handleCategorySelect(category.id)}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};