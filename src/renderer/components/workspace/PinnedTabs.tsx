import React from 'react';
import { Tab as TabType } from '../../../shared/types';
import { Pin } from 'lucide-react';

interface PinnedTabsProps {
  tabs: TabType[];
  onSelect: (id: string) => void;
}

export const PinnedTabs: React.FC<PinnedTabsProps> = ({ tabs, onSelect }) => {
  if (tabs.length === 0) return null;

  return (
    <div className="flex items-center gap-1 pb-2 border-b border-[var(--browser-border-subtle)] mb-2">
      <Pin size={12} className="text-[var(--browser-accent-cyan)] shrink-0" />
      <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onSelect(tab.id)}
            title={tab.title}
            className="w-7 h-7 rounded-lg bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex items-center justify-center text-[10px] font-bold text-[var(--browser-text-primary)] hover:border-[var(--browser-accent)]"
          >
            {tab.title.charAt(0).toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
};
