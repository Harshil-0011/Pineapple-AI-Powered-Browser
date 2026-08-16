# Strawberry Browser: Complete Architectural Master-Dossier & Recreation Blueprint

## Executive Overview & Corporate Profile
* **Product:** Strawberry Browser
* **Developer Company:** Dendrite Systems (Stockholm, Sweden)
* **Founding Team:**
  * **Charles Maddock (CEO):** LLM & Agent Specialist building autonomous agents since 2018. Creator of *Fishards*.
  * **Arian Hanifi:** Software Engineer, reverse engineered Stockholm metro transit system, Graph Neural Network researcher.
  * **Sebastian Thunman:** Creative Builder & Designer, multi-time tech startup founder.
* **Core Paradigm:** Moving from a browser designed around **tabs** to a browser designed for **autonomous AI companions & skills**.
* **Target Users:** Founders, Sales Executives, Technical Recruiters, Operations Managers, Venture Capitalists, Marketing Teams, Agencies, and Consultants.

---

## 1. Exhaustive Feature Matrix & Capabilities

### 1.1 In-Context Companion Interface
* **Dual-Pane Desktop Layout:**
  * **Right Pane:** Full-featured Chromium browser shell rendering active user web tabs (with full logged-in state, local cookies, and extension support).
  * **Left Pane (Sidebar):** Persistent AI Companion chat interface with voice mode, skill execution controls, and routine manager.
* **Context Sensing:** Companion automatically reads active tab contents, selected text, active URL, and accessibility DOM tree without requiring manual prompt copying.
* **Direct Web Control:** Performs native browser interactions (`click`, `type`, `select_dropdown`, `scroll`, `drag-and-drop`, `file-upload`).
* **Visual Artifact Engine:** Creates dynamic slide decks, HTML dashboards, competitive matrix tables, infographics, and report decks rendered directly in browser context.

### 1.2 Official Skills Architecture (`dendrite-systems/strawberry-official-skills`)
Strawberry uses a portable, human-readable **SKILL.md** standard (Apache-2.0 license) structured as follows:
```
sales/
  getting-started-with-sales-in-strawberry/
    SKILL.md
    strawberry.json      # Metadata, discovery tags, presentation roles
    article.json         # Editorial content
```

#### Complete Collection Breakdown:
1. **Founder & Executive:** Customer discovery, fundraising research, executive hiring, investor update drafting (aggregating Google Sheets, Slack, Jira).
2. **Sales:** Prospecting (LinkedIn Sales Navigator, Apollo), lead deduplication against CRM (Salesforce/HubSpot), personalized outreach drafting (Gmail).
3. **Agency:** Client proposal creation, competitor research, report delivery.
4. **Consulting:** Industry benchmarking, proposal drafting, client follow-up automation.
5. **Recruiting:** Candidate sourcing (LinkedIn Recruiter, Indeed), screening against job specs, ATS syncing (Ashby, Greenhouse).
6. **Operations:** Form triage, invoice/receipt tracking, data reconciliation across sheets and internal tools.
7. **Marketing:** Social listening (Reddit, X, G2, YouTube), SEO competitor audits, campaign drafting.
8. **Product & Engineering:** GitHub issue investigation, PR reproduction, bug tracking, customer feedback synthesis.
9. **Research & Analysis:** Ecosystem mapping, YC company profiling, technical stack extraction, academic paper summaries.
10. **Venture Capital:** Startup diligence, market mapping, thesis extraction, investment memo generation.

### 1.3 Routine Automation ("Berry Bots")
* **Event-Driven Triggers:**
  * **Email (Gmail):** Listens for new messages matching filters/labels (e.g., `"Leads"`) -> auto-drafts reply and updates CRM.
  * **Slack:** Listens for `@mentions` or channel posts -> reads thread history and posts suggested responses.
  * **GitHub:** Listens for PR pushes, issue assignments -> runs test reproduction and opens pull requests with fixes.
  * **Calendar & Cron:** Time-based triggers (e.g., every Monday at 8 AM -> scrape competitor pricing pages).
* **Human-in-the-Loop Safeguards:**
  * **Reversible Actions:** Automated without stopping (reading, searching, extracting, summarizing).
  * **Irreversible Actions:** Automatically pauses and prompts the user before sending emails, updating CRM records, or committing code.

### 1.4 Botless Meeting Transcription
* **OS Audio Loopback:** Captures desktop speakers and microphone streams (via CoreAudio / WASAPI) without sending virtual meeting joiner bots into Zoom, Google Meet, or Teams.
* **Real-time Voice Pipeline:** Streams PCM audio into local Whisper C++ / OpenAI Whisper API to generate live transcripts, decision lists, and automated action item drafts.

### 1.5 Deep Personalization & Zero-Trust Privacy
* **Memory Importers:** Import bookmarks, history, passwords, and extensions from Chrome, Arc, or Brave; import prompts and memory from ChatGPT/Claude.
* **Local Data Storage:** Passwords, chats, browsing history, and embeddings are saved strictly locally in an encrypted SQLite database.
* **Zero Model Training:** Customer browsing activity is never used for LLM training.

