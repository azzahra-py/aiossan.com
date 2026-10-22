# Requirements Document — Spec 05: Mayar v2 Checkout, Idempotent Webhook & R2 PDF Delivery

## Introduction
This specification implements the Mayar v2 headless invoice integration (`src/lib/mayar.ts`, `POST /api/checkout`), the idempotent payment webhook (`POST /api/webhooks/mayar`), the Cloudflare R2 presigned A5 Master PDF download service (`src/lib/r2.ts`, `GET /api/download`), and the conversion UI components (`PricingMatrix`, `PaywallCard`, and `/checkout/success`).

## Requirements

### Requirement 1: Session-Aware Checkout & Guest Email Modal Trigger
**User Story:** As a buyer clicking "Buy Now" on the landing page or inside a locked chapter, I want the checkout endpoint to automatically use my session email if I am logged in, or return `{ requiresEmail: true }` if I am a guest so the email modal opens smoothly without errors.

#### Acceptance Criteria
1. WHEN `POST /api/checkout` receives a request without an email in the JSON body THE SYSTEM SHALL check the active Supabase session; IF no session exists THEN THE SYSTEM SHALL return HTTP 400 with `{ requiresEmail: true, error: '...' }`.
2. WHEN a valid email and `tierId` are provided THE SYSTEM SHALL create an invoice via Mayar v2 REST API (or return a local dev mock redirect if `MAYAR_API_KEY` is unconfigured in `development` mode), insert a `PENDING` order in `public.orders`, and return `{ orderNumber, paymentUrl }`.

### Requirement 2: Strict & Idempotent Mayar Payment Webhook
**User Story:** As a platform operator, I want `POST /api/webhooks/mayar` to verify the webhook secret header, match the order reliably, mark it `PAID`, and unlock `public.user_entitlements` idempotently.

#### Acceptance Criteria
1. IF `MAYAR_WEBHOOK_SECRET` is configured and the request lacks a matching `authorization`, `x-mayar-signature`, or `x-callback-token` header THEN THE SYSTEM SHALL reject the request with HTTP 401.
2. WHEN a valid payment event is received THE SYSTEM SHALL match the order by `extraData.orderNumber`, `mayar_invoice_id`, or `customer_email + amount_idr`, update `payment_status = 'PAID'`, and upsert `user_entitlements`.

### Requirement 3: Entitlement-Verified Cloudflare R2 Presigned PDF Downloads
**User Story:** As a verified buyer, I want `GET /api/download?book=book-1&lang=id-kasual` to verify my entitlement and redirect me to a 15-minute presigned Cloudflare R2 URL for the A5 Master PDF.

#### Acceptance Criteria
1. WHEN `GET /api/download` is called by an authenticated user who owns the requested `bookId` THE SYSTEM SHALL generate a 900-second presigned S3/R2 URL for `pdf/{bookId}/{lang}.pdf` and issue an HTTP 307 redirect.
