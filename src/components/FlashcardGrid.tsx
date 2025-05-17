import React from 'react';
import { Flashcard as FlashcardComponent } from './Flashcard';
import { Flashcard, FlashcardProgress } from '../types';

interface FlashcardGridProps {
  cards: Flashcard[];
  progress: FlashcardProgress;
  onMarkKnown: (id: string) => void;
  onMarkUnknown: (id: string) => void;
  onReset: (id: string) => void;
}

export function FlashcardGrid({ 
  cards, 
  progress, 
  onMarkKnown, 
  onMarkUnknown, 
  onReset 
}: FlashcardGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {cards.map(card => (
        <FlashcardComponent
          key={card.id}
          card={card}
          status={progress[card.id] || null}
          onMarkKnown={onMarkKnown}
          onMarkUnknown={onMarkUnknown}
          onReset={onReset}
        />
      ))}
    </div>
  );
}