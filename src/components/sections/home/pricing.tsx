import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { useEffect, useRef } from "react";
import Container from "../../container";

const stack = [
  { id: 1, label: "Les 9 modules complets (5h+ de vidéo)", price: "597€" },
  { id: 2, label: "Les 4 validations (niche, sous-niche, produit, prix)", price: "397€" },
  { id: 3, label: "Les niches les plus exploitables, mises à jour chaque mois", price: "297€" },
  { id: 4, label: "Templates : produit, page de vente, bio TikTok", price: "197€" },
  { id: 5, label: "Accès au groupe privé", price: "100€" },
  { id: 6, label: "Accompagnement personnel avec moi", price: "62€" },
];

const PRICE_ID = "formation_onetime";

const Pricing = () => {
  const { openCheckout, checkoutElement, isOpen } = useStripeCheckout();
  const checkoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && checkoutRef.current) {
      checkoutRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isOpen]);

  const handleCheckout = () =>
    openCheckout({
      priceId: PRICE_ID,
      returnUrl: `${window.location.origin}/merci?session_id={CHECKOUT_SESSION_ID}`,
    });

  return (
    <section id="offre" className="py-12 md:py-[60px] scroll-mt-24">
      <Container className="space-y-8 md:space-y-16">
        <StaggerContainer className="text-center">
          <AnimateOnView blur>
            <h2 className="h2">Ce qui est inclus.</h2>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer>
          <div className="max-w-[720px] mx-auto">
            <AnimateOnView>
              <div
                className="relative overflow-hidden rounded-[30px] border border-white/10 bg-card p-6 md:p-10 bg-cover bg-center"
                style={{ backgroundImage: "url(/images/pricing/pricing-bg.webp)" }}
              >
                <ul className="relative z-10 divide-y divide-white/10">
                  {stack.map((item, index) => (
                    <AnimateOnView key={item.id} delay={index * 0.06} asChild>
                      <li className="flex items-baseline justify-between gap-4 py-4">
                        <span className="text-sm md:text-body-md text-white/85">{item.label}</span>
                        <span className="shrink-0 text-base md:text-lg font-medium text-foreground tabular-nums">
                          {item.price}
                        </span>
                      </li>
                    </AnimateOnView>
                  ))}
                </ul>

                <div className="relative z-10 mt-6 border-t border-white/10 pt-6 space-y-3">
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-sm md:text-body-md text-muted-foreground">
                      Valeur totale
                    </span>
                    <span className="text-xl md:text-2xl text-muted-foreground line-through tabular-nums">
                      1 650€
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="text-base md:text-body-lg font-medium text-foreground">
                      Ton prix aujourd'hui
                    </span>
                    <span className="h2 text-primary tabular-nums">197€</span>
                  </div>
                </div>

                <div className="relative z-10 mt-8">
                  <Button variant="pricing" className="w-full" onClick={handleCheckout}>
                    Rejoindre l'accompagnement
                  </Button>
                </div>
              </div>
            </AnimateOnView>

            <AnimateOnView className="flex justify-center pt-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary shadow-sm">
                197€ · Paiement en 3× disponible
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
