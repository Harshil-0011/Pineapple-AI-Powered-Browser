import React from 'react';

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: 'compact' | 'standard' | 'comfortable' | 'touch';
  children: React.ReactNode;
}

export const IconButton: React.FC<IconButtonProps> = ({
  size = 'standard',
  className = '',
  children,
  ...props
}) => {
  const sizeClass = {
    compact: 'w-7 h-7',
    standard: 'w-9 h-9',
    comfortable: 'w-10 h-10',
    touch: 'w-11 h-11',
  }[size];

  return (
    <button
      className={`rounded-xl inline-flex items-center justify-center text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] transition-colors ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
