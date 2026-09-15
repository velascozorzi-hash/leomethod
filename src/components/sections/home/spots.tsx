import Container from '@/components/container'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { motion } from 'framer-motion'

const TOTAL_SPOTS = '20'
const TAKEN_SPOTS = '11'

const Spots = () => {
  return (
    <section className="py-14 md:py-24">
      <Container>
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-8 mb-6">{TOTAL_SPOTS} places chaque mois, pas une de plus.</h2>
          </AnimateOnView>

          <AnimateOnView blur delay={0.15} scale>
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="relative inline-flex items-baseline gap-2 rounded-2xl border border-primary/40 bg-primary/10 px-8 py-5"
            >
              <motion.span
                aria-hidden
                animate={{ opacity: [0.4, 0.9, 0.4] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="pointer-events-none absolute inset-0 rounded-2xl bg-primary/15 blur-xl"
              />
              <span className="relative text-4xl md:text-5xl font-medium text-primary leading-none">
                {TAKEN_SPOTS}
              </span>
              <span className="relative text-2xl md:text-3xl text-primary/50 leading-none">/</span>
              <span className="relative text-2xl md:text-3xl text-primary/70 leading-none">
                {TOTAL_SPOTS}
              </span>
            </motion.div>
          </AnimateOnView>

          <AnimateOnView blur delay={0.25}>
            <p className="mt-8 text-muted-foreground">
              Les validations et les réponses passent par moi. Ni stagiaire, ni robot.
            </p>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Spots
