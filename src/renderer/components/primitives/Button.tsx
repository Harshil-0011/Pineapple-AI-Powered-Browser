import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  className = '',
  children,
  ...props
}) => {
  const variantClass = {
    primary: 'bg-[var(--browser-accent)] text-[#0B0D10] font-semibold hover:opacity-90',
    secondary: 'bg-[var(--browser-surface-hover)] border border-[var(--browser-border)] text-[var(--browser-text-primary)] hover:border-[var(--browser-border-strong)]',
    ghost: 'bg-transparent text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)]',
  }[variant];

  const sizeClass = {
    sm: 'h-7 px-3 text-[11px] rounded-full',
    md: 'h-9 px-4 text-xs rounded-full',
    lg: 'h-11 px-5 text-sm rounded-full',
  }[size];

  return (
    <button
      className={`inline-flex items-center justify-center gap-2 cursor-pointer transition-all ${variantClass} ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
