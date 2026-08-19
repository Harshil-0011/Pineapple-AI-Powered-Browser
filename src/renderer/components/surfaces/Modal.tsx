import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 glass-overlay z-[var(--z-modal)] flex items-center justify-center p-4 select-none"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg glass-strong rounded-2xl border border-[var(--browser-border-strong)] p-6 shadow-2xl"
      >
        {children}
      </div>
    </div>
  );
};
