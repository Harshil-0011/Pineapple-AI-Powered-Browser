import React from 'react';

interface WindowFrameProps {
  title?: string;
  children?: React.ReactNode;
}

export const WindowFrame: React.FC<WindowFrameProps> = ({ title = 'Pineapple AI Browser', children }) => {
  return (
    <div className="w-full h-8 bg-[var(--browser-surface)] border-b border-[var(--browser-border-subtle)] flex items-center justify-between px-3 shrink-0 z-[var(--z-chrome)]">
      <div className="flex items-center gap-2">
        <div className="w-3 h-3 rounded-full bg-rose-500/80" />
        <div className="w-3 h-3 rounded-full bg-amber-500/80" />
        <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
      </div>
      <span className="text-[11px] text-[var(--browser-text-muted)] font-medium">
        {title}
      </span>
      <div className="w-12" />
      {children}
    </div>
  );
};
