import React, { useState, useEffect } from 'react';
import { Tab, PagePerception, ChatMessage, Bookmark } from '../shared/types';
import { Sidebar } from './components/Sidebar';
import { TabBar } from './components/TabBar';
import { AddressBar } from './components/AddressBar';
import { BookmarksBar } from './components/BookmarksBar';
import { agentService } from './agent-service';

export const App: React.FC = () => {
  const [tabs, setTabs] = useState<Tab[]>([]);
  const [activeTabId, setActiveTabId] = useState<string>('');
  const [perception, setPerception] = useState<PagePerception | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      sender: 'ai',
      text: 'Hello! I am Pineapple, your AI companion. I can perceive active tabs and perform browser actions.',
      timestamp: Date.now(),
    },
  ]);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([
    { id: '1', title: 'Google', url: 'https://www.google.com' },
    { id: '2', title: 'GitHub', url: 'https://github.com' },
  ]);

  useEffect(() => {
    if (window.pineapple) {
      const unsubChanged = window.pineapple.onTabsChanged((updatedTabs, newActiveId) => {
        setTabs(updatedTabs);
        setActiveTabId(newActiveId);
      });

      const unsubUpdated = window.pineapple.onTabUpdated((updatedTab) => {
        setTabs((prev) => prev.map((t) => (t.id === updatedTab.id ? updatedTab : t)));
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
    window.pineapple?.switchTab(id);
  };

  const handleNavigate = (url: string) => {
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
    <div style={{ display: 'flex', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Left Pane: AI Companion Sidebar */}
      <Sidebar
        messages={messages}
        onSendMessage={handleSendMessage}
        perception={perception}
        onRefreshPerception={handleRefreshPerception}
      />

      {/* Right Pane: Browser Workspace (Tab Bar + Address Bar + Bookmarks + Browser Viewport Slot) */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', height: '100%' }}>
        <TabBar
          tabs={tabs}
          activeTabId={activeTabId}
          onSwitchTab={handleSwitchTab}
          onCloseTab={handleCloseTab}
          onCreateTab={handleCreateTab}
        />
        <AddressBar
          activeTab={activeTab}
          onNavigate={handleNavigate}
          onGoBack={handleGoBack}
          onGoForward={handleGoForward}
          onReload={handleReload}
        />
        <BookmarksBar bookmarks={bookmarks} onNavigate={handleNavigate} />
        {/* BrowserView from Main Process renders directly into the remaining right pane space */}
        <div style={{ flex: 1, backgroundColor: '#ffffff' }} />
      </div>
    </div>
  );
};

export default App;