---

## 2. Technical Architecture & System Mechanics

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│                             Strawberry Desktop Shell                             │
│  ┌─────────────────────────────────────┐  ┌───────────────────────────────────┐  │
│  │     AI Companion Side Panel UI      │  │    Chromium WebContents / Tabs    │  │
│  │     (React / Voice / Skills)        │  │   (Active User Sessions & Cookies)│  │
│  └──────────────────┬──────────────────┘  └─────────────────┬─────────────────┘  │
└─────────────────────┼───────────────────────────────────────┼────────────────────┘
                      │                                       │
                      ▼                                       ▼
┌──────────────────────────────────────────────────────────────────────────────────┐
│                            Core Agent & Automation Runtime                       │
│  ┌───────────────────────────┐ ┌──────────────────────────┐ ┌──────────────────┐ │
│  │  AXTree & Ref-Tagging     │ │ Chrome DevTools Protocol │ │ OS Audio Capture │ │
│  │  DOM Serializer           │ │ (CDP) Action Execution   │ │ (Loopback Audio) │ │
│  └──────────────┬────────────┘ └────────────▲─────────────┘ └────────┬─────────┘ │
└─────────────────┼───────────────────────────┼────────────────────────┼───────────┘
                  │                           │                        │
                  ▼                           │                        ▼
┌─────────────────────────────────────────────┴────────────────────────────────────┐
│                        Context, Memory & AI Providers                            │
│  ┌───────────────────────────┐ ┌─────────────────────────┐ ┌───────────────────┐ │
│  │ Local Encrypted Vector DB │ │ Multimodal LLMs         │ │ Background        │ │
│  │ (SQLite / Memory)         │ │ (Sonnet 3.5 / GPT-4o)   │ │ Routine Workers   │ │
│  └───────────────────────────┘ └─────────────────────────┘ └───────────────────┘ │
└──────────────────────────────────────────────────────────────────────────────────┘
```

### 2.1 Perception Engine & Ref-Tagging Algorithm
1. **AXTree Extraction:** Converts raw HTML DOM into a sanitized Accessibility Tree, stripping non-semantic tags and inline styles.
2. **Ref-Tagging:** Assigns numerical identifiers (`[ref=N]`) to interactive elements.
3. **Serialized YAML Format for LLM Prompting:**
   ```yaml
   page_title: "LinkedIn Sales Navigator"
   url: "https://www.linkedin.com/sales/search/people"
   elements:
     - ref: 101
       role: "input"
       name: "Keywords"
       value: "VP of Sales"
     - ref: 102
       role: "button"
       name: "Search"
   ```

### 2.2 Action Execution via Chrome DevTools Protocol (CDP)
Direct control over Chromium DOM without synthetic events:
```typescript
// Example CDP mouse click dispatch
await webContents.debugger.sendCommand('Input.dispatchMouseEvent', {
  type: 'mousePressed',
  x: coords.x,
  y: coords.y,
  button: 'left',
  clickCount: 1,
});
await webContents.debugger.sendCommand('Input.dispatchMouseEvent', {
  type: 'mouseReleased',
  x: coords.x,
  y: coords.y,
  button: 'left',
  clickCount: 1,
});
```

---

## 3. Business Model & Pricing Structure

* **Free:** $0/month — 2,000 credits/mo.
* **Intern:** $20/month — 8,000 credits/mo.
* **Part-time:** $100/month — 30,000 credits/mo (~15-20 hrs automated work/week).
* **Full-time:** $250/month — 75,000 credits/mo (~40+ hrs automated work/week).
* **Credit Top-ups:** $10 per additional 1,000 credits.

---

## 4. Complete Code Prototype for Custom Recreation

### Shared Types (`src/shared/types.ts`)
```typescript
export interface RefElement {
  ref: number;
  tagName: string;
  role: string;
  name: string;
  value?: string;
  selector: string;
  bounds: { x: number; y: number; width: number; height: number };
}

export interface PagePerception {
  title: string;
  url: string;
  elements: RefElement[];
}

export type AgentAction =
  | { type: 'click'; ref: number }
  | { type: 'type'; ref: number; text: string }
  | { type: 'navigate'; url: string }
  | { type: 'scroll'; direction: 'up' | 'down' }
  | { type: 'finish'; summary: string };
```

### CDP Controller (`src/main/cdp-controller.ts`)
```typescript
import { WebContents } from 'electron';
import { PagePerception, RefElement, AgentAction } from '../shared/types';

export class CDPController {
  private webContents: WebContents;

  constructor(webContents: WebContents) {
    this.webContents = webContents;
  }

