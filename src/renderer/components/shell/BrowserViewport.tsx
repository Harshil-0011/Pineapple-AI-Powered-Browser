import React, { forwardRef } from 'react';

interface BrowserViewportProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

export const BrowserViewport = forwardRef<HTMLDivElement, BrowserViewportProps>(({ children, className = '', ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={`flex-1 bg-[var(--browser-canvas-deep)] relative w-full h-full overflow-hidden ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

BrowserViewport.displayName = 'BrowserViewport';
