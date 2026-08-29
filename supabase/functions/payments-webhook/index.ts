import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, verifyWebhook } from "../_shared/stripe.ts";
import { COURSE_ACCESS_URL, PLANS, isPlanId } from "../_shared/plans.ts";
import { sendTemplateEmail } from "../_shared/transactional-email-templates/send-email.ts";

let _supabase: ReturnType<typeof createClient> | null = null;
function getSupabase() {
  if (!_supabase) {
    _supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );
  }
  return _supabase;
}

function planIdFromSession(session: any): keyof typeof PLANS | null {
  const planId = session.metadata?.planId;
  if (planId && planId in PLANS) {
    return planId as keyof typeof PLANS;
  }
  return null;
}

async function sendAccessEmail(
  email: string,
  fullName: string | null,
  plan: string,
) {
  const templateData = {
    name: fullName ?? undefined,
    buyerEmail: email,
    accessUrl: COURSE_ACCESS_URL,
    planLabel: isPlanId(plan) ? PLANS[plan].label : undefined,
  };

  const templateName = "course-access";

  try {
    const result = await sendTemplateEmail(templateName, email, {
      templateData,
      idempotencyKey: `${templateName}-${email}-${Date.now()}`,
    });
    return result.sent;
  } catch (err) {
    console.error("sendAccessEmail failed:", err);
    return false;
  }
}

async function fulfill(session: any) {
  const email = session.customer_details?.email ?? session.customer_email;
  if (!email) {
    console.error("No email in session", session.id);
    return;
  }

  const planId = planIdFromSession(session);
  if (!planId) {
    console.error("Could not resolve plan for session", session.id);
    return;
  }

  const plan = PLANS[planId];
  const fullName = session.customer_details?.name ?? null;

  const supabase = getSupabase();

  const { data: existing } = await supabase
    .from("orders")
    .select("id, email_sent_at")
    .eq("stripe_session_id", session.id)
    .maybeSingle();

  const orderData = {
    email,
    full_name: fullName,
    plan: planId,
    amount: parseFloat(plan.amount),
    currency: session.currency?.toUpperCase() ?? "EUR",
    status: "paid",
    paid_at: new Date().toISOString(),
    stripe_session_id: session.id,
    stripe_payment_intent_id: typeof session.payment_intent === "string"
      ? session.payment_intent
      : session.payment_intent?.id ?? null,
  };

  if (existing) {
    await supabase.from("orders").update(orderData).eq("id", existing.id);
  } else {
    const { data: created } = await supabase
      .from("orders")
      .insert(orderData)
      .select("id")
      .single();
    if (created) existing = { id: created.id, email_sent_at: null };
  }

  if (existing && !existing.email_sent_at) {
    const sent = await sendAccessEmail(email, fullName, planId);
    if (sent) {
      await supabase
        .from("orders")
        .update({ email_sent_at: new Date().toISOString() })
        .eq("id", existing.id);
    }
  }
}

async function handleWebhook(req: Request, env: StripeEnv) {
  const event = await verifyWebhook(req, env);

  switch (event.type) {
    case "checkout.session.completed": {
      const session = event.data.object;
      if (session.payment_status !== "unpaid") {
        await fulfill(session);
      }
      break;
    }
    case "checkout.session.async_payment_succeeded": {
      await fulfill(event.data.object);
      break;
    }
    default:
      console.log("Unhandled event:", event.type);
  }
}

Deno.serve(async (req) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }
  const rawEnv = new URL(req.url).searchParams.get("env");
  if (rawEnv !== "sandbox" && rawEnv !== "live") {
    console.error("Webhook received with invalid env:", rawEnv);
    return new Response(JSON.stringify({ received: true, ignored: "invalid env" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }
  const env: StripeEnv = rawEnv;
  try {
    await handleWebhook(req, env);
    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("Webhook error:", e);
    return new Response("Webhook error", { status: 400 });
  }
});
