import React from 'react';

interface TabGroupProps {
  label: string;
  color?: string;
  children: React.ReactNode;
}

export const TabGroup: React.FC<TabGroupProps> = ({ label, color = 'var(--browser-accent)', children }) => {
  return (
    <div className="flex flex-col gap-1 my-1">
      <div className="flex items-center gap-2 px-2 py-0.5 text-[10px] font-semibold tracking-wider text-[var(--browser-text-muted)] uppercase">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
        <span>{label}</span>
      </div>
      <div className="flex flex-col gap-1 pl-2 border-l border-[var(--browser-border-subtle)] ml-2">
        {children}
      </div>
    </div>
  );
};
