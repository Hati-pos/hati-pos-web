"use client";
import { useState, useCallback } from 'react';
import {
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent, UniqueIdentifier
} from '@dnd-kit/core';
import {
  sortableKeyboardCoordinates,
  arrayMove
} from '@dnd-kit/sortable';

interface Category {
  id: UniqueIdentifier;
  name: string;
  count?: number;
  icon?: React.ReactNode;
}
interface UseDraggableCategoriesProps {
  initialCategories: Category[];
}

interface UseDraggableCategoriesReturn {
  categories: Category[];
  activeId: UniqueIdentifier | null;
  sensors: ReturnType<typeof useSensors>;
  handleDragStart: (event: DragStartEvent) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  handleDragCancel: () => void;
}

export const useDraggableCategories = ({
  initialCategories,
}: UseDraggableCategoriesProps): UseDraggableCategoriesReturn => {
  // State to track the order of categories
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  
  // State to track the currently active (dragging) item
  const [activeId, setActiveId] = useState<UniqueIdentifier | null>(null);
  
  // Set up sensors for keyboard and pointer interaction
  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Increased activation distance to make it easier to start dragging
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle the start of a drag operation
  const handleDragStart = useCallback((event: DragStartEvent) => {
    setActiveId(event.active.id);
  }, []);

  // Handle the end of a drag operation
  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setCategories((items) => {
        // Find the indices of the active and over items
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        
        // Move the array item from oldIndex to newIndex
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    
    // Reset the active id
    setActiveId(null);
  }, []);

  // Handle canceling a drag operation
  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  return {
    categories,
    activeId,
    sensors,
    handleDragStart,
    handleDragEnd,
    handleDragCancel,
  };
};

export default useDraggableCategories;

