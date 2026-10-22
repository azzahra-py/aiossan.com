# Requirements Document — Spec 03: Markdown Parser & Interactive Reader Engine

## Introduction
This specification defines the server-side Markdown parser (`src/lib/books.ts`) that processes the 9 book manuscripts in `./books/**` without ever requiring the LLM agent to read them into context, alongside the client-side interactive reading components (`EditorialDiagram`, `TacticalChecklist`, `MarkdownRenderer`, `RegisterSwitcher`).

## Requirements

### Requirement 1: Chapter Splitting, Footnote Injection & Safe Preview Extraction
**User Story:** As a reader navigating chapters `ch-0` through `ch-14`, I want each chapter's research footnotes (`[^1]`, `[^2]`, etc.) to resolve cleanly at the bottom of that chapter, and I want locked chapter previews to never cut through the middle of a ````mermaid` code block.

#### Acceptance Criteria
1. WHEN `getBookChapters(bookId, lang)` parses a manuscript file THE SYSTEM SHALL extract all footnote definitions (`[^n]: ...`) from the document and append the referenced definitions to each individual chapter's `content`.
2. WHEN `extractSafePreview(content)` is called for a locked chapter THE SYSTEM SHALL strip all fenced code blocks (````...````) and `<details>` blocks before returning the first 3 prose paragraphs.

### Requirement 2: Error-Safe Swiss Editorial Mermaid Diagrams
**User Story:** As a reader viewing workflow diagrams inside a chapter, I want diagrams rendered in a clean technical frame without ever injecting Mermaid syntax error bombs into `document.body`.

#### Acceptance Criteria
1. WHEN `EditorialDiagram` initializes Mermaid v11 THE SYSTEM SHALL set `suppressErrorRendering: true` and `securityLevel: 'loose'`, and remove any stray `#dmermaid-*` DOM nodes on unmount or error.

### Requirement 3: GFM Callouts, Interactive Checklists & 3-Mode Reader Theme Switcher
**User Story:** As a reader, I want `[!NOTE]`, `[!TIP]`, `[!IMPORTANT]`, `[!WARNING]`, and `[!CAUTION]` blockquotes rendered as structured Swiss Editorial callout boxes, task lists rendered with a live completion progress bar, and a toolbar to switch both Language Register (`id-kasual`, `id-standar`, `en`) and Reading Theme (`paper`, `sepia`, `night`).

#### Acceptance Criteria
1. WHEN `MarkdownRenderer` encounters a blockquote starting with `[!TYPE] Title` THE SYSTEM SHALL filter out leading whitespace text nodes, strip the `[!TYPE] Title` marker from the paragraph body, and render a styled callout card.
2. WHEN a reader clicks a `TacticalChecklist` item THE SYSTEM SHALL persist its state to `localStorage` and update the chapter's `ChecklistProgressBanner` percentage in real time.
