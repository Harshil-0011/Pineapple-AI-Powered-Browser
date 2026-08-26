import React, { useState } from 'react';
import { PagePerception, ChatMessage } from '../../../shared/types';
import { AIChat } from './AIChat';
import { AXInspector } from './AXInspector';
import { Skills } from './Skills';
import { AIContext } from './AIContext';
import { Sparkles, FileText, X, Bot, Zap, MessageSquare, Terminal } from 'lucide-react';

interface AIPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  perception: PagePerception | null;
  onRefreshPerception: () => void;
  onOpenArtifact?: () => void;
  isFloatingOrb?: boolean;
}

export const AIPanel: React.FC<AIPanelProps> = ({
  messages,
  onSendMessage,
  perception,
  onRefreshPerception,
  onOpenArtifact,
  isFloatingOrb = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [subTab, setSubTab] = useState<'chat' | 'dom' | 'skills' | 'context'>('chat');

  const quickActionChips = [
    'Summarize this page',
    'Extract tables & links',
    'Draft email reply',
    'Explain concepts',
  ];

  const panelContent = (
    <div className="flex-1 flex flex-col h-full overflow-hidden select-none bg-[var(--bg-surface)]">
      {/* Panel Header */}
      <div className="p-3 border-b border-[var(--border-color)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[var(--claude-orange)]" />
          <span className="text-xs font-semibold text-[var(--text-primary)]">
            Pineapple AI Companion
          </span>
        </div>
        <div className="flex items-center gap-2">
          {onOpenArtifact && (
            <button
              onClick={onOpenArtifact}
              className="text-[11px] text-[var(--claude-orange-light)] hover:underline flex items-center gap-1 font-medium"
            >
              <FileText size={12} /> Artifact
            </button>
          )}
          {isFloatingOrb && (
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--slate-teal)]"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Quick Action Chips */}
      <div className="p-2 border-b border-[var(--border-color-subtle)] bg-[var(--dark-teal-deep)] flex items-center gap-1.5 overflow-x-auto">
        {quickActionChips.map((chip) => (
          <button
            key={chip}
            onClick={() => onSendMessage(chip)}
            className="px-2.5 py-1 rounded-full text-[10px] font-medium bg-[var(--slate-teal)] text-[var(--text-primary)] hover:bg-[var(--claude-orange)] transition-all whitespace-nowrap shrink-0 border border-[var(--border-color-subtle)]"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* 4 AI Sub-tabs (Chat, DOM / AX Tree, Skills, Context) */}
      <div className="flex items-center gap-1 p-1.5 bg-[var(--dark-teal)] border-b border-[var(--border-color-subtle)]">
        {(['chat', 'dom', 'skills', 'context'] as const).map((st) => (
          <button
            key={st}
            onClick={() => setSubTab(st)}
            className={`flex-1 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-md transition-all ${
              subTab === st
                ? 'bg-[var(--dark-teal-deep)] text-[var(--claude-orange-light)] border border-[var(--border-color-glow)] shadow-sm'
                : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            {st === 'dom' ? 'DOM' : st}
          </button>
        ))}
      </div>

      {subTab === 'chat' && <AIChat messages={messages} onSendMessage={onSendMessage} />}
      {subTab === 'dom' && <AXInspector perception={perception} onRefresh={onRefreshPerception} />}
      {subTab === 'skills' && <Skills onRunSkill={onSendMessage} />}
      {subTab === 'context' && <AIContext perception={perception} />}
    </div>
  );

  if (!isFloatingOrb) {
    return panelContent;
  }

  return (
    <>
      {/* Floating AI Orb trigger on browser viewport */}
      <div className="fixed bottom-6 right-6 z-[var(--z-floating)]">
        <button
          onClick={() => setIsOpen(!isOpen)}
          title="Toggle AI Companion Chatbox"
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-[var(--dark-teal)] via-[var(--slate-teal)] to-[var(--claude-orange)] p-[2px] ai-orb-glow cursor-pointer transition-transform hover:scale-105 active:scale-95"
        >
          <div className="w-full h-full rounded-full bg-[var(--dark-teal-deep)] flex items-center justify-center text-[var(--claude-orange-light)]">
            <Bot size={24} className="animate-pulse" />
          </div>
        </button>
      </div>

      {/* Floating Chatbox Popover / Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-[420px] h-[580px] rounded-2xl glass-panel shadow-2xl border border-[var(--border-color-glow)] flex flex-col z-[var(--z-floating)] overflow-hidden animate-fade-in">
          {panelContent}
        </div>
      )}
    </>
  );
};
