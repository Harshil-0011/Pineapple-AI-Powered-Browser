---
title: "Pineapple AI Browser - IPC Bridge Feature"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - ipc
  - preload
  - context-bridge
aliases:
  - "IPC Bridge"
  - "Preload Bridge"
links:
  - "[[Home]]"
  - "[[Architecture]]"
  - "[[Features/Security]]"
confidence: "high"
---

# IPC Bridge & Context Isolation

## Overview

The IPC Bridge provides a type-safe, secure asynchronous communication channel between the React Renderer process and the Electron Main process. Enforced by `contextBridge` in `src/main/preload.ts`, it exposes the global `window.pineapple` object without enabling Node.js integration inside web contexts.

---

## Components Breakdown

- `src/main/preload.ts` (25 lines): Uses `contextBridge.exposeInMainWorld('pineapple', ...)` to bind sanitized IPC invocation methods.
- `src/shared/types.ts` (86 lines): Source of truth for shared IPC interfaces (`Tab`, `PagePerception`, `AgentAction`).
- `registerIPCHandlers()` in `src/main/index.ts`: Main process `ipcMain.handle()` listeners handling tab creation, navigation, actions, and bounds updates.

---

## Flow Diagram

```text
React Renderer Component
        │
        ▼
window.pineapple.createTab("https://github.com")
        │
        ▼ (preload.ts contextBridge wrapper)
ipcRenderer.invoke('tab:create', "https://github.com")
        │
        ▼ (Electron IPC Channel)
ipcMain.handle('tab:create', ...) in src/main/index.ts
        │
        ▼
Creates BrowserView, attaches handlers, updates Tab map
        │
        ▼
Returns Tab public object back over IPC to Renderer
```

---

## Exposed IPC API (`window.pineapple`)

| Method | Parameters | Returns | Description |
| :--- | :--- | :--- | :--- |
| `createTab` | `url?: string` | `Promise<Tab>` | Creates a new tab view. |
| `closeTab` | `id: string` | `Promise<void>` | Closes specified tab view. |
| `switchTab` | `id: string` | `Promise<void>` | Switches active visible tab. |
| `navigateTab` | `id: string, url: string` | `Promise<void>` | Navigates tab to target URL. |
| `goBack` / `goForward` / `reloadTab` | `id: string` | `Promise<void>` | Navigation controls. |
| `getPerception` | `id: string` | `Promise<PagePerception>` | Extracts DOM interactive elements. |
| `executeAction` | `id: string, action: AgentAction` | `Promise<boolean>` | Executes click/type/navigate action. |
| `updateViewportBounds` | `bounds: Bounds` | `Promise<void>` | Sets active `BrowserView` frame. |
| `onTabUpdated` / `onTabsChanged` | `callback` | `UnsubscribeFn` | Event listener cleanup bindings. |

---

## Configuration

Security settings are configured in `src/main/index.ts` during `BrowserWindow` creation:

```typescript
webPreferences: {
  preload: path.join(__dirname, 'preload.js'),
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: false,
}
```

---

## Known Issues

1. **Memory Leak Prevention on Event Listeners:** IPC event listeners (`onTabUpdated`, `onTabsChanged`) return unsubscribe cleanup functions. React components must invoke these cleanups inside `useEffect` return blocks to avoid listener accumulation.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Architecture]] — Process Model & IPC Architecture
- [[Features/Security]] — Security & Process Isolation
- [[Features/Tab Management]] — Tab View Lifecycle
