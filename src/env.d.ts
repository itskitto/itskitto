/// <reference path="../.astro/types.d.ts" />
/// <reference types="@cloudflare/workers-types" />

type CloudflareEnv = {
  /** Turnstile secret key — server-side only, never exposed to the client. */
  TURNSTILE_SECRET_KEY: string
  /** Resend API key — server-side only, never exposed to the client. */
  RESEND_API_KEY: string
  /** Published Resend template id or alias used for contact form emails. */
  RESEND_CONTACT_TEMPLATE_ID?: string
}

declare namespace App {
  interface Locals {
    runtime: {
      env: CloudflareEnv
    }
  }
}
