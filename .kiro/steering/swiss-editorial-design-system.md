---
inclusion: always
---

# Swiss Editorial + Tactical SaaS Design System (`aiossan.com`)

## 1. Design Philosophy
Combine the **intellectual authority of Swiss Editorial Book Publishing** (*Stripe Press*, *Monocle*, *Harvard Business Review*) with the **precision utility of a Tactical SaaS Playbook** (*Linear*, *Refactoring UI*, *Raycast*):
- **Zero Cartoon/Comic Gimmicks:** Never use handwritten comic fonts, crooked borders, or messy shadows.
- **Architectural Grid Lines:** Expose crisp `1px solid` structural hairlines (`border-[#E4E2DD]`), monospace index numbers (`01 / 15`), and subtle dot/crosshair matrices.
- **Volume-Specific Editorial Accents:**
  - **Volume 01 (`book-1` — First-Time Team Lead):** Editorial Cobalt (`#1D4ED8`, surface `#EFF6FF`)
  - **Volume 02 (`book-2` — Anti-Burnout & Systems):** International Terracotta Orange (`#EA580C`, surface `#FFF7ED`)
  - **Volume 03 (`book-3` — Manager of Managers):** Deep Alpine Emerald (`#0F766E`, surface `#F0FDFA`)

## 2. Color Tokens
- **Canvas Background (`--bg-canvas`):** `#FBF9F5` (Warm Swiss Alabaster)
- **Elevated Surface (`--bg-surface`):** `#FFFFFF` (Pure Paper White)
- **Subtle Bento Surface (`--bg-subtle`):** `#F3F0E8` (Warm Stone Gray)
- **Primary Ink (`--ink-primary`):** `#111113` (Deep Carbon Black — WCAG AAA contrast)
- **Secondary Ink (`--ink-secondary`):** `#52525B` (Slate Zinc)
- **Muted Ink (`--ink-muted`):** `#71717A` (Technical Muted Gray)
- **Hairline Border (`--border-subtle`):** `#E4E2DD` (Warm 1px Rule)
- **Strong Structural Border (`--border-strong`):** `#18181B` (1.5px / 2px Architectural Frame)
- **Editorial Highlight (`--accent-amber`):** `#FDE68A` (Subtle Warm Editorial Marker)

## 3. Typography Hierarchy
Loaded via `next/font/google` in `src/app/layout.tsx`:
1. **Editorial Display Serif (`--font-serif` — `Newsreader`):**
   - Used for Hero headlines, Section titles, Book titles on 3D covers, and Chapter `H1` headings.
   - Styling: `font-serif tracking-[-0.02em] leading-[1.12] font-semibold`.
2. **Tactical UI & Reading Sans (`--font-sans` — `Plus Jakarta Sans`):**
   - Used for body copy, navigation, buttons, callout cards, and interactive checklists.
   - Styling: Body copy uses `16px–17px` (`text-[16px] sm:text-[17px]`), `leading-[1.8]`, max measure `68ch`.
3. **Technical Monospace (`--font-mono` — `JetBrains Mono`):**
   - Used for index labels (`VOL. 01 • CH-02`), pricing figures (`Rp 149.000`), research badges, and copy-paste script headers.

## 4. Multi-Theme Web Reader Modes (`/read/...`)
The Web Reader supports 3 user-selectable reading themes stored in `localStorage` (`aiossan:reader-theme`):
- `paper` (Default): Background `#FBF9F5`, Article Card `#FFFFFF`, Text `#111113`
- `sepia` (Warm Eye-Care): Background `#F1ECE1`, Article Card `#FAF6ED`, Text `#26221E`
- `night` (Dark Slate SaaS): Background `#090D16`, Article Card `#111827`, Text `#F3F4F6`, Border `#1F2937`
