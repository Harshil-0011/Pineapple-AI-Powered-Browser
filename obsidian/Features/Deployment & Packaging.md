---
title: "Pineapple AI Browser - Deployment & Packaging Feature"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - deployment
  - packaging
  - electron-builder
aliases:
  - "Deployment & Packaging"
  - "Packaging"
links:
  - "[[Home]]"
  - "[[Getting Started]]"
  - "[[Features/Configuration]]"
confidence: "high"
---

# Deployment & Packaging

## Overview

The Deployment & Packaging subsystem converts Pineapple's source code into production executable bundles. It uses Vite to generate optimized web assets for the Renderer and `tsc` to compile the Electron Main process into `dist/`.

---

## Build Output Layout

When `npm run build` is executed, the following compiled directory structure is produced:

```text
dist/
├── main/
│   ├── main/
│   │   ├── index.js          # Electron Main process entrypoint
│   │   ├── preload.js        # Context Bridge IPC script
│   │   └── types.js          # Main process types
│   └── shared/
│       └── types.js          # Shared data interfaces
└── renderer/
    ├── index.html            # Production HTML entrypoint
    └── assets/
        ├── index-*.js        # React & Lucide component bundle
        └── index-*.css       # Tailwind v4 compiled CSS
```

---

## Packaging Flow Diagram

```text
Run `npm run build`
        │
        ├── 1. Vite Bundler (`vite build --config vite.config.ts`)
        │      Input:  src/renderer/
        │      Output: dist/renderer/
        │
        └── 2. TypeScript Main Compiler (`tsc --project tsconfig.main.json`)
               Input:  src/main/ & src/shared/
               Output: dist/main/
        │
        ▼
Launch Desktop Application via Electron:
`electron .` (Loads dist/main/main/index.js)
```

---

## Packaging Roadmap (`electron-builder`)

To distribute Pineapple as platform-native installers (`.dmg` for macOS, `.exe`/`.msi` for Windows, `.AppImage`/`.deb` for Linux), `electron-builder` will be configured in Phase 2 with the following manifest targets:

```json
"build": {
  "appId": "com.pineapple.browser",
  "productName": "Pineapple AI Browser",
  "mac": {
    "category": "public.app-category.productivity",
    "target": ["dmg", "zip"]
  },
  "win": {
    "target": ["nsis", "zip"]
  },
  "linux": {
    "target": ["AppImage", "deb"]
  }
}
```

---

## Known Issues

1. **ASAR Archive BrowserView Path Resolution:** When packing resources into ASAR archives during `electron-builder` execution, `preload.js` path references must use `path.join(__dirname, 'preload.js')` to ensure correct resolution.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Getting Started]] — Installation & Build Commands
- [[Features/Configuration]] — Build Configurations
- [[Features/Testing]] — Build Verification
