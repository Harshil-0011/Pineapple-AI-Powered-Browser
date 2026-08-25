import React from 'react';
import { Tab as TabType } from '../../../shared/types';
import { Tab } from './Tab';
import { Plus, LayoutList, LayoutGrid } from 'lucide-react';

interface TabBarProps {
  tabs: TabType[];
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
      <div
        className={`flex items-center gap-1 overflow-x-auto no-scrollbar ${
          isVertical ? 'flex-col w-full flex-1 overflow-y-auto' : 'flex-1 h-full'
        }`}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            tab={tab}
            isActive={tab.id === activeTabId}
            isVertical={isVertical}
            onSelect={onSwitchTab}
            onClose={onCloseTab}
          />
        ))}
      </div>

      <div className="flex items-center gap-1 shrink-0 ml-auto">
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
