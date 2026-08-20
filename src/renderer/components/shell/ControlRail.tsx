import React from 'react';
import { Layers, Bot, Bookmark, Clock, Download, Settings, Plus, Sparkles } from 'lucide-react';

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
    <aside className="w-[52px] h-full flex flex-col items-center justify-between py-3 bg.glass-subtle bg-[var(--browser-surface)] border-r border-[var(--browser-border-subtle)] z-[var(--z-sidebar)] shrink-0 select-none">
      {/* Top Brand & Primary Nav */}
      <div className="flex flex-col items-center gap-4">
        {/* Pineapple Brand Mark */}
        <button
          onClick={() => onTabSelect('workspaces')}
          title="Pineapple AI Browser"
          className="group relative w-8 h-8 rounded-full flex items-center justify-center bg-[var(--browser-surface-secondary)] text-[var(--browser-accent-cyan)] border border-[var(--browser-cyan-border)] hover:scale-105 transition-all shadow-[0_0_12px_rgba(6,182,212,0.15)]"
        >
          <Sparkles size={16} className="text-[var(--browser-accent-cyan)] group-hover:rotate-12 transition-transform" />
        </button>

        <div className="w-6 h-[1px] bg-[var(--browser-border-subtle)]" />

        {/* Rail Navigation Stack */}
        <div className="flex flex-col items-center gap-2">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onTabSelect(item.id)}
                title={item.label}
                className={`group relative w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                  isActive
                    ? 'bg-[var(--browser-surface-active)] text-[var(--browser-accent-cyan)] border border-[var(--browser-cyan-border)] shadow-[0_0_14px_rgba(6,182,212,0.18)]'
                    : 'text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)]'
                }`}
              >
                {item.icon}
                {isActive && (
                  <span className="absolute -left-1.5 top-2 bottom-2 w-[3px] bg-[var(--browser-accent-cyan)] rounded-r-full" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="flex flex-col items-center gap-2">
        {onNewTab && (
          <button
            onClick={onNewTab}
            title="New Tab"
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] transition-all"
          >
            <Plus size={18} />
          </button>
        )}

        <button
          onClick={() => onTabSelect('settings')}
          title="Settings"
          className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
            activeTab === 'settings'
              ? 'bg-[var(--browser-surface-active)] text-[var(--browser-accent-cyan)] border border-[var(--browser-cyan-border)]'
              : 'text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)]'
          }`}
        >
          <Settings size={18} />
          {activeTab === 'settings' && (
            <span className="absolute -left-1.5 top-2 bottom-2 w-[3px] bg-[var(--browser-accent-cyan)] rounded-r-full" />
          )}
        </button>
      </div>
    </aside>
  );
};
