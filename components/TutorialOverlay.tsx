import React from 'react';

interface TutorialOverlayProps {
  onClose: () => void;
}

const TutorialOverlay: React.FC<TutorialOverlayProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn p-4">
      <div className="bg-gray-800 border border-base-blue rounded-lg p-6 md:p-8 text-center shadow-2xl shadow-base-blue/30 max-w-lg w-full relative">
        <h2 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4">
          Welcome to Gibberish Guesser!
        </h2>
        <div className="text-gray-300 space-y-4 text-left">
          <p>
            The goal is to guess the real phrase from the gibberish you see.
          </p>
          <ul className="list-disc list-inside space-y-2 pl-4">
            <li>
              <strong>Read it out loud:</strong> The gibberish sounds like a common phrase. For example, "aisle of ewe" sounds like "I love you".
            </li>
            <li>
              <strong>Select Difficulty:</strong> Choose between easy, medium, or hard for a new challenge.
            </li>
            <li>
              <strong>Guess &amp; Win:</strong> Type your answer and hit submit. Correct answers increase your score and streak!
            </li>
            <li>
              <strong>Need help?</strong> Use a hint or reveal the answer if you're really stuck.
            </li>
          </ul>
        </div>
        <button
          onClick={onClose}
          className="mt-8 bg-base-blue hover:bg-base-blue-dark text-white font-bold py-3 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105"
        >
          Let's Play!
        </button>
      </div>
    </div>
  );
};

export default TutorialOverlay;
