import React from 'react';
import { GameStatus, Puzzle, Difficulty, GameStats, PuzzleTheme } from '../types';
import HowToPlay from './HowToPlay';
import Stats from './Stats';
import Spinner from './Spinner';
import CreatePuzzle from './CreatePuzzle';

interface GameBoardProps {
  puzzle: Puzzle | null;
  status: GameStatus;
  userGuess: string;
  setUserGuess: (guess: string) => void;
  handleGuess: (e: React.FormEvent) => void;
  resetGame: () => void;
  handleSkipPuzzle: () => void;
  difficulty: Difficulty;
  difficultyIndex: number;
  setDifficulty: (difficultyIndex: number) => void;
  theme: PuzzleTheme;
  setTheme: (theme: PuzzleTheme) => void;
  hintsRemaining: number;
  hint: string | null;
  isHintLoading: boolean;
  handleGetHint: () => void;
  showResultRemaining: number;
  handleShowResult: () => void;
  stats: GameStats;
  isAnswerRevealed: boolean;
  showShareButton: boolean;
  handleShare: () => void;
  isCustomGame: boolean;
  onPuzzleCreate: (puzzle: Puzzle) => void;
  hasGuessedIncorrectly: boolean;
  showSharePuzzleButton: boolean;
  handleSharePuzzle: () => void;
}

const themes: PuzzleTheme[] = ['General', 'Movies', 'Science', 'History'];
const difficultyLabels = ['Easy', 'Medium', 'Hard'];

const themeIcons: Record<PuzzleTheme, React.ReactNode> = {
  General: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9V3m0 18a9 9 0 009-9m-9 9a9 9 0 00-9-9" />
    </svg>
  ),
  Movies: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
    </svg>
  ),
  Science: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86l-2.387-.477a2 2 0 01-.547-1.806l.477-2.387a6 6 0 013.86-.517l.318.158a6 6 0 003.86-.517l2.387.477a2 2 0 011.806.547a2 2 0 01.547 1.806l-.477 2.387a6 6 0 01-3.86.517l-.318.158a6 6 0 00-3.86.517l-2.387.477a2 2 0 00-1.806.547a2 2 0 00-.547 1.806l.477 2.387a6 6 0 00.517 3.86l.158.318a6 6 0 00.517 3.86l2.387.477a2 2 0 001.806-.547a2 2 0 00.547-1.806l-.477-2.387a6 6 0 00-.517-3.86l-.158-.318a6 6 0 01-.517-3.86z" />
    </svg>
  ),
  History: (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
};

