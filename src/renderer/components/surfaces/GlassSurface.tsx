import React from 'react';

interface GlassSurfaceProps extends React.HTMLAttributes<HTMLDivElement> {
  level?: 'subtle' | 'elevated' | 'strong' | 'overlay';
  children: React.ReactNode;
}

export const GlassSurface: React.FC<GlassSurfaceProps> = ({
  level = 'subtle',
  className = '',
  children,
  ...props
}) => {
  const levelClass = {
    subtle: 'glass-subtle',
    elevated: 'glass-elevated',
    strong: 'glass-strong',
    overlay: 'glass-overlay',
  }[level];

  return (
    <div className={`${levelClass} ${className}`} {...props}>
      {children}
    </div>
  );
};
