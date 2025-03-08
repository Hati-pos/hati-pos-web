'use client';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

// Define color palette options
export const getDesignTokens = (mode: PaletteMode) => ({
palette: {
    mode,
    primary: {
    main: '#1976d2',
    light: '#42a5f5',
    dark: '#1565c0',
    contrastText: '#fff',
    },
    secondary: {
    main: '#9c27b0',
    light: '#ba68c8',
    dark: '#7b1fa2',
    contrastText: '#fff',
    },
    background: {
    default: mode === 'light' ? '#f5f5f5' : '#121212',
    paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
    },
    text: {
    primary: mode === 'light' ? 'rgba(0, 0, 0, 0.87)' : 'rgba(255, 255, 255, 0.87)',
    secondary: mode === 'light' ? 'rgba(0, 0, 0, 0.6)' : 'rgba(255, 255, 255, 0.6)',
    },
},
typography: {
    fontFamily: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    '"Segoe UI"',
    'Roboto',
    '"Helvetica Neue"',
    'Arial',
    'sans-serif',
    ].join(','),
    h1: {
    fontWeight: 700,
    },
    h2: {
    fontWeight: 600,
    },
    h3: {
    fontWeight: 600,
    },
    h4: {
    fontWeight: 600,
    },
    h5: {
    fontWeight: 500,
    },
    h6: {
    fontWeight: 500,
    },
    button: {
    textTransform: 'none' as const,
    fontWeight: 500,
    },
},
shape: {
    borderRadius: 8,
},
components: {
    MuiButton: {
    styleOverrides: {
        root: {
        borderRadius: 8,
        boxShadow: 'none',
        '&:hover': {
            boxShadow: 'none',
        },
        },
        sizeLarge: {
        height: 48,
        },
    },
    },
    MuiCard: {
    styleOverrides: {
        root: {
        borderRadius: 12,
        boxShadow: mode === 'light' 
            ? '0px 2px 4px rgba(0, 0, 0, 0.05), 0px 4px 6px rgba(0, 0, 0, 0.05)'
            : '0px 2px 4px rgba(0, 0, 0, 0.2), 0px 4px 6px rgba(0, 0, 0, 0.2)',
        },
    },
    },
},
});

// Create the theme instance
let theme = createTheme(getDesignTokens('dark'));

// Apply responsive font sizes
theme = responsiveFontSizes(theme);

export default theme;

