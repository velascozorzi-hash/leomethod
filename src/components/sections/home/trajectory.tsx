import Container from '@/components/container'
import { AmbientBlob, AmbientPulse } from '@/components/ui/motion/ambient'
import {
  cardChild,
  spring,
  staggerParent,
  viewportOnce,
} from '@/components/ui/motion/springs'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { useRef } from 'react'

const steps = [
  {
    id: 1,
    month: 'Mois 1',
    label: 'Niche validée, produit prêt, compte lancé',
    amount: '1 000 à 2 000€',
  },
  {
    id: 2,
    month: 'Mois 2',
    label: 'Le système est rodé, tu publies sans réfléchir',
    amount: '2 000 à 4 000€',
  },
  {
    id: 3,
    month: 'Mois 3',
    label: 'La machine tourne toute seule',
    amount: '4 000 à 6 000€',
  },
  {
    id: 4,
    month: 'Mois 6',
    label: 'Plusieurs comptes en parallèle, tu changes d\'échelle',
    amount: 'Tu démultiplies',
  },
]

const Trajectory = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 85%', 'end 55%'],
  })
  // la ligne se remplit au rythme du scroll, lissée par un ressort
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 })
  const lineScale = useTransform(progress, [0, 1], [0, 1])

  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <AmbientBlob className="-top-24 left-1/4 h-72 w-72 bg-primary/15" duration={11} />
      <AmbientBlob className="bottom-0 right-1/4 h-64 w-64 bg-primary/10" duration={13} delay={1.5} />

      <Container className="relative z-10 space-y-12 md:space-y-16">
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.h2 variants={cardChild} className="h2">
            À quoi ressemble ta progression, concrètement.
          </motion.h2>
        </motion.div>

        <motion.div
          ref={ref}
          variants={staggerParent(0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative max-w-[1062px] mx-auto"
        >
          {/* rail + ligne qui se remplit au scroll */}
          <span
            aria-hidden
            className="absolute left-[19px] top-4 bottom-4 w-[2px] rounded-full bg-border/60 md:hidden"
          />
          <motion.span
            aria-hidden
            style={{ scaleY: lineScale }}
            className="absolute left-[19px] top-4 bottom-4 w-[2px] origin-top rounded-full bg-gradient-to-b from-primary via-primary to-primary/30 md:hidden will-change-transform"
          />
          <span
            aria-hidden
            className="hidden md:block absolute left-0 right-0 top-[19px] h-[2px] rounded-full bg-border/60"
          />
          <motion.span
            aria-hidden
            style={{ scaleX: lineScale }}
            className="hidden md:block absolute left-0 right-0 top-[19px] h-[2px] origin-left rounded-full bg-gradient-to-r from-primary via-primary to-primary/30 will-change-transform"
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-5 md:gap-6">
            {steps.map((step, index) => (
              <motion.div
                key={step.id}
                variants={cardChild}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.985 }}
                transition={spring.snappy}
                className="group relative pl-14 md:pl-0"
              >
                {/* pastille */}
                <span className="absolute left-0 top-0 md:relative md:mb-6 flex h-10 w-10 items-center justify-center rounded-full border border-primary/50 bg-background">
                  <AmbientPulse delay={index * 0.5} />
                  <span className="relative block h-3 w-3 rounded-full bg-primary" />
                </span>

                <div className="rounded-2xl border border-border/60 bg-card/60 backdrop-blur-sm p-4 md:p-5 transition-colors duration-300 group-hover:border-primary/50">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-primary/80">
                    {step.month}
                  </p>
                  <p className="mt-2 text-base md:text-lg font-medium text-foreground leading-snug">
                    {step.amount}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground leading-snug">{step.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  )
}

export default Trajectory
