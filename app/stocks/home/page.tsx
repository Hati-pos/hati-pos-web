'use client';

import FilterCard from '@/components/base/FilterCard';
import ProductCard from '@/components/base/ProductCard';
import SortableCard from '@/components/base/SortableCard';
import useDraggableCategories from '@/lib/hooks/useDraggableCategories';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import WidgetsTwoToneIcon from '@mui/icons-material/WidgetsTwoTone';
import { Box, Container, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import {
  closestCenter,
  DndContext,
  DragOverlay,
} from '@dnd-kit/core';
import { SortableContext, horizontalListSortingStrategy } from '@dnd-kit/sortable'; // Updated import

// Mock data for filter categories
const initialFilterCategories = [
  {
    id: "1",
    name: 'All Products',
    count: 120,
    icon: <WidgetsTwoToneIcon color="primary" />,
  },
  {
    id: "2",
    name: 'In Transit',
    count: 15,
    icon: <LocalShippingIcon color="primary" />,
  },
  {
    id: "3",
    name: 'Low Stock',
    count: 8,
    icon: <InventoryIcon color="primary" />,
  },
  {
    id: "4",
    name: 'Warehouse',
    count: 42,
    icon: <WarehouseIcon color="primary" />,
  },
];

// Mock data for products
const mockProducts = [
  {
    id: '1',
    name: 'ThinkPad X1',
    price: 15000000,
    imageUrl: 'https://picsum.photos/id/1/300/200',
    category: '1', // All Products
  },
  {
    id: '2',
    name: 'Keyboard',
    price: 1200000,
    imageUrl: 'https://picsum.photos/id/2/300/200',
    category: '1', // All Products
  },
  {
    id: '3',
    name: 'Wireless Mouse',
    price: 350000,
    imageUrl: 'https://picsum.photos/id/3/300/200',
    category: '1', // All Products
  },
  {
    id: '4',
    name: 'USB-C Dock',
    price: 2500000,
    imageUrl: 'https://picsum.photos/id/4/300/200',
    category: '1', // All Products
  },
  {
    id: '5',
    name: 'Monitor 27"',
    price: 3200000,
    imageUrl: 'https://picsum.photos/id/5/300/200',
    category: '1', // All Products
  },
  {
    id: '6',
    name: 'Headphones',
    price: 1800000,
    imageUrl: 'https://picsum.photos/id/6/300/200',
    category: '1', // All Products
  },
  {
    id: '7',
    name: 'SSD 1TB',
    price: 1500000,
    imageUrl: 'https://picsum.photos/id/7/300/200',
    category: '3', // Low Stock
  },
  {
    id: '8',
    name: 'Router Wifi 6',
    price: 980000,
    imageUrl: 'https://picsum.photos/id/8/300/200',
    category: '2', // In Transit
  },
  {
    id: '9',
    name: 'Desk Lamp',
    price: 250000,
    imageUrl: 'https://picsum.photos/id/9/300/200',
    category: '4', // Warehouse
  },
  {
    id: '10',
    name: 'Office Chair',
    price: 1750000,
    imageUrl: 'https://picsum.photos/id/10/300/200',
    category: '4', // Warehouse
  },
  {
    id: '11',
    name: 'Tablet Pro',
    price: 8500000,
    imageUrl: 'https://picsum.photos/id/11/300/200',
    category: '2', // In Transit
  },
  {
    id: '12',
    name: 'Bluetooth Speaker',
    price: 650000,
    imageUrl: 'https://picsum.photos/id/12/300/200',
    category: '3', // Low Stock
  },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [selectedProduct, setSelectedProduct] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  const {
    categories,
    activeId,
    sensors,
    handleDragStart,
    handleDragEnd
  } = useDraggableCategories({
    initialCategories: initialFilterCategories
  });

  useEffect(() => {
    console.log("Categories updated:", categories);
  }, [categories]);

  const handleCategorySelect = (categoryId: string) => {
    console.log("Category selected:", categoryId);
    setSelectedCategory(categoryId);
    setSelectedProduct(null); // Reset product selection when changing category

    // Filter products based on selected category
    if (categoryId === "1") {
      // "All Products" category
      setFilteredProducts(mockProducts);
    } else {
      setFilteredProducts(mockProducts.filter(product => product.category === categoryId));
    }
  };

  const handleProductSelect = (productId: string) => {
    setSelectedProduct(productId === selectedProduct ? null : productId);
  };

  const getActiveCategory = () => {
    if (!activeId) return null;
    const category = categories.find(category => category.id === activeId);
    console.log(`Getting active category for ID ${activeId}:`, category);
    return category;
  };

  // Initial filtering on component mount
  useEffect(() => {
    handleCategorySelect(selectedCategory);
  }, []);

  return (
    <Box sx={{
      p: { xs: 1, sm: 2, md: 3 },
      bgcolor: 'background.default',
      minHeight: '100vh'
    }}>
      <Container maxWidth="xl" sx={{ px: { xs: 1, sm: 2, md: 3 } }}>
        {/* Filter categories */}
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={categories.map(cat => cat.id)}
            strategy={horizontalListSortingStrategy}
          >
            <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 3, sm: 4 } }}>
              {categories.map((category) => (
                <Grid item xs={6} sm={6} md={3} lg={3} key={category.id}>
                  <SortableCard
                    id={category.id.toString()}
                    name={category.name}
                    count={category.count || 0}
                    icon={category.icon}
                    selected={selectedCategory === category.id}
                    onClick={() => handleCategorySelect(category.id.toString())}
                  />
                </Grid>
              ))}
            </Grid>
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <FilterCard
                id={activeId.toString()}
                name={getActiveCategory()?.name || ''}
                count={getActiveCategory()?.count || 0}
                icon={getActiveCategory()?.icon}
                selected={selectedCategory === activeId}
              />
            ) : null}
          </DragOverlay>
        </DndContext>


        {/* Products Grid Section */}
        <Box sx={{ mt: { xs: 3, sm: 4 } }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: { xs: 2, sm: 3 },
              fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' }
            }}
          >
            {categories.find(cat => cat.id === selectedCategory)?.name || 'All Products'}
            <Typography component="span" color="text.secondary" sx={{ ml: 1 }}>
              ({filteredProducts.length} items)
            </Typography>
          </Typography>

          <Grid
            container
            spacing={{ xs: 2, sm: 2, md: 3 }}
            sx={{
              '& .MuiGrid-item': {
                display: 'flex',
              }
            }}
          >
            {filteredProducts.map((product) => (
              <Grid item xs={6} sm={4} md={3} lg={2.4} xl={2} key={product.id}>
                <ProductCard
                  imageUrl={product.imageUrl}
                  name={product.name}
                  price={product.price}
                  selected={selectedProduct === product.id}
                  onClick={() => handleProductSelect(product.id)}
                />
              </Grid>
            ))}

            {filteredProducts.length === 0 && (
              <Grid item xs={12}>
                <Box
                  sx={{
                    p: { xs: 3, sm: 4 },
                    textAlign: 'center',
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    boxShadow: 1,
                    mt: 2
                  }}
                >
                  <Typography variant="h6" color="text.secondary">
                    No products found in this category
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>
      </Container>
    </Box>
  )
};
