# Implementation Plan — Spec 02: Automated Chapter Illustrations & 3D Book Cover Generator

- [x] 1. Create the 45-Chapter Illustration & AI Prompt Registry
  - [x] 1.1 Create `src/lib/illustrations.ts` containing all 45 chapter records (`book-1:ch-0` through `book-3:ch-14`), bilingual captions, schematic motifs, and AI generation prompts.
    - _Requirements: 1.1, 1.2_
    - _Verification:_ `npx tsc --noEmit`

- [x] 2. Implement & Execute the Deterministic SVG & AI Prompt Generators
  - [x] 2.1 Create `scripts/generate-illustrations.ts` and execute it to generate all 45 chapter SVGs (`public/illustrations/book-{1..3}/ch-{0..14}.svg`) and 9 book cover SVGs (`public/covers/{bookId}-{lang}.svg`).
    - _Requirements: 2.1, 2.2_
    - _Verification:_ `npx tsx scripts/generate-illustrations.ts`
  - [x] 2.2 Create `scripts/generate-ai-illustrations.ts` and execute it to export `public/illustrations/prompt-manifest.json`.
    - _Requirements: 3.1_
    - _Verification:_ `npx tsx scripts/generate-ai-illustrations.ts`

- [x] 3. Implement 3D Book Cover & Chapter Blueprint UI Components
  - [x] 3.1 Create `src/components/ui/BookCover3D.tsx` and `src/components/ui/ChapterBlueprintCard.tsx`.
    - _Requirements: 4.1, 4.2_
    - _Verification:_ `npx tsc --noEmit`
