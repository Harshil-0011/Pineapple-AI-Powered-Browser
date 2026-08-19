import React from 'react';

interface WorkspaceListProps {
  workspaces: string[];
  activeWorkspace: string;
  onSelect: (ws: string) => void;
}

export const WorkspaceList: React.FC<WorkspaceListProps> = ({
  workspaces,
  activeWorkspace,
  onSelect,
}) => {
  return (
    <div className="flex flex-col gap-1">
      {workspaces.map((ws) => (
        <button
          key={ws}
          onClick={() => onSelect(ws)}
          className={`p-2 rounded-lg text-left text-xs font-medium ${
            activeWorkspace === ws ? 'bg-[var(--browser-surface-selected)] text-[var(--browser-text-primary)]' : 'text-[var(--browser-text-muted)]'
          }`}
        >
          {ws}
        </button>
      ))}
    </div>
  );
};
