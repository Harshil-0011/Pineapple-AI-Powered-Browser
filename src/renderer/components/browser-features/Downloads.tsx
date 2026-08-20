import React from 'react';
import { DownloadItem } from '../../../shared/types';
import { Download, CheckCircle, X } from 'lucide-react';

interface DownloadsProps {
  downloads: DownloadItem[];
  onClose?: () => void;
}

export const Downloads: React.FC<DownloadsProps> = ({ downloads, onClose }) => {
  return (
    <div className="flex-1 p-3.5 flex flex-col gap-3 overflow-y-auto select-none min-w-[260px] glass-elevated rounded-2xl border border-[var(--browser-cyan-border)] shadow-xl">
      <div className="flex items-center justify-between pb-1 border-b border-[var(--browser-border-subtle)]">
        <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] uppercase tracking-wider">
          Recent Downloads ({downloads.length})
        </span>
        {onClose ? (
          <button onClick={onClose} className="p-1 rounded text-[var(--browser-text-muted)] hover:text-[var(--browser-text-primary)] transition-colors">
            <X size={14} />
          </button>
        ) : (
          <Download size={14} className="text-[var(--browser-accent-cyan)]" />
        )}
      </div>

      <div className="flex flex-col gap-2">
        {downloads.map((d) => (
          <div
            key={d.id}
            className="p-3 rounded-xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex flex-col gap-1.5"
          >
            <div className="flex items-center justify-between text-xs font-medium text-[var(--browser-text-primary)]">
              <span className="truncate max-w-[180px]">{d.filename}</span>
              <CheckCircle size={14} className="text-[var(--browser-success)] shrink-0" />
            </div>
            <div className="w-full h-1 bg-[var(--browser-surface-elevated)] rounded-full overflow-hidden">
              <div className="h-full bg-[var(--browser-accent-cyan)] w-full" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
