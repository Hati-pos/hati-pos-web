'use client';

import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Container } from '@mui/material';
import WidgetsTwoToneIcon from '@mui/icons-material/WidgetsTwoTone';
import FilterCard from '@/components/base/FilterCard';
import SortableCard from '@/components/base/SortableCard';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import InventoryIcon from '@mui/icons-material/Inventory';
import WarehouseIcon from '@mui/icons-material/Warehouse';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  DragMoveEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

// Mock data for filter categories
let initialFilterCategories = [
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
  const [categories, setCategories] = useState(initialFilterCategories);
  const [selectedCategory, setSelectedCategory] = useState("1");
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    console.log("Categories updated:", categories);
  }, [categories]);

  const handleCategorySelect = (categoryId: string) => {
    console.log("Category selected:", categoryId);
    setSelectedCategory(categoryId);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    console.log(`Drag start:`, active);
    console.log(`Active ID:`, active.id, `Type:`, typeof active.id);
    setActiveId(active.id.toString());
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    console.log(`Drag end:`, active, over);
    console.log(`Active ID:`, active.id, `Type:`, typeof active.id);
    console.log(`Over ID:`, over?.id, `Type:`, over ? typeof over.id : 'null');

    if (over && active.id !== over.id) {
      setCategories((items) => {
        const activeId = active.id.toString();
        const overId = over.id.toString();

        const oldIndex = items.findIndex((item) => item.id === activeId);
        const newIndex = items.findIndex((item) => item.id === overId);

        console.log(`Moving from index ${oldIndex} to ${newIndex}`);
        console.log(`Active item:`, items[oldIndex]);
        console.log(`Target item:`, items[newIndex]);

        if (oldIndex === -1 || newIndex === -1) {
          console.error(`Could not find items with IDs: active=${activeId}, over=${overId}`);
          console.log(`Available IDs:`, items.map(item => `${item.id} (${typeof item.id})`));
          return items;
        }

        return arrayMove(items, oldIndex, newIndex);
      });
    } else {
      console.log("No valid drop target or same position");
    }

    setActiveId(null);
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
            // strategy={horizontalListSortingStrategy}
          >
            <Grid container spacing={3} sx={{ mb: 4 }}>
              {categories.map((category) => (
                <Grid item xs={12} sm={6} md={3} key={category.id}>
                  <SortableCard
                    id={category.id}
                    name={category.name}
                    count={category.count}
                    icon={category.icon}
                    selected={selectedCategory === category.id}
                    onClick={() => handleCategorySelect(category.id)}
                  />
                </Grid>
              ))}
            </Grid>
          </SortableContext>

          <DragOverlay>
            {activeId ? (
              <FilterCard
                id={activeId}
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
