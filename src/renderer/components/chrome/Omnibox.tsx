import React, { useState, useEffect } from 'react';
import { Lock, Search, Star } from 'lucide-react';

interface OmniboxProps {
  url: string;
  onNavigate: (url: string) => void;
}

export const Omnibox: React.FC<OmniboxProps> = ({ url, onNavigate }) => {
  const [inputUrl, setInputUrl] = useState(url);

  useEffect(() => {
    setInputUrl(url);
  }, [url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onNavigate(inputUrl.trim());
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 max-w-3xl h-8 px-3 rounded-full bg-[var(--browser-surface-secondary)] border border-[var(--browser-border)] focus-within:border-[var(--browser-accent-border)] focus-within:ring-2 focus-within:ring-[rgba(138,180,255,0.15)] flex items-center gap-2 transition-all"
    >
      <Lock size={13} className="text-[var(--browser-success)] shrink-0" />
      <Search size={13} className="text-[var(--browser-text-muted)] shrink-0" />
      <input
        type="text"
        value={inputUrl}
        onChange={(e) => setInputUrl(e.target.value)}
        placeholder="Search Google or enter address..."
        className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--browser-text-primary)] placeholder-[var(--browser-text-muted)] truncate"
      />
      <button
        type="button"
        title="Bookmark Page"
        className="p-1 text-[var(--browser-text-muted)] hover:text-[var(--browser-accent)] transition-colors"
      >
        <Star size={13} />
      </button>
    </form>
  );
};
