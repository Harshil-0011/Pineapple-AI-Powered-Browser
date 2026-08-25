import React, { useState, useRef, useCallback } from 'react';
import { RailTab } from './ControlRail';

interface ContextSidebarProps {
  activeRailTab: RailTab;
  isCollapsed?: boolean;
  children: React.ReactNode;
}

export const ContextSidebar: React.FC<ContextSidebarProps> = ({
  activeRailTab: _activeRailTab,
  isCollapsed = false,
  children,
}) => {
  const [sidebarWidth, setSidebarWidth] = useState<number>(280);
  const isResizingRef = useRef<boolean>(false);

  const startResizing = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    isResizingRef.current = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizingRef.current) return;
      const newWidth = Math.max(220, Math.min(400, moveEvent.clientX - 52));
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      isResizingRef.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  }, []);

  if (isCollapsed) return null;

  return (
    <aside
      style={{ width: `${sidebarWidth}px` }}
      className="relative h-full bg-[var(--browser-surface)] border-r border-[var(--browser-border-subtle)] flex flex-col z-[var(--z-sidebar)] shrink-0 overflow-hidden select-none"
    >
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {children}
      </div>

      {/* Interactive Resizable Border Edge */}
      <div
        onMouseDown={startResizing}
        title="Drag to resize sidebar"
        className="absolute top-0 right-0 w-[4px] h-full cursor-col-resize hover:bg-[var(--browser-accent)] opacity-0 hover:opacity-100 transition-opacity z-10"
      />
    </aside>
  );
};
