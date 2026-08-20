import React from 'react';

interface TabGroupsProps {
  children: React.ReactNode;
}

export const TabGroups: React.FC<TabGroupsProps> = ({ children }) => {
  return <div className="flex flex-col gap-2">{children}</div>;
};
