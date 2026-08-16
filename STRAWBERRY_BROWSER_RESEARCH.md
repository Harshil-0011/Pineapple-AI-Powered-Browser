# Deep Research: Strawberry Browser & Blueprint for Recreating an AI-Powered Browser

## Executive Summary

**Strawberry Browser** (developed by **Dendrite Systems**, founded in Stockholm, Sweden) is an AI-native desktop web browser available for macOS and Windows. Its central paradigm shift is moving from **"a browser built for tabs"** to **"a browser built for AI agents."**

Instead of requiring users to copy-paste context into separate chat interfaces (like ChatGPT or Claude web apps), Strawberry embeds AI companions directly into the browsing workspace. The AI companion reads tab contents, navigates web pages, performs multi-step automation, integrates with web applications, records/transcribes audio meetings locally without bots, and executes background routines.

---

## 1. Complete Breakdown of Strawberry Browser

### 1.1 What It Is & Core Concept
* **Name & Developer:** Strawberry Browser by Dendrite Systems (Founders: Charles Maddock, Arian Hanifi, Sebastian Thunman).
* **Target Audience:** Knowledge workers, sales teams, recruiters, founders, researchers, and operations professionals.
* **Core Value Proposition:** "Do hours of work in minutes." Automate repetitive browser tasks, research, lead generation, data extraction, and CRM updates directly in context.

### 1.2 Core Capabilities & Features

1. **In-Context AI Companion (Side Panel / Overlay)**
   * Follows the user across tabs.
   * Reads active tab content, DOM structure, and open context.
   * Interacts with websites on behalf of the user (clicks, typing, form filling, navigation).
   * Generates visual artifacts (slide decks, posters, dashboards, summaries).

2. **Automated Routines & Workflows**
   * Trigger-based automation for recurring tasks (e.g., *Trigger: New Gmail email with label "Leads"* -> *Action: Draft reply & update CRM*).
   * Background execution: "Berry bots" run tasks autonomously in the background while the user works on other tasks.

3. **Built-in Meeting Transcription (Botless)**
   * Transcribes meetings in real time across Zoom, Google Meet, Microsoft Teams, and web audio.
   * No virtual meeting bot joiner required; captures audio output/input locally.
   * Summarizes meetings and generates action items automatically.

4. **Deep Personalization & Long-Term Memory**
   * Remembers user preferences, project details, writing style, contacts, and historical context across chats.
   * Includes built-in importers to bring history/memory from ChatGPT or Claude, plus browser bookmarks, passwords, and extensions.

5. **Multi-Functional Use Cases & Playbooks**
   * **Market Research:** Profiles companies across Crunchbase, Statista, G2, LinkedIn.
   * **Sales & Lead Generation:** Prospecting, CRM logging (Salesforce/HubSpot), outreach drafting via Apollo/LinkedIn/Gmail.
   * **Recruiting & Candidate Sourcing:** Sourcing candidates across LinkedIn/Indeed and logging to ATS (Ashby/Greenhouse).
   * **Web Data Extraction:** Pulling unstructured web data (e.g. pricing tables, directory listings) into structured Google Sheets or CSVs.
   * **Founder/Exec Updates:** Aggregating metrics across Google Sheets, Jira, and Slack into investor update drafts.

---

## 2. Technical Stack & Architectural Analysis

### 2.1 Native App Architecture (Browser Shell)
Strawberry is a desktop application built on macOS and Windows:
* **Core Engine:** Chromium / Electron or Tauri-based web shell. Chromium guarantees full web compatibility, web extension support, local storage, cookie handling, and DevTools/DOM access.
* **UI Layer:** React / TypeScript UI overlay providing sidebars, routine creation builders, meeting transcription widgets, and chat panels.
* **Local Storage & Security Model:**
  * Passwords, browsing history, cookies, and chat memory are stored **locally on the user's device**.
  * User data and browsing activity are **not used for model training**.
  * Reversible actions are automated; high-risk/irreversible actions (e.g., sending emails, deleting data) require user confirmation ("Human-in-the-loop").

