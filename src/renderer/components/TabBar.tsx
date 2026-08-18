import React from 'react';
import { Tab } from '../../shared/types';
import { Plus, X, Moon } from 'lucide-react';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  onSwitchTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onCreateTab: () => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTabId,
  onSwitchTab,
  onCloseTab,
  onCreateTab,
}) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: '40px',
      backgroundColor: '#0f172a',
      paddingLeft: '8px',
      paddingRight: '8px',
      borderBottom: '1px solid #1e293b',
      overflowX: 'auto',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
        {tabs.map((tab) => {
          const isActive = tab.id === activeTabId;
          return (
            <div
              key={tab.id}
              onClick={() => onSwitchTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                height: '32px',
                padding: '0 12px',
                borderRadius: '6px 6px 0 0',
                backgroundColor: isActive ? '#1e293b' : '#334155',
                color: isActive ? '#f8fafc' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '13px',
                maxWidth: '200px',
                minWidth: '120px',
                userSelect: 'none',
              }}
            >
              {tab.isSleeping ? <Moon size={12} color="#fbbf24" /> : null}
              <span style={{
                flex: 1,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}>
                {tab.isLoading ? 'Loading...' : tab.title || 'New Tab'}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onCloseTab(tab.id);
                }}
                style={{
                  border: 'none',
                  background: 'transparent',
                  color: 'inherit',
                  cursor: 'pointer',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={14} />
              </button>
            </div>
          );
        })}
        <button
          onClick={onCreateTab}
          style={{
            border: 'none',
            backgroundColor: '#1e293b',
            color: '#94a3b8',
            borderRadius: '4px',
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  );
};
