import React, { useState, useEffect, useRef } from 'react';
import { Tab as TabType, PagePerception, ChatMessage, Bookmark, DownloadItem, HistoryItem } from '../shared/types';
import { BrowserShell } from './components/shell/BrowserShell';
import { MainShell } from './components/shell/MainShell';
import { BrowserViewport } from './components/shell/BrowserViewport';
import { ControlRail, RailTab } from './components/shell/ControlRail';
import { ContextSidebar } from './components/shell/ContextSidebar';
import { TabBar } from './components/chrome/TabBar';
import { BrowserToolbar } from './components/chrome/BrowserToolbar';
import { BookmarksBar } from './components/chrome/BookmarksBar';
import { WorkspaceSwitcher } from './components/workspace/WorkspaceSwitcher';
import { AIPanel } from './components/ai/AIPanel';
import { Bookmarks } from './components/browser-features/Bookmarks';
import { History } from './components/browser-features/History';
import { Downloads } from './components/browser-features/Downloads';
import { Settings } from './components/browser-features/Settings';
import { CommandPalette } from './components/command/CommandPalette';
import { ArtifactViewer } from './components/command/ArtifactViewer';
import { NewTabPage } from './components/command/NewTabPage';
import { agentService } from './agent-service';
import { Plus, X, Globe } from 'lucide-react';
import './styles.css';

