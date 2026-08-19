import React from 'react';
import { Tab as TabType } from '../../../shared/types';
import { Globe, X } from 'lucide-react';

interface TabProps {
  tab: TabType;
  isActive: boolean;
  isVertical?: boolean;
  onSelect: (id: string) => void;
  onClose: (id: string) => void;
}

export const Tab: React.FC<TabProps> = ({
  tab,
  isActive,
  isVertical = false,
  onSelect,
  onClose,
}) => {
  return (
    <div
      onClick={() => onSelect(tab.id)}
      className={`group relative flex items-center justify-between gap-2 px-3 py-1 rounded-lg cursor-pointer transition-all border text-xs ${
        isActive
          ? 'bg-[var(--browser-surface-secondary)] border-[var(--browser-border-strong)] text-[var(--browser-text-primary)] shadow-sm'
          : 'bg-transparent border-transparent text-[var(--browser-text-secondary)] hover:bg-[var(--browser-surface-hover)] hover:text-[var(--browser-text-primary)]'
      } ${isVertical ? 'w-full' : 'h-7 max-w-[200px] min-w-[120px]'}`}
    >
      <div className="flex items-center gap-2 truncate">
        <Globe size={13} className="text-[var(--browser-accent)] shrink-0" />
        <span className="truncate font-medium">{tab.title || 'New Tab'}</span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClose(tab.id);
        }}
        className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-[var(--browser-text-muted)] hover:text-[var(--browser-danger)] hover:bg-[var(--browser-surface-hover)] transition-opacity"
      >
        <X size={12} />
      </button>
    </div>
  );
};
