import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Undo2 } from 'lucide-react';
import { Flashcard as FlashcardType } from '../types';

interface FlashcardProps {
  card: FlashcardType;
  status: 'known' | 'unknown' | null;
  onMarkKnown: (id: string) => void;
  onMarkUnknown: (id: string) => void;
  onReset: (id: string) => void;
}

export function Flashcard({ card, status, onMarkKnown, onMarkUnknown, onReset }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [showKeyboardHint, setShowKeyboardHint] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (status === null) {
        if (event.key === 'k') {
          onMarkKnown(card.id);
        } else if (event.key === 'l') {
          onMarkUnknown(card.id);
        } else if (event.key === 'f') {
          setIsFlipped(prev => !prev);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Show keyboard hint after 2 seconds of inactivity
    const timer = setTimeout(() => setShowKeyboardHint(true), 2000);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
    };
  }, [card.id, onMarkKnown, onMarkUnknown, status]);

  const handleFlip = () => {
    if (status === null) {
      setIsFlipped(!isFlipped);
      setShowKeyboardHint(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleFlip();
    }
  };

  const getStatusColor = () => {
    if (status === 'known') return 'bg-emerald-100 dark:bg-emerald-900/30 border-emerald-300 dark:border-emerald-700';
    if (status === 'unknown') return 'bg-rose-100 dark:bg-rose-900/30 border-rose-300 dark:border-rose-700';
    return 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700';
  };

  const variants = {
    front: { rotateY: 0 },
    back: { rotateY: 180 },
  };

  return (
    <div className={`relative ${status !== null ? 'pointer-events-none' : ''}`}>
      <div 
        className="h-48 sm:h-56 md:h-64 perspective-1000 cursor-pointer group" 
        onClick={handleFlip}
        onKeyPress={handleKeyPress}
        role="button"
        tabIndex={status === null ? 0 : -1}
        aria-label={`Flashcard: ${card.term}. Press Enter or Space to flip.`}
        aria-pressed={isFlipped}
      >
        <motion.div
          className={`relative w-full h-full rounded-xl shadow-md hover:shadow-lg preserve-3d will-change-transform ${getStatusColor()}`}
          initial="front"
          animate={isFlipped ? "back" : "front"}
          variants={variants}
          transition={{ 
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 1,
          }}
          style={{ transformStyle: "preserve-3d" }}
        >
          <AnimatePresence mode="wait">
            {/* Front side (Term) */}
            <motion.div 
              className="absolute w-full h-full backface-hidden border rounded-xl p-4 sm:p-6 flex flex-col justify-center items-center"
              style={{ 
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden"
              }}
            >
              <h3 className="text-xl sm:text-2xl font-bold text-center text-gray-800 dark:text-white">{card.term}</h3>
              <div className="flex flex-col items-center gap-1 mt-2 sm:mt-4">
                <p className="text-xs sm:text-sm text-center text-gray-500 dark:text-gray-400 opacity-70 group-hover:opacity-100 transition-opacity">
                  Click to flip
                </p>
                {showKeyboardHint && status === null && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-gray-400 dark:text-gray-500"
                  >
                    Press F to flip • K for Known • L for Learning
                  </motion.div>
                )}
              </div>
            </motion.div>
            
            {/* Back side (Definition) */}
            <motion.div 
              className="absolute w-full h-full backface-hidden border rounded-xl p-4 sm:p-6 flex flex-col justify-center items-center"
              style={{ 
                transform: "rotateY(180deg)",
                backfaceVisibility: "hidden",
                WebkitBackfaceVisibility: "hidden"
              }}
            >
              <p className="text-base sm:text-lg text-center text-gray-700 dark:text-gray-300">{card.definition}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Action buttons at the bottom */}
      {status === null ? (
        <div className="absolute -bottom-4 left-0 right-0 flex justify-center gap-2 sm:gap-3">
          <motion.button 
            onClick={() => onMarkKnown(card.id)}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-emerald-500 text-white font-medium text-xs sm:text-sm hover:bg-emerald-400 active:bg-emerald-600 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label={`Mark ${card.term} as known`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Check size={14} className="sm:w-4 sm:h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Know</span>
          </motion.button>
          <motion.button 
            onClick={() => onMarkUnknown(card.id)}
            className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-rose-500 text-white font-medium text-xs sm:text-sm hover:bg-rose-400 active:bg-rose-600 transform hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-rose-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label={`Mark ${card.term} as unknown`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <X size={14} className="sm:w-4 sm:h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Don't Know</span>
          </motion.button>
        </div>
      ) : (
        <div className="absolute top-2 right-2">
          <motion.button 
            onClick={() => onReset(card.id)}
            className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 hover:text-gray-900 dark:hover:text-white transform hover:scale-110 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            aria-label={`Reset progress for ${card.term}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <Undo2 size={14} className="sm:w-4 sm:h-4" aria-hidden="true" />
          </motion.button>
        </div>
      )}

      {/* Status badge */}
      {status && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`absolute top-2 left-2 py-1 px-2 sm:px-3 rounded-full text-xs font-semibold
            ${status === 'known' 
              ? 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-800 dark:text-emerald-300' 
              : 'bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-300'}`}
          role="status"
          aria-label={`Card status: ${status === 'known' ? 'Known' : 'Learning'}`}
        >
          {status === 'known' ? 'Known' : 'Learning'}
        </motion.div>
      )}
    </div>
  );
}