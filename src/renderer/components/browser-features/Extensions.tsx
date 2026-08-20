import React from 'react';
import { Puzzle } from 'lucide-react';

export const Extensions: React.FC = () => {
  return (
    <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] uppercase">
          Installed Extensions
        </span>
        <Puzzle size={14} className="text-[var(--browser-accent-purple)]" />
      </div>
      <div className="p-3 rounded-xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] text-xs text-[var(--browser-text-muted)]">
        No third-party extensions loaded.
      </div>
    </div>
  );
};
