import React from 'react';

interface CapsuleProps extends React.HTMLAttributes<HTMLDivElement> {
  active?: boolean;
  size?: 'compact' | 'standard' | 'large';
  children: React.ReactNode;
}

export const Capsule: React.FC<CapsuleProps> = ({
  active = false,
  size = 'standard',
  className = '',
  children,
  ...props
}) => {
  const sizeClass = {
    compact: 'h-7 px-2.5 text-[11px]',
    standard: 'h-9 px-3.5 text-xs',
    large: 'h-11 px-5 text-sm',
  }[size];

  return (
    <div
      data-active={active}
      className={`capsule inline-flex items-center justify-center font-medium cursor-pointer transition-all ${sizeClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
