import * as React from 'npm:react@18.3.1'
import { renderAsync } from 'npm:@react-email/components@0.0.22'
import { TEMPLATES } from './registry.ts'

// Server-only: reads LOVABLE_API_KEY and RESEND_API_KEY. Import from edge
// functions only — never expose sending to the browser.
//
// IMPORTANT: the FROM_EMAIL domain must be verified in Resend before any
// email can reach a customer. If you see 403/422 responses, add/verify the
// domain in your Resend dashboard and update the constant below.

const SITE_NAME = "Remix of Payments Fintech Site"
const FROM_EMAIL = `noreply@leomethod.app`

const GATEWAY_URL = 'https://connector-gateway.lovable.dev/resend'

export type SendTemplateEmailResult =
  | { sent: true }
  | { sent: false; reason: 'recipient_suppressed' }

export interface SendTemplateEmailOptions {
  templateData?: Record<string, any>
  /** Dedupes retries of the same logical send; defaults to a random UUID (no dedupe). */
  idempotencyKey?: string
  replyTo?: string
}

class ResendAPIError extends Error {
  constructor(
    public status: number,
    public body: string,
  ) {
    super(`Resend API returned ${status}: ${body}`)
  }
}

/**
 * Renders a registered template and sends it through the Resend connector
 * gateway. Make sure the sending domain is verified in Resend first.
 */
export async function sendTemplateEmail(
  templateName: string,
  to: string,
  options: SendTemplateEmailOptions = {}
): Promise<SendTemplateEmailResult> {
  const lovableApiKey = Deno.env.get('LOVABLE_API_KEY')
  const resendApiKey = Deno.env.get('RESEND_API_KEY')
  if (!lovableApiKey || !resendApiKey) {
    throw new Error('LOVABLE_API_KEY or RESEND_API_KEY is not configured')
  }

  const template = TEMPLATES[templateName]
  if (!template) {
    throw new Error(
      `Template '${templateName}' not found. Available: ${Object.keys(TEMPLATES).join(', ')}`
    )
  }

  const recipient = template.to || to
  if (!recipient) {
    throw new Error('Recipient is required (the template defines no fixed recipient)')
  }

  const templateData = options.templateData ?? {}
  const element = React.createElement(template.component, templateData)
  const html = await renderAsync(element)
  const text = await renderAsync(element, { plainText: true })
  const subject =
    typeof template.subject === 'function'
      ? template.subject(templateData)
      : template.subject

  const response = await fetch(`${GATEWAY_URL}/emails`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${lovableApiKey}`,
      'X-Connection-Api-Key': resendApiKey,
      'Idempotency-Key': options.idempotencyKey || crypto.randomUUID(),
    },
    body: JSON.stringify({
      from: `${SITE_NAME} <${FROM_EMAIL}>`,
      to: [recipient],
      subject,
      html,
      text,
      reply_to: options.replyTo,
    }),
  })

  if (!response.ok) {
    const body = await response.text()

    // Resend returns a JSON error with a `name` field for some known failures.
    let parsed: { name?: string; message?: string } | undefined
    try {
      parsed = JSON.parse(body)
    } catch {
      // ignore parse errors
    }

    // Treat hard bounces / unsubscribed recipients as suppressed.
    if (
      parsed?.name === 'restricted_api_key' ||
      parsed?.name === 'invalid_to_address' ||
      parsed?.name === 'missing_to_address' ||
      parsed?.name === 'unverified_domain' ||
      parsed?.name === 'invalid_from_address'
    ) {
      // These are configuration/sender errors, not transient failures.
      throw new ResendAPIError(response.status, body)
    }

    if (
      parsed?.name === 'validation_error' ||
      response.status === 422 ||
      response.status === 403
    ) {
      throw new ResendAPIError(response.status, body)
    }

    // For other non-2xx responses (including 4xx/5xx that could indicate
    // a suppressed/bounced recipient), surface the error so the webhook can
    // retry through Stripe's retry mechanism.
    throw new ResendAPIError(response.status, body)
  }

  return { sent: true }
}
