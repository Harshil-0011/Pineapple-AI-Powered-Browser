import React from 'react';

interface WorkspaceProps {
  name: string;
  active: boolean;
  onClick: () => void;
}

export const Workspace: React.FC<WorkspaceProps> = ({ name, active, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`p-2 rounded-lg cursor-pointer text-xs font-medium ${
        active ? 'bg-[var(--browser-surface-selected)] text-[var(--browser-accent)]' : 'text-[var(--browser-text-secondary)]'
      }`}
    >
      {name}
    </div>
  );
};
