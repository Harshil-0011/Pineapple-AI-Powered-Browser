import React, { useState, useEffect } from 'react';
import { Tab } from '../../shared/types';
import { ArrowLeft, ArrowRight, RotateCw, Shield, Star } from 'lucide-react';

interface AddressBarProps {
  activeTab: Tab | null;
  onNavigate: (url: string) => void;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
}

export const AddressBar: React.FC<AddressBarProps> = ({
  activeTab,
  onNavigate,
  onGoBack,
  onGoForward,
  onReload,
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

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: '45px',
      backgroundColor: '#1e293b',
      padding: '0 12px',
      gap: '8px',
      borderBottom: '1px solid #334155',
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
        <ArrowLeft size={18} />
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
        <ArrowRight size={18} />
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
        <RotateCw size={18} />
      </button>

      <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          backgroundColor: '#0f172a',
          borderRadius: '20px',
          padding: '0 12px',
          gap: '8px',
          border: '1px solid #334155',
        }}>
          <Shield size={14} color="#10b981" />
          <input
            type="text"
            value={inputUrl}
            onChange={(e) => setInputUrl(e.target.value)}
            placeholder="Search Google or enter a URL..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: '13px',
              height: '32px',
            }}
          />
          <Star size={14} color="#94a3b8" style={{ cursor: 'pointer' }} />
        </div>
      </form>
    </div>
  );
};
