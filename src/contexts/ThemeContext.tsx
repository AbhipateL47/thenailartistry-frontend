import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'berry' | 'peachy' | 'lavender' | 'mint';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  themes: { value: Theme; label: string; color: string }[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const themes = [
  { value: 'berry' as Theme, label: 'Berry Blush', color: 'rgb(221 44 108)' },
  { value: 'peachy' as Theme, label: 'Peachy Keen', color: 'rgb(255 152 0)' },
  { value: 'lavender' as Theme, label: 'Lavender Dreams', color: 'rgb(126 34 206)' },
  { value: 'mint' as Theme, label: 'Mint Fresh', color: 'rgb(34 197 94)' },
];

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme');
    return (saved as Theme) || 'berry';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove all theme classes
    themes.forEach(t => {
      if (t.value !== 'berry') {
        root.removeAttribute('data-theme');
      }
    });
    
    // Apply selected theme
    if (theme !== 'berry') {
      root.setAttribute('data-theme', theme);
    }
    
    localStorage.setItem('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
