# Pineapple AI Browser — UI/UX Design System Specification (`design.md`)

> **Status:** Authoritative visual and interaction source of truth
> **Product:** Pineapple AI Browser
> **Design language:** Quiet Desktop Workspace + Spatial Glass + Capsule Controls
> **Primary principle:** Browser chrome surrounds the web; it must never compete with it.

---

## 1. Visual Philosophy — The Quiet Spatial Browser

Pineapple is a **desktop browser first**, not a SaaS dashboard.

The interface combines:

- **Quiet desktop surfaces** — deep obsidian chrome that recedes behind content.
- **Spatial hierarchy** — control rail → context → browser chrome → webpage.
- **Intentional glassmorphism** — glass communicates depth and floating layers.
- **Capsule controls** — capsules communicate actions, search, selections, and states.
- **Compact browser chrome** — dense enough for real browsing without visual noise.
- **Soft atmospheric depth** — borders, translucency, blur, and restrained shadows.
- **Cyan/lavender accents** — technology and AI cues without neon overload.
- **Purposeful motion** — motion explains state and spatial change.
- **Web-first focus** — the active webpage is always the strongest visual surface.

### Core hierarchy

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

The browser should become visually quieter as it approaches the webpage.

---

## 2. Core Design Laws

### 2.1 Glass is depth, not decoration

Use glass when a surface needs to appear above another surface:

- floating browser chrome
- omnibox
- command palette
- popovers
- menus
- AI panel
- temporary drawers
- new-tab overlays

Do **not** make every component glass.

### 2.2 Capsules represent interaction

Use capsules for:

- omnibox
- search
- buttons
- filters
- workspace selectors
- compact tabs
- status pills
- quick actions

Structural containers use restrained radii.

**Never make everything a pill.**

### 2.3 Content outranks chrome

The webpage must remain visually dominant.

Browser chrome should:

- occupy minimal space
- use restrained contrast
- avoid oversized typography
- avoid excessive decoration
- recede further in immersive/fullscreen modes

### 2.4 Motion must communicate

Every animation should explain:

- what changed
- what is active
- where something came from
- what is opening/closing
- what has focus

Remove animation that communicates nothing.

### 2.5 Perceived speed is a feature

Typing, tab switching, navigation, scrolling, resizing, and workspace switching must remain immediate.

---

## 3. Design Tokens

Use semantic tokens everywhere. Components must not invent arbitrary values.

```css
:root {
  /* Surfaces */
  --browser-canvas-deep: #080A0D;
  --browser-canvas: #0B0D10;
  --browser-surface: #111418;
  --browser-surface-secondary: #15191E;
  --browser-surface-elevated: #1B2026;
  --browser-surface-active: #222830;
  --browser-surface-hover: rgba(255,255,255,0.045);
  --browser-surface-selected: rgba(138,180,255,0.10);

  /* Text */
  --browser-text-primary: #F2F4F7;
  --browser-text-secondary: #A5ACB8;
  --browser-text-muted: #707783;
  --browser-text-disabled: #555C66;

  /* Accents */
  --browser-accent: #8AB4FF;
  --browser-accent-cyan: #06B6D4;
  --browser-accent-purple: #A78BFA;
  --browser-success: #55C98A;
  --browser-warning: #E7B75A;
  --browser-danger: #F06A6A;
  --browser-info: #6FA8FF;

  /* Borders */
  --browser-border-subtle: rgba(255,255,255,0.06);
  --browser-border: rgba(255,255,255,0.09);
  --browser-border-strong: rgba(255,255,255,0.14);
  --browser-accent-border: rgba(138,180,255,0.28);
  --browser-cyan-border: rgba(6,182,212,0.24);
  --browser-purple-border: rgba(167,139,250,0.24);

  /* Glass */
  --glass-subtle: rgba(17,20,24,0.58);
  --glass-elevated: rgba(21,25,30,0.68);
  --glass-strong: rgba(27,32,38,0.76);
  --glass-overlay: rgba(8,10,13,0.82);

  --glass-blur-subtle: 12px;
  --glass-blur-elevated: 20px;
  --glass-blur-strong: 28px;
  --glass-blur-overlay: 36px;

  /* Radius */
  --radius-xs: 4px;
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 10px;
  --radius-xl: 12px;
  --radius-2xl: 14px;
  --radius-floating: 16px;
  --radius-capsule: 999px;

  /* 4px spacing grid */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;

  /* Shadows */
  --shadow-sm: 0 2px 12px rgba(0,0,0,0.16);
  --shadow-md: 0 8px 28px rgba(0,0,0,0.22);
  --shadow-lg: 0 18px 50px rgba(0,0,0,0.30);

  /* Typography */
  --font-ui: "Inter", system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
  --font-display: "Space Grotesk", system-ui, -apple-system, sans-serif;
  --font-mono: "JetBrains Mono", "SFMono-Regular", Consolas, monospace;

  /* Motion */
  --ease-standard: cubic-bezier(0.16,1,0.3,1);
  --ease-smooth: cubic-bezier(0.4,0,0.2,1);
  --ease-exit: cubic-bezier(0.4,0,1,1);
  --motion-micro: 120ms var(--ease-standard);
  --motion-standard: 200ms var(--ease-standard);
  --motion-panel: 260ms var(--ease-standard);
  --motion-navigation: 320ms var(--ease-standard);
  --motion-expressive: 600ms var(--ease-standard);

  /* Z-index */
  --z-content: 0;
  --z-chrome: 100;
  --z-sidebar: 200;
  --z-floating: 300;
  --z-popover: 500;
  --z-overlay: 600;
  --z-modal: 700;
  --z-toast: 9000;
}
```

