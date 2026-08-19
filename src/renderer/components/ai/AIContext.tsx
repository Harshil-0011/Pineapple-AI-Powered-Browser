import React from 'react';
import { PagePerception } from '../../../shared/types';
import { Globe, Cpu } from 'lucide-react';

interface AIContextProps {
  perception: PagePerception | null;
}

export const AIContext: React.FC<AIContextProps> = ({ perception }) => {
  return (
    <div className="p-3 bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] rounded-xl flex flex-col gap-2 text-xs">
      <div className="flex items-center gap-2 text-[var(--browser-accent-cyan)] font-semibold">
        <Globe size={14} />
        <span className="truncate">{perception?.title || 'Active Web Page Context'}</span>
      </div>
      <div className="flex items-center gap-2 text-[var(--browser-text-muted)] text-[11px]">
        <Cpu size={12} />
        <span>{perception?.elements?.length || 0} interactive accessibility controls</span>
      </div>
    </div>
  );
};
