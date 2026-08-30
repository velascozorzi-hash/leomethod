import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
    const environment: StripeEnv = body?.environment === "live" ? "live" : "sandbox";

    if (!email || email.length > 255 || !EMAIL_RE.test(email)) {
      return json({ error: "Adresse e-mail invalide." }, 400);
    }

    const stripe = createStripeClient(environment);
    const customers = await stripe.customers.list({ email, limit: 100 });

    if (!customers.data.length) {
      return json({ error: "Aucun abonnement trouvé avec cette adresse e-mail." }, 404);
    }

    let canceled = 0;
    let endsAt: string | null = null;

    for (const customer of customers.data) {
      const subs = await stripe.subscriptions.list({
        customer: customer.id,
        status: "active",
        limit: 100,
      });
      const trialing = await stripe.subscriptions.list({
        customer: customer.id,
        status: "trialing",
        limit: 100,
      });

      for (const sub of [...subs.data, ...trialing.data]) {
        if (sub.cancel_at_period_end) {
          const item = sub.items?.data?.[0];
          const periodEnd = item?.current_period_end ?? (sub as unknown as { current_period_end?: number }).current_period_end;
          if (periodEnd) endsAt = new Date(periodEnd * 1000).toISOString();
          continue;
        }
        const updated = await stripe.subscriptions.update(sub.id, {
          cancel_at_period_end: true,
          cancellation_details: { comment: "Résiliation demandée depuis le site" },
        });
        canceled += 1;
        const item = updated.items?.data?.[0];
        const periodEnd = item?.current_period_end ?? (updated as unknown as { current_period_end?: number }).current_period_end;
        if (periodEnd) endsAt = new Date(periodEnd * 1000).toISOString();
      }
    }

    if (canceled === 0 && !endsAt) {
      return json({ error: "Aucun abonnement actif trouvé avec cette adresse e-mail." }, 404);
    }

    // Notification au propriétaire (n'empêche pas la réponse client en cas d'échec).
    if (canceled > 0) {
      try {
        const endsAtFr = endsAt
          ? new Date(endsAt).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
          : null;
        await sendTemplateEmail("cancellation-notice", "", {
          templateData: { email, endsAt: endsAtFr },
          idempotencyKey: `cancel-notice-${environment}-${email}-${endsAt ?? "now"}`,
        });
      } catch (mailErr) {
        console.error("cancellation notice email failed:", mailErr);
      }
    }

    return json({ canceled, alreadyCanceled: canceled === 0, endsAt });
  } catch (err) {
    console.error("cancel-subscription error:", err);
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return json({ error: message }, 500);
  }
});