---

## 4. Light Theme

The light theme must retain the same spatial, glass, and capsule language.

```css
[data-theme="light"] {
  --browser-canvas-deep: #EDEFF2;
  --browser-canvas: #F4F5F7;
  --browser-surface: #FFFFFF;
  --browser-surface-secondary: #F8F9FA;
  --browser-surface-elevated: #FFFFFF;
  --browser-surface-active: #EEF2F7;

  --browser-surface-hover: rgba(15,23,42,0.035);
  --browser-surface-selected: rgba(50,103,214,0.09);

  --browser-text-primary: #171A1F;
  --browser-text-secondary: #59616D;
  --browser-text-muted: #7D8590;
  --browser-text-disabled: #A4AAB2;

  --browser-accent: #3267D6;
  --browser-accent-cyan: #0891B2;
  --browser-accent-purple: #7254C7;

  --browser-success: #258A58;
  --browser-warning: #A36E08;
  --browser-danger: #C83F47;
  --browser-info: #3267D6;

  --browser-border-subtle: rgba(15,23,42,0.055);
  --browser-border: rgba(15,23,42,0.09);
  --browser-border-strong: rgba(15,23,42,0.14);

  --glass-subtle: rgba(255,255,255,0.68);
  --glass-elevated: rgba(255,255,255,0.78);
  --glass-strong: rgba(255,255,255,0.86);
  --glass-overlay: rgba(244,245,247,0.90);
}
```

---

## 5. Glassmorphism Architecture

Glass communicates **layering**.

### Level 1 — Subtle

Use for toolbar and sidebar surfaces.

```css
background: var(--glass-subtle);
backdrop-filter: blur(12px) saturate(125%);
-webkit-backdrop-filter: blur(12px) saturate(125%);
border: 1px solid var(--browser-border-subtle);
```

### Level 2 — Elevated

Use for floating controls, popovers, dropdowns, and AI panels.

```css
background: var(--glass-elevated);
backdrop-filter: blur(20px) saturate(135%);
-webkit-backdrop-filter: blur(20px) saturate(135%);
border: 1px solid var(--browser-border);
box-shadow: var(--shadow-md);
```

### Level 3 — Strong

Use for command palettes and major floating surfaces.

```css
background: var(--glass-strong);
backdrop-filter: blur(28px) saturate(145%);
-webkit-backdrop-filter: blur(28px) saturate(145%);
border: 1px solid var(--browser-border-strong);
box-shadow: var(--shadow-lg);
```

### Level 4 — Overlay

Use only for modal/immersive overlays.

```css
background: var(--glass-overlay);
backdrop-filter: blur(36px) saturate(145%);
-webkit-backdrop-filter: blur(36px) saturate(145%);
```

### Glass restrictions

Never:

- blur the entire application
- stack heavy blur layers unnecessarily
- use glass when opaque surfaces improve readability
- animate large areas of `backdrop-filter`
- use glass only because it looks fashionable

