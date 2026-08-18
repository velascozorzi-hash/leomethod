import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { COURSE_ACCESS_URL, PLANS, isPlanId } from "../_shared/plans.ts";
import { sendTemplateEmail } from "../_shared/transactional-email-templates/send-email.ts";

// Mollie appelle cette URL après chaque changement de statut de paiement.
// On ne fait jamais confiance au corps de la requête : on re-interroge Mollie.
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const mollieKey = Deno.env.get("MOLLIE_API_KEY");
    if (!mollieKey) return new Response("missing key", { status: 500 });

    const form = await req.formData().catch(() => null);
    const paymentId = form?.get("id");
    if (typeof paymentId !== "string" || !paymentId.startsWith("tr_")) {
      return new Response("bad request", { status: 400 });
    }

    const res = await fetch(`https://api.mollie.com/v2/payments/${paymentId}`, {
      headers: { Authorization: `Bearer ${mollieKey}` },
    });
    if (!res.ok) {
      console.error(`Mollie lookup failed [${res.status}]: ${await res.text()}`);
      return new Response("lookup failed", { status: 502 });
    }
    const payment = await res.json();

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: order } = await supabase
      .from("orders")
      .select("id, email, full_name, plan, status, email_sent_at, access_token")
      .eq("mollie_payment_id", paymentId)
      .maybeSingle();

    if (!order) {
      console.error("No order found for payment", paymentId);
      return new Response("ok", { status: 200 });
    }

    const isPaid = payment.status === "paid";

    await supabase
      .from("orders")
      .update({
        status: payment.status,
        paid_at: isPaid ? new Date().toISOString() : null,
      })
      .eq("id", order.id);

    if (isPaid && !order.email_sent_at) {
      const sent = await sendAccessEmail(order.email, order.full_name, order.access_token, order.plan);
      if (sent) {
        await supabase
          .from("orders")
          .update({ email_sent_at: new Date().toISOString() })
          .eq("id", order.id);
      }
    }

    return new Response("ok", { status: 200 });
  } catch (err) {
    console.error("mollie-webhook error:", err);
    return new Response("error", { status: 500 });
  }
});

async function sendAccessEmail(
  email: string,
  fullName: string | null,
  token: string,
  plan: string,
) {
  try {
    const result = await sendTemplateEmail("course-access", email, {
      templateData: {
        name: fullName ?? undefined,
        accessUrl: `${COURSE_ACCESS_URL}?t=${token}`,
        planLabel: isPlanId(plan) ? PLANS[plan].label : undefined,
      },
      idempotencyKey: `course-access-${token}`,
    });
    if (!result.sent) {
      console.warn("Access email not sent:", result.reason);
    }
    return result.sent === true;
  } catch (err) {
    console.error("sendAccessEmail failed:", err);
    return false;
  }
}
