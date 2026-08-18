import React from 'react';
import { Bookmark } from '../../shared/types';
import { Bookmark as BookmarkIcon } from 'lucide-react';

interface BookmarksBarProps {
  bookmarks: Bookmark[];
  onNavigate: (url: string) => void;
}

export const BookmarksBar: React.FC<BookmarksBarProps> = ({ bookmarks, onNavigate }) => {
  if (bookmarks.length === 0) return null;

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      height: '28px',
      backgroundColor: '#0f172a',
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
            gap: '4px',
            cursor: 'pointer',
            padding: '2px 6px',
            borderRadius: '4px',
            backgroundColor: 'transparent',
          }}
        >
          <BookmarkIcon size={12} color="#fbbf24" />
          <span>{bm.title}</span>
        </div>
      ))}
    </div>
  );
};
