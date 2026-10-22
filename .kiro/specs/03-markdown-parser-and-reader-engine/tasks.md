# Implementation Plan — Spec 03: Markdown Parser & Interactive Reader Engine

- [x] 1. Implement Manuscript Chapter Parser & Footnote Injector
  - [x] 1.1 Create `src/lib/books.ts` with `getBookChapters`, `getChapter`, and `extractSafePreview`.
    - _Requirements: 1.1, 1.2_
    - _Verification:_ `npx tsc --noEmit`

- [x] 2. Implement Interactive Reader Primitives
  - [x] 2.1 Create `src/components/reader/EditorialDiagram.tsx` and `src/components/reader/TacticalChecklist.tsx`.
    - _Requirements: 2.1, 3.2_
    - _Verification:_ `npx tsc --noEmit`
  - [x] 2.2 Create `src/components/reader/MarkdownRenderer.tsx` and `src/components/reader/RegisterSwitcher.tsx`.
    - _Requirements: 3.1, 3.2_
    - _Verification:_ `npx tsc --noEmit`
