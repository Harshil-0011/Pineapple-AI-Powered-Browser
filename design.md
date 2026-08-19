# Pineapple AI Browser — UI/UX Design System Specification (`design.md`)

This document provides the complete, authoritative UI/UX design system, spatial layout specifications, color tokens, component guidelines, and visual hierarchy required to recreate the **Pineapple AI Browser** interface.

---

## 1. Visual Philosophy: The Quiet Desktop Workspace

Pineapple is designed around the concept of a **Quiet Desktop Workspace**. Traditional web browsers surround content with dense toolbars, heavy borders, and saturated accent colors. Pineapple reverses this paradigm:

- **Obsidian Canvas Surface**: Chrome controls recede into deep obsidian surfaces (`#080A0D` / `#0B0D10`), allowing web pages and active tasks to be the focal point.
- **Spatial Anchors**: Navigation is anchored by a persistent 52px **Control Rail** on the left edge, providing instant switching without visual clutter.
- **Contextual Drawers**: Secondary tools (AI Assistant, Workspaces, Bookmarks, History, Downloads, Settings) live in a resizable, fluid 280px **Context Sidebar**.
- **Soft Spatial Depth**: Elevation is defined by subtle borders (`rgba(255, 255, 255, 0.08)`) and muted backdrop blurs (`backdrop-filter: blur(12px)`) rather than harsh shadows.
- **Cyan & Lavender Accents**: Soft cyan (`#8AB4FF` / `#06B6D4`) and subtle lavender (`#A78BFA`) highlight active states, status indicators, and AI perception highlights.

---

## 2. Design Tokens & Color Palette

### 2.1 Surfaces & Depths

```css
:root {
  /* Surfaces */
  --browser-canvas-deep: #080A0D;      /* Main window background behind viewports */
  --browser-canvas: #0B0D10;           /* Content view container background */
  --browser-surface: #111418;          /* Control rail & sidebar background */
  --browser-surface-secondary: #15191E;/* Cards, popovers, dropdowns */
  --browser-surface-elevated: #1B2026; /* Hover states, active items */
  --browser-surface-active: #222830;   /* Selected tab / rail active item */

  /* Text & Icons */
  --browser-text-primary: #F2F4F7;     /* High-contrast headings and active labels */
  --browser-text-secondary: #A5ACB8;   /* Body text, inactive tabs, field labels */
  --browser-text-muted: #707783;       /* Placeholders, disabled icons, metadata */

  /* Accents */
  --browser-accent: #8AB4FF;           /* Primary focus rings, active tab indicators */
  --browser-accent-cyan: #06B6D4;      /* AI Companion highlight & status badges */
  --browser-accent-purple: #A78BFA;    /* Skill playbooks & prompt triggers */
  --browser-success: #55C98A;          /* HTTPS lock, complete downloads */
  --browser-warning: #E7B75A;          /* Warning states, active timers */
  --browser-danger: #F06A6A;           /* Close buttons hover, delete actions */

  /* Borders */
  --browser-border-subtle: rgba(255, 255, 255, 0.06);
  --browser-border: rgba(255, 255, 255, 0.09);
  --browser-border-strong: rgba(255, 255, 255, 0.14);

  /* Border Radii */
  --radius-sm: 4px;
  --radius-md: 6px;
  --radius-lg: 8px;
  --radius-xl: 12px;
  --radius-floating: 14px;

  /* Typography */
  --font-ui: "Inter", system-ui, -apple-system, sans-serif;
  --font-display: "Space Grotesk", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;
}
```

---

## 3. Spatial Layout Architecture

The application layout is structured in three concentric spatial layers:

```
+-----------------------------------------------------------------------------------+
| LAYER 1:    | LAYER 2:            | LAYER 3: CONTENT CANVAS (Flex-1)              |
| ControlRail | Context Sidebar     | +-------------------------------------------+ |
| (52px)      | (280px)             | | TabBar (Horizontal / Vertical toggle)     | |
|             |                     | +-------------------------------------------+ |
| [Workspaces]| [Active Drawer:     | | AddressBar / Omnibox                      | |
| [AI Assistant]| Workspaces / Tabs  | +-------------------------------------------+ |
| [Bookmarks] | AI Companion / AX  | | BookmarksBar                              | |
| [History]   | Bookmarks / History| +-------------------------------------------+ |
| [Downloads] | Downloads Drawer   | | Active BrowserView Canvas / Page Content | |
| [Settings]  | Settings Panel]    | | (Electron BrowserView Bounds: x:332, y:104)| |
|             |                     | +-------------------------------------------+ |
+-----------------------------------------------------------------------------------+
```

