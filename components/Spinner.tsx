import React from 'react';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
}

const Spinner: React.FC<SpinnerProps> = ({ size = 'md' }) => {
  const sizeClasses = {
    sm: 'h-1.5 w-1.5',
    md: 'h-2 w-2',
    lg: 'h-3 w-3',
  };
  return (
    <div className="flex items-center justify-center space-x-2">
      <div className={`${sizeClasses[size]} bg-cyan-300 rounded-full animate-pulse-fast`}></div>
      <div className={`${sizeClasses[size]} bg-cyan-300 rounded-full animate-pulse-fast animation-delay-200`}></div>
      <div className={`${sizeClasses[size]} bg-cyan-300 rounded-full animate-pulse-fast animation-delay-400`}></div>
    </div>
  );
};

export default Spinner;
