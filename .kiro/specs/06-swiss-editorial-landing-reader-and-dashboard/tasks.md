# Implementation Plan — Spec 06: Swiss Editorial Landing Page, 3-Theme Web Reader & Dashboard

- [x] 1. Implement 3-Theme Interactive Web Reader Shell & Route
  - [x] 1.1 Create `src/components/reader/ReaderClientShell.tsx` and `src/app/read/[bookId]/[lang]/[chapterSlug]/page.tsx`.
    - _Requirements: 2.1, 2.2_
    - _Verification:_ `npx tsc --noEmit`

- [x] 2. Implement Reader Library Dashboard & Swiss Editorial Storefront
  - [x] 2.1 Create `src/app/dashboard/page.tsx`.
    - _Requirements: 3.1_
    - _Verification:_ `npx tsc --noEmit`
  - [x] 2.2 Create `src/app/page.tsx` with the complete 3-language Swiss Editorial + Tactical Bento Landing Page.
    - _Requirements: 1.1, 1.2_
    - _Verification:_ `npx tsc --noEmit`

- [x] 3. Final Asset Generation & Production Build Verification
  - [x] 3.1 Run the deterministic SVG illustration and cover generator and execute a full Next.js production build.
    - _Requirements: 1.1, 2.1, 3.1_
    - _Verification:_ `npm run build`
