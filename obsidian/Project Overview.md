---
title: "Pineapple AI Browser - Project Overview"
type: "overview"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - overview
  - stats
aliases:
  - "Project Overview"
  - "Overview"
links:
  - "[[Home]]"
  - "[[Architecture]]"
  - "[[Features/Frontend UI]]"
  - "[[Features/LLM Integration]]"
  - "[[Features/Tab Management]]"
confidence: "high"
---

# Pineapple AI Browser - Project Overview

## What is Pineapple?

**Pineapple** is a lightweight, AI-native desktop web browser built with Electron, React, TypeScript, and Vite.

Traditional web browsers were designed for human tab management—leaving knowledge workers burdened with dozens of open tabs, manual data copy-pasting, and repetitive web interactions. Pineapple reimagines browser architecture around **autonomous AI agent execution** while remaining an ultra-fast, responsive desktop browser.

---

## Why Pineapple Exists

1. **Agent-First Browser Architecture:** Legacy browsers treat AI as an external chatbot extension or side panel. Pineapple integrates AI reasoning directly with browser web preferences, accessibility tree DOM inspection (`data-pineapple-ref`), and Chrome DevTools Protocol (CDP) execution.
2. **Minimal Resource Footprint:** Traditional browsers consume multi-gigabyte RAM footprints. Pineapple incorporates an automated background tab sleeping routine (**Memory Saver**) that discards inactive tabs after 15 minutes, capping active RAM consumption below 150MB.
3. **Quiet Spatial Design Language:** Designed according to `design.md`, Pineapple uses a deep obsidian palette (`#080A0D`), Spatial Glass layers, Capsule controls, and compact chrome that recedes visually behind active web content.
4. **Zero-Trust Privacy & Local Intelligence:** Pineapple keeps user browsing history, DOM snapshots, and vector memory local on device, with multi-provider LLM support ranging from offline mock engines to cloud LLMs (OpenAI, Claude) and local models (Ollama).

---

## Core Technology Stack

- **Desktop Framework:** Electron `^33.2.1` (Main Process + `BrowserView` Multi-Tab Execution)
- **Frontend Engine:** React `^18.3.1` with TypeScript `^5.7.2`
- **Build Tooling:** Vite `^6.0.5` + `@tailwindcss/vite` `^4.3.3`
- **Styling System:** Tailwind CSS v4 (`@import "tailwindcss";`) + Custom Spatial Glass CSS Tokens in `src/renderer/styles.css`
- **Iconography:** Lucide React `^0.469.0`
- **IPC Architecture:** Context Bridge IPC with strong TypeScript interfaces (`src/shared/types.ts`)

---

## Component Statistics Table

Below is the exhaustive, accurate module breakdown of the codebase based on source file line counts (`wc -l`):

### Main & IPC Process

| Module | Lines | Purpose |
| :--- | :--- | :--- |
| `src/main/index.ts` | 411 | Electron app lifecycle, `BrowserView` tab management, viewport bounds update handler, `data-pineapple-ref` DOM perception tagger, action execution engine, ad blocker, and 15-min Memory Saver background loop. |
| `src/main/preload.ts` | 25 | Secure `contextBridge` IPC exposure (`pineapple` object) exposing tab operations, perception bridge, and event listeners. |
| `src/main/types.ts` | 25 | Main process internal type definitions. |
| `src/shared/types.ts` | 86 | Universal TypeScript interface definitions (`Tab`, `Bookmark`, `HistoryItem`, `DownloadItem`, `InteractiveElement`, `PagePerception`, `ChatMessage`, `AgentAction`, `AIConfig`). |
| `src/shared/types.js` | 2 | Compiled JavaScript fallback definitions for shared types. |

### Renderer Core & Services

| Module | Lines | Purpose |
| :--- | :--- | :--- |
| `src/renderer/App.tsx` | 379 | Top-level React state orchestrator managing tabs, navigation, active tool views (AI, Bookmarks, History, Downloads, Settings), command palette triggers, workspace context, and layout geometry reporting. |
| `src/renderer/styles.css` | 289 | Tailwind CSS v4 root stylesheet defining Spatial Glass design system variables, glassmorphism levels, capsule styles, animation keyframes, and custom scrollbars. |
| `src/renderer/agent-service.ts` | 56 | Multi-provider AI reasoning engine supporting offline mock execution, navigation intent parsing, element click/type action generation, and LLM configuration. |
| `src/renderer/types.ts` | 21 | Renderer JSX element declarations and window `pineapple` context extension. |
| `src/renderer/main.tsx` | 9 | React DOM root render entrypoint (`React.StrictMode` wrapping `<App />`). |
| `src/renderer/index.html` | 13 | Main HTML viewport entrypoint for Vite renderer bundle. |

### Shell Components (`src/renderer/components/shell/`)

| Component | Lines | Purpose |
| :--- | :--- | :--- |
| `ControlRail.tsx` | 87 | 52px left spatial anchor rail with primary navigation buttons (Pineapple, Workspace, AI, Bookmarks, History, Downloads, New Tab, Settings). |
| `WindowFrame.tsx` | 23 | Desktop window frame container providing drag region and titlebar framing. |
| `BrowserShell.tsx` | 17 | Top-level spatial layout wrapper organizing ControlRail, ContextSidebar, and MainShell. |
| `ContextSidebar.tsx` | 15 | Resizable 280px left contextual panel housing workspace views and AI sidebars. |
| `BrowserViewport.tsx` | 15 | Native web view anchor container calculating bounding box geometry for Electron `BrowserView`. |
| `MainShell.tsx` | 13 | Flex wrapper combining TabBar, BrowserToolbar, BookmarksBar, and BrowserViewport. |

