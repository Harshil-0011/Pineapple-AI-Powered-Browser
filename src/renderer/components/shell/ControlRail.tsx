import React from 'react';
import { Layers, Bot, Bookmark, Clock, Download, Settings, Plus, Compass } from 'lucide-react';

export type RailTab = 'workspaces' | 'ai' | 'bookmarks' | 'history' | 'downloads' | 'settings';

interface ControlRailProps {
  activeTab: RailTab;
  onTabSelect: (tab: RailTab) => void;
  onNewTab?: () => void;
}

export const ControlRail: React.FC<ControlRailProps> = ({
  activeTab,
  onTabSelect,
  onNewTab,
}) => {
  const navItems: { id: RailTab; icon: React.ReactNode; label: string }[] = [
    { id: 'workspaces', icon: <Layers size={18} />, label: 'Workspaces & Tabs' },
    { id: 'ai', icon: <Bot size={18} />, label: 'AI Companion' },
    { id: 'bookmarks', icon: <Bookmark size={18} />, label: 'Bookmarks' },
    { id: 'history', icon: <Clock size={18} />, label: 'History' },
    { id: 'downloads', icon: <Download size={18} />, label: 'Downloads' },
  ];

  return (
    <aside className="w-[52px] h-full flex flex-col items-center justify-between py-3 bg-[var(--browser-surface)] border-r border-[var(--browser-border-subtle)] z-[var(--z-sidebar)] shrink-0 select-none">
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={() => onTabSelect('workspaces')}
          title="Pineapple AI Browser"
          className="w-8 h-8 rounded-full flex items-center justify-center bg-[var(--browser-surface-secondary)] text-[var(--browser-accent)] border border-[var(--browser-accent-border)] hover:scale-105 transition-transform"
        >
          <Compass size={18} />
        </button>

        <div className="w-6 h-[1px] bg-[var(--browser-border-subtle)]" />

        <div className="flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabSelect(item.id)}
                title={item.label}
                className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[var(--browser-surface-active)] text-[var(--browser-accent)] border border-[var(--browser-accent-border)] shadow-[0_0_12px_rgba(138,180,255,0.15)]'
                    : 'text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)]'
                }`}
              >
                {item.icon}
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-[3px] bg-[var(--browser-accent)] rounded-r-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        {onNewTab && (
          <button
            onClick={onNewTab}
            title="New Tab"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] transition-colors"
          >
            <Plus size={18} />
          </button>
        )}

        <button
          onClick={() => onTabSelect('settings')}
          title="Settings"
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
            activeTab === 'settings'
              ? 'bg-[var(--browser-surface-active)] text-[var(--browser-accent)] border border-[var(--browser-accent-border)]'
              : 'text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)]'
          }`}
        >
          <Settings size={18} />
        </button>
      </div>
    </aside>
  );
};
