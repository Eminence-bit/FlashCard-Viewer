import React from 'react';
import { ProgressChart } from '../components/ProgressChart';
import { flashcards } from '../data/flashcards';
import { useFlashcardProgress } from '../hooks/useFlashcardProgress';

export function SummaryPage() {
  const { getStats, resetAllProgress } = useFlashcardProgress(flashcards);
  const stats = getStats();

  const completedPercentage = Math.round((stats.known / stats.total) * 100);
  const learningPercentage = Math.round((stats.unknown / stats.total) * 100);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Your Progress</h1>
        <p className="text-gray-600 dark:text-gray-300">
          Track your learning progress and see how you're doing.
        </p>
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/50 rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-1">{stats.total}</div>
            <div className="text-indigo-700 dark:text-indigo-300">Total Cards</div>
          </div>
          
          <div className="bg-emerald-50 dark:bg-emerald-900/50 rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-emerald-600 dark:text-emerald-400 mb-1">{stats.known}</div>
            <div className="text-emerald-700 dark:text-emerald-300">Mastered</div>
          </div>
          
          <div className="bg-rose-50 dark:bg-rose-900/50 rounded-lg p-4 text-center">
            <div className="text-4xl font-bold text-rose-600 dark:text-rose-400 mb-1">{stats.unknown}</div>
            <div className="text-rose-700 dark:text-rose-300">Still Learning</div>
          </div>
        </div>
        
        <ProgressChart stats={stats} />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">Learning Summary</h2>
        
        <div className="space-y-4">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">Mastered</span>
              <span className="text-sm font-medium text-emerald-700 dark:text-emerald-300">{completedPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-emerald-500 h-2.5 rounded-full" 
                style={{ width: `${completedPercentage}%` }}
              ></div>
            </div>
          </div>
          
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-rose-700 dark:text-rose-300">Still Learning</span>
              <span className="text-sm font-medium text-rose-700 dark:text-rose-300">{learningPercentage}%</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
              <div 
                className="bg-rose-500 h-2.5 rounded-full" 
                style={{ width: `${learningPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
        
        {(stats.known > 0 || stats.unknown > 0) && (
          <div className="mt-6 text-center">
            <button
              onClick={resetAllProgress}
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 transition-colors"
            >
              Reset All Progress
            </button>
          </div>
        )}
      </div>
    </div>
  );
}