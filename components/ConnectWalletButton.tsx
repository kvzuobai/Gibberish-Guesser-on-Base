import React from 'react';

interface ConnectWalletButtonProps {
  onConnect: () => void;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ onConnect }) => {
  return (
    <div className="text-center">
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">Welcome!</h2>
      <p className="text-gray-400 mb-6 max-w-sm mx-auto">Connect your wallet to start playing the game on Base.</p>
      <button
        onClick={onConnect}
        className="bg-base-blue hover:bg-base-blue-dark text-white font-bold py-3 px-6 sm:px-8 rounded-full text-base sm:text-lg transition-all duration-300 ease-in-out transform hover:scale-105 shadow-lg shadow-base-blue/30"
      >
        Connect Wallet
      </button>
      <p className="text-xs text-gray-500 mt-4">(This is a simulation. No real wallet is needed.)</p>
    </div>
  );
};

export default ConnectWalletButton;