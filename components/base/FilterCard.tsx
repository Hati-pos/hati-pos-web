'use client';

import React from 'react';
import { Card, CardContent, Typography, Box, SxProps, Theme } from '@mui/material';
import Icon from '@mui/material/Icon';

interface FilterCardProps {
  icon: React.ReactNode;
  name: string;
  count: number;
  selected?: boolean;
  onClick?: () => void;
  sx?: SxProps<Theme>;
}

const FilterCard: React.FC<FilterCardProps> = ({
  icon,
  name,
  count,
  selected = false,
  onClick,
  sx = {},
}) => {
  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'all 0.2s ease-in-out',
        borderRadius: 3,
        boxShadow: selected ? 5 : 1,
        border: selected ? '2px solid' : 'none',
        borderColor: 'primary.main',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 3,
        },
        ...sx,
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box display="flex" flexDirection="column" alignItems="left" gap={1}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: selected ? 'primary.light' : 'background.default',
              borderRadius: '50%',
              width: 15,
              height: 15,
              mb: 1,
            }}
          >
            {icon}
          </Box>
          <Typography variant="h6" component="div" align="left">
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
