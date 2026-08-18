import React, { useState } from 'react';
import { Clock, Search, Trash2, Globe, ExternalLink } from 'lucide-react';
import { HistoryItem as SharedHistoryItem } from '../../shared/types';

export type HistoryItem = SharedHistoryItem;

interface HistoryViewProps {
  history: HistoryItem[];
  onNavigate: (url: string) => void;
  onClearHistory: () => void;
}

export const HistoryView: React.FC<HistoryViewProps> = ({
  history,
  onNavigate,
  onClearHistory,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHistory = history.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.url.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#0b0f19',
      color: '#f8fafc',
      padding: '32px',
      overflowY: 'auto',
    }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Clock size={28} color="#f59e0b" />
            <h2 style={{ fontSize: '24px', fontWeight: 700 }}>Browsing History</h2>
          </div>
          <button
            onClick={onClearHistory}
            style={{
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '8px',
              padding: '8px 16px',
              fontSize: '13px',
              fontWeight: 500,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <Trash2 size={14} /> Clear History
          </button>
        </div>

        {/* Search Bar */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#111827',
          borderRadius: '12px',
          padding: '10px 16px',
          border: '1px solid #1e293b',
          marginBottom: '24px',
        }}>
          <Search size={18} color="#94a3b8" style={{ marginRight: '10px' }} />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search history by page title or URL..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: '14px',
            }}
          />
        </div>

        {/* History Item List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filteredHistory.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px', color: '#64748b', fontSize: '14px' }}>
              No history entries found.
            </div>
          ) : (
            filteredHistory.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate(item.url)}
                style={{
                  backgroundColor: '#111827',
                  border: '1px solid #1e293b',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: 1, overflow: 'hidden' }}>
                  <Globe size={18} color="#3b82f6" style={{ flexShrink: 0 }} />
                  <div style={{ overflow: 'hidden' }}>
                    <div style={{ fontSize: '14px', fontWeight: 500, color: '#f8fafc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '12px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {item.url}
                    </div>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
                  <span style={{ fontSize: '11px', color: '#64748b' }}>
                    {new Date(item.visitedAt || item.timestamp || Date.now()).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <ExternalLink size={14} color="#94a3b8" />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