### 3.1 Layer 1: Control Rail (`ControlRail.tsx`)
- **Width**: 52px fixed.
- **Position**: Left edge, full vertical height.
- **Background**: `--browser-surface` (`#111418`) with a subtle right border (`--browser-border-subtle`).
- **Items**:
  1. Top Branding Icon (`Compass` / Pineapple logo).
  2. Workspace/Tabs button (`Layers`).
  3. AI Companion trigger (`Bot` / `Sparkles`).
  4. Bookmarks button (`Bookmark`).
  5. History button (`Clock`).
  6. Downloads button (`Download`).
  7. Bottom Spacer / New Tab (`Plus`).
  8. Settings trigger (`Settings`).

### 3.2 Layer 2: Context Sidebar (`Sidebar.tsx`)
- **Width**: 280px (resizable up to 400px).
- **Background**: `--browser-surface` (`#111418`).
- **Dynamic Views**:
  - **Workspaces & Tabs**: Switch between Personal, Work, and Research workspaces; list open tabs with close buttons and sleeping status indicators.
  - **AI Companion**:
    - **Chat Tab**: Multimodal prompt input, reasoning stream, step execution history.
    - **DOM Inspector Tab**: Chromium Accessibility Tree (`AXTree`) interactive element perception viewer (`data-pineapple-ref` tags).
    - **Skills Tab**: One-click automation playbook triggers (`SKILL.md`).
  - **Bookmarks & History**: Searchable lists with quick action links and clear controls.
  - **Downloads & Settings**: Quick status drawers and theme/privacy toggles.

### 3.3 Layer 3: Content Canvas Chrome & Viewport
- **Top Chrome Bar**:
  - **TabBar (`TabBar.tsx`)**: Compact tab strip with active highlight pill, favicon, title, closing button, new tab (`+`), and vertical layout toggle.
  - **AddressBar / Omnibox (`AddressBar.tsx`)**: Security lock indicator (`Shield` / `Lock`), back/forward/reload controls, unified search & URL field, bookmark toggle, history toggle, and downloads popup trigger.
  - **BookmarksBar (`BookmarksBar.tsx`)**: Quick access bookmark pills (`Google Search`, `GitHub Dashboard`, `Hacker News`).
- **Web Viewport Target**:
  - Bounds in main window: `x: 332px`, `y: 104px`, `width: max(100, window.width - 332)`, `height: max(100, window.height - 104)`.
  - Integrated directly with Electron `BrowserView` instance.

---

## 4. Key UI Overlay Components

### 4.1 Command Palette (`CommandPalette.tsx`)
- Triggered globally via `Cmd+K` or `Ctrl+K`.
- Floating centered modal overlay (`--z-modal: 700`) with backdrop blur (`backdrop-filter: blur(16px)`).
- Instant multi-category fuzzy search across:
  - **Open Tabs** (Switch focus).
  - **Bookmarks & History** (Instant navigation).
  - **AI Companion Prompts** (Send directly to AI loop).
  - **Browser Actions** (Open Downloads, Toggle Vertical Tabs, Clear History).

### 4.2 Artifact Viewer (`ArtifactViewer.tsx`)
- Side drawer overlay for viewing structured outputs generated by AI agent playbooks (e.g., Market Research matrices, CSV exports, summarized reading notes).

---

## 5. Interaction & Motion Rules

1. **Subtle Micro-Interactions**: Hover transitions use `--motion-micro: 120ms cubic-bezier(0.16, 1, 0.3, 1)`.
2. **Smooth Drawer Transitions**: Sidebar panel switches animate opacity and slide (`180ms ease-out`).
3. **Active Focus States**: All text inputs and address bar fields display a soft cyan outer ring (`box-shadow: 0 0 0 2px rgba(138, 180, 255, 0.2)`).
4. **Offline / Network Safe**: All UI CSS is bundled locally via Tailwind CSS v4 (`@tailwindcss/vite`) to ensure zero dependency on external CDN resources.

---

## 6. How to Recreate This UI

1. Install dependencies: `npm install react react-dom lucide-react @tailwindcss/vite tailwindcss`.
2. Configure `vite.config.ts` to include `tailwindcss()` plugin.
3. Define `@import "tailwindcss";` and root surface CSS variables in `src/renderer/styles.css`.
4. Assemble component hierarchy in `src/renderer/App.tsx`:
   - Render `<ControlRail />`.
   - Render `<Sidebar />` passing active rail tab context.
   - Render Top Chrome (`<TabBar />`, `<AddressBar />`, `<BookmarksBar />`).
   - Position viewport canvas area for `BrowserView` attachment.
   - Attach `<CommandPalette />` global listener (`Cmd+K`).
