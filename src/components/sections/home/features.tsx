import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import Container from '../../container'
import { Button } from '../../ui/button'
import {
  FeatureCard,
  FeatureCardAction,
  FeatureCardContent,
  FeatureCardDescription,
  FeatureCardImage,
  FeatureCardTitle
} from '../../ui/feature-card'

const cards = [
  {
    id: 1,
    title: "Apprends à viser le bon public",
    description: "Identifie une audience qui a un vrai problème à résoudre, comprends ses attentes et parle-lui avec les bons mots pour capter son attention dès la première seconde.",
    imageSrc: "images/home/feature-1.png",
    imageAlt: "Analyse d'audience sur smartphone",
  },
  {
    id: 2,
    title: "Apprends à créer une offre irrésistible",
    description: "Structure une promesse claire, un positionnement unique et un prix juste pour que ton offre devienne évidente aux yeux de ton audience.",
    imageSrc: "images/home/feature-2.webp",
    imageAlt: "Construction d'une offre digitale",
  },
  {
    id: 3,
    title: "Crée ton produit digital",
    description: "Utilise l'IA pour concevoir, rédiger et livrer ton produit en quelques jours seulement, sans compétence technique et sans jamais montrer ton visage.",
    imageSrc: "images/home/feature-3.webp",
    imageAlt: "Création d'un produit digital avec l'IA",
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
              Un chemin simple et reproductible pour lancer ton produit digital avec l'IA et le vendre en ligne.
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
                <FeatureCardImage src={card.imageSrc} alt={card.imageAlt} />
              </FeatureCard>
            </AnimateOnView>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Features
