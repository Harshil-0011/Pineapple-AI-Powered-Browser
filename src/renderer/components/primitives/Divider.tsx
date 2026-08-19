import React from 'react';

interface DividerProps {
  vertical?: boolean;
}

export const Divider: React.FC<DividerProps> = ({ vertical = false }) => {
  return vertical ? (
    <div className="w-[1px] h-full bg-[var(--browser-border-subtle)]" />
  ) : (
    <div className="w-full h-[1px] bg-[var(--browser-border-subtle)] my-2" />
  );
};
