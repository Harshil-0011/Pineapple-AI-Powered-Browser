import React from 'react';

interface BadgeProps {
  status?: 'success' | 'warning' | 'danger' | 'info' | 'cyan';
  children: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ status = 'cyan', children }) => {
  const colorClass = {
    success: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-500/15 text-amber-400 border-amber-500/30',
    danger: 'bg-rose-500/15 text-rose-400 border-rose-500/30',
    info: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
    cyan: 'bg-cyan-500/15 text-cyan-400 border-cyan-500/30',
  }[status];

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-semibold font-mono tracking-wider uppercase ${colorClass}`}
    >
      {children}
    </span>
  );
};
