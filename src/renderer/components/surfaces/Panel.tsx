import React from 'react';

interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Panel: React.FC<PanelProps> = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`bg-[var(--browser-surface)] border border-[var(--browser-border-subtle)] rounded-xl p-4 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
