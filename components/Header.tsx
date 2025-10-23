import React from 'react';
import SoundControl from './SoundControl';

interface HeaderProps {
  walletAddress: string | null;
  isMuted: boolean;
  onToggleMute: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const Header: React.FC<HeaderProps> = ({ walletAddress, isMuted, onToggleMute, volume, onVolumeChange }) => {
  return (
    <header className="py-4 px-6 md:px-8 border-b border-gray-700/50 flex justify-between items-center">
      <h1 className="text-xl md:text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
        Gibberish Guesser on Base
      </h1>
      {walletAddress && (
        <div className="flex items-center gap-4">
          <div className="bg-gray-800/50 rounded-full px-4 py-2 text-xs md:text-sm font-mono text-cyan-300 border border-gray-700">
            {`${walletAddress.substring(0, 6)}...${walletAddress.substring(walletAddress.length - 4)}`}
          </div>
          <SoundControl isMuted={isMuted} onToggle={onToggleMute} volume={volume} onVolumeChange={onVolumeChange} />
        </div>
      )}
    </header>
  );
};

export default Header;