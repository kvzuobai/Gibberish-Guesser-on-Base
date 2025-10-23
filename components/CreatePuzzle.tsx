
import React, { useState } from 'react';
import { Puzzle } from '../types';

interface CreatePuzzleProps {
  onPuzzleCreate: (puzzle: Puzzle) => void;
}

const normalizeString = (str: string) => str.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim();

const CreatePuzzle: React.FC<CreatePuzzleProps> = ({ onPuzzleCreate }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [gibberish, setGibberish] = useState('');
  const [answer, setAnswer] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validation
    if (!gibberish.trim() || !answer.trim()) {
      setError('Both the gibberish phrase and the answer are required.');
      return;
    }
    if (gibberish.trim().length < 5 || answer.trim().length < 5) {
      setError('Phrases must be at least 5 characters long.');
      return;
    }
    if (normalizeString(gibberish) === normalizeString(answer)) {
      setError('The gibberish phrase and the answer cannot be the same.');
      return;
    }

    onPuzzleCreate({ gibberish: gibberish.trim(), answer: answer.trim() });
    setGibberish('');
    setAnswer('');
    setIsOpen(false); // Close the panel after creation
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-4">
      <div className="border border-gray-700/80 rounded-lg bg-gray-800/30">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-200 hover:bg-gray-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-base-blue/50"
          aria-expanded={isOpen}
          aria-controls="create-puzzle-content"
        >
          <span>Create Your Own Puzzle</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-5 w-5 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <div
          id="create-puzzle-content"
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        >
          <div className="p-4 border-t border-gray-700/80">
            <p className="text-sm text-gray-400 mb-4">
              Create a custom gibberish puzzle to challenge yourself or a friend. Playing custom puzzles won't affect your game stats.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="gibberish-input-custom" className="block text-sm font-medium text-gray-300 mb-1">Gibberish Phrase</label>
                <input
                  id="gibberish-input-custom"
                  type="text"
                  value={gibberish}
                  onChange={(e) => setGibberish(e.target.value)}
                  placeholder="e.g., 'aisle of ewe'"
                  className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-base-blue/50"
                />
              </div>
              <div>
                <label htmlFor="answer-input-custom" className="block text-sm font-medium text-gray-300 mb-1">Real Answer</label>
                <input
                  id="answer-input-custom"
                  type="text"
                  value={answer}
                  onChange={(e) => setAnswer(e.target.value)}
                  placeholder="e.g., 'I love you'"
                  className="w-full bg-gray-900/50 border border-gray-600 text-white rounded-md py-2 px-3 focus:outline-none focus:ring-2 focus:ring-base-blue/50"
                />
              </div>
              {error && <p className="text-red-400 text-sm animate-shake">{error}</p>}
              <button
                type="submit"
                className="w-full bg-base-blue hover:bg-base-blue-dark text-white font-bold py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Create & Play Puzzle
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePuzzle;
