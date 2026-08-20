import React, { forwardRef } from 'react';

interface BrowserViewportProps extends React.HTMLAttributes<HTMLDivElement> {}

export const BrowserViewport = forwardRef<HTMLDivElement, BrowserViewportProps>((props, ref) => {
  return (
    <div
      ref={ref}
      className="flex-1 bg-[var(--browser-canvas-deep)] relative w-full h-full"
      {...props}
    />
  );
});

BrowserViewport.displayName = 'BrowserViewport';
