import React from 'react';
import { Bookmark as BookmarkType } from '../../../shared/types';
import { Bookmark as BookmarkIcon, ExternalLink } from 'lucide-react';

interface BookmarksProps {
  bookmarks: BookmarkType[];
  onNavigate: (url: string) => void;
}

export const Bookmarks: React.FC<BookmarksProps> = ({ bookmarks, onNavigate }) => {
  return (
    <div className="flex-1 p-3.5 flex flex-col gap-3 overflow-y-auto select-none">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-semibold text-[var(--browser-text-muted)] uppercase tracking-wider">
          Bookmarks ({bookmarks.length})
        </span>
        <BookmarkIcon size={14} className="text-[var(--browser-accent-cyan)]" />
      </div>

      <div className="flex flex-col gap-1.5">
        {bookmarks.map((bm) => (
          <div
            key={bm.id}
            onClick={() => onNavigate(bm.url)}
            className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] hover:border-[var(--browser-cyan-border)] hover:bg-[var(--browser-surface-hover)] text-xs text-[var(--browser-text-primary)] cursor-pointer truncate transition-all"
          >
            <span className="truncate font-medium">{bm.title}</span>
            <ExternalLink size={12} className="text-[var(--browser-text-muted)] shrink-0 ml-2" />
          </div>
        ))}
      </div>
    </div>
  );
};