### 2.2 Agentic AI Engine & Tool-Use Architecture
To perform actions on any website, Strawberry uses an AI agent system:
1. **Perception Engine:**
   * Converts active DOM tree / accessibility trees into structured representations (or takes visual screenshots for Multimodal VLM reasoning).
   * Extracts interactive elements (buttons, inputs, links, forms) with unique identifiers.
2. **Action Engine (Web Automation):**
   * Executes actions via Chromium DevTools Protocol (CDP) or Playwright/Puppeteer style primitives (`click`, `type`, `navigate`, `scroll`, `extract_text`).
3. **Context & Memory Layer:**
   * Context window management combining active tab content, user memory store, and conversation history.
   * Hybrid retrieval (Vector DB / SQLite locally) for retrieving user preferences and project memory.
4. **Voice & Audio Pipeline:**
   * Local system audio loopback capture (macOS CoreAudio / Windows WASAPI) for recording meeting audio without meeting bots.
   * Audio transcription via OpenAI Whisper (local or cloud API).

---

## 3. Business Model & Pricing Structure

Browsing the web is **free**; AI credits are consumed when AI companions perform actions or reasoning:
* **Free Plan:** $0/mo — 2,000 credits/mo.
* **Intern Plan:** $20/mo — 8,000 credits/mo.
* **Part-time Plan:** $100/mo — 30,000 credits/mo (~15-20 hours delegated work/week).
* **Full-time Plan:** $250/mo — 75,000 credits/mo (~40+ hours automated work/week).
* **Credit Top-ups:** $10 per additional 1,000 credits.

---

## 4. Blueprint for Recreating Your Own AI-Powered Browser ("Your Way")

To build an AI browser custom tailored to your vision, the recommended architecture and phase-by-phase implementation strategy are outlined below:

### 4.1 Recommended Tech Stack
* **Desktop App Framework:** Electron + React + TypeScript (or Tauri 2.0 + Rust + React for lightweight performance).
* **Browser Engine:** Electron `Webview` / Chrome DevTools Protocol (`CDP`) to control active browser sessions and inject DOM context.
* **Agent Framework & DOM Interaction:** Custom TypeScript agent runner utilizing Playwright-style DOM selector extraction + Multimodal Vision (e.g. Claude 3.5 Sonnet / GPT-4o).
* **Local Data & Memory:** SQLite + `sqlite-vss` (or LanceDB) for local fast vector search and key-value storage.
* **Audio Capture:** Node.js native audio recorder (`node-record-lpcm16` or desktop capture) + Whisper API / local Whisper.cpp.

### 4.2 Proposed Modular Architecture
```
├── app/                     # Electron Main & Renderer Process
│   ├── main/                # Native window management, CDP controller, IPC handlers
│   ├── renderer/            # React UI: Sidebar, Chat, Tab Manager, Routine Builder
│   └── webview/             # Embedded browser view with content script injection
├── core/                    # Core Agent & AI Engine
│   ├── agent/               # Perception-Action Loop (Planner, Executor, Evaluator)
│   ├── dom/                 # DOM tree serializer, accessibility tree parser, element highlighter
│   ├── routines/            # Trigger & Action automation runner
│   ├── memory/              # Local SQLite vector memory store
│   └── audio/               # Local meeting recorder & Whisper transcriber
└── server/                  # Optional backend proxy / LLM router & credit metering
```

### 4.3 Key Roadmap & Implementation Steps
1. **Phase 1: Dual-Pane Browser Core**
   * Build Electron desktop app with address bar, tab bar, and embedded `BrowserView`/`Webview`.
   * Add side panel chat interface connected to LLM APIs (OpenAI / Anthropic / Ollama).
2. **Phase 2: Context Extraction & DOM Interaction**
   * Inject content script to extract page text, HTML, and accessibility tree from active tab.
   * Provide LLM with browser automation tools (`click(selector)`, `type(selector, text)`, `scroll(direction)`, `navigate(url)`).
3. **Phase 3: Background Workflows & Routines**
   * Implement event triggers (time-based, webhooks, or email/Slack triggers).
   * Background headless worker execution for tasks while user browses.
4. **Phase 4: Local Audio & Personal Memory**
   * System audio stream capture for meeting note taking.
   * Persistent SQLite database storing long-term memory, user preferences, and custom integrations.
