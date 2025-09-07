
import React from 'react';

interface HeaderProps {
  title: string;
  onBack?: () => void;
  rightAction?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, onBack, rightAction }) => {
  return (
    <header className="bg-surface sticky top-0 z-10 p-4 shadow-md flex items-center justify-between">
      <div className="flex items-center space-x-4">
        {onBack && (
          <button onClick={onBack} className="text-textPrimary hover:text-primary transition">
             <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        <h1 className="text-2xl font-bold text-textPrimary">{title}</h1>
      </div>
      <div>{rightAction}</div>
    </header>
  );
};

export default Header;