---

## 6. Capsule System

Capsules are the second major visual primitive.

```css
.capsule {
  border-radius: var(--radius-capsule);
  background: rgba(255,255,255,0.045);
  border: 1px solid var(--browser-border);
}

.capsule:hover {
  background: rgba(255,255,255,0.075);
  border-color: var(--browser-border-strong);
}

.capsule[data-active="true"] {
  background: var(--browser-surface-selected);
  border-color: var(--browser-accent-border);
}

.capsule:focus-visible {
  outline: 2px solid var(--browser-accent);
  outline-offset: 2px;
}
```

### Sizes

```text
Compact: 28–32px high, 10–12px horizontal padding
Standard: 36–40px high, 14–18px horizontal padding
Large: 44–48px high, 18–24px horizontal padding
```

Use capsules for:

- omnibox
- buttons
- filters
- workspace selectors
- status chips
- quick actions
- compact controls

Do not use capsules for:

- entire sidebars
- large cards
- every menu
- every list row
- the whole browser window

---

## 7. Spatial Layout Architecture

```text
┌──────────────────────────────────────────────────────────────────────┐
│                            TAB / WINDOW CHROME                        │
├───────┬──────────────────────────────────────────────────────────────┤
│       │                     BROWSER TOOLBAR                          │
│ RAIL  ├──────────────────────────────────────────────────────────────┤
│ 52px  │ CONTEXT SIDEBAR          │           WEB CONTENT             │
│       │ 280px default             │                                  │
│       │ resizable                 │           Flex / Fill             │
│       │                           │                                  │
└───────┴───────────────────────────┴──────────────────────────────────┘
```

The original hard-coded viewport coordinates are replaced by **layout-owned geometry**.

Use:

```text
BrowserShell
├── ControlRail
├── ContextSidebar
└── MainShell
    ├── TabBar
    ├── BrowserToolbar
    ├── BookmarksBar
    └── BrowserViewport
```

The web viewport always fills the remaining space.

---

## 8. Control Rail — `ControlRail.tsx`

### Dimensions

```yaml
width: 52px
minimum: 44px
expanded: 72px
```

The rail is one continuous spatial surface, not a stack of cards.

### Items

1. Pineapple brand mark
2. Workspaces / Tabs
3. AI Companion
4. Bookmarks
5. History
6. Downloads
7. New Tab
8. Settings

### Active state

Use:

- subtle surface contrast
- accent indicator
- icon emphasis
- optional very soft accent halo

Do not use giant glowing circles.

---

## 9. Context Sidebar — `Sidebar.tsx`

### Dimensions

```yaml
default: 280px
minimum: 220px
maximum: 400px
```

The sidebar is resizable and contextual.

### Modes

#### Workspaces & Tabs

- Personal / Work / Research / Development workspaces
- tab groups
- open tabs
- pinned tabs
- sleeping tabs
- audio state
- close controls

#### AI Companion

Tabs:

```text
Chat
DOM / AX Tree
Skills
Context
```

#### Bookmarks

- searchable tree/list
- folders
- pinned items
- quick navigation

#### History

- grouped by time
- search
- clear controls

#### Downloads

- active downloads
- completed files
- failed downloads
- open/show-in-folder actions

#### Settings

- appearance
- privacy
- permissions
- browser behavior
- shortcuts

### Sidebar rows

```yaml
height: 32–40px
radius: 6–8px
horizontal-padding: 8–12px
```

Selected rows can use a restrained capsule-like highlight, but should not become oversized pills.

Avoid card-inside-card structures.

---

## 10. Tab Bar — `TabBar.tsx`

Tabs are a primary browser primitive.

### Anatomy

```text
┌────────────────────────────────────────┐
│ favicon  Page title             ×      │
└────────────────────────────────────────┘
```

States:

- active
- inactive
- loading
- muted
- audio playing
- pinned
- unread
- secure
- error

### Active tab

Use:

- elevated surface
- stronger text
- subtle border
- restrained accent indicator

Do not use bright gradients.

### Inactive tab

Reduce contrast and opacity enough to establish hierarchy without making titles unreadable.

The active tab should be identifiable in under one second.

---

## 11. Tab Groups

Tab groups are spatial clusters.

