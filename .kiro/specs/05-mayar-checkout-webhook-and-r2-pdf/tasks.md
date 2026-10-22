# Implementation Plan — Spec 05: Mayar v2 Checkout, Idempotent Webhook & R2 PDF Delivery

- [x] 1. Implement Mayar v2 & Cloudflare R2 Service Clients
  - [x] 1.1 Create `src/lib/mayar.ts` and `src/lib/r2.ts`.
    - _Requirements: 1.2, 3.1_
    - _Verification:_ `npx tsc --noEmit`

- [x] 2. Implement Backend API Endpoints (`/api/checkout`, `/api/webhooks/mayar`, `/api/download`)
  - [x] 2.1 Create `src/app/api/checkout/route.ts`, `src/app/api/webhooks/mayar/route.ts`, and `src/app/api/download/route.ts`.
    - _Requirements: 1.1, 1.2, 2.1, 2.2, 3.1_
    - _Verification:_ `npx tsc --noEmit`

- [x] 3. Implement Conversion & Checkout UI Components
  - [x] 3.1 Create `src/components/ui/PricingMatrix.tsx`, `src/components/reader/PaywallCard.tsx`, and `src/app/checkout/success/page.tsx`.
    - _Requirements: 1.1, 1.2_
    - _Verification:_ `npx tsc --noEmit`
