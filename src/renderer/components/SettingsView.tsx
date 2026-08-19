import React, { useState } from 'react';
import { Sliders, Moon, Sun, Shield, Zap } from 'lucide-react';

interface SettingsViewProps {
  currentTheme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  currentTheme = 'dark',
  onToggleTheme,
}) => {
  return (
    <div className="w-full h-full p-8 bg-[var(--browser-canvas-deep)] text-[var(--browser-text-primary)] overflow-y-auto select-none">
      <div className="max-w-2xl mx-auto flex flex-col gap-6">
        <div className="flex items-center gap-3 border-b border-[var(--browser-border-subtle)] pb-4">
          <Sliders size={24} className="text-[var(--browser-accent)]" />
          <h1 className="text-xl font-bold">Browser Preferences</h1>
        </div>

        {/* Theme Settings */}
        <div className="p-4 rounded-xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold">Theme Mode</span>
            <span className="text-[11px] text-[var(--browser-text-muted)]">
              Switch between Quiet Obsidian dark mode and light mode
            </span>
          </div>
          <button
            onClick={onToggleTheme}
            className="capsule px-3 py-1.5 text-xs flex items-center gap-2 bg-[var(--browser-surface-elevated)]"
          >
            {currentTheme === 'dark' ? <Moon size={14} /> : <Sun size={14} />}
            <span className="capitalize">{currentTheme} Mode</span>
          </button>
        </div>

        {/* Privacy Shield */}
        <div className="p-4 rounded-xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold">Ad & Tracker Protection</span>
            <span className="text-[11px] text-[var(--browser-text-muted)]">
              Network request filter rules enabled
            </span>
          </div>
          <Shield size={18} className="text-[var(--browser-success)]" />
        </div>

        {/* Memory Saver */}
        <div className="p-4 rounded-xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold">Automated Tab Sleep</span>
            <span className="text-[11px] text-[var(--browser-text-muted)]">
              Background tabs enter sleep state after 15 minutes
            </span>
          </div>
          <Zap size={18} className="text-[var(--browser-warning)]" />
        </div>
      </div>
    </div>
  );
};