```text
WORK
 ├── Dashboard
 ├── Documentation
 └── Email

RESEARCH
 ├── Paper
 ├── Article
 └── Reference
```

Use:

- group label
- indentation
- subtle group accent
- shared spatial region

Avoid rainbow group headers.

---

## 12. Workspaces

Workspaces sit above tab groups.

Examples:

```text
Personal
Work
Research
Development
Projects
```

A workspace may own:

- tabs
- tab groups
- pinned tabs
- sidebar state
- AI context
- browser tools
- shortcuts

Workspace switching should feel like changing context, not navigating to another page.

Recommended transition:

```text
opacity + 8–16px horizontal translation
240–320ms
```

---

## 13. Browser Toolbar

Keep browser chrome compact.

```text
[ Back ][ Forward ][ Reload ]
[                 OMNIBOX                  ]
[ Bookmark ][ Download ][ Extensions ][ Profile ][ Menu ]
```

The omnibox receives the strongest visual emphasis within the toolbar.

Low-priority controls must collapse or move into the browser menu rather than crowd the omnibox.

---

## 14. Omnibox — `AddressBar.tsx`

The omnibox is the browser's primary interaction surface.

```text
┌─────────────────────────────────────────────────────────────┐
│  ◉  Search the web or enter address                     ☆  │
└─────────────────────────────────────────────────────────────┘
```

### Dimensions

```yaml
height: 40–44px
radius: 999px
```

### Resting

Quiet capsule/glass surface.

### Hover

Slight increase in surface contrast.

### Focus

- stronger border
- subtle accent ring
- suggestion surface appears
- no layout jump

### Loading

Use a compact progress treatment instead of moving the entire omnibox.

---

## 15. Omnibox Suggestions

Group results by intent:

```text
OPEN TABS
HISTORY
BOOKMARKS
SEARCH
COMMANDS
WORKSPACES
AI
```

The active suggestion receives:

- surface highlight
- accent marker
- keyboard selection state

Keep suggestion rows compact.

---

## 16. Bookmarks Bar

The bookmarks bar is optional and compact.

Example:

```text
[ GitHub ] [ Docs ] [ Hacker News ] [ Research ]
```

Use favicon + short title.

Do not turn the bookmarks bar into a second navigation system.

---

## 17. Web Content Canvas

The webpage is the strongest visual surface.

Rules:

- maximize usable page area
- preserve page contrast
- avoid unnecessary overlays
- keep browser controls quiet
- support immersive/fullscreen mode
- allow chrome to visually recede

The viewport must fill all remaining space.

Never use fixed values such as:

```text
x: 332px
y: 104px
```

---

## 18. New Tab Experience

The new-tab page can be more expressive than normal browser chrome.

```text
                    Good afternoon

              [ Search the web or ask Pineapple ]

              [ GitHub ] [ Docs ] [ Mail ]

              Continue where you left off

       ┌─────────────────────────────────────────┐
       │ Recent pages / workspace activity       │
       └─────────────────────────────────────────┘
```

Backgrounds may use:

- subtle atmospheric lighting
- procedural gradients
- restrained imagery
- low-frequency particles
- slow ambient movement

The background must never compete with search.

---

## 19. AI Companion

AI is contextual, not the visual center of the browser.

It may understand permitted context from:

- active page
- selected text
- current tab
- tab group
- workspace
- browser metadata

### AI panel

```text
┌─────────────────────────────┐
│ Pineapple AI          •     │
├─────────────────────────────┤
│ Context                     │
│ Current page                │
│                             │
│ Conversation                │
│                             │
│                             │
├─────────────────────────────┤
│ [ Ask about this page... ]  │
└─────────────────────────────┘
```

Use Glass Level 2/3.

The AI panel should feel like a companion layer, not a second application.

---

## 20. AI DOM / AX Inspector

This is a developer-oriented surface.

Use:

- JetBrains Mono
- compact rows
- hierarchy indentation
- monospace references
- restrained cyan accents

Example:

```text
document
 └─ main
    ├─ navigation
    ├─ heading       data-pineapple-ref="e12"
    ├─ textbox       data-pineapple-ref="e18"
    └─ button        data-pineapple-ref="e21"
```

Avoid turning it into a generic developer dashboard.

---

## 21. Skills / Automation

