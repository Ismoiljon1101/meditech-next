import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme, Theme } from '@mui/material/styles';
import { light, dark } from '../../scss/MaterialTheme';
import { CssBaseline } from '@mui/material';

interface ThemeContextType {
    theme: Theme;
    toggleTheme: () => void;
    mode: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within a ThemeContextProvider');
    }
    return context;
};

interface ThemeContextProviderProps {
    children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
    const [mode, setMode] = useState<'light' | 'dark'>('light');
    const [theme, setTheme] = useState<Theme>(createTheme(light));

    useEffect(() => {
        const savedMode = localStorage.getItem('themeMode') as 'light' | 'dark';
        if (savedMode) {
            setMode(savedMode);
            setTheme(createTheme(savedMode === 'dark' ? (dark || light) : light));
        }
    }, []);

    const toggleTheme = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        setTheme(createTheme(newMode === 'dark' ? (dark || light) : light));
        localStorage.setItem('themeMode', newMode);
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, mode }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export default ThemeContextProvider;
