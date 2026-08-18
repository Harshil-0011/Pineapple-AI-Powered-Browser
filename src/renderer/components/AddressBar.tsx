import React, { useState, useEffect } from 'react';
import { Tab } from '../../shared/types';
import { ArrowLeft, ArrowRight, RotateCw, Shield, ShieldAlert, Star, Download, Clock, Search } from 'lucide-react';

interface AddressBarProps {
  activeTab: Tab | null;
  onNavigate: (url: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
  onToggleDownloads: () => void;
  onToggleHistory: () => void;
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
  }, [activeTab?.url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onNavigate(inputUrl);
    }
  };

  const isSecure = activeTab?.url.startsWith('https://');

  return (
    <div className="h-10 bg-[var(--browser-surface-secondary)] border-b border-[var(--browser-border-subtle)] px-3 flex items-center gap-2 select-none z-[var(--z-chrome)]">
      {/* Navigation Controls */}
      <div className="flex items-center gap-1">
        <button
          disabled={!activeTab?.canGoBack}
          onClick={onGoBack}
          title="Back"
          className="p-1.5 rounded-[var(--radius-sm)] text-[var(--browser-text-secondary)] disabled:opacity-30 disabled:cursor-default hover:bg-[var(--browser-surface)] hover:text-[var(--browser-text-primary)] transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
        </button>

        <button
          disabled={!activeTab?.canGoForward}
          onClick={onGoForward}
          title="Forward"
          className="p-1.5 rounded-[var(--radius-sm)] text-[var(--browser-text-secondary)] disabled:opacity-30 disabled:cursor-default hover:bg-[var(--browser-surface)] hover:text-[var(--browser-text-primary)] transition-colors"
        >
          <ArrowRight className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onReload}
          title="Reload"
          className="p-1.5 rounded-[var(--radius-sm)] text-[var(--browser-text-secondary)] hover:bg-[var(--browser-surface)] hover:text-[var(--browser-text-primary)] transition-colors"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Central Unified Omnibox */}
      <form onSubmit={handleSubmit} className="flex-1 flex">
        <div className="w-full flex items-center gap-2 bg-[var(--browser-surface)] border border-[var(--browser-border-subtle)] focus-within:border-[var(--browser-accent)] rounded-[var(--radius-lg)] px-3 h-7 transition-all">
          {isSecure ? (
            <Shield className="w-3.5 h-3.5 text-[var(--browser-success)] flex-shrink-0" />
          ) : (
            <Search className="w-3.5 h-3.5 text-[var(--browser-text-muted)] flex-shrink-0" />
          )}

          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Search Google or enter address..."
            className="flex-1 bg-transparent border-none outline-none text-xs text-[var(--browser-text-primary)] placeholder-[var(--browser-text-muted)] h-full"
          />

          <Star className="w-3.5 h-3.5 text-[var(--browser-text-muted)] hover:text-[var(--browser-accent)] cursor-pointer flex-shrink-0 transition-colors" />
        </div>
      </form>

      {/* Actions */}
      <div className="flex items-center gap-1">
        <button
          onClick={onToggleHistory}
          title="History"
          className="p-1.5 rounded-[var(--radius-sm)] text-[var(--browser-text-secondary)] hover:bg-[var(--browser-surface)] hover:text-[var(--browser-text-primary)] transition-colors"
        >
          <Clock className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onToggleDownloads}
          title="Downloads"
          className="p-1.5 rounded-[var(--radius-sm)] text-[var(--browser-text-secondary)] hover:bg-[var(--browser-surface)] hover:text-[var(--browser-text-primary)] transition-colors"
        >
          <Download className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
