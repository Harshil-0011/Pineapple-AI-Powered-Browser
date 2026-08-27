import React from 'react';
import { Tab as TabType, Bookmark as BookmarkType, HistoryItem } from '../../../shared/types';
import { NavigationControls } from './NavigationControls';
import { Omnibox } from './Omnibox';
import { ProfileControl } from './ProfileControl';
import { BrowserMenu } from './BrowserMenu';
import { Download, Clock } from 'lucide-react';

interface BrowserToolbarProps {
  activeTab: TabType | null;
  tabs?: TabType[];
  history?: HistoryItem[];
  bookmarks?: BookmarkType[];
  onNavigate: (url: string) => void;
  onSwitchTab?: (id: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
  onToggleDownloads?: () => void;
  onToggleHistory?: () => void;
  onSendAIPrompt?: (prompt: string) => void;
}

export const BrowserToolbar: React.FC<BrowserToolbarProps> = ({
  activeTab,
  tabs = [],
  history = [],
  bookmarks = [],
  onNavigate,
  onSwitchTab,
  onGoBack,
  onGoForward,
  onReload,
  onToggleDownloads,
  onToggleHistory,
  onSendAIPrompt,
}) => {
  return (
    <div className="w-full h-11 px-3 flex items-center gap-2.5 bg-[var(--bg-surface)] border-b border-[var(--border-color)] z-[var(--z-chrome)] shrink-0 select-none">
      <NavigationControls
        canGoBack={activeTab?.canGoBack}
        canGoForward={activeTab?.canGoForward}
        onGoBack={onGoBack}
        onGoForward={onGoForward}
        onReload={onReload}
      />

      <Omnibox
        url={activeTab?.url || ''}
        tabs={tabs}
        history={history}
        bookmarks={bookmarks}
        onNavigate={onNavigate}
        onSwitchTab={onSwitchTab}
        onSendAIPrompt={onSendAIPrompt}
      />

      <div className="flex items-center gap-1 shrink-0 ml-auto">
        {onToggleHistory && (
          <button
            onClick={onToggleHistory}
            title="History"
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--slate-teal)] transition-colors"
          >
            <Clock size={15} />
          </button>
        )}
        {onToggleDownloads && (
          <button
            onClick={onToggleDownloads}
            title="Downloads"
            className="p-1.5 rounded-lg text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--slate-teal)] transition-colors"
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
