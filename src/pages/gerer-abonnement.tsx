import Container from "@/components/container";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { getStripeEnvironment } from "@/lib/stripe";
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const GererAbonnementPage = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const formatDate = (iso?: string | null) =>
    iso
      ? new Date(iso).toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })
      : null;

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setLoading(true);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("cancel-subscription", {
        body: { email: email.trim(), environment: getStripeEnvironment() },
      });

      if (fnError) {
        const details = "context" in fnError ? await (fnError as { context: Response }).context.text() : "";
        let message = "Impossible de traiter la demande pour le moment.";
        try {
          const parsed = JSON.parse(details);
          if (parsed?.error) message = parsed.error;
        } catch {
          /* ignore */
        }
        setError(message);
        return;
      }

      if (data?.error) {
        setError(data.error);
        return;
      }

      const date = formatDate(data?.endsAt);
      setSuccess(
        data?.alreadyCanceled
          ? `Ton abonnement était déjà résilié.${date ? ` Ton accès reste actif jusqu'au ${date}.` : ""}`
          : `C'est fait, ton abonnement est résilié.${date ? ` Tu gardes l'accès jusqu'au ${date}, aucun nouveau prélèvement ne sera effectué.` : " Aucun nouveau prélèvement ne sera effectué."}`,
      );
      setEmail("");
    } catch (err) {
      console.error(err);
      setError("Impossible de traiter la demande pour le moment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <Helmet>
        <title>Gérer mon abonnement | Accompagnement IA</title>
        <meta
          name="description"
          content="Résilie ton abonnement à l'accompagnement en entrant simplement ton adresse e-mail."
        />
      </Helmet>
      <section className="py-24 md:py-32">
        <Container className="max-w-[560px] space-y-6">
          <h1 className="h2">Gérer mon abonnement</h1>
          <p className="text-muted-foreground">
            Entre l'adresse e-mail utilisée lors de ton achat : ton abonnement sera résilié
            immédiatement. Tu gardes l'accès jusqu'à la fin de la période déjà payée.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="ton@email.com"
              autoComplete="email"
            />
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Traitement en cours..." : "Résilier mon abonnement"}
            </Button>
          </form>

          {error && <p className="text-sm text-destructive">{error}</p>}
          {success && <p className="text-sm text-primary">{success}</p>}

          <p className="text-sm text-muted-foreground/80">
            Un souci ? Écris-moi à{" "}
            <a href="mailto:rapha9390@gmail.com" className="underline hover:text-foreground">
              rapha9390@gmail.com
            </a>
          </p>
          <Button asChild variant="outline">
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </Container>
      </section>
    </Layout>
  );
};

export default GererAbonnementPage;
