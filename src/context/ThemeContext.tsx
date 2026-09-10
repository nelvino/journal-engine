'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useStorage } from '@/lib/useStorage';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  effectiveTheme: 'light' | 'dark';
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const storage = useStorage();
  const [theme, setThemeState] = useState<Theme>('light');
  const [effectiveTheme, setEffectiveTheme] = useState<'light' | 'dark'>('light');
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    storage.get<Theme>('theme').then((saved) => {
      if (saved) {
        setThemeState(saved);
      }
      setInitialized(true);
    });
  }, [storage]);

  useEffect(() => {
    const resolvedTheme =
      theme === 'system'
        ? window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        : theme;

    setEffectiveTheme(resolvedTheme);
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(resolvedTheme);
    if (initialized) {
      storage.set('theme', theme);
    }
  }, [theme, storage, initialized]);

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, effectiveTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
