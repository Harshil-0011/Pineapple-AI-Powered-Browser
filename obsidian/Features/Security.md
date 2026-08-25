---
title: "Pineapple AI Browser - Security & Process Isolation"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - security
  - sandbox
  - privacy
aliases:
  - "Security"
  - "Process Security"
links:
  - "[[Home]]"
  - "[[Architecture]]"
  - "[[Features/IPC Bridge]]"
confidence: "high"
---

# Security Architecture & Process Isolation

## Overview

Pineapple enforces strict process boundary security to isolate arbitrary web content from the underlying desktop host operating system and browser shell state. By combining `contextIsolation`, sandboxed web view preferences, context bridge IPC wrapping, and local encrypted memory, Pineapple delivers zero-trust desktop safety.

---

## Security Primitives Breakdown

1. **Context Isolation (`contextIsolation: true`):** Renderer JavaScript runs in an isolated execution context. Web pages loaded inside `BrowserView` cannot access Electron primitives or Node.js global objects.
2. **Node Integration Disabled (`nodeIntegration: false`):** Neither the main renderer window nor untrusted web views can execute `require()` or call Node.js system APIs directly.
3. **Sandbox Enforcement (`sandbox: true`):** `BrowserView` web preferences enforce Chromium sandbox policies on all rendered web content.
4. **Preload Context Bridge (`preload.ts`):** Only sanitized, type-safe API methods explicitly wrapped in `contextBridge.exposeInMainWorld('pineapple', ...)` are exposed to the renderer.

---

## Process Boundaries

```text
┌─────────────────────────────────────────────────────────────────────────┐
│                      MAIN PROCESS (Node.js System Access)              │
│  Full access to OS APIs, File System, BrowserWindow, BrowserView Map    │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                 ContextBridge IPC Channel (preload.ts)
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                    REACT RENDERER PROCESS (Sandboxed)                   │
│  Executes UI Shell, AgentService client. NO direct Node.js access.      │
└────────────────────────────────────┬────────────────────────────────────┘
                                     │
                  Electron BrowserView Process Boundary
                                     │
┌────────────────────────────────────▼────────────────────────────────────┐
│                  UNTRUSTED WEB CONTENT (Sandboxed)                      │
│  Isolated Web View running external websites (Google, GitHub, etc.).    │
│  NO access to shell DOM, NO access to IPC, NO access to Node.js.       │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## Security Directives & Configuration

Security directives are enforced in `src/main/index.ts`:

```typescript
// Main Window Web Preferences
webPreferences: {
  preload: path.join(__dirname, 'preload.js'),
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: false, // Preload script requires IPC access
}

// BrowserView Web Preferences
webPreferences: {
  contextIsolation: true,
  nodeIntegration: false,
  sandbox: true, // Full Chromium sandbox on web content
}
```

---

## Known Issues

1. **Indirect Prompt Injection:** External websites could attempt to embed malicious instructions inside visible text targeting AI agents.
   *Mitigation:* Action execution requires human confirmation for destructive or outbound actions (`ask_human` action type).

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Architecture]] — Process Model & IPC Architecture
- [[Features/IPC Bridge]] — Preload Bridge Specification
- [[Features/Ad Blocker]] — Network Filtering
