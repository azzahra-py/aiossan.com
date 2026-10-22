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

6. **Mayar Payment Integration Rule:**
   - In backend API routes (`src/app/api/checkout/route.ts`), ALWAYS use native `fetch()` to `https://api.mayar.id/hl/v2/invoice/create`.
   - NEVER spawn `npx mayar` child processes inside Next.js runtime code.

7. **Swiss Editorial + Tactical SaaS Visual Rule:**
   - **FORBIDDEN:** Do NOT use comic/handwritten fonts (`Patrick Hand`, `Comic Sans`), do NOT use `roughjs`, and do NOT use asymmetrical warped border-radius (`255px 15px...`).
   - **REQUIRED:** Use the **Swiss Editorial + Tactical SaaS** design system defined in `.kiro/steering/swiss-editorial-design-system.md`:
     - Display Serif: `Newsreader` (`--font-serif`) for editorial book/chapter titles and high-impact statements.
     - UI & Body Sans: `Plus Jakarta Sans` (`--font-sans`) for SaaS controls, navigation, and crisp body copy.
     - Technical Mono: `JetBrains Mono` (`--font-mono`) for chapter indices (`01 / 15`), metadata tags, pricing numerals, and script headers.
     - Reader Themes: Native support for **Paper (Warm Alabaster `#FBF9F5`)**, **Sepia (`#F4EFE6`)**, and **Night Slate (`#0B0F17`)** inside the interactive Web Reader.
