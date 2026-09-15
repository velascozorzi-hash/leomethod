import Container from '@/components/container'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const MonthTwoWall = () => {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const bricksY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const haloScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.15, 0.7])

  return (
    <section
      ref={ref}
      className="relative w-full overflow-hidden py-20 md:py-32 border-y border-primary/25"
    >
      {/* traitement visuel fort : mur de briques en parallaxe + halo violet */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-card/60 to-background" />
      <motion.div
        aria-hidden
        style={{ y: bricksY }}
        className="pointer-events-none absolute -inset-y-16 inset-x-0 opacity-[0.14] [background-image:linear-gradient(to_right,rgb(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--foreground))_1px,transparent_1px)] [background-size:120px_44px] [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_65%,transparent)]"
      />
      <motion.div
        aria-hidden
        style={{ scale: haloScale }}
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[620px] rounded-full bg-primary/20 blur-[120px] animate-glow-pulse"
      />

      <Container className="relative z-10">
        <StaggerContainer className="max-w-3xl mx-auto text-center">
          <AnimateOnView blur>
            <h2 className="h2 mb-8 md:mb-12">Le vrai obstacle surgit au deuxième mois.</h2>
          </AnimateOnView>

          <AnimateOnView blur delay={0.15} y={30}>
            <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm px-6 py-5 text-left md:text-center transition-colors duration-500 hover:border-primary/40">
              <p className="text-body-md text-muted-foreground">
                <span className="font-semibold text-foreground">Mois 1 :</span> tu publies, l'énergie
                est là, les vues grimpent.
              </p>
            </div>
          </AnimateOnView>

          <AnimateOnView blur delay={0.25} y={30}>
            <div className="mt-4 rounded-2xl border border-primary/40 bg-background/70 backdrop-blur-sm px-6 py-5 text-left md:text-center transition-colors duration-500 hover:border-primary/70">
              <p className="text-body-md text-muted-foreground">
                <span className="font-semibold text-foreground">Mois 2 :</span> les vues
                s'effondrent, les ventes plafonnent, le doute s'installe. Tu bascules sur une autre
                niche. Et tu repars de zéro.
              </p>
            </div>
          </AnimateOnView>

          <AnimateOnView blur delay={0.35} scale y={30}>
            <motion.p
              animate={{ opacity: [0.75, 1, 0.75] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="mt-10 md:mt-14 h1 text-primary"
            >
              90%
            </motion.p>
            <p className="mt-2 text-body-lg font-medium text-foreground">
              abandonnent précisément à ce moment-là.
            </p>
          </AnimateOnView>

          <AnimateOnView blur delay={0.45}>
            <p className="mt-10 md:mt-12 text-body-md text-muted-foreground max-w-xl mx-auto">
              Cet obstacle n'a rien à voir avec la méthode. Il t'arrête faute de quelqu'un pour te
              confirmer que cette phase est normale.
            </p>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default MonthTwoWall
