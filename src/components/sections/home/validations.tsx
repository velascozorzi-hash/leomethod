import Container from '@/components/container'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

const items = [
  'Ta niche approuvée avant la moindre production',
  'Ta sous-niche approuvée',
  'Ton produit approuvé avant sa mise en ligne',
  'Ton tarif approuvé avant l\'ouverture des ventes',
]

const Validations = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 border-y border-primary/25">
      {/* traitement visuel fort */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--primary)/0.22),transparent_60%)]" />
      <motion.div
        aria-hidden
        animate={{ scale: [0.9, 1.1, 0.9], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-[380px] w-[620px] rounded-full bg-primary/15 blur-[120px]"
      />

      <Container className="relative z-10 space-y-10 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2">Rien ne part en ligne sans mon accord.</h2>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
          {items.map((item, index) => (
            <AnimateOnView key={item} delay={index * 0.12} y={30} scale className="h-full">
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-primary/30 bg-card/70 backdrop-blur-sm p-5 md:p-6 transition-all duration-500 md:hover:-translate-y-1.5 md:hover:border-primary/70">
                <motion.span
                  aria-hidden
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.35,
                  }}
                  className="shrink-0 mt-0.5 flex w-7 h-7 items-center justify-center rounded-full bg-primary/15 border border-primary/50"
                >
                  <Check className="w-4 h-4 text-primary" />
                </motion.span>
                <p className="text-body-sm md:text-body-md text-foreground">{item}</p>
              </div>
            </AnimateOnView>
          ))}
        </StaggerContainer>

        <StaggerContainer className="text-center space-y-4">
          <AnimateOnView blur scale>
            <motion.p
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex items-center rounded-full border border-primary/50 bg-primary/10 px-6 py-3 text-base md:text-lg font-semibold text-primary"
            >
              Je réponds en moins de 12h. Moi directement, pas un assistant.
            </motion.p>
          </AnimateOnView>
          <AnimateOnView blur delay={0.15}>
            <p className="text-muted-foreground">
              Quatre moments où 90% échouent quand ils sont livrés à eux-mêmes.
            </p>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Validations
