# AGENTS.md — Mid-Tier LLM Operational Guardrails for `aiossan.com`
**Architecture Style:** Swiss Editorial Publishing + Tactical SaaS Playbook  
**Spec Framework:** Kiro Spec-Driven Development (`.kiro/steering/` + `.kiro/specs/`)  
**Starting State Assumption:** Greenfield repository containing ONLY `./books/{en,id/casual,id/standar}/book-{1,2,3}.md` and this `.kiro/` specification suite.

---

## 1. CRITICAL ANTI-HALLUCINATION RULES FOR MID-TIER LLMs (READ FIRST!)

You are operating as a coding agent executing a Kiro Spec-Driven Development plan. To prevent context-window overflow, truncated file writes, hallucinated imports, or broken TypeScript builds, you **MUST** obey these 7 strict operational rules at all times:

1. **NEVER Read Full Book Manuscripts into Context (`books/**/*.md`):**
   - Each of the 9 files inside `./books/en/book-{1,2,3}.md`, `./books/id/casual/book-{1,2,3}.md`, and `./books/id/standar/book-{1,2,3}.md` contains ~16,000 words (~1,050 lines).
   - **FORBIDDEN:** Do NOT run `read_file` or `cat` on any file in `./books/`.
   - **ALLOWED:** If you must inspect a book's header, run `head -n 35 books/id/casual/book-1.md`. All book parsing happens at runtime/build-time via Node.js `fs.readFileSync` inside `src/lib/books.ts`.

2. **Execute Specs Strictly in Numerical Order (`01` → `06`):**
   - Always execute `.kiro/specs/` in this exact sequence:
     1. `.kiro/specs/01-project-scaffold-and-swiss-design/`
     2. `.kiro/specs/02-automated-illustration-and-cover-generator/`
     3. `.kiro/specs/03-markdown-parser-and-reader-engine/`
     4. `.kiro/specs/04-supabase-auth-db-and-entitlements/`
     5. `.kiro/specs/05-mayar-checkout-webhook-and-r2-pdf/`
     6. `.kiro/specs/06-swiss-editorial-landing-reader-and-dashboard/`
   - Do NOT jump to Spec `03` before Spec `01` and `02` have 100% of their `[x]` checkboxes completed and verified.

3. **Execute ONE Atomic Task Checkbox (`- [ ] X.Y`) at a Time:**
   - Before writing any code for a Spec, read its `requirements.md`, `design.md`, and `tasks.md`.
   - Pick the first unchecked task `- [ ] X.Y` in `tasks.md`.
   - Write or update **ONLY** the file(s) specified in that single task.
   - Run the exact **Verification Command** listed under that task.
   - Only mark `- [x] X.Y` in `tasks.md` after the verification command exits with code `0`.

4. **Copy Code Blueprints from `design.md` Verbatim:**
   - Every `design.md` file contains complete, pre-validated TypeScript/React/SQL/CSS blueprints.
   - **DO NOT** invent alternative function names, prop names, file paths, or database column names.
   - **DO NOT** leave placeholders like `// TODO`, `// ... rest of code`, or `[insert content]` in any file you write. Write the complete file from top to bottom.

5. **Strict Package Lock Discipline:**
   - Install **ONLY** the packages listed in `.kiro/steering/tech.md` and Spec `01`.
   - Do NOT install unrequested UI component libraries (no `@radix-ui/*`, no `shadcn`, no `framer-motion`, no `mui`, no `chakra-ui`). All UI primitives are self-contained Tailwind CSS + Lucide React components defined in `design.md`.
   - **Update (Harry, 23 Oct 2026):** `roughjs` and `puppeteer-core` are approved additions, required by the design-B merge (see Rule 7 update).

6. **Mayar Payment Integration Rule:**
   - In backend API routes (`src/app/api/checkout/route.ts`), ALWAYS use native `fetch()` to `https://api.mayar.id/hl/v2/invoice/create`.
   - NEVER spawn `npx mayar` child processes inside Next.js runtime code.

7. **Visual Rule (SUPERSEDED by Harry's decision, 23 Oct 2026):**
   - Harry compared this Swiss Editorial build (design A) against a second implementation built by his local LLM (design B, repo mharryrosyan/aiossan) and chose design B's look. All of B's advantages, including its UI/UX, were merged into this project on 23 Oct 2026. The old FORBIDDEN list below no longer applies.
   - **Current design system:** hand-drawn doodle (roughjs) components in `src/components/doodle/`, Patrick Hand display font + Plus Jakarta Sans + JetBrains Mono (local woff2 in `public/fonts/`), B's `tailwind.config.ts` and `globals.css`. Reader uses B's InteractiveReaderClient with HandDrawnMermaid, LeadershipQuizDoodle (also on landing), ShareQuoteModal, and PaywallModal.
   - The Swiss Editorial components under `src/components/ui/` and the editorial illustration pipeline (`src/lib/illustrations-editorial.ts` + `scripts/generate-illustrations.ts`) are kept as legacy assets; do not delete them without Harry's word.
