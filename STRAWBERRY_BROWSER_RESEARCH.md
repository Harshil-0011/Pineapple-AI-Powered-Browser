# Strawberry Browser: Exhaustive Analysis of Capabilities & Mechanics

## Executive Summary

**Strawberry Browser** (developed by **Dendrite Systems**, founded in Stockholm, Sweden) is an AI-native desktop browser for macOS and Windows. It reimagines web browsing by replacing a tab-centric interface with an **agentic workspace**. Instead of users manually browsing websites and copying/pasting data into isolated AI tools, Strawberry integrates an AI companion into the browser shell that can view tabs, interact with websites, execute multi-step routines, record meetings botlessly, and automate complex workflows.

---

## 1. What Strawberry Browser Can Do (Capabilities & Functions)

### 1.1 In-Context Companion & Web Interaction
* **Read Tab Contents:** Scans and interprets visible text, HTML elements, metadata, and structured data on open web tabs.
* **Direct Web Automation (Clicking & Typing):**
  * Fills out forms, searches databases, navigates paginated lists, clicks buttons, and selects options in dropdowns.
  * Navigates behind login walls using the user's active logged-in browser session (no separate API keys or headless auth required).
* **Multi-Tab Execution:** Operates across multiple tabs simultaneously (e.g., cross-referencing data on LinkedIn, Crunchbase, and Salesforce).
* **Visual Artifact Generation:** Generates branded slides, posters, infographics, structured dashboards, and report decks derived directly from web source material.

### 1.2 Routine Automation ("Berry Bots")
* **Background Workflows:** Runs recurring browser tasks in the background without blocking active browsing.
* **Event-Driven Triggers:**
  * *Email Received:* (e.g., Gmail trigger with specific label like "Leads" -> auto-draft reply and create CRM contact).
  * *Slack Mention:* (e.g., Slack thread mention in `#design` -> analyze context and draft suggested reply).
  * *GitHub Event:* (e.g., PR opened or issue assigned -> run test reproduction, analyze code, assign reviewer).
  * *Scheduled/Time Triggers:* (e.g., Every Friday at 9 AM -> pull metrics from Google Sheets & Jira and draft investor update).
* **Human-in-the-Loop Safeguards:** Automatically pauses at critical/high-risk stages (e.g., sending an email or updating production CRM data) to request human confirmation before proceeding.

### 1.3 Botless Meeting Transcription & Voice Notes
* **Real-time Audio Capture:** Records video calls (Zoom, Google Meet, Microsoft Teams) or native web audio directly from local desktop audio streams without sending a bot to join the meeting call.
* **Voice-to-Task Pipeline:** Transcribes spoken audio, summarizes meetings, extracts decision items/action points, and converts voice input into executable browser commands.

### 1.4 Deep Personalization & Import
* **Long-Term Context Memory:** Stores user preferences, project details, writing style, client lists, and domain context locally.
* **Data Importers:**
  * Import history, bookmarks, passwords, and extensions from Chrome, Arc, or Brave.
  * Import custom instructions, memories, and context directly from ChatGPT or Claude.

### 1.5 Industry Playbooks & Use Cases
1. **Market Research & Competitive Intelligence:** Profiles companies and sizes markets across Crunchbase, Statista, G2, and LinkedIn.
2. **Sales & Prospecting:** Identifies leads on Apollo/LinkedIn, extracts contact info, logs leads into Salesforce/HubSpot, and drafts customized outreach emails in Gmail.
3. **Candidate Sourcing & Recruiting:** Searches candidates on LinkedIn/Indeed, evaluates candidate alignment, and syncs profiles directly into Ashby or Greenhouse ATS.
4. **Web Data Extraction:** Scrapes complex web data (pricing tables, directory listings, product catalogs) directly into formatted Google Sheets or CSV files.
5. **Social Listening:** Tracks user sentiment, product feedback, and brand mentions across Reddit, X (Twitter), YouTube, and review sites.

---

## 2. How Strawberry Browser Does It (Technical Architecture & Mechanics)

