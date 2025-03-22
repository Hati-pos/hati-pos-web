'use client';

import FilterCard from '@/components/base/FilterCard';
import SortableCard from '@/components/base/SortableCard';
import useDraggableCategories from '@/lib/hooks/useDraggableCategories';
import InventoryIcon from '@mui/icons-material/Inventory';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import WidgetsTwoToneIcon from '@mui/icons-material/WidgetsTwoTone';
import { Box, Container, Grid } from '@mui/material';
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



export default function Stocks() {
  const [selectedCategory, setSelectedCategory] = useState("1");

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
  };

  const getActiveCategory = () => {
    if (!activeId) return null;
    const category = categories.find(category => category.id === activeId);
    console.log(`Getting active category for ID ${activeId}:`, category);
    return category;
  };

  return (
    <Box sx={{ p: 2 }}>
      <Container maxWidth="md">
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
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {categories.map((category) => (
                <Grid item xs={12} sm={6} md={3} key={category.id}>
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
      </Container>
    </Box>
  );
};
