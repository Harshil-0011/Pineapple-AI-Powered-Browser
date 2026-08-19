import React from 'react';

interface PopoverProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export const Popover: React.FC<PopoverProps> = ({ className = '', children, ...props }) => {
  return (
    <div
      className={`glass-elevated rounded-2xl p-2 border border-[var(--browser-border)] shadow-xl z-[var(--z-popover)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