Skills are quick actions.

```text
AUTOMATION

[ Summarize page ]
[ Extract table ]
[ Compare products ]
[ Research topic ]
[ Fill form ]
```

Primary skill actions use capsules.

Configuration/details use normal-radius surfaces.

---

## 22. Command Palette — `CommandPalette.tsx`

Trigger:

```text
Cmd+K / Ctrl+K
```

Use Glass Level 3.

```text
┌─────────────────────────────────────────────┐
│ Search commands, tabs, history...           │
├─────────────────────────────────────────────┤
│ OPEN TABS                                   │
│   GitHub                                    │
│   Documentation                             │
│                                             │
│ ACTIONS                                     │
│   New workspace                             │
│   Toggle sidebar                            │
│                                             │
│ AI                                          │
│   Ask Pineapple                             │
└─────────────────────────────────────────────┘
```

Rows:

```yaml
height: 36–40px
radius: 8px
```

Use subtle origin-aware scale + opacity entrance.

---

## 23. Artifact Viewer — `ArtifactViewer.tsx`

Displays structured outputs from AI workflows:

- research reports
- tables
- CSV exports
- summarized notes
- comparison matrices
- extracted web data

Use a drawer or floating panel.

The artifact itself can become more document-oriented than browser chrome while retaining the same typography and spacing system.

---

## 24. Context Menus / Popovers

Use Glass Level 2.

```yaml
radius: 10–14px
padding: 6–8px
row-height: 32–40px
```

Animate from the trigger:

```text
scale(0.98) + opacity
→
scale(1) + opacity
```

Duration:

```text
160–200ms
```

---

## 25. Buttons

### Primary

```css
background: var(--browser-accent);
color: #0B0D10;
border-radius: var(--radius-capsule);
```

No gradient by default.

### Secondary

```css
background: rgba(255,255,255,0.05);
border: 1px solid var(--browser-border);
border-radius: var(--radius-capsule);
```

### Ghost

Transparent with a clear hover/focus state.

### Icon button

```text
32×32 compact chrome
36×36 standard
40×40 comfortable
44×44 touch target
```

The visual icon may be smaller than its hit area.

---

## 26. Inputs

Use:

- capsules for search/command fields
- 8px radius for standard settings fields
- 12px radius for multiline/editor fields

Never make every field a pill.

```css
:focus-visible {
  outline: 2px solid var(--browser-accent);
  outline-offset: 2px;
}
```

---

## 27. Status Pills

Use capsule status indicators:

```text
[ SECURE ]
[ SYNCED ]
[ AI ACTIVE ]
[ DOWNLOADING ]
[ PAUSED ]
[ BETA ]
```

Color must never be the only semantic indicator.

---

## 28. Security Indicator

Security state appears inside the omnibox.

States:

```text
Secure
Warning
Insecure
Permissions
Certificate problem
```

Use semantic icons and text.

Do not use decorative green glow for ordinary HTTPS.

---

## 29. Downloads

Downloads may appear as:

- toolbar popover
- contextual sidebar
- dedicated downloads page

Compact row:

```text
[icon] filename
       82% · 4.2 MB/s
                         [×]
```

Use progress indicators rather than oversized cards.

---

## 30. History

History is optimized for scanning.

Group by:

```text
Today
Yesterday
Previous 7 days
Older
```

Use:

```text
favicon + title + domain + timestamp
```

Search is a capsule.

Avoid dense tables unless the user explicitly enters a technical/detail mode.

---

## 31. Bookmarks

Bookmarks should feel like a lightweight library.

Use:

- folders
- tree hierarchy
- search
- compact rows
- drag/drop
- pinned items

Avoid card grids by default.

---

## 32. Settings

Settings use the same design language but become more information-dense.

Recommended:

```text
Sidebar navigation
+
single focused settings pane
```

Use:

- toggles
- segmented controls
- capsules
- compact forms

Do not introduce a new visual language.

---

## 33. Typography

Primary UI:

```text
Inter
```

Display:

```text
Space Grotesk
```

Technical:

```text
JetBrains Mono
```

Inter dominates normal browser chrome.

Space Grotesk is reserved for:

- new-tab greeting
- onboarding
- major feature headings
- expressive empty states

JetBrains Mono is reserved for:

