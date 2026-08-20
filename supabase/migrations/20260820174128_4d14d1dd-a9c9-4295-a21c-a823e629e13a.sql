ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS stripe_session_id text UNIQUE,
  ADD COLUMN IF NOT EXISTS stripe_payment_intent_id text;

ALTER TABLE public.orders
  DROP COLUMN IF EXISTS mollie_payment_id;

DROP INDEX IF EXISTS orders_mollie_payment_id_idx;
CREATE INDEX IF NOT EXISTS orders_stripe_session_id_idx ON public.orders (stripe_session_id);

GRANT ALL ON public.orders TO service_role;
GRANT SELECT ON public.orders TO authenticated;