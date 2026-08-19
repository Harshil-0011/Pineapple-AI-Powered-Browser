import React from 'react';
import { RailTab } from './ControlRail';

interface ContextSidebarProps {
  activeRailTab: RailTab;
  children: React.ReactNode;
}

export const ContextSidebar: React.FC<ContextSidebarProps> = ({ children }) => {
  return (
    <aside className="w-[280px] h-full bg-[var(--browser-surface)] border-r border-[var(--browser-border-subtle)] flex flex-col z-[var(--z-sidebar)] shrink-0 overflow-hidden select-none">
      {children}
    </aside>
  );
};
