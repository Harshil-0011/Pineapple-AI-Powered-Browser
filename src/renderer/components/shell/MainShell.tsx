import React from 'react';

interface MainShellProps {
  children: React.ReactNode;
}

export const MainShell: React.FC<MainShellProps> = ({ children }) => {
  return (
    <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[var(--browser-canvas-deep)]">
      {children}
    </div>
  );
};
