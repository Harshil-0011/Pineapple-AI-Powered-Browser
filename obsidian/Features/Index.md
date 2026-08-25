---
title: "Pineapple AI Browser - Features Index"
type: "index"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - features
  - index
aliases:
  - "Features Index"
  - "Feature Index"
links:
  - "[[Home]]"
  - "[[README]]"
  - "[[Features/Frontend UI]]"
  - "[[Features/LLM Integration]]"
  - "[[Features/DOM Perception Engine]]"
  - "[[Features/Action System]]"
  - "[[Features/Tab Management]]"
  - "[[Features/IPC Bridge]]"
  - "[[Features/Ad Blocker]]"
  - "[[Features/Browser Features]]"
  - "[[Features/Command Palette]]"
  - "[[Features/Voice Pipeline]]"
  - "[[Features/Security]]"
  - "[[Features/Configuration]]"
  - "[[Features/Testing]]"
  - "[[Features/Deployment & Packaging]]"
  - "[[Features/Performance]]"
confidence: "high"
---

# Pineapple AI Browser - Features Index

This index lists all feature specifications available in the Pineapple documentation vault. Each feature is documented in a dedicated, self-contained Markdown note.

---

## Complete Feature Directory

| Feature Document | Path | Primary Subsystem | Key Components & Files |
| :--- | :--- | :--- | :--- |
| [[Features/Frontend UI]] | `obsidian/Features/Frontend UI.md` | React / Design System | `ControlRail`, `ContextSidebar`, `styles.css`, `design.md` |
| [[Features/LLM Integration]] | `obsidian/Features/LLM Integration.md` | AI Engine | `agent-service.ts`, `AIPanel.tsx`, `AIChat.tsx` |
| [[Features/DOM Perception Engine]] | `obsidian/Features/DOM Perception Engine.md` | Perception | `data-pineapple-ref` script, `AXInspector.tsx` |
| [[Features/Action System]] | `obsidian/Features/Action System.md` | Agent Runner | `executeAgentAction()`, `AgentAction` types |
| [[Features/Tab Management]] | `obsidian/Features/Tab Management.md` | Electron Main | `BrowserView` map, `updateActiveViewBounds()`, `TabBar` |
| [[Features/IPC Bridge]] | `obsidian/Features/IPC Bridge.md` | Preload / IPC | `preload.ts`, `contextBridge`, `pineapple` global object |
| [[Features/Ad Blocker]] | `obsidian/Features/Ad Blocker.md` | Main / Network | `setupAdBlocker()`, `webRequest.onBeforeRequest` |
| [[Features/Browser Features]] | `obsidian/Features/Browser Features.md` | UI / Workspace | `Bookmarks.tsx`, `History.tsx`, `Downloads.tsx`, `Settings.tsx` |
| [[Features/Command Palette]] | `obsidian/Features/Command Palette.md` | Command Surface | `CommandPalette.tsx`, `ArtifactViewer.tsx` |
| [[Features/Voice Pipeline]] | `obsidian/Features/Voice Pipeline.md` | Audio / Speech | Audio loopback capture, `whisper.cpp` speech-to-text specification |
| [[Features/Security]] | `obsidian/Features/Security.md` | Process Safety | Sandboxing, `contextIsolation`, web preferences |
| [[Features/Configuration]] | `obsidian/Features/Configuration.md` | Build / Config | `package.json`, `vite.config.ts`, `tsconfig.json`, `tsconfig.main.json` |
| [[Features/Testing]] | `obsidian/Features/Testing.md` | Verification | `npm run compile`, type checks, build validation |
| [[Features/Deployment & Packaging]] | `obsidian/Features/Deployment & Packaging.md` | Distribution | Electron packaging, `dist/` directory output |
| [[Features/Performance]] | `obsidian/Features/Performance.md` | Performance | Memory Saver loop, <150MB RAM budget, CSS optimization |

---

## Related Hubs

- [[Home]] — Central Knowledge Hub
- [[README]] — Full Vault Document Table
- [[Project Overview]] — System Overview & Stats
