import React from 'react';
import { PagePerception } from '../../../shared/types';
import { RefreshCw, Code2 } from 'lucide-react';

interface AXInspectorProps {
  perception: PagePerception | null;
  onRefresh: () => void;
}

export const AXInspector: React.FC<AXInspectorProps> = ({ perception, onRefresh }) => {
  return (
    <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto text-xs font-[var(--font-mono)]">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--browser-border-subtle)]">
        <div className="flex items-center gap-1.5 text-[var(--browser-text-muted)] text-[11px] font-sans">
          <Code2 size={13} className="text-[var(--browser-accent)]" />
          <span>AXTree / DOM Perception</span>
        </div>
        <button
          onClick={onRefresh}
          title="Refresh Perception Tree"
          className="p-1 rounded text-[var(--browser-text-secondary)] hover:bg-[var(--browser-surface-hover)] transition-colors"
        >
          <RefreshCw size={12} />
        </button>
      </div>

      {perception?.serializedPrompt ? (
        <pre className="whitespace-pre-wrap text-[11px] text-[var(--browser-accent)] leading-relaxed font-[var(--font-mono)] p-2 rounded-lg bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)]">
          {perception.serializedPrompt}
        </pre>
      ) : (
        <span className="text-[var(--browser-text-muted)] text-[11px] font-sans">
          No page perception captured yet. Click refresh to inspect current page controls.
        </span>
      )}
    </div>
  );
};
