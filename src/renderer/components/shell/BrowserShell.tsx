import React from 'react';

interface BrowserShellProps {
  theme?: 'dark' | 'light';
  children: React.ReactNode;
}

export const BrowserShell: React.FC<BrowserShellProps> = ({ theme = 'dark', children }) => {
  return (
    <div
      data-theme={theme}
      className="flex w-screen h-screen overflow-hidden bg-[var(--browser-canvas-deep)] text-[var(--browser-text-primary)] font-[var(--font-ui)] antialiased select-none"
    >
      {children}
    </div>
  );
};
