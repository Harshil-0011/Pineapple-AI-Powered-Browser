import React, { useState } from 'react';
import { HistoryItem } from '../../../shared/types';
import { Clock, Search, Trash2, Globe, ExternalLink } from 'lucide-react';

interface HistoryProps {
  history: HistoryItem[];
  onNavigate: (url: string) => void;
  onClearHistory: () => void;
}

export const History: React.FC<HistoryProps> = ({ history, onNavigate, onClearHistory }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full h-full bg-[var(--browser-canvas-deep)] text-[var(--browser-text-primary)] p-8 overflow-y-auto select-none">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">
        <div className="flex items-center justify-between pb-4 border-b border-[var(--browser-border-subtle)]">
          <div className="flex items-center gap-3">
            <Clock size={24} className="text-[var(--browser-warning)]" />
            <h1 className="text-xl font-bold font-[var(--font-display)]">Browsing History</h1>
          </div>
          <button
            onClick={onClearHistory}
            className="capsule px-3 py-1.5 text-xs text-[var(--browser-danger)] border-[var(--browser-danger)] hover:bg-[var(--browser-surface-hover)] flex items-center gap-1.5"
          >
            <Trash2 size={14} /> Clear History
          </button>
        </div>

        <div className="flex items-center bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] rounded-full px-4 py-2.5">
          <Search size={16} className="text-[var(--browser-text-muted)] mr-2.5 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search history by title or URL..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--browser-text-primary)] placeholder-[var(--browser-text-muted)]"
          />
        </div>

        <div className="flex flex-col gap-2">
          {filteredHistory.length === 0 ? (
            <div className="text-center py-12 text-[var(--browser-text-muted)] text-xs">
              No history entries found.
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate(item.url)}
                className="bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] hover:border-[var(--browser-border)] rounded-xl p-3 flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-3 flex-1 overflow-hidden">
                  <Globe size={16} className="text-[var(--browser-accent)] shrink-0" />
                  <div className="overflow-hidden">
                    <div className="text-xs font-medium text-[var(--browser-text-primary)] truncate">
                      {item.title}
                    </div>
                    <div className="text-[11px] text-[var(--browser-text-muted)] truncate">
                      {item.url}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-4">
                  <span className="text-[10px] text-[var(--browser-text-muted)] font-mono">
                    {new Date(item.visitedAt || item.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <ExternalLink size={14} className="text-[var(--browser-text-muted)]" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
