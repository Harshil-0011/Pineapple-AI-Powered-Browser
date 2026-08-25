---
title: "Pineapple AI Browser - Performance Feature"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - performance
  - ram-budget
  - optimization
aliases:
  - "Performance"
  - "Performance & Resource Management"
links:
  - "[[Home]]"
  - "[[Architecture]]"
  - "[[Memory System]]"
  - "[[Features/Tab Management]]"
confidence: "high"
---

# Performance & Resource Management

## Overview

Pineapple is engineered for high performance and low system resource consumption. Key performance targets include maintaining an overall RAM footprint under 150MB, achieving 60fps UI rendering, eliminating layout jank during sidebar toggles, and ensuring instantaneous omnibox typing feedback.

---

## Performance Subsystems Breakdown

1. **Memory Saver Background Loop (`startMemorySaverLoop`):** Automatically discards inactive `BrowserView` contents after 15 minutes by loading `about:blank`, dropping V8 memory usage back to base level.
2. **Dynamic Geometry Synchronization (`updateActiveViewBounds`):** Native `BrowserView` instances adjust bounding box dimensions based on React shell layout reports (`viewport:updateBounds`), preventing expensive layout recalculations.
3. **GPU-Accelerated CSS Rendering:** Restricts `backdrop-filter: blur()` usage to elevated popover controls and uses transform/opacity animations rather than width/height transitions.
4. **Ad & Tracker Blocker (`setupAdBlocker`):** Intercepts telemetry and tracking scripts at the network layer before V8 script parsing.

---

## Memory Saver Lifecycle Flow

```text
       Normal Browsing State (10 Open Tabs)
        ~800MB System RAM Usage
                   │
                   ▼
       Inactivity Timeout (>15 Minutes)
                   │
                   ▼
       Memory Saver Loop Fires in Main Process
                   │
       Sets 9 Inactive Tabs to 'about:blank'
                   │
                   ▼
       Optimized State (1 Active Tab + 9 Sleeping Tabs)
        <150MB System RAM Usage
                   │
                   ▼
       User selects a sleeping tab -> Auto reloads URL
```

---

## Design System Performance Directives (from `design.md`)

- **Explicit Property Transitions:** Never use `transition: all 300ms;`. Target `transform` and `opacity` explicitly.
- **Scrollbar Optimization:** Use `scrollbar-gutter: stable;` to avoid horizontal layout shift during list filtering.
- **Reduced Motion Support:** Respects `@media (prefers-reduced-motion: reduce)` by disabling non-essential ambient CSS animations.

---

## Known Issues

1. **Multiple Backdrop Filter Stacking:** Stacking multiple heavy `backdrop-filter` glass layers on low-end integrated GPUs can drop frame rates below 60fps. Resolved by limiting blur to Level 1/2 popovers.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Architecture]] — Process Model & IPC Architecture
- [[Memory System]] — Short-Term & Long-Term Memory Architecture
- [[Features/Tab Management]] — Tab View Lifecycle
