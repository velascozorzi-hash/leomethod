import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";
import { createClient } from "npm:@supabase/supabase-js@2";
import { type StripeEnv, createStripeClient } from "../_shared/stripe.ts";
import { PLANS, isPlanId } from "../_shared/plans.ts";

/**
 * Produit Stripe de la formation, par environnement.
 * Le prix de vente n'est plus attaché à une clé de recherche (ingérable depuis
 * le Dashboard) : on prend le TARIF PAR DÉFAUT du produit. Pour changer de
 * prix, il suffit donc de créer un tarif dans Stripe et de le marquer
 * "Définir comme tarif par défaut", sans toucher au code.
 */
const FORMATION_PRODUCT_ID: Record<StripeEnv, string> = {
  live: Deno.env.get("STRIPE_FORMATION_PRODUCT_ID_LIVE") ?? "prod_V6npYgQgdgFGnP",
  sandbox: Deno.env.get("STRIPE_FORMATION_PRODUCT_ID_TEST") ?? "",
};

async function activePriceOfProduct(
  stripe: ReturnType<typeof createStripeClient>,
  productId: string,
) {
  const product = await stripe.products.retrieve(productId, { expand: ["default_price"] });
  const defaultPrice = product.default_price;
  if (defaultPrice && typeof defaultPrice !== "string" && defaultPrice.active) {
    return defaultPrice;
  }
  // Tarif par défaut absent ou archivé : on prend le tarif actif le plus récent.
  const active = await stripe.prices.list({ product: productId, active: true, limit: 100 });
  if (active.data.length) {
    return active.data.sort((a, b) => b.created - a.created)[0];
  }
  return null;
}

async function resolvePrice(
  stripe: ReturnType<typeof createStripeClient>,
  priceId: string,
  environment: StripeEnv,
) {
  // 1. Identifiant de tarif explicite (price_...), s'il est un jour passé tel quel.
  if (priceId.startsWith("price_")) {
    const price = await stripe.prices.retrieve(priceId);
    if (!price.active) throw new Error("Price is archived");
    return price;
  }

  // 2. Tarif actif du produit configuré : c'est le chemin nominal.
  const productId = FORMATION_PRODUCT_ID[environment];
  if (productId) {
    const price = await activePriceOfProduct(stripe, productId);
    if (price) return price;
  }

  // 3. Clé de recherche : tarif actif s'il existe…
  const prices = await stripe.prices.list({ lookup_keys: [priceId], active: true });
  if (prices.data.length) return prices.data[0];

  // 4. …sinon on repart du produit rattaché à l'ancien tarif archivé.
  const archived = await stripe.prices.list({ lookup_keys: [priceId], limit: 1 });
  const archivedProduct = archived.data[0]?.product;
  if (archivedProduct) {
    const fallbackProductId = typeof archivedProduct === "string" ? archivedProduct : archivedProduct.id;
    const price = await activePriceOfProduct(stripe, fallbackProductId);
    if (price) return price;
  }

  throw new Error("Price not found");
}


const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

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

// Enregistre la tentative de paiement pour pouvoir mesurer les abandons.
// Ne doit jamais faire échouer le checkout : en cas d'erreur on se contente de
// logger, le client doit pouvoir payer même si le suivi tombe en panne.
async function recordCheckoutAttempt(row: Record<string, unknown>) {
  try {
    const { error } = await getSupabase()
      .from("checkout_sessions")
      .upsert(row, { onConflict: "stripe_session_id" });
    if (error) console.error("recordCheckoutAttempt failed:", error.message);
  } catch (err) {
    console.error("recordCheckoutAttempt threw:", err);
  }
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

  const stripePrice = await resolvePrice(stripe, options.priceId, options.environment);

  const customerId = await resolveOrCreateCustomer(stripe, {
    email: options.customerEmail,
    userId: options.userId,
  });

  const isRecurring = stripePrice.type === "recurring";

  let productName: string | undefined;
  if (!isRecurring) {
    const productId = typeof stripePrice.product === "string"
      ? stripePrice.product
      : stripePrice.product.id;
    const product = await stripe.products.retrieve(productId);
    productName = product.name;
  }

  const planId: keyof typeof PLANS | undefined =
    options.priceId === "formation_mensuelle" || options.priceId === "formation_onetime"
      ? "formation"
      : undefined;

  const metadata = {
    userId: options.userId ?? "",
    ...(planId && { planId }),
  };

  const params = {
    line_items: [{ price: stripePrice.id, quantity: options.quantity || 1 }],
    mode: isRecurring ? "subscription" : "payment",
    ui_mode: "embedded_page",
    locale: "fr",
    return_url: options.returnUrl,
    ...(customerId && { customer: customerId }),
    ...(!isRecurring && { payment_intent_data: { description: productName } }),
    ...(isRecurring && { subscription_data: { metadata } }),
    metadata,
  } as Record<string, unknown>;

  // Demande à Stripe de générer un lien de reprise du panier à l'expiration de
  // la session. Toutes les configurations de Checkout ne l'acceptent pas ; si
  // Stripe refuse, on recrée la session sans cette option plutôt que de bloquer
  // le paiement.
  let session;
  try {
    session = await stripe.checkout.sessions.create({
      ...params,
      after_expiration: { recovery: { enabled: true, allow_promotion_codes: false } },
    } as never);
  } catch (err) {
    console.warn(
      "after_expiration.recovery refusé par Stripe, session créée sans lien de reprise:",
      err instanceof Error ? err.message : err,
    );
    session = await stripe.checkout.sessions.create(params as never);
  }

  await recordCheckoutAttempt({
    stripe_session_id: session.id,
    stripe_customer_id: customerId ?? null,
    environment: options.environment,
    user_id: options.userId || null,
    email: options.customerEmail ?? null,
    plan: planId ?? null,
    amount: planId ? parseFloat(PLANS[planId].amount) : null,
    currency: (stripePrice.currency ?? "eur").toUpperCase(),
    status: "started",
    started_at: new Date().toISOString(),
  });

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
