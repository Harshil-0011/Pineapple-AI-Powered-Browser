import React, { useState, useEffect } from 'react';
import { Tab, Bookmark } from '../../../shared/types';
import { Search, Sparkles } from 'lucide-react';
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

  useEffect(() => {
    if (isOpen) {
      setQuery('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 glass-overlay z-[var(--z-modal)] flex items-start justify-center pt-24 p-4 animate-fade-in select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl glass-strong rounded-2xl p-4 flex flex-col gap-3 shadow-2xl border border-[var(--browser-border-strong)]"
      >
        <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-[var(--browser-surface-secondary)] border border-[var(--browser-border)]">
          <Search size={16} className="text-[var(--browser-accent)] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command, search tabs, or ask AI..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--browser-text-primary)] placeholder-[var(--browser-text-muted)]"
          />
          <span className="text-[10px] text-[var(--browser-text-muted)] border border-[var(--browser-border)] px-1.5 py-0.5 rounded">
            ESC
          </span>
        </div>

        <div className="max-h-80 overflow-y-auto flex flex-col gap-2">
          {query.trim() && (
            <div
              onClick={() => {
                onSendAIPrompt(query);
                onClose();
              }}
              className="p-2.5 rounded-xl bg-[var(--browser-surface-selected)] border border-[var(--browser-accent-border)] flex items-center justify-between cursor-pointer hover:scale-[0.99] transition-transform"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--browser-text-primary)]">
                <Sparkles size={14} className="text-[var(--browser-accent-cyan)]" />
                <span>Ask AI: "{query}"</span>
              </div>
              <span className="text-[10px] text-[var(--browser-accent-cyan)] uppercase font-semibold">
                Execute
              </span>
            </div>
          )}

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-[var(--browser-text-muted)] tracking-wider uppercase px-1">
              Open Tabs
            </span>
            {tabs
              .filter((t) => t.title?.toLowerCase().includes(query.toLowerCase()))
              .map((tab) => (
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

          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-semibold text-[var(--browser-text-muted)] tracking-wider uppercase px-1">
              Bookmarks
            </span>
            {bookmarks
              .filter((b) => b.title?.toLowerCase().includes(query.toLowerCase()))
              .map((bm) => (
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
        </div>
      </div>
    </div>
  );
};