- developer tools
- AX/DOM inspector
- diagnostics
- command output
- aligned numeric data

### Scale

```yaml
micro: 11px / 16px
caption: 12px / 16px
small: 13px / 20px
body: 14px / 20px
standard: 15px / 22px
large: 16px / 24px
section: 20px / 28px
new-tab-title: clamp(32px, 5vw, 56px)
```

Use `text-wrap: balance` for headings and `text-wrap: pretty` for long copy.

Use `font-variant-numeric: tabular-nums` for aligned numeric data.

---

## 34. Spacing

All spacing follows a 4px baseline.

Preferred:

```text
4
8
12
16
20
24
32
40
48
64
```

Browser chrome favors:

```text
8 / 12 / 16
```

Expressive surfaces may use:

```text
24 / 32 / 48 / 64
```

---

## 35. Radius

Structural surfaces:

```text
4px
6px
8px
10px
12px
14px
16px
```

Capsules:

```text
999px
```

Do not use large rounded corners indiscriminately.

---

## 36. Elevation

Prefer borders + translucency before shadows.

```css
--shadow-sm: 0 2px 12px rgba(0,0,0,0.16);
--shadow-md: 0 8px 28px rgba(0,0,0,0.22);
--shadow-lg: 0 18px 50px rgba(0,0,0,0.30);
```

Hierarchy:

```text
Webpage
↓
Browser chrome
↓
Sidebar / rail
↓
Floating controls
↓
Popovers
↓
Command palette / modal
```

---

## 37. Atmospheric Backgrounds

Allowed behind browser chrome and new-tab surfaces.

```css
background:
  radial-gradient(
    circle at 65% 20%,
    rgba(80,130,255,0.12),
    transparent 34%
  ),
  radial-gradient(
    circle at 30% 70%,
    rgba(120,90,255,0.07),
    transparent 32%
  ),
  var(--browser-canvas);
```

Atmosphere must remain subordinate to readable content.

Avoid:

- giant glowing blobs
- cyberpunk neon backgrounds
- animated gradients throughout the browser
- decorative particles behind ordinary webpages

---

## 38. Motion System

### Timing

```yaml
micro: 100–140ms
interaction: 160–220ms
panel: 220–320ms
navigation: 250–400ms
expressive: 500–800ms
```

### Easing

```css
--ease-standard: cubic-bezier(0.16,1,0.3,1);
--ease-smooth: cubic-bezier(0.4,0,0.2,1);
--ease-exit: cubic-bezier(0.4,0,1,1);
```

Never use:

```css
transition: all 300ms;
```

Target properties explicitly.

---

## 39. Motion Recipes

### Rail

Use:

```text
opacity + surface contrast
```

No large movement.

### Sidebar open

```text
translateX(-8px)
opacity: 0 → 1
```

### Sidebar close

```text
translateX(-4px)
opacity: 1 → 0
```

### Tab selection

Use:

```text
background
border
opacity
small transform
```

Do not move the whole tab strip.

### Capsule hover

Optional:

```text
translateY(-1px)
```

Only when it provides useful physical feedback.

### Workspace switch

```text
opacity + 8–16px horizontal translation
```

Duration:

```text
240–320ms
```

---

## 40. Atmospheric Motion

Allowed only in:

- new tab
- onboarding
- immersive mode
- special AI states

Use extremely slow:

- gradient movement
- light shifts
- low-frequency particles

Never continuously animate the entire browser shell.

---

## 41. Responsive / Adaptive Behavior

### Wide desktop

```text
Rail + Sidebar + Full Content
```

### Medium desktop

```text
Rail + Collapsed/Overlay Sidebar + Full Content
```

### Narrow

```text
Compact Rail or contextual navigation
+
Full Content
```

Do not blindly preserve three columns at every width.

Use container queries for component adaptation.

Use viewport media queries only when the entire shell changes.

---

## 42. Container Queries

Reusable components must prefer container queries.

```css
.browser-component {
  container-type: inline-size;
}

@container (min-width: 420px) {
  .browser-component__content {
    grid-template-columns: 160px 1fr;
  }
}
```

Components must work inside:

- sidebar
- modal
- drawer
- full page
- floating panel

without duplicated designs.

---

## 43. Scrollbars

Use:

```css
scrollbar-gutter: stable;
```

for major scrolling areas.

