/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Box, Card, CardContent, SxProps, Theme, Typography } from '@mui/material';
import React from 'react';

interface FilterCardProps {
  icon: React.ReactNode;
  name: string;
  count: number;
  selected?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
  id?: string;
  isDragging?: boolean;
  setNodeRef?: (element: HTMLElement | null) => void;
  listeners?: any;
  attributes?: any;
}

const FilterCard: React.FC<FilterCardProps> = ({
  icon,
  name,
  count,
  selected = false,
  onClick,
  sx = {},
  isDragging = false,
  setNodeRef,
  listeners,
  attributes,
}) => {
  return (
    <Card
      ref={setNodeRef}
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        borderRadius: 3,
        boxShadow: selected ? 5 : 1,
        border: selected ? '2px solid' : 'none',
        borderColor: 'primary.main',
        minWidth: 150,
        maxWidth: 200,
        minHeight: 70,
        maxHeight: 120,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
        opacity: isDragging ? 0.6 : 1,
        ...sx,
      }}
      onClick={onClick}
      {...attributes}
      {...listeners}
    >
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="left" gap={1}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              width: 15,
              height: 15,
              mb: 1,
            }}
          >
            {icon}
          </Box>
          <Typography variant="body1" component="div" align="left">
            {name}
          </Typography>
          <Typography variant="body2" color="text.secondary" align="left">
            {count} {count === 1 ? 'item' : 'items'}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default FilterCard;
