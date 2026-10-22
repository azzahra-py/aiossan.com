# Implementation Plan — Spec 01: Project Scaffold & Swiss Editorial Design System

- [x] 1. Initialize Root Configuration Files
  - [x] 1.1 Create `package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `.env.example`, and `.gitignore` exactly as specified in `design.md` Sections 2.1–2.6.
    - _Requirements: 1.1, 1.2_
    - _Verification:_ `npm install`

- [x] 2. Implement Core Domain Types & Pricing Catalog
  - [x] 2.1 Create `src/types/books.ts` with `BookId`, `BookLang`, `ReaderTheme`, `ChapterData`, and `BOOK_CATALOG`.
    - _Requirements: 3.1_
    - _Verification:_ `npx tsc --noEmit`
  - [x] 2.2 Create `src/lib/utils.ts` and `src/lib/pricing.ts` with `cn()`, `formatIDR()`, and the 6 `PRICING_TIERS`.
    - _Requirements: 3.2_
    - _Verification:_ `npx tsc --noEmit`

- [x] 3. Implement Swiss Editorial CSS Tokens, Fonts & UI Primitives
  - [x] 3.1 Create `src/app/globals.css` and `src/app/layout.tsx` loading `Newsreader`, `Plus_Jakarta_Sans`, and `JetBrains_Mono` with `color-scheme: light only` and `[data-reader-theme]` variables.
    - _Requirements: 2.1, 2.2_
    - _Verification:_ `npx tsc --noEmit`
  - [x] 3.2 Create `src/components/ui/EditorialCard.tsx`, `src/components/ui/TacticalButton.tsx`, and `src/components/ui/EditorialHeader.tsx`.
    - _Requirements: 4.1, 4.2_
    - _Verification:_ `npx tsc --noEmit`
