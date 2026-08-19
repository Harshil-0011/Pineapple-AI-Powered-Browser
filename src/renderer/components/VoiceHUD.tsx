import React, { useState } from 'react';
import { Mic, Radio } from 'lucide-react';

interface VoiceHUDProps {
  onToggleVoice: (isListening: boolean) => void;
}

export const VoiceHUD: React.FC<VoiceHUDProps> = ({ onToggleVoice }) => {
  const [isListening, setIsListening] = useState(false);

  const handleToggle = () => {
    const nextState = !isListening;
    setIsListening(nextState);
    onToggleVoice(nextState);
  };

  return (
    <div className="flex items-center gap-2 bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] rounded-full px-2.5 py-1 select-none">
      <button
        onClick={handleToggle}
        className={`flex items-center gap-1.5 text-[11px] font-semibold transition-colors ${
          isListening ? 'text-[var(--browser-danger)]' : 'text-[var(--browser-accent-cyan)]'
        }`}
      >
        {isListening ? (
          <>
            <Radio size={14} className="text-[var(--browser-danger)] animate-pulse" />
            <span>Voice Active</span>
          </>
        ) : (
          <>
            <Mic size={14} className="text-[var(--browser-accent-cyan)]" />
            <span>Voice Mode</span>
          </>
        )}
      </button>
    </div>
  );
};
