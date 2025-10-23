import React from 'react';

const CONFETTI_COUNT = 50;
const COLORS = ['#0052FF', '#00E5FF', '#F7B500', '#4CAF50', '#FF4081'];

const Confetti: React.FC = () => {
  const confetti = Array.from({ length: CONFETTI_COUNT }).map((_, i) => {
    const style = {
      left: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 2 + 3}s`, // 3s to 5s
      animationDelay: `${Math.random() * 2}s`,
      backgroundColor: COLORS[Math.floor(Math.random() * COLORS.length)],
      transform: `rotate(${Math.random() * 360}deg)`,
    };
    return <div key={i} className="confetti-piece" style={style}></div>;
  });

  return <div className="fixed inset-0 w-full h-full pointer-events-none z-50 overflow-hidden">{confetti}</div>;
};

export default Confetti;
