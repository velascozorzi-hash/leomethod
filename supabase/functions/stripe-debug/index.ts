import { createStripeClient } from "../_shared/stripe.ts";

Deno.serve(async () => {
  const out: Record<string, unknown> = {};
  for (const env of ["sandbox", "live"] as const) {
    try {
      const stripe = createStripeClient(env);
      const products = await stripe.products.list({ limit: 20 });
      const prices = await stripe.prices.list({ limit: 20 });
      out[env] = {
        products: products.data.map((p) => ({ id: p.id, name: p.name, ext: p.metadata?.lovable_external_id })),
        prices: prices.data.map((p) => ({ id: p.id, lookup: p.lookup_key, amount: p.unit_amount, product: p.product, active: p.active })),
      };
    } catch (e) {
      out[env] = { error: String(e) };
    }
  }
  return new Response(JSON.stringify(out, null, 2), { headers: { "Content-Type": "application/json" } });
});
