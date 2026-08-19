import React, { useState } from 'react';
import { PagePerception, ChatMessage } from '../../../shared/types';
import { AIChat } from './AIChat';
import { AXInspector } from './AXInspector';
import { Skills } from './Skills';
import { Sparkles, FileText } from 'lucide-react';

interface AIPanelProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  perception: PagePerception | null;
  onRefreshPerception: () => void;
  onOpenArtifact?: () => void;
}

export const AIPanel: React.FC<AIPanelProps> = ({
  messages,
  onSendMessage,
  perception,
  onRefreshPerception,
  onOpenArtifact,
}) => {
  const [subTab, setSubTab] = useState<'chat' | 'dom' | 'skills'>('chat');

  return (
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
            onClick={() => setSubTab(st)}
            className={`flex-1 py-1 text-[11px] font-medium uppercase rounded-md transition-all ${
              subTab === st
                ? 'bg-[var(--browser-surface-elevated)] text-[var(--browser-accent-cyan)] border border-[var(--browser-cyan-border)]'
                : 'text-[var(--browser-text-muted)] hover:text-[var(--browser-text-secondary)]'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      {subTab === 'chat' && <AIChat messages={messages} onSendMessage={onSendMessage} />}
      {subTab === 'dom' && <AXInspector perception={perception} onRefresh={onRefreshPerception} />}
      {subTab === 'skills' && <Skills onRunSkill={onSendMessage} />}
    </div>
  );
};
