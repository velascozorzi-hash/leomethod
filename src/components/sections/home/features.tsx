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
    title: "Crée ton avatar IA et ton produit digital",
    description: "Génère un avatar IA qui parle à ta place sur TikTok, publie chaque jour du contenu sur le problème de ta niche et vends ton produit sans jamais montrer ton visage.",
    visual: "avatar",
  },
  {
    id: 2,
    title: "Apprends à viser le bon public",
    description: "Identifie une niche qui a un vrai problème douloureux, comprends ses attentes et parle-lui avec ses propres mots pour capter son attention dès la première seconde.",
    visual: "audience",
  },
  {
    id: 3,
    title: "Apprends à créer une offre irrésistible",
    description: "Transforme ce problème en solution : un ebook, un template ou une mini-formation, avec une promesse claire, un positionnement unique et un prix juste.",
    visual: "offre",
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
              className={`md:sticky md:top-24 z-10 bg-background md:rounded-[30px] rounded-lg`}
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
