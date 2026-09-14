import Container from "@/components/container";
import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";

const MerciPage = () => {
  return (
    <Layout>
      <Helmet>
        <title>Merci pour ta commande | Accompagnement IA</title>
        <meta name="description" content="Confirmation de ta commande et accès à la formation." />
      </Helmet>
      <section className="py-24 md:py-32">
        <Container className="max-w-[640px] text-center space-y-6">
          <h1 className="h2">Merci, ta commande est enregistrée</h1>
          <p className="text-muted-foreground">
            Dès que Stripe confirme le paiement (quelques secondes en général), tu reçois un e-mail
            avec ton lien d'accès à la formation. Pense à vérifier tes spams.
          </p>
          <p className="text-sm text-muted-foreground/80">
            Un souci ? Écris-moi à{" "}
            <a href="mailto:rapha9390@gmail.com" className="underline hover:text-foreground">
              rapha9390@gmail.com
            </a>
          </p>
          <Button asChild>
            <Link to="/">Retour à l'accueil</Link>
          </Button>
        </Container>
      </section>
    </Layout>
  );
};

export default MerciPage;