const GameBoard: React.FC<GameBoardProps> = ({
  puzzle,
  status,
  userGuess,
  setUserGuess,
  handleGuess,
  resetGame,
  handleSkipPuzzle,
  difficulty,
  difficultyIndex,
  setDifficulty,
  theme,
  setTheme,
  hintsRemaining,
  hint,
  isHintLoading,
  handleGetHint,
  showResultRemaining,
  handleShowResult,
  stats,
  isAnswerRevealed,
  showShareButton,
  handleShare,
  isCustomGame,
  onPuzzleCreate,
  hasGuessedIncorrectly,
  showSharePuzzleButton,
  handleSharePuzzle
}) => {
  const getInputRingColor = () => {
    if (status === 'correct') return 'ring-green-500';
    if (status === 'incorrect') return 'ring-red-500';
    return 'ring-base-blue/50';
  };

  const isLoading = status === 'loading';

  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl shadow-2xl p-6 md:p-8 backdrop-blur-sm">
        {/* Score Display */}
        <div className="flex justify-between items-center text-center mb-4">
          <div>
            <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider">Score</span>
            <p className="text-2xl sm:text-3xl font-bold text-white transition-colors duration-300">{stats.score}</p>
          </div>
          <div>
            <span className="text-xs sm:text-sm font-bold text-gray-400 uppercase tracking-wider">High Score</span>
            <p className="text-2xl sm:text-3xl font-bold text-white transition-colors duration-300">{stats.highScore}</p>
          </div>
        </div>
        <hr className="border-gray-700/50 mb-6" />
        
        {/* Game Settings */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
            <div className="px-2">
              <label id="difficulty-label" className="block text-sm font-medium text-gray-400 mb-2 text-center">Difficulty</label>
              <input
                type="range"
                min="0"
                max="2"
                step="1"
                value={difficultyIndex}
                onChange={(e) => setDifficulty(parseInt(e.target.value, 10))}
                disabled={isLoading}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                aria-labelledby="difficulty-label"
                aria-valuetext={difficultyLabels[difficultyIndex]}
              />
              <div className="flex justify-between text-xs font-semibold text-gray-500 mt-1">
                <span>Easy</span>
                <span>Medium</span>
                <span>Hard</span>
              </div>
            </div>
            <div>
              <label id="theme-label" className="block text-sm font-medium text-gray-400 mb-2 text-center">Theme</label>
              <div role="group" aria-labelledby="theme-label" className="flex flex-wrap justify-center bg-gray-900/50 p-1 rounded-lg border border-gray-700 gap-1">
                  {themes.map((themeOption) => (
                    <button
                      key={themeOption}
                      onClick={() => setTheme(themeOption)}
                      disabled={isLoading}
                      className={`flex-1 flex items-center justify-center px-2 py-1.5 text-xs sm:text-sm font-semibold rounded-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-base-blue disabled:opacity-50 disabled:cursor-not-allowed ${
                        theme === themeOption
                          ? 'bg-base-blue text-white shadow'
                          : 'bg-transparent text-gray-400 hover:bg-gray-700/50 hover:text-white'
                      }`}
                      aria-pressed={theme === themeOption}
                    >
                      {themeIcons[themeOption]}
                      <span className="hidden sm:inline">{themeOption}</span>
                    </button>
                  ))}
              </div>
            </div>
        </div>
        
        {isCustomGame && (
          <div className="text-center mb-2 animate-fadeIn">
              <span className="bg-cyan-500/20 text-cyan-300 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider">
                Custom Puzzle
              </span>
          </div>
        )}
        <p className="text-sm text-gray-400 mb-2 text-center">Your Gibberish Puzzle:</p>
        
        <div className="text-center min-h-[150px] flex items-center justify-center">
        {isLoading ? (
             <div className="flex flex-col items-center justify-center text-2xl sm:text-3xl font-semibold text-gray-400">
                <Spinner size="lg" />
                <span className="mt-4 text-lg">Generating a new dwors...</span>
             </div>
          ) : (
            <h2 
              key={puzzle?.gibberish}
              className={`text-2xl sm:text-3xl md:text-4xl font-bold 
                text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-cyan-400 to-cyan-300 bg-[length:200%_auto] animate-shimmer animate-fadeIn`}
            >
              {puzzle?.gibberish?.replace(/['"`]/g, '')}
            </h2>
          )}
        </div>


        <form onSubmit={handleGuess} className="mt-8">
          <label htmlFor="guess-input" className="block text-sm font-medium text-gray-300 mb-2">
            What's the real phrase?
          </label>
          <input
            id="guess-input"
            type="text"
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            placeholder="Type your guess here..."
            disabled={status === 'correct' || isLoading || isAnswerRevealed}
            className={`w-full bg-gray-900/50 border-2 border-gray-700 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 transition-all duration-300 ${getInputRingColor()} ${
              status === 'incorrect' ? 'animate-shake' : ''
            }`}
          />
         
          <div className="mt-4 flex flex-col sm:flex-row justify-between sm:items-center min-h-[48px] gap-3 sm:gap-4">
            {hint && (
              <p className="text-sm text-cyan-300 animate-fadeIn text-left italic sm:pr-4 order-last sm:order-first">
                <strong>Hint:</strong> {hint}
              </p>
            )}
            <div className="ml-auto flex items-center gap-2 flex-shrink-0 flex-wrap justify-end">
               {hasGuessedIncorrectly && (
                 <button
                    type="button"
                    onClick={handleShowResult}
                    disabled={showResultRemaining === 0 || status === 'correct' || isLoading || isAnswerRevealed}
                    className="bg-red-600/80 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center w-auto justify-center transform hover:scale-105 animate-fadeIn"
                  >
                    <span>Reveal Answer ({showResultRemaining}/1)</span>
                  </button>
               )}
               <button
                type="button"
                onClick={handleGetHint}
                disabled={hintsRemaining === 0 || status === 'correct' || isHintLoading || isLoading || isAnswerRevealed}
                className="bg-gray-700/80 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center w-auto justify-center min-w-[120px] transform hover:scale-105"
              >
                {isHintLoading ? (
                  <Spinner size="sm" />
                ) : (
                  <span>Get Hint ({hintsRemaining}/2)</span>
                )}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={status === 'loading' || status === 'correct' || isAnswerRevealed}
            className={`w-full mt-2 text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform 
              ${status === 'correct' 
                ? 'bg-green-500 hover:bg-green-500 cursor-not-allowed animate-tada' 
                : status === 'loading' || isAnswerRevealed
                ? 'bg-gray-600 cursor-not-allowed' 
                : 'bg-base-blue hover:bg-base-blue-dark hover:scale-105'
              }`
            }
          >
            {status === 'correct' ? 'Correct!' : isAnswerRevealed ? 'Answer Revealed' : 'Submit Guess'}
          </button>
        </form>

        <div className="mt-6 text-center">
          {status === 'correct' && (showShareButton || showSharePuzzleButton) && navigator.share && (
            <div className="mb-4 animate-fadeIn flex flex-wrap justify-center items-center gap-4">
              {showShareButton && (
                <button
                  onClick={handleShare}
                  className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-white font-bold py-2 px-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Share High Score!
                </button>
              )}
              {showSharePuzzleButton && (
                <button
                  onClick={handleSharePuzzle}
                  className="bg-gradient-to-r from-green-400 to-teal-500 hover:from-green-500 hover:to-teal-600 text-white font-bold py-2 px-5 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  Share Puzzle Result
                </button>
              )}
            </div>
          )}
          <div className="flex items-center justify-center gap-6">
            <button
              onClick={handleSkipPuzzle}
              disabled={isLoading || isAnswerRevealed}
              className="text-yellow-500/80 hover:text-yellow-500 font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'correct' ? 'Next Puzzle' : 'Skip Puzzle'}
            </button>
            <button
              onClick={resetGame}
              disabled={isLoading && !isAnswerRevealed}
              className="text-base-blue/80 hover:text-base-blue font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Start New Game
            </button>
          </div>
        </div>
      </div>
      
      <Stats stats={stats} />
      <HowToPlay />
      <CreatePuzzle onPuzzleCreate={onPuzzleCreate} />

    </div>
  );
};

export default GameBoard;