export const App: React.FC = () => {
  const [activeRailTab, setActiveRailTab] = useState<RailTab>('workspaces');
  const [activeWorkspaceName, setActiveWorkspaceName] = useState<string>('Personal');
  const [themeMode, setThemeMode] = useState<'dark' | 'light'>('dark');

  const [tabs, setTabs] = useState<TabType[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>('');
  const [perception, setPerception] = useState<PagePerception | null>(null);
  const [isVerticalTabs, setIsVerticalTabs] = useState<boolean>(false);
  const [showDownloads, setShowDownloads] = useState<boolean>(false);
  const [showHistoryView, setShowHistoryView] = useState<boolean>(false);
  const [showCommandPalette, setShowCommandPalette] = useState<boolean>(false);
  const [showArtifactViewer, setShowArtifactViewer] = useState<boolean>(false);

  const viewportRef = useRef<HTMLDivElement>(null);

  const [downloads] = useState<DownloadItem[]>([
    { id: '1', filename: 'pineapple-workspace-export.pdf', url: 'https://example.com/export.pdf', progress: 100, state: 'completed', totalBytes: 2048000, receivedBytes: 2048000 },
  ]);

  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 'h1', title: 'Google Search Engine', url: 'https://www.google.com', visitedAt: Date.now() - 3600000 },
    { id: 'h2', title: 'GitHub Workspace', url: 'https://github.com', visitedAt: Date.now() - 1800000 },
  ]);

  const [bookmarks] = useState<Bookmark[]>([
    { id: '1', title: 'Google Search', url: 'https://www.google.com' },
    { id: '2', title: 'GitHub Dashboard', url: 'https://github.com' },
    { id: '3', title: 'Hacker News', url: 'https://news.ycombinator.com' },
  ]);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'ai',
      text: 'Welcome to Pineapple AI Browser. Your quiet spatial workspace is active.',
      timestamp: Date.now(),
    },
  ]);

  // Dynamic layout geometry synchronization with Electron Main Process
  useEffect(() => {
    const syncViewport = () => {
      if (viewportRef.current && (window as any).pineapple?.updateViewportBounds) {
        const rect = viewportRef.current.getBoundingClientRect();
        // If viewing history page or settings or blank tab on renderer, hide browser view
        const activeTab = tabs.find((t) => t.id === activeTabId);
        const isNewTab = !activeTab || activeTab.url === 'about:blank' || activeTab.url === 'pineapple://newtab';

        if (showHistoryView || activeRailTab === 'settings' || isNewTab) {
          (window as any).pineapple.updateViewportBounds({ x: 0, y: 0, width: 0, height: 0 });
        } else {
          (window as any).pineapple.updateViewportBounds({
            x: Math.round(rect.left),
            y: Math.round(rect.top),
            width: Math.round(rect.width),
            height: Math.round(rect.height),
          });
        }
      }
    };

    syncViewport();
    window.addEventListener('resize', syncViewport);
    const observer = new ResizeObserver(syncViewport);
    if (viewportRef.current) observer.observe(viewportRef.current);

    return () => {
      window.removeEventListener('resize', syncViewport);
      observer.disconnect();
    };
  }, [activeRailTab, isVerticalTabs, showHistoryView, activeTabId, tabs]);

  // Command Palette shortcut (Cmd+K / Ctrl+K)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowCommandPalette((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if ((window as any).pineapple) {
      const unsubChanged = (window as any).pineapple.onTabsChanged((updatedTabs: TabType[], newActiveId: string) => {
        setTabs(updatedTabs);
        setActiveTabId(newActiveId);
      });

      const unsubUpdated = (window as any).pineapple.onTabUpdated((updatedTab: TabType) => {
        setTabs((prev) => prev.map((t) => (t.id === updatedTab.id ? updatedTab : t)));
        if (updatedTab.title && updatedTab.url && updatedTab.url !== 'about:blank') {
          setHistory((prev) => [
            { id: `h_${Date.now()}`, title: updatedTab.title, url: updatedTab.url, visitedAt: Date.now() },
            ...prev,
          ]);
        }
      });

      return () => {
        unsubChanged();
        unsubUpdated();
      };
    }
  }, []);

  const activeTab = tabs.find((t) => t.id === activeTabId) || null;
  const isNewTab = !activeTab || activeTab.url === 'about:blank' || activeTab.url === 'pineapple://newtab';

  const handleCreateTab = () => {
    (window as any).pineapple?.createTab('about:blank');
  };

  const handleCloseTab = (id: string) => {
    (window as any).pineapple?.closeTab(id);
  };

  const handleSwitchTab = (id: string) => {
    setShowHistoryView(false);
    (window as any).pineapple?.switchTab(id);
  };

  const handleNavigate = (url: string) => {
    setShowHistoryView(false);
    if (activeTabId) {
      (window as any).pineapple?.navigateTab(activeTabId, url);
    }
  };

  const handleGoBack = () => {
    if (activeTabId) {
      (window as any).pineapple?.goBack(activeTabId);
    }
  };

  const handleGoForward = () => {
    if (activeTabId) {
      (window as any).pineapple?.goForward(activeTabId);
    }
  };

  const handleReload = () => {
    if (activeTabId) {
      (window as any).pineapple?.reloadTab(activeTabId);
    }
  };

  const handleRefreshPerception = async () => {
    if (activeTabId && (window as any).pineapple) {
      const p = await (window as any).pineapple.getPerception(activeTabId);
      setPerception(p);
    }
  };

  const handleSendMessage = async (text: string) => {
    const userMsg: ChatMessage = {
      id: `msg_${Date.now()}`,
      sender: 'user',
      text,
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);

    let currentP = perception;
    if (activeTabId && (window as any).pineapple) {
      currentP = await (window as any).pineapple.getPerception(activeTabId);
      setPerception(currentP);
    }

    const res = await agentService.processRequest(text, currentP || undefined);

    const aiMsg: ChatMessage = {
      id: `msg_ai_${Date.now()}`,
      sender: 'ai',
      text: res.text,
      timestamp: Date.now(),
      actionDetails: res.action,
    };
    setMessages((prev) => [...prev, aiMsg]);

    if (res.action && activeTabId && (window as any).pineapple) {
      await (window as any).pineapple.executeAction(activeTabId, res.action);
    }
  };

  return (
    <BrowserShell theme={themeMode}>
      {/* LAYER 1: Control Rail */}
      <ControlRail
        activeTab={activeRailTab}
        onTabSelect={(tab: RailTab) => setActiveRailTab(tab)}
        onNewTab={handleCreateTab}
      />

      {/* LAYER 2: Context Sidebar */}
      <ContextSidebar activeRailTab={activeRailTab}>
        {activeRailTab === 'workspaces' && (
          <div className="flex-1 flex flex-col h-full p-3.5 gap-3.5 overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] tracking-wider uppercase">
                Workspace
              </span>
              <button
                onClick={handleCreateTab}
                title="New Tab"
                className="p-1 rounded-md text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)]"
              >
                <Plus size={14} />
              </button>
            </div>

            <WorkspaceSwitcher
              workspaces={['Personal', 'Work', 'Research', 'Development']}
              activeWorkspace={activeWorkspaceName}
              onSwitch={(ws: string) => setActiveWorkspaceName(ws)}
            />

            <div className="flex items-center justify-between mt-2">
              <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] tracking-wider uppercase">
                Open Tabs ({tabs.length})
              </span>
              <button
                onClick={handleCreateTab}
                className="text-[11px] text-[var(--browser-accent-cyan)] hover:underline flex items-center gap-1 font-medium"
              >
                <Plus size={12} /> New Tab
              </button>
            </div>

            <div className="flex flex-col gap-1.5">
              {tabs.map((tab) => {
                const isActive = tab.id === activeTabId;
                return (
                  <div
                    key={tab.id}
                    onClick={() => handleSwitchTab(tab.id)}
                    className={`group relative flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all border ${
                      isActive
                        ? 'bg-[var(--browser-surface-selected)] border-[var(--browser-cyan-border)] text-[var(--browser-text-primary)] shadow-sm'
                        : 'bg-transparent border-transparent text-[var(--browser-text-secondary)] hover:bg-[var(--browser-surface-hover)] hover:text-[var(--browser-text-primary)]'
                    }`}
                  >
                    <div className="flex items-center gap-2 overflow-hidden flex-1">
                      <Globe size={13} className={isActive ? 'text-[var(--browser-accent-cyan)]' : 'text-[var(--browser-text-muted)]'} />
                      <span className="text-xs truncate font-medium">
                        {tab.title || tab.url || 'New Tab'}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCloseTab(tab.id);
                      }}
                      className="opacity-0 group-hover:opacity-100 p-1 text-[var(--browser-text-muted)] hover:text-[var(--browser-danger)] rounded-md transition-opacity"
                    >
                      <X size={12} />
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeRailTab === 'ai' && (
          <AIPanel
            messages={messages}
            onSendMessage={handleSendMessage}
            perception={perception}
            onRefreshPerception={handleRefreshPerception}
            onOpenArtifact={() => setShowArtifactViewer(true)}
          />
        )}

        {activeRailTab === 'bookmarks' && (
          <Bookmarks bookmarks={bookmarks} onNavigate={handleNavigate} />
        )}

        {activeRailTab === 'history' && (
          <History history={history} onNavigate={handleNavigate} onClearHistory={() => setHistory([])} />
        )}

        {activeRailTab === 'downloads' && (
          <Downloads downloads={downloads} />
        )}

        {activeRailTab === 'settings' && (
          <Settings
            currentTheme={themeMode}
            onToggleTheme={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
          />
        )}
      </ContextSidebar>

      {/* LAYER 3: Main Shell */}
      <MainShell>
        {!isVerticalTabs && (
          <TabBar
            tabs={tabs}
            activeTabId={activeTabId}
            isVertical={false}
            onSwitchTab={handleSwitchTab}
            onCloseTab={handleCloseTab}
            onCreateTab={handleCreateTab}
            onToggleVertical={() => setIsVerticalTabs(true)}
          />
        )}

        <BrowserToolbar
          activeTab={activeTab}
          tabs={tabs}
          history={history}
          bookmarks={bookmarks}
          onNavigate={handleNavigate}
          onSwitchTab={handleSwitchTab}
          onGoBack={handleGoBack}
          onGoForward={handleGoForward}
          onReload={handleReload}
          onToggleDownloads={() => setShowDownloads(!showDownloads)}
          onToggleHistory={() => setShowHistoryView(!showHistoryView)}
          onSendAIPrompt={handleSendMessage}
        />

        <BookmarksBar bookmarks={bookmarks} onNavigate={handleNavigate} />

        {activeRailTab === 'settings' ? (
          <Settings
            currentTheme={themeMode}
            onToggleTheme={() => setThemeMode(themeMode === 'dark' ? 'light' : 'dark')}
          />
        ) : showHistoryView ? (
          <History
            history={history}
            onNavigate={handleNavigate}
            onClearHistory={() => setHistory([])}
          />
        ) : (
          <BrowserViewport ref={viewportRef}>
            {isNewTab && (
              <NewTabPage
                onNavigate={handleNavigate}
                onSendAIPrompt={handleSendMessage}
                activeWorkspace={activeWorkspaceName}
              />
            )}
          </BrowserViewport>
        )}

        <CommandPalette
          isOpen={showCommandPalette}
          onClose={() => setShowCommandPalette(false)}
          tabs={tabs}
          bookmarks={bookmarks}
          onSwitchTab={handleSwitchTab}
          onNavigate={handleNavigate}
          onSendAIPrompt={handleSendMessage}
        />

        <ArtifactViewer
          isOpen={showArtifactViewer}
          onClose={() => setShowArtifactViewer(false)}
          title="Competitive Market Audit Matrix"
          type="table"
          data={{ summary: 'Synthesized pricing structures across top software competitors in your quiet spatial workspace.' }}
        />

        {showDownloads && (
          <div className="absolute bottom-0 right-0 z-[var(--z-floating)]">
            <Downloads downloads={downloads} onClose={() => setShowDownloads(false)} />
          </div>
        )}
      </MainShell>
    </BrowserShell>
  );
};

export default App;
