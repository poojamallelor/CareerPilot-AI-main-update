"use client";

import { Moon, Sun } from 'lucide-react';
import { useContext, useState } from 'react';
import { ThemeContext } from './ThemeContext';

export function ThemeToggle({ showLabel = false }) {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <button
        onClick={toggleTheme}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={`p-2 rounded-full transition-colors flex items-center ${
          isDarkMode
            ? 'bg-gray-800 hover:bg-gray-700 text-amber-500'
            : 'bg-gray-100 hover:bg-gray-200 text-blue-600'
        }`}
        aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        {isDarkMode ? (
          <Sun size={20} className="text-amber-500" />
        ) : (
          <Moon size={20} className="text-blue-600" />
        )}

        {showLabel && (
          <span className={`ml-2 text-sm font-medium ${
            isDarkMode ? 'text-gray-300' : 'text-blue-600'
          }`}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </span>
        )}
      </button>

      {showTooltip && !showLabel && (
        <div className={`absolute bottom-full mb-2 px-2 py-1 text-xs font-medium rounded ${
          isDarkMode
            ? 'bg-gray-700 text-foreground'
            : 'bg-white text-gray-700 shadow-md'
        }`}>
          {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          <div className={`absolute top-full left-1/2 transform -translate-x-1/2 border-4 ${
            isDarkMode
              ? 'border-gray-700 border-b-transparent border-x-transparent'
              : 'border-white border-b-transparent border-x-transparent'
          }`}></div>
        </div>
      )}
    </div>
  );
}

export default ThemeToggle;
