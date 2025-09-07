import React from 'react';

const Logo: React.FC<{ className?: string }> = ({ className = '' }) => {
  return (
    <div className={`w-24 h-24 bg-white/20 backdrop-blur-sm p-2 rounded-full border-2 border-white/50 ${className}`}>
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            {/* Stem for left 'F' */}
            <path d="M35 80 V 25 C 35 20 40 20 45 22" stroke="white" strokeWidth="8" strokeLinecap="round" />
            {/* Cross-bar for left 'F' */}
            <path d="M35 50 H 55" stroke="white" strokeWidth="8" strokeLinecap="round" />
            {/* Leaf on left 'F' */}
            <path d="M55 50 C 65 50 65 40 55 40" stroke="white" strokeWidth="8" strokeLinecap="round" />

            {/* Stem for right 'F' */}
            <path d="M65 80 V 25 C 65 20 60 20 55 22" stroke="white" strokeWidth="8" strokeLinecap="round" />
            {/* Cross-bar for right 'F' */}
            <path d="M65 50 H 45" stroke="white" strokeWidth="8" strokeLinecap="round" />
            {/* Leaf on right 'F' */}
            <path d="M45 50 C 35 50 35 40 45 40" stroke="white" strokeWidth="8" strokeLinecap="round" />
        </svg>
    </div>
  );
};

export default Logo;