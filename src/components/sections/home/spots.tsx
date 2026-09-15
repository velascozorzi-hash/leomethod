import Container from '@/components/container'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'

/* [X] = placeholders à remplir */
const TOTAL_SPOTS = '[X]'
const TAKEN_SPOTS = '[X]'

const Spots = () => {
  return (
    <section className="py-14 md:py-24">
      <Container>
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-8 mb-6">{TOTAL_SPOTS} places par mois. Pas plus.</h2>
          </AnimateOnView>

          <AnimateOnView blur delay={0.15}>
            <div className="inline-flex items-baseline gap-2 rounded-2xl border border-primary/40 bg-primary/10 px-8 py-5">
              <span className="text-4xl md:text-5xl font-medium text-primary leading-none">
                {TAKEN_SPOTS}
              </span>
              <span className="text-2xl md:text-3xl text-primary/50 leading-none">/</span>
              <span className="text-2xl md:text-3xl text-primary/70 leading-none">
                {TOTAL_SPOTS}
              </span>
            </div>
          </AnimateOnView>

          <AnimateOnView blur delay={0.25}>
            <p className="mt-8 text-muted-foreground">
              Parce que c'est moi qui valide et c'est moi qui réponds. Pas un stagiaire, pas un
              chatbot.
            </p>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Spots
