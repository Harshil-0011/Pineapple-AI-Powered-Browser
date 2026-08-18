import React, { useState } from 'react';
import { ChatMessage, PagePerception, TabInfo, BookmarkItem, HistoryItem, DownloadItem } from '../../shared/types';
import {
  Bot, User, Send, RefreshCw, Cpu, Sparkles, FileText,
  Plus, X, Trash2, Folder, ExternalLink, Download, Clock, Bookmark, Layers
} from 'lucide-react';
import { VoiceHUD } from './VoiceHUD';
import { RailTab } from './ControlRail';
import { SettingsView } from './SettingsView';

interface SidebarProps {
  activeRailTab: RailTab;
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  perception: PagePerception | null;
  onRefreshPerception: () => void;
  onOpenArtifact?: () => void;
  // Tabs & Workspaces
  tabs: TabInfo[];
  activeTabId: string;
  onSelectTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onNewTab: () => void;
  activeWorkspaceName: string;
  onSwitchWorkspace: (workspaceName: string) => void;
  // Bookmarks, History & Downloads
  bookmarks?: BookmarkItem[];
  history?: HistoryItem[];
  downloads?: DownloadItem[];
  onClearHistory?: () => void;
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
  bookmarks = [],
  history = [],
  downloads = [],
  onClearHistory,
}) => {
  const [inputText, setInputText] = useState('');
  const [aiSubTab, setAiSubTab] = useState<'chat' | 'perception' | 'skills'>('chat');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const skills = [
    { title: 'Sales Prospecting & Lead Gen', desc: 'Query Sales Navigator & deduplicate against Salesforce' },
    { title: 'Technical Sourcing', desc: 'Scan GitHub/LinkedIn Recruiter and sync to Ashby ATS' },
    { title: 'Market Research Audit', desc: 'Map competitor pricing and feature matrices across web' },
    { title: 'Web Data Extraction', desc: 'Extract dynamic directory tables into Google Sheets' },
  ];

  const workspaces = ['Personal', 'Work', 'Research'];

  // Render settings full panel if settings is active
  if (activeRailTab === 'settings') {
    return (
      <div className="w-[280px] min-w-[220px] max-w-[360px] h-full bg-[var(--browser-surface)] border-r border-[var(--browser-border-subtle)] flex flex-col z-[var(--z-sidebar)] overflow-hidden">
        <SettingsView />
      </div>
    );
  }

  return (
    <div className="w-[280px] min-w-[220px] max-w-[360px] h-full bg-[var(--browser-surface)] border-r border-[var(--browser-border-subtle)] flex flex-col justify-between z-[var(--z-sidebar)] select-none overflow-hidden">

      {/* 1. WORKSPACES & TAB TREE VIEW */}
      {activeRailTab === 'workspaces' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Workspace Switcher Header */}
          <div className="p-3 border-b border-[var(--browser-border-subtle)] bg-[var(--browser-surface-secondary)] flex flex-col gap-2">
            <div className="text-[11px] font-semibold text-[var(--browser-text-muted)] uppercase tracking-wider flex items-center justify-between">
              <span>Workspace</span>
              <Layers className="w-3.5 h-3.5 text-[var(--browser-accent)]" />
            </div>
            <div className="flex gap-1 bg-[var(--browser-surface)] p-1 rounded-[var(--radius-md)] border border-[var(--browser-border-subtle)]">
              {workspaces.map((ws) => (
                <button
                  key={ws}
                  onClick={() => onSwitchWorkspace(ws)}
                  className={`flex-1 py-1 px-1.5 rounded-[var(--radius-sm)] text-xs font-medium transition-all ${
                    activeWorkspaceName === ws
                      ? 'bg-[var(--browser-surface-active)] text-[var(--browser-accent)] border border-[var(--browser-border)]'
                      : 'text-[var(--browser-text-muted)] hover:text-[var(--browser-text-primary)]'
                  }`}
                >
                  {ws}
                </button>
              ))}
            </div>
          </div>

          {/* Active Tabs List */}
          <div className="flex-1 p-2 overflow-y-auto flex flex-col gap-1">
            <div className="px-2 py-1 flex items-center justify-between text-[11px] font-medium text-[var(--browser-text-muted)]">
              <span>OPEN TABS ({tabs.length})</span>
              <button onClick={onNewTab} className="hover:text-[var(--browser-text-primary)] transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>

            {tabs.map((tab) => {
              const isActive = tab.id === activeTabId;
              return (
                <div
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`group flex items-center justify-between px-2.5 py-1.5 rounded-[var(--radius-md)] cursor-pointer text-xs transition-all border ${
                    isActive
                      ? 'bg-[var(--browser-surface-active)] text-[var(--browser-text-primary)] border-[var(--browser-border)] font-medium'
                      : 'text-[var(--browser-text-secondary)] border-transparent hover:bg-[var(--browser-surface-secondary)] hover:text-[var(--browser-text-primary)]'
                  }`}
                >
                  <div className="flex items-center gap-2 truncate flex-1 min-w-0">
                    {tab.favicon ? (
                      <img src={tab.favicon} alt="" className="w-3.5 h-3.5 rounded-sm flex-shrink-0" />
                    ) : (
                      <div className={`w-2 h-2 rounded-full ${isActive ? 'bg-[var(--browser-accent)]' : 'bg-[var(--browser-text-muted)]'}`} />
                    )}
                    <span className="truncate">{tab.title || 'New Tab'}</span>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onCloseTab(tab.id);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-0.5 rounded text-[var(--browser-text-muted)] hover:text-[var(--browser-danger)] transition-opacity"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 2. AI COMPANION VIEW */}
      {activeRailTab === 'ai' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-3 border-b border-[var(--browser-border-subtle)] bg-[var(--browser-surface-secondary)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[var(--browser-accent)]" />
              <span className="font-semibold text-xs text-[var(--browser-text-primary)] tracking-tight">
                Pineapple AI Context
              </span>
            </div>

            {/* AI Sub-Tabs */}
            <div className="flex gap-1 bg-[var(--browser-surface)] p-0.5 rounded-[var(--radius-md)] border border-[var(--browser-border-subtle)] text-[11px]">
              <button
                onClick={() => setAiSubTab('chat')}
                className={`px-2 py-0.5 rounded-[var(--radius-sm)] transition-colors ${
                  aiSubTab === 'chat' ? 'bg-[var(--browser-surface-active)] text-[var(--browser-accent)] font-medium' : 'text-[var(--browser-text-muted)]'
                }`}
              >
                Chat
              </button>
              <button
                onClick={() => setAiSubTab('perception')}
                className={`px-2 py-0.5 rounded-[var(--radius-sm)] transition-colors ${
                  aiSubTab === 'perception' ? 'bg-[var(--browser-surface-active)] text-[var(--browser-accent)] font-medium' : 'text-[var(--browser-text-muted)]'
                }`}
              >
                DOM
              </button>
              <button
                onClick={() => setAiSubTab('skills')}
                className={`px-2 py-0.5 rounded-[var(--radius-sm)] transition-colors ${
                  aiSubTab === 'skills' ? 'bg-[var(--browser-surface-active)] text-[var(--browser-accent)] font-medium' : 'text-[var(--browser-text-muted)]'
                }`}
              >
                Skills
              </button>
            </div>
          </div>

          {/* Body */}
          {aiSubTab === 'perception' ? (
            <div className="flex-1 p-3 overflow-y-auto text-[11px] font-mono bg-[var(--browser-surface)]">
              <div className="flex items-center justify-between mb-2 pb-1 border-b border-[var(--browser-border-subtle)]">
                <span className="text-[var(--browser-accent)] font-medium">AXTree Perception Tree</span>
                <button
                  onClick={onRefreshPerception}
                  className="flex items-center gap-1 text-[var(--browser-text-muted)] hover:text-[var(--browser-text-primary)]"
                >
                  <RefreshCw className="w-3 h-3" /> Refresh
                </button>
              </div>
              <pre className="whitespace-pre-wrap text-[var(--browser-text-secondary)] leading-relaxed">
                {perception?.serializedPrompt || 'No page perception captured yet.'}
              </pre>
            </div>
          ) : aiSubTab === 'skills' ? (
            <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2 bg-[var(--browser-surface)]">
              <div className="text-[11px] font-semibold text-[var(--browser-accent)] uppercase tracking-wider">
                Portable Agent Playbooks (`SKILL.md`)
              </div>
              {skills.map((skill, idx) => (
                <div
                  key={idx}
                  onClick={() => onSendMessage(`Run playbook: ${skill.title}`)}
                  className="p-2.5 rounded-[var(--radius-md)] bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] hover:border-[var(--browser-border)] cursor-pointer flex flex-col gap-1 transition-all"
                >
                  <div className="text-xs font-semibold text-[var(--browser-text-primary)] flex items-center gap-1.5">
                    <Cpu className="w-3.5 h-3.5 text-[var(--browser-accent)]" />
                    {skill.title}
                  </div>
                  <div className="text-[11px] text-[var(--browser-text-muted)] leading-tight">
                    {skill.desc}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2.5 bg-[var(--browser-surface)]">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`max-w-[92%] p-2.5 rounded-[var(--radius-md)] text-xs leading-relaxed ${
                    msg.sender === 'user'
                      ? 'self-end bg-[var(--browser-surface-active)] text-[var(--browser-text-primary)] border border-[var(--browser-border-strong)]'
                      : 'self-start bg-[var(--browser-surface-secondary)] text-[var(--browser-text-primary)] border border-[var(--browser-border-subtle)]'
                  }`}
                >
                  <div className="text-[10px] text-[var(--browser-text-muted)] mb-1 flex items-center gap-1 font-semibold uppercase tracking-wider">
                    {msg.sender === 'user' ? <User className="w-3 h-3" /> : <Bot className="w-3 h-3 text-[var(--browser-accent)]" />}
                    <span>{msg.sender}</span>
                  </div>
                  <div>{msg.text}</div>
                </div>
              ))}

              {onOpenArtifact && (
                <button
                  onClick={onOpenArtifact}
                  className="mt-2 p-2 rounded-[var(--radius-md)] bg-[var(--browser-surface-secondary)] border border-[var(--browser-border)] text-[var(--browser-accent)] text-xs font-medium flex items-center justify-center gap-1.5 hover:border-[var(--browser-accent)] transition-all"
                >
                  <FileText className="w-3.5 h-3.5" /> Open Generated Artifact
                </button>
              )}
            </div>
          )}

          {/* AI Input Form */}
          <form onSubmit={handleSubmit} className="p-2.5 border-t border-[var(--browser-border-subtle)] bg-[var(--browser-surface-secondary)] flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask Pineapple AI..."
              className="flex-1 bg-[var(--browser-surface)] border border-[var(--browser-border-subtle)] rounded-[var(--radius-md)] px-2.5 py-1.5 text-xs text-[var(--browser-text-primary)] placeholder-[var(--browser-text-muted)] focus:outline-none focus:border-[var(--browser-accent)]"
            />
            <button
              type="submit"
              className="px-3 bg-[var(--browser-surface-active)] border border-[var(--browser-border-strong)] text-[var(--browser-accent)] rounded-[var(--radius-md)] flex items-center justify-center hover:bg-[var(--browser-border)] transition-colors"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}

      {/* 3. BOOKMARKS VIEW */}
      {activeRailTab === 'bookmarks' && (
        <div className="flex-1 flex flex-col overflow-hidden bg-[var(--browser-surface)]">
          <div className="p-3 border-b border-[var(--browser-border-subtle)] bg-[var(--browser-surface-secondary)] flex items-center gap-2">
            <Bookmark className="w-4 h-4 text-[var(--browser-accent)]" />
            <span className="font-semibold text-xs text-[var(--browser-text-primary)]">Bookmarks</span>
          </div>
          <div className="flex-1 p-2 overflow-y-auto flex flex-col gap-1">
            {bookmarks.length === 0 ? (
              <div className="p-4 text-center text-xs text-[var(--browser-text-muted)]">No bookmarks added yet</div>
            ) : (
              bookmarks.map((b) => (
                <div
                  key={b.id}
                  onClick={() => onSendMessage(`Navigate to ${b.url}`)}
                  className="flex items-center gap-2 p-2 rounded-[var(--radius-md)] hover:bg-[var(--browser-surface-secondary)] cursor-pointer text-xs text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] transition-colors"
                >
                  <Folder className="w-3.5 h-3.5 text-[var(--browser-accent)] flex-shrink-0" />
                  <span className="truncate flex-1">{b.title}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 4. HISTORY VIEW */}
      {activeRailTab === 'history' && (
        <div className="flex-1 flex flex-col overflow-hidden bg-[var(--browser-surface)]">
          <div className="p-3 border-b border-[var(--browser-border-subtle)] bg-[var(--browser-surface-secondary)] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--browser-accent)]" />
              <span className="font-semibold text-xs text-[var(--browser-text-primary)]">History</span>
            </div>
            {onClearHistory && (
              <button onClick={onClearHistory} title="Clear History" className="text-[var(--browser-text-muted)] hover:text-[var(--browser-danger)]">
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
          <div className="flex-1 p-2 overflow-y-auto flex flex-col gap-1">
            {history.length === 0 ? (
              <div className="p-4 text-center text-xs text-[var(--browser-text-muted)]">No recent history</div>
            ) : (
              history.map((h) => (
                <div
                  key={h.id}
                  onClick={() => onSendMessage(`Navigate to ${h.url}`)}
                  className="flex flex-col gap-0.5 p-2 rounded-[var(--radius-md)] hover:bg-[var(--browser-surface-secondary)] cursor-pointer transition-colors"
                >
                  <span className="text-xs font-medium text-[var(--browser-text-primary)] truncate">{h.title || h.url}</span>
                  <span className="text-[10px] text-[var(--browser-text-muted)] truncate">{h.url}</span>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* 5. DOWNLOADS VIEW */}
      {activeRailTab === 'downloads' && (
        <div className="flex-1 flex flex-col overflow-hidden bg-[var(--browser-surface)]">
          <div className="p-3 border-b border-[var(--browser-border-subtle)] bg-[var(--browser-surface-secondary)] flex items-center gap-2">
            <Download className="w-4 h-4 text-[var(--browser-accent)]" />
            <span className="font-semibold text-xs text-[var(--browser-text-primary)]">Downloads</span>
          </div>
          <div className="flex-1 p-2 overflow-y-auto flex flex-col gap-1">
            {downloads.length === 0 ? (
              <div className="p-4 text-center text-xs text-[var(--browser-text-muted)]">No recent downloads</div>
            ) : (
              downloads.map((d) => (
                <div key={d.id} className="p-2 rounded-[var(--radius-md)] bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex flex-col gap-1 text-xs">
                  <div className="font-medium text-[var(--browser-text-primary)] truncate">{d.filename}</div>
                  <div className="text-[10px] text-[var(--browser-text-muted)]">{d.status} • {d.receivedBytes} / {d.totalBytes} bytes</div>
                </div>
              ))
            )}
          </div>
        </div>
      )}

    </div>
  );
};
