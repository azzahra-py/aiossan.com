# War-Room Whiteboard Re-branding: Design Document

**Date:** 2026-10-24  
**Status:** In Review / Builder Check  
**Author:** Pair Programming (Harry & Antigravity)  
**Target File Path:** `docs/superpowers/specs/2026-10-24-war-room-whiteboard-rebrand-design.md`

---

## 1. Intent and The "Why"

`aiossan.com` distributes a 3-volume practical leadership and management field guide (*Mahir Memimpin Tim: Strategi Bikin Tim Jadi Mandiri*, *Anti-Burnout & Resilience*, *Lead of Leads & Scaling*). The content is high-gravity, battle-tested tactical literature for engineering managers, tech leads, supervisors, and corporate leaders dealing with 1-on-1s, non-violent feedback, delegation, and organizational friction.

However, the previous design iteration adopted a children's cartoon / playful schoolbook aesthetic:
- Fable woodland animal mascots (Capybara, Otter, Owl, Tortoise) in `WoodlandMascotSvg` and named characters ("Kapi si Kapten", "Toti", "Bubu").
- Childish handwritten display typography (`Patrick Hand`).
- Pastel yellow/pink/teal watercolor blobs in `AnimatedPaperBackground`.
- Highly wobbly doodle lines and cartoon badges that evoke primary school storybooks or toddler educational apps.

This caused severe cognitive dissonance (*brand mismatch*) for professional and enterprise buyers, eroding credibility and perceived value. The goal of this re-branding is to pivot the entire visual identity into **The War-Room Whiteboard (Excalidraw / Tactical Canvas Style)**: a mature, sharp, collaborative workspace aesthetic reminiscent of senior architects and executives diagramming real systems and team strategies on an interactive glass board.

---

## 2. Goals, Non-Goals, and Anti-Goals

### Goals
1. **Elevate Brand Authority:** Present the product as an authoritative, high-value professional field guide that an engineering lead or corporate director can proudly share with their team or expense on company training budgets.
2. **Excalidraw / War-Room Visual System:** Transform hand-drawn elements from playful cartoons into clean, tight whiteboard sketches, diagrams, and tactical annotations using `roughjs` with calibrated parameters.
3. **Deprecate Animal Mascots:** Replace all woodland animal mascots (`WoodlandMascotSvg`) across the site, reader, quiz, modals, and Remotion animations with minimal human whiteboard figures (Excalidraw-style team interactions) and architectural schematics.
4. **Upgrade Typography:** Anchor all structural headings, body text, and reading surfaces in **Plus Jakarta Sans** (and existing Newsreader serif for reader professional mode). Replace `Patrick Hand` with a mature whiteboard/architectural script (such as `Caveat` or `Architects Daughter`) strictly reserved for margin notes, callouts, and diagram labels.
5. **Establish Tactical Marker Palette & Dot-Grid Canvas:** Replace pastel watercolor blobs with a clean technical dot-grid background (`ambient-grid`) and high-contrast dry-erase marker colors: Deep Ink (`#18181B`), Whiteboard Navy (`#1E40AF`), Signal Red (`#DC2626`), Emerald Green (`#059669`), and Warm Amber (`#F59E0B`).
6. **Redesign Book Covers:** Redesign Book 1, 2, and 3 mockups to depict real workplace scenarios (1-on-1 meeting, sprint load balancing, executive strategy presentation) in Excalidraw whiteboard line-art.

### Non-Goals
1. **No Content / Copywriting Rewrite:** Do not rewrite the book manuscripts (`books/**/*.md`) or alter the punchy conversational Indonesian tone ("Gue/Lo" in casual mode, professional in standard mode, and English).
2. **No Backend or Database Alterations:** No changes to Supabase schema, authentication, Mayar payment webhook, or Cloudflare R2 bucket storage.
3. **No Unrequested Dependencies:** No UI libraries like Radix, shadcn, or Framer Motion. Keep the existing stack: Tailwind CSS, Lucide React, `roughjs`, Remotion (`@remotion/player`).

