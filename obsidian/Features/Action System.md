---
title: "Pineapple AI Browser - Action System Feature"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - action-system
  - automation
aliases:
  - "Action System"
  - "Agent Action Engine"
links:
  - "[[Home]]"
  - "[[Architecture]]"
  - "[[Features/LLM Integration]]"
  - "[[Features/DOM Perception Engine]]"
confidence: "high"
---

# Action System & Web Automation Engine

## Overview

The Action System translates high-level AI reasoning decisions into discrete browser interaction events (`click`, `type`, `navigate`, `scroll`). It bridge-executes actions directly against active `BrowserView` web content instances using element ref tags (`data-pineapple-ref`).

---

## Components Breakdown

- `AgentAction` Type in `src/shared/types.ts`: Universal action data model defining action types (`click`, `type`, `navigate`, `scroll`, `ask_human`, `finish`), target `ref` integer, input `text`, target `url`, and reasoning string.
- `executeAgentAction(id, action)` in `src/main/index.ts`: Electron Main process handler receiving action payloads over IPC and executing JavaScript events on the target `BrowserView`.
- `AIChat.tsx` (54 lines): Triggers action execution when `processRequest` returns a valid `AgentAction`.

---

## Flow Diagram

```text
AgentService generates AgentAction
  { type: 'click', ref: 4, reasoning: 'Click submit button' }
                 │
                 ▼
Renderer invokes window.pineapple.executeAction(tabId, action)
                 │
                 ▼
Main Process receives IPC in executeAgentAction()
                 │
  ┌──────────────┼──────────────┐
  ▼              ▼              ▼
[ navigate ]  [ click ]      [ type ]
Calls         Queries DOM    Queries DOM ref,
navigateTab() ref & fires    focuses input, sets value,
              .click()       dispatches 'input'/'change'
  │              │              │
  └──────────────┴──────────────┘
                 │
                 ▼
Returns boolean success status to Renderer
```

---

## Configuration

Actions are configured through type definitions in `src/shared/types.ts`:

```typescript
export type AgentActionType = 'click' | 'type' | 'navigate' | 'scroll' | 'ask_human' | 'finish';

export interface AgentAction {
  type: AgentActionType;
  ref?: number;
  text?: string;
  url?: string;
  reasoning: string;
}
```

---

## Known Issues

1. **Synthetic DOM Click vs. Native Hardware Click:** `el.click()` executed via JavaScript can be intercepted or ignored by security frameworks or custom canvas event listeners.
   *Planned Fix:* Transition to Chrome DevTools Protocol (`Input.dispatchMouseEvent` / `Input.insertText`) in Phase 3.
2. **Form Validation Dispatch:** Typing into input fields requires dispatching synthetic `input` and `change` events so React/Angular form state updates properly. Implemented in `index.ts`.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Architecture]] — System Process Architecture
- [[Features/LLM Integration]] — AI Engine
- [[Features/DOM Perception Engine]] — Ref Tagging & Page Perception
