import Container from '@/components/container'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { motion } from 'framer-motion'

const steps = [
  { id: 1, month: 'Mois 1', label: 'Niche validée, produit prêt, compte ouvert' },
  { id: 2, month: 'Mois 2', label: 'Les premières ventes tombent' },
  { id: 3, month: 'Mois 3', label: 'La machine tourne toute seule' },
  { id: 4, month: 'Mois 6', label: 'Tu démultiplies sur plusieurs comptes' },
]

const Trajectory = () => {
  return (
    <section className="py-14 md:py-24">
      <Container className="space-y-10 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2">À quoi ressemble ta progression, concrètement.</h2>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="relative max-w-[1062px] mx-auto">
          {/* ligne de trajectoire qui se trace au scroll */}
          <motion.span
            aria-hidden
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="absolute left-[15px] top-3 bottom-3 w-px origin-top bg-gradient-to-b from-primary via-primary/40 to-transparent md:hidden"
          />
          <motion.span
            aria-hidden
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, ease: 'easeOut' }}
            className="hidden md:block absolute left-0 right-0 top-[15px] h-px origin-left bg-gradient-to-r from-primary via-primary/40 to-transparent"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-5">
            {steps.map((step, index) => (
              <AnimateOnView
                key={step.id}
                delay={0.3 + index * 0.15}
                y={30}
                className="group relative pl-12 md:pl-0"
              >
                <motion.span
                  aria-hidden
                  animate={{ scale: [1, 1.18, 1] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut',
                    delay: index * 0.45,
                  }}
                  className="absolute left-0 top-1 md:relative md:top-0 md:mb-6 block w-8 h-8 rounded-full border border-primary/50 bg-background"
                >
                  <span className="absolute inset-[6px] rounded-full bg-primary" />
                  <span className="absolute inset-0 rounded-full bg-primary/30 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                </motion.span>
                <p className="text-[11px] uppercase tracking-[0.18em] text-primary/80">
                  {step.month}
                </p>
                <p className="mt-2 text-body-md text-foreground md:pr-6 transition-colors duration-300 group-hover:text-primary">
                  {step.label}
                </p>
              </AnimateOnView>
            ))}
          </div>
        </StaggerContainer>

        <AnimateOnView delay={0.2}>
          <p className="max-w-[1062px] mx-auto text-xs md:text-sm text-muted-foreground/80">
            * Résultats non garantis : ils varient selon la niche retenue, la quantité de contenu
            publiée et l'effort investi.
          </p>
        </AnimateOnView>
      </Container>
    </section>
  )
}

export default Trajectory
