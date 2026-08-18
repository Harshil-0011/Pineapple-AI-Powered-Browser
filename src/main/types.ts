import { Tab, PagePerception, AgentAction } from '../shared/types';

export interface TabView {
  id: string;
  url: string;
  title: string;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  view: any; // Electron.WebContentsView / BrowserView
  isSleeping: boolean;
  lastActiveAt: number;
}

export interface MainIPCBridge {
  createTab: (url?: string) => Promise<Tab>;
  closeTab: (id: string) => Promise<void>;
  switchTab: (id: string) => Promise<void>;
  navigateTab: (id: string, url: string) => Promise<void>;
  goBack: (id: string) => Promise<void>;
  goForward: (id: string) => Promise<void>;
  reloadTab: (id: string) => Promise<void>;
  getPerception: (id: string) => Promise<PagePerception>;
  executeAction: (id: string, action: AgentAction) => Promise<boolean>;
}
