export interface Flashcard {
  id: string;
  term: string;
  definition: string;
}

export interface FlashcardProgress {
  [key: string]: 'known' | 'unknown' | null;
}

export interface ProgressStats {
  known: number;
  unknown: number;
  remaining: number;
  total: number;
}