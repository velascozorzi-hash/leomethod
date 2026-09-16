import Container from '@/components/container'
import { AmbientBlob, AmbientPulse } from '@/components/ui/motion/ambient'
import { cardChild, growX, riseChild, spring, staggerParent, viewportOnce } from '@/components/ui/motion/springs'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'

const TOTAL_SPOTS = 20
const TAKEN_SPOTS = 11
const REMAINING = TOTAL_SPOTS - TAKEN_SPOTS

const Spots = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <AmbientBlob className="top-1/4 left-1/2 h-80 w-80 -translate-x-1/2 bg-primary/12" duration={10} />

      <Container>
        <motion.div
          variants={staggerParent(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="relative z-10 mx-auto max-w-[620px] text-center"
        >
          {/* badge de statut vivant */}
          <motion.div variants={cardChild}>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.16em] text-primary">
              <span className="relative flex h-2 w-2">
                <AmbientPulse />
                <span className="relative block h-2 w-2 rounded-full bg-primary" />
              </span>
              Promotion en cours
            </span>
          </motion.div>

          <motion.h2 variants={cardChild} className="h2 mt-6">
            {TOTAL_SPOTS} places chaque mois, pas une de plus.
          </motion.h2>

          {/* compteur animé + jauge */}
          <motion.div
            variants={cardChild}
            whileHover={{ y: -4 }}
            whileTap={{ scale: 0.98 }}
            transition={spring.snappy}
            className="relative mt-8 overflow-hidden rounded-[26px] border border-primary/30 bg-card/70 p-6 md:p-8 backdrop-blur-sm"
          >
            <div className="flex items-end justify-center gap-2">
              <span className="text-5xl md:text-6xl font-medium leading-none text-primary tabular-nums">
                <CountUp end={TAKEN_SPOTS} duration={1.6} enableScrollSpy scrollSpyOnce />
              </span>
              <span className="pb-1 text-2xl md:text-3xl leading-none text-primary/40">/</span>
              <span className="pb-1 text-2xl md:text-3xl leading-none text-primary/70 tabular-nums">
                {TOTAL_SPOTS}
              </span>
            </div>

            <div className="mt-5 h-2 w-full overflow-hidden rounded-full bg-background/80">
              <motion.div
                variants={growX(TAKEN_SPOTS / TOTAL_SPOTS, 0.2)}
                className="h-full w-full origin-left rounded-full bg-gradient-to-r from-primary/60 to-primary will-change-transform"
              />
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{REMAINING} places</span> encore
              disponibles ce mois-ci
            </p>
          </motion.div>

          <motion.p variants={riseChild} className="mt-8 text-muted-foreground">
            Les validations et les réponses passent par moi. Ni stagiaire, ni robot.
          </motion.p>
        </motion.div>
      </Container>
    </section>
  )
}

export default Spots
