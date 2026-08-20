---
title: "Pineapple AI Browser - Documentation Hub"
type: "hub"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - documentation
  - hub
aliases:
  - "Home"
  - "Pineapple Hub"
links:
  - "[[Project Overview]]"
  - "[[Architecture]]"
  - "[[Problems & Solutions]]"
  - "[[Current Status]]"
  - "[[Vision & Roadmap]]"
  - "[[Getting Started]]"
  - "[[Memory System]]"
  - "[[Features/Index]]"
confidence: "high"
---

# Pineapple AI Browser - Documentation Hub

Welcome to the central knowledge hub for **Pineapple AI Browser**, a lightweight, AI-native desktop web browser built with Electron, React, TypeScript, and Vite.

Pineapple redefines web browsing by shifting the primary interface paradigm from traditional tab management to autonomous AI agent interaction. Featuring a dual-pane spatial workspace, native Chrome DevTools Protocol (CDP) execution, an automated background tab sleeping Memory Saver, and an extensible skills engine, Pineapple delivers desktop automation with zero-trust local privacy.

---

## Core System Documentation

| Document | Description | Key Focus Areas |
| :--- | :--- | :--- |
| [[Project Overview]] | High-level summary, purpose, tech stack, and module statistics. | System stats, core philosophy, module line counts |
| [[Architecture]] | Technical layout, process model, IPC bridges, and flow diagrams. | Electron process model, IPC request flows, concurrency |
| [[Problems & Solutions]] | Solved issues, open challenges, troubleshooting, lessons learned. | Memory leaks, layout synchronization, CDP bridge |
| [[Current Status]] | Development status, completed Phase 1 MVP, in-progress items. | Completed MVP features, active roadmap phase |
| [[Vision & Roadmap]] | Long-term roadmap, phased checkboxes, and project non-goals. | Phase 1 to Phase 6 roadmap, non-goals |
| [[Getting Started]] | Setup guide, prerequisites, installation, and environment configuration. | Local dev setup, package scripts, env vars |
| [[Memory System]] | Memory Saver loop and local encrypted vector memory store. | 15-min background tab sleeping, vector database |

---

## Feature Specifications

All feature specifications are detailed in individual, dedicated files within the [[Features/Index|Features Index]]:

- [[Features/Frontend UI|Frontend UI]] — Quiet Spatial Glass & Capsule visual design system.
- [[Features/LLM Integration|LLM Integration]] — Multi-provider AI client (Mock, OpenAI, Claude, Ollama).
- [[Features/DOM Perception Engine|DOM Perception Engine]] — `data-pineapple-ref` tagging and accessibility tree parsing.
- [[Features/Action System|Action System]] — Autonomous click, type, and navigate agent execution loops.
- [[Features/Tab Management|Tab Management]] — Dynamic `BrowserView` lifecycle, viewport bounds, and tab sleeping.
- [[Features/IPC Bridge|IPC Bridge]] — Context-isolated `preload.ts` bridge and type-safe IPC channels.
- [[Features/Ad Blocker|Ad Blocker]] — Native network request filtering rules.
- [[Features/Browser Features|Browser Features]] — Bookmarks, History, Downloads, Extensions, and Settings UI.
- [[Features/Command Palette|Command Palette]] — Cmd+K quick runner and structured `ArtifactViewer`.
- [[Features/Voice Pipeline|Voice Pipeline]] — System loopback audio capture and speech-to-text specification.
- [[Features/Security|Security]] — Process isolation, sandboxing, and zero-trust local storage.
- [[Features/Configuration|Configuration]] — TypeScript, Vite, and build system configuration.
- [[Features/Testing|Testing]] — Verification directives, type checking, and compilation checks.
- [[Features/Deployment & Packaging|Deployment & Packaging]] — Renderer/main bundle structure and packaging roadmap.
- [[Features/Performance|Performance]] — RAM target (<150MB), tab sleep loop, and 60fps rendering guidelines.

---

## Quick Navigation Rules

When creating or modifying documentation within this Obsidian vault, adhere to these guidelines:
1. Use Obsidian wikilinks only (e.g., \[\[Note Name\]\] or \[\[Folder/Note\]\]).
2. Escape inline syntax examples in documentation text using backslashes like `\[\[example\]\]`.
3. Every document must maintain valid frontmatter.
