import React from 'react';
import { FileText, X, Download, Share2 } from 'lucide-react';

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
  title = 'Generated Research Artifact',
  type = 'document',
  data,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 w-[420px] glass-strong border-l border-[var(--browser-border-strong)] z-[var(--z-overlay)] flex flex-col p-4 shadow-2xl animate-fade-in select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-[var(--browser-border-subtle)]">
        <div className="flex items-center gap-2">
          <FileText size={16} className="text-[var(--browser-accent-purple)]" />
          <span className="text-xs font-semibold text-[var(--browser-text-primary)] truncate max-w-[280px]">
            {title}
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-md text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)]"
        >
          <X size={14} />
        </button>
      </div>

      {/* Body Content */}
      <div className="flex-1 my-3 overflow-y-auto p-3 rounded-xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] text-xs text-[var(--browser-text-primary)] leading-relaxed">
        {data?.summary || 'No artifact data generated.'}
      </div>

      {/* Footer Controls */}
      <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--browser-border-subtle)]">
        <button className="capsule px-3 py-1 text-xs text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] flex items-center gap-1.5">
          <Share2 size={12} /> Share
        </button>
        <button className="capsule px-3 py-1 text-xs text-[#0B0D10] bg-[var(--browser-accent)] font-medium flex items-center gap-1.5">
          <Download size={12} /> Export CSV
        </button>
      </div>
    </div>
  );
};
