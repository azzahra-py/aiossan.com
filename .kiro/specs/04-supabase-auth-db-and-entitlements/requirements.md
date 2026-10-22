# Requirements Document — Spec 04: Supabase Auth, Database Schema & Auto-Claim Entitlements

## Introduction
This specification defines the PostgreSQL database schema (`supabase/migrations/001_initial_schema.sql`), Row Level Security (RLS) policies, Supabase SSR client/server/middleware utilities, automatic Guest-Checkout-to-User entitlement synchronization (`src/lib/entitlements.ts`), and the Swiss Editorial authentication flow (`/auth/login` and `/auth/callback`).

## Requirements

### Requirement 1: Database Schema, Seed Catalog & Guest Order Auto-Claim Trigger
**User Story:** As a platform owner, I want a single SQL migration that creates `profiles`, `books`, `pricing_tiers`, `orders`, `user_entitlements`, and `checklist_progress` tables with strict RLS policies and a trigger that automatically links guest `PAID` orders when a user registers with matching email.

#### Acceptance Criteria
1. WHEN `001_initial_schema.sql` is executed in Supabase SQL Editor THE SYSTEM SHALL create all 6 tables, seed the 3 books and 6 pricing tiers, and enable Row Level Security on every table.
2. WHEN a new user signs in via Magic Link or Google OAuth THE `handle_new_user()` trigger AND `syncAndGetUserEntitlements()` helper SHALL automatically claim any existing `PAID` orders matching `lower(customer_email)` and upsert rows into `public.user_entitlements`.

### Requirement 2: Next.js Supabase SSR Clients & Session Middleware
**User Story:** As an authenticated reader, I want my session cookies automatically refreshed across server routes so that I stay logged in while reading or downloading PDFs.

#### Acceptance Criteria
1. WHEN any application route is requested THE `src/middleware.ts` file SHALL invoke `updateSession(request)` from `@/utils/supabase/middleware`.

### Requirement 3: Swiss Editorial Login Page (Magic Link & Google OAuth)
**User Story:** As a reader, I want a clean, high-trust login page (`/auth/login`) supporting 1-click Google OAuth and passwordless Email Magic Link.

#### Acceptance Criteria
1. WHEN a user submits their email on `/auth/login` THE SYSTEM SHALL send a Supabase OTP Magic Link redirecting to `/auth/callback`.
