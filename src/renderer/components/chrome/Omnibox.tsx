import React, { useState, useEffect, useRef } from 'react';
import { Lock, Search, Star, Sparkles, Globe, Clock, Bookmark as BookmarkIcon, ArrowRight, ZoomIn, ZoomOut } from 'lucide-react';
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
  const [zoomLevel, setZoomLevel] = useState(100);
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

  const getDomainPill = (rawUrl: string) => {
    try {
      if (!rawUrl || rawUrl === 'about:blank' || rawUrl === 'pineapple://newtab') return null;
      const parsed = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`);
      return parsed.hostname.replace('www.', '');
    } catch {
      return null;
    }
  };

  const domainName = getDomainPill(url);
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
        className={`w-full h-9 px-3 rounded-full bg-[var(--dark-teal)] border transition-all flex items-center gap-2 ${
          isFocused
            ? 'border-[var(--claude-orange)] ring-1 ring-[var(--claude-orange)] shadow-md bg-[var(--dark-teal-deep)]'
            : 'border-[var(--border-color)] hover:border-[var(--border-color-glow)]'
        }`}
      >
        {/* Security Indicator */}
        <div className="flex items-center gap-1 text-emerald-400 shrink-0" title="Connection is secure (HTTPS)">
          <Lock size={13} />
        </div>

        {/* Domain Pill (When not focused) */}
        {!isFocused && domainName && (
          <span className="text-[10px] font-semibold tracking-wider text-[var(--claude-orange-light)] bg-[var(--slate-teal)] px-2 py-0.5 rounded-full shrink-0">
            {domainName}
          </span>
        )}

        {/* Search Icon */}
        <Search size={14} className="text-[var(--text-muted)] shrink-0" />

        {/* Omnibox Text Input */}
        <input
          type="text"
          value={inputUrl}
          onFocus={() => setIsFocused(true)}
          onChange={(e) => setInputUrl(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search web or prompt Pineapple AI agent..."
          className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)] truncate font-normal"
        />

        {/* Page Zoom Control */}
        <div className="flex items-center gap-1 shrink-0 px-1 border-r border-[var(--border-color-subtle)] text-[10px] text-[var(--text-secondary)]">
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.max(50, z - 10))}
            title="Zoom Out"
            className="hover:text-[var(--text-primary)]"
          >
            <ZoomOut size={12} />
          </button>
          <span>{zoomLevel}%</span>
          <button
            type="button"
            onClick={() => setZoomLevel((z) => Math.min(200, z + 10))}
            title="Zoom In"
            className="hover:text-[var(--text-primary)]"
          >
            <ZoomIn size={12} />
          </button>
        </div>

        {/* AI Action Sparkle Button */}
        <button
          type="button"
          onClick={() => onSendAIPrompt && onSendAIPrompt(`Analyze current page: ${url}`)}
          title="Analyze current page with AI Agent"
          className="p-1 rounded-full text-[var(--claude-orange-light)] hover:bg-[var(--slate-teal)] transition-colors shrink-0"
        >
          <Sparkles size={14} />
        </button>

        {/* Bookmark Action */}
        <button
          type="button"
          onClick={() => setIsBookmarked(!isBookmarked)}
          title={isBookmarked ? 'Bookmarked' : 'Bookmark Page'}
          className={`p-1 rounded-full transition-colors shrink-0 ${
            isBookmarked
              ? 'text-[var(--claude-orange)]'
              : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
          }`}
        >
          <Star size={14} className={isBookmarked ? 'fill-current' : ''} />
        </button>
      </form>

      {/* Interactive Dropdown Suggestions */}
      {showSuggestions && (
        <div className="absolute top-11 left-0 right-0 glass-panel rounded-2xl p-3 border border-[var(--border-color-glow)] shadow-2xl flex flex-col gap-2 z-[var(--z-popover)]">
          {/* AI Prompt Action */}
          {trimmedQuery && (
            <div
              onClick={() => {
                setIsFocused(false);
                if (onSendAIPrompt) onSendAIPrompt(inputUrl);
              }}
              className="p-2.5 rounded-xl bg-[var(--dark-teal)] border border-[var(--border-color-glow)] flex items-center justify-between cursor-pointer hover:bg-[var(--slate-teal)] transition-colors"
            >
              <div className="flex items-center gap-2 text-xs font-medium text-[var(--text-primary)]">
                <Sparkles size={14} className="text-[var(--claude-orange)]" />
                <span>Ask Pineapple AI: "{inputUrl}"</span>
              </div>
              <span className="text-[10px] text-[var(--claude-orange-light)] font-semibold flex items-center gap-1">
                Prompt Agent <ArrowRight size={10} />
              </span>
            </div>
          )}

          {/* OPEN TABS SUGGESTIONS */}
          {matchingTabs.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider px-1">
                Open Tabs
              </span>
              {matchingTabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => {
                    setIsFocused(false);
                    if (onSwitchTab) onSwitchTab(tab.id);
                  }}
                  className="p-2 rounded-lg bg-[var(--dark-teal)] hover:bg-[var(--slate-teal)] flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Globe size={13} className="text-[var(--claude-orange-light)] shrink-0" />
                    <span className="truncate font-medium text-[var(--text-primary)]">
                      {tab.title || tab.url}
                    </span>
                  </div>
                  <span className="text-[10px] text-[var(--text-secondary)] border border-[var(--border-color)] px-1.5 py-0.5 rounded">
                    Switch
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* HISTORY SUGGESTIONS */}
          {matchingHistory.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider px-1">
                History
              </span>
              {matchingHistory.map((item) => (
                <div
                  key={item.id}
                  onClick={() => {
                    setIsFocused(false);
                    onNavigate(item.url);
                  }}
                  className="p-2 rounded-lg hover:bg-[var(--slate-teal)] flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <Clock size={13} className="text-[var(--text-muted)] shrink-0" />
                    <span className="truncate text-[var(--text-primary)]">{item.title}</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] truncate max-w-[140px]">
                    {item.url}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* BOOKMARKS SUGGESTIONS */}
          {matchingBookmarks.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-[10px] font-semibold text-[var(--text-muted)] uppercase tracking-wider px-1">
                Bookmarks
              </span>
              {matchingBookmarks.map((bm) => (
                <div
                  key={bm.id}
                  onClick={() => {
                    setIsFocused(false);
                    onNavigate(bm.url);
                  }}
                  className="p-2 rounded-lg hover:bg-[var(--slate-teal)] flex items-center justify-between text-xs cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-2 truncate">
                    <BookmarkIcon size={13} className="text-[var(--claude-orange)] shrink-0" />
                    <span className="truncate text-[var(--text-primary)]">{bm.title}</span>
                  </div>
                  <span className="text-[10px] text-[var(--text-muted)] truncate max-w-[140px]">
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
