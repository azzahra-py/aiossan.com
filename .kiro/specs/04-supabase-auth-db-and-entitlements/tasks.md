# Implementation Plan — Spec 04: Supabase Auth, Database Schema & Auto-Claim Entitlements

- [x] 1. Create Supabase Database Migration & SSR Clients
  - [x] 1.1 Create `supabase/migrations/001_initial_schema.sql` containing all 6 tables, seed data, RLS policies, and the `handle_new_user()` auto-claim trigger.
    - _Requirements: 1.1, 1.2_
  - [x] 1.2 Create `src/utils/supabase/client.ts`, `src/utils/supabase/server.ts`, `src/utils/supabase/middleware.ts`, and `src/middleware.ts`.
    - _Requirements: 2.1_
    - _Verification:_ `npx tsc --noEmit`

- [x] 2. Implement Entitlement Auto-Claim Helper & Auth Routes
  - [x] 2.1 Create `src/lib/entitlements.ts` with `syncAndGetUserEntitlements(userId, userEmail)`.
    - _Requirements: 1.2_
    - _Verification:_ `npx tsc --noEmit`
  - [x] 2.2 Create `src/components/auth/LogoutButton.tsx`, `src/app/auth/callback/route.ts`, and `src/app/auth/login/page.tsx`.
    - _Requirements: 3.1_
    - _Verification:_ `npx tsc --noEmit`