### Anti-Goals
1. **Never Revert to Stiff Corporate Boring UI:** Do not make the website look like a generic corporate PDF generator or bland template. It must retain its unique, approachable hand-drawn whiteboard craftsmanship.
2. **Never Keep Childish Metaphors:** No animal references in quiz results ("Kapi si Kapten", "Bubu sang Nakhoda"). Archetypes must be professional ("Frontline Team Lead", "Sprint Stabilizer", "Strategic Navigator").
3. **No Breaking Builds:** Never leave missing SVG imports or broken TypeScript types when replacing `WoodlandMascotSvg`.

---

## 3. Constraints

1. **Anti-Hallucination & Manuscript Integrity:** Adhere strictly to AGENTS.md Rule 1: **NEVER read full book manuscripts (`books/**/*.md`) into context**. All markdown parsing is untouched.
2. **Package Lock:** Use only existing packages (`roughjs`, `@remotion/player`, `remotion`, `lucide-react`, `next`, `react`). Load Google Fonts via `next/font/google`.
3. **Component Backward Compatibility:** Ensure `InteractiveReaderClient`, `MarkdownRenderer`, `LeadershipQuizDoodle`, `BookCoverMockup`, and Remotion video compositions continue to function seamlessly without prop breakage.

---

## 4. Architectural & Visual Blueprint (Decided System)

### 4.1 Canvas & Background: `WarRoomCanvas` / Living Dot Grid
* **Replaces:** `AnimatedPaperBackground.tsx`.
* **Surface:** Crisp `#FFFFFF` card surfaces against `#FAFAFA` / `#FAF7F2` canvas with a persistent, subtle technical dot-grid (`background-image: radial-gradient(#CBD5E1 1.2px, transparent 1.2px); background-size: 24px 24px;`).
* **Removal:** Remove `.ambient-blob-1` through `4` (yellow, light blue, teal, orange blur blobs) and pink notebook margin lines.
* **Canvas Details:** Minimal tactical whiteboard corner marks (`+` registration crosshairs or subtle dry-erase marker brackets) in slate/zinc-300.

### 4.2 Color Palette: Dry-Erase Tactical Markers
Update `tailwind.config.ts` and `src/app/globals.css`:
* `ink`: `#18181B` (deep charcoal black, high contrast)
* `ink-muted`: `#52525B` (slate 600)
* `whiteboard-navy`: `#1E40AF` (primary marker, action buttons, structural arrows)
* `signal-red`: `#DC2626` (antipatterns, warnings, conflict scenarios)
* `emerald-green`: `#059669` (best practices, alignment, completed targets)
* `warm-amber`: `#F59E0B` (highlighter marker, key takeaways, active badges)
* `canvas-bg`: `#FAFAFA`
* `canvas-grid`: `#E2E8F0` / `#CBD5E1`

### 4.3 Typography System
Update `src/app/layout.tsx` and `tailwind.config.ts`:
* **Body & Headings:** `Plus_Jakarta_Sans` (`var(--font-body)`) remains the primary typeface for all headings (H1, H2, H3) and UI elements, conveying strength and crisp readability.
* **Handwriting / Marker Script:** Replace `Patrick_Hand` with `Caveat` or `Architects_Daughter` (`var(--font-hand)`).
* **Usage Rule for Marker Script:** Strictly restricted to:
  1. Sticky notes & margin callouts
  2. Diagram annotations & arrow labels
  3. Subtle conversational highlights (e.g. handwritten "Catatan Penting" sticker)
  *Headings and navigation NEVER use handwriting font.*

### 4.4 Human Team Whiteboard Sketches: `WhiteboardFigureSvg` / `WhiteboardSceneSvg`
* **Replaces:** `WoodlandMascotSvg.tsx`.
* **Visual Style:** Excalidraw-like minimalist vector human figures (clean, expressive black marker strokes with subtle dry-erase color fills).
* **Scenes / Archetypes:**
  1. `one-on-one`: Two colleagues sitting across a table with coffee mugs, engaged in active listening and feedback. (Used for Book 1 / First-Time Leader).
  2. `sprint-board`: Team lead standing in front of a kanban/sprint matrix board organizing sticky notes. (Used for Book 2 / Anti-Burnout).
  3. `strategy-meeting`: Presenter at a whiteboard presenting an architectural roadmap to an engaged group. (Used for Book 3 / Scaling & Leadership).
  4. `solo-architect`: Professional at a desk sketching solutions on a tablet/paper.
  5. `active-listener`: Single character nodding and taking notes on a clipboard (used for quiz/evaluation).

