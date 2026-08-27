import React from 'react';
import { Tab as TabType } from '../../../shared/types';
import { Pin, Globe } from 'lucide-react';

interface PinnedTabsProps {
  tabs: TabType[];
  onSelect: (id: string) => void;
}

export const PinnedTabs: React.FC<PinnedTabsProps> = ({ tabs, onSelect }) => {
  if (tabs.length === 0) return null;

  return (
    <div className="flex flex-col gap-1.5 pb-2.5 border-b border-[var(--border-color-subtle)] mb-1">
      <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider">
        <Pin size={11} className="text-[var(--claude-orange)]" /> Pinned Favorites
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            title={tab.title || tab.url}
            className="h-9 rounded-xl bg-[var(--dark-teal)] border border-[var(--border-color-subtle)] hover:border-[var(--border-color-glow)] hover:bg-[var(--slate-teal)] flex items-center justify-center text-xs font-bold text-[var(--claude-orange-light)] transition-all shadow-sm group"
          >
            <span className="group-hover:scale-110 transition-transform">
              {(tab.title || tab.url || 'P').charAt(0).toUpperCase()}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};
