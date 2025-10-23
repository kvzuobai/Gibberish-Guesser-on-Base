import React, { useState, useEffect, useRef, useCallback } from 'react';

// Type Imports
import { Puzzle, GameStatus, Difficulty, GameStats, PuzzleTheme } from './types';

// Service Imports
import { getGibberishPuzzle, getHintForAnswer } from './services/geminiService';
import { SoundManager } from './services/SoundManager';

// Component Imports
import Header from './components/Header';
import GameBoard from './components/GameBoard';
import ConnectWalletButton from './components/ConnectWalletButton';
import Loader from './components/Loader';
import Toast from './components/Toast';
import Confetti from './components/Confetti';
import TutorialOverlay from './components/TutorialOverlay';
import EasterEgg from './components/EasterEgg';

const initialStats: GameStats = {
  gamesPlayed: 0,
  gamesWon: 0,
  currentStreak: 0,
  longestStreak: 0,
  score: 0,
  highScore: 0,
};

const normalizeString = (str: string) => str.toLowerCase().replace(/[^a-z0-9\s-]/g, '').trim();

const difficultyLevels: Difficulty[] = ['easy', 'medium', 'hard'];

const availableThemes: PuzzleTheme[] = ['General', 'Movies', 'Science', 'History'];

function App() {
  const [puzzle, setPuzzle] = useState<Puzzle | null>(null);
  const [status, setStatus] = useState<GameStatus>('idle');
  const [userGuess, setUserGuess] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [theme, setTheme] = useState<PuzzleTheme>('General');
  const [stats, setStats] = useState<GameStats>(initialStats);
  const [hint, setHint] = useState<string | null>(null);
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [hintsRemaining, setHintsRemaining] = useState(2);
  const [hintsUsedThisRound, setHintsUsedThisRound] = useState(0);
  const [showResultRemaining, setShowResultRemaining] = useState(1);
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [isCustomGame, setIsCustomGame] = useState(false);
  const [hasGuessedIncorrectly, setHasGuessedIncorrectly] = useState(false);
  
  // Sound state
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(0.05);

  // UI state
  const [showTutorial, setShowTutorial] = useState(false);
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [showShareButton, setShowShareButton] = useState(false);
  const [showSharePuzzleButton, setShowSharePuzzleButton] = useState(false);
  
  const soundManager = useRef<SoundManager | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const savedStats = localStorage.getItem('gibberish-guesser-stats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
      const savedTheme = localStorage.getItem('gibberish-guesser-theme');
      if (savedTheme && availableThemes.includes(savedTheme as PuzzleTheme)) {
        setTheme(savedTheme as PuzzleTheme);
      }
      const hasSeenTutorial = localStorage.getItem('gibberish-guesser-tutorial-seen');
      if (!hasSeenTutorial) {
        setShowTutorial(true);
      }
      // FIX: Explicitly type caught error to 'any' to resolve the "Cannot find name 'error'" compilation error. This is often necessary with strict TypeScript configurations.
    } catch (error: any) {
      console.error("Failed to load data from localStorage", error);
      setStats(initialStats);
    }
  }, []);

  // Save stats & settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('gibberish-guesser-stats', JSON.stringify(stats));
      localStorage.setItem('gibberish-guesser-theme', theme);
      // FIX: Explicitly type caught error to 'any' to resolve potential TypeScript compilation issues with strict settings.
    } catch (error: any) {
      console.error("Failed to save data to localStorage", error);
    }
  }, [stats, theme]);

  // Easter Egg listener
  useEffect(() => {
    const sequence = ['g', 'e', 'm', 'i', 'n', 'i'];
    let keySequence: string[] = [];

    const handleKeyDown = (e: KeyboardEvent) => {
      keySequence.push(e.key.toLowerCase());
      keySequence = keySequence.slice(-sequence.length);
      if (keySequence.join('') === sequence.join('')) {
        setShowEasterEgg(true);
        keySequence = [];
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const fetchPuzzle = useCallback(async (diff: Difficulty, thm: PuzzleTheme) => {
    setIsCustomGame(false); // When fetching, it's a standard game
    setStatus('loading');
    setUserGuess('');
    setHint(null);
    setIsAnswerRevealed(false);
    setShowShareButton(false);
    setShowSharePuzzleButton(false);
    setHintsUsedThisRound(0);
    setHasGuessedIncorrectly(false);
    
    try {
      const newPuzzle = await getGibberishPuzzle(diff, thm);
      setPuzzle(newPuzzle);
      setStatus('playing');
    } catch (error: any) {
      console.error("Failed to fetch puzzle:", error);
      setStatus('error');
      setToast({ message: 'Could not fetch a new puzzle. Please try again.', type: 'error' });
    }
  }, []);

  const handleConnectWallet = () => {
    if (!soundManager.current) {
      soundManager.current = new SoundManager();
      soundManager.current.init();
      soundManager.current.setMuted(isMuted);
      soundManager.current.setVolume(volume);
    }
    setWalletAddress('0x1234...5678');
    fetchPuzzle(difficulty, theme);
  };
  
  const handleCustomPuzzleCreate = (customPuzzle: Puzzle) => {
    setPuzzle(customPuzzle);
    setStatus('playing');
    setUserGuess('');
    setHint(null);
    setIsAnswerRevealed(false);
    setHintsRemaining(2);
    setShowResultRemaining(1);
    setHintsUsedThisRound(0);
    setIsCustomGame(true);
    setHasGuessedIncorrectly(false);
    setToast({ message: 'Your custom puzzle is ready to play!', type: 'success' });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDifficultyChange = (newDifficultyIndex: number) => {
    const newDifficulty = difficultyLevels[newDifficultyIndex];
    if (difficulty !== newDifficulty) {
      setDifficulty(newDifficulty);
      fetchPuzzle(newDifficulty, theme);
    }
  };
  
  const handleThemeChange = (newTheme: PuzzleTheme) => {
    if (theme !== newTheme) {
      setTheme(newTheme);
      fetchPuzzle(difficulty, newTheme);
    }
  };

  const handleGuess = (e: React.FormEvent) => {
    e.preventDefault();
    if (!puzzle || status !== 'playing') return;

    const trimmedGuess = userGuess.trim();

    // 1. Prevent empty or whitespace-only submissions
    if (trimmedGuess === '') {
      setToast({ message: "Your guess can't be empty.", type: 'error' });
      return;
    }
    
    // 2. Ensure only allowed characters are used (letters, numbers, spaces, hyphens)
    const validCharactersRegex = /^[a-zA-Z0-9\s-]*$/;
    if (!validCharactersRegex.test(trimmedGuess)) {
      setToast({ message: 'Invalid characters. Only letters, numbers, spaces, and hyphens are allowed.', type: 'error' });
      return;
    }

    const isCorrect = normalizeString(trimmedGuess) === normalizeString(puzzle.answer);

    if (isCorrect) {
      setStatus('correct');
      setShowSharePuzzleButton(true);

      if (isCustomGame) {
        setToast({ message: 'You solved your own puzzle!', type: 'success' });
        return;
      }
      
      const basePoints = difficulty === 'easy' ? 10 : difficulty === 'medium' ? 20 : 30;
      const penalty = hintsUsedThisRound * 5;
      const points = Math.max(0, basePoints - penalty);
      
      const newScore = stats.score + points;
      const isNewHighScore = newScore > stats.highScore;

      setStats(prev => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        gamesWon: prev.gamesWon + 1,
        currentStreak: prev.currentStreak + 1,
        longestStreak: Math.max(prev.longestStreak, prev.currentStreak + 1),
        score: newScore,
        highScore: isNewHighScore ? newScore : prev.highScore,
      }));

      let toastMessage = `Correct! +${points} points`;
      if (penalty > 0) {
        toastMessage += ` (-${penalty} for hints)`;
      }
      setToast({ message: toastMessage, type: 'success' });

      if (isNewHighScore) {
        setShowShareButton(true);
      }
    } else {
      setStatus('incorrect');
      setHasGuessedIncorrectly(true);
      if (!isCustomGame) {
        setStats(prev => ({
          ...prev,
          currentStreak: 0,
        }));
      }
      setUserGuess('');
      setToast({ message: 'Not quite, try again!', type: 'error' });
      setTimeout(() => {
        setStatus(currentStatus => currentStatus === 'incorrect' ? 'playing' : currentStatus);
      }, 1000);
    }
  };

  const resetGame = useCallback(() => {
    setIsCustomGame(false); // Always reset to a standard game
    setHintsRemaining(2);
    setShowResultRemaining(1);
    fetchPuzzle(difficulty, theme);
  }, [difficulty, theme, fetchPuzzle]);

  const handleSkipPuzzle = () => {
    if (status === 'loading' || isAnswerRevealed) return;
    setToast({ message: 'Puzzle skipped!', type: 'success' });
    if (!isCustomGame && status !== 'correct') {
      setStats(prev => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        currentStreak: 0,
      }));
    }
    resetGame();
  };
  
  const handleGetHint = async () => {
    if (hintsRemaining <= 0 || !puzzle || isHintLoading || isAnswerRevealed) return;
    setIsHintLoading(true);
    setHint(null);
    try {
      const newHint = await getHintForAnswer(puzzle.answer);
      setHint(newHint);
      setHintsRemaining(prev => prev - 1);
      setHintsUsedThisRound(prev => prev + 1);
      // FIX: Explicitly type caught error to 'any' to resolve potential TypeScript compilation issues with strict settings.
    } catch (error: any) {
      setToast({ message: "Couldn't get a hint this time.", type: 'error' });
    } finally {
      setIsHintLoading(false);
    }
  };

  const handleShowResult = () => {
    if (showResultRemaining <= 0 || !puzzle || isAnswerRevealed) return;
    setUserGuess(puzzle.answer);
    setIsAnswerRevealed(true);
    setShowResultRemaining(0);
    if (!isCustomGame) {
      setStats(prev => ({
        ...prev,
        gamesPlayed: prev.gamesPlayed + 1,
        currentStreak: 0,
      }));
    }
  };
  
  const handleToggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    soundManager.current?.setMuted(newMutedState);
  };
  
  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    soundManager.current?.setVolume(newVolume);
    if (isMuted && newVolume > 0) {
      const newMutedState = false;
      setIsMuted(newMutedState);
      soundManager.current?.setMuted(newMutedState);
    } else if (!isMuted && newVolume === 0) {
      const newMutedState = true;
      setIsMuted(newMutedState);
      soundManager.current?.setMuted(newMutedState);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Gibberish Guesser High Score!',
          text: `I just set a new high score of ${stats.highScore} on Gibberish Guesser! Can you beat it?`,
          url: window.location.href,
        });
        setToast({ message: 'Shared successfully!', type: 'success' });
        // FIX: Explicitly type caught error to 'any' to resolve potential TypeScript compilation issues with strict settings.
      } catch (error: any) {
        console.error('Error sharing:', error);
      }
    } else {
        setToast({ message: 'Web Share not supported on this browser.', type: 'error' });
    }
  };

  const handleSharePuzzle = async () => {
    if (navigator.share && puzzle) {
      try {
        await navigator.share({
          title: 'I solved a Gibberish Guesser puzzle!',
          text: `I just solved this puzzle!\n\nGibberish: "${puzzle.gibberish}"\nAnswer: "${puzzle.answer}"\n\nThink you can solve one?`,
          url: window.location.href,
        });
        setToast({ message: 'Puzzle shared!', type: 'success' });
      } catch (error: any) {
        console.error('Error sharing puzzle:', error);
        setToast({ message: 'Could not share puzzle.', type: 'error' });
      }
    }
  };

  const renderContent = () => {
    if (!walletAddress) {
      return <ConnectWalletButton onConnect={handleConnectWallet} />;
    }
    if ((status === 'loading' && !puzzle) || status === 'idle') {
      return <Loader message="Summoning some gibberish..." />;
    }
    if (status === 'error') {
      return (
        <div className="text-center">
          <p className="text-red-400 text-lg mb-4">Something went wrong!</p>
          <button onClick={resetGame} className="bg-base-blue hover:bg-base-blue-dark text-white font-bold py-2 px-6 rounded-full">
            Try Again
          </button>
        </div>
      );
    }
    return (
      <GameBoard
        puzzle={puzzle}
        status={status}
        userGuess={userGuess}
        setUserGuess={setUserGuess}
        handleGuess={handleGuess}
        resetGame={resetGame}
        handleSkipPuzzle={handleSkipPuzzle}
        difficulty={difficulty}
        difficultyIndex={difficultyLevels.indexOf(difficulty)}
        setDifficulty={handleDifficultyChange}
        theme={theme}
        setTheme={handleThemeChange}
        hintsRemaining={hintsRemaining}
        hint={hint}
        isHintLoading={isHintLoading}
        handleGetHint={handleGetHint}
        showResultRemaining={showResultRemaining}
        handleShowResult={handleShowResult}
        stats={stats}
        isAnswerRevealed={isAnswerRevealed}
        showShareButton={showShareButton}
        handleShare={handleShare}
        isCustomGame={isCustomGame}
        onPuzzleCreate={handleCustomPuzzleCreate}
        hasGuessedIncorrectly={hasGuessedIncorrectly}
        showSharePuzzleButton={showSharePuzzleButton}
        handleSharePuzzle={handleSharePuzzle}
      />
    );
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen font-sans flex flex-col selection:bg-base-blue/30">
      {status === 'correct' && !isCustomGame && <Confetti />}
      {showTutorial && <TutorialOverlay onClose={() => {
          setShowTutorial(false);
          localStorage.setItem('gibberish-guesser-tutorial-seen', 'true');
      }} />}
      {showEasterEgg && <EasterEgg onClose={() => setShowEasterEgg(false)} />}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <Header 
        walletAddress={walletAddress} 
        isMuted={isMuted} 
        onToggleMute={handleToggleMute}
        volume={volume}
        onVolumeChange={handleVolumeChange}
      />
      
      <main className="flex-grow flex items-center justify-center p-4 md:p-6">
        {renderContent()}
      </main>
    </div>
  );
}

export default App;