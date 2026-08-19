import React from 'react';

interface WorkspaceSwitcherProps {
  workspaces: string[];
  activeWorkspace: string;
  onSwitch: (ws: string) => void;
}

export const WorkspaceSwitcher: React.FC<WorkspaceSwitcherProps> = ({
  workspaces,
  activeWorkspace,
  onSwitch,
}) => {
  return (
    <div className="flex items-center gap-1 p-1 bg-[var(--browser-surface-secondary)] rounded-lg border border-[var(--browser-border-subtle)]">
      {workspaces.map((ws) => (
        <button
          key={ws}
          onClick={() => onSwitch(ws)}
          className={`flex-1 py-1 text-[11px] font-medium rounded-md transition-all ${
            activeWorkspace === ws
              ? 'bg-[var(--browser-surface-elevated)] text-[var(--browser-text-primary)] border border-[var(--browser-border)] shadow-sm'
              : 'text-[var(--browser-text-muted)] hover:text-[var(--browser-text-secondary)]'
          }`}
        >
          {ws}
        </button>
      ))}
    </div>
  );
};
