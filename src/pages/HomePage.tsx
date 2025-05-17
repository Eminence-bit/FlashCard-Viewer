import React from 'react';
import { FlashcardGrid } from '../components/FlashcardGrid';
import { flashcards } from '../data/flashcards';
import { useFlashcardProgress } from '../hooks/useFlashcardProgress';

export function HomePage() {
  const { 
    progress, 
    markAsKnown, 
    markAsUnknown, 
    resetCard, 
    resetAllProgress,
    getStats 
  } = useFlashcardProgress(flashcards);
  
  const stats = getStats();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">Flashcards</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          Click on cards to flip them and mark your progress.
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300">
              Known: {stats.known}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-rose-100 text-rose-800 dark:bg-rose-900/50 dark:text-rose-300">
              Learning: {stats.unknown}
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
              Not Started: {stats.remaining}
            </span>
          </div>
          
          {(stats.known > 0 || stats.unknown > 0) && (
            <button
              onClick={resetAllProgress}
              className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Reset All
            </button>
          )}
        </div>
      </div>
      
      <FlashcardGrid
        cards={flashcards}
        progress={progress}
        onMarkKnown={markAsKnown}
        onMarkUnknown={markAsUnknown}
        onReset={resetCard}
      />
    </div>
  );
}