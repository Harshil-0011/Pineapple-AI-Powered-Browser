---
title: "Pineapple AI Browser - LLM Integration Feature"
type: "feature"
created: 2025-02-18
updated: 2025-02-18
tags:
  - pineapple
  - feature
  - ai
  - llm
  - agent-service
aliases:
  - "LLM Integration"
  - "AI Engine"
links:
  - "[[Home]]"
  - "[[Project Overview]]"
  - "[[Features/Action System]]"
  - "[[Features/DOM Perception Engine]]"
confidence: "high"
---

# LLM Integration & Agent Service

## Overview

The LLM Integration subsystem provides Pineapple's reasoning brain. It consumes user messages, combines them with active page perception DOM trees (`data-pineapple-ref`), and generates natural language chat responses alongside structured browser automation actions (`click`, `type`, `navigate`).

---

## Components Breakdown

- `src/renderer/agent-service.ts` (56 lines): Primary AI client class supporting configurable providers (Mock, OpenAI, Anthropic, Ollama).
- `src/renderer/components/ai/AIPanel.tsx` (65 lines): Tabbed side panel container for Chat, AX Tree Inspector, Skills, and Context.
- `src/renderer/components/ai/AIChat.tsx` (54 lines): Interactive chat thread component managing prompt submissions, message list rendering, and action execution triggers.
- `src/renderer/components/ai/AIContext.tsx` (22 lines): Context bar displaying active page title, URL, and interactive element count.
- `src/renderer/components/ai/Skills.tsx` (31 lines): Quick playbook runner interface for pre-defined automation prompts.

---

## Flow Diagram

```text
User Input in AIChat
        │
        ▼
AgentService.processRequest(userMessage, perception)
        │
        ├── Provider Check (this.config.provider)
        │
        ├──────────────────────┬──────────────────────┐
        ▼                      ▼                      ▼
    [ 'mock' ]            [ 'openai' ]           [ 'ollama' ]
Offline mock engine      GPT-4o API call      Local model host
Pattern matching &       Format DOM prompt    http://localhost:11434
 action generation
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               │
                               ▼
            Returns { text: string, action?: AgentAction }
                               │
                               ▼
        AIChat appends message to thread and executes action
            via window.pineapple.executeAction()
```

---

## Configuration

LLM configuration is managed in `src/renderer/agent-service.ts` via the `AIConfig` interface:

```typescript
export interface AIConfig {
  provider: 'mock' | 'openai' | 'anthropic' | 'ollama';
  apiKey?: string;
  model?: string;
}
```

Configuration can be updated dynamically at runtime through the Settings interface in `src/renderer/components/browser-features/Settings.tsx`.

---

## Known Issues

1. **Mock Provider Scope:** The default mock provider relies on basic keyword matching (`"search"`, `"click"`, `"go to"`). Complex multi-step reasoning requires connecting an active OpenAI or Ollama provider.
2. **Context Window Token Limits:** Unfiltered DOM trees on complex web pages (e.g. Amazon search results) can exceed context windows. Resolved by filtering out non-interactive presentation nodes in perception serialization.

---

## Related Documents

- [[Home]] — Documentation Hub
- [[Features/DOM Perception Engine]] — Ref Tagging & Page Perception
- [[Features/Action System]] — Agent Action Execution
- [[Features/Index]] — Features Index
