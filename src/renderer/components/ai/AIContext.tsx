import React from 'react';
import { PagePerception } from '../../../shared/types';
import { Globe, ShieldCheck, Database, FileCode } from 'lucide-react';

interface AIContextProps {
  perception: PagePerception | null;
}

export const AIContext: React.FC<AIContextProps> = ({ perception }) => {
  return (
    <div className="flex-1 p-3 flex flex-col gap-3 overflow-y-auto select-none text-xs">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--browser-border-subtle)]">
        <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] uppercase tracking-wider">
          Active Page Context
        </span>
        <span className="px-2 py-0.5 rounded-full text-[10px] bg-amber-500/10 text-[var(--browser-accent)] border border-[var(--browser-accent-border)] font-mono">
          Live Sync
        </span>
      </div>

      {/* Page Summary Card */}
      <div className="p-3 rounded-xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[var(--browser-text-primary)] font-medium">
          <Globe size={14} className="text-[var(--browser-accent)] shrink-0" />
          <span className="truncate">{perception?.title || 'No Active Web Page'}</span>
        </div>
        <div className="text-[11px] text-[var(--browser-text-muted)] truncate font-mono">
          {perception?.url || 'about:blank'}
        </div>
      </div>

      {/* Interactive Perception Controls Count */}
      <div className="p-3 rounded-xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2 text-[var(--browser-text-secondary)]">
          <FileCode size={14} className="text-[var(--browser-accent)]" />
          <span>Interactive Ref Elements</span>
        </div>
        <span className="font-mono font-semibold text-[var(--browser-accent)]">
          {perception?.elements?.length || 0}
        </span>
      </div>

      {/* Permitted Scope & Privacy */}
      <div className="p-3 rounded-xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex flex-col gap-2">
        <div className="flex items-center justify-between text-[var(--browser-text-secondary)] font-medium">
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[var(--browser-success)]" />
            <span>Permitted Permissions</span>
          </div>
          <span className="text-[10px] text-[var(--browser-success)] bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
            Active
          </span>
        </div>
        <div className="text-[11px] text-[var(--browser-text-muted)] leading-relaxed">
          Pineapple AI is granted context read-access to the current tab DOM tree and workspace metadata.
        </div>
      </div>

      {/* Workspace Memory */}
      <div className="p-3 rounded-xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex flex-col gap-2">
        <div className="flex items-center gap-2 text-[var(--browser-text-secondary)] font-medium">
          <Database size={14} className="text-[var(--browser-accent-purple)]" />
          <span>Workspace Memory</span>
        </div>
        <div className="text-[11px] text-[var(--browser-text-muted)] leading-relaxed">
          Session items, conversation history, and user preferences are retained locally in the quiet workspace context.
        </div>
      </div>
    </div>
  );
};