Interactive containers may use compact 4px scrollbars.

Do not hide scrollbars where scroll-position awareness matters.

Use `.no-scrollbar` only for visual horizontal strips/carousels.

---

## 44. Accessibility

Mandatory:

- WCAG AA
- semantic HTML
- keyboard navigation
- visible focus
- screen-reader labels
- minimum 44×44px touch targets where applicable
- no hover-only interactions
- reduced motion
- reduced transparency
- adequate contrast

---

## 45. Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

Disable:

- parallax
- continuous ambient motion
- large transitions
- decorative movement

Preserve:

- focus feedback
- essential state changes
- instant/small transitions

---

## 46. Reduced Transparency

```css
@media (prefers-reduced-transparency: reduce) {
  .glass,
  .glass-elevated,
  .glass-strong,
  .glass-overlay {
    backdrop-filter: none;
    -webkit-backdrop-filter: none;
    background: var(--browser-surface-elevated);
  }
}
```

The hierarchy must remain understandable without blur.

---

## 47. Performance Rules

Browser performance is more important than decoration.

Avoid:

- global backdrop filters
- expensive continuous effects
- unbounded particles
- unnecessary WebGL
- huge canvas animations
- global `will-change`
- layout-heavy animation
- excessive shadow animation

Prefer:

```text
transform
opacity
background-color
border-color
box-shadow
```

Do not animate width/height when transform can achieve the same visual result.

---

## 48. Component Architecture

```text
browser/
├── shell/
│   ├── BrowserShell
│   ├── WindowFrame
│   ├── ControlRail
│   ├── ContextSidebar
│   ├── MainShell
│   └── BrowserViewport
│
├── chrome/
│   ├── TabBar
│   ├── Tab
│   ├── TabGroup
│   ├── BrowserToolbar
│   ├── NavigationControls
│   ├── Omnibox
│   ├── BookmarksBar
│   ├── ProfileControl
│   └── BrowserMenu
│
├── workspace/
│   ├── WorkspaceSwitcher
│   ├── Workspace
│   ├── WorkspaceList
│   ├── TabGroups
│   └── PinnedTabs
│
├── browser-features/
│   ├── Bookmarks
│   ├── History
│   ├── Downloads
│   ├── Extensions
│   └── Settings
│
├── ai/
│   ├── AIPanel
│   ├── AIContext
│   ├── AIChat
│   ├── AXInspector
│   └── Skills
│
├── command/
│   ├── CommandPalette
│   └── CommandResult
│
├── surfaces/
│   ├── GlassSurface
│   ├── Capsule
│   ├── Panel
│   ├── Popover
│   ├── Drawer
│   └── Modal
│
└── primitives/
    ├── Button
    ├── IconButton
    ├── Input
    ├── Badge
    ├── Tooltip
    ├── Divider
    └── Progress
```

Every component must define:

1. resting
2. hover
3. focus-visible
4. active/pressed
5. disabled
6. loading where applicable
7. error where applicable
8. reduced-motion behavior
9. reduced-transparency behavior where relevant

---

## 49. Electron / BrowserView Geometry

The previous design used:

```text
x: 332px
y: 104px
```

This is forbidden.

Native browser content must track the actual rendered shell.

Conceptually:

```text
BrowserShell
├── ControlRail
├── ContextSidebar
└── MainShell
    ├── TabBar
    ├── BrowserToolbar
    ├── BookmarksBar
    └── BrowserViewport
```

When:

- sidebar opens/closes
- sidebar resizes
- toolbar changes
- bookmarks bar toggles
- window resizes
- fullscreen changes

the native BrowserView/WebContentsView must update from the authoritative layout geometry.

Do not duplicate geometry constants between React/CSS and Electron.

---

## 50. Window Behavior

Pineapple should feel like a real desktop browser.

Window chrome should be:

- compact
- stable
- quiet
- visually integrated

Do not turn the entire browser into one giant rounded rectangle when the operating system already supplies a window frame.

Use native-feeling window controls appropriate to the platform.

---

## 51. Anti-AI-Slop Directive

### Forbidden

