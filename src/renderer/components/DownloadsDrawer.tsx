import React from 'react';
import { Download, CheckCircle, X } from 'lucide-react';
import { DownloadItem as SharedDownloadItem } from '../../shared/types';

export type DownloadItem = SharedDownloadItem;

interface DownloadsDrawerProps {
  downloads: DownloadItem[];
  onClose: () => void;
}

export const DownloadsDrawer: React.FC<DownloadsDrawerProps> = ({ downloads, onClose }) => {
  return (
    <div className="absolute bottom-0 right-0 w-[360px] max-h-[320px] glass-elevated border-t border-l border-[var(--browser-border-strong)] rounded-tl-xl shadow-2xl flex flex-col z-[var(--z-floating)] select-none">
      {/* Header */}
      <div className="px-4 py-3 border-b border-[var(--browser-border-subtle)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Download size={18} className="text-[var(--browser-accent-cyan)]" />
          <span className="font-semibold text-xs text-[var(--browser-text-primary)]">
            Downloads ({downloads.length})
          </span>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded text-[var(--browser-text-muted)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Download List */}
      <div className="flex-1 p-3 overflow-y-auto flex flex-col gap-2.5">
        {downloads.length === 0 ? (
          <div className="py-6 text-center text-[var(--browser-text-muted)] text-xs">
            No recent downloads
          </div>
        ) : (
          downloads.map((item) => {
            const pct = item.progress ?? (item.totalBytes > 0 ? Math.round((item.receivedBytes / item.totalBytes) * 100) : 0);
            return (
              <div
                key={item.id}
                className="bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] rounded-lg p-2.5 flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[var(--browser-text-primary)] truncate max-w-[220px]">
                    {item.filename}
                  </span>
                  {item.state === 'completed' ? (
                    <CheckCircle size={16} className="text-[var(--browser-success)]" />
                  ) : (
                    <span className="text-[11px] text-[var(--browser-accent-cyan)] font-mono">{pct}%</span>
                  )}
                </div>

                {/* Progress bar */}
                <div className="w-full h-1 bg-[var(--browser-surface-elevated)] rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      item.state === 'completed' ? 'bg-[var(--browser-success)]' : 'bg-[var(--browser-accent-cyan)]'
                    }`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
