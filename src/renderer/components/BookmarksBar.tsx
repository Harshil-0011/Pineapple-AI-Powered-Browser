import React from 'react';
import { Bookmark } from '../../shared/types';
import { Bookmark as BookmarkIcon, Plus } from 'lucide-react';

interface BookmarksBarProps {
  bookmarks: Bookmark[];
  onNavigate: (url: string) => void;
  onAddBookmark?: () => void;
}

export const BookmarksBar: React.FC<BookmarksBarProps> = ({ bookmarks, onNavigate, onAddBookmark }) => {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: '28px',
      backgroundColor: '#0b0f19',
      padding: '0 12px',
      gap: '12px',
      borderBottom: '1px solid #1e293b',
      fontSize: '12px',
      color: '#94a3b8',
    }}>
      {bookmarks.map((bm) => (
        <div
          key={bm.id}
          onClick={() => onNavigate(bm.url)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            cursor: 'pointer',
            padding: '2px 8px',
            borderRadius: '4px',
            backgroundColor: 'transparent',
            transition: 'background-color 0.2s ease',
          }}
        >
          <BookmarkIcon size={12} color="#06b6d4" />
          <span>{bm.title}</span>
        </div>
      ))}
      {onAddBookmark ? (
        <button
          onClick={onAddBookmark}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#64748b',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '2px',
          }}
          title="Add bookmark"
        >
          <Plus size={12} />
        </button>
      ) : null}
    </div>
  );
};
