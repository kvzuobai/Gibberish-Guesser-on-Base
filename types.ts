export type Puzzle = {
  gibberish: string;
  answer: string;
};

export type GameStatus = 'idle' | 'loading' | 'playing' | 'correct' | 'incorrect' | 'error';

export type Difficulty = 'easy' | 'medium' | 'hard';

export type PuzzleTheme = 'General' | 'Movies' | 'Science' | 'History';

export type GameStats = {
  gamesPlayed: number;
  gamesWon: number;
  currentStreak: number;
  longestStreak: number;
  score: number;
  highScore: number;
};