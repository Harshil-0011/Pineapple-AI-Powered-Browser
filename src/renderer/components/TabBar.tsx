import React from 'react';
import { Tab } from '../../shared/types';
import { Plus, X, Globe, LayoutList, LayoutGrid } from 'lucide-react';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  isVertical?: boolean;
  onSwitchTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onCreateTab: () => void;
  onToggleVertical?: () => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTabId,
  isVertical = false,
  onSwitchTab,
  onCloseTab,
  onCreateTab,
  onToggleVertical,
}) => {
  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 bg-[var(--browser-surface)] border-b border-[var(--browser-border-subtle)] z-[var(--z-chrome)] select-none shrink-0 ${
        isVertical ? 'flex-col w-[200px] h-full border-r border-b-0' : 'w-full h-9'
      }`}
    >
      {/* Tab Strip List */}
      <div
        className={`flex items-center gap-1 overflow-x-auto no-scrollbar ${
          isVertical ? 'flex-col w-full flex-1 overflow-y-auto' : 'flex-1 h-full'
        }`}
      >
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => onSwitchTab(tab.id)}
              className={`group relative flex items-center justify-between gap-2 px-3 py-1 rounded-lg cursor-pointer transition-all border text-xs max-w-[200px] min-w-[120px] ${
                isActive
                  ? 'bg-[var(--browser-surface-secondary)] border-[var(--browser-border-strong)] text-[var(--browser-text-primary)] shadow-sm'
                  : 'bg-transparent border-transparent text-[var(--browser-text-secondary)] hover:bg-[var(--browser-surface-hover)] hover:text-[var(--browser-text-primary)]'
              } ${isVertical ? 'w-full max-w-full' : 'h-7'}`}
            >
              <div className="flex items-center gap-2 truncate">
                <Globe size={13} className="text-[var(--browser-accent)] shrink-0" />
                <span className="truncate font-medium">{tab.title || 'New Tab'}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-[var(--browser-text-muted)] hover:text-[var(--browser-danger)] hover:bg-[var(--browser-surface-hover)] transition-opacity"
              >
                <X size={12} />
              </button>
            </div>
          );
        })}
      </div>

      {/* Control Actions */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onCreateTab}
          title="New Tab"
          className="p-1 rounded-lg text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] transition-colors"
        >
          <Plus size={14} />
        </button>

        {onToggleVertical && (
          <button
            onClick={onToggleVertical}
            title="Toggle Vertical Tabs"
            className="p-1 rounded-lg text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] transition-colors"
          >
            {isVertical ? <LayoutGrid size={14} /> : <LayoutList size={14} />}
          </button>
        )}
      </div>
    </div>
  );
};
