# PLANE.md — Pineapple AI Browser Master Execution Plan & Architecture Roadmap

Welcome to **Pineapple**, our lightweight, AI-native desktop web browser built with Electron, React, TypeScript, and Vite. This document (`PLANE.md`) serves as the complete, step-by-step master roadmap for evolving Pineapple from its initial MVP into a feature-complete, production-grade AI browser that matches and surpasses existing agentic browser paradigms (like Strawberry Browser, Comet, and Atlas).

---

## Executive Summary & Target Vision

* **Project Name:** Pineapple Browser
* **Target Architecture:** Dual-Pane Desktop Application (Electron + React + TypeScript + Vite)
* **Core Philosophy:** Moving from "browsers built for tabs" to "browsers built for autonomous AI agents."
* **Key Differentiator:** Ultra-lightweight binary footprint (~15-20MB), minimal RAM consumption via automated background tab sleeping, native Chrome DevTools Protocol (CDP) execution, botless audio meeting transcription, and zero-trust encrypted local memory storage.

---

## Master Milestone Roadmap

### Phase 1: MVP & Desktop Shell Foundation (Completed)
- [ ] Dual-pane workspace layout (Active browser view on right + persistent AI companion sidebar on left).
- [ ] Multi-tab navigation system (add, switch, close tabs, page title updates, favicons).
- [ ] Full browser navigation toolbar (address bar with search/URL resolution, back, forward, reload, home, bookmarking).
- [ ] Lightweight Memory Saver: Automated background tab sleeping loop to discard unused tabs and minimize RAM footprint.
- [ ] Active page DOM perception engine (`data-pineapple-ref` element tagging for interactive controls).
- [ ] Multi-provider AI Companion service (Mock offline engine, OpenAI GPT-4o, Anthropic Claude 3.5 Sonnet, Local Ollama).
- [ ] Comprehensive research dossier (`STRAWBERRY_BROWSER_RESEARCH.md`).

---

### Phase 2: Enhanced Browser Features & Native Controls
- [ ] **Tab Management Enhancements**:
  - Tab grouping, tab dragging/reordering, tab muting, tab pinning.
  - Vertical tab strip toggle mode.
  - Tab restoration for accidentally closed tabs (`Ctrl+Shift+T`).
- [ ] **Download Manager**:
  - Native download drawer at bottom/sidebar with progress bars, file pause/resume, and "Show in Folder" action.
- [ ] **History & Bookmarks Manager**:
  - Dedicated full-page History viewer with full-text search and date range filtering.
  - Bookmark folder hierarchy manager and import/export via HTML bookmarks file.
- [ ] **Privacy & Extension Controls**:
  - Built-in ad/tracker blocker (using Electron network request filter rules).
  - Incognito / Private Browsing mode windows (isolated session partition with no history/cookie persistence).
  - Chrome Extension support via Electron extension loading APIs.

---

### Phase 3: CDP Web Automation Engine & Visual Grounding
- [ ] **CDP Driver Execution Bridge**:
  - Connect main process `webContents.debugger` bridge directly to active tab viewports.
  - Implement native CDP hardware mouse click dispatches (`Input.dispatchMouseEvent` at calculated element center coordinates).
  - Implement native CDP text injection (`Input.insertText`) into focused form fields.
  - Implement CDP scroll dispatches and keyboard navigation dispatches.
- [ ] **Perception Engine Enhancements**:
  - Chromium Accessibility Tree (`AXTree`) parser to filter out presentation boilerplate and compress DOM snapshots down to <2,000 tokens.
  - Shadow DOM recursive traversal script to penetrate Web Components (Salesforce Lightning, ServiceNow).
  - Cross-origin iFrame debugger target auto-attach for multi-frame web pages.
- [ ] **Visual Grounding & Highlight Overlays**:
  - Glowing visual overlay bounding boxes on active page elements when the AI companion targets them.
  - Viewport screenshot capture with grid overlays for Canvas-rendered apps (Figma, Canva, Google Docs).

---

### Phase 4: Autonomous Agentic Loop & Portable Skills (`SKILL.md`)
- [ ] **Perception-Action Loop Runner**:
  - Iterative execution loop: *Sense Page DOM -> Plan Reasoning Thought -> Execute CDP Action -> Wait for Network Settling (`networkIdle2`) -> Evaluate Outcome -> Repeat*.
  - Step limit safeguards (max 20 steps per task) and infinite loop detection.
- [ ] **Portable Skills Engine (`SKILL.md` Standard)**:
  - Implement parser for human-readable `SKILL.md` playbook specifications.
  - Support official skill playbooks across 10 business domains:
    - *Sales & Lead Generation:* Prospecting on LinkedIn Sales Navigator, CRM deduplication against Salesforce/HubSpot.
    - *Recruiting:* Sourcing candidates on LinkedIn Recruiter/GitHub, syncing to Ashby/Greenhouse ATS.
    - *Market Research:* Mapping competitor matrices across Crunchbase, G2, Statista.
    - *Web Data Extraction:* Extracting product catalogs/directory pages into Google Sheets / CSV.
    - *Executive:* Investor updates, customer discovery synthesis, board deck outline generation.
