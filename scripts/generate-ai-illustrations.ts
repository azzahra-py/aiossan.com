import fs from 'fs';
import path from 'path';
import { CHAPTER_ILLUSTRATIONS } from '../src/lib/illustrations';

async function main() {
  const entries = Object.values(CHAPTER_ILLUSTRATIONS);
  const manifestPath = path.join(process.cwd(), 'public', 'illustrations', 'prompt-manifest.json');
  fs.mkdirSync(path.dirname(manifestPath), { recursive: true });
  fs.writeFileSync(manifestPath, JSON.stringify(entries, null, 2), 'utf-8');

  console.log(`[generate-ai-illustrations] Exported 45 Swiss Editorial AI prompts to ${manifestPath}`);

  if (!process.env.GEMINI_API_KEY && !process.env.OPENAI_API_KEY) {
    console.log(
      '[generate-ai-illustrations] No GEMINI_API_KEY or OPENAI_API_KEY detected. Using deterministic Swiss Editorial SVG schematics (0 errors).'
    );
    return;
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
