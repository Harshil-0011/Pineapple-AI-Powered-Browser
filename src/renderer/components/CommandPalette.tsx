import React, { useState, useEffect } from 'react';
import { Search, Globe, Cpu, Layers, Bookmark as BookmarkIcon, History } from 'lucide-react';
import { Tab, Bookmark } from '../../shared/types';

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
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectTab = (tabId: string) => {
    onSwitchTab(tabId);
    onClose();
  };

  const handleRunAI = () => {
    if (query.trim()) {
      onSendAIPrompt(query);
      onClose();
    }
  };

  const filteredTabs = tabs.filter(
    (t) =>
      t.title.toLowerCase().includes(query.toLowerCase()) ||
      t.url.toLowerCase().includes(query.toLowerCase())
  );

  const filteredBookmarks = bookmarks.filter(
    (b) =>
      b.title.toLowerCase().includes(query.toLowerCase()) ||
      b.url.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 bg-black/60 backdrop-blur-md z-[var(--z-modal)] flex justify-center pt-24 animate-fade-in select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[580px] max-h-[440px] bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-strong)] rounded-[var(--radius-modal)] shadow-2xl flex flex-col overflow-hidden text-[var(--browser-text-primary)]"
      >
        {/* Command Search Bar */}
        <div className="p-4 border-b border-[var(--browser-border)] flex items-center gap-3 bg-[var(--browser-surface)]">
          <Search className="w-5 h-5 text-[var(--browser-accent)] flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRunAI();
            }}
            placeholder="Search tabs, bookmarks, workspaces, or run AI command..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--browser-text-primary)] placeholder-[var(--browser-text-muted)] font-[var(--font-ui)]"
          />
          <kbd className="text-[10px] font-mono text-[var(--browser-text-muted)] bg-[var(--browser-surface-secondary)] border border-[var(--browser-border)] rounded px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        {/* Grouped Results Surface */}
        <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-4 bg-[var(--browser-surface-secondary)]">
          {/* AI Command Action */}
          {query.trim() && (
            <div>
              <div className="text-[10px] font-semibold text-[var(--browser-text-muted)] uppercase tracking-wider mb-1.5 px-2">
                AI COMMAND
              </div>
              <div
                onClick={handleRunAI}
                className="p-2.5 rounded-[var(--radius-md)] bg-[var(--browser-surface-active)] border border-[var(--browser-border-strong)] hover:border-[var(--browser-accent)] flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[var(--browser-accent)] transition-all"
              >
                <Cpu className="w-4 h-4 text-[var(--browser-accent)] flex-shrink-0" />
                <span>Execute Pineapple AI command: "{query}"</span>
              </div>
            </div>
          )}

          {/* Open Tabs */}
          <div>
            <div className="text-[10px] font-semibold text-[var(--browser-text-muted)] uppercase tracking-wider mb-1.5 px-2">
              OPEN TABS ({filteredTabs.length})
            </div>
            <div className="flex flex-col gap-1">
              {filteredTabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => handleSelectTab(tab.id)}
                  className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--browser-surface-active)] flex items-center gap-2.5 cursor-pointer text-xs text-[var(--browser-text-primary)] transition-colors"
                >
                  <Globe className="w-4 h-4 text-[var(--browser-accent)] flex-shrink-0" />
                  <span className="flex-1 truncate">{tab.title || tab.url}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bookmarks */}
          {filteredBookmarks.length > 0 && (
            <div>
              <div className="text-[10px] font-semibold text-[var(--browser-text-muted)] uppercase tracking-wider mb-1.5 px-2">
                BOOKMARKS ({filteredBookmarks.length})
              </div>
              <div className="flex flex-col gap-1">
                {filteredBookmarks.map((b) => (
                  <div
                    key={b.id}
                    onClick={() => {
                      onNavigate(b.url);
                      onClose();
                    }}
                    className="p-2 rounded-[var(--radius-md)] hover:bg-[var(--browser-surface-active)] flex items-center gap-2.5 cursor-pointer text-xs text-[var(--browser-text-primary)] transition-colors"
                  >
                    <BookmarkIcon className="w-4 h-4 text-[var(--browser-accent-secondary)] flex-shrink-0" />
                    <span className="flex-1 truncate">{b.title}</span>
                    <span className="text-[10px] text-[var(--browser-text-muted)] truncate">{b.url}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
