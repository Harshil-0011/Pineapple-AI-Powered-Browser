import React, { useState } from 'react';
import { ChatMessage } from '../../../shared/types';
import { Send, Sparkles } from 'lucide-react';

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
      <div className="flex-1 overflow-y-auto flex flex-col gap-2.5 pr-1">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`p-3 rounded-2xl text-xs max-w-[88%] leading-relaxed ${
              m.sender === 'user'
                ? 'bg-[var(--claude-orange)] text-white font-medium self-end rounded-br-xs shadow-md'
                : 'bg-[var(--dark-teal-deep)] text-[var(--text-primary)] border border-[var(--border-color-subtle)] self-start rounded-bl-xs'
            }`}
          >
            {m.sender === 'ai' && (
              <div className="flex items-center gap-1.5 mb-1 text-[10px] text-[var(--claude-orange-light)] font-semibold uppercase tracking-wider">
                <Sparkles size={11} /> Pineapple AI
              </div>
            )}
            {m.text}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 p-1.5 bg-[var(--dark-teal-deep)] rounded-full border border-[var(--border-color)] focus-within:border-[var(--claude-orange)] focus-within:ring-1 focus-within:ring-[var(--claude-orange)] transition-all">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask Pineapple AI agent..."
          className="flex-1 bg-transparent border-none outline-none text-xs px-2.5 text-[var(--text-primary)] placeholder-[var(--text-muted)]"
        />
        <button
          onClick={handleSend}
          className="w-7 h-7 rounded-full bg-[var(--claude-orange)] text-white flex items-center justify-center hover:scale-105 transition-transform"
        >
          <Send size={12} />
        </button>
      </div>
    </div>
  );
};
