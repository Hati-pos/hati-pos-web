'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import DragHandleRoundedIcon from '@mui/icons-material/DragHandleRounded';
import DateRangeOutlinedIcon from '@mui/icons-material/DateRangeOutlined';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@/theme/ThemeProvider';
import dayjs from 'dayjs';
dayjs().format()

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
      width: '100%',
      height: "100px",
      padding: '10px'
    }}>
      <AppBar
        position="static"
        sx={{
          borderRadius: "20px",
          width: '100%'
        }}
      >
        <Toolbar style={{ flexGrow: 1 }}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <DragHandleRoundedIcon />
          </IconButton>
          <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }} >
            <DateRangeOutlinedIcon sx={{ fontSize: '18px' }} />
            <Box
              component="span"
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                ml: 1,
                fontSize: '14px'
              }}
            >
              {dayjs().format('ddd , DD MMM YYYY')}
            </Box>
          </div>
          <IconButton
            sx={{ ml: 1 }}
            color="inherit"
            onClick={toggleMode}
          >
            {mode === 'dark' ? <Brightness4Icon /> : <Brightness7Icon />}
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
