'use client';

import React, { createContext, useState, useMemo, useContext } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { PaletteMode, CssBaseline } from '@mui/material';
import { getDesignTokens } from '@/theme/theme';

// Define type for theme context
type ThemeContextType = {
    mode: PaletteMode;
    toggleTheme: () => void;
};

// Create theme context with default values
const ThemeContext = createContext<ThemeContextType>({
    mode: 'light',
    toggleTheme: () => { },
});

// Custom hook to use theme context
export const useTheme = () => useContext(ThemeContext);

interface ThemeProviderProps {
    children: React.ReactNode;
}

// Theme Provider component
export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
    // State to hold current theme mode
    const [mode, setMode] = useState<PaletteMode>('light'); // default mode

    // Function to toggle theme
    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    // Create theme with current mode
    const theme = useMemo(() => {
        const newTheme = createTheme(getDesignTokens(mode));
        return newTheme;
    }, [mode]);

    // Context value
    const contextValue = useMemo(() => {
        return {
            mode,
            toggleTheme,
        };
    }, [mode]);

    return (
        <ThemeContext.Provider value={contextValue}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeProvider;

