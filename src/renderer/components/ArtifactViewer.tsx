import React from 'react';
import { Sparkles, FileText, Download, X, Table, Presentation } from 'lucide-react';

interface ArtifactViewerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  type: 'slide' | 'table' | 'summary';
  data: any;
}

export const ArtifactViewer: React.FC<ArtifactViewerProps> = ({
  isOpen,
  onClose,
  title,
  type,
  data,
}) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      right: 0,
      width: '500px',
      height: '100%',
      backgroundColor: '#111827',
      borderLeft: '1px solid #1e293b',
      boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 200,
    }}>
      {/* Header */}
      <div style={{
        padding: '16px 20px',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#0b0f19',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {type === 'slide' ? <Presentation size={20} color="#06b6d4" /> : <Table size={20} color="#06b6d4" />}
          <div>
            <div style={{ fontSize: '14px', fontWeight: 700, color: '#f8fafc' }}>{title}</div>
            <div style={{ fontSize: '11px', color: '#64748b' }}>Generated Artifact</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button style={{
            backgroundColor: '#1f293d',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 12px',
            color: '#f8fafc',
            fontSize: '12px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <Download size={14} /> Export
          </button>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
          >
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
        <div style={{
          backgroundColor: '#0b0f19',
          border: '1px solid #1e293b',
          borderRadius: '12px',
          padding: '20px',
          color: '#f8fafc',
          fontSize: '13px',
          lineHeight: '1.6',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Sparkles size={16} color="#06b6d4" />
            <span style={{ fontWeight: 600, color: '#06b6d4' }}>AI Synthesis</span>
          </div>
          <p style={{ color: '#cbd5e1', marginBottom: '16px' }}>
            {data?.summary || 'This artifact contains structured synthesized insights extracted autonomously from open browser tabs.'}
          </p>

          {/* Render Table if table artifact */}
          {type === 'table' && (
            <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '12px', fontSize: '12px' }}>
              <thead>
                <tr style={{ backgroundColor: '#111827', color: '#94a3b8', textAlign: 'left' }}>
                  <th style={{ padding: '8px', borderBottom: '1px solid #1e293b' }}>Entity</th>
                  <th style={{ padding: '8px', borderBottom: '1px solid #1e293b' }}>Metric</th>
                  <th style={{ padding: '8px', borderBottom: '1px solid #1e293b' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '8px' }}>Competitor A</td>
                  <td style={{ padding: '8px' }}>$49/mo</td>
                  <td style={{ padding: '8px', color: '#10b981' }}>Active</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #1e293b' }}>
                  <td style={{ padding: '8px' }}>Competitor B</td>
                  <td style={{ padding: '8px' }}>$99/mo</td>
                  <td style={{ padding: '8px', color: '#10b981' }}>Active</td>
                </tr>
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};
