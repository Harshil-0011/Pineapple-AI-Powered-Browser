import React, { useState, useEffect } from 'react';
import { Tab } from '../../shared/types';
import { ArrowLeft, ArrowRight, RotateCw, Shield, ShieldAlert, Star, Download, Clock } from 'lucide-react';

interface AddressBarProps {
  activeTab: Tab | null;
  onNavigate: (url: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
  onToggleDownloads: () => void;
  onToggleHistory: () => void;
}

export const AddressBar: React.FC<AddressBarProps> = ({
  activeTab,
  onNavigate,
  onGoBack,
  onGoForward,
  onReload,
  onToggleDownloads,
  onToggleHistory,
}) => {
  const [inputUrl, setInputUrl] = useState('');

  useEffect(() => {
    if (activeTab) {
      setInputUrl(activeTab.url);
    }
  }, [activeTab?.url]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputUrl.trim()) {
      onNavigate(inputUrl);
    }
  };

  const isSecure = activeTab?.url.startsWith('https://');

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: '42px',
      backgroundColor: '#111827',
      padding: '0 12px',
      gap: '8px',
      borderBottom: '1px solid #1e293b',
    }}>
      <button
        disabled={!activeTab?.canGoBack}
        onClick={onGoBack}
        style={{
          border: 'none',
          background: 'transparent',
          color: activeTab?.canGoBack ? '#f8fafc' : '#475569',
          cursor: activeTab?.canGoBack ? 'pointer' : 'default',
        }}
      >
        <ArrowLeft size={16} />
      </button>

      <button
        disabled={!activeTab?.canGoForward}
        onClick={onGoForward}
        style={{
          border: 'none',
          background: 'transparent',
          color: activeTab?.canGoForward ? '#f8fafc' : '#475569',
          cursor: activeTab?.canGoForward ? 'pointer' : 'default',
        }}
      >
        <ArrowRight size={16} />
      </button>

      <button
        onClick={onReload}
        style={{
          border: 'none',
          background: 'transparent',
          color: '#f8fafc',
          cursor: 'pointer',
        }}
      >
        <RotateCw size={16} />
      </button>

      <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#0b0f19',
          borderRadius: '20px',
          padding: '0 14px',
          gap: '8px',
          border: '1px solid #1e293b',
        }}>
          {isSecure ? <Shield size={14} color="#10b981" /> : <ShieldAlert size={14} color="#f59e0b" />}
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Search Google or type a URL..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: '13px',
              height: '30px',
            }}
          />
          <Star size={14} color="#94a3b8" style={{ cursor: 'pointer' }} />
        </div>
      </form>

      <button
        onClick={onToggleHistory}
        style={{ border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
        title="History"
      >
        <Clock size={16} />
      </button>

      <button
        onClick={onToggleDownloads}
        style={{ border: 'none', background: 'transparent', color: '#94a3b8', cursor: 'pointer', padding: '4px' }}
        title="Downloads"
      >
        <Download size={16} />
      </button>
    </div>
  );
};
