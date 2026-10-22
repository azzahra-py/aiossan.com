---
inclusion: always
---

# Anti-Hallucination Guardrails for Mid-Tier LLM Execution

You MUST follow these constraints on every turn:

1. **Zero Full-Book Reads:** NEVER read `./books/**/*.md` into context. They are ~16,000 words each and will overflow your context window.
2. **One File Per Step:** When implementing tasks from `.kiro/specs/*/tasks.md`, write or modify one file at a time, then run the verification command (`npx tsc --noEmit` or the specified script) before proceeding.
3. **No Truncated Code:** NEVER write `// ... existing code ...` or `// TODO: implement rest` when creating or updating files. Always write the complete file contents exactly as specified in `design.md`.
4. **Exact Export & Prop Matching:** Every TypeScript interface, exported function name, and component prop in `src/` MUST match the signatures in `design.md` character-for-character.
5. **Lock Light Color-Scheme by Default on Marketing Pages:** Always set `color-scheme: light` on the root HTML/CSS so browser Force Dark Mode or Dark Reader extensions never invert the Warm Alabaster (`#FBF9F5`) palette into muddy brown. Inside the Web Reader (`/read/...`), provide a controlled 3-mode theme switcher (`paper`, `sepia`, `night`).
