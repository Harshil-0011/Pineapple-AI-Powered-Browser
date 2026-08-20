import React from 'react';
import { ArrowLeft, ArrowRight, RotateCw } from 'lucide-react';

interface NavigationControlsProps {
  canGoBack?: boolean;
  canGoForward?: boolean;
  onGoBack: () => void;
  onGoForward: () => void;
  onReload: () => void;
}

export const NavigationControls: React.FC<NavigationControlsProps> = ({
  canGoBack = false,
  canGoForward = false,
  onGoBack,
  onGoForward,
  onReload,
}) => {
  return (
    <div className="flex items-center gap-1 shrink-0">
      <button
        onClick={onGoBack}
        disabled={!canGoBack}
        className="p-1.5 rounded-lg text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] disabled:opacity-40 transition-colors"
      >
        <ArrowLeft size={15} />
      </button>
      <button
        onClick={onGoForward}
        disabled={!canGoForward}
        className="p-1.5 rounded-lg text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] disabled:opacity-40 transition-colors"
      >
        <ArrowRight size={15} />
      </button>
      <button
        onClick={onReload}
        className="p-1.5 rounded-lg text-[var(--browser-text-secondary)] hover:text-[var(--browser-text-primary)] hover:bg-[var(--browser-surface-hover)] transition-colors"
      >
        <RotateCw size={15} />
      </button>
    </div>
  );
};
