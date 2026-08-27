import React, { useState, useEffect } from 'react';
import { Tab, Bookmark } from '../../../shared/types';
import { Search, Sparkles, X } from 'lucide-react';
import { CommandResult } from './CommandResult';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  tabs: Tab[];
  bookmarks: Bookmark[];
  onSwitchTab: (id: string) => void;
  onNavigate: (url: string) => void;
  onSendAIPrompt: (prompt: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  tabs,
  bookmarks,
  onSwitchTab,
  onNavigate,
  onSendAIPrompt,
}) => {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const filteredTabs = tabs.filter((t) => t.title?.toLowerCase().includes(query.toLowerCase()) || t.url.toLowerCase().includes(query.toLowerCase()));
  const filteredBookmarks = bookmarks.filter((b) => b.title?.toLowerCase().includes(query.toLowerCase()) || b.url.toLowerCase().includes(query.toLowerCase()));

  const totalItems = (query.trim() ? 1 : 0) + filteredTabs.length + filteredBookmarks.length;

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, totalItems));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + totalItems) % Math.max(1, totalItems));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (query.trim() && selectedIndex === 0) {
        onSendAIPrompt(query);
        onClose();
      } else if (filteredTabs.length > 0) {
        onSwitchTab(filteredTabs[0].id);
        onClose();
      }
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 glass-overlay z-[var(--z-modal)] flex items-start justify-center pt-24 p-4 animate-fade-in select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl glass-strong rounded-2xl p-4 flex flex-col gap-3 shadow-2xl border border-[var(--browser-accent-border)]"
      >
        <div className="flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-strong)] focus-within:border-[var(--browser-accent-border)]">
          <Search size={16} className="text-[var(--browser-accent)] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command, search open tabs, bookmarks, or ask AI..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--browser-text-primary)] placeholder-[var(--browser-text-muted)]"
          />
          <button onClick={onClose} className="p-1 rounded text-[var(--browser-text-muted)] hover:text-[var(--browser-text-primary)]">
            <X size={14} />
          </button>
        </div>

        <div className="max-h-80 overflow-y-auto flex flex-col gap-2.5 pr-1">
          {query.trim() && (
            <div
              onClick={() => {
                onSendAIPrompt(query);
                onClose();
              }}
              className={`p-3 rounded-xl flex items-center justify-between cursor-pointer transition-all border ${
                selectedIndex === 0
                  ? 'bg-[var(--browser-surface-selected)] border-[var(--browser-accent-border)]'
                  : 'bg-[var(--browser-surface-secondary)] border-[var(--browser-border-subtle)] hover:bg-[var(--browser-surface-hover)]'
              }`}
            >
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--browser-text-primary)]">
                <Sparkles size={14} className="text-[var(--browser-accent)]" />
                <span>Ask Pineapple AI: "{query}"</span>
              </div>
              <span className="text-[10px] text-[var(--browser-accent)] uppercase font-semibold px-2 py-0.5 rounded-full bg-amber-500/10">
                Execute
              </span>
            </div>
          )}

          {filteredTabs.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-[var(--browser-text-muted)] tracking-wider uppercase px-1">
                Open Tabs
              </span>
              {filteredTabs.map((tab) => (
                <CommandResult
                  key={tab.id}
                  type="tab"
                  title={tab.title || tab.url}
                  onClick={() => {
                    onSwitchTab(tab.id);
                    onClose();
                  }}
                />
              ))}
            </div>
          )}

          {filteredBookmarks.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-[var(--browser-text-muted)] tracking-wider uppercase px-1">
                Bookmarks
              </span>
              {filteredBookmarks.map((bm) => (
                <CommandResult
                  key={bm.id}
                  type="bookmark"
                  title={bm.title}
                  onClick={() => {
                    onNavigate(bm.url);
                    onClose();
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
