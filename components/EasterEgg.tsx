import React, { useState, useEffect } from 'react';

interface EasterEggProps {
  onClose: () => void;
}

const EasterEgg: React.FC<EasterEggProps> = ({ onClose }) => {
  const [isLoading, setIsLoading] = useState(true);

  // Close on Escape key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  // Simulate loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 750);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div 
      className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 animate-fadeIn"
      onClick={onClose}
    >
      <div 
        className="bg-gray-800 border border-base-blue rounded-lg p-8 text-center shadow-2xl shadow-base-blue/30 flex items-center justify-center min-w-[280px] min-h-[200px]"
        onClick={(e) => e.stopPropagation()}
      >
        {isLoading ? (
          <p className="text-gray-400 animate-pulse-fast text-lg">Unlocking secret...</p>
        ) : (
          <div className="animate-fadeIn">
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-4 animate-tada">
              You Found It!
            </h2>
            <p className="text-gray-300">This game was powered by the</p>
            <p className="text-xl font-semibold text-cyan-400 mt-1">Google Gemini API</p>
            <button 
              onClick={onClose}
              className="mt-6 bg-base-blue hover:bg-base-blue-dark text-white font-bold py-2 px-6 rounded-full text-sm transition-all duration-200 transform hover:scale-105"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EasterEgg;