import React from 'react';
import { Tab } from '../../shared/types';
import { Plus, X, Moon, LayoutList } from 'lucide-react';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  isVertical: boolean;
  onSwitchTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onCreateTab: () => void;
  onToggleVertical: () => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTabId,
  isVertical,
  onSwitchTab,
  onCloseTab,
  onCreateTab,
  onToggleVertical,
}) => {
  if (isVertical) {
    return (
      <div className="w-52 h-full bg-[var(--browser-surface)] border-r border-[var(--browser-border-subtle)] flex flex-col p-2 gap-1 select-none">
        <div className="flex items-center justify-between pb-2 border-b border-[var(--browser-border-subtle)] px-1">
          <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] uppercase tracking-wider">
            Tabs ({tabs.length})
          </span>
          <button
            onClick={onToggleVertical}
            title="Switch to horizontal tabs"
            className="text-[var(--browser-text-muted)] hover:text-[var(--browser-text-primary)] transition-colors"
          >
            <LayoutList className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto flex flex-col gap-1">
          {tabs.map((tab) => {
            const isActive = tab.id === activeTabId;
            return (
              <div
                key={tab.id}
                onClick={() => onSwitchTab(tab.id)}
                className={`group flex items-center gap-2 px-2.5 py-1.5 rounded-[var(--radius-md)] cursor-pointer text-xs transition-all border ${
                  isActive
                    ? 'bg-[var(--browser-surface-active)] text-[var(--browser-text-primary)] border-[var(--browser-border)] font-medium'
                    : 'text-[var(--browser-text-secondary)] border-transparent hover:bg-[var(--browser-surface-secondary)] hover:text-[var(--browser-text-primary)]'
                }`}
              >
                {tab.isSleeping ? <Moon className="w-3 h-3 text-[var(--browser-accent)]" /> : null}
                <span className="flex-1 truncate">{tab.title || 'New Tab'}</span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id);
                  }}
                  className="opacity-0 group-hover:opacity-100 text-[var(--browser-text-muted)] hover:text-[var(--browser-danger)] transition-opacity"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            );
          })}
        </div>

        <button
          onClick={onCreateTab}
          className="flex items-center justify-center gap-1.5 bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] hover:border-[var(--browser-border)] text-[var(--browser-text-primary)] rounded-[var(--radius-md)] p-1.5 text-xs font-medium transition-all"
        >
          <Plus className="w-3.5 h-3.5 text-[var(--browser-accent)]" /> New Tab
        </button>
      </div>
    );
  }

  return (
    <div className="h-8 bg-[var(--browser-canvas-deep)] px-2 border-b border-[var(--browser-border-subtle)] flex items-center justify-between overflow-x-auto select-none z-[var(--z-chrome)]">
      <div className="flex items-center gap-1 flex-1 overflow-x-auto">
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => onSwitchTab(tab.id)}
              className={`group flex items-center gap-2 h-7 px-3 rounded-t-[var(--radius-md)] cursor-pointer text-xs max-w-[200px] min-w-[110px] transition-all border ${
                isActive
                  ? 'bg-[var(--browser-surface)] text-[var(--browser-text-primary)] border-[var(--browser-border-subtle)] border-b-transparent font-medium'
                  : 'bg-transparent text-[var(--browser-text-muted)] border-transparent hover:text-[var(--browser-text-secondary)] hover:bg-[var(--browser-surface-secondary)]'
              }`}
            >
              {tab.isSleeping ? <Moon className="w-3 h-3 text-[var(--browser-accent)] flex-shrink-0" /> : null}
              <span className="flex-1 truncate">{tab.isLoading ? 'Loading...' : tab.title || 'New Tab'}</span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-[var(--browser-text-muted)] hover:text-[var(--browser-danger)] transition-opacity"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          );
        })}

        <button
          onClick={onCreateTab}
          title="New Tab"
          className="w-6 h-6 rounded-[var(--radius-sm)] bg-[var(--browser-surface-secondary)] hover:bg-[var(--browser-surface-active)] text-[var(--browser-text-muted)] hover:text-[var(--browser-text-primary)] flex items-center justify-center transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>

      <button
        onClick={onToggleVertical}
        title="Switch to vertical tab strip"
        className="text-[var(--browser-text-muted)] hover:text-[var(--browser-text-primary)] p-1 transition-colors"
      >
        <LayoutList className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};
