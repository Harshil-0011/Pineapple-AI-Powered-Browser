import React from 'react';

interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Drawer: React.FC<DrawerProps> = ({ isOpen, onClose, className = '', children, ...props }) => {
  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-y-0 right-0 w-[360px] glass-strong border-l border-[var(--browser-border-strong)] z-[var(--z-overlay)] shadow-2xl p-4 flex flex-col ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
