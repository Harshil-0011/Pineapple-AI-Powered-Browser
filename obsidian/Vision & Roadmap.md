---
title: "Pineapple AI Browser - Vision & Roadmap"
type: "guide"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - roadmap
  - vision
aliases:
  - "Vision & Roadmap"
  - "Roadmap"
links:
  - "[[Home]]"
  - "[[Project Overview]]"
  - "[[Current Status]]"
confidence: "high"
---

# Pineapple AI Browser - Vision & Roadmap

## Long-Term Vision

The web browser is the primary operating environment for knowledge workers, yet traditional browser architectures remain unchanged since the late 1990s—built around manual human tab switching.

**Pineapple** envisions a web browser where:
1. **AI Agents execute complex web workflows autonomously:** Sourcing candidates, compiling market research, deduplicating CRM records, and scraping structured datasets directly inside the user's authentic logged-in browser session.
2. **Resource consumption is lightweight and quiet:** Background tab sleeping keeps RAM footprint under 150MB without sacrificing instant access to active tabs.
3. **Data remains 100% private and on-device:** Local vector databases and local LLM options ensure zero leakage of private browsing data or corporate credentials to third-party cloud servers.

---

## Phased Execution Roadmap

### Phase 1: MVP & Desktop Shell Foundation (Completed)
- [x] Dual-pane spatial workspace layout (`ControlRail`, `ContextSidebar`, `BrowserViewport`).
- [x] Multi-tab `BrowserView` navigation system (create, switch, close, title updates).
- [x] Full browser navigation toolbar (omnibox with search/URL resolution, back, forward, reload, bookmarks).
- [x] Lightweight Memory Saver: Automated background tab sleeping loop (15-min timeout).
- [x] Active page DOM perception engine (`data-pineapple-ref` element tagging).
- [x] Multi-provider AI Companion service (Mock, OpenAI, Claude, Ollama).
- [x] Master architecture dossiers (`PLANE.md`, `STRAWBERRY_BROWSER_RESEARCH.md`, `design.md`).

---

### Phase 2: Enhanced Browser Features & Native Controls (In Progress)
- [ ] **Tab Management Enhancements:**
  - [ ] Tab grouping, dragging, pinning, and muting UI.
  - [ ] Vertical tab strip toggle mode.
  - [ ] Tab restoration (`Ctrl+Shift+T`).
- [ ] **Download Manager:**
  - [ ] Download progress drawer with pause/resume and "Show in Folder" action.
- [ ] **History & Bookmarks Manager:**
  - [ ] Dedicated full-page History viewer with date filtering.
  - [ ] Bookmark hierarchy tree manager with HTML import/export.
- [ ] **Privacy & Extension Controls:**
  - [ ] Extended ad/tracker filter rules.
  - [ ] Incognito / Private browsing isolated session partition.
  - [ ] Chrome extension loading API integration.

---

### Phase 3: CDP Web Automation Engine & Visual Grounding
- [ ] **CDP Driver Execution Bridge:**
  - [ ] Connect `webContents.debugger` bridge directly to active tab viewports.
  - [ ] Hardware mouse clicks via `Input.dispatchMouseEvent`.
  - [ ] Text injection via `Input.insertText`.
  - [ ] CDP scroll dispatches and keyboard navigation dispatches.
- [ ] **Perception Engine Enhancements:**
  - [ ] Chromium Accessibility Tree (`AXTree`) parser token compression (<2,000 tokens).
  - [ ] Shadow DOM recursive traversal script.
  - [ ] Cross-origin iFrame debugger target auto-attach.
- [ ] **Visual Grounding & Overlays:**
  - [ ] Glowing bounding box overlays on targeted elements.
  - [ ] Viewport screenshot capture with coordinate grid overlays for Canvas apps (Figma, Canva).

---

### Phase 4: Autonomous Agentic Loop & Portable Skills (`SKILL.md`)
- [ ] **Perception-Action Loop Runner:**
  - [ ] Iterative loop: *Sense DOM -> Plan Thought -> Execute CDP Action -> Wait for Network Settling -> Evaluate Outcome -> Repeat*.
  - [ ] Step limit safeguards (max 20 steps) and infinite loop detection.
- [ ] **Portable Skills Engine (`SKILL.md` Standard):**
  - [ ] Parser for human-readable `SKILL.md` specifications.
  - [ ] Official playbooks for Sales, Sourcing, Market Research, Extraction, and Product Management.
- [ ] **Human-In-The-Loop Safety Intercepts:**
  - [ ] Action classification (read/extract runs autonomously; emails/payments pause for human confirmation).

---

### Phase 5: Background Berry Bots & Event-Driven Routines
- [ ] **Background Routine Runner:**
  - [ ] Headless `BrowserContext` manager spawning background instances.
- [ ] **Event Triggers:**
  - [ ] Email, Slack, GitHub, and scheduled Cron triggers.
- [ ] **Desktop Notification System:**
  - [ ] Native OS notifications summarizing completed background routines.

---

### Phase 6: System Loopback Audio Recorder & Encrypted Vector Memory
- [ ] **Botless System Audio Capture:**
  - [ ] Native desktop audio loopback capture (macOS CoreAudio / Windows WASAPI) for call recording.
  - [ ] Local speech-to-text pipeline using `whisper.cpp` or OpenAI Whisper API.
- [ ] **Local Encrypted Vector Database:**
  - [ ] On-device SQLite database with `sqlite-vss` vector similarity search.
  - [ ] Encrypted storage for browsing history, conversation logs, and company context.

---

## Project Non-Goals

To maintain clarity of scope and software discipline, Pineapple explicitly defines the following **non-goals**:

1. **Cloud-Hosted Virtual Browser Grid:** Pineapple will NOT operate as a remote cloud-streaming browser service. It is strictly a native desktop application leveraging local user hardware and session cookies.
2. **Mobile Browser Ports:** Pineapple will NOT target iOS or Android mobile platforms. Desktop system integration (CoreAudio, WASAPI, local SQLite, multi-window management) is core to the application.
3. **Bloated Electron Extension Stores:** Pineapple will NOT maintain a proprietary extension marketplace; it relies on standard Web APIs and Chrome Extension loading capabilities.
