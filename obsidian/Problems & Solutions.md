---
title: "Pineapple AI Browser - Problems & Solutions"
type: "guide"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - troubleshooting
  - bugs
  - solutions
aliases:
  - "Problems & Solutions"
  - "Troubleshooting"
links:
  - "[[Home]]"
  - "[[Architecture]]"
  - "[[Getting Started]]"
  - "[[Features/Performance]]"
confidence: "high"
---

# Pineapple AI Browser - Problems & Solutions

This document details technical problems encountered during development, solved architectural challenges, open issues, a troubleshooting playbook, and key engineering lessons learned.

---

## Solved Engineering Challenges

### 1. Viewport Geometry Misalignment on Sidebar Toggle
- **Problem:** In early prototypes, `BrowserView` coordinates were hard-coded (`x: 332, y: 104`), causing web content to overlap or detach when the context sidebar expanded or collapsed.
- **Solution:** Replaced fixed coordinates with dynamic geometry tracking in `BrowserViewport.tsx`. The component uses a `ResizeObserver` / `getBoundingClientRect` loop to report current viewport coordinates to the Main process via `window.pineapple.updateViewportBounds()`.

### 2. High Memory Footprint with Multi-Tab Browsing
- **Problem:** Opening 10+ tabs in Chromium led to 1.5GB+ RAM usage, causing desktop lag.
- **Solution:** Implemented `startMemorySaverLoop()` in `src/main/index.ts`. Tabs inactive for >15 minutes are flagged as `isSleeping: true` and navigated to `about:blank`. When re-selected by the user, the tab automatically reloads its target URL.

### 3. DOM Element Selection Breakdown in Agent Automation
- **Problem:** Standard LLMs struggled to identify target CSS selectors reliably across dynamic web frameworks.
- **Solution:** Designed the `data-pineapple-ref` tagging algorithm. The Main process injects a lightweight script upon `did-finish-load` that assigns ordinal numeric IDs (`1, 2, 3...`) to interactive elements (`button, a, input, [role="button"]`), allowing LLMs to reference elements deterministically by integer ID.

### 4. Ad Network Request Overhead
- **Problem:** Unfiltered tracker scripts degraded page load performance and inflated LLM context tokens.
- **Solution:** Configured `setupAdBlocker()` in `src/main/index.ts` using Electron's `session.defaultSession.webRequest.onBeforeRequest` filter rules to block known telemetry and ad domains (`doubleclick.net`, `google-analytics.com`, etc.).

---

## Open Problems Matrix

| Problem | Impact | Workaround | Planned Fix |
| :--- | :--- | :--- | :--- |
| **Shadow DOM & iFrame Isolation** | Interactive elements inside closed Shadow DOMs or cross-origin iFrames are missed by basic `querySelectorAll`. | Users must manually click elements inside nested frames. | Implement recursive DOM walker and Chromium Accessibility Tree (`AXTree`) target auto-attach in Phase 3. |
| **Canvas-Based Web Apps** | Web applications rendered on HTML Canvas (Figma, Canva, Google Docs) do not expose DOM element tags. | Use text search or direct URL navigation. | Implement visual grounding with grid overlays and screenshot vision prompts in Phase 3. |
| **Dynamic SPA Element Injection** | Single Page Applications rendering new elements post-load do not receive `data-pineapple-ref` tags automatically. | Re-trigger page load or switch tabs. | Attach a `MutationObserver` in injected JS to auto-tag newly added DOM nodes in real time. |
| **Electron BrowserView Z-Index Overlay** | `BrowserView` renders natively above React HTML elements, obscuring React popovers or dropdown menus that overlap the viewport. | Keep floating menus within sidebar or toolbar regions. | Migrate to Electron 30+ `WebContentsView` or temporarily adjust view bounds during popover display. |

---

## Troubleshooting Playbook

### Issue: Active Web View Is Blank or Distorted
1. **Check DevServer URL:** Ensure `Vite` dev server is running on `http://localhost:5173`.
2. **Verify Viewport Bounds:** Open Electron DevTools in Renderer (`Cmd+Option+I`) and inspect `<BrowserViewport />` bounds output.
3. **Trigger Resize:** Manually resize the main window to force `updateActiveViewBounds()` execution.

### Issue: AI Companion Fails to Execute Click/Type Actions
1. **Inspect Ref Tags:** Open AI Sidebar -> `DOM / AX Tree` tab. Verify elements have `[Ref X]` tags assigned.
2. **Re-trigger Perception:** Call `window.pineapple.getPerception(activeTabId)` from Renderer console.
3. **Verify Script Execution:** Check if page CSP blocks inline script execution; fallback to CDP dispatches in main process.

### Issue: TypeScript Build Fails with `dist/main` Missing
1. Ensure both tsconfigs are executed: `npm run compile`.
2. Verify `tsconfig.main.json` compiles `src/main` to `dist/main/main/index.js`.

---

## Lessons Learned

1. **Keep Web View Geometry Layout-Owned:** Never hard-code pixel offsets in multi-pane Electron apps. Always measure DOM nodes in the Renderer and push bounds to the Main process.
2. **Tag early, Tag deterministically:** Tagging interactive elements with simple sequential integer references (`data-pineapple-ref="1"`) dramatically improves LLM execution accuracy compared to raw HTML snippet parsing.
3. **Isolate Shell from Web Context:** Process isolation and context bridge protection are essential when executing user-prompted AI actions over web content to prevent prompt injection vectors.
