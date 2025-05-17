import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, BookOpen, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';

export function NavBar() {
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();
  
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
          <BookOpen size={24} />
          <span>FlashLearn</span>
        </Link>
        
        <div className="flex items-center space-x-1">
          <Link
            to="/"
            className={`px-4 py-2 rounded-md flex items-center gap-1 ${
              location.pathname === '/' 
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50 font-medium' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <BookOpen size={18} />
            <span>Cards</span>
          </Link>
          
          <Link
            to="/summary"
            className={`px-4 py-2 rounded-md flex items-center gap-1 ${
              location.pathname === '/summary' 
                ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/50 font-medium' 
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
            }`}
          >
            <BarChart2 size={18} />
            <span>Progress</span>
          </Link>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-md text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </nav>
  );
}