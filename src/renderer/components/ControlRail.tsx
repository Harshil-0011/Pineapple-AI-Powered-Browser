import React from 'react';
import {
  Globe,
  Bot,
  Bookmark,
  History,
  Download,
  Settings,
  Layers,
  Plus,
  Compass
} from 'lucide-react';

export type RailTab = 'workspaces' | 'ai' | 'bookmarks' | 'history' | 'downloads' | 'settings';

interface ControlRailProps {
  activeTab: RailTab;
  onTabSelect: (tab: RailTab) => void;
  activeWorkspaceName?: string;
  onNewTab: () => void;
}

export const ControlRail: React.FC<ControlRailProps> = ({
  activeTab,
  onTabSelect,
  activeWorkspaceName = 'Personal',
  onNewTab,
}) => {
  const items: { id: RailTab; label: string; icon: React.ReactNode }[] = [
    { id: 'workspaces', label: 'Workspaces & Tabs', icon: <Layers className="w-5 h-5" /> },
    { id: 'ai', label: 'AI Companion', icon: <Bot className="w-5 h-5" /> },
    { id: 'bookmarks', label: 'Bookmarks', icon: <Bookmark className="w-5 h-5" /> },
    { id: 'history', label: 'History', icon: <History className="w-5 h-5" /> },
    { id: 'downloads', label: 'Downloads', icon: <Download className="w-5 h-5" /> },
  ];

  return (
    <div className="w-[52px] min-w-[52px] h-full bg-[var(--browser-canvas-deep)] border-r border-[var(--browser-border-subtle)] flex flex-col items-center justify-between py-3 z-[var(--z-sidebar)] select-none">
      {/* Top Section: Brand & Navigation */}
      <div className="flex flex-col items-center gap-4 w-full">
        {/* App Spatial Anchor Icon */}
        <button
          onClick={onNewTab}
          title="New Tab / Home"
          className="w-9 h-9 rounded-[var(--radius-lg)] bg-[var(--browser-surface-secondary)] border border-[var(--browser-border)] flex items-center justify-center text-[var(--browser-accent)] hover:border-[var(--browser-accent)] transition-all duration-150"
        >
          <Compass className="w-5 h-5" />
        </button>

        <div className="w-6 h-[1px] bg-[var(--browser-border-subtle)] my-1" />

        {/* Primary Controls Rail */}
        <div className="flex flex-col items-center gap-2 w-full px-2">
          {items.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabSelect(item.id)}
                title={item.label}
                className={`relative w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center transition-all duration-150 group ${
                  isActive
                    ? 'bg-[var(--browser-surface-active)] text-[var(--browser-accent)] border border-[var(--browser-border-strong)]'
                    : 'text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-secondary)] border border-transparent'
                }`}
              >
                {item.icon}
                {/* Subtle active spatial dot indicator */}
                {isActive && (
                  <span className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-1 h-3 rounded-r-full bg-[var(--browser-accent)]" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Section: Workspace Indicator & Settings */}
      <div className="flex flex-col items-center gap-3 w-full px-2">
        <button
          onClick={onNewTab}
          title="New Page"
          className="w-9 h-9 rounded-[var(--radius-md)] text-[var(--browser-text-muted)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-secondary)] flex items-center justify-center transition-colors"
        >
          <Plus className="w-5 h-5" />
        </button>

        <div className="w-6 h-[1px] bg-[var(--browser-border-subtle)] my-1" />

        <button
          onClick={() => onTabSelect('settings')}
          title="Settings"
          className={`w-9 h-9 rounded-[var(--radius-md)] flex items-center justify-center transition-all duration-150 ${
            activeTab === 'settings'
              ? 'bg-[var(--browser-surface-active)] text-[var(--browser-accent)] border border-[var(--browser-border-strong)]'
              : 'text-[var(--browser-text-muted)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-secondary)] border border-transparent'
          }`}
        >
          <Settings className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};
