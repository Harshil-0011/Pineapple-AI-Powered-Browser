import React from 'react';
import { Sliders, Moon, Sun, Shield, Zap, Sparkles, Monitor, Key } from 'lucide-react';

interface SettingsProps {
  currentTheme?: 'dark' | 'light';
  onToggleTheme?: () => void;
}

export const Settings: React.FC<SettingsProps> = ({
  currentTheme = 'dark',
  onToggleTheme,
}) => {
  return (
    <div className="w-full h-full p-8 bg-[var(--browser-canvas-deep)] text-[var(--browser-text-primary)] overflow-y-auto select-none">
      <div className="max-w-2xl mx-auto flex flex-col gap-6 animate-fade-in">
        {/* Settings Header */}
        <div className="flex items-center gap-3 border-b border-[var(--browser-border-subtle)] pb-4">
          <Sliders size={24} className="text-[var(--browser-accent-cyan)]" />
          <h1 className="text-2xl font-bold font-[var(--font-display)] tracking-tight">
            Browser Preferences
          </h1>
        </div>

        {/* Theme Settings */}
        <div className="p-4 rounded-2xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[var(--browser-text-primary)]">Theme Appearance</span>
            <span className="text-[11px] text-[var(--browser-text-muted)]">
              Switch between Quiet Obsidian dark mode and light canvas
            </span>
          </div>
          <button
            onClick={onToggleTheme}
            className="capsule px-3.5 py-1.5 text-xs flex items-center gap-2 bg-[var(--browser-surface-elevated)] border-[var(--browser-cyan-border)]"
          >
            {currentTheme === 'dark' ? (
              <Moon size={14} className="text-[var(--browser-accent-cyan)]" />
            ) : (
              <Sun size={14} className="text-[var(--browser-warning)]" />
            )}
            <span className="capitalize font-medium">{currentTheme} Mode</span>
          </button>
        </div>

        {/* Privacy & Ad Blocker */}
        <div className="p-4 rounded-2xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[var(--browser-text-primary)]">Ad & Tracker Shield</span>
            <span className="text-[11px] text-[var(--browser-text-muted)]">
              Real-time web request filtering & tracking prevention active
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-[var(--browser-success)] border border-emerald-500/20 flex items-center gap-1.5">
            <Shield size={13} /> Active
          </span>
        </div>

        {/* Automated Memory Saver */}
        <div className="p-4 rounded-2xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[var(--browser-text-primary)]">Automated Tab Sleep</span>
            <span className="text-[11px] text-[var(--browser-text-muted)]">
              Inactive background tabs automatically enter sleep state after 15 minutes
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-amber-500/10 text-[var(--browser-warning)] border border-amber-500/20 flex items-center gap-1.5">
            <Zap size={13} /> Enabled
          </span>
        </div>

        {/* AI & Spatial Companion */}
        <div className="p-4 rounded-2xl bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)] flex items-center justify-between">
          <div className="flex flex-col gap-1">
            <span className="text-xs font-semibold text-[var(--browser-text-primary)]">AI Companion Engine</span>
            <span className="text-[11px] text-[var(--browser-text-muted)]">
              Local DOM AXTree perception & agent reasoning engine
            </span>
          </div>
          <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-[rgba(6,182,212,0.12)] text-[var(--browser-accent-cyan)] border border-[var(--browser-cyan-border)] flex items-center gap-1.5">
            <Sparkles size={13} /> Ready
          </span>
        </div>
      </div>
    </div>
  );
};
