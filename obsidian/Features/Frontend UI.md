---
title: "Pineapple AI Browser - Frontend UI Feature"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - ui
  - react
  - tailwind
aliases:
  - "Frontend UI"
  - "UI System"
links:
  - "[[Home]]"
  - "[[Project Overview]]"
  - "[[Features/Index]]"
  - "[[Features/Tab Management]]"
confidence: "high"
---

# Frontend UI & Spatial Glass Design System

## Overview

Pineapple's user interface adheres strictly to the **Quiet Desktop Workspace + Spatial Glass + Capsule Controls** design specification detailed in `design.md`. Browser chrome surrounds web content quietly using deep obsidian canvas backgrounds (`#080A0D`), Spatial Glass layers, and pill/capsule controls.

---

## Components Breakdown

### 1. Spatial Shell System (`src/renderer/components/shell/`)
- `BrowserShell.tsx` (17 lines): Top-level flex container organizing ControlRail, ContextSidebar, and MainShell.
- `ControlRail.tsx` (87 lines): 52px wide left spatial anchor rail holding primary workspace triggers.
- `ContextSidebar.tsx` (15 lines): Resizable 280px left contextual drawer holding side panels (AI, Workspaces, Bookmarks, History, Settings).
- `MainShell.tsx` (13 lines): Flex column wrapper combining TabBar, BrowserToolbar, BookmarksBar, and BrowserViewport.
- `BrowserViewport.tsx` (15 lines): Web view anchor element reporting real-time bounding box geometry (`x, y, width, height`) to the Main process.
- `WindowFrame.tsx` (23 lines): Native window drag handle and frame titlebar wrapper.

### 2. Browser Chrome System (`src/renderer/components/chrome/`)
- `TabBar.tsx` (69 lines): Horizontal tab strip with add/close controls and active tab highlighting.
- `BrowserToolbar.tsx` (64 lines): Primary toolbar holding navigation controls and omnibox.
- `Omnibox.tsx` (46 lines): Capsule search and address entry field with HTTPS security indicator.
- `Tab.tsx` (44 lines): Individual tab pill component with title, loading spinner, and close button.
- `NavigationControls.tsx` (43 lines): Back, Forward, and Reload button cluster.
- `BookmarksBar.tsx` (27 lines): Quick-access horizontal bookmarks bar.

---

## Flow Diagram

```text
┌─────────────────────────────────────────────────────────────────────────────────┐
│                                   BrowserShell                                  │
├───────────────┬─────────────────────────────────────────────────────────────────┤
│               │                            MainShell                            │
│  ControlRail  ├─────────────────────────────────────────────────────────────────┤
│    (52px)     │                             TabBar                              │
│               ├─────────────────────────────────────────────────────────────────┤
│               │                         BrowserToolbar                          │
│               │                      (Omnibox + Controls)                       │
│               ├─────────────────────────────────────────────────────────────────┤
│               │                          BookmarksBar                           │
│               ├───────────────────────────────┬─────────────────────────────────┤
│               │        ContextSidebar         │         BrowserViewport         │
│               │      (Resizable 280px)        │          (Flex / Fill)          │
│               │                               │                                 │
│               │  • Workspaces                 │  Reports bounds (x, y, w, h)    │
│               │  • AI Companion               │  via IPC to Electron Main       │
│               │  • Bookmarks                  │  BrowserView instance.          │
│               │  • History                    │                                 │
│               │  • Settings                   │                                 │
└───────────────┴───────────────────────────────┴─────────────────────────────────┘
```

---

## Configuration & CSS Tokens

Tailwind CSS v4 is configured via `@tailwindcss/vite` in `vite.config.ts` and imported in `src/renderer/styles.css`:

```css
@import "tailwindcss";

:root {
  --browser-canvas-deep: #080A0D;
  --browser-surface: #111418;
  --browser-surface-elevated: #1B2026;
  --browser-accent: #8AB4FF;
  --browser-accent-cyan: #06B6D4;
  --glass-subtle: rgba(17,20,24,0.58);
  --glass-elevated: rgba(21,25,30,0.68);
  --radius-capsule: 999px;
}
```

---

## Known Issues

1. **Fixed Sidebar Minimums:** Narrow window sizes (<900px width) compress the context sidebar. Fixed via CSS container query rules in `styles.css`.
2. **Backdrop Filter Overhead:** Overusing `backdrop-filter: blur()` on nested surfaces causes GPU lag on low-end Linux builds. Solved by restricting glass blur levels to top-level popovers.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Project Overview]] — Tech Stack & Component Stats
- [[Features/Tab Management]] — Tab View & Geometry Management
- [[Features/Index]] — All Features
