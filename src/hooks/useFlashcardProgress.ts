import { useState, useEffect } from 'react';
import { FlashcardProgress, ProgressStats, Flashcard } from '../types';

const LOCAL_STORAGE_KEY = 'flashcard-progress';

export function useFlashcardProgress(flashcards: Flashcard[]) {
  const [progress, setProgress] = useState<FlashcardProgress>(() => {
    try {
      const savedProgress = localStorage.getItem(LOCAL_STORAGE_KEY);
      return savedProgress ? JSON.parse(savedProgress) : {};
    } catch (error) {
      console.error('Failed to load progress from localStorage:', error);
      return {};
    }
  });

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(progress));
    } catch (error) {
      console.error('Failed to save progress to localStorage:', error);
    }
  }, [progress]);

  // Mark a flashcard as known
  const markAsKnown = (id: string) => {
    setProgress(prev => ({ ...prev, [id]: 'known' }));
  };

  // Mark a flashcard as unknown
  const markAsUnknown = (id: string) => {
    setProgress(prev => ({ ...prev, [id]: 'unknown' }));
  };

  // Reset progress for a specific flashcard
  const resetCard = (id: string) => {
    setProgress(prev => {
      const newProgress = { ...prev };
      delete newProgress[id];
      return newProgress;
    });
  };

  // Reset all progress
  const resetAllProgress = () => {
    setProgress({});
  };

  // Calculate progress statistics
  const getStats = (): ProgressStats => {
    const total = flashcards.length;
    const known = flashcards.filter(card => progress[card.id] === 'known').length;
    const unknown = flashcards.filter(card => progress[card.id] === 'unknown').length;
    const remaining = total - known - unknown;

    return {
      known,
      unknown,
      remaining,
      total
    };
  };

  return {
    progress,
    markAsKnown,
    markAsUnknown,
    resetCard,
    resetAllProgress,
    getStats
  };
}