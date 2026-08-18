import React, { useState } from 'react';
import { Search, Sparkles, Globe, Cpu } from 'lucide-react';
import { Bookmark } from '../../shared/types';

interface NewTabPageProps {
  bookmarks: Bookmark[];
  onNavigate: (url: string) => void;
  onSendAIPrompt: (prompt: string) => void;
}

export const NewTabPage: React.FC<NewTabPageProps> = ({
  bookmarks,
  onNavigate,
  onSendAIPrompt,
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onNavigate(query);
    }
  };

  const aiPrompts = [
    'Analyze competitor pricing on current page',
    'Extract lead profiles into Google Sheets format',
    'Summarize key insights and top decisions',
    'Draft a personalized outreach email to prospect',
  ];

  return (
    <div style={{
      width: '100%',
      height: '100%',
      backgroundColor: '#0b0f19',
      color: '#f8fafc',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '40px 20px',
      overflowY: 'auto',
    }}>
      {/* Brand Header */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '72px',
          height: '72px',
          borderRadius: '20px',
          backgroundColor: '#111827',
          border: '1px solid rgba(6, 182, 212, 0.3)',
          boxShadow: '0 0 25px rgba(6, 182, 212, 0.2)',
          marginBottom: '16px',
        }}>
          <Sparkles size={36} color="#06b6d4" />
        </div>
        <h1 style={{ fontSize: '32px', fontWeight: 700, letterSpacing: '-0.5px', marginBottom: '8px' }}>
          Pineapple AI Browser
        </h1>
        <p style={{ color: '#94a3b8', fontSize: '15px', maxWidth: '480px', margin: '0 auto' }}>
          An ultra-lightweight, agentic browser built for autonomous workflows.
        </p>
      </div>

      {/* Central Search Bar */}
      <form onSubmit={handleSearch} style={{ width: '100%', maxWidth: '640px', marginBottom: '40px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          backgroundColor: '#111827',
          borderRadius: '16px',
          padding: '12px 20px',
          border: '1px solid #1e293b',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
        }}>
          <Search size={20} color="#06b6d4" style={{ marginRight: '12px' }} />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the web or ask Pineapple AI..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#f8fafc',
              fontSize: '16px',
            }}
          />
        </div>
      </form>

      {/* Speed Dial Bookmarks */}
      <div style={{ width: '100%', maxWidth: '640px', marginBottom: '40px' }}>
        <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b', marginBottom: '16px', fontWeight: 600 }}>
          Quick Destinations
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '16px' }}>
          {bookmarks.map((bm) => (
            <div
              key={bm.id}
              onClick={() => onNavigate(bm.url)}
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1e293b',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '10px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '10px',
                backgroundColor: '#1f293d',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Globe size={20} color="#3b82f6" />
              </div>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#f8fafc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', width: '100%', textAlign: 'center' }}>
                {bm.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* AI Prompt Shortcuts */}
      <div style={{ width: '100%', maxWidth: '640px' }}>
        <h3 style={{ fontSize: '12px', textTransform: 'uppercase', letterSpacing: '1px', color: '#64748b', marginBottom: '16px', fontWeight: 600 }}>
          Suggested AI Actions
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
          {aiPrompts.map((prompt, idx) => (
            <div
              key={idx}
              onClick={() => onSendAIPrompt(prompt)}
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '14px',
                fontSize: '13px',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <Cpu size={16} color="#06b6d4" />
              <span>{prompt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
