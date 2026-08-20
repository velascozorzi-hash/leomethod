import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import StepVisual, { type StepVisualKind } from '@/components/ui/step-visual'
import Container from '../../container'
import { Button } from '../../ui/button'
import {
  FeatureCard,
  FeatureCardAction,
  FeatureCardContent,
  FeatureCardDescription,
  FeatureCardTitle
} from '../../ui/feature-card'

const cards: { id: number; title: string; description: string; visual: StepVisualKind }[] = [
  {
    id: 1,
    title: "Choisis ta niche, ton positionnement et ton offre",
    description: "Identifie une niche qui a un vrai problème douloureux, place-toi avec un angle unique et transforme ce problème en offre claire : ebook, template ou mini-formation.",
    visual: "niche",
  },
  {
    id: 2,
    title: "Crée ton avatar IA et ton produit digital",
    description: "Génère un avatar IA avec sa voix et son visage, qui parle à ta place, puis fabrique ton produit digital de A à Z avec les modèles prêts à l'emploi.",
    visual: "avatar",
  },
  {
    id: 3,
    title: "Utilise les réseaux sans jamais montrer ta tête pour vendre en automatique",
    description: "Publie chaque jour sur TikTok avec ton avatar IA, attire les bonnes personnes et laisse le tunnel encaisser et livrer ton produit à ta place, 24h/24.",
    visual: "reseaux",
  }
]



const Features = () => {

  return (
    <section id="methode" className="py-12 md:py-[60px] bg-background">
      <Container className="space-y-8 md:space-y-20">
        <StaggerContainer className="text-center max-w-xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 mb-6">
              La méthode en 3 étapes
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className='text-muted-foreground'>
              Un chemin simple et reproductible : une niche, une offre, un avatar IA qui vend pour toi.
            </p>
          </AnimateOnView>
        </StaggerContainer>
        <StaggerContainer
          className='max-w-[1062px] mx-auto md:space-y-[60px] space-y-8'
        >
          {cards.map((card, index) => (
            <AnimateOnView
              delay={index * 0.1}
              key={card.id}
              className={`sticky top-20 md:top-24 z-10 bg-background md:rounded-[30px] rounded-lg`}
            >
              <FeatureCard
                imagePosition="right"
              >
                <FeatureCardContent>
                  <FeatureCardTitle>{card.title}</FeatureCardTitle>
                  <FeatureCardDescription>{card.description}</FeatureCardDescription>
                  <FeatureCardAction>
                    <Button asChild>
                      <a href="#offre">
                        Je veux apprendre
                      </a>
                    </Button>
                  </FeatureCardAction>
                </FeatureCardContent>
                <div className="w-full md:order-2 flex justify-center">
                  <StepVisual kind={card.visual} />
                </div>
              </FeatureCard>
            </AnimateOnView>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Features
