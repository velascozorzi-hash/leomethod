import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

// Temporary diagnostic function: sends the course-access email to a fixed address.
Deno.serve(async (req) => {
  const apiKey = Deno.env.get('LOVABLE_API_KEY')
  const token = req.headers.get('Authorization')?.replace(/^Bearer\s+/i, '')
  if (!apiKey || token !== apiKey) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  try {
    const result = await sendTemplateEmail('course-access', 'velascozorzi@gmail.com', {
      templateData: {
        name: 'Léo',
        buyerEmail: 'velascozorzi@gmail.com',
        accessUrl: 'https://www.skool.com/leo-avatar-method-9184',
        planLabel: 'Formation complète',
      },
      idempotencyKey: `test-course-access-${Date.now()}`,
    })
    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
})
