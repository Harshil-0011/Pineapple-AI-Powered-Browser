---
title: "Pineapple AI Browser - Testing Feature"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - testing
  - verification
  - tsc
aliases:
  - "Testing"
  - "Verification & Testing"
links:
  - "[[Home]]"
  - "[[Getting Started]]"
  - "[[Features/Configuration]]"
confidence: "high"
---

# Testing & Type Verification

## Overview

Pineapple enforces strict compile-time verification and type checking across both Electron Main and React Renderer processes. The testing directive requires running full TypeScript compilation checks (`npm run compile`) and Vite production build validation (`npm run build`) after any code modification.

---

## Verification Pipeline Breakdown

1. **Main Process Type Compilation:**
   ```bash
   tsc --project tsconfig.main.json
   ```
   Validates type safety in `src/main/index.ts`, `src/main/preload.ts`, and `src/shared/types.ts`. Compiles JavaScript output into `dist/main/`.

2. **Renderer Process Type Inspection:**
   ```bash
   tsc --project tsconfig.json --noEmit
   ```
   Checks all React components in `src/renderer/` for type errors without generating output files.

3. **Vite Production Asset Bundling:**
   ```bash
   vite build --config vite.config.ts
   ```
   Bundles HTML, React components, Lucide icons, and Tailwind v4 CSS into `dist/renderer/`.

---

## Verification Flow Diagram

```text
Code Changes Made in src/
           │
           ▼
Run `npm run compile`
           │
           ├── 1. tsc --project tsconfig.main.json
           │      (Checks & builds Main process)
           │
           └── 2. tsc --project tsconfig.json --noEmit
                  (Checks Renderer React components)
           │
           ▼
Zero Type Errors?
           │
     ┌─────┴─────┐
     ▼           ▼
   YES           NO
     │           │
     │           └─> Fix TypeScript errors before proceeding
     ▼
Run `npm run build`
(Generates production assets in dist/)
```

---

## Configuration

Type check directives are defined in `package.json`:

```json
"scripts": {
  "compile": "tsc --project tsconfig.main.json && tsc --project tsconfig.json --noEmit",
  "build": "vite build --config vite.config.ts && tsc --project tsconfig.main.json"
}
```

---

## Known Issues

1. **Module Resolution Warnings:** Ensuring `shared/types.ts` imports work seamlessly across both CommonJS (`tsconfig.main.json`) and ESNext (`tsconfig.json`) targets requires keeping `moduleResolution: "Node"` in both configs.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Getting Started]] — Setup & Development Guide
- [[Features/Configuration]] — Build Configuration
- [[Features/Deployment & Packaging]] — Packaging Roadmap
