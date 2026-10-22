# Requirements Document — Spec 02: Automated Chapter Illustrations & 3D Book Cover Generator

## Introduction
A major visual flaw in typical e-book web platforms is missing artwork (`404 Not Found`) or generic empty placeholder boxes. This specification defines a **dual-engine illustration and book cover pipeline** so the LLM agent automatically generates all **45 chapter illustrations** (`public/illustrations/book-{1..3}/ch-{0..14}.svg`) and **9 book covers** (`public/covers/{bookId}-{lang}.svg`) in a cohesive **Swiss Editorial Architectural Blueprint** style, while also embedding a complete **45-chapter AI Image Prompt Manifest** (`aiPrompt`) for optional raster `.webp` generation via Gemini Imagen or OpenAI.

## Requirements

### Requirement 1: Complete 45-Chapter Illustration Registry & AI Prompt Manifest
**User Story:** As a reader or content creator, I want every single chapter (`ch-0` to `ch-14` across `book-1`, `book-2`, and `book-3`) to have a dedicated schematic title, bilingual editorial caption, schematic diagram motif (`iconType`), and curated AI image generation prompt (`aiPrompt`), so that every chapter opens with a meaningful visual anchor.

#### Acceptance Criteria
1. WHEN `getChapterIllustration(bookId, chapterSlug)` is called from `src/lib/illustrations.ts` THE SYSTEM SHALL return the metadata for all 45 chapters (`3 books × 15 chapters`) without any missing keys.
2. WHERE AI image generation is desired THE `ChapterIllustrationMeta` object SHALL include an `aiPrompt` string formatted in *Swiss Editorial Risograph & Technical Isometric Illustration* style.

### Requirement 2: Deterministic CLI Generator for 45 Chapter SVGs & 9 Book Cover SVGs
**User Story:** As a developer running the project locally without external paid image API keys, I want a script (`scripts/generate-illustrations.ts`) that programmatically generates 45 custom Swiss Editorial technical diagram SVGs in `public/illustrations/` and 9 book cover SVGs in `public/covers/`, so that every image asset exists on disk with zero `404` errors.

#### Acceptance Criteria
1. WHEN `npx tsx scripts/generate-illustrations.ts` is executed THE SYSTEM SHALL generate 45 SVG files under `public/illustrations/book-{1,2,3}/ch-{0..14}.svg` and 9 SVG files under `public/covers/{book-1,book-2,book-3}-{id-kasual,id-standar,en}.svg`.
2. WHEN each SVG is generated THE SYSTEM SHALL embed volume-specific Swiss Editorial color accents (`#1D4ED8` for Book 1, `#EA580C` for Book 2, `#0F766E` for Book 3), isometric grid lines, schematic vector geometry matching the chapter's `iconType`, and figure index numbers (`FIG. 01.00` to `FIG. 03.14`).

### Requirement 3: Optional AI Raster Illustration Generator Script
**User Story:** As a project owner who may optionally supply a `GEMINI_API_KEY` or `OPENAI_API_KEY`, I want a ready-to-run script (`scripts/generate-ai-illustrations.ts`) that reads the 45 `aiPrompt` entries and renders `.webp` files to `public/illustrations/`, so that I can upgrade to AI-rendered editorial illustrations at any time.

#### Acceptance Criteria
1. WHEN `npx tsx scripts/generate-ai-illustrations.ts` is executed without an API key THE SYSTEM SHALL print a clear summary of the 45 prompts and exit cleanly with code `0` without crashing the build.

### Requirement 4: Stripe-Press Style 3D Book Cover & Chapter Blueprint React Components
**User Story:** As a visitor viewing the landing page or reading a chapter, I want `BookCover3D` and `ChapterBlueprintCard` components that render the generated covers and chapter schematics with architectural precision.

#### Acceptance Criteria
1. WHEN `BookCover3D` is rendered for `book-1`, `book-2`, or `book-3` THE SYSTEM SHALL display a 3D hardcover book with a color-coded spine, tactile page edges, Swiss grid typography, and localized title/subtitle.
2. WHEN `ChapterBlueprintCard` is rendered inside the Web Reader THE SYSTEM SHALL display the generated `/illustrations/{bookId}/{chapterSlug}.svg` schematic alongside the figure number and bilingual editorial caption.
