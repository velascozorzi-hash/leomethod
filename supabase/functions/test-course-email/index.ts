import { sendTemplateEmail } from '../_shared/transactional-email-templates/send-email.ts'

// Temporary diagnostic function: sends the course-access email to a fixed address.
Deno.serve(async (req) => {
  void req


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
