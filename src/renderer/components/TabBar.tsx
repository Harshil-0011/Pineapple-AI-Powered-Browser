import React from 'react';
import { Tab } from '../../shared/types';
import { Plus, X, Moon, Pin, Volume2, VolumeX, LayoutList } from 'lucide-react';

interface TabBarProps {
  tabs: Tab[];
  activeTabId: string;
  isVertical: boolean;
  onSwitchTab: (id: string) => void;
  onCloseTab: (id: string) => void;
  onCreateTab: () => void;
  onToggleVertical: () => void;
}

export const TabBar: React.FC<TabBarProps> = ({
  tabs,
  activeTabId,
  isVertical,
  onSwitchTab,
  onCloseTab,
  onCreateTab,
  onToggleVertical,
}) => {
  if (isVertical) {
    return (
      <div style={{
        width: '200px',
        height: '100%',
        backgroundColor: '#0b0f19',
        borderRight: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        padding: '8px',
        gap: '4px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '8px', borderBottom: '1px solid #1e293b' }}>
          <span style={{ fontSize: '11px', fontWeight: 600, color: '#94a3b8', textTransform: 'uppercase' }}>Tabs ({tabs.length})</span>
          <button
            onClick={onToggleVertical}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
            title="Switch to horizontal tabs"
          >
            <LayoutList size={14} />
          </button>
        </div>
        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
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
                  padding: '8px 10px',
                  borderRadius: '8px',
                  backgroundColor: isActive ? '#1e293b' : 'transparent',
                  color: isActive ? '#f8fafc' : '#94a3b8',
                  cursor: 'pointer',
                  fontSize: '13px',
                }}
              >
                {tab.isSleeping ? <Moon size={12} color="#06b6d4" /> : null}
                <span style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {tab.title || 'New Tab'}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onCloseTab(tab.id);
                  }}
                  style={{ border: 'none', background: 'transparent', color: 'inherit', cursor: 'pointer' }}
                >
                  <X size={12} />
                </button>
              </div>
            );
          })}
        </div>
        <button
          onClick={onCreateTab}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            backgroundColor: '#111827',
            border: '1px solid #1e293b',
            color: '#f8fafc',
            borderRadius: '8px',
            padding: '8px',
            cursor: 'pointer',
            fontSize: '12px',
          }}
        >
          <Plus size={14} /> New Tab
        </button>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: '38px',
      backgroundColor: '#0b0f19',
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
                height: '30px',
                padding: '0 12px',
                borderRadius: '8px 8px 0 0',
                backgroundColor: isActive ? '#111827' : 'transparent',
                border: isActive ? '1px solid #1e293b' : '1px solid transparent',
                borderBottom: 'none',
                color: isActive ? '#f8fafc' : '#94a3b8',
                cursor: 'pointer',
                fontSize: '12px',
                maxWidth: '220px',
                minWidth: '120px',
                userSelect: 'none',
              }}
            >
              {tab.isSleeping ? <Moon size={12} color="#06b6d4" /> : null}
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
                <X size={12} />
              </button>
            </div>
          );
        })}
        <button
          onClick={onCreateTab}
          style={{
            border: 'none',
            backgroundColor: '#111827',
            color: '#94a3b8',
            borderRadius: '6px',
            width: '26px',
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
        >
          <Plus size={14} />
        </button>
      </div>
      <button
        onClick={onToggleVertical}
        style={{ background: 'transparent', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px' }}
        title="Switch to vertical tab strip"
      >
        <LayoutList size={14} />
      </button>
    </div>
  );
};
