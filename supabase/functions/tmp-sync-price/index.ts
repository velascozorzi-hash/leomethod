import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createStripeClient, type StripeEnv } from "../_shared/stripe.ts";

const PRODUCTS: Record<StripeEnv, string> = {
  live: Deno.env.get("STRIPE_FORMATION_PRODUCT_ID_LIVE") ?? "prod_V6npYgQgdgFGnP",
  sandbox: Deno.env.get("STRIPE_FORMATION_PRODUCT_ID_TEST") ?? "",
};

async function inspect(env: StripeEnv) {
  try {
    const stripe = createStripeClient(env);
    const productId = PRODUCTS[env];
    const out: Record<string, unknown> = { productId };
    if (productId) {
      const product = await stripe.products.retrieve(productId, { expand: ["default_price"] });
      const dp = product.default_price;
      out.default = dp && typeof dp !== "string"
        ? { id: dp.id, active: dp.active, amount: dp.unit_amount, type: dp.type }
        : dp;
      const all = await stripe.prices.list({ product: productId, limit: 100 });
      out.prices = all.data.map((p) => ({
        id: p.id, active: p.active, amount: p.unit_amount, type: p.type, lookup_key: p.lookup_key,
      }));
    }
    const lk = await stripe.prices.list({ lookup_keys: ["formation_onetime"], limit: 10 });
    out.lookupFormationOnetime = lk.data.map((p) => ({
      id: p.id, active: p.active, amount: p.unit_amount, product: p.product,
    }));
    return out;
  } catch (e) {
    return { error: e instanceof Error ? e.message : String(e) };
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  const body = { live: await inspect("live"), sandbox: await inspect("sandbox") };
  return new Response(JSON.stringify(body), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
});
