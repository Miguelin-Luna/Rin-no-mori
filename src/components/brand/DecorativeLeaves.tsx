import React from 'react';

export const DecorativeLeaves: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={`opacity-20 pointer-events-none select-none ${className || ''}`}>
      <svg viewBox="0 0 100 150" fill="none" stroke="#4a3327" strokeWidth="2.5">
        <path d="M 10 140 C 30 100, 40 60, 20 10" />
        <path d="M 25 100 C 50 80, 80 80, 70 100 C 50 110, 30 110, 25 100" fill="#f4e7da" />
        <path d="M 30 60 C 60 40, 85 50, 75 70 C 55 75, 35 70, 30 60" fill="#f4e7da" />
      </svg>
    </div>
  );
};
