import CheckoutDialog, { type CheckoutPlan } from '@/components/checkout-dialog'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { useState } from 'react'
import Container from '../../container'
import { PricingCard } from '../../ui/pricing-card'

const pricingPlans = [
  {
    id: 1,
    planId: "formation" as const,
    title: "Formation complète",
    description: "Tout le système avatar IA pour créer et vendre ton produit digital sur TikTok.",
    price: "0,10€",
    oldPrice: "97€",
    discount: "-99%",
    pricePeriod: "paiement unique",
    features: [
      "Les 5 modules et 47 leçons de la formation",
      "La création de tes avatars IA pas à pas",
      "Les prompts et scripts TikTok prêts à l'emploi",
      "Les modèles de produits digitaux (ebook, template)",
      "Accès à vie et mises à jour incluses",
    ],
    buttonText: "Rejoindre la formation",
    buttonLink: "/signup",
    isHighlighted: false,
  },
  {
    id: 2,
    planId: "accompagnement" as const,
    title: "Formation + accompagnement",
    description: "La formation complète, plus un accompagnement personnalisé avec moi.",
    price: "136€",
    oldPrice: "200€",
    discount: "-32%",
    pricePeriod: "paiement unique",
    features: [
      "Tout ce qui est inclus dans la formation",
      "Accompagnement complet et personnalisé avec moi",
      "Audit de ta niche, de ton offre et de ton avatar IA",
      "Relecture de tes 10 premiers scripts TikTok",
      "Réponses à tes questions jusqu'à tes premières ventes",
    ],
    buttonText: "Je veux être accompagné",
    buttonLink: "/signup",
    isHighlighted: true,
    backgroundImage: "/images/pricing/pricing-bg.webp",
  },
]

const Pricing = () => {
  const [selectedPlan, setSelectedPlan] = useState<CheckoutPlan | null>(null)

  return (
    <section id="offre" className="py-12 md:py-[60px] scroll-mt-24">
      <Container className="space-y-8 md:space-y-20">
        <StaggerContainer className="text-center">
          <AnimateOnView blur>
            <h2 className="h2 mb-5">
              Choisis ta formule
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Un investissement unique, un accès à vie, et un système que tu gardes pour toujours.
            </p>
          </AnimateOnView>
          <AnimateOnView blur delay={0.3}>
            <p className="mt-4 text-sm text-muted-foreground/80">
              Satisfait ou remboursé sous 30 jours : si tu n'as pas généré au minimum le prix que tu as
              payé, tu es remboursé — à condition de travailler chaque jour, de consommer toute la
              formation et de me présenter tes résultats et ton avancement.{" "}
              <a href="/legal/cgv" className="underline hover:text-foreground">Voir les conditions</a>
            </p>
          </AnimateOnView>
        </StaggerContainer>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1058px] mx-auto">
            {pricingPlans.map((plan, index) => (
              <AnimateOnView
                key={plan.id}
                delay={index * 0.1}
              >
                <div className="relative h-full">
                  <div className="absolute -top-3 right-6 z-20 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
                    {plan.discount}
                  </div>
                  <PricingCard
                    title={plan.title}
                    description={plan.description}
                    price={plan.price}
                    pricePeriod={
                      <span className="flex items-center gap-2">
                        <span className="line-through">{plan.oldPrice}</span>
                        <span>· {plan.pricePeriod}</span>
                      </span>
                    }
                    features={plan.features}
                    buttonText={plan.buttonText}
                    buttonLink={plan.buttonLink}
                    onButtonClick={() =>
                      setSelectedPlan({
                        id: plan.planId,
                        label: plan.title,
                        price: plan.price,
                      })
                    }
                    isHighlighted={plan.isHighlighted}
                    backgroundImage={plan.backgroundImage}
                  />
                </div>
              </AnimateOnView>
            ))}
          </div>
        </StaggerContainer>
      </Container>
      <CheckoutDialog plan={selectedPlan} onOpenChange={(open) => !open && setSelectedPlan(null)} />
    </section>
  )
}

export default Pricing
