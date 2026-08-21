"use client";

import React, { createContext, useState, useEffect } from 'react';

// Create context with default values
export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage if available, otherwise use system preference
  useEffect(() => {
    setMounted(true);
    
    try {
      // Check if we're in a browser environment
      if (typeof window === 'undefined') return;
      
      // Check if a theme preference is saved in localStorage
      const savedTheme = localStorage.getItem('theme');
      
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else if (window.matchMedia) {
        // If no saved preference, check system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        setIsDarkMode(prefersDark);
      }
    } catch (error) {
      console.log('Theme initialization error:', error);
      setIsDarkMode(false); // fallback to light mode
    }
  }, []);

  // Apply dark class to document element when theme changes
  useEffect(() => {
    if (!mounted || typeof window === 'undefined') return;
    
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
  }, [isDarkMode, mounted]);

  const toggleTheme = () => {
    try {
      if (typeof window === 'undefined') return;
      
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      
      // Update localStorage with the new theme preference
      localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.log('Theme toggle error:', error);
    }
  };

  // Don't render anything until mounted to avoid hydration mismatches
  if (!mounted) {
    return <div style={{ visibility: 'hidden' }}>{children}</div>;
  }

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 