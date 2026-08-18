import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { PLANS, isPlanId } from "../_shared/plans.ts";

const MOLLIE_API = "https://api.mollie.com/v2/payments";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const mollieKey = Deno.env.get("MOLLIE_API_KEY");
    if (!mollieKey) return json({ error: "MOLLIE_API_KEY manquante" }, 500);

    const body = await req.json().catch(() => null);
    const email = typeof body?.email === "string" ? body.email.trim() : "";
    const fullName = typeof body?.fullName === "string" ? body.fullName.trim().slice(0, 100) : null;
    const plan = body?.plan;
    const origin = typeof body?.origin === "string" ? body.origin : "";

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 255;
    if (!emailOk) return json({ error: "Adresse e-mail invalide" }, 400);
    if (!isPlanId(plan)) return json({ error: "Formule invalide" }, 400);
    if (!/^https?:\/\//.test(origin)) return json({ error: "Origine invalide" }, 400);

    const selected = PLANS[plan];

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        email,
        full_name: fullName,
        plan: selected.id,
        amount: selected.amount,
        currency: "EUR",
        status: "open",
      })
      .select("id, access_token")
      .single();

    if (orderError || !order) {
      console.error("Order insert failed:", orderError);
      return json({ error: "Impossible de créer la commande" }, 500);
    }

    const webhookUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/mollie-webhook`;

    const mollieRes = await fetch(MOLLIE_API, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${mollieKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: { currency: "EUR", value: selected.amount },
        description: selected.label,
        redirectUrl: `${origin}/merci?commande=${order.access_token}`,
        cancelUrl: `${origin}/#offre`,
        webhookUrl,
        metadata: { order_id: order.id },
      }),
    });

    if (!mollieRes.ok) {
      const details = await mollieRes.text();
      console.error(`Mollie payment failed [${mollieRes.status}]: ${details}`);
      return json({ error: "Paiement refusé par Mollie", details }, mollieRes.status);
    }

    const payment = await mollieRes.json();

    await supabase
      .from("orders")
      .update({ mollie_payment_id: payment.id, status: payment.status ?? "open" })
      .eq("id", order.id);

    return json({ checkoutUrl: payment?._links?.checkout?.href ?? null });
  } catch (err) {
    console.error("create-mollie-payment error:", err);
    return json({ error: "Erreur serveur" }, 500);
  }
});
