# Requirements Document — Spec 01: Project Scaffold & Swiss Editorial Design System

## Introduction
This specification initializes the `aiossan.com` greenfield application starting from a repository that only contains the `./books/` manuscript directory. It establishes the Next.js 14 App Router configuration, TypeScript strict setup, Tailwind CSS tokens, core domain types (`BookId`, `BookLang`, `BOOK_CATALOG`), the 6 official pricing tiers (`PRICING_TIERS`), and the foundational **Swiss Editorial + Tactical SaaS** UI components (`EditorialCard`, `TacticalButton`, `EditorialHeader`).

## Requirements

### Requirement 1: Greenfield Next.js 14 & TypeScript Configuration
**User Story:** As a developer starting from only the `./books/` folder, I want deterministic configuration files (`package.json`, `tsconfig.json`, `next.config.mjs`, `postcss.config.mjs`, `tailwind.config.ts`, `.env.example`, `.gitignore`), so that the project installs and compiles cleanly on the first run.

#### Acceptance Criteria
1. WHEN `npm install` is executed in the workspace root THE SYSTEM SHALL install all required runtime and development dependencies without version conflicts.
2. WHEN `npx tsc --noEmit` is executed THE SYSTEM SHALL resolve path aliases (`@/*` mapped to `./src/*`) with zero TypeScript configuration errors.

### Requirement 2: Swiss Editorial + Tactical SaaS Typography & Theme Tokens
**User Story:** As a visitor or reader, I want the platform to load Swiss Editorial typography (`Newsreader` display serif, `Plus Jakarta Sans` UI/body sans, and `JetBrains Mono` technical monospace) and lock the default marketing color-scheme to Warm Alabaster (`#FBF9F5`), so that the site exudes executive authority and never distorts under browser Force Dark Mode.

#### Acceptance Criteria
1. WHEN any page is rendered THE SYSTEM SHALL inject `<meta name="color-scheme" content="light only" />` and `<meta name="darkreader-lock" />` in `src/app/layout.tsx`.
2. WHEN `src/app/globals.css` is loaded THE SYSTEM SHALL define CSS variables for the 3 reading themes (`[data-reader-theme="paper"]`, `[data-reader-theme="sepia"]`, and `[data-reader-theme="night"]`) alongside Swiss Editorial hairline grid utilities.

### Requirement 3: Core Catalog & Pricing Domain Models
**User Story:** As a customer browsing the platform, I want accurate metadata for the 3 books across 3 language registers (`id-kasual`, `id-standar`, `en`) and 6 pricing tiers (3 single books + 3 bundles), so that all prices, titles, and savings calculations are consistent across the UI and backend.

#### Acceptance Criteria
1. WHEN `BOOK_CATALOG` is imported from `@/types/books` THE SYSTEM SHALL expose metadata for `book-1` (Rp 49.000), `book-2` (Rp 49.000), and `book-3` (Rp 99.000) across all 3 language registers.
2. WHEN `PRICING_TIERS` is imported from `@/lib/pricing` THE SYSTEM SHALL return all 6 official pricing tiers including `bundle-trilogy` at Rp 149.000 (strike price Rp 197.000, saving Rp 48.000).

### Requirement 4: Swiss Editorial & Tactical SaaS UI Primitives
**User Story:** As a visitor, I want crisp, high-trust UI primitives (`EditorialCard`, `TacticalButton`, `EditorialHeader`) featuring `1px` architectural borders, monospace index tags, and volume-specific color accents, so that the interface feels like a blend of *Stripe Press* and *Linear*.

#### Acceptance Criteria
1. WHEN `EditorialCard` is rendered with an `indexLabel` or `badgeText` THE SYSTEM SHALL display a structured Swiss grid header bar with monospace technical typography.
2. WHEN `TacticalButton` is rendered THE SYSTEM SHALL support `primary` (Carbon Ink `#111113`), `accent` (International Orange `#EA580C`), `secondary` (Paper White with crisp border), and `ghost` variants.