```
┌────────────────────────────────────────────────────────────────────────┐
│                      Strawberry Desktop Shell                          │
│  ┌───────────────────────────┐    ┌─────────────────────────────────┐  │
│  │    Side Panel AI Agent    │    │   Chromium Webview / Tabs       │  │
│  │ (React UI / Chat / Voice) │    │  (Logged-in user sessions)      │  │
│  └─────────────┬─────────────┘    └────────────────┬────────────────┘  │
└────────────────┼───────────────────────────────────┼────────────────────┘
                 │                                   │
                 ▼                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                           Core Agent Engine                            │
│  ┌─────────────────────┐  ┌────────────────────┐  ┌─────────────────┐ │
│  │ Accessibility / DOM │  │ Chrome DevTools    │  │ Local Audio     │ │
│  │ Tree Serializer     │  │ Protocol (CDP)     │  │ Capture &       │ │
│  │ (Perception)        │  │ Action Executor    │  │ Whisper Engine  │ │
│  └──────────┬──────────┘  └─────────▲──────────┘  └────────┬────────┘ │
└─────────────┼───────────────────────┼──────────────────────┼──────────┘
              │                       │                      │
              ▼                       │                      ▼
┌─────────────────────────────────────┴──────────────────────────────────┐
│                   Context, Memory & AI Providers                       │
│  ┌───────────────────────┐ ┌────────────────────┐ ┌──────────────────┐ │
│  │ Local Vector DB       │ │ Multimodal LLM     │ │ Background       │ │
│  │ (SQLite / Passwords)  │ │ (Sonnet/GPT-4o)    │ │ Routine Worker   │ │
│  └───────────────────────┘ └────────────────────┘ └──────────────────┘ │
└────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Browser Engine & Session Handling
* **Chromium Core:** Built on a Chromium desktop shell (via Electron or native C++ framework).
* **Shared Cookie & Session State:** Because the AI companion runs inside the same browser process as the tabs, it inherits all authenticated session cookies, local storage, and passwords. This eliminates the need for API keys or OAuth setups for web apps.

### 2.2 Perception & DOM Tree Serialization
How the AI companion "sees" web pages:
1. **Accessibility Tree Extraction:** Converts raw HTML DOM trees into cleaned, semantic accessibility trees (filtering out non-interactive styling and boilerplate).
2. **Element Marking / Ref-Tags:** Assigns unique numerical identifiers (`[ref=42]`) to interactive DOM nodes (buttons, inputs, links).
3. **Multimodal Vision Fallback:** Captures viewport screenshots for layout analysis, rendering visual elements into multimodal vision LLMs (e.g. Claude 3.5 Sonnet or GPT-4o) when DOM structure alone is insufficient.

### 2.3 Action Execution via CDP (Chrome DevTools Protocol)
How the AI performs actions on web pages:
* Operates an execution loop via CDP commands:
  * `Input.dispatchMouseEvent` for clicking coordinates or element selectors.
  * `Input.insertText` for typing naturally into textfields without triggering bot-detection scripts.
  * `Page.navigate` for URL changes.
  * `DOM.querySelector` and DOM evaluation scripts for text extraction.

### 2.4 Botless Meeting Audio Recording
How meeting recording works without joining bots:
* Captures the operating system's loopback audio device (e.g., CoreAudio on macOS, WASAPI on Windows).
* Records system audio output (other speakers) and microphone input (user).
* Processes local audio chunks through an OpenAI Whisper pipeline (or local Whisper C++ runtime) to generate synchronized transcripts in real time.

### 2.5 Routine Engine & Event Listening
How automated background tasks run:
* **Background Process Runner:** Operates event listeners (polling email APIs, webhooks, or system schedulers).
* **Headless Worker Instance:** Launches hidden browser contexts to execute routines without taking over the user's active viewport tab.
* **Human-in-the-Loop Intercepts:** When a routine step encounters an action flagged as `IRREVERSIBLE` (e.g., sending an email or submitting a form), the routine runner pauses and pushes a desktop notification/prompt for user approval.

### 2.6 Local Storage & Security Architecture
* **Local Data Isolation:** Chat transcripts, browsing history, memory embeddings, and passwords remain strictly on the local device filesystem inside encrypted SQLite databases.
* **Zero Model Training:** Browsing activity and user data are never transmitted to LLM providers for model training.

---

## 3. Blueprint & Tech Stack for Recreating "Your Way"

To build your custom version of an AI-powered browser, follow this recommended architectural blueprint:

### 3.1 Tech Stack Recommendation
* **Desktop App Shell:** Electron (or Tauri 2.0) + React + TypeScript + Tailwind CSS.
* **Browser View Integration:** Electron `Webview` or `BrowserView` attached to Chrome DevTools Protocol (`CDP`).
* **Agent Framework:** Custom TypeScript Perception-Action Loop using `@puppeteer/replay` or Playwright DOM primitives.
* **AI & LLM Router:** LangChain / Vercel AI SDK connected to OpenAI GPT-4o / Anthropic Claude 3.5 Sonnet / Ollama local models.
* **Local Memory & DB:** SQLite + `sqlite-vss` / Vector search for user preferences & historical chats.

### 3.2 Key Development Phases
1. **Phase 1: Native App & Webview Setup** — Create a dual-pane desktop window containing standard tab browsing on the right and an AI side panel on the left.
2. **Phase 2: DOM Injection & Agent Execution** — Implement content script injection to extract interactive elements and execute CDP actions (`click`, `type`, `scroll`).
3. **Phase 3: Routine Builder & Trigger Engine** — Implement background worker loops that listen to triggers (time/webhooks) and run headless automation.
4. **Phase 4: Local Audio & Voice Companion** — Integrate system audio recording for meeting summarization and local vector storage for persistent memory.
