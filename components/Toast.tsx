
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === 'success' ? 'bg-green-500/80' : 'bg-red-500/80';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';

  return (
    <div 
      className={`fixed bottom-5 right-5 px-6 py-3 rounded-lg shadow-2xl text-white font-semibold border ${bgColor} ${borderColor} animate-fade-in-up`}
    >
      {message}
    </div>
  );
};

export default Toast;