### Chrome Components (`src/renderer/components/chrome/`)

| Component | Lines | Purpose |
| :--- | :--- | :--- |
| `TabBar.tsx` | 69 | Horizontal tab strip container with scroll buttons, tab list, and new tab trigger. |
| `BrowserToolbar.tsx` | 64 | Main browser navigation bar holding Back/Forward/Reload, Omnibox, and right tool action buttons. |
| `Omnibox.tsx` | 46 | Capsule search and URL entry bar with security lock status, input handlers, and bookmark toggle. |
| `Tab.tsx` | 44 | Individual tab pill component with title, loading spinner, sleeping indicator, and close button. |
| `NavigationControls.tsx` | 43 | Navigation capsule holding Back, Forward, and Reload icon buttons. |
| `BookmarksBar.tsx` | 27 | Quick-access horizontal bookmarks bar beneath omnibox toolbar. |
| `TabGroup.tsx` | 21 | Visual grouping pill for spatial tab clustering. |
| `ProfileControl.tsx` | 10 | Profile selector button component. |
| `BrowserMenu.tsx` | 10 | Main browser overflow settings menu button. |

### AI Components (`src/renderer/components/ai/`)

| Component | Lines | Purpose |
| :--- | :--- | :--- |
| `AIPanel.tsx` | 65 | Tabbed AI companion side panel switcher (Chat, DOM / AX Tree, Skills, Context). |
| `AIChat.tsx` | 54 | Real-time chat message thread viewer and user prompt input container with action triggers. |
| `AXInspector.tsx` | 35 | Monospace accessibility tree inspector displaying `data-pineapple-ref` tagged elements. |
| `Skills.tsx` | 31 | Quick-action automation playbook selector (Summarize, Extract Table, Research). |
| `AIContext.tsx` | 22 | Visual summary indicator of active page context exposed to LLM. |

### Command & Artifact Components (`src/renderer/components/command/`)

| Component | Lines | Purpose |
| :--- | :--- | :--- |
| `CommandPalette.tsx` | 119 | Cmd+K floating glass modal overlay for instant action search and navigation. |
| `ArtifactViewer.tsx` | 51 | Structured data drawer displaying AI research summaries, tables, and extracted code artifacts. |
| `CommandResult.tsx` | 26 | Individual command result item row in command palette list. |

### Feature & Workspace Components (`src/renderer/components/browser-features/` & `workspace/`)

| Component | Lines | Purpose |
| :--- | :--- | :--- |
| `History.tsx` | 83 | Grouped browsing history viewer with search and clear history controls. |
| `Settings.tsx` | 59 | Browser configuration tab (AI provider settings, API keys, privacy controls). |
| `Downloads.tsx` | 44 | Download manager drawer with progress bars and file item controls. |
| `Bookmarks.tsx` | 34 | Searchable bookmark collection list. |
| `WorkspaceSwitcher.tsx` | 31 | Workspace spatial selector (Personal, Work, Research, Development). |
| `PinnedTabs.tsx` | 30 | Quick-access pinned tab icon row. |
| `WorkspaceList.tsx` | 29 | Workspace menu selection list. |
| `Extensions.tsx` | 18 | Extension management container page. |
| `Workspace.tsx` | 20 | Single workspace container surface. |
| `TabGroups.tsx` | 9 | Tab group list wrapper. |

### Surface & Primitive UI Components (`src/renderer/components/surfaces/` & `primitives/`)

| Component | Lines | Purpose |
| :--- | :--- | :--- |
| `Button.tsx` | 36 | Reusable primary, secondary, and ghost button primitive with capsule option. |
| `Capsule.tsx` | 31 | Interactive pill surface container with active/hover glass styling. |
| `IconButton.tsx` | 29 | Icon button primitive with tooltip support. |
| `GlassSurface.tsx` | 26 | Glassmorphic surface wrapper supporting subtle, elevated, and strong blur levels. |
| `Modal.tsx` | 25 | Overlay modal container primitive. |
| `Badge.tsx` | 24 | Status pill badge primitive (Secure, AI, Downloader). |
| `Input.tsx` | 24 | Text input primitive styled with capsule borders. |
| `Drawer.tsx` | 20 | Sliding drawer surface container. |
| `Tooltip.tsx` | 17 | Hover tooltip primitive. |
| `Progress.tsx` | 16 | Progress bar primitive for loading and downloads. |
| `Panel.tsx` | 16 | Generic background panel container. |
| `Popover.tsx` | 16 | Floating popover container. |
| `Divider.tsx` | 13 | Subtle border divider line primitive. |

---

## Codebase Summary Totals

- **Total Source Files:** 56 files
- **Total Lines of Code:** 2,873 lines
- **Primary Languages:** TypeScript (90%), CSS (8%), HTML (2%)

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Architecture]] — System Process Architecture & Dependency Graph
- [[Features/Frontend UI]] — UI Design System Specification
- [[Current Status]] — Project Development Status
