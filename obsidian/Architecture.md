---
title: "Pineapple AI Browser - System Architecture"
type: "architecture"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - architecture
  - ipc
  - electron
aliases:
  - "Architecture"
  - "System Architecture"
links:
  - "[[Home]]"
  - "[[Project Overview]]"
  - "[[Features/IPC Bridge]]"
  - "[[Features/Tab Management]]"
  - "[[Features/DOM Perception Engine]]"
confidence: "high"
---

# Pineapple AI Browser - System Architecture

## Architecture Overview

Pineapple is structured as a multi-process desktop application leveraging Electron's process isolation model. The architecture separates native OS system access (Main process) from web rendering (Renderer UI process) and isolated web content execution (`BrowserView` instances).

---

## Module Dependency Graph (ASCII)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           ELECTRON MAIN PROCESS                             │
│                                                                             │
│  ┌───────────────────┐     ┌───────────────────┐     ┌───────────────────┐  │
│  │ PineappleBrowser  │     │   Memory Saver    │     │    Ad Blocker     │  │
│  │    Main Class     │────>│   Loop (15m)      │     │  (Session Filter) │  │
│  └─────────┬─────────┘     └───────────────────┘     └───────────────────┘  │
│            │                                                                │
│            ├─── Handles IPC (`tab:*`, `viewport:*`)                         │
│            │                                                                │
│  ┌─────────▼─────────┐                                                      │
│  │   BrowserView     │  <--- Isolated web content views (1 per tab)         │
│  │   Manager Map     │  <--- Tagging script (`data-pineapple-ref`)          │
│  └───────────────────┘                                                      │
└────────────▲────────────────────────────────────────────────────────────────┘
             │
      ContextBridge IPC
     (`window.pineapple`)
             │
┌────────────▼────────────────────────────────────────────────────────────────┐
│                         REACT RENDERER PROCESS                              │
│                                                                             │
│  ┌───────────────────────────────────────────────────────────────────────┐  │
│  │                               App.tsx                                 │  │
│  │                    (Global Shell State & Bounds)                      │  │
│  └───────┬──────────────────────────────┬────────────────────────┬───────┘  │
│          │                              │                        │          │
│  ┌───────▼───────┐             ┌────────▼────────┐      ┌────────▼───────┐  │
│  │  Shell System │             │ Browser Chrome  │      │ Agent Service  │  │
│  │ (ControlRail, │             │ (TabBar,        │      │ (LLM Engine,   │  │
│  │  Sidebar)     │             │  Omnibox)       │      │  Mock/OpenAI)  │  │
│  └───────────────┘             └─────────────────┘      └────────────────┘  │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Main-to-Renderer Request Flows

### 1. Tab Creation & Viewport Bounds Calculation Flow

```text
User / App.tsx                Renderer Preload             Electron Main Process
      │                              │                             │
      │─── createTab(url) ──────────>│                             │
      │                              │─── invoke('tab:create') ───>│
      │                              │                             │─── Instantiate BrowserView
      │                              │                             │─── Setup loading listeners
      │                              │                             │─── Attach to BrowserWindow
      │                              │<─── Return Tab Object ──────│
      │<─── Update React state ──────│                             │
      │                              │                             │
      │─── Report Bounds ───────────>│                             │
      │  (x, y, width, height)       │─── updateViewportBounds ───>│
      │                              │                             │─── view.setBounds(bounds)
```

### 2. Page Perception & Agent Action Flow

```text
AIChat Component               AgentService                 Main Process (BrowserView)
      │                             │                                   │
      │─── processRequest(prompt) ─>│                                   │
      │                             │─── getPerception(activeTabId) ───>│
      │                             │                                   │─── Execute tagging JS
      │                             │                                   │─── Extract elements
      │                             │<─── PagePerception JSON ──────────│
      │                             │                                   │
      │                             │─── Parse DOM & plan action        │
      │<─── Return text & action ───│                                   │
      │                             │                                   │
      │─── executeAction(action) ──>│                                   │
      │                             │─── invoke('tab:executeAction') ──>│
      │                             │                                   │─── Execute JS event
      │                             │<─── Boolean Success ──────────────│
```

---

## Key Design Decisions

### 1. Off-DOM Web Content via Native `BrowserView`
Instead of using React `<iframe>` or Chromium `<webview>` elements inside the renderer DOM, Pineapple uses Electron's native `BrowserView`. This offers:
- **Zero DOM Bleed:** Web pages cannot inspect or tamper with the parent browser shell DOM.
- **Superior Performance:** Hardware acceleration and process isolation run directly through Chromium primitives.
- **Dynamic Layout Alignment:** The Renderer reports bounding box geometry of `<BrowserViewport />` to the Main process via IPC (`viewport:updateBounds`), ensuring pixel-perfect fit regardless of sidebar toggles or window resizing.

### 2. Layout-Owned Dynamic Geometry
As specified in `design.md` Section 49, fixed viewport coordinates (e.g. `x: 332px, y: 104px`) are strictly forbidden. The React shell layout dynamically measures the active HTML container bounding rectangle and transmits `x, y, width, height` to `src/main/index.ts`.

### 3. Context-Isolated IPC Architecture
Security is enforced by running renderer scripts in a sandboxed context (`contextIsolation: true`, `nodeIntegration: false`). Only explicitly sanitized methods defined in `src/main/preload.ts` are exposed via `window.pineapple`.

---

## Concurrency Model & Process Isolation

```
┌─────────────────────────────────────────────────────────────────┐
│                       MAIN PROCESS (Node.js)                    │
│ • Handles OS Window lifecycle                                   │
│ • Manages Map<string, TabView>                                  │
│ • Executes background Memory Saver loop timer                   │
└────────────────────────────────┬────────────────────────────────┘
                                 │
                 IPC Channel (Asynchronous Message Port)
                                 │
┌────────────────────────────────▼────────────────────────────────┐
│                   RENDERER PROCESS (Chromium V8)                │
│ • Single-threaded React Virtual DOM event loop                  │
│ • Renders shell UI controls (ControlRail, AIPanel, Omnibox)     │
│ • Executes AgentService reasoning client                        │
└─────────────────────────────────────────────────────────────────┘
```

- **Thread Model:** Main process operates on the Node.js event loop. The Renderer process runs on a separate V8 thread.
- **Asynchronous IPC:** All IPC calls use asynchronous `ipcRenderer.invoke` and `ipcMain.handle` primitives. No synchronous IPC (`ipcRenderer.sendSync`) is permitted, preventing UI freeze during heavy page operations.

---

## Thread Safety & State Synchronization

- **Tab Map Isolation:** The Main process maintains the single source of truth for tab states in `Map<string, TabView>`.
- **Event Propagation:** Whenever a tab finishes loading, changes title, or switches active view, `notifyTabsChanged()` broadcasts updated tab metadata to the Renderer via `webContents.send('tabs:changed')`.
- **Race Condition Prevention:** Viewport bounds updates check if `this.activeTabId` is valid before adjusting bounds. Tab destruction (`closeTab`) safely cleans up listeners and web contents references before deleting from the map.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Project Overview]] — System Overview & Stats
- [[Features/IPC Bridge]] — Preload Bridge Specification
- [[Features/Tab Management]] — BrowserView Management
- [[Features/DOM Perception Engine]] — Ref Tagging & Inspection
