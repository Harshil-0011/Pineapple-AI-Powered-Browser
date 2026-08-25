import React, { useState } from 'react';
import { Sparkles, Globe, Compass, ArrowRight, Github, FileText, Clock } from 'lucide-react';

interface NewTabPageProps {
  onNavigate: (url: string) => void;
  onSendAIPrompt: (prompt: string) => void;
  activeWorkspace?: string;
}

export const NewTabPage: React.FC<NewTabPageProps> = ({
  onNavigate,
  onSendAIPrompt,
  activeWorkspace = 'Personal',
}) => {
  const [query, setQuery] = useState('');

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (query.startsWith('http://') || query.startsWith('https://') || query.includes('.')) {
      onNavigate(query.trim());
    } else {
      onSendAIPrompt(query.trim());
    }
  };

  const quickSites = [
    { title: 'Google', url: 'https://www.google.com', icon: <Globe size={18} /> },
    { title: 'GitHub', url: 'https://github.com', icon: <Github size={18} /> },
    { title: 'Hacker News', url: 'https://news.ycombinator.com', icon: <Compass size={18} /> },
    { title: 'Docs', url: 'https://docs.google.com', icon: <FileText size={18} /> },
  ];

  return (
    <div className="relative w-full h-full bg-[var(--browser-canvas-deep)] text-[var(--browser-text-primary)] flex flex-col items-center justify-center p-8 overflow-y-auto select-none">
      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center gap-8 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-widest text-[var(--browser-accent)] px-3 py-1 rounded-full bg-amber-500/10 border border-[var(--browser-accent-border)]">
            {activeWorkspace} Workspace
          </span>
          <h1 className="text-4xl font-bold font-[var(--font-display)] tracking-tight text-[var(--browser-text-primary)]">
            {getGreeting()}
          </h1>
          <p className="text-xs text-[var(--browser-text-muted)] max-w-md">
            Your quiet spatial desktop workspace is active. Search the web or prompt Pineapple AI.
          </p>
        </div>

        {/* Capsule Search Input */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-xl h-12 px-4 rounded-full glass-elevated bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-strong)] focus-within:border-[var(--browser-accent-border)] shadow-md flex items-center gap-3 transition-all"
        >
          <Sparkles size={18} className="text-[var(--browser-accent)] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the web or ask Pineapple AI..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--browser-text-primary)] placeholder-[var(--browser-text-muted)]"
          />
          <button
            type="submit"
            className="w-8 h-8 rounded-full bg-[var(--browser-accent)] text-[#0D0F14] font-semibold flex items-center justify-center hover:scale-105 transition-transform"
          >
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Quick Site Shortcuts */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {quickSites.map((site) => (
            <button
              key={site.title}
              onClick={() => onNavigate(site.url)}
              className="capsule px-4 py-2.5 text-xs text-[var(--browser-text-primary)] flex items-center gap-2 hover:border-[var(--browser-accent-border)] hover:bg-[var(--browser-surface-elevated)] transition-all"
            >
              <span className="text-[var(--browser-accent)]">{site.icon}</span>
              <span className="font-medium">{site.title}</span>
            </button>
          ))}
        </div>

        {/* Recent Workspace Activity */}
        <div className="w-full max-w-md p-4 rounded-2xl glass-subtle bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[var(--browser-text-muted)]">
            <span className="flex items-center gap-1.5">
              <Clock size={12} className="text-[var(--browser-accent)]" /> Continue where you left off
            </span>
          </div>
          <div className="flex flex-col gap-1.5 text-xs">
            <div
              onClick={() => onNavigate('https://github.com')}
              className="p-2 rounded-xl bg-transparent hover:bg-[var(--browser-surface-hover)] flex items-center justify-between cursor-pointer transition-colors"
            >
              <span className="text-[var(--browser-text-primary)] font-medium">GitHub Repository Workspace</span>
              <span className="text-[10px] text-[var(--browser-text-muted)]">github.com</span>
            </div>
            <div
              onClick={() => onNavigate('https://www.google.com')}
              className="p-2 rounded-xl bg-transparent hover:bg-[var(--browser-surface-hover)] flex items-center justify-between cursor-pointer transition-colors"
            >
              <span className="text-[var(--browser-text-primary)] font-medium">Google Search Engine</span>
              <span className="text-[10px] text-[var(--browser-text-muted)]">google.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
