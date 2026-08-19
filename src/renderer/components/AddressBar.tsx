import React, { useState, useEffect } from 'react';
import { Tab } from '../../shared/types';
import {
  ArrowLeft,
  ArrowRight,
  RotateCw,
  ShieldCheck,
  Search,
  Star,
  Download,
  Clock,
  Lock,
} from 'lucide-react';

interface AddressBarProps {
  activeTab: Tab | null;
  onNavigate: (url: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
  onToggleDownloads?: () => void;
  onToggleHistory?: () => void;
}

export const AddressBar: React.FC<AddressBarProps> = ({
  activeTab,
  onNavigate,
  onGoBack,
  onGoForward,
  onReload,
  onToggleDownloads,
  onToggleHistory,
}) => {
  const [inputUrl, setInputUrl] = useState('');

  useEffect(() => {
    if (activeTab) {
      setInputUrl(activeTab.url);
    }
  }, [activeTab]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onNavigate(inputUrl.trim());
    }
  };

  return (
    <div className="w-full h-11 px-3 flex items-center gap-2 bg-[var(--browser-surface)] border-b border-[var(--browser-border-subtle)] z-[var(--z-chrome)] shrink-0 select-none">
      {/* Back / Forward / Reload Controls */}
      <div className="flex items-center gap-1 shrink-0">
        <button
          onClick={onGoBack}
          disabled={!activeTab?.canGoBack}
          className="p-1.5 rounded-lg text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] disabled:opacity-40 transition-colors"
        >
          <ArrowLeft size={15} />
        </button>
        <button
          onClick={onGoForward}
          disabled={!activeTab?.canGoForward}
          className="p-1.5 rounded-lg text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] disabled:opacity-40 transition-colors"
        >
          <ArrowRight size={15} />
        </button>
        <button
          onClick={onReload}
          className="p-1.5 rounded-lg text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] transition-colors"
        >
          <RotateCw size={15} />
        </button>
      </div>

      {/* Capsule Omnibox Input */}
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

      {/* Action Drawer Triggers */}
      <div className="flex items-center gap-1 shrink-0 ml-auto">
        {onToggleHistory && (
          <button
            onClick={onToggleHistory}
            title="History"
            className="p-1.5 rounded-lg text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] transition-colors"
          >
            <Clock size={15} />
          </button>
        )}
        {onToggleDownloads && (
          <button
            onClick={onToggleDownloads}
            title="Downloads"
            className="p-1.5 rounded-lg text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] transition-colors"
          >
            <Download size={15} />
          </button>
        )}
      </div>
    </div>
  );
};
