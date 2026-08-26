import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { COURSE_ACCESS_URL, PLANS } from '../_shared/plans.ts'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  const to = 'velascozorzi@gmail.com'
  const results: Record<string, unknown> = {}
  const cases = [
    { tpl: 'course-access', plan: 'formation' },
    { tpl: 'course-access-vip', plan: 'accompagnement' },
  ]
  for (const { tpl, plan } of cases) {
    try {
      results[tpl] = await sendTemplateEmail(tpl, to, {
        templateData: {
          name: 'Test',
          buyerEmail: to,
          accessUrl: COURSE_ACCESS_URL,
          planLabel: PLANS[plan as keyof typeof PLANS]?.label,
          ...(plan === 'accompagnement' ? { whatsappNumber: '07 67 98 43 21' } : {}),
        },
        idempotencyKey: `test-${tpl}-${Date.now()}`,
      })
    } catch (e) {
      results[tpl] = { error: String(e) }
    }
  }
  return new Response(JSON.stringify(results), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
})
