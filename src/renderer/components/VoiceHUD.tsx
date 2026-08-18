import React, { useState } from 'react';
import { Mic, MicOff, Radio } from 'lucide-react';

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
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      backgroundColor: '#0b0f19',
      border: '1px solid #1e293b',
      borderRadius: '20px',
      padding: '4px 10px',
    }}>
      <button
        onClick={handleToggle}
        style={{
          background: 'transparent',
          border: 'none',
          color: isListening ? '#ef4444' : '#06b6d4',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          fontSize: '11px',
          fontWeight: 600,
        }}
      >
        {isListening ? (
          <>
            <Radio size={14} color="#ef4444" style={{ animation: 'pulse 1s infinite' }} />
            <span style={{ color: '#ef4444' }}>Voice Active</span>
          </>
        ) : (
          <>
            <Mic size={14} color="#06b6d4" />
            <span>Voice Mode</span>
          </>
        )}
      </button>
    </div>
  );
};
