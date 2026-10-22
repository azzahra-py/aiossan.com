# Requirements Document — Spec 06: Swiss Editorial Landing Page, 3-Theme Web Reader & Reader Library Dashboard

## Introduction
This final specification assembles the primary user-facing pages in the **Swiss Editorial + Tactical SaaS** aesthetic: the Landing Page (`src/app/page.tsx`), the 3-Theme Interactive Web Reader (`src/components/reader/ReaderClientShell.tsx` and `src/app/read/[bookId]/[lang]/[chapterSlug]/page.tsx`), and the Reader Library Dashboard (`src/app/dashboard/page.tsx`).

## Requirements

### Requirement 1: Swiss Editorial + Tactical Bento Landing Page (`src/app/page.tsx`)
**User Story:** As a visitor landing on `aiossan.com`, I want an authoritative, high-converting storefront featuring a 2-column Swiss Editorial Hero with 3D Hardcover Book Mockups, a 4-panel Bento Feature Grid, an interactive 1-on-1 Script Simulator with 1-click copy, and full 3-language localization (`id-kasual`, `id-standar`, `en`).

#### Acceptance Criteria
1. WHEN a visitor switches between `id-kasual`, `id-standar`, and `en` in the top bar THE SYSTEM SHALL update all copy across the Hero, Bento Grid, Volume Catalog, Script Simulator, Pricing Matrix, and FAQ, and persist the choice to `localStorage`.
2. WHEN a visitor clicks "Copy Script" inside the 1-on-1 Script Simulator THE SYSTEM SHALL copy the active dialogue to the clipboard and show a confirmation state.

### Requirement 2: Multi-Theme Interactive Web Reader (`/read/[bookId]/[lang]/[chapterSlug]`)
**User Story:** As a reader studying a 16,000-word playbook, I want a distraction-free Web Reader that lets me switch between `Paper` (`#FBF9F5`), `Sepia` (`#F1ECE1`), and `Night` (`#090D16`) reading modes, view chapter architectural schematics (`ChapterBlueprintCard`), track my reading progress across 15 chapters, and switch language registers on the fly.

#### Acceptance Criteria
1. WHEN a reader toggles between `Paper`, `Sepia`, and `Night` in the reader toolbar THE `ReaderClientShell` SHALL apply `data-reader-theme="{theme}"` and persist the preference in `localStorage` (`aiossan:reader-theme`).
2. WHEN a reader opens a locked chapter (`ch-2` through `ch-14`) without an active entitlement THE SYSTEM SHALL render the code-free `extractSafePreview` teaser followed by `PaywallCard`.

### Requirement 3: Executive Reader Library & PDF Download Dashboard (`/dashboard`)
**User Story:** As a customer who purchased a book or bundle (either while logged in or via Guest Checkout), I want `/dashboard` to automatically claim my `PAID` orders by email, display my unlocked volumes with `BookCover3D`, and provide direct download links for all 3 language editions of the A5 Master PDF.

#### Acceptance Criteria
1. WHEN an authenticated user loads `/dashboard` THE SYSTEM SHALL invoke `syncAndGetUserEntitlements(user.id, user.email)` and display download buttons for `id-kasual`, `id-standar`, and `en` A5 Master PDFs on every unlocked volume.
