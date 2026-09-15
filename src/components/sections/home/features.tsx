import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import StepVisual, { type StepVisualKind } from '@/components/ui/step-visual'
import Container from '../../container'
import {
  FeatureCard,
  FeatureCardContent,
  FeatureCardDescription,
  FeatureCardTitle
} from '../../ui/feature-card'

const cards: { id: number; title: string; description: string; visual: StepVisualKind }[] = [
  {
    id: 1,
    title: "Trouver un produit qui se vend déjà",
    description: "Tu n'inventes rien. Tu observes ce qui génère déjà de l'argent. Mais observer c'est pas scroller — il y a une grille de lecture. Sans elle, tu confonds ce qui a l'air de marcher avec ce qui marche vraiment.",
    visual: "niche",
  },
  {
    id: 2,
    title: "Créer le produit",
    description: "Format, structure, valeur perçue. Le client juge en 3 secondes avant même d'ouvrir. Il y a un seuil de qualité en dessous duquel tu vends pas — la plupart le découvrent trop tard.",
    visual: "avatar",
  },
  {
    id: 3,
    title: "Vendre avec un avatar",
    description: "Personnage, voix, synchro, codes de la niche. Un mauvais réglage sur une seule variable et le spectateur scroll. Sans que tu saches pourquoi.",
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
              3 étapes. Mais chacune a ses règles.
            </h2>
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
                  <p className="text-[11px] uppercase tracking-[0.18em] text-primary/80 mb-3">
                    Étape {index + 1}
                  </p>
                  <FeatureCardTitle>{card.title}</FeatureCardTitle>
                  <FeatureCardDescription>{card.description}</FeatureCardDescription>
                </FeatureCardContent>
                <div className="w-full md:order-2 flex justify-center">
                  <StepVisual kind={card.visual} />
                </div>
              </FeatureCard>
            </AnimateOnView>
          ))}
        </StaggerContainer>

        {/* Bloc de conclusion — traitement visuel fort */}
        <AnimateOnView blur className="relative z-20 max-w-[1062px] mx-auto">
          <div className="relative overflow-hidden rounded-[30px] border border-primary/40 bg-card/80 backdrop-blur-sm p-8 md:p-14 text-center">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--primary)/0.2),transparent_70%)]" />
            <div className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary/25 blur-3xl animate-glow-pulse" />

            <p className="relative h3">Chaque étape dépend de la précédente.</p>
            <p className="relative mt-5 text-body-md text-muted-foreground max-w-xl mx-auto">
              La niche décide l'avatar. L'avatar décide l'offre. L'offre décide le produit.
            </p>
            <p className="relative mt-6 inline-flex items-center rounded-full border border-primary/50 bg-primary/10 px-5 py-2.5 text-sm md:text-base font-semibold text-primary">
              Change une seule chose → tout est à refaire.
            </p>
          </div>
        </AnimateOnView>
      </Container>
    </section>
  )
}

export default Features
