import React, { useState } from 'react';
import { GameStats } from '../types';

interface StatsProps {
  stats: GameStats;
}

interface StatItemProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}
  
const StatItem: React.FC<StatItemProps> = ({ label, value, icon }) => (
    <div className="flex items-center p-3 sm:p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 transform transition-transform duration-300 hover:scale-105 hover:border-base-blue/50">
        <div className="mr-3 sm:mr-4 text-cyan-300">
            {icon}
        </div>
        <div>
            <p className="text-xl sm:text-2xl font-bold text-white leading-tight">{value}</p>
            <p className="text-xs text-gray-400 uppercase tracking-wider">{label}</p>
        </div>
    </div>
);

const Stats: React.FC<StatsProps> = ({ stats }) => {
  const [isOpen, setIsOpen] = useState(false);

  const winRate = stats.gamesPlayed > 0 
    ? ((stats.gamesWon / stats.gamesPlayed) * 100).toFixed(0) 
    : 0;
    
  const iconClasses = "h-7 w-7";

  return (
    <div className="w-full max-w-xl mx-auto mt-4">
      <div className="border border-gray-700/80 rounded-lg bg-gray-800/30">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex justify-between items-center p-4 text-left font-semibold text-gray-200 hover:bg-gray-700/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-base-blue/50"
          aria-expanded={isOpen}
          aria-controls="stats-content"
        >
          <span>Game Statistics</span>
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
          id="stats-content"
          className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
        >
          <div className="p-4 border-t border-gray-700/80">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <StatItem 
                label="Played" 
                value={stats.gamesPlayed} 
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClasses}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                    </svg>
                } 
              />
              <StatItem 
                label="Games Won" 
                value={stats.gamesWon} 
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClasses}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                    </svg>
                } 
              />
              <StatItem 
                label="Win %" 
                value={`${winRate}%`} 
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClasses}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6a7.5 7.5 0 1 0 7.5 7.5h-7.5V6Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 10.5H21A7.5 7.5 0 0 0 13.5 3v7.5Z" />
                    </svg>
                } 
              />
              <StatItem 
                label="High Score" 
                value={stats.highScore} 
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClasses}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9a2.25 2.25 0 0 1-2.25-2.25v-1.5A2.25 2.25 0 0 1 7.5 12.75h9a2.25 2.25 0 0 1 2.25 2.25v1.5a2.25 2.25 0 0 1-2.25 2.25Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12.75V9A2.25 2.25 0 0 1 14.25 6.75h0A2.25 2.25 0 0 1 16.5 9v.75m-6.75 3V9A2.25 2.25 0 0 0 7.5 6.75h0A2.25 2.25 0 0 0 5.25 9v.75" />
                    </svg>
                }
              />
              <StatItem 
                label="Current Streak" 
                value={stats.currentStreak}
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClasses}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.048 8.287 8.287 0 0 0 9 9.6a8.983 8.983 0 0 1 3.362-6.867 8.268 8.268 0 0 1 3-2.48Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 0 0 .495-7.467 5.99 5.99 0 0 0-1.925 3.546 5.974 5.974 0 0 1-2.133-1A3.75 3.75 0 0 0 12 18Z" />
                    </svg>
                } 
              />
              <StatItem 
                label="Longest Streak" 
                value={stats.longestStreak} 
                icon={
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={iconClasses}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM18.259 15.904 18 17.25l-.259-1.346a3.375 3.375 0 0 0-2.455-2.456L14.25 12l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 8.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 12l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
                    </svg>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