  public async capturePerception(): Promise<PagePerception> {
    const url = this.webContents.getURL();
    const title = this.webContents.getTitle();

    const elements: RefElement[] = await this.webContents.executeJavaScript(`
      (() => {
        let idCounter = 1;
        const elements = [];
        const interactiveSelectors = 'button, a, input, select, textarea, [role="button"]';

        document.querySelectorAll(interactiveSelectors).forEach((el) => {
          const rect = el.getBoundingClientRect();
          if (rect.width > 0 && rect.height > 0 && window.getComputedStyle(el).visibility !== 'hidden') {
            const ref = idCounter++;
            el.setAttribute('data-ai-ref', ref.toString());
            elements.push({
              ref,
              tagName: el.tagName.toLowerCase(),
              role: el.getAttribute('role') || el.tagName.toLowerCase(),
              name: el.innerText || el.getAttribute('aria-label') || el.getAttribute('placeholder') || '',
              value: el.value || '',
              selector: \`[data-ai-ref="\${ref}"]\`,
              bounds: { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2, width: rect.width, height: rect.height }
            });
          }
        });
        return elements;
      })()
    `);

    return { title, url, elements };
  }

  public async executeAction(action: AgentAction): Promise<boolean> {
    if (!this.webContents.debugger.isAttached()) {
      this.webContents.debugger.attach('1.3');
    }

    try {
      if (action.type === 'navigate') {
        await this.webContents.loadURL(action.url);
        return true;
      }

      if (action.type === 'click') {
        const coords = await this.webContents.executeJavaScript(`
          (() => {
            const el = document.querySelector('[data-ai-ref="${action.ref}"]');
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return { x: rect.left + rect.width / 2, y: rect.top + rect.height / 2 };
          })()
        `);

        if (!coords) return false;

        await this.webContents.debugger.sendCommand('Input.dispatchMouseEvent', {
          type: 'mousePressed',
          x: coords.x,
          y: coords.y,
          button: 'left',
          clickCount: 1,
        });
        await this.webContents.debugger.sendCommand('Input.dispatchMouseEvent', {
          type: 'mouseReleased',
          x: coords.x,
          y: coords.y,
          button: 'left',
          clickCount: 1,
        });
        return true;
      }

      if (action.type === 'type') {
        await this.webContents.executeJavaScript(`
          (() => {
            const el = document.querySelector('[data-ai-ref="${action.ref}"]');
            if (el) el.focus();
          })()
        `);

        await this.webContents.debugger.sendCommand('Input.insertText', {
          text: action.text,
        });
        return true;
      }

      return false;
    } finally {
      // Detach debugger when completed
    }
  }
}
```

### Agentic Loop (`src/main/agent-loop.ts`)
```typescript
import { CDPController } from './cdp-controller';
import { AgentAction } from '../shared/types';

export class AgentLoop {
  private cdpController: CDPController;
  private apiKey: string;

  constructor(cdpController: CDPController, apiKey: string) {
    this.cdpController = cdpController;
    this.apiKey = apiKey;
  }

  public async runTask(userGoal: string, onStep?: (msg: string) => void): Promise<string> {
    let steps = 0;
    const maxSteps = 15;

    while (steps < maxSteps) {
      steps++;
      const perception = await this.cdpController.capturePerception();

      if (onStep) {
        onStep(`Step ${steps}: Analyzing ${perception.title} (${perception.url})...`);
      }

      const prompt = `
You are an AI Browser Companion. Your goal is: "${userGoal}"

CURRENT PAGE:
Title: ${perception.title}
URL: ${perception.url}

INTERACTIVE ELEMENTS:
${perception.elements.map(e => `[ref=${e.ref}] <${e.tagName}> "${e.name.trim()}" (value: "${e.value}")`).join('\n')}

Respond ONLY with a JSON object in this format:
{
  "thought": "Reasoning for the next step",
  "action": { "type": "click", "ref": 12 } // or type, navigate, finish
}
`;

      const responseText = await this.callLLM(prompt);
      const decision = JSON.parse(responseText);

      if (onStep) {
        onStep(`Thought: ${decision.thought}`);
      }

      if (decision.action.type === 'finish') {
        return decision.action.summary || 'Task complete.';
      }

      await this.cdpController.executeAction(decision.action as AgentAction);
      await new Promise(res => setTimeout(res, 2000));
    }

    return 'Reached max steps.';
  }

  private async callLLM(prompt: string): Promise<string> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-4o',
        messages: [{ role: 'user', content: prompt }],
        response_format: { type: 'json_object' },
      }),
    });

    const data = await response.json();
    return data.choices[0].message.content;
  }
}
```

---

## 5. Master Roadmap to Build Your Custom AI Browser

1. **Build Electron Shell & Dual Viewports:** Set up main process window with browser tabs on right and AI companion panel on left.
2. **Implement CDP Controller & DOM Serialization:** Extract `[ref=N]` tags from active tabs and route mouse/keyboard input via Chrome DevTools Protocol.
3. **Integrate Agent Perception-Action Loop:** Connect LLM provider (OpenAI / Claude / Ollama) with context memory and tool calling.
4. **Build Portable Skills & Routine Runner:** Adopt SKILL.md format and set up background event listeners (email/webhooks) for automated Berry Bots.
5. **Add Local Audio Capture & Vector Storage:** Record desktop loopback audio for botless meeting notes and store memories inside local SQLite vector database.
