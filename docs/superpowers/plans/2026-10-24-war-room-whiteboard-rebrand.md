# War-Room Whiteboard Re-brand Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand aiossan.com from a playful children's cartoon/animal aesthetic to an authoritative, smart "War-Room Whiteboard" (Excalidraw/tactical canvas) visual system across the landing page, web reader, book covers, interactive quiz, and video banners.

**Architecture:** Replace childish Google fonts, pastel watercolor blobs, and woodland animal mascots with a cohesive Excalidraw-inspired design system. Structural headings and body use Plus Jakarta Sans, while Caveat/Architectural script is restricted to whiteboard annotations and diagram labels. Zero-runtime CSS/SVG primitives preserve SSR speed. Minimal vector line-art human figures (`WhiteboardSceneSvg`) depict real workplace collaboration (1-on-1s, sprint planning, strategy meetings).

**Tech Stack:** Next.js 14 (App Router), Tailwind CSS, Lucide React, Google Fonts (`next/font/google`), Remotion (`@remotion/player`).

**Spec:** [`docs/superpowers/specs/2026-10-24-war-room-whiteboard-rebrand-design.md`](file:///home/harry/Documents/harry/aiossan.com/docs/superpowers/specs/2026-10-24-war-room-whiteboard-rebrand-design.md)

## Global Constraints

- Never read full book manuscripts (`books/**/*.md`) into context (AGENTS.md Rule 1).
- No unrequested UI component libraries (no Radix, no shadcn, no Framer Motion).
- Maintain SSR server component performance: do NOT inject heavy procedural HTML5 canvas loops into base card or button primitives.
- Retain existing multilingual copywriting (conversational "Gue/Lo" in casual mode, formal in standard mode, and English).
- Full TypeScript type-safety: `npx tsc --noEmit` must pass with code 0 after every task.

## Review Focus

1. **Font Loading & Hydration:** Ensure `Caveat` Google font compiles without blocking SSR and assigns `--font-hand` smoothly without font layout shifts.
2. **Component Prop Backwards Compatibility:** Ensure `BookCoverMockup`, `SketchCard`, `SketchButton`, and `LeadershipQuizDoodle` preserve their external props so parent pages (`page.tsx`, `reader`, `dashboard`) do not break.
3. **Responsive Canvas Scalability:** Ensure the technical dot-grid and Excalidraw human scenes scale cleanly on mobile viewports (375px) without overflowing horizontally or crowding text.
4. **Remotion Composition Stability:** Verify that removing animal avatars from `ChapterSceneBannerComp.tsx` and `HeroTrilogyShowcaseComp.tsx` maintains accurate keyframe animation timings and aspect ratios.
5. **Zero Mascot Residue:** Ensure no leftover references to "Kapi", "Toti", "Bubu", or `WoodlandMascotSvg` remain in active UI bundles.

---

### Task 1: Design Tokens, Typography, and Global Styling

**Files:**
- Modify: `src/app/layout.tsx`
- Modify: `tailwind.config.ts`
- Modify: `src/app/globals.css`

**Interfaces:**
- Consumes: Google Fonts (`Caveat`, `Plus_Jakarta_Sans`, `JetBrains_Mono`, `Newsreader`)
- Produces: CSS variables `--font-hand`, `--font-body`, `--font-mono`, `--font-serif-display`, and Tailwind color tokens (`whiteboard-navy`, `signal-red`, `emerald-green`, `warm-amber`, `ink`, `canvas-bg`, `canvas-grid`)

- [ ] **Step 1: Update font loader in `src/app/layout.tsx`**
  Replace `Patrick_Hand` import with `Caveat` (`subsets: ['latin']`, `weight: ['500', '700']`, `variable: '--font-hand'`). Update page metadata description if needed.

- [ ] **Step 2: Update color palette in `tailwind.config.ts`**
  Add dry-erase marker colors to `extend.colors`:
  - `whiteboard`: `{ navy: '#1E40AF', red: '#DC2626', green: '#059669', amber: '#F59E0B' }`
  - `ink`: `{ DEFAULT: '#18181B', muted: '#52525B', dark: '#09090B' }`
  - `canvas`: `{ DEFAULT: '#FAFAFA', grid: '#CBD5E1' }`

- [ ] **Step 3: Update `src/app/globals.css`**
  Update `:root` variables:
  - `--bg-paper: #FAFAFA;`
  - `--ink-primary: #18181B;`
  - `--accent-pen-blue: #1E40AF;`
  - `--accent-highlighter: #F59E0B;`
  - Update `.ambient-grid` with a crisp technical dot-grid: `radial-gradient(#CBD5E1 1.2px, transparent 1.2px)`, size `24px 24px`.

- [ ] **Step 4: Verify typecheck**
  Run: `npx tsc --noEmit`
  Expected: exit code 0.

- [ ] **Step 5: Commit**
  ```bash
  git add src/app/layout.tsx tailwind.config.ts src/app/globals.css
  git commit -m "feat(brand): update typography to Caveat and add tactical whiteboard color tokens"
  ```

---

### Task 2: War-Room Canvas (Dot-Grid Background)

**Files:**
- Create: `src/components/doodle/WarRoomCanvas.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: CSS class `.ambient-grid`
- Produces: `<WarRoomCanvas />` component

- [ ] **Step 1: Create `src/components/doodle/WarRoomCanvas.tsx`**
  Implement a lightweight background canvas:
  - Remove all pastel yellow/blue/teal/orange blurred ambient blobs.
  - Remove pink notebook margin lines.
  - Render an infinite subtle technical dot-grid (`ambient-grid`).
  - Add faint tactical corner registration crosshairs (`+`) in `text-zinc-300` at screen corners.

- [ ] **Step 2: Mount `WarRoomCanvas` in `src/app/layout.tsx`**
  Replace `<AnimatedPaperBackground />` with `<WarRoomCanvas />`.

- [ ] **Step 3: Verify typecheck**
  Run: `npx tsc --noEmit`
  Expected: exit code 0.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/doodle/WarRoomCanvas.tsx src/app/layout.tsx
  git commit -m "feat(brand): replace AnimatedPaperBackground with WarRoomCanvas dot grid"
  ```

---

### Task 3: Excalidraw Whiteboard Scene Vector Engine (`WhiteboardSceneSvg`)

**Files:**
- Create: `src/components/doodle/WhiteboardSceneSvg.tsx`

**Interfaces:**
- Consumes: SVG vector paths and marker color props
- Produces: `WhiteboardSceneSvg`, `type WhiteboardScene = 'one-on-one' | 'sprint-board' | 'strategy-meeting' | 'solo-architect' | 'active-listener'`

- [ ] **Step 1: Implement `src/components/doodle/WhiteboardSceneSvg.tsx`**
  Create vector illustrations using clean Excalidraw line-art style (strokeWidth 2, rounded caps, expressive stick/human outlines with subtle dry-erase marker fills):
  1. `'one-on-one'`: Two professionals sitting at a table with coffee mugs, engaged in direct 1-on-1 feedback discussion (for Book 1 / First-Time Lead).
  2. `'sprint-board'`: Team lead standing at a kanban board with sticky notes, balancing workload and energy (for Book 2 / Anti-Burnout).
  3. `'strategy-meeting'`: Team director at a whiteboard presenting architecture to an engaged team (for Book 3 / Scaling & Leadership).
  4. `'solo-architect'`: Single engineer mapping a tactical system blueprint.
  5. `'active-listener'`: Professional holding a clipboard and listening intently.
  Support props: `scene: WhiteboardScene`, `className?: string`, `accentColor?: string`.

- [ ] **Step 2: Verify typecheck**
  Run: `npx tsc --noEmit`
  Expected: exit code 0.

- [ ] **Step 3: Commit**
  ```bash
  git add src/components/doodle/WhiteboardSceneSvg.tsx
  git commit -m "feat(brand): add WhiteboardSceneSvg vector engine for workplace scenarios"
  ```

---

### Task 4: UI Primitives Calibration (Card, Button, Badges & Micro Icons)

**Files:**
- Modify: `src/components/doodle/SketchCard.tsx`
- Modify: `src/components/doodle/SketchButton.tsx`
- Modify: `src/components/doodle/DoodleLoading.tsx`
- Modify: `src/components/doodle/PricingGridDoodle.tsx`

**Interfaces:**
- Consumes: Tailwind classes and Lucide icons
- Produces: Calibrated `SketchCard`, `SketchButton`, `DoodleLoading`, `PricingGridDoodle`

- [ ] **Step 1: Calibrate `src/components/doodle/SketchCard.tsx`**
  Adjust border and surface styling:
  - Clean `#FFFFFF` card surface with 1.5px ink border (`#18181B`).
  - Subtle architectural corner asymmetry (`rounded-xl` with calibrated dry-erase shadow `shadow-[3px_3px_0px_#18181B]`).
  - Badges on cards use tactical amber/navy highlights with `font-hand` instead of playful pastel tags.

- [ ] **Step 2: Calibrate `src/components/doodle/SketchButton.tsx`**
  Update button styles:
  - Primary button: Navy dry-erase marker (`bg-[#1E40AF] text-white hover:bg-[#1D4ED8]`).
  - Secondary button: Tactical ink line (`bg-white text-[#18181B] border-2 border-[#18181B] hover:bg-zinc-100`).
  - Tactile dry-erase offset shadow (`shadow-[2px_2px_0px_#18181B] active:translate-x-0.5 active:translate-y-0.5`).

- [ ] **Step 3: Update `src/components/doodle/DoodleLoading.tsx`**
  Replace animal mascot with a sleek rotating dry-erase compass / loader icon (`Loader2` from `lucide-react`) with tactical loading copy.

- [ ] **Step 4: Update `src/components/doodle/PricingGridDoodle.tsx`**
  Replace `WoodlandMascotSvg` instances with dry-erase Lucide badges (`ShieldCheck`, `Sparkles`, `BookOpen`).

- [ ] **Step 5: Verify typecheck**
  Run: `npx tsc --noEmit`
  Expected: exit code 0.

- [ ] **Step 6: Commit**
  ```bash
  git add src/components/doodle/SketchCard.tsx src/components/doodle/SketchButton.tsx src/components/doodle/DoodleLoading.tsx src/components/doodle/PricingGridDoodle.tsx
  git commit -m "feat(brand): calibrate SketchCard, SketchButton, and pricing components to Excalidraw style"
  ```

---

### Task 5: Book Cover Mockup Redesign & Series Visuals

**Files:**
- Modify: `src/components/doodle/BookCoverMockup.tsx`

**Interfaces:**
- Consumes: `WhiteboardSceneSvg`
- Produces: Redesigned `BookCoverMockup` component

- [ ] **Step 1: Update theme and scene mapping in `BookCoverMockup.tsx`**
  Replace animal mascot properties with whiteboard scenes:
  - Book 1: `scene: 'one-on-one'`, `spineBg: 'bg-[#1E40AF]'`, `accentBg: 'bg-blue-50'`, subtitle: `VOL. 01 • First-Time Lead & Autonomy`.
  - Book 2: `scene: 'sprint-board'`, `spineBg: 'bg-[#D97706]'`, `accentBg: 'bg-amber-50'`, subtitle: `VOL. 02 • Resilience & Anti-Burnout`.
  - Book 3: `scene: 'strategy-meeting'`, `spineBg: 'bg-[#059669]'`, `accentBg: 'bg-emerald-50'`, subtitle: `VOL. 03 • Lead of Leads & Scaling`.

- [ ] **Step 2: Update cover mockup rendering**
  Mount `<WhiteboardSceneSvg scene={theme.scene} />` in place of `<WoodlandMascotSvg />`.
  Remove animal name tags ("Kapi", "Toti", "Bubu") and render crisp tactical labels.

- [ ] **Step 3: Verify typecheck**
  Run: `npx tsc --noEmit`
  Expected: exit code 0.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/doodle/BookCoverMockup.tsx
  git commit -m "feat(brand): update BookCoverMockup to use whiteboard team scenes and tactical subtitles"
  ```

---

### Task 6: Interactive Modals & Navigation Brandmark

**Files:**
- Modify: `src/components/doodle/NavbarDoodle.tsx`
- Modify: `src/components/reader/ShareQuoteModal.tsx`
- Modify: `src/components/reader/PaywallModal.tsx`

**Interfaces:**
- Consumes: Lucide icons, `WhiteboardSceneSvg`
- Produces: Cleaned navigation and modal components

- [ ] **Step 1: Update `src/components/doodle/NavbarDoodle.tsx`**
  Replace the Capybara icon in the navbar logo with a minimalist whiteboard brandmark (Excalidraw dry-erase frame icon with an amber marker dot next to `aiossan.com`).

- [ ] **Step 2: Update `src/components/reader/ShareQuoteModal.tsx`**
  Replace `WoodlandMascotSvg` with a sleek editorial quotation watermark stamp or `WhiteboardSceneSvg` (`active-listener`).

- [ ] **Step 3: Update `src/components/reader/PaywallModal.tsx`**
  Replace `WoodlandMascotSvg` with a dry-erase tactical lock icon (`Lock` from `lucide-react`) with whiteboard styling.

- [ ] **Step 4: Verify typecheck**
  Run: `npx tsc --noEmit`
  Expected: exit code 0.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/doodle/NavbarDoodle.tsx src/components/reader/ShareQuoteModal.tsx src/components/reader/PaywallModal.tsx
  git commit -m "feat(brand): update Navbar brandmark, ShareQuoteModal, and PaywallModal"
  ```

---

### Task 7: Leadership Quiz Transformation (Professional Archetypes)

**Files:**
- Modify: `src/components/doodle/LeadershipQuizDoodle.tsx`

**Interfaces:**
- Consumes: `WhiteboardSceneSvg`
- Produces: Professional Leadership Archetypes diagnostic results

- [ ] **Step 1: Update `DIAGNOSIS_MAP` in `LeadershipQuizDoodle.tsx`**
  Transform the 3 archetypes:
  1. `winner === 'a'`:
     - Scene: `'one-on-one'`
     - Title ID: `The Frontline Lead: Penggerak Mandiri Tim Baru`
     - Title EN: `The Frontline Lead: First-Time Team Builder`
     - Badge: `Level 1: Delegasi & Alur 1-on-1`
  2. `winner === 'b'`:
     - Scene: `'sprint-board'`
     - Title ID: `The Crisis Stabilizer: Penjaga Ritme & Anti-Burnout`
     - Title EN: `The Crisis Stabilizer: Rhythm & Energy Keeper`
     - Badge: `Level 2: Manajemen Energi & Kapasitas`
  3. `winner === 'c'`:
     - Scene: `'strategy-meeting'`
     - Title ID: `The Strategic Navigator: Arsitek Skalabilitas & Manajer`
     - Title EN: `The Strategic Navigator: Division & System Leader`
     - Badge: `Level 3: Penyelarasan Lintas Tim`

- [ ] **Step 2: Render `WhiteboardSceneSvg` in quiz result card**
  Replace `<WoodlandMascotSvg character={result.mascot} />` with `<WhiteboardSceneSvg scene={result.scene} className="w-24 h-24" />`.

- [ ] **Step 3: Verify typecheck**
  Run: `npx tsc --noEmit`
  Expected: exit code 0.

- [ ] **Step 4: Commit**
  ```bash
  git add src/components/doodle/LeadershipQuizDoodle.tsx
  git commit -m "feat(brand): transform LeadershipQuiz to professional archetypes with whiteboard scenes"
  ```

---

### Task 8: Landing Page Archetype Ribbon & Hero Scrub

**Files:**
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `WhiteboardSceneSvg`, `BookCoverMockup`, `LeadershipQuizDoodle`
- Produces: Rebranded landing page

- [ ] **Step 1: Scrub Hero copy and mascot imports**
  In `src/app/page.tsx`:
  - Replace any mention of *"bersama Kapi si Kapibara"* with *"Panduan taktis kepemimpinan tim & field notes interaktif"*.
  - Remove `WoodlandMascotSvg` import.

- [ ] **Step 2: Transform `CREW` ribbon to `ARCHETYPES` ribbon**
  Replace the "Woodland Crew" ribbon (`src/app/page.tsx:50-92, 663-695`) with **"3 Pilar & Tantangan Kepemimpinan"**:
  - Item 1: *The Frontline Lead* (`scene: 'one-on-one'`, Solusi: Bab 1-13 Vol 1).
  - Item 2: *The Crisis Stabilizer* (`scene: 'sprint-board'`, Solusi: Sistem Anti-Burnout Vol 2).
  - Item 3: *The Strategic Navigator* (`scene: 'strategy-meeting'`, Solusi: Skalabilitas Divisi Vol 3).

- [ ] **Step 3: Update footer brandmark**
  Replace the 32px mascot in the footer with the new whiteboard tactical brandmark.

- [ ] **Step 4: Verify typecheck**
  Run: `npx tsc --noEmit`
  Expected: exit code 0.

- [ ] **Step 5: Commit**
  ```bash
  git add src/app/page.tsx
  git commit -m "feat(brand): update landing page hero copy, archetypes ribbon, and footer"
  ```

---

### Task 9: Remotion Video Compositions Modernization

**Files:**
- Modify: `src/components/remotion/HeroTrilogyShowcaseComp.tsx`
- Modify: `src/components/remotion/ChapterSceneBannerComp.tsx`
- Modify: `src/components/remotion/Framework3KLoopComp.tsx`

**Interfaces:**
- Consumes: Remotion components and `WhiteboardSceneSvg`
- Produces: Modernized video banners

- [ ] **Step 1: Update `HeroTrilogyShowcaseComp.tsx`**
  Replace `WoodlandMascotSvg` with `WhiteboardSceneSvg` representing the three book scenarios (`one-on-one`, `sprint-board`, `strategy-meeting`).

- [ ] **Step 2: Update `ChapterSceneBannerComp.tsx`**
  Remove the side mascot boxes. Expand the center area into a full-width whiteboard technical schematic for the chapter topic with clean marker borders.

- [ ] **Step 3: Update `Framework3KLoopComp.tsx`**
  Remove mascot avatar from the corner of the 3K diagram; maintain the whiteboard flowchart animation loop with dry-erase marker colors.

- [ ] **Step 4: Verify typecheck**
  Run: `npx tsc --noEmit`
  Expected: exit code 0.

- [ ] **Step 5: Commit**
  ```bash
  git add src/components/remotion/HeroTrilogyShowcaseComp.tsx src/components/remotion/ChapterSceneBannerComp.tsx src/components/remotion/Framework3KLoopComp.tsx
  git commit -m "feat(brand): modernize Remotion compositions with whiteboard schematics"
  ```

---

### Task 10: Deprecate `WoodlandMascotSvg` & Full Build Verification

**Files:**
- Modify / Deprecate: `src/components/doodle/WoodlandMascotSvg.tsx`
- Verify all codebase: `npx tsc --noEmit` && `npm run build`

**Interfaces:**
- Consumes: All updated components
- Produces: Clean, passing production build

- [ ] **Step 1: Check for any remaining references to `WoodlandMascotSvg`**
  Run: `grep -rn "WoodlandMascotSvg" src/`
  Expected: No usages outside legacy/deprecated references.

- [ ] **Step 2: Replace `WoodlandMascotSvg.tsx` with a compatibility proxy or deprecation notice**
  Ensure any leftover or edge import falls back cleanly to `WhiteboardSceneSvg` without crashing.

- [ ] **Step 3: Run full TypeScript check**
  Run: `npx tsc --noEmit`
  Expected: exit code 0.

- [ ] **Step 4: Run production build verification**
  Run: `npm run build`
  Expected: `next build` exits with code 0.

- [ ] **Step 5: Commit**
  ```bash
  git add src/
  git commit -m "feat(brand): complete War-Room Whiteboard rebrand and verify clean production build"
  ```
