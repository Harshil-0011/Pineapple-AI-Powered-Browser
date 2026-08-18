import React, { useState, useEffect } from 'react';
import { Tab, PagePerception, ChatMessage, Bookmark, DownloadItem, HistoryItem } from '../shared/types';
import { ControlRail, RailTab } from './components/ControlRail';
import { Sidebar } from './components/Sidebar';
import { TabBar } from './components/TabBar';
import { AddressBar } from './components/AddressBar';
import { BookmarksBar } from './components/BookmarksBar';
import { DownloadsDrawer } from './components/DownloadsDrawer';
import { HistoryView } from './components/HistoryView';
import { CommandPalette } from './components/CommandPalette';
import { ArtifactViewer } from './components/ArtifactViewer';
import { agentService } from './agent-service';
import './styles.css';

export const App: React.FC = () => {
  const [activeRailTab, setActiveRailTab] = useState<RailTab>('workspaces');
  const [activeWorkspaceName, setActiveWorkspaceName] = useState<string>('Personal');

  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>('');
  const [perception, setPerception] = useState<PagePerception | null>(null);
  const [isVerticalTabs, setIsVerticalTabs] = useState<boolean>(false);
  const [showDownloads, setShowDownloads] = useState<boolean>(false);
  const [showHistoryView, setShowHistoryView] = useState<boolean>(false);
  const [showCommandPalette, setShowCommandPalette] = useState<boolean>(false);
  const [showArtifactViewer, setShowArtifactViewer] = useState<boolean>(false);

  const [downloads, setDownloads] = useState<DownloadItem[]>([
    { id: '1', filename: 'pineapple-workspace-export.pdf', url: 'https://example.com/export.pdf', progress: 100, state: 'completed', totalBytes: 2048000, receivedBytes: 2048000 },
  ]);

  const [history, setHistory] = useState<HistoryItem[]>([
    { id: 'h1', title: 'Google', url: 'https://www.google.com', visitedAt: Date.now() - 3600000 },
    { id: 'h2', title: 'GitHub Workspace', url: 'https://github.com', visitedAt: Date.now() - 1800000 },
  ]);

  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
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

  // Command Palette global shortcut Listener (Cmd+K / Ctrl+K)
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
    if (window.pineapple) {
      const unsubChanged = window.pineapple.onTabsChanged((updatedTabs, newActiveId) => {
        setTabs(updatedTabs);
        setActiveTabId(newActiveId);
      });

      const unsubUpdated = window.pineapple.onTabUpdated((updatedTab) => {
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

  const handleCreateTab = () => {
    window.pineapple?.createTab('https://www.google.com');
  };

  const handleCloseTab = (id: string) => {
    window.pineapple?.closeTab(id);
  };

  const handleSwitchTab = (id: string) => {
    setShowHistoryView(false);
    window.pineapple?.switchTab(id);
  };

  const handleNavigate = (url: string) => {
    setShowHistoryView(false);
    if (activeTabId) {
      window.pineapple?.navigateTab(activeTabId, url);
    }
  };

  const handleGoBack = () => {
    if (activeTabId) {
      window.pineapple?.goBack(activeTabId);
    }
  };

  const handleGoForward = () => {
    if (activeTabId) {
      window.pineapple?.goForward(activeTabId);
    }
  };

  const handleReload = () => {
    if (activeTabId) {
      window.pineapple?.reloadTab(activeTabId);
    }
  };

  const handleRefreshPerception = async () => {
    if (activeTabId && window.pineapple) {
      const p = await window.pineapple.getPerception(activeTabId);
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
    if (activeTabId && window.pineapple) {
      currentP = await window.pineapple.getPerception(activeTabId);
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

    if (res.action && activeTabId && window.pineapple) {
      await window.pineapple.executeAction(activeTabId, res.action);
    }
  };

  return (
    <div className="flex w-screen h-screen overflow-hidden bg-[var(--browser-canvas-deep)] text-[var(--browser-text-primary)] font-[var(--font-ui)] antialiased select-none">
      {/* Layer 1: Control Rail (Persistent 52px spatial anchor) */}
      <ControlRail
        activeTab={activeRailTab}
        onTabSelect={(tab) => setActiveRailTab(tab)}
        activeWorkspaceName={activeWorkspaceName}
        onNewTab={handleCreateTab}
      />

      {/* Layer 2: Context Sidebar (Contextual 280px workspace surface) */}
      <Sidebar
        activeRailTab={activeRailTab}
        messages={messages}
        onSendMessage={handleSendMessage}
        perception={perception}
        onRefreshPerception={handleRefreshPerception}
        onOpenArtifact={() => setShowArtifactViewer(true)}
        tabs={tabs}
        activeTabId={activeTabId}
        onSelectTab={handleSwitchTab}
        onCloseTab={handleCloseTab}
        onNewTab={handleCreateTab}
        activeWorkspaceName={activeWorkspaceName}
        onSwitchWorkspace={(ws) => setActiveWorkspaceName(ws)}
        bookmarks={bookmarks}
        history={history}
        downloads={downloads}
        onClearHistory={() => setHistory([])}
      />

      {/* Vertical Tab Strip Option */}
      {isVerticalTabs && (
        <TabBar
          tabs={tabs}
          activeTabId={activeTabId}
          isVertical={true}
          onSwitchTab={handleSwitchTab}
          onCloseTab={handleCloseTab}
          onCreateTab={handleCreateTab}
          onToggleVertical={() => setIsVerticalTabs(false)}
        />
      )}

      {/* Layer 3: Content Canvas (Web Viewport Chrome) */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden bg-[var(--browser-canvas-deep)]">
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
        <AddressBar
          activeTab={activeTab}
          onNavigate={handleNavigate}
          onGoBack={handleGoBack}
          onGoForward={handleGoForward}
          onReload={handleReload}
          onToggleDownloads={() => setShowDownloads(!showDownloads)}
          onToggleHistory={() => setShowHistoryView(!showHistoryView)}
        />
        <BookmarksBar bookmarks={bookmarks} onNavigate={handleNavigate} />

        {/* Viewport content area */}
        {showHistoryView ? (
          <HistoryView
            history={history}
            onNavigate={handleNavigate}
            onClearHistory={() => setHistory([])}
          />
        ) : (
          <div className="flex-1 bg-[var(--browser-canvas-deep)] relative" />
        )}

        {/* Command Palette Overlay (Cmd+K) */}
        <CommandPalette
          isOpen={showCommandPalette}
          onClose={() => setShowCommandPalette(false)}
          tabs={tabs}
          bookmarks={bookmarks}
          onSwitchTab={handleSwitchTab}
          onNavigate={handleNavigate}
          onSendAIPrompt={handleSendMessage}
        />

        {/* Visual Artifact Drawer */}
        <ArtifactViewer
          isOpen={showArtifactViewer}
          onClose={() => setShowArtifactViewer(false)}
          title="Competitive Market Audit Matrix"
          type="table"
          data={{ summary: 'Synthesized pricing structures across top software competitors.' }}
        />

        {/* Downloads Modal Drawer */}
        {showDownloads && (
          <DownloadsDrawer
            downloads={downloads}
            onClose={() => setShowDownloads(false)}
          />
        )}
      </div>
    </div>
  );
};

export default App;
