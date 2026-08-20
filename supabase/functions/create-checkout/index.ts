import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";
import { PLANS, isPlanId } from "../_shared/plans.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

async function resolveOrCreateCustomer(
  stripe: ReturnType<typeof createStripeClient>,
  options: { email?: string; userId?: string },
): Promise<string | undefined> {
  if (options.userId && !/^[a-zA-Z0-9_-]+$/.test(options.userId)) {
    throw new Error("Invalid userId");
  }
  if (options.userId) {
    const found = await stripe.customers.search({
      query: `metadata['userId']:'${options.userId}'`,
      limit: 1,
    });
    if (found.data.length) return found.data[0].id;
  }
  if (options.email) {
    const existing = await stripe.customers.list({ email: options.email, limit: 1 });
    if (existing.data.length) {
      const customer = existing.data[0];
      if (options.userId && customer.metadata?.userId !== options.userId) {
        await stripe.customers.update(customer.id, {
          metadata: { ...customer.metadata, userId: options.userId },
        });
      }
      return customer.id;
    }
  }
  if (options.email || options.userId) {
    const created = await stripe.customers.create({
      ...(options.email && { email: options.email }),
      ...(options.userId && { metadata: { userId: options.userId } }),
    });
    return created.id;
  }
  return undefined;
}

async function createCheckoutSession(options: {
  priceId: string;
  quantity?: number;
  customerEmail?: string;
  userId?: string;
  returnUrl: string;
  environment: StripeEnv;
}) {
  if (!/^[a-zA-Z0-9_-]+$/.test(options.priceId)) throw new Error("Invalid priceId");
  const stripe = createStripeClient(options.environment);

  const prices = await stripe.prices.list({ lookup_keys: [options.priceId] });
  if (!prices.data.length) throw new Error("Price not found");
  const stripePrice = prices.data[0];

  const customerId = await resolveOrCreateCustomer(stripe, {
    email: options.customerEmail,
    userId: options.userId,
  });

  const productId = typeof stripePrice.product === "string"
    ? stripePrice.product
    : stripePrice.product.id;
  const product = await stripe.products.retrieve(productId);

  const planId: keyof typeof PLANS | undefined =
    options.priceId === "formation_onetime" ? "formation"
    : options.priceId === "accompagnement_onetime" ? "accompagnement"
    : undefined;

  const session = await stripe.checkout.sessions.create({
    line_items: [{ price: stripePrice.id, quantity: options.quantity || 1 }],
    mode: "payment",
    ui_mode: "embedded_page",
    return_url: options.returnUrl,
    ...(customerId && { customer: customerId }),
    payment_intent_data: { description: product.name },
    metadata: {
      userId: options.userId ?? "",
      ...(planId && { planId }),
    },
    managed_payments: { enabled: true },
  } as Stripe.Checkout.SessionCreateParams);

  return session.client_secret;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json().catch(() => null);
    const priceId = typeof body?.priceId === "string" ? body.priceId : "";
    const email = typeof body?.customerEmail === "string" ? body.customerEmail.trim() : undefined;
    const userId = typeof body?.userId === "string" ? body.userId : undefined;
    const returnUrl = typeof body?.returnUrl === "string" ? body.returnUrl : "";
    const environment = body?.environment === "live" ? "live" : "sandbox";

    if (!priceId) return json({ error: "priceId requis" }, 400);
    if (!returnUrl) return json({ error: "returnUrl requis" }, 400);

    const clientSecret = await createCheckoutSession({
      priceId,
      customerEmail: email,
      userId,
      returnUrl,
      environment,
    });

    return json({ clientSecret });
  } catch (err) {
    console.error("create-checkout error:", err);
    const message = err instanceof Error ? err.message : "Erreur serveur";
    return json({ error: message }, 500);
  }
});
