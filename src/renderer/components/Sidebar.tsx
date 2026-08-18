import React, { useState } from 'react';
import { ChatMessage, PagePerception } from '../../shared/types';
import { Bot, User, Send, Eye, RefreshCw } from 'lucide-react';

interface SidebarProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
  perception: PagePerception | null;
  onRefreshPerception: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  messages,
  onSendMessage,
  perception,
  onRefreshPerception,
}) => {
  const [inputText, setInputText] = useState('');
  const [showPerception, setShowPerception] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  return (
    <div style={{
      width: '380px',
      height: '100%',
      backgroundColor: '#0f172a',
      borderRight: '1px solid #1e293b',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#1e293b',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Bot size={20} color="#fbbf24" />
          <span style={{ fontWeight: 600, fontSize: '14px', color: '#f8fafc' }}>
            Pineapple AI Companion
          </span>
        </div>
        <button
          onClick={() => setShowPerception(!showPerception)}
          style={{
            border: 'none',
            backgroundColor: showPerception ? '#3b82f6' : '#334155',
            color: '#f8fafc',
            borderRadius: '4px',
            padding: '4px 8px',
            fontSize: '11px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            cursor: 'pointer',
          }}
        >
          <Eye size={12} />
          {showPerception ? 'Hide DOM' : 'DOM View'}
        </button>
      </div>

      {/* Main Body */}
      {showPerception ? (
        <div style={{ flex: 1, padding: '12px', overflowY: 'auto', fontSize: '11px', fontFamily: 'monospace' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ color: '#fbbf24' }}>DOM Perception Engine</span>
            <button
              onClick={onRefreshPerception}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#94a3b8',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <RefreshCw size={10} /> Refresh
            </button>
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#cbd5e1' }}>
            {perception?.serializedPrompt || 'No page perception captured yet.'}
          </pre>
        </div>
      ) : (
        <div style={{ flex: 1, padding: '12px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '85%',
                backgroundColor: msg.sender === 'user' ? '#2563eb' : '#1e293b',
                padding: '10px 12px',
                borderRadius: '8px',
                fontSize: '13px',
                lineHeight: '1.4',
                color: '#f8fafc',
              }}
            >
              <div style={{ fontSize: '10px', color: '#94a3b8', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {msg.sender === 'user' ? <User size={10} /> : <Bot size={10} color="#fbbf24" />}
                <span>{msg.sender.toUpperCase()}</span>
              </div>
              <div>{msg.text}</div>
            </div>
          ))}
        </div>
      )}

      {/* Input Form */}
      <form onSubmit={handleSubmit} style={{ padding: '12px', borderTop: '1px solid #1e293b', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Pineapple AI to perform actions..."
          style={{
            flex: 1,
            backgroundColor: '#1e293b',
            border: '1px solid #334155',
            borderRadius: '6px',
            padding: '8px 12px',
            color: '#f8fafc',
            fontSize: '13px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#2563eb',
            border: 'none',
            borderRadius: '6px',
            padding: '0 12px',
            color: '#ffffff',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Send size={16} />
        </button>
      </form>
    </div>
  );
};
