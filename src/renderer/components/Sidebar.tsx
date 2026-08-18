import React, { useState } from 'react';
import { ChatMessage, PagePerception } from '../../shared/types';
import { Bot, User, Send, Eye, RefreshCw, Cpu, Settings, Sparkles } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState<'chat' | 'perception' | 'skills' | 'settings'>('chat');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSendMessage(inputText);
      setInputText('');
    }
  };

  const skills = [
    { title: 'Sales Prospecting & Lead Gen', desc: 'Query Sales Navigator & deduplicate against Salesforce' },
    { title: 'Technical Sourcing', desc: 'Scan GitHub/LinkedIn Recruiter and sync to Ashby ATS' },
    { title: 'Market Research Audit', desc: 'Map competitor pricing and feature matrices across web' },
    { title: 'Web Data Extraction', desc: 'Extract dynamic directory tables into Google Sheets' },
  ];

  return (
    <div style={{
      width: '380px',
      height: '100%',
      backgroundColor: '#0b0f19',
      borderRight: '1px solid #1e293b',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Header Bar */}
      <div style={{
        padding: '12px 16px',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#111827',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            backgroundColor: '#1f293d',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(6, 182, 212, 0.4)',
          }}>
            <Sparkles size={16} color="#06b6d4" />
          </div>
          <span style={{ fontWeight: 700, fontSize: '14px', color: '#f8fafc', letterSpacing: '-0.3px' }}>
            Pineapple AI
          </span>
        </div>

        {/* Tab Navigation Icons */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: '#0b0f19', padding: '3px', borderRadius: '8px', border: '1px solid #1e293b' }}>
          <button
            onClick={() => setActiveTab('chat')}
            style={{
              border: 'none',
              backgroundColor: activeTab === 'chat' ? '#1f293d' : 'transparent',
              color: activeTab === 'chat' ? '#06b6d4' : '#64748b',
              padding: '4px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('perception')}
            style={{
              border: 'none',
              backgroundColor: activeTab === 'perception' ? '#1f293d' : 'transparent',
              color: activeTab === 'perception' ? '#06b6d4' : '#64748b',
              padding: '4px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            DOM
          </button>
          <button
            onClick={() => setActiveTab('skills')}
            style={{
              border: 'none',
              backgroundColor: activeTab === 'skills' ? '#1f293d' : 'transparent',
              color: activeTab === 'skills' ? '#06b6d4' : '#64748b',
              padding: '4px 8px',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            Skills
          </button>
        </div>
      </div>

      {/* Body Views */}
      {activeTab === 'perception' ? (
        <div style={{ flex: 1, padding: '14px', overflowY: 'auto', fontSize: '11px', fontFamily: 'monospace', backgroundColor: '#0b0f19' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: '#06b6d4', fontWeight: 600 }}>AXTree Perception Engine</span>
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
              <RefreshCw size={11} /> Refresh
            </button>
          </div>
          <pre style={{ whiteSpace: 'pre-wrap', color: '#cbd5e1', lineHeight: '1.5' }}>
            {perception?.serializedPrompt || 'No page perception captured yet.'}
          </pre>
        </div>
      ) : activeTab === 'skills' ? (
        <div style={{ flex: 1, padding: '16px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ fontSize: '12px', fontWeight: 600, color: '#06b6d4', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
            Portable Agent Playbooks (`SKILL.md`)
          </div>
          {skills.map((skill, idx) => (
            <div
              key={idx}
              onClick={() => onSendMessage(`Run playbook: ${skill.title}`)}
              style={{
                backgroundColor: '#111827',
                border: '1px solid #1e293b',
                borderRadius: '10px',
                padding: '12px',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                gap: '4px',
              }}
            >
              <div style={{ fontSize: '13px', fontWeight: 600, color: '#f8fafc', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={14} color="#06b6d4" />
                {skill.title}
              </div>
              <div style={{ fontSize: '11px', color: '#94a3b8' }}>
                {skill.desc}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ flex: 1, padding: '14px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '88%',
                backgroundColor: msg.sender === 'user' ? '#2563eb' : '#111827',
                border: msg.sender === 'user' ? 'none' : '1px solid #1e293b',
                padding: '10px 12px',
                borderRadius: '10px',
                fontSize: '13px',
                lineHeight: '1.45',
                color: '#f8fafc',
              }}
            >
              <div style={{ fontSize: '10px', color: '#64748b', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {msg.sender === 'user' ? <User size={10} /> : <Bot size={10} color="#06b6d4" />}
                <span style={{ fontWeight: 600 }}>{msg.sender.toUpperCase()}</span>
              </div>
              <div>{msg.text}</div>
            </div>
          ))}
        </div>
      )}

      {/* Input Footer */}
      <form onSubmit={handleSubmit} style={{ padding: '12px', borderTop: '1px solid #1e293b', backgroundColor: '#111827', display: 'flex', gap: '8px' }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Ask Pineapple AI to perform actions..."
          style={{
            flex: 1,
            backgroundColor: '#0b0f19',
            border: '1px solid #1e293b',
            borderRadius: '8px',
            padding: '8px 12px',
            color: '#f8fafc',
            fontSize: '13px',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          style={{
            backgroundColor: '#06b6d4',
            border: 'none',
            borderRadius: '8px',
            padding: '0 12px',
            color: '#0f172a',
            fontWeight: 600,
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
