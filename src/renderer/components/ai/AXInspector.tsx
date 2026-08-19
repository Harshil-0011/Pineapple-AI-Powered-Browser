import React from 'react';
import { PagePerception } from '../../../shared/types';
import { RefreshCw } from 'lucide-react';

interface AXInspectorProps {
  perception: PagePerception | null;
  onRefresh: () => void;
}

export const AXInspector: React.FC<AXInspectorProps> = ({ perception, onRefresh }) => {
  return (
    <div className="flex-1 p-3 flex flex-col gap-2 overflow-y-auto text-xs font-mono">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--browser-border-subtle)]">
        <span className="text-[11px] text-[var(--browser-text-muted)]">
          AXTree Perception Tree
        </span>
        <button
          onClick={onRefresh}
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
  );
};
