import React, { useState } from 'react';
import { ChatMessage } from '../../../shared/types';
import { Send } from 'lucide-react';

interface AIChatProps {
  messages: ChatMessage[];
  onSendMessage: (text: string) => void;
}

export const AIChat: React.FC<AIChatProps> = ({ messages, onSendMessage }) => {
  const [prompt, setPrompt] = useState('');

  const handleSend = () => {
    if (!prompt.trim()) return;
    onSendMessage(prompt);
    setPrompt('');
  };

  return (
    <div className="flex-1 flex flex-col justify-between overflow-hidden p-3 gap-3">
      <div className="flex-1 overflow-y-auto flex flex-col gap-2 pr-1">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-2.5 rounded-xl text-xs max-w-[90%] ${
              m.sender === 'user'
                ? 'bg-[var(--browser-accent)] text-[#0B0D10] font-medium self-end'
                : 'bg-[var(--browser-surface-secondary)] text-[var(--browser-text-primary)] border border-[var(--browser-border-subtle)] self-start'
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-[var(--browser-surface-secondary)] rounded-full border border-[var(--browser-border)] focus-within:border-[var(--browser-accent-border)]">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Pineapple AI..."
          className="flex-1 bg-transparent border-none outline-none text-xs px-2 text-[var(--browser-text-primary)] placeholder-[var(--browser-text-muted)]"
        />
        <button
          onClick={handleSend}
          className="w-7 h-7 rounded-full bg-[var(--browser-accent)] text-[#0B0D10] flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Send size={12} />
        </button>
      </div>
    </div>
  );
};
