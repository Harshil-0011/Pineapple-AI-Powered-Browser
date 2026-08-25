---
title: "Pineapple AI Browser - Tab Management Feature"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - tab-management
  - memory-saver
aliases:
  - "Tab Management"
  - "Multi-Tab Architecture"
links:
  - "[[Home]]"
  - "[[Architecture]]"
  - "[[Memory System]]"
  - "[[Features/Performance]]"
confidence: "high"
---

# Tab Management & Memory Saver

## Overview

Pineapple manages tabs via an isolated `BrowserView` map in the Main process. Each tab runs in its own web contents container, synchronized with React's `TabBar` UI. To keep system RAM consumption below 150MB, Pineapple incorporates an automated 15-minute background tab sleeping loop (**Memory Saver**).

---

## Components Breakdown

- `TabView` Interface in `src/main/index.ts`: Main process state container holding `id`, `url`, `title`, `isLoading`, `canGoBack`, `canGoForward`, `view` (`BrowserView`), `isSleeping`, and `lastActiveAt` timestamp.
- `PineappleBrowserMain` Tab Methods (`createTab`, `switchTab`, `closeTab`, `navigateTab`, `updateActiveViewBounds`): Core lifecycle methods managing `BrowserView` instances on `BrowserWindow`.
- `TabBar.tsx` (69 lines): React horizontal tab bar component supporting tab selection, tab creation (+ button), and tab closure.
- `Tab.tsx` (44 lines): Individual tab pill rendering favicon, loading spinner, sleeping indicator, and title.

---

## Flow Diagram

```text
       React Renderer UI                                Electron Main Process
┌──────────────────────────────┐                   ┌──────────────────────────────┐
│  TabBar / Omnibox            │                   │ PineappleBrowserMain         │
│                              │                   │ tabs: Map<string, TabView>   │
│  • User clicks 'New Tab' ────┼─ tab:create ────>│                              │
│                              │                   │ • Spawns new BrowserView     │
│                              │                   │ • Attaches view to Window    │
│  • User switches tab ────────┼─ tab:switch ────>│ • Updates activeTabId        │
│                              │                   │ • Calls updateViewBounds()   │
│                              │                   │                              │
│  • User resizes window ──────┼─ updateBounds ──>│ • Repositions active view    │
│                              │                   │                              │
│  • Background timer ─────────┼───────────────────┼─ Memory Saver (15m timeout) │
│    (No user action)          │                   │   Loads 'about:blank'        │
└──────────────────────────────┘                   └──────────────────────────────┘
```

---

## Configuration

- **Default URL:** `https://www.google.com`
- **Memory Saver Threshold:** 15 minutes (`15 * 60 * 1000` ms)
- **Memory Saver Check Loop:** Every 2 minutes (`2 * 60 * 1000` ms)

---

## Known Issues

1. **State Preservation on Sleep:** Sleeping tabs load `about:blank` to free V8 heap memory; reloading restores the URL, but unsubmitted form state in the tab is lost.
   *Workaround:* Active tabs and tabs updated within 15 minutes are never put to sleep.
2. **BrowserView Z-Ordering:** Electron `BrowserView` natively overlays above React HTML DOM layers. Floating popovers in the React UI must avoid overlapping the viewport area.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Architecture]] — Process Model & IPC Architecture
- [[Memory System]] — Memory Saver Loop Specification
- [[Features/Performance]] — Resource Footprint & Performance
