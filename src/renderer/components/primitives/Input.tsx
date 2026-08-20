import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: 'capsule' | 'standard' | 'editor';
}

export const Input: React.FC<InputProps> = ({
  variant = 'capsule',
  className = '',
  ...props
}) => {
  const variantClass = {
    capsule: 'rounded-full h-9 px-3.5',
    standard: 'rounded-md h-9 px-3',
    editor: 'rounded-xl h-11 px-4',
  }[variant];

  return (
    <input
      className={`bg-[var(--browser-surface-secondary)] border border-[var(--browser-border)] focus:border-[var(--browser-accent)] focus:outline-none text-xs text-[var(--browser-text-primary)] placeholder-[var(--browser-text-muted)] transition-colors ${variantClass} ${className}`}
      {...props}
    />
  );
};
