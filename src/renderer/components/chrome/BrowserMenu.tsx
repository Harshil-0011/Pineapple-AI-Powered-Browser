import React from 'react';
import { MoreVertical } from 'lucide-react';

export const BrowserMenu: React.FC = () => {
  return (
    <button className="p-1.5 rounded-lg text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] transition-colors">
      <MoreVertical size={15} />
    </button>
  );
};
