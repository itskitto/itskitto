import type { APIRoute } from 'astro'
import { env } from 'cloudflare:workers'
import { Resend } from 'resend'

export const prerender = false

const SITEVERIFY_URL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify'
const TO_ADDRESS = 'hello@itskitto.dev'
const FROM_ADDRESS = 'hello@itskitto.dev'
const DEFAULT_TEMPLATE_ID = 'itskitto-contact-message'

export const POST: APIRoute = async ({ request }) => {
  // ── Parse form data ──────────────────────────────────────────────────────
  let data: FormData
  try {
    data = await request.formData()
  } catch {
    return json({ error: 'Invalid request.' }, 400)
  }

  const name    = (data.get('name')    as string | null)?.trim() ?? ''
  const email   = (data.get('email')   as string | null)?.trim() ?? ''
  const subject = (data.get('subject') as string | null)?.trim() ?? ''
  const message = (data.get('message') as string | null)?.trim() ?? ''
  const token   = (data.get('cf-turnstile-response') as string | null) ?? ''

  // ── Basic server-side validation ─────────────────────────────────────────
  if (!name || !email || !message) {
    return json({ error: 'Missing required fields.' }, 400)
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return json({ error: 'Invalid email address.' }, 400)
  }

  // ── Verify Turnstile token ────────────────────────────────────────────────
  if (!token) {
    return json({ error: 'Human verification required.' }, 400)
  }

  if (!env.TURNSTILE_SECRET_KEY || !env.RESEND_API_KEY) {
    return json({ error: 'Server configuration is incomplete.' }, 500)
  }

  const verification = await fetch(SITEVERIFY_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      secret: env.TURNSTILE_SECRET_KEY,
      response: token,
    }),
  })

  const result = await verification.json() as { success: boolean }
  if (!result.success) {
    return json({ error: 'Verification failed. Please try again.' }, 400)
  }

  // ── Send email via Resend ─────────────────────────────────────────────────
  const resend = new Resend(env.RESEND_API_KEY)
  const templateId = env.RESEND_CONTACT_TEMPLATE_ID?.trim() || DEFAULT_TEMPLATE_ID

  const subjectLine = subject
    ? `[Contact] ${subject} — ${name}`
    : `[Contact] New message from ${name}`

  const { error } = await resend.emails.send({
    from: FROM_ADDRESS,
    to: TO_ADDRESS,
    replyTo: `${name} <${email}>`,
    subject: subjectLine,
    template: {
      id: templateId,
      variables: {
        SENDER_NAME: name,
        SENDER_EMAIL: email,
        MESSAGE_SUBJECT: subject || '(none)',
        MESSAGE_BODY: message,
      },
    },
  })

  if (error) {
    console.error('Resend error:', error)
    return json({ error: 'Failed to send message. Please try again later.' }, 500)
  }

  return json({ ok: true }, 200)
}

function json(body: Record<string, unknown>, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json' },
  })
}
