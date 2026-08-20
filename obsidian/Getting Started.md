---
title: "Pineapple AI Browser - Getting Started Guide"
type: "guide"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - setup
  - quickstart
  - guide
aliases:
  - "Getting Started"
  - "Quickstart"
links:
  - "[[Home]]"
  - "[[Project Overview]]"
  - "[[Features/Configuration]]"
  - "[[Problems & Solutions]]"
confidence: "high"
---

# Pineapple AI Browser - Getting Started Guide

This guide provides step-by-step instructions for cloning, setting up, configuring, running, and troubleshooting Pineapple AI Browser on your local development machine.

---

## System Requirements

- **Operating System:** macOS 12+, Windows 10/11, or Linux (Ubuntu 20.04+)
- **Node.js Environment:** Node.js `v18.0.0` or higher (v20+ recommended)
- **Package Manager:** npm `v9.0.0` or higher
- **Hardware:** Minimum 4GB RAM (8GB+ recommended), Dual-core x86_64/ARM64 CPU

---

## Installation Steps

### 1. Clone Repository & Install Dependencies

```bash
git clone <repository-url>
cd pineapple
npm install
```

### 2. Verify TypeScript Compilation

Run the multi-process TypeScript compiler to ensure zero type errors:

```bash
npm run compile
```

This script executes:
```bash
tsc --project tsconfig.main.json && tsc --project tsconfig.json --noEmit
```

---

## Development & Build Commands

### Start Local Development Mode

Start the Vite development server and launch the Electron desktop shell:

```bash
# Terminal 1: Launch Vite renderer dev server
npm run dev

# Terminal 2 (after Vite server starts): Launch Electron
npm start
```

### Production Build

Build the production Vite renderer bundle and compile the Electron main process:

```bash
npm run build
```

This compiles:
1. Renderer asset bundle into `dist/renderer/` via Vite.
2. Main process TypeScript files into `dist/main/` via `tsconfig.main.json`.

---

## Environment Variables Configuration

Create a `.env` file in the root directory (or supply environment variables via shell):

```env
# Optional Vite Dev Server URL override (used when running npm run dev)
VITE_DEV_SERVER_URL=http://localhost:5173

# Optional LLM API Keys (can also be configured via Settings UI)
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
OLLAMA_HOST=http://localhost:11434

# Environment mode
NODE_ENV=development
```

---

## Data Backup & Local Directory Structure

Pineapple stores user browsing data, tab states, bookmarks, and settings in standard Electron user data directories:

- **macOS:** `~/Library/Application Support/Pineapple AI Browser/`
- **Windows:** `%APPDATA%\Pineapple AI Browser\`
- **Linux:** `~/.config/Pineapple AI Browser/`

### Manual Backup Procedure
To back up your Pineapple local session configuration, copy the user data folder:

```bash
cp -r "$HOME/Library/Application Support/Pineapple AI Browser" ~/pineapple_backup/
```

---

## Quick Troubleshooting

### Error: `Cannot find module 'dist/main/main/index.js'`
**Cause:** Main process TypeScript files have not been compiled yet.
**Fix:** Run `npm run compile` or `npm run build` before executing `npm start`.

### Error: `VITE_DEV_SERVER_URL connection refused`
**Cause:** Electron was launched before Vite finished starting.
**Fix:** Ensure `npm run dev` is running and displaying `Local: http://localhost:5173/` before running `npm start`.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Project Overview]] — System Overview
- [[Features/Configuration]] — Deep-dive Configuration Guide
- [[Problems & Solutions]] — Full Troubleshooting Matrix
