'use client';

import { Box, Card, CardContent, CardMedia, Typography, Tooltip } from '@mui/material';
import React from 'react';

interface ProductCardProps {
  imageUrl: string;
  name: string;
  price: number;
  onClick?: () => void;
  selected?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({
  imageUrl,
  name,
  price,
  onClick,
  selected = false,
}) => {
  // Format price as currency
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(price);

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
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        width: '100%',
        maxWidth: { xs: '100%', sm: '100%', md: '100%' },
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          position: 'relative',
          height: '200px', // Fixed height
          width: '200px',
          overflow: 'hidden',
          borderTopLeftRadius: 8,
          borderTopRightRadius: 8,
        }}
      >
        <CardMedia
          component="img"
          image={imageUrl}
          alt={name}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </Box>
      <CardContent sx={{
        flexGrow: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        p: 2,
        pb: 2, // Override default padding bottom
        height: { xs: '100px', sm: '110px', md: '120px' }, // Consistent height across devices
      }}>
        <Box display="flex" flexDirection="column" alignItems="left" gap={1}>
          <Tooltip title={name} placement="top" arrow>
            <Typography
              variant="h6"
              component="div"
              align="left"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                lineHeight: 1.2,
                fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                fontWeight: 'bold',
                mb: 1,
                height: { xs: '38px', sm: '42px', md: '46px' },
              }}
            >
              {name}
            </Typography>
          </Tooltip>
          <Typography
            variant="body1"
            color="primary"
            align="left"
            fontWeight="bold"
            sx={{
              fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
              whiteSpace: 'nowrap',
            }}
          >
            {formattedPrice}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;

