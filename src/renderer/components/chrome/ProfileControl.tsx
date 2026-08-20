import React from 'react';
import { User } from 'lucide-react';

export const ProfileControl: React.FC = () => {
  return (
    <button className="w-7 h-7 rounded-full bg-[var(--browser-surface-secondary)] border border-[var(--browser-border)] flex items-center justify-center text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)]">
      <User size={14} />
    </button>
  );
};
