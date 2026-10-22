---
inclusion: always
---

# Technology Stack & Environment Contract

## 1. Core Stack
- **Framework:** Next.js `14.2.24` (App Router, TypeScript `5.7.x`, React `18.3.x`)
- **Styling:** Tailwind CSS `3.4.x`, PostCSS, Autoprefixer, `clsx`, `tailwind-merge`
- **Icons:** `lucide-react` (`^0.475.0`)
- **Markdown & Diagrams:**
  - `react-markdown` (`^9.0.3`)
  - `remark-gfm` (`^4.0.0`)
  - `rehype-raw` (`^7.0.0`)
  - `mermaid` (`^11.4.1`) — initialized with `look: 'classic'`, `theme: 'base'`, `suppressErrorRendering: true`, and `securityLevel: 'loose'`
- **Auth & Database:** Supabase SSR (`@supabase/ssr` `^0.5.2`, `@supabase/supabase-js` `^2.49.1`)
- **Payment Gateway:** Mayar Headless API v2 (`POST https://api.mayar.id/hl/v2/invoice/create`) + Idempotent Webhook (`/api/webhooks/mayar`)
- **PDF Object Storage:** Cloudflare R2 via AWS SDK v3 (`@aws-sdk/client-s3`, `@aws-sdk/s3-request-presigner`)

## 2. Environment Variables (`.env.example`)
```ini
# Site URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Supabase Auth & Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key

# Mayar Payment Gateway (v2)
MAYAR_API_URL=https://api.mayar.id
MAYAR_API_KEY=your-mayar-api-key
MAYAR_WEBHOOK_SECRET=your-mayar-webhook-secret

# Cloudflare R2 PDF Storage
R2_ACCOUNT_ID=your-r2-account-id
R2_ACCESS_KEY_ID=your-r2-access-key-id
R2_SECRET_ACCESS_KEY=your-r2-secret-access-key
R2_BUCKET_NAME=aiossan-ebook-assets
R2_ENDPOINT=https://your-r2-account-id.r2.cloudflarestorage.com

# Optional AI Image Generation API (for scripts/generate-ai-illustrations.ts)
GEMINI_API_KEY=
OPENAI_API_KEY=
```

## 3. Standard Verification Commands
- **Typecheck (Fastest — Run after every file edit):** `npx tsc --noEmit`
- **Generate SVG Illustrations & Covers:** `npx tsx scripts/generate-illustrations.ts`
- **Production Build Check:** `npm run build`
