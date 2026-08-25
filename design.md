# Pineapple AI Browser — UI/UX Design System Specification (`design.md`)

> **Status:** Authoritative visual and interaction source of truth
> **Product:** Pineapple AI Browser
> **Design language:** Quiet Spatial Desktop Workspace + Spatial Glass + Capsule Controls
> **Primary principle:** Browser chrome surrounds the web; it must never compete with it.

---

## 1. Visual Philosophy — The Quiet Spatial Browser

Pineapple is a **desktop browser first**, not a generic SaaS dashboard.

The interface combines:

- **Quiet desktop surfaces** — deep obsidian chrome (`#050709` to `#0B0D10`) that recedes behind content.
- **Spatial hierarchy** — Control Rail → Context Sidebar → Browser Chrome → Web Page.
- **Intentional glassmorphism** — spatial glass communicates depth, layers, and floating overlays.
- **Capsule controls** — capsules communicate actions, search, filters, selections, and status pills.
- **Compact browser chrome** — dense enough for real power browsing without visual noise.
- **Soft atmospheric depth** — hair-line borders, subtle translucency, backdrop blur, and restrained cyan glow halos.
- **Cyan & lavender accents** — primary technology cue: Electric Cyan (`#06B6D4`) with soft lavender (`#A78BFA`) highlights without neon overload.
- **Purposeful motion** — physics-based micro-interactions explain spatial change.
- **Web-first focus** — the active webpage is always the strongest visual surface.

### Core Hierarchy

```text
                    WEB CONTENT
                 ─────────────────
                       focus

              BROWSER CHROME
         tabs · navigation · omnibox

              CONTEXT LAYER
      workspaces · AI · bookmarks · history

               CONTROL RAIL
          persistent spatial anchor
```

---

## 2. Core Design Laws

### 2.1 Glass is depth, not decoration

Use glass when a surface floats above another layer:
- floating browser chrome
- omnibox & suggestions
- command palette
- context popovers & menus
- AI companion drawer
- new-tab search overlays

Do **not** make every component glass.

### 2.2 Capsules represent interaction

Use capsules (`border-radius: 999px`) for:
- omnibox
- search inputs
- action buttons
- workspace filters
- status chips
- quick automation skills

Structural containers use restrained radii (8px–16px). **Never make every card a pill.**

### 2.3 Content outranks chrome

The webpage must remain visually dominant. Browser chrome occupies minimal vertical height (36–44px) and uses quiet contrast (`--browser-surface`).

### 2.4 Perceived speed is a feature

Typing, tab switching, navigation, scrolling, resizing, and workspace switching must feel instant.

---

## 3. Design System Tokens

```css
:root {
  /* Deep Obsidian Canvas */
  --browser-canvas-deep: #050709;
  --browser-canvas: #0A0D12;
  --browser-surface: #111418;
  --browser-surface-secondary: #15191E;
  --browser-surface-elevated: #1B2026;
  --browser-surface-active: #222830;
  --browser-surface-hover: rgba(255, 255, 255, 0.045);
  --browser-surface-selected: rgba(6, 182, 212, 0.12);

  /* Typography Colors */
  --browser-text-primary: #F2F4F7;
  --browser-text-secondary: #A5ACB8;
  --browser-text-muted: #707783;
  --browser-text-disabled: #555C66;

  /* Accents — Electric Cyan (#06B6D4) & Lavender (#A78BFA) */
  --browser-accent: #06B6D4;
  --browser-accent-cyan: #06B6D4;
  --browser-accent-purple: #A78BFA;
  --browser-success: #55C98A;
  --browser-warning: #E7B75A;
  --browser-danger: #F06A6A;
  --browser-info: #06B6D4;

  /* Restrained Hairline Borders */
  --browser-border-subtle: rgba(255, 255, 255, 0.06);
  --browser-border: rgba(255, 255, 255, 0.09);
  --browser-border-strong: rgba(255, 255, 255, 0.14);
  --browser-accent-border: rgba(6, 182, 212, 0.32);
  --browser-cyan-border: rgba(6, 182, 212, 0.28);
  --browser-purple-border: rgba(167, 139, 250, 0.24);

  /* Glassmorphism Levels */
  --glass-subtle: rgba(17, 20, 24, 0.58);
  --glass-elevated: rgba(21, 25, 30, 0.68);
  --glass-strong: rgba(27, 32, 38, 0.76);
  --glass-overlay: rgba(5, 7, 9, 0.82);

  --glass-blur-subtle: 12px;
  --glass-blur-elevated: 20px;
  --glass-blur-strong: 28px;
  --glass-blur-overlay: 36px;

  /* Radii */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 12px;
  --radius-2xl: 16px;
  --radius-capsule: 999px;

  /* Typography */
  --font-ui: "Inter", system-ui, -apple-system, sans-serif;
  --font-display: "Space Grotesk", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", Consolas, monospace;

  /* Motion Curves */
  --ease-standard: cubic-bezier(0.16, 1, 0.3, 1);
  --motion-micro: 120ms var(--ease-standard);
  --motion-standard: 200ms var(--ease-standard);
  --motion-panel: 260ms var(--ease-standard);

  /* Z-Index Hierarchy */
  --z-content: 0;
  --z-chrome: 100;
  --z-sidebar: 200;
  --z-floating: 300;
  --z-popover: 500;
  --z-overlay: 600;
  --z-modal: 700;
}
```

