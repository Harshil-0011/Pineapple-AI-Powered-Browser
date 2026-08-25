# Pineapple AI Browser 🍍

> Lightweight, AI-native desktop web browser built with Electron, React, TypeScript, and Vite.
> Powered by an embedded Chromium engine with a quiet spatial workspace and AI companion.

---

## 🌟 Key Features

- **Embedded Chromium Core**: Spawns real native Chromium `BrowserView` viewports for fast, standard web rendering.
- **Quiet Spatial Desktop Hierarchy**:
  - **Control Rail (52px)**: Spatial navigation anchor for Workspaces, AI Companion, Bookmarks, History, Downloads, and Settings.
  - **Resizable Context Sidebar**: Draggable width adjustment (220px to 400px) with workspace tab management and sleeping tab badges.
  - **Floating Capsule Omnibox**: Live categorized suggestions dropdown (Open Tabs, History, Bookmarks, AI Prompts), HTTPS security indicator, and bookmark trigger.
- **Expressive New Tab Canvas**: Space Grotesk greeting, glowing capsule search/AI prompt, quick site shortcuts (Google, GitHub, Docs, Hacker News), and recent workspace activity cards.
- **Pineapple AI Companion**:
  - **Chat**: Conversation assistant with context awareness.
  - **DOM / AX Tree**: JetBrains Mono monospace DOM inspector with element references (`data-pineapple-ref`).
  - **Skills**: One-click browser automation actions (Summarize page, Research market, Compare products, Form auto-fill).
  - **Context**: Live page metadata, permitted permissions, and local workspace memory.
- **Command Palette (`Cmd+K` / `Ctrl+K`)**: Glass Level 3 overlay with keyboard arrow navigation across open tabs, bookmarks, and AI execution commands.
- **Artifact Viewer Drawer**: Floating drawer for AI research reports, comparison tables, and CSV exports.
- **Automated Tab Memory Saver**: Inactive background tabs enter sleep state automatically to optimize RAM usage.

---

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
# Clone the repository
git clone https://github.com/user/pineapple-ai-browser.git
cd pineapple-ai-browser

# Install dependencies
npm install
```

### Development & Build Commands

```bash
# Run type checking and compilation check
npm run compile

# Build production bundle
npm run build

# Start Electron application
npm start
```

---

## 🎨 Design System

Pineapple AI Browser follows a **Handcrafted Matte Desktop Workspace** design system:

- **Canvas**: Pure Matte Charcoal Slate (`#090B0F` / `#141822`)
- **Accent**: Soft Muted Amber (`#D97706`) & Emerald Green (`#10B981`)
- **Typography**: Inter (Primary UI), Space Grotesk (Headings), JetBrains Mono (Developer/Code)
- **Controls**: Flat Matte Capsules & Subtle Glass

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| `Cmd+K` / `Ctrl+K` | Toggle Command Palette |
| `Enter` | Submit Omnibox search / AI prompt |
| `Esc` | Close Command Palette or Omnibox suggestions |
