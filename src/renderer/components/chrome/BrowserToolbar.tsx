import React from 'react';
import { Tab } from '../../../shared/types';
import { NavigationControls } from './NavigationControls';
import { Omnibox } from './Omnibox';
import { ProfileControl } from './ProfileControl';
import { BrowserMenu } from './BrowserMenu';
import { Download, Clock } from 'lucide-react';

interface BrowserToolbarProps {
  activeTab: Tab | null;
  onNavigate: (url: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
  onToggleDownloads?: () => void;
  onToggleHistory?: () => void;
}

export const BrowserToolbar: React.FC<BrowserToolbarProps> = ({
  activeTab,
  onNavigate,
  onGoBack,
  onGoForward,
  onReload,
  onToggleDownloads,
  onToggleHistory,
}) => {
  return (
    <div className="w-full h-11 px-3 flex items-center gap-2 bg-[var(--browser-surface)] border-b border-[var(--browser-border-subtle)] z-[var(--z-chrome)] shrink-0 select-none">
      <NavigationControls
        canGoBack={activeTab?.canGoBack}
        canGoForward={activeTab?.canGoForward}
        onGoBack={onGoBack}
        onGoForward={onGoForward}
        onReload={onReload}
      />

      <Omnibox url={activeTab?.url || ''} onNavigate={onNavigate} />

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
        <ProfileControl />
        <BrowserMenu />
      </div>
    </div>
  );
};
