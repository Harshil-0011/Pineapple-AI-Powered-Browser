import React from 'react';

interface ProgressProps {
  value: number;
}

export const Progress: React.FC<ProgressProps> = ({ value }) => {
  return (
    <div className="w-full h-1 bg-[var(--browser-surface-elevated)] rounded-full overflow-hidden">
      <div
        className="h-full bg-[var(--browser-accent-cyan)] transition-all"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
  );
};
