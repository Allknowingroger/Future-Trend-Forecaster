import React from 'react';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface HeaderProps {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

export const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-10 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex-1"></div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 text-center flex-1">
          Future Trend <span className="text-cyan-400">Forecaster</span>
        </h1>
        <div className="flex-1 flex justify-end">
            <button
                onClick={toggleTheme}
                className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-50 dark:focus:ring-offset-gray-900 focus:ring-cyan-500 transition-colors duration-200"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? (
                    <SunIcon className="w-6 h-6 text-yellow-400" />
                ) : (
                    <MoonIcon className="w-6 h-6 text-indigo-500" />
                )}
            </button>
        </div>
      </div>
    </header>
  );
};