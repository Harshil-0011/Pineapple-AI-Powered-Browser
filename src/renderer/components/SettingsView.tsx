import React, { useState } from 'react';
import {
  Palette,
  ShieldCheck,
  Search,
  Bot,
  Download,
  Zap,
  ToggleLeft,
  ToggleRight,
  Sliders
} from 'lucide-react';

export const SettingsView: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'appearance' | 'privacy' | 'search' | 'ai' | 'downloads' | 'performance'>('appearance');
  const [adBlockEnabled, setAdBlockEnabled] = useState(true);
  const [memorySaverEnabled, setMemorySaverEnabled] = useState(true);
  const [darkTheme, setDarkTheme] = useState(true);

  const navItems = [
    { id: 'appearance', label: 'Appearance', icon: <Palette className="w-4 h-4" /> },
    { id: 'privacy', label: 'Privacy & Security', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'search', label: 'Search Engine', icon: <Search className="w-4 h-4" /> },
    { id: 'ai', label: 'AI Companion Settings', icon: <Bot className="w-4 h-4" /> },
    { id: 'downloads', label: 'Downloads', icon: <Download className="w-4 h-4" /> },
    { id: 'performance', label: 'Performance', icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <div className="flex-1 h-full bg-[var(--browser-surface)] flex flex-col overflow-y-auto text-[var(--browser-text-primary)]">
      <div className="px-5 py-4 border-b border-[var(--browser-border-subtle)] bg-[var(--browser-surface-secondary)] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-[var(--browser-accent)]" />
          <h2 className="font-semibold text-sm tracking-tight text-[var(--browser-text-primary)]">
            Browser Settings
          </h2>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Settings Secondary Navigation */}
        <div className="w-48 bg-[var(--browser-surface-secondary)] border-r border-[var(--browser-border-subtle)] p-3 flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id as any)}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-[var(--radius-md)] text-xs font-medium transition-colors text-left ${
                  isActive
                    ? 'bg-[var(--browser-surface-active)] text-[var(--browser-accent)] border border-[var(--browser-border)]'
                    : 'text-[var(--browser-text-secondary)] hover:bg-[var(--browser-surface)] hover:text-[var(--browser-text-primary)]'
                }`}
              >
                {item.icon}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>

        {/* Settings Details View */}
        <div className="flex-1 p-6 overflow-y-auto bg-[var(--browser-surface)]">
          {activeSection === 'appearance' && (
            <div className="flex flex-col gap-5 max-w-lg">
              <div>
                <h3 className="text-sm font-semibold text-[var(--browser-text-primary)]">Appearance & Theme</h3>
                <p className="text-xs text-[var(--browser-text-muted)] mt-1">
                  Customize the visual language, spatial density, and UI layout.
                </p>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-[var(--radius-lg)] bg-[var(--browser-surface-secondary)] border border-[var(--browser-border)]">
                <div>
                  <div className="text-xs font-medium text-[var(--browser-text-primary)]">Quiet Obsidian Theme</div>
                  <div className="text-[11px] text-[var(--browser-text-muted)]">Restrained dark spatial depth environment</div>
                </div>
                <button onClick={() => setDarkTheme(!darkTheme)} className="text-[var(--browser-accent)]">
                  {darkTheme ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6 text-[var(--browser-text-muted)]" />}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'privacy' && (
            <div className="flex flex-col gap-5 max-w-lg">
              <div>
                <h3 className="text-sm font-semibold text-[var(--browser-text-primary)]">Privacy & Shield Protection</h3>
                <p className="text-xs text-[var(--browser-text-muted)] mt-1">
                  Block aggressive trackers, ad networks, and fingerprinting scripts automatically.
                </p>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-[var(--radius-lg)] bg-[var(--browser-surface-secondary)] border border-[var(--browser-border)]">
                <div>
                  <div className="text-xs font-medium text-[var(--browser-text-primary)]">Ad & Tracker Shield</div>
                  <div className="text-[11px] text-[var(--browser-text-muted)]">Active webRequest network filtering</div>
                </div>
                <button onClick={() => setAdBlockEnabled(!adBlockEnabled)} className="text-[var(--browser-accent)]">
                  {adBlockEnabled ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6 text-[var(--browser-text-muted)]" />}
                </button>
              </div>
            </div>
          )}

          {activeSection === 'performance' && (
            <div className="flex flex-col gap-5 max-w-lg">
              <div>
                <h3 className="text-sm font-semibold text-[var(--browser-text-primary)]">Memory & Tab Optimization</h3>
                <p className="text-xs text-[var(--browser-text-muted)] mt-1">
                  Automatically sleep inactive background tabs to maintain low RAM consumption.
                </p>
              </div>

              <div className="flex items-center justify-between p-3.5 rounded-[var(--radius-lg)] bg-[var(--browser-surface-secondary)] border border-[var(--browser-border)]">
                <div>
                  <div className="text-xs font-medium text-[var(--browser-text-primary)]">Automatic Memory Saver</div>
                  <div className="text-[11px] text-[var(--browser-text-muted)]">Sleep tabs inactive for &gt; 15 minutes</div>
                </div>
                <button onClick={() => setMemorySaverEnabled(!memorySaverEnabled)} className="text-[var(--browser-accent)]">
                  {memorySaverEnabled ? <ToggleRight className="w-6 h-6" /> : <ToggleLeft className="w-6 h-6 text-[var(--browser-text-muted)]" />}
                </button>
              </div>
            </div>
          )}

          {['search', 'ai', 'downloads'].includes(activeSection) && (
            <div className="text-xs text-[var(--browser-text-muted)] p-4 rounded-[var(--radius-md)] bg-[var(--browser-surface-secondary)] border border-[var(--browser-border-subtle)]">
              Configuration for <span className="font-semibold text-[var(--browser-text-primary)] capitalize">{activeSection}</span> is managed automatically by Pineapple AI Browser core defaults.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
