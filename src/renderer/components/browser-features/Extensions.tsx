import React from 'react';
import { Puzzle, ShieldCheck } from 'lucide-react';

export const Extensions: React.FC = () => {
  return (
    <div className="flex-1 p-3.5 flex flex-col gap-3 overflow-y-auto select-none">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] uppercase tracking-wider">
          Browser Extensions
        </span>
        <Puzzle size={14} className="text-[var(--browser-accent)]" />
      </div>

      <div className="p-3.5 rounded-2xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xs font-medium text-[var(--browser-text-primary)]">
          <ShieldCheck size={14} className="text-[var(--browser-success)]" />
          <span>Pineapple Shield Protection</span>
        </div>
        <span className="text-[11px] text-[var(--browser-text-muted)] leading-relaxed">
          Built-in web request ad & tracker blocker extension active.
        </span>
      </div>
    </div>
  );
};
