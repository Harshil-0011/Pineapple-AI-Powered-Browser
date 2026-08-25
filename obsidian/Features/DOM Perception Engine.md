---
title: "Pineapple AI Browser - DOM Perception Engine Feature"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - perception
  - dom
  - ref-tagging
aliases:
  - "DOM Perception Engine"
  - "Perception Engine"
links:
  - "[[Home]]"
  - "[[Architecture]]"
  - "[[Features/LLM Integration]]"
  - "[[Features/Action System]]"
confidence: "high"
---

# DOM Perception Engine & Element Tagging

## Overview

The DOM Perception Engine enables Pineapple's AI companion to "see" and inspect active web pages. It injects a deterministic element tagging script upon page load that labels all interactive controls with ordinal integer references (`data-pineapple-ref="1"`), extracting bounding box coordinates, roles, tags, and text content for LLM reasoning.

---

## Components Breakdown

- `tagInteractiveElements(view)` in `src/main/index.ts`: Injected JavaScript loop running on Electron `did-finish-load` events. Assigns sequential `data-pineapple-ref` attributes to interactive elements (`button, a, input, select, textarea, [role="button"], [role="link"]`).
- `getPagePerception(id)` in `src/main/index.ts`: IPC handler querying active `BrowserView` web contents. Extracts element metadata and builds a structured text prompt (`serializedPrompt`).
- `AXInspector.tsx` (35 lines): Monospace developer surface in the AI panel displaying raw `data-pineapple-ref` elements, bounding boxes, and roles.

---

## Flow Diagram

```text
BrowserView loads webpage
           │
           ▼
`did-finish-load` event fires in Main process
           │
           ▼
tagInteractiveElements(view) injected via executeJavaScript
           │
           │ Assigns data-pineapple-ref="1", "2", "3"...
           ▼
LLM requests perception via window.pineapple.getPerception(tabId)
           │
           ▼
getPagePerception(id) queries DOM bounding rectangles:
  getBoundingClientRect() -> { x, y, width, height }
           │
           ▼
Generates PagePerception object:
  [Ref 1] <button> "Submit"
  [Ref 2] <input> "Search..."
           │
           ▼
Passed to AgentService for LLM prompt construction
```

---

## Configuration

The perception script runs automatically on all loaded URLs in `src/main/index.ts`. No manual user configuration is required. Bounding box coordinates are calculated relative to the active viewport frame.

---

## Known Issues

1. **Dynamic Single-Page App (SPA) Rendering:** Elements added dynamically post-load via React/Vue client-side updates may lack `data-pineapple-ref` tags until the page reloads or tab re-focuses.
   *Planned Fix:* Attach a native `MutationObserver` inside the injected JavaScript tagger.
2. **Shadow DOM & Nested Frames:** Elements inside closed Shadow roots or cross-origin iFrames are currently obscured from `querySelectorAll`.
   *Planned Fix:* Implement Chromium Accessibility Tree (`AXTree`) target auto-attach in Phase 3.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Architecture]] — Process Model & Request Flows
- [[Features/LLM Integration]] — LLM Reasoning Client
- [[Features/Action System]] — Action Execution Engine
