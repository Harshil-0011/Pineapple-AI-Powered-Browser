import React from 'react';
import { Tab as TabType } from '../../../shared/types';
import { Globe, X, Moon } from 'lucide-react';

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
      className={`group relative flex items-center justify-between gap-2 px-3 py-1 rounded-xl cursor-pointer transition-all border text-xs select-none ${
        isActive
          ? 'bg-[var(--browser-surface-elevated)] border-[var(--browser-accent-border)] text-[var(--browser-text-primary)] shadow-sm'
          : 'bg-transparent border-transparent text-[var(--browser-text-secondary)] hover:bg-[var(--browser-surface-hover)] hover:text-[var(--browser-text-primary)]'
      } ${isVertical ? 'w-full h-8' : 'h-7 max-w-[220px] min-w-[120px]'}`}
    >
      <div className="flex items-center gap-2 truncate">
        <Globe size={13} className={isActive ? 'text-[var(--browser-accent)]' : 'text-[var(--browser-text-muted)]'} />
        <span className="truncate font-medium">{tab.title || 'New Tab'}</span>
      </div>

      <div className="flex items-center gap-1 shrink-0">
        {tab.isSleeping && (
          <span title="Tab sleeping to save memory">
            <Moon size={11} className="text-[var(--browser-text-muted)]" />
          </span>
        )}

        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(tab.id);
          }}
          title="Close Tab"
          className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-[var(--browser-text-muted)] hover:text-[var(--browser-danger)] hover:bg-[var(--browser-surface-hover)] transition-opacity"
        >
          <X size={12} />
        </button>
      </div>
    </div>
  );
};
