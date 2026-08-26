import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors'
import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })
  const to = 'velascozorzi@gmail.com'
  const results: Record<string, unknown> = {}
  for (const tpl of ['course-access', 'course-access-vip']) {
    try {
      results[tpl] = await sendTemplateEmail(tpl, to, {
        templateData: { customerEmail: to },
        idempotencyKey: `test-${tpl}-${Date.now()}`,
      })
    } catch (e) {
      results[tpl] = { error: String(e) }
    }
  }
  return new Response(JSON.stringify(results), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } })
})
