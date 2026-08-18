import React from 'react';
import { Download, CheckCircle, Pause, Folder, X } from 'lucide-react';

export interface DownloadItem {
  id: string;
  filename: string;
  progress: number; // 0 to 100
  state: 'progressing' | 'completed' | 'cancelled' | 'paused';
  totalBytes: number;
  receivedBytes: number;
}

interface DownloadsDrawerProps {
  downloads: DownloadItem[];
  onClose: () => void;
}

export const DownloadsDrawer: React.FC<DownloadsDrawerProps> = ({ downloads, onClose }) => {
  return (
    <div style={{
      position: 'absolute',
      bottom: '0',
      right: '0',
      width: '360px',
      maxHeight: '320px',
      backgroundColor: '#111827',
      border: '1px solid #1e293b',
      borderRadius: '12px 0 0 0',
      boxShadow: '0 -8px 24px rgba(0,0,0,0.4)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 100,
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Download size={18} color="#06b6d4" />
          <span style={{ fontWeight: 600, fontSize: '14px', color: '#f8fafc' }}>
            Downloads ({downloads.length})
          </span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#94a3b8',
            cursor: 'pointer',
          }}
        >
          <X size={16} />
        </button>
      </div>

      {/* Download List */}
      <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {downloads.length === 0 ? (
          <div style={{ padding: '24px', textAlign: 'center', color: '#64748b', fontSize: '13px' }}>
            No recent downloads
          </div>
        ) : (
          downloads.map((item) => (
            <div
              key={item.id}
              style={{
                backgroundColor: '#1f293d',
                borderRadius: '8px',
                padding: '10px 12px',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '13px', fontWeight: 500, color: '#f8fafc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '220px' }}>
                  {item.filename}
                </span>
                {item.state === 'completed' ? (
                  <CheckCircle size={16} color="#10b981" />
                ) : (
                  <span style={{ fontSize: '11px', color: '#06b6d4' }}>{item.progress}%</span>
                )}
              </div>

              {/* Progress bar */}
              <div style={{ width: '100%', height: '4px', backgroundColor: '#334155', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${item.progress}%`, height: '100%', backgroundColor: item.state === 'completed' ? '#10b981' : '#06b6d4' }} />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