- generic SaaS dashboard layouts
- generic white cards with fuzzy shadows
- purple-to-blue AI gradients
- making every surface glass
- making every control a capsule
- excessive 24px+ radii
- giant neon glows
- meaningless decorative blobs
- repetitive 3-column layouts
- `transition-all`
- animation everywhere
- oversized browser chrome
- giant text inside navigation
- excessive shadows
- browser chrome competing with webpages
- unrelated visual languages between browser features
- card-inside-card-inside-card structures
- hard-coded viewport coordinates

### Required

- spatial hierarchy
- compact chrome
- intentional glass
- intentional capsules
- restrained borders
- subtle elevation
- clear active states
- purposeful motion
- adaptive layout
- accessibility
- reduced motion/transparency
- performance discipline
- reusable semantic tokens
- browser-native interaction patterns

---

## 52. Implementation

Install:

```bash
npm install react react-dom lucide-react @tailwindcss/vite tailwindcss
```

Configure Vite with the Tailwind plugin.

Renderer stylesheet:

```css
@import "tailwindcss";
```

Then define the Pineapple tokens from this document.

### Component assembly

```tsx
<BrowserShell>
  <ControlRail />
  <ContextSidebar />

  <MainShell>
    <TabBar />
    <BrowserToolbar />
    <BookmarksBar />
    <BrowserViewport />
  </MainShell>

  <CommandPalette />
  <ArtifactViewer />
</BrowserShell>
```

The shell owns geometry.

Feature components must not independently calculate BrowserView coordinates.

---

## 53. Final Quality Gate

### Spatial

- [ ] Rail is visually distinct but quiet.
- [ ] Sidebar is contextual.
- [ ] Browser chrome is compact.
- [ ] Web content is dominant.
- [ ] No hard-coded viewport geometry exists.

### Glass

- [ ] Glass communicates depth.
- [ ] Blur is limited to appropriate surfaces.
- [ ] Heavy blur is not continuous.
- [ ] Reduced transparency works.

### Capsules

- [ ] Capsules represent actions/states.
- [ ] Omnibox is clearly capsule-based.
- [ ] Structural containers remain normally rounded.
- [ ] Not every control is a pill.

### Browser

- [ ] Tabs are immediately understandable.
- [ ] Active tab is unmistakable.
- [ ] Omnibox is central.
- [ ] Navigation controls are discoverable.
- [ ] Workspaces are first-class.
- [ ] Tab groups are clear.
- [ ] Bookmarks/history/downloads/settings share one language.

### AI

- [ ] AI feels contextual.
- [ ] AI does not overpower the webpage.
- [ ] AX/DOM inspection is dense but coherent.
- [ ] Skills are quick to execute.

### Motion

- [ ] Interactions feel immediate.
- [ ] Motion explains state.
- [ ] No unnecessary animation.
- [ ] Reduced motion works.

### Accessibility

- [ ] WCAG AA contrast.
- [ ] Keyboard navigation.
- [ ] Visible focus.
- [ ] Screen-reader labels.
- [ ] Appropriate 44px touch targets.
- [ ] Reduced transparency.

### Performance

- [ ] No global heavy blur.
- [ ] No continuous expensive effects.
- [ ] No layout-jank animations.
- [ ] Omnibox typing remains instant.
- [ ] Tab switching remains instant.
- [ ] Sidebar resizing remains smooth.
- [ ] Native browser viewport updates without visible lag.

---

## 54. Final Visual Principle

```text
                  ┌──────────────────────────────────┐
                  │              TABS                │
                  ├──────────────────────────────────┤
                  │       NAVIGATION + OMNIBOX       │
┌───────┬─────────┴──────────────────────────────────┤
│       │                                             │
│ RAIL  │  CONTEXT              WEB CONTENT           │
│       │                                             │
│  ◉    │  Workspace            The webpage is       │
│  ◈    │  Tabs                 the primary visual   │
│  ✦    │  AI                   surface.             │
│  ☆    │  Bookmarks                                  │
│  ◷    │  History                                    │
│  ↓    │  Downloads                                   │
│       │                                             │
│  ⚙    │                                             │
└───────┴───────────────────────────┴─────────────────┘
```

**Glass creates depth.**

**Capsules define interaction.**

**Spatial layers define navigation.**

**The webpage defines focus.**

**Motion defines change.**

**Performance defines trust.**

Pineapple should feel like one coherent desktop environment for browsing, working, researching, and using AI — not a dashboard wrapped around a browser.
