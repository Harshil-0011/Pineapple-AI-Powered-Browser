---
title: "Pineapple AI Browser - Ad Blocker Feature"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - ad-blocker
  - privacy
aliases:
  - "Ad Blocker"
  - "Tracker Blocker"
links:
  - "[[Home]]"
  - "[[Architecture]]"
  - "[[Features/Security]]"
  - "[[Features/Performance]]"
confidence: "high"
---

# Ad & Tracker Blocker

## Overview

Pineapple includes a built-in network request filter that intercepts outgoing HTTP requests from `BrowserView` web contexts. By blocking known telemetry endpoints, tracker scripts, and ad servers at the network layer, Pineapple speeds up page load times and prevents unwanted background network overhead.

---

## Components Breakdown

- `setupAdBlocker()` in `src/main/index.ts`: Registers request interceptors on `session.defaultSession.webRequest.onBeforeRequest`.
- Filter Rule List: Wildcard pattern matching array targeting major tracker/ad networks.

---

## Flow Diagram

```text
WebPage inside BrowserView requests external resource
  (e.g., https://www.google-analytics.com/analytics.js)
                         │
                         ▼
Electron Intercepts: session.defaultSession.webRequest.onBeforeRequest
                         │
                         ▼
Check URL against filter rules:
  '*://*.doubleclick.net/*'
  '*://*.google-analytics.com/*'
  '*://*.googlesyndication.com/*'
  '*://*.adservice.google.com/*'
  '*://*.scorecardresearch.com/*'
                         │
           ┌─────────────┴─────────────┐
           ▼                           ▼
     Matches Pattern?            No Match
           │                           │
           ▼                           ▼
  callback({ cancel: true })     callback({ cancel: false })
  (Request Blocked)              (Request Allowed)
```

---

## Configuration

Filter rules are defined in `src/main/index.ts`:

```typescript
private setupAdBlocker(): void {
  const filter = {
    urls: [
      '*://*.doubleclick.net/*',
      '*://*.google-analytics.com/*',
      '*://*.googlesyndication.com/*',
      '*://*.adservice.google.com/*',
      '*://*.scorecardresearch.com/*',
    ],
  };

  session.defaultSession.webRequest.onBeforeRequest(filter, (details, callback) => {
    callback({ cancel: true });
  });
}
```

---

## Known Issues

1. **Static Ruleset:** Current implementation uses an in-memory wildcard array.
   *Planned Enhancement:* Support EasyList / uBlock Origin rule engine integration in Phase 2.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Architecture]] — Process Architecture
- [[Features/Security]] — Process Security & Privacy
- [[Features/Performance]] — Performance Tuning