---

## 4. Light Theme Override

```css
[data-theme="light"] {
  --browser-canvas-deep: #EDEFF2;
  --browser-canvas: #F4F5F7;
  --browser-surface: #FFFFFF;
  --browser-surface-secondary: #F8F9FA;
  --browser-surface-elevated: #FFFFFF;
  --browser-surface-active: #EEF2F7;
  --browser-text-primary: #171A1F;
  --browser-text-secondary: #59616D;
  --browser-text-muted: #7D8590;
  --browser-accent: #0891B2;
  --browser-accent-cyan: #0891B2;
  --browser-border: rgba(15, 23, 42, 0.09);
  --browser-border-strong: rgba(15, 23, 42, 0.14);
  --glass-subtle: rgba(255, 255, 255, 0.68);
  --glass-elevated: rgba(255, 255, 255, 0.78);
  --glass-strong: rgba(255, 255, 255, 0.86);
}
```

---

## 5. Glassmorphism Architecture

- **Level 1 (Subtle):** Toolbars, sidebars, inactive rails (`blur(12px)`).
- **Level 2 (Elevated):** Floating controls, dropdown menus, AI drawers (`blur(20px)`).
- **Level 3 (Strong):** Command palette (`Cmd+K`), artifact modal drawers (`blur(28px)`).
- **Level 4 (Overlay):** Backdrop dimming overlays (`blur(36px)`).

---

## 6. Component System Architecture

```text
src/renderer/components/
├── shell/
│   ├── BrowserShell
│   ├── ControlRail (52px spatial rail)
│   ├── ContextSidebar (220-400px resizable)
│   ├── MainShell
│   └── BrowserViewport
├── chrome/
│   ├── TabBar & Tab
│   ├── BrowserToolbar
│   ├── Omnibox (Interactive suggestion dropdown)
│   └── BookmarksBar
├── workspace/
│   └── WorkspaceSwitcher
├── ai/
│   ├── AIPanel (4 sub-tabs: Chat, DOM, Skills, Context)
│   ├── AIChat
│   ├── AXInspector (JetBrains Mono formatting)
│   ├── Skills
│   └── AIContext
├── command/
│   ├── CommandPalette (Keyboard arrow nav)
│   ├── ArtifactViewer (Floating drawer)
│   └── NewTabPage (Space Grotesk greeting & Search capsule)
└── browser-features/
    ├── Bookmarks
    ├── History
    ├── Downloads
    └── Settings
```

---

## 7. Spatial Shell Geometry & Viewport Integration

```text
┌──────────────────────────────────────────────────────────────────────┐
│ RAIL  │ CONTEXT SIDEBAR          │           WEB CONTENT             │
│ 52px  │ 280px default (resizable)│                                  │
│       │                          │           BrowserView             │
└───────┴───────────────────────────┴──────────────────────────────────┘
```

Native BrowserView coordinates track renderer layout geometry dynamically via IPC (`viewport:updateBounds`). When viewing `about:blank`, settings, or history pages, native views recede and render custom React views without coordinate conflicts.

---

## 8. Anti-AI-Slop Directives

1. **No generic white SaaS cards with massive fuzzy blur.**
2. **No arbitrary purple gradients.**
3. **No hardcoded viewport bounds (`x: 332, y: 104`).**
4. **No heavy global blur animations.**
5. **No layout jank on resizing or tab switches.**

---

## 9. Verification Gate

- [x] Obsidian deep canvas (`#050709`) with Electric Cyan accents (`#06B6D4`).
- [x] ControlRail (52px width) with cyan active halo indicator.
- [x] ContextSidebar resizable (220px to 400px) with draggable handle.
- [x] Omnibox capsule search with live suggestion dropdown.
- [x] Expressive New Tab Page with time-based greeting, quick site chips, and recent context.
- [x] AI Companion with 4 sub-tabs (`Chat`, `DOM / AX Tree`, `Skills`, `Context`).
- [x] Command Palette with keyboard arrow navigation (`Cmd+K`).
- [x] Type check and production build (`npm run compile && npm run build`) passing clean.
