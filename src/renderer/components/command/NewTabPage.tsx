import React, { useState } from 'react';
import { Sparkles, Globe, Compass, ArrowRight, Github, FileText, Clock, Bookmark, Laptop, Briefcase, BookOpen } from 'lucide-react';

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

  const getWorkspaceIcon = () => {
    switch (activeWorkspace.toLowerCase()) {
      case 'work':
        return <Briefcase size={12} />;
      case 'research':
        return <BookOpen size={12} />;
      case 'development':
        return <Laptop size={12} />;
      default:
        return <Sparkles size={12} />;
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    if (query.startsWith('http://') || query.startsWith('https://') || (query.includes('.') && !query.includes(' '))) {
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
    <div className="relative w-full h-full bg-[var(--bg-base)] text-[var(--text-primary)] flex flex-col items-center justify-center p-8 overflow-y-auto select-none">
      {/* Background Ambient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[var(--dark-teal)] via-[var(--bg-base)] to-[var(--dark-teal-deep)] opacity-60 pointer-events-none" />

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center gap-8 animate-fade-in">
        {/* Workspace Pill & Greeting */}
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-[11px] font-semibold uppercase tracking-widest text-[var(--claude-orange-light)] px-3 py-1 rounded-full bg-[var(--dark-teal)] border border-[var(--border-color-glow)] flex items-center gap-1.5 shadow-md">
            {getWorkspaceIcon()} {activeWorkspace} Workspace
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] font-sans">
            {getGreeting()}
          </h1>
          <p className="text-xs text-[var(--text-secondary)] max-w-md">
            Your spatial desktop workspace is active. Search the web or prompt Pineapple AI.
          </p>
        </div>

        {/* Ambient Glassmorphism Capsule Search Bar */}
        <form
          onSubmit={handleSearch}
          className="w-full max-w-xl h-12 px-4 rounded-full glass-panel bg-[var(--dark-teal)] border border-[var(--border-color-glow)] focus-within:border-[var(--claude-orange)] shadow-xl flex items-center gap-3 transition-all"
        >
          <Sparkles size={18} className="text-[var(--claude-orange)] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search web or prompt Pineapple AI agent..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--text-primary)] placeholder-[var(--text-muted)]"
          />
          <button
            type="submit"
            className="w-8 h-8 rounded-full bg-[var(--claude-orange)] text-white font-semibold flex items-center justify-center hover:scale-105 transition-transform shadow-md"
          >
            <ArrowRight size={14} />
          </button>
        </form>

        {/* Quick Dial Shortcuts */}
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {quickSites.map((site) => (
            <button
              key={site.title}
              onClick={() => onNavigate(site.url)}
              className="px-4 py-2.5 rounded-2xl glass-card bg-[var(--dark-teal)] border border-[var(--border-color-subtle)] text-xs text-[var(--text-primary)] flex items-center gap-2.5 hover:border-[var(--border-color-glow)] hover:bg-[var(--slate-teal)] transition-all shadow-sm"
            >
              <span className="text-[var(--claude-orange-light)]">{site.icon}</span>
              <span className="font-medium">{site.title}</span>
            </button>
          ))}
        </div>

        {/* Recent Workspace Cards */}
        <div className="w-full max-w-md p-4 rounded-2xl glass-card bg-[var(--dark-teal-deep)] border border-[var(--border-color)] flex flex-col gap-3 shadow-lg">
          <div className="flex items-center justify-between text-[11px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-[var(--claude-orange)]" /> Recent Workspace History
            </span>
          </div>
          <div className="flex flex-col gap-1.5 text-xs">
            <div
              onClick={() => onNavigate('https://github.com')}
              className="p-2.5 rounded-xl bg-transparent hover:bg-[var(--slate-teal)] flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <Github size={14} className="text-[var(--claude-orange-light)]" />
                <span className="text-[var(--text-primary)] font-medium">GitHub Repository Workspace</span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">github.com</span>
            </div>
            <div
              onClick={() => onNavigate('https://www.google.com')}
              className="p-2.5 rounded-xl bg-transparent hover:bg-[var(--slate-teal)] flex items-center justify-between cursor-pointer transition-colors"
            >
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-[var(--claude-orange-light)]" />
                <span className="text-[var(--text-primary)] font-medium">Google Search Engine</span>
              </div>
              <span className="text-[10px] text-[var(--text-muted)]">google.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
