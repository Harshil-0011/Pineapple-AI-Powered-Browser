---
title: "Pineapple AI Browser - Configuration Feature"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - configuration
  - vite
  - typescript
aliases:
  - "Configuration"
  - "Project Config"
links:
  - "[[Home]]"
  - "[[Getting Started]]"
  - "[[Features/Deployment & Packaging]]"
confidence: "high"
---

# Configuration & Build Setup

## Overview

Pineapple utilizes a multi-config TypeScript and Vite build setup that separates Electron Main process compilation (CommonJS / Node target) from React Renderer bundling (ESNext / Vite target).

---

## Configuration Files Breakdown

- `package.json`: Manifest file specifying scripts (`dev`, `compile`, `build`, `start`), main entrypoint (`dist/main/main/index.js`), dependencies (`lucide-react`, `react`, `react-dom`), and devDependencies (`electron`, `vite`, `tailwindcss`, `typescript`).
- `vite.config.ts`: Vite bundling configuration with `@vitejs/plugin-react` and `@tailwindcss/vite` plugins. Configures renderer root (`src/renderer`), output path (`dist/renderer`), and `@shared` path aliases.
- `tsconfig.json`: TypeScript configuration for the React Renderer process (`target: ESNext`, `module: ESNext`, `jsx: react-jsx`).
- `tsconfig.main.json`: TypeScript configuration for the Electron Main process (`target: ES2022`, `module: CommonJS`, `outDir: dist/main`).

---

## Configuration Architecture

```text
                           package.json
                                 │
                 ┌───────────────┴───────────────┐
                 ▼                               ▼
      tsconfig.main.json                  vite.config.ts
    (Electron Main Process)           (React Renderer Process)
                 │                               │
                 ▼                               ▼
       Compiles src/main/              Bundles src/renderer/
       & src/shared/ into              & src/shared/ into
       dist/main/                      dist/renderer/
```

---

## Package Scripts Summary

```json
"scripts": {
  "dev": "vite",
  "compile": "tsc --project tsconfig.main.json && tsc --project tsconfig.json --noEmit",
  "build": "vite build --config vite.config.ts && tsc --project tsconfig.main.json",
  "start": "electron ."
}
```

---

## Known Issues

1. **Path Alias Resolution:** Shared types in `src/shared/types.ts` are resolved via relative paths `../shared/types` in Main process and `@shared` alias in Vite Renderer. Both builds must remain in sync.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Getting Started]] — Setup & Quickstart Guide
- [[Features/Testing]] — Verification & Type Checking
- [[Features/Deployment & Packaging]] — Bundle Compilation
