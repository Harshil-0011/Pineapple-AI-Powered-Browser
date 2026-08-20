---
title: "Pineapple AI Browser - Command Palette Feature"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - command-palette
  - artifact-viewer
aliases:
  - "Command Palette"
  - "Artifact Viewer"
links:
  - "[[Home]]"
  - "[[Project Overview]]"
  - "[[Features/Frontend UI]]"
confidence: "high"
---

# Command Palette & Artifact Viewer

## Overview

The Command Palette (`Cmd+K` / `Ctrl+K`) and Artifact Viewer provide power-user shortcuts and structured output display. The Command Palette opens an elevated Spatial Glass modal overlay for instant search across commands, open tabs, history, and AI actions. The Artifact Viewer opens a drawer for structured research reports, tables, and extracted code artifacts.

---

## Components Breakdown

- `CommandPalette.tsx` (119 lines): Glass Level 3 modal overlay (`Cmd+K` trigger) with search input, keyboard navigation (`ArrowUp`/`ArrowDown`/`Enter`), and category grouping (Open Tabs, Actions, AI).
- `CommandResult.tsx` (26 lines): Individual result item row displaying icon, title, description, and keybinding pill.
- `ArtifactViewer.tsx` (51 lines): Sliding drawer displaying structured AI outputs (summaries, extracted tables, CSV data, code blocks).

---

## Flow Diagram

```text
User presses Cmd+K / Ctrl+K
            │
            ▼
CommandPalette modal opens (Glass Level 3 overlay)
            │
            ▼
User types search query (e.g., "New Workspace", "GitHub")
            │
            ▼
Filters command results across Categories:
  • OPEN TABS
  • ACTIONS
  • AI COMMANDS
            │
            ▼
User selects item via Enter key:
  Executes command callback & closes palette
```

---

## Configuration

Keyboard shortcut binding is registered in `App.tsx`:

```typescript
useEffect(() => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      setIsCommandPaletteOpen((prev) => !prev);
    }
  };
  window.addEventListener('keydown', handleKeyDown);
  return () => window.removeEventListener('keydown', handleKeyDown);
}, []);
```

---

## Known Issues

1. **Escape Key Focus Handling:** Closing the command palette returns keyboard focus to the main shell omnibox or active page view.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Project Overview]] — Module Statistics
- [[Features/Frontend UI]] — UI Design System
- [[Features/Index]] — Features Index
