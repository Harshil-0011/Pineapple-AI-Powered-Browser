import React, { useState } from 'react';
import { PagePerception } from '../../../shared/types';
import { RefreshCw, Code2, Copy, Check } from 'lucide-react';

interface AXInspectorProps {
  perception: PagePerception | null;
  onRefresh: () => void;
}

export const AXInspector: React.FC<AXInspectorProps> = ({ perception, onRefresh }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (perception?.serializedPrompt) {
      navigator.clipboard.writeText(perception.serializedPrompt);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex-1 p-3 flex flex-col gap-2.5 overflow-y-auto text-xs font-mono">
      <div className="flex items-center justify-between pb-2 border-b border-[var(--border-color-subtle)]">
        <div className="flex items-center gap-1.5 text-[var(--text-muted)] text-[11px] font-sans">
          <Code2 size={13} className="text-[var(--claude-orange)]" />
          <span>AXTree / DOM Perception</span>
        </div>
        <div className="flex items-center gap-1">
          {perception?.serializedPrompt && (
            <button
              onClick={handleCopy}
              title="Copy DOM serialized prompt"
              className="p-1 rounded text-[var(--text-secondary)] hover:bg-[var(--slate-teal)] transition-colors cursor-pointer"
            >
              {copied ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
            </button>
          )}
          <button
            onClick={onRefresh}
            title="Refresh Perception Tree"
            className="p-1 rounded text-[var(--text-secondary)] hover:bg-[var(--slate-teal)] transition-colors cursor-pointer"
          >
            <RefreshCw size={12} />
          </button>
        </div>
      </div>

      {perception?.serializedPrompt ? (
        <pre className="whitespace-pre-wrap text-[11px] text-[var(--claude-orange-light)] leading-relaxed font-mono p-3 rounded-xl bg-[var(--dark-teal-deep)] border border-[var(--border-color-subtle)] shadow-inner">
          {perception.serializedPrompt}
        </pre>
      ) : (
        <div className="p-4 rounded-xl bg-[var(--dark-teal-deep)] border border-[var(--border-color-subtle)] text-center text-[var(--text-muted)] text-xs font-sans">
          No page perception captured yet. Click refresh to inspect current page controls.
        </div>
      )}
    </div>
  );
};
