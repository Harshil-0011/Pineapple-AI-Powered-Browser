import { Tab, PagePerception, AgentAction, Bookmark, ChatMessage, AIConfig } from '../shared/types';

export interface PineappleAPI {
  createTab: (url?: string) => Promise<Tab>;
  closeTab: (id: string) => Promise<void>;
  switchTab: (id: string) => Promise<void>;
  navigateTab: (id: string, url: string) => Promise<void>;
  goBack: (id: string) => Promise<void>;
  goForward: (id: string) => Promise<void>;
  reloadTab: (id: string) => Promise<void>;
  getPerception: (id: string) => Promise<PagePerception>;
  executeAction: (id: string, action: AgentAction) => Promise<boolean>;
  onTabUpdated: (callback: (tab: Tab) => void) => () => void;
  onTabsChanged: (callback: (tabs: Tab[], activeTabId: string) => void) => () => void;
}

declare global {
  interface Window {
    pineapple?: PineappleAPI;
  }
}
