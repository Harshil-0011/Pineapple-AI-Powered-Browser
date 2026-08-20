---
title: "Pineapple AI Browser - Memory System Architecture"
type: "architecture"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - memory
  - performance
  - vector-db
aliases:
  - "Memory System"
  - "Memory Saver"
links:
  - "[[Home]]"
  - "[[Architecture]]"
  - "[[Features/Performance]]"
  - "[[Features/Tab Management]]"
confidence: "high"
---

# Pineapple AI Browser - Memory System Architecture

## Overview

The Pineapple Memory System operates across two core domains:
1. **Short-Term Operating Memory (Memory Saver):** Active tab RAM optimization loop in the Electron Main process.
2. **Long-Term Context Memory (Vector Memory Store):** On-device vector database architecture storing browsing history, conversation logs, and agent execution records.

---

## Short-Term Memory Saver Loop

### Architecture & Mechanisms

To prevent Chromium V8 heap bloat from consuming system RAM, Pineapple implements a background tab sleeping loop in `src/main/index.ts` via `startMemorySaverLoop()`.

```text
       ┌─────────────────────────────────────────────────────────┐
       │   Timer Interval (Every 2 Minutes) in Main Process       │
       └────────────────────────────┬────────────────────────────┘
                                    │
                                    ▼
       ┌─────────────────────────────────────────────────────────┐
       │ For each tab in Map<string, TabView>:                    │
       │ Check: id !== activeTabId && !isSleeping                 │
       │        && (now - lastActiveAt > 15 Minutes)             │
       └────────────────────────────┬────────────────────────────┘
                                    │
                       ┌────────────┴────────────┐
                       │ YES                     │ NO
                       ▼                         ▼
         ┌───────────────────────────┐     ┌───────────┐
         │ Set isSleeping = true     │     │ Keep Tab  │
         │ Load 'about:blank'        │     │ Active    │
         │ Send 'tab:updated' IPC    │     └───────────┘
         └───────────────────────────┘
```

### Key Implementation in `src/main/index.ts`

```typescript
private startMemorySaverLoop(): void {
  setInterval(() => {
    const now = Date.now();
    const SLEEP_THRESHOLD = 15 * 60 * 1000; // 15 Minutes
    this.tabs.forEach((tabView, id) => {
      if (id !== this.activeTabId && !tabView.isSleeping && now - tabView.lastActiveAt > SLEEP_THRESHOLD) {
        tabView.isSleeping = true;
        tabView.view.webContents.loadURL('about:blank');
        this.notifyTabUpdated(tabView);
      }
    });
  }, 2 * 60 * 1000); // Check every 2 minutes
}
```

### Auto-Restoration on Selection

When the user selects a sleeping tab via `switchTab(id)`:
1. `targetTab.isSleeping` is toggled back to `false`.
2. `targetTab.view.webContents.loadURL(targetTab.url)` automatically reloads the original page.
3. System RAM usage drops back to baseline level (<150MB overall).

---

## Long-Term Vector Memory Store (Phase 6 Architecture)

### Core Objectives
- **Zero Cloud Leakage:** Local encrypted SQLite vector database (`sqlite-vss`).
- **Semantic Browsing Search:** Real-time embedding generation for visited page text summaries, allowing conversational retrieval (e.g., *"Find that article I read last Tuesday about vector search"*).
- **Personalization & Context Retention:** Storing user preferences, writing styles, and repeated workflow patterns.

### Vector Store Schema Specification

```sql
CREATE TABLE IF NOT EXISTS memory_embeddings (
    id TEXT PRIMARY KEY,
    domain TEXT NOT NULL,
    url TEXT NOT NULL,
    title TEXT NOT NULL,
    content_summary TEXT NOT NULL,
    embedding BLOB NOT NULL,
    created_at INTEGER NOT NULL
);

CREATE VIRTUAL TABLE IF NOT EXISTS vss_memories USING vss0(
    embedding(384)
);
```

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Architecture]] — System Process Architecture
- [[Features/Performance]] — Performance & RAM Budget
- [[Features/Tab Management]] — Tab View Lifecycle
