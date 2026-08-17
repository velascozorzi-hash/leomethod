import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import Container from '../../container'
import { PricingCard } from '../../ui/pricing-card'

const pricingPlans = [
  {
    id: 1,
    title: "Formation complète",
    description: "Tout le système pour créer et vendre ton produit digital avec l'IA.",
    price: "97€",
    pricePeriod: "paiement unique",
    features: [
      "Les 3 modules : audience, offre, produit",
      "Les prompts IA prêts à l'emploi",
      "Les scripts TikTok qui convertissent",
      "Le plan d'action jour par jour",
      "Accès à vie et mises à jour incluses",
    ],
    buttonText: "Rejoindre la formation",
    buttonLink: "/signup",
    isHighlighted: false,
  },
  {
    id: 2,
    title: "Formation + accompagnement",
    description: "La formation, plus un suivi personnalisé pour aller beaucoup plus vite.",
    price: "297€",
    pricePeriod: "paiement unique",
    features: [
      "Tout ce qui est inclus dans la formation",
      "Audit de ton offre et de ton positionnement",
      "Relecture de tes 10 premiers scripts",
      "Sessions questions/réponses en groupe",
      "Communauté privée des élèves",
    ],
    buttonText: "Je veux être accompagné",
    buttonLink: "/signup",
    isHighlighted: true,
    backgroundImage: "/images/pricing/pricing-bg.webp",
  },
]

const Pricing = () => {

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
        </StaggerContainer>
        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[1058px] mx-auto">
            {pricingPlans.map((plan, index) => (
              <AnimateOnView
                key={plan.id}
                delay={index * 0.1}
              >
                <PricingCard
                  title={plan.title}
                  description={plan.description}
                  price={plan.price}
                  pricePeriod={plan.pricePeriod}
                  features={plan.features}
                  buttonText={plan.buttonText}
                  buttonLink={plan.buttonLink}
                  isHighlighted={plan.isHighlighted}
                  backgroundImage={plan.backgroundImage}
                />
              </AnimateOnView>
            ))}
          </div>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Pricing
