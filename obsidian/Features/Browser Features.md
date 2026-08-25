---
title: "Pineapple AI Browser - Browser Features"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - browser-features
  - bookmarks
  - history
  - downloads
  - settings
aliases:
  - "Browser Features"
  - "Browser Tooling"
links:
  - "[[Home]]"
  - "[[Project Overview]]"
  - "[[Features/Frontend UI]]"
confidence: "high"
---

# Browser Features (Bookmarks, History, Downloads, Settings)

## Overview

Pineapple provides a suite of embedded browser management utilities integrated directly into the contextual sidebar and spatial glass surface ecosystem: Bookmarks, Browsing History, Download Manager, Extension controls, and Settings.

---

## Components Breakdown (`src/renderer/components/browser-features/`)

- `History.tsx` (83 lines): Grouped history viewer with full-text search bar and clear history action.
- `Settings.tsx` (59 lines): System configuration panel managing AI provider preferences (Mock, OpenAI, Claude, Ollama), API keys, and model selection.
- `Downloads.tsx` (44 lines): Download progress drawer displaying active file downloads, transfer speed, and completed file actions.
- `Bookmarks.tsx` (34 lines): Searchable collection list of saved bookmarks with one-click navigation.
- `Extensions.tsx` (18 lines): Chrome extension management container page.

---

## Flow Diagram

```text
ControlRail Click (Bookmarks / History / Downloads / Settings)
                          │
                          ▼
App.tsx updates activeTool state ('bookmarks' | 'history' | 'downloads' | 'settings')
                          │
                          ▼
ContextSidebar renders target feature component:
  ┌──────────────────┬──────────────────┬──────────────────┬──────────────────┐
  ▼                  ▼                  ▼                  ▼                  ▼
Bookmarks.tsx       History.tsx       Downloads.tsx      Settings.tsx       Extensions.tsx
Lists saved items   Filterable list   Progress bars      LLM config form    Extension list
```

---

## Configuration

Settings state is stored locally in React state and synchronized with `AgentService`:

```typescript
// Settings configuration model
interface SettingsConfig {
  aiProvider: 'mock' | 'openai' | 'anthropic' | 'ollama';
  apiKey: string;
  selectedModel: string;
}
```

---

## Known Issues

1. **Local Storage Persistence:** History items and bookmarks currently persist in memory and local storage during Phase 1.
   *Planned Upgrade:* Migrate to local encrypted SQLite persistence in Phase 6.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Project Overview]] — Tech Stack & Module Statistics
- [[Features/Frontend UI]] — Spatial Glass UI Design System
- [[Features/Index]] — Features Index
