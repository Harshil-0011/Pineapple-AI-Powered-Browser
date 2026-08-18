import React, { useState, useEffect } from 'react';
import { Search, Globe, Cpu } from 'lucide-react';
import { Tab, Bookmark } from '../../shared/types';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  tabs: Tab[];
  bookmarks: Bookmark[];
  onSwitchTab: (id: string) => void;
  onNavigate: (url: string) => void;
  onSendAIPrompt: (prompt: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  tabs,
  bookmarks,
  onSwitchTab,
  onNavigate,
  onSendAIPrompt,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) {
          onClose();
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSelectTab = (tabId: string) => {
    onSwitchTab(tabId);
    onClose();
  };

  const handleRunAI = () => {
    if (query.trim()) {
      onSendAIPrompt(query);
      onClose();
    }
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(11, 15, 25, 0.75)',
      backdropFilter: 'blur(8px)',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'center',
      paddingTop: '120px',
    }} onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '600px',
          maxHeight: '420px',
          backgroundColor: '#111827',
          border: '1px solid #1e293b',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Input Bar */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid #1e293b',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <Search size={20} color="#06b6d4" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleRunAI();
            }}
            placeholder="Search open tabs, bookmarks, or prompt Pineapple AI..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: '15px',
            }}
          />
          <kbd style={{
            fontSize: '11px',
            color: '#64748b',
            backgroundColor: '#0b0f19',
            border: '1px solid #1e293b',
            borderRadius: '4px',
            padding: '2px 6px',
          }}>
            ESC
          </kbd>
        </div>

        {/* Results Body */}
        <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* AI Action Command */}
          {query.trim() && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
                AI Command
              </div>
              <div
                onClick={handleRunAI}
                style={{
                  backgroundColor: '#1f293d',
                  borderRadius: '8px',
                  padding: '10px 14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                  color: '#06b6d4',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                <Cpu size={16} color="#06b6d4" />
                <span>Ask Pineapple AI: "{query}"</span>
              </div>
            </div>
          )}

          {/* Open Tabs */}
          <div>
            <div style={{ fontSize: '11px', fontWeight: 600, color: '#64748b', textTransform: 'uppercase', marginBottom: '6px' }}>
              Open Tabs
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {tabs.map((tab) => (
                <div
                  key={tab.id}
                  onClick={() => handleSelectTab(tab.id)}
                  style={{
                    backgroundColor: 'transparent',
                    borderRadius: '8px',
                    padding: '8px 12px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    color: '#f8fafc',
                    fontSize: '13px',
                  }}
                >
                  <Globe size={16} color="#3b82f6" />
                  <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {tab.title || tab.url}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
