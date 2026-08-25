import React, { useState, useEffect, useRef } from 'react';
import { Lock, Search, Star, Sparkles, Globe, Clock, Bookmark as BookmarkIcon, ArrowRight } from 'lucide-react';
import { Tab as TabType, Bookmark as BookmarkType, HistoryItem } from '../../../shared/types';

interface OmniboxProps {
  url: string;
  tabs?: TabType[];
  history?: HistoryItem[];
  bookmarks?: BookmarkType[];
  onNavigate: (url: string) => void;
  onSwitchTab?: (id: string) => void;
  onSendAIPrompt?: (prompt: string) => void;
}

export const Omnibox: React.FC<OmniboxProps> = ({
  url,
  tabs = [],
  history = [],
  bookmarks = [],
  onNavigate,
  onSwitchTab,
  onSendAIPrompt,
}) => {
  const [inputUrl, setInputUrl] = useState(url);
  const [isFocused, setIsFocused] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setInputUrl(url);
  }, [url]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmedQuery = inputUrl.trim().toLowerCase();

  const matchingTabs = tabs.filter(
    (t) => t.title?.toLowerCase().includes(trimmedQuery) || t.url.toLowerCase().includes(trimmedQuery)
  ).slice(0, 3);

  const matchingHistory = history.filter(
    (h) => h.title.toLowerCase().includes(trimmedQuery) || h.url.toLowerCase().includes(trimmedQuery)
  ).slice(0, 3);

  const matchingBookmarks = bookmarks.filter(
    (b) => b.title.toLowerCase().includes(trimmedQuery) || b.url.toLowerCase().includes(trimmedQuery)
  ).slice(0, 3);

  const showSuggestions = isFocused && (trimmedQuery.length > 0 || matchingTabs.length > 0);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (inputUrl.trim()) {
      setIsFocused(false);
      onNavigate(inputUrl.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsFocused(false);
    }
  };

  return (
    <div ref={containerRef} className="relative flex-1 max-w-3xl z-[var(--z-popover)]">
      <form
        onSubmit={handleSubmit}
        className={`w-full h-10 px-3.5 rounded-full glass-subtle bg-[var(--browser-surface-secondary)] border transition-all flex items-center gap-2.5 ${
          isFocused
            ? 'border-[var(--browser-accent-border)] bg-[var(--browser-surface-elevated)] ring-1 ring-[var(--browser-accent-border)] shadow-md'
            : 'border-[var(--browser-border)] hover:border-[var(--browser-border-strong)]'
        }`}
      >
        {/* Security Indicator */}
        <div className="flex items-center gap-1 text-[var(--browser-success)] shrink-0" title="Connection is secure (HTTPS)">
          <Lock size={13} />
        </div>

        {/* Search Icon */}
        <Search size={14} className="text-[var(--browser-text-muted)] shrink-0" />

        {/* Omnibox Text Input */}
        <input
          type="text"
          value={inputUrl}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search the web or ask Pineapple AI..."
          className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--browser-text-primary)] placeholder-[var(--browser-text-muted)] truncate font-normal"
        />

        {/* Right Action: Bookmark */}
        <button
          type="button"
          onClick={() => setIsBookmarked(!isBookmarked)}
          title={isBookmarked ? 'Bookmarked' : 'Bookmark Page'}
          className={`p-1 rounded-full transition-colors ${
            isBookmarked
              ? 'text-[var(--browser-accent)] bg-amber-500/10'
              : 'text-[var(--browser-text-muted)] hover:text-[var(--browser-text-primary)]'
          }`}
        >
          <Star size={14} className={isBookmarked ? 'fill-current' : ''} />
        </button>
      </form>

      {/* Interactive Dropdown Suggestions */}
      {showSuggestions && (
        <div className="absolute top-12 left-0 right-0 glass-strong rounded-2xl p-3 border border-[var(--browser-accent-border)] shadow-xl flex flex-col gap-2 animate-fade-in z-[var(--z-popover)]">
          {/* AI Search Suggestion */}
          {trimmedQuery && (
            <div
              onClick={() => {
                setIsFocused(false);
                if (onSendAIPrompt) onSendAIPrompt(inputUrl);
              }}
              className="p-2.5 rounded-xl bg-[var(--browser-surface-selected)] border border-[var(--browser-accent-border)] flex items-center justify-between cursor-pointer hover:bg-[var(--browser-surface-elevated)] transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--browser-text-primary)]">
                <Sparkles size={14} className="text-[var(--browser-accent)]" />
                <span>Ask Pineapple AI: "{inputUrl}"</span>
              </div>
              <span className="text-[10px] text-[var(--browser-accent)] font-semibold flex items-center gap-1">
                Ask <ArrowRight size={10} />
              </span>
            </div>
          )}

          {/* OPEN TABS SUGGESTIONS */}
          {matchingTabs.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-[var(--browser-text-muted)] uppercase tracking-wider px-1">
                Open Tabs
              </span>
              {matchingTabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => {
                    setIsFocused(false);
                    if (onSwitchTab) onSwitchTab(tab.id);
                  }}
                  className="p-2 rounded-lg bg-[var(--browser-surface-hover)] hover:bg-[var(--browser-surface-active)] flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Globe size={13} className="text-[var(--browser-accent)] shrink-0" />
                    <span className="truncate font-medium text-[var(--browser-text-primary)]">
                      {tab.title || tab.url}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--browser-text-muted)] border border-[var(--browser-border)] px-1.5 py-0.5 rounded">
                    Switch
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* HISTORY SUGGESTIONS */}
          {matchingHistory.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-[var(--browser-text-muted)] uppercase tracking-wider px-1">
                History
              </span>
              {matchingHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setIsFocused(false);
                    onNavigate(item.url);
                  }}
                  className="p-2 rounded-lg bg-transparent hover:bg-[var(--browser-surface-hover)] flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Clock size={13} className="text-[var(--browser-text-muted)] shrink-0" />
                    <span className="truncate text-[var(--browser-text-primary)]">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-[var(--browser-text-muted)] truncate max-w-[140px]">
                    {item.url}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* BOOKMARKS SUGGESTIONS */}
          {matchingBookmarks.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-[var(--browser-text-muted)] uppercase tracking-wider px-1">
                Bookmarks
              </span>
              {matchingBookmarks.map((bm) => (
                <div
                  key={bm.id}
                  onClick={() => {
                    setIsFocused(false);
                    onNavigate(bm.url);
                  }}
                  className="p-2 rounded-lg bg-transparent hover:bg-[var(--browser-surface-hover)] flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <BookmarkIcon size={13} className="text-[var(--browser-accent)] shrink-0" />
                    <span className="truncate text-[var(--browser-text-primary)]">{bm.title}</span>
                  </div>
                  <span className="text-[10px] text-[var(--browser-text-muted)] truncate max-w-[140px]">
                    {bm.url}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
