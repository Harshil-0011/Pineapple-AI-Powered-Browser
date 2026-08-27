export interface Tab {
  id: string;
  url: string;
  title: string;
  favicon?: string;
  isLoading: boolean;
  canGoBack: boolean;
  canGoForward: boolean;
  isSleeping?: boolean;
  isPlayingAudio?: boolean;
}

export type TabInfo = Tab;

export interface Bookmark {
  id: string;
  title: string;
  url: string;
  favicon?: string;
}

export type BookmarkItem = Bookmark;

export interface HistoryItem {
  id: string;
  url: string;
  title: string;
  visitedAt: number;
  timestamp?: number;
}

export interface DownloadItem {
  id: string;
  filename: string;
  url: string;
  receivedBytes: number;
  totalBytes: number;
  state: 'progressing' | 'completed' | 'cancelled' | 'interrupted' | 'paused';
  progress?: number;
  status?: string;
}

export interface InteractiveElement {
  ref: number;
  tagName: string;
  role: string;
  text: string;
  value?: string;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface PagePerception {
  tabId: string;
  url: string;
  title: string;
  elements: InteractiveElement[];
  serializedPrompt: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai' | 'system';
  text: string;
  timestamp: number;
  actionDetails?: AgentAction;
}

export type AgentActionType = 'click' | 'type' | 'navigate' | 'scroll' | 'ask_human' | 'finish';

export interface AgentAction {
  type: AgentActionType;
  ref?: number;
  text?: string;
  url?: string;
  reasoning: string;
}

export interface AIConfig {
  provider: 'mock' | 'openai' | 'anthropic' | 'ollama';
  apiKey?: string;
  model?: string;
}
