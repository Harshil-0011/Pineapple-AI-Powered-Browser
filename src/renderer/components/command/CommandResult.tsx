import React from 'react';
import { Layers, Bookmark, Sparkles } from 'lucide-react';

interface CommandResultProps {
  type: 'tab' | 'bookmark' | 'ai';
  title: string;
  onClick: () => void;
}

export const CommandResult: React.FC<CommandResultProps> = ({ type, title, onClick }) => {
  const icon = {
    tab: <Layers size={14} className="text-[var(--browser-accent)]" />,
    bookmark: <Bookmark size={14} className="text-[var(--browser-accent-purple)]" />,
    ai: <Sparkles size={14} className="text-[var(--browser-accent-cyan)]" />,
  }[type];

  return (
    <div
      onClick={onClick}
      className="p-2 rounded-lg hover:bg-[var(--browser-surface-hover)] flex items-center gap-2 text-xs text-[var(--browser-text-primary)] cursor-pointer"
    >
      {icon}
      <span className="truncate">{title}</span>
    </div>
  );
};
