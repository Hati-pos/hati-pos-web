'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@/theme/ThemeProvider';

export default function StockTopBar() {
  const { mode, toggleTheme } = useTheme();

  const toggleMode = () => {
    toggleTheme();
  };

  return (
    <Box sx={{ 
      flexGrow: 1,
      display: 'flex',
      justifyContent: 'center',
      px: 2
    }}>
      <AppBar 
        position="static" 
        sx={{ 
          borderRadius: "20px", 
          margin: 2,
          width: '100%',
          maxWidth: '1200px'
        }} 
      >
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            News
          </Typography>
          {mode} mode
          <IconButton
            sx={{ ml: 1 }}
            color="inherit"
            onClick={toggleMode}
          >
            {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
