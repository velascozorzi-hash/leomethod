import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { useEffect, useRef } from "react";
import Container from "../../container";
import { PricingCard } from "../../ui/pricing-card";

const plan = {
  planId: "formation" as const,
  title: "Formation complète",
  description:
    "Tout le système avatar IA pour créer, publier et vendre ton produit digital sur TikTok, sans jamais montrer ton visage. Accès complet dès l'inscription.",
  price: "97 €",
  features: [
    "Les 9 modules complets, plus de 5 h de vidéo",
    "La création de tes avatars IA pas à pas (visage, voix, personnalité)",
    "Le choix de ta niche, de ton positionnement et de ton offre",
    "Ta stratégie de contenu et tes scripts TikTok prêts à l'emploi",
    "La création de ton produit digital (ebook, template, mini-formation)",
    "Ton système de vente complet : page, paiement et livraison automatique",
    "Tous mes scripts Claude : ceux que j'ai utilisés pour lancer mes premières ventes, et ceux pour automatiser et scaler",
    "Les prompts d'automatisation pour produire tes vidéos en quelques minutes",
    "Les templates de pages de vente, de bio TikTok et de séquences e-mail",
    "Mon accompagnement personnel pour ne jamais rester bloqué",
    "Les nouveaux modules et mises à jour ajoutés chaque mois, inclus",
    "Accès à la communauté privée des élèves",
    "Accès à vie : aucun abonnement, aucun frais caché",
  ],
  featuresFooter: "Un seul accès, tout le système, et de nouvelles ressources chaque mois.",
  buttonText: "Rejoindre la formation",
  buttonLink: "/signup",
  backgroundImage: "/images/pricing/pricing-bg.webp",
};

const PRICE_ID = "formation_onetime";

const Pricing = () => {
  const { openCheckout, checkoutElement, isOpen } = useStripeCheckout();
  const checkoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && checkoutRef.current) {
      checkoutRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isOpen]);

  return (
    <section id="offre" className="py-12 md:py-[60px] scroll-mt-24">
      <Container className="space-y-8 md:space-y-16">
        <StaggerContainer className="text-center">
          <AnimateOnView blur>
            <h2 className="h2 mb-5">Rejoins la formation</h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Un seul accès, tout le système, et de nouvelles ressources chaque mois.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer>
          <div className="max-w-[720px] mx-auto">
            <AnimateOnView>
              <PricingCard
                title={plan.title}
                description={plan.description}
                price={plan.price}
                oldPrice="297 €"
                discount="-67% de lancement"
                pricePeriod={<span className="text-xs text-muted-foreground/80">/ paiement unique · accès à vie </span>}
                features={plan.features}
                buttonText={plan.buttonText}
                buttonLink={plan.buttonLink}
                onButtonClick={() =>
                  openCheckout({
                    priceId: PRICE_ID,
                    returnUrl: `${window.location.origin}/merci?session_id={CHECKOUT_SESSION_ID}`,
                  })
                }
                isHighlighted
                backgroundImage={plan.backgroundImage}
              />
            </AnimateOnView>

            <AnimateOnView className="flex justify-center pt-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary shadow-sm">
                🛡️ Garantie satisfait ou remboursé sous 60 jours
              </div>
            </AnimateOnView>
          </div>
        </StaggerContainer>
      </Container>
      <div ref={checkoutRef}>{checkoutElement}</div>
    </section>
  );
};

export default Pricing;
