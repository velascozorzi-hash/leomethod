-- Suivi des tentatives de paiement (paniers abandonnés).
--
-- La table `orders` n'est écrite qu'au moment où un paiement aboutit : les
-- personnes qui ouvrent le checkout puis repartent ne laissent aucune trace.
-- Cette table enregistre chaque session Stripe dès sa création, et le webhook
-- la fait ensuite passer à `paid` ou `abandoned`.
CREATE TABLE IF NOT EXISTS public.checkout_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stripe_session_id text NOT NULL UNIQUE,
  stripe_customer_id text,
  environment text NOT NULL DEFAULT 'sandbox',
  user_id uuid,
  email text,
  full_name text,
  plan text,
  amount numeric(10,2),
  currency text NOT NULL DEFAULT 'EUR',
  status text NOT NULL DEFAULT 'started',
  -- Lien fourni par Stripe pour reprendre un panier abandonné là où il s'est
  -- arrêté. Renseigné à l'expiration de la session.
  recovery_url text,
  recovery_email_sent_at timestamptz,
  started_at timestamptz NOT NULL DEFAULT now(),
  paid_at timestamptz,
  abandoned_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT checkout_sessions_status_check
    CHECK (status IN ('started', 'paid', 'abandoned')),
  CONSTRAINT checkout_sessions_environment_check
    CHECK (environment IN ('sandbox', 'live'))
);

GRANT ALL ON public.checkout_sessions TO service_role;
GRANT SELECT ON public.checkout_sessions TO authenticated;

ALTER TABLE public.checkout_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view checkout sessions"
ON public.checkout_sessions FOR SELECT TO authenticated
USING (private.has_role(auth.uid(), 'admin'::app_role));

CREATE INDEX IF NOT EXISTS checkout_sessions_status_idx
  ON public.checkout_sessions (status, started_at DESC);
CREATE INDEX IF NOT EXISTS checkout_sessions_started_at_idx
  ON public.checkout_sessions (started_at DESC);

CREATE TRIGGER update_checkout_sessions_updated_at
BEFORE UPDATE ON public.checkout_sessions
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
