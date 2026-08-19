import React, { useState } from 'react';
import {
  Tab,
  ChatMessage,
  PagePerception,
  Bookmark,
  HistoryItem,
  DownloadItem,
} from '../../shared/types';
import { RailTab } from './ControlRail';
import {
  Send,
  RefreshCw,
  Plus,
  X,
  Sparkles,
  Layers,
  FileText,
  Bookmark as BookmarkIcon,
  Clock,
  Download as DownloadIcon,
  Search,
  ExternalLink,
  Sliders,
  CheckCircle,
} from 'lucide-react';

interface SidebarProps {
  activeRailTab: RailTab;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  perception: PagePerception | null;
  onRefreshPerception: () => void;
  onOpenArtifact?: () => void;
  tabs: Tab[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onNewTab: () => void;
  activeWorkspaceName: string;
  onSwitchWorkspace: (ws: string) => void;
  bookmarks: Bookmark[];
  history: HistoryItem[];
  downloads: DownloadItem[];
  onClearHistory: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeRailTab,
  messages,
  onSendMessage,
  perception,
  onRefreshPerception,
  onOpenArtifact,
  tabs,
  activeTabId,
  onSelectTab,
  onCloseTab,
  onNewTab,
  activeWorkspaceName,
  onSwitchWorkspace,
  bookmarks,
  history,
  downloads,
  onClearHistory,
}) => {
  const [prompt, setPrompt] = useState('');
  const [aiSubTab, setAiSubTab] = useState<'chat' | 'dom' | 'skills'>('chat');
  const [filterQuery, setFilterQuery] = useState('');

  const workspaces = ['Personal', 'Work', 'Research', 'Development'];

  const handleSend = () => {
    if (!prompt.trim()) return;
    onSendMessage(prompt);
    setPrompt('');
  };

  return (
    <aside className="w-[280px] h-full bg-[var(--browser-surface)] border-r border-[var(--browser-border-subtle)] flex flex-col z-[var(--z-sidebar)] shrink-0 overflow-hidden select-none">
      {/* 1. WORKSPACES & TABS */}
      {activeRailTab === 'workspaces' && (
        <div className="flex-1 flex flex-col h-full p-3 gap-3 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] tracking-wider uppercase">
              Workspace
            </span>
            <button
              onClick={onNewTab}
              className="p-1 rounded-md text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)]"
            >
              <Plus size={14} />
            </button>
          </div>

          <div className="flex items-center gap-1 p-1 bg-[var(--browser-surface-secondary)] rounded-lg border border-[var(--browser-border-subtle)]">
            {workspaces.map((ws) => (
              <button
                key={ws}
                onClick={() => onSwitchWorkspace(ws)}
                className={`flex-1 py-1 text-[11px] font-medium rounded-md transition-all ${
                  activeWorkspaceName === ws
                    ? 'bg-[var(--browser-surface-elevated)] text-[var(--browser-text-primary)] border border-[var(--browser-border)] shadow-sm'
                    : 'text-[var(--browser-text-muted)] hover:text-[var(--browser-text-secondary)]'
                }`}
              >
                {ws}
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between mt-2">
            <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] tracking-wider uppercase">
              Open Tabs ({tabs.length})
            </span>
            <button
              onClick={onNewTab}
              className="text-[11px] text-[var(--browser-accent)] hover:underline flex items-center gap-1"
            >
              <Plus size={12} /> New Tab
            </button>
          </div>

          <div className="flex flex-col gap-1">
            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <div
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`group relative flex items-center justify-between p-2 rounded-lg cursor-pointer transition-all border ${
                    isActive
                      ? 'bg-[var(--browser-surface-selected)] border-[var(--browser-accent-border)] text-[var(--browser-text-primary)]'
                      : 'bg-transparent border-transparent text-[var(--browser-text-secondary)] hover:bg-[var(--browser-surface-hover)] hover:text-[var(--browser-text-primary)]'
                  }`}
                >
                  <div className="flex items-center gap-2 overflow-hidden flex-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--browser-accent)] opacity-60" />
                    <span className="text-xs truncate font-medium">
                      {tab.title || tab.url}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab(tab.id);
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

      {/* 2. AI COMPANION */}
      {activeRailTab === 'ai' && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="p-3 border-b border-[var(--browser-border-subtle)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-[var(--browser-accent-cyan)]" />
              <span className="text-xs font-semibold text-[var(--browser-text-primary)]">
                Pineapple AI Context
              </span>
            </div>
            {onOpenArtifact && (
              <button
                onClick={onOpenArtifact}
                className="text-[11px] text-[var(--browser-accent-purple)] hover:underline flex items-center gap-1"
              >
                <FileText size={12} /> Artifact
              </button>
            )}
          </div>

          <div className="flex items-center gap-1 p-2 bg-[var(--browser-surface-secondary)] border-b border-[var(--browser-border-subtle)]">
            {(['chat', 'dom', 'skills'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setAiSubTab(st)}
                className={`flex-1 py-1 text-[11px] font-medium uppercase rounded-md transition-all ${
                  aiSubTab === st
                    ? 'bg-[var(--browser-surface-elevated)] text-[var(--browser-accent-cyan)] border border-[var(--browser-cyan-border)]'
                    : 'text-[var(--browser-text-muted)] hover:text-[var(--browser-text-secondary)]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {aiSubTab === 'chat' && (
            <div className="flex-1 flex flex-col justify-between overflow-hidden p-3 gap-3">
              <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`p-2.5 rounded-xl text-xs max-w-[90%] ${
                      m.sender === 'user'
                        ? 'bg-[var(--browser-accent)] text-[#0B0D10] font-medium self-end'
                        : 'bg-[var(--browser-surface-secondary)] text-[var(--browser-text-primary)] border border-[var(--browser-border-subtle)] self-start'
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-2 p-1.5 bg-[var(--browser-surface-secondary)] rounded-full border border-[var(--browser-border)] focus-within:border-[var(--browser-accent-border)]">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask Pineapple AI..."
                  className="flex-1 bg-transparent border-none outline-none text-xs px-2 text-[var(--browser-text-primary)] placeholder-[var(--browser-text-muted)]"
                />
                <button
                  onClick={handleSend}
                  className="w-7 h-7 rounded-full bg-[var(--browser-accent)] text-[#0B0D10] flex items-center justify-center hover:scale-105 transition-transform"
                >
                  <Send size={12} />
                </button>
              </div>
            </div>
          )}

          {aiSubTab === 'dom' && (
            <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto text-xs font-mono">
              <div className="flex items-center justify-between pb-2 border-b border-[var(--browser-border-subtle)]">
                <span className="text-[11px] text-[var(--browser-text-muted)]">
                  AXTree Perception Tree
                </span>
                <button
                  onClick={onRefreshPerception}
                  className="p-1 rounded text-[var(--browser-text-secondary)] hover:bg-[var(--browser-surface-hover)]"
                >
                  <RefreshCw size={12} />
                </button>
              </div>
              {perception?.serializedPrompt ? (
                <pre className="whitespace-pre-wrap text-[11px] text-[var(--browser-accent-cyan)] leading-relaxed">
                  {perception.serializedPrompt}
                </pre>
              ) : (
                <span className="text-[var(--browser-text-muted)] text-[11px]">
                  No page perception captured yet.
                </span>
              )}
            </div>
          )}

          {aiSubTab === 'skills' && (
            <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto">
              <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] uppercase">
                Available Automation Skills
              </span>
              {[
                'Summarize Page',
                'Extract Interactive Controls',
                'Market Research Audit',
                'Candidate Sourcing',
              ].map((skill) => (
                <button
                  key={skill}
                  onClick={() => onSendMessage(`Run skill: ${skill}`)}
                  className="p-2 text-left rounded-lg bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] hover:border-[var(--browser-accent-border)] text-xs text-[var(--browser-text-primary)] transition-colors"
                >
                  {skill}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* 3. BOOKMARKS */}
      {activeRailTab === 'bookmarks' && (
        <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] uppercase">
              Bookmarks ({bookmarks.length})
            </span>
            <BookmarkIcon size={14} className="text-[var(--browser-accent)]" />
          </div>

          <div className="flex flex-col gap-1">
            {bookmarks.map((bm) => (
              <a
                key={bm.id}
                href={bm.url}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-2 rounded-lg bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] hover:border-[var(--browser-border)] text-xs text-[var(--browser-text-primary)] truncate transition-colors"
              >
                <span className="truncate">{bm.title}</span>
                <ExternalLink size={12} className="text-[var(--browser-text-muted)]" />
              </a>
            ))}
          </div>
        </div>
      )}

      {/* 4. HISTORY */}
      {activeRailTab === 'history' && (
        <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] uppercase">
              History
            </span>
            <button
              onClick={onClearHistory}
              className="text-[10px] text-[var(--browser-danger)] hover:underline"
            >
              Clear
            </button>
          </div>

          <div className="flex flex-col gap-1">
            {history.map((h) => (
              <div
                key={h.id}
                className="p-2 rounded-lg bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] text-xs text-[var(--browser-text-primary)] truncate"
              >
                <div className="font-medium truncate">{h.title}</div>
                <div className="text-[10px] text-[var(--browser-text-muted)] truncate">
                  {h.url}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 5. DOWNLOADS */}
      {activeRailTab === 'downloads' && (
        <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto">
          <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] uppercase">
            Recent Downloads
          </span>
          {downloads.map((d) => (
            <div
              key={d.id}
              className="p-2.5 rounded-lg bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex flex-col gap-1.5"
            >
              <div className="flex items-center justify-between text-xs font-medium text-[var(--browser-text-primary)]">
                <span className="truncate">{d.filename}</span>
                <CheckCircle size={14} className="text-[var(--browser-success)] shrink-0" />
              </div>
              <div className="w-full h-1 bg-[var(--browser-surface-elevated)] rounded-full overflow-hidden">
                <div className="h-full bg-[var(--browser-success)] w-full" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* 6. SETTINGS */}
      {activeRailTab === 'settings' && (
        <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto">
          <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] uppercase">
            Browser Settings
          </span>
          <div className="p-3 rounded-xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex flex-col gap-2 text-xs">
            <span className="font-medium text-[var(--browser-text-primary)]">
              Appearance & Layout
            </span>
            <span className="text-[11px] text-[var(--browser-text-muted)]">
              Quiet Desktop Obsidian Surface Theme
            </span>
          </div>
        </div>
      )}
    </aside>
  );
};
