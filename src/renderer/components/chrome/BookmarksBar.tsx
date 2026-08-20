import React from 'react';
import { Bookmark } from '../../../shared/types';
import { Bookmark as BookmarkIcon } from 'lucide-react';

interface BookmarksBarProps {
  bookmarks: Bookmark[];
  onNavigate: (url: string) => void;
}

export const BookmarksBar: React.FC<BookmarksBarProps> = ({ bookmarks, onNavigate }) => {
  if (!bookmarks || bookmarks.length === 0) return null;

  return (
    <div className="w-full h-7 px-3 flex items-center gap-1.5 bg-[var(--browser-canvas-deep)] border-b border-[var(--browser-border-subtle)] overflow-x-auto no-scrollbar z-[var(--z-chrome)] shrink-0 select-none">
      {bookmarks.map((bm) => (
        <button
          key={bm.id}
          onClick={() => onNavigate(bm.url)}
          className="capsule px-2.5 py-0.5 text-[11px] text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] flex items-center gap-1.5 shrink-0 transition-all"
        >
          <BookmarkIcon size={11} className="text-[var(--browser-accent-cyan)]" />
          <span className="truncate max-w-[140px] font-medium">{bm.title}</span>
        </button>
      ))}
    </div>
  );
};
