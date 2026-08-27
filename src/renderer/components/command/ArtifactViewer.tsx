import React from 'react';
import { X, Download, Share2, Sparkles } from 'lucide-react';

interface ArtifactViewerProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  type?: 'table' | 'document' | 'chart';
  data?: any;
}

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({
  isOpen,
  onClose,
  title = 'Competitive Market Audit Matrix',
  data,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[440px] glass-strong border-l border-[var(--browser-border-strong)] z-[var(--z-overlay)] flex flex-col p-5 shadow-2xl animate-slide-in-left select-none">
      <div className="flex items-center justify-between pb-3.5 border-b border-[var(--browser-border-subtle)]">
        <div className="flex items-center gap-2">
          <Sparkles size={16} className="text-[var(--browser-accent)]" />
          <span className="text-xs font-semibold text-[var(--browser-text-primary)] truncate max-w-[280px]">
            {title}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] transition-colors"
        >
          <X size={14} />
        </button>
      </div>

      <div className="flex-1 my-4 overflow-y-auto p-4 rounded-2xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] text-xs text-[var(--browser-text-primary)] leading-relaxed">
        <div className="text-[11px] font-semibold text-[var(--browser-accent)] uppercase tracking-wider mb-2">
          AI Synthesized Research Artifact
        </div>
        {data?.summary || 'Synthesized pricing structures, key capabilities, and value propositions across top software competitors in the workspace.'}
      </div>

      <div className="flex items-center justify-end gap-2 pt-3 border-t border-[var(--browser-border-subtle)]">
        <button className="capsule px-3.5 py-1.5 text-xs text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] flex items-center gap-1.5">
          <Share2 size={12} /> Share
        </button>
        <button className="capsule px-3.5 py-1.5 text-xs text-[#090B0F] bg-[var(--browser-accent)] font-semibold flex items-center gap-1.5">
          <Download size={12} /> Export CSV
        </button>
      </div>
    </div>
  );
};