### 4.5 Component Updates in `src/components/doodle/` & UI Primitives
1. **`SketchCard.tsx` & `SketchButton.tsx` (Zero-Runtime CSS/SVG):**
   - Retain fast SSR server-component performance. Do NOT inject heavy client-side HTML5 canvas `roughjs` loops.
   - Use CSS/SVG border styling calibrated for Excalidraw: crisp 1.5px ink border (`#18181B`), subtle hand-drawn border-radius (`255px 15px 225px 15px/15px 225px 15px 255px` or calibrated slight asymmetry), clean white `#FFFFFF` surface, and dry-erase offset shadow (`2px 2px 0px #18181B`).
2. **`WarRoomCanvas` (Replaces `AnimatedPaperBackground.tsx`):**
   - Remove pastel blur blobs (`#FFE66D`, `#BFDBFE`, `#99F6E4`, `#FED7AA`) and pink notebook margin lines.
   - Pure technical dot-grid canvas (`radial-gradient(#CBD5E1 1.2px, transparent 1.2px)`, 24px grid) with crisp tactical crosshairs.
3. **`BookCoverMockup.tsx`:**
   - Redesign the 3 book cover mockups using the Excalidraw team scenes:
     - Vol 1: Navy spine/accents, featuring `one-on-one` whiteboard sketch + Rumus 3K loop diagram.
     - Vol 2: Coral/Amber spine/accents, featuring `sprint-board` whiteboard sketch + Energy/Burnout quadrant.
     - Vol 3: Emerald/Slate spine/accents, featuring `strategy-meeting` whiteboard sketch + Scaling Hierarchy tree.
   - Remove mascot tags ("Kapi", "Toti", "Bubu"). Replace with tactical volume subtitles:
     - Vol 1: `VOL. 01 • First-Time Lead & Team Autonomy`
     - Vol 2: `VOL. 02 • Resilience & Anti-Burnout Systems`
     - Vol 3: `VOL. 03 • Lead of Leads & Strategic Scaling`
4. **`LeadershipQuizDoodle.tsx`:**
   - Rename quiz diagnosis results from animal names to professional archetypes:
     - Capybara -> `The Frontline Lead (Kapten Tim Baru)`
     - Tortoise -> `The Crisis Stabilizer (Penjaga Ritme Tim)`
     - Owl -> `The Strategic Navigator (Nakhoda Divisi)`
   - Replace animal mascot SVG with corresponding `WhiteboardSceneSvg`.
5. **Landing Page "Crew Ribbon" & Hero Copy (`src/app/page.tsx`):**
   - Transform the "Woodland Crew" ribbon into the **"3 Leadership Archetypes"** ribbon (Frontline Lead, Crisis Stabilizer, Strategic Navigator) featuring the Excalidraw human scenes.
   - Clean up mascot-referencing copy on the landing page (e.g., replace *"bersama Kapi si Kapibara"* with *"Panduan taktis kepemimpinan tim"*).
6. **Remotion Chapter Banners (`ChapterSceneBannerComp.tsx`):**
   - Remove the left and right mascot avatar boxes.
   - Expand the center into a wide, focused whiteboard technical diagram and framework schematic representing the specific chapter's concept.
7. **Compact UI Spots (32px–56px):**
   - For compact spots (`PaywallModal` lock icon, `DoodleLoading` spinner, `PricingGridDoodle` badge, footer icon), use clean dry-erase styled **Lucide icons** (`Lock`, `Loader2`, `Compass`, `ShieldCheck`) or a minimal single-person glyph rather than shrinking multi-person narrative scenes into an illegible 32px box.
8. **`NavbarDoodle.tsx`:**
   - Replace the capybara mascot logo with a sleek tactical brandmark (minimalist Excalidraw whiteboard frame with marker accent dot).

---

## 5. What's Left to the Builder

The builder (implementation engineer) is responsible for:
1. Writing the exact SVG coordinate paths for `WhiteboardSceneSvg` (clean, expressive Excalidraw-style human line-art).
2. Updating imports in all 11 files referencing `WoodlandMascotSvg` without breaking any TypeScript types.
3. Tuning exact CSS transition timings and dot-grid opacity to ensure optimal 60fps performance and pristine legibility across mobile, tablet, and desktop viewports.
4. Running Next.js build verification (`npm run build`) to ensure zero TypeScript or ESLint errors.
