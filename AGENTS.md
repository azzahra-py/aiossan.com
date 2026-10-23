# AGENTS.md - Operational Guardrails for `aiossan.com`

**Repository:** `azzahra-py/aiossan.com` is the primary repository for this project. Every agent working on the project syncs here.
**Owner's standing order:** Harry's direct instructions in chat override this file. Amendments approved by Harry are recorded inline with his name and the date.
**Architecture Style:** Swiss Editorial Publishing + Tactical SaaS Playbook (build foundation; the live visual system is the hand-drawn doodle design described in Rule 7)
**State:** Development complete and live in production (Next.js 14 + Supabase + Cloudflare R2). The 9 book manuscripts in `./books/{en,id/casual,id/standar}/book-{1,2,3}.md` are the single source of truth for book content and titles.

---

## 1. CRITICAL ANTI-HALLUCINATION RULES (READ FIRST!)

You are operating as a coding agent on a finished, live codebase. To prevent context-window overflow, truncated file writes, hallucinated imports, or broken TypeScript builds, you **MUST** obey these strict operational rules at all times:

1. **NEVER Read Full Book Manuscripts into Context (`books/**/*.md`):**
   - Each of the 9 files inside `./books/en/book-{1,2,3}.md`, `./books/id/casual/book-{1,2,3}.md`, and `./books/id/standar/book-{1,2,3}.md` contains ~16,000 words (~1,050 lines).
   - **FORBIDDEN:** Do NOT run `read_file` or `cat` on any file in `./books/`.
   - **ALLOWED:** If you must inspect a book's header, run `head -n 35 books/id/casual/book-1.md`. All book parsing happens at runtime/build-time via Node.js `fs.readFileSync` inside `src/lib/books.ts`.

2. **Work in Strict Sequence (Specs 01 → 06 Discipline):**
   - The original build was executed from six numbered spec packages in this exact order: 01 project scaffold and design foundation, 02 automated illustration and cover generator, 03 markdown parser and reader engine, 04 Supabase auth, DB and entitlements, 05 Mayar checkout, webhook and R2 PDF, 06 landing, reader and dashboard. Those spec documents are kept outside this repository.
   - New feature work follows the same discipline: requirements first, then design, then a task list, executed in order. Do NOT start a later phase before the earlier one is complete and verified.

3. **Execute ONE Atomic Task at a Time:**
   - Before writing any code for a task, read its requirements and design documents.
   - Pick the first unchecked task in the task list.
   - Write or update **ONLY** the file(s) specified in that single task.
   - Run the exact **Verification Command** listed under that task.
   - Only mark the task done after the verification command exits with code `0`.

4. **Follow the Design Document Verbatim:**
   - Design documents contain complete, pre-validated TypeScript/React/SQL/CSS blueprints.
   - **DO NOT** invent alternative function names, prop names, file paths, or database column names.
   - **DO NOT** leave placeholders like `// TODO`, `// ... rest of code`, or `[insert content]` in any file you write. Write the complete file from top to bottom.

5. **Strict Package Lock Discipline:**
   - Install **ONLY** the packages already in `package.json` plus amendments recorded in this file.
   - Do NOT install unrequested UI component libraries (no `@radix-ui/*`, no `shadcn`, no `framer-motion`, no `mui`, no `chakra-ui`). All UI primitives are self-contained Tailwind CSS + Lucide React components.
   - **Update (Harry, 23 Oct 2026):** `roughjs` and `puppeteer-core` are approved additions, required by the design-B merge (see Rule 7 update).
   - **Update (Harry, 23 Oct 2026 - Spec Revamp & Remotion):** `remotion` and `@remotion/player` (`^4.0.0`) are officially approved additions for interactive editorial animations across the landing page and web reader.

6. **Mayar Payment Integration Rule:**
   - In backend API routes (`src/app/api/checkout/route.ts`), ALWAYS use native `fetch()` to `https://api.mayar.id/hl/v2/invoice/create`.
   - NEVER spawn `npx mayar` child processes inside Next.js runtime code.

7. **Visual Rule (SUPERSEDED by Harry's decision, 23 Oct 2026):**
   - Harry compared this Swiss Editorial build (design A) against a second implementation built by his local LLM (design B, repo mharryrosyan/aiossan) and chose design B's look. All of B's advantages, including its UI/UX, were merged into this project on 23 Oct 2026. The old FORBIDDEN list no longer applies.
   - **Current design system:** hand-drawn doodle (roughjs) components in `src/components/doodle/`, Patrick Hand display font + Plus Jakarta Sans + JetBrains Mono (loaded via `next/font/google`), B's `tailwind.config.ts` and `globals.css`. Reader uses B's InteractiveReaderClient with HandDrawnMermaid, LeadershipQuizDoodle (also on landing), ShareQuoteModal, and PaywallModal.
   - The Swiss Editorial components under `src/components/ui/` and the editorial illustration pipeline (`src/lib/illustrations-editorial.ts` + `scripts/generate-illustrations.ts`) are kept as legacy assets; do not delete them without Harry's word.