- [ ] **Human-In-The-Loop Safety Intercepts**:
  - Reversibility classifier (reading/extracting runs autonomously; outbound emails/payments pause for human confirmation).

---

### Phase 5: Background Berry Bots & Event-Driven Routines
- [ ] **Background Routine Runner**:
  - Headless `BrowserContext` manager spawning non-visible browser instances for background task execution.
- [ ] **Event Triggers**:
  - Email triggers (monitoring Gmail for labeled messages like `"Leads"`).
  - Slack triggers (listening for `@mentions` or designated channel threads).
  - GitHub triggers (listening for issue assignments or PR pushes).
  - Scheduled Cron triggers (running recurring morning or weekly research routines).
- [ ] **Desktop Notification System**:
  - Native OS notifications summarizing completed background routines and presenting approval dialogs.

---

### Phase 6: System Loopback Audio Recorder & Encrypted Vector Memory
- [ ] **Botless System Audio Capture**:
  - Native desktop audio loopback capture (macOS CoreAudio / Windows WASAPI) to record video call audio (Zoom, Google Meet, Teams) without sending virtual joiner bots.
  - Local speech-to-text pipeline using local `whisper.cpp` or OpenAI Whisper API to output real-time call transcripts, key decisions, and action item drafts.
- [ ] **Local Encrypted Vector Database**:
  - On-device SQLite database with `sqlite-vss` vector similarity search.
  - Encrypted storage for browsing history, conversation logs, user preferences, writing style samples, and company context.
  - Zero cloud leakage: browsing content and memory vectors remain 100% local on user hardware.

---

## Complete Project File Structure

```
pineapple/
├── .gitignore                  # Git ignore rules (node_modules, dist, logs)
├── package.json                # Project dependencies, scripts, Electron config
├── tsconfig.main.json          # TypeScript config for Electron Main process (CommonJS)
├── tsconfig.json               # TypeScript config for Renderer React process (ESNext)
├── vite.config.ts              # Vite bundle configuration for Renderer
├── PLANE.md                    # Master execution roadmap & architecture plan (This file)
├── STRAWBERRY_BROWSER_RESEARCH.md # Exhaustive 1000+ line technical research guide
└── src/
    ├── main/                   # Electron Main Process (Desktop Shell & Native APIs)
    │   ├── index.ts            # Main application window lifecycle & IPC handlers
    │   ├── preload.ts          # ContextBridge IPC security bridge
    │   ├── types.ts            # Main process shared types
    │   ├── cdp-controller.ts   # Chrome DevTools Protocol automation driver (Phase 3)
    │   ├── perception.ts       # AXTree DOM perception engine (Phase 3)
    │   ├── agent-loop.ts       # Perception-Action LLM reasoning loop (Phase 4)
    │   ├── routine-runner.ts   # Background Berry Bot routine worker manager (Phase 5)
    │   ├── audio-recorder.ts   # System loopback audio capture DSP (Phase 6)
    │   └── memory-store.ts     # Encrypted local SQLite vector memory store (Phase 6)
    ├── renderer/               # React UI Process (User Workspace)
    │   ├── index.html          # HTML entrypoint for Vite
    │   ├── main.tsx            # React DOM rendering entrypoint
    │   ├── App.tsx             # Dual-pane main workspace UI (Tabs + AI Sidebar)
    │   ├── agent-service.ts    # Multi-provider LLM API client (Mock, OpenAI, Claude, Ollama)
    │   ├── types.ts            # Renderer types and custom JSX element declarations
    │   └── components/         # Reusable React UI components
    │       ├── Sidebar.tsx     # AI Companion side panel (Chat, Perception, Settings)
    │       ├── TabBar.tsx      # Tab strip & add/close tab controls
    │       ├── AddressBar.tsx  # URL input, navigation buttons, security lock, bookmarks
    │       └── BookmarksBar.tsx # Quick-access bookmarks toolbar
    └── shared/                 # Shared Data Models & Interfaces
        └── types.ts            # Universal type definitions (Tab, PagePerception, AgentAction)
```

---

## Verification & Quality Directives

1. **Compilation Check**: Run `npm run compile` (`tsc --project tsconfig.main.json && tsc --project tsconfig.json --noEmit`) after every major feature addition to guarantee zero TypeScript type errors.
2. **Build Verification**: Run `npm run build` (`vite build --config vite.config.ts`) to ensure production renderer bundles build cleanly.
3. **RAM Optimization**: Maintain V8 memory flags (`--max-old-space-size=512`) and ensure background tab sleep routines keep application RAM usage under 150MB during standard browsing.
4. **Security Enforcement**: Ensure `contextIsolation: true` and `nodeIntegration: false` remain enforced in all Electron web viewports, with all IPC calls routed safely through `preload.ts`.
