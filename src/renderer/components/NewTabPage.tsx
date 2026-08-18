import React, { useState } from 'react';
import { Search, Sparkles, Globe, Cpu } from 'lucide-react';
import { Bookmark } from '../../shared/types';

interface NewTabPageProps {
  bookmarks: Bookmark[];
  onNavigate: (url: string) => void;
  onSendAIPrompt: (prompt: string) => void;
}

export const NewTabPage: React.FC<NewTabPageProps> = ({
  bookmarks,
  onNavigate,
  onSendAIPrompt,
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onNavigate(query);
    }
  };

  const aiPrompts = [
    'Analyze competitor pricing on active page',
    'Extract lead profiles into Google Sheets format',
    'Summarize key insights and top decisions',
    'Draft a personalized outreach email to prospect',
  ];

  return (
    <div className="w-full h-full bg-[var(--browser-canvas-deep)] text-[var(--browser-text-primary)] flex flex-col items-center justify-center p-8 overflow-y-auto select-none">
      {/* Expressive Brand Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-[var(--radius-xl)] bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-strong)] accent-glow mb-4">
          <Sparkles className="w-8 h-8 text-[var(--browser-accent)]" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight font-[var(--font-display)] text-[var(--browser-text-primary)] mb-2">
          Pineapple AI
        </h1>
        <p className="text-sm text-[var(--browser-text-secondary)] max-w-md mx-auto">
          A quiet spatial workspace designed for fluid navigation and autonomous agent support.
        </p>
      </div>

      {/* Central Omnibox Search Bar */}
      <form onSubmit={handleSearch} className="w-full max-w-xl mb-10">
        <div className="flex items-center bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-strong)] focus-within:border-[var(--browser-accent)] rounded-[var(--radius-modal)] px-4 py-3 shadow-xl transition-all">
          <Search className="w-5 h-5 text-[var(--browser-accent)] mr-3 flex-shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the web or ask Pineapple AI..."
            className="flex-1 bg-transparent border-none outline-none text-sm text-[var(--browser-text-primary)] placeholder-[var(--browser-text-muted)]"
          />
        </div>
      </form>

      {/* Quick Destinations Grid */}
      <div className="w-full max-w-xl mb-8">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--browser-text-muted)] mb-3">
          Quick Destinations
        </h3>
        <div className="grid grid-cols-4 gap-3">
          {bookmarks.map((bm) => (
            <div
              key={bm.id}
              onClick={() => onNavigate(bm.url)}
              className="bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] hover:border-[var(--browser-border)] rounded-[var(--radius-lg)] p-3.5 flex flex-col items-center gap-2 cursor-pointer transition-all group"
            >
              <div className="w-9 h-9 rounded-[var(--radius-md)] bg-[var(--browser-surface)] flex items-center justify-center text-[var(--browser-accent)] group-hover:text-[var(--browser-text-primary)] transition-colors">
                <Globe className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-[var(--browser-text-primary)] truncate w-full text-center">
                {bm.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Suggested AI Prompts */}
      <div className="w-full max-w-xl">
        <h3 className="text-[11px] font-semibold uppercase tracking-wider text-[var(--browser-text-muted)] mb-3">
          Suggested AI Actions
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {aiPrompts.map((prompt, idx) => (
            <div
              key={idx}
              onClick={() => onSendAIPrompt(prompt)}
              className="bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] hover:border-[var(--browser-accent)] rounded-[var(--radius-md)] p-3 text-xs text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] cursor-pointer flex items-center gap-2.5 transition-all"
            >
              <Cpu className="w-4 h-4 text-[var(--browser-accent)] flex-shrink-0" />
              <span className="truncate">{prompt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
