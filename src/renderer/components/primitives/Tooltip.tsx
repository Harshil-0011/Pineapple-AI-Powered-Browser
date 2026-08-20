import React from 'react';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  return (
    <div className="relative group inline-block">
      {children}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 hidden group-hover:block glass-strong text-[10px] text-[var(--browser-text-primary)] px-2 py-1 rounded-md whitespace-nowrap shadow-md pointer-events-none z-[var(--z-toast)]">
        {content}
      </div>
    </div>
  );
};
