import React, { useState } from 'react';

const HowToPlay: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-xl mx-auto mt-8">
      <div className="border border-gray-700/80 rounded-lg bg-gray-800/30">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-200 hover:bg-gray-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-base-blue/50"
          aria-expanded={isOpen}
          aria-controls="how-to-play-content"
        >
          <span>How to Play</span>
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
          id="how-to-play-content"
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        >
          <div className="p-4 border-t border-gray-700/80 text-gray-300 text-sm">
            <p className="mb-4">
              <strong>Gibberish Guesser</strong> is a word puzzle game where you decipher a nonsensical phrase to find the real phrase it sounds like.
            </p>
            <ul className="list-disc list-inside space-y-2">
              <li><strong>The Goal:</strong> Read the "gibberish" phrase out loud and try to guess the common phrase, quote, or title it sounds like.</li>
              <li><strong>Example:</strong> The gibberish "aisle of ewe" sounds like the real phrase "I love you".</li>
              <li><strong>Difficulty Levels:</strong>
                <ul className="list-disc list-inside ml-6 mt-1">
                    <li><strong>Easy:</strong> Simple, common phrases.</li>
                    <li><strong>Medium:</strong> More complex phrases or song lyrics.</li>
                    <li><strong>Hard:</strong> Obscure phrases, full sentences, or technical terms.</li>
                </ul>
              </li>
              <li><strong>New Puzzles:</strong> Click "Get a New Puzzle" at any time to get a new challenge from our AI.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
