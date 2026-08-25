---
title: "Pineapple AI Browser - Documentation Vault Index"
type: "hub"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - index
  - documentation
aliases:
  - "Vault Index"
  - "Doc Index"
links:
  - "[[Home]]"
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

# Pineapple AI Browser - Documentation Index

This directory contains the complete Obsidian-compatible documentation vault for the **Pineapple AI Browser** project.

---

## Vault Core Documents

| Document | Path | Type | Summary |
| :--- | :--- | :--- | :--- |
| [[Home]] | `obsidian/Home.md` | Hub | Central entry point and navigation hub for the vault. |
| [[README]] | `obsidian/README.md` | Index | Index table listing all notes in the Obsidian documentation vault. |
| [[Project Overview]] | `obsidian/Project Overview.md` | Overview | Purpose, target vision, tech stack, and module statistics. |
| [[Architecture]] | `obsidian/Architecture.md` | Architecture | ASCII module dependency graph, request flows, and process model. |
| [[Problems & Solutions]] | `obsidian/Problems & Solutions.md` | Guide | Solved challenges, open issues, troubleshooting playbook, and lessons. |
| [[Current Status]] | `obsidian/Current Status.md` | Status | Implementation state, completed Phase 1 features, and next steps. |
| [[Vision & Roadmap]] | `obsidian/Vision & Roadmap.md` | Guide | Long-term execution roadmap (Phases 1-6) and project non-goals. |
| [[Getting Started]] | `obsidian/Getting Started.md` | Guide | Development setup, scripts, environment variables, and troubleshooting. |
| [[Memory System]] | `obsidian/Memory System.md` | Architecture | Memory Saver loop (tab sleep) and encrypted vector store design. |

---

## Feature Specifications

| Feature Document | Path | Type | Summary |
| :--- | :--- | :--- | :--- |
| [[Features/Index]] | `obsidian/Features/Index.md` | Index | Comprehensive index of all individual feature specifications. |
| [[Features/Frontend UI]] | `obsidian/Features/Frontend UI.md` | Feature | Quiet Desktop Workspace, Spatial Glass, Capsule Controls, Tailwind CSS. |
| [[Features/LLM Integration]] | `obsidian/Features/LLM Integration.md` | Feature | Multi-provider AI service (Mock, OpenAI, Claude, Ollama). |
| [[Features/DOM Perception Engine]] | `obsidian/Features/DOM Perception Engine.md` | Feature | Ref-tagging script (`data-pineapple-ref`) and AXTree page inspection. |
| [[Features/Action System]] | `obsidian/Features/Action System.md` | Feature | Autonomous action execution (click, type, navigate, reasoning). |
| [[Features/Tab Management]] | `obsidian/Features/Tab Management.md` | Feature | Multi-tab `BrowserView` management, dynamic geometry, tab sleeping. |
| [[Features/IPC Bridge]] | `obsidian/Features/IPC Bridge.md` | Feature | Context-isolated IPC bridge (`preload.ts`) and type definitions. |
| [[Features/Ad Blocker]] | `obsidian/Features/Ad Blocker.md` | Feature | Network request filtering via `session.defaultSession.webRequest`. |
| [[Features/Browser Features]] | `obsidian/Features/Browser Features.md` | Feature | Bookmarks, History, Downloads, Extensions, Settings management. |
| [[Features/Command Palette]] | `obsidian/Features/Command Palette.md` | Feature | Cmd+K overlay, command search, and structured Artifact Viewer. |
| [[Features/Voice Pipeline]] | `obsidian/Features/Voice Pipeline.md` | Feature | Botless system loopback audio capture and speech-to-text pipeline. |
| [[Features/Security]] | `obsidian/Features/Security.md` | Feature | Process isolation, sandbox policies, zero-trust memory architecture. |
| [[Features/Configuration]] | `obsidian/Features/Configuration.md` | Feature | Package dependencies, Vite config, TypeScript main/renderer configs. |
| [[Features/Testing]] | `obsidian/Features/Testing.md` | Feature | Type compilation checks, Vite build validation, testing rules. |
| [[Features/Deployment & Packaging]] | `obsidian/Features/Deployment & Packaging.md` | Feature | Production bundle compilation and electron-builder distribution. |
| [[Features/Performance]] | `obsidian/Features/Performance.md` | Feature | Tab sleeping interval, RAM budget (<150MB), CSS performance. |

---

## Wikilink Conventions

- Every link uses standard Obsidian wikilinks: \[\[Note Name\]\] or \[\[Folder/Note\]\].
- Code references and syntax examples in text are escaped as `\[\[example\]\]`.
