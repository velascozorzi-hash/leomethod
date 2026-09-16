import Container from '@/components/container'
import { AmbientBlob, AmbientFloat, AmbientSweep } from '@/components/ui/motion/ambient'
import { cardChild, growX, riseChild, spring, staggerParent, viewportOnce } from '@/components/ui/motion/springs'
import { motion } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

const Guarantee = () => {
  return (
    <section className="py-16 md:py-24">
      <Container>
        <motion.div
          variants={staggerParent(0.09)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          whileHover={{ y: -5 }}
          whileTap={{ scale: 0.99 }}
          transition={spring.snappy}
          className="group relative max-w-[720px] mx-auto overflow-hidden rounded-[30px] border border-primary/40 bg-card/70 backdrop-blur-sm px-6 py-10 md:p-12 text-center"
        >
          <AmbientBlob className="-top-28 left-1/2 h-64 w-64 -translate-x-1/2 bg-primary/25" duration={8} />
          <AmbientSweep duration={7} />

          {/* liseré qui se trace au scroll */}
          <motion.span
            aria-hidden
            variants={growX(1, 0.1)}
            className="pointer-events-none absolute left-0 top-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-primary via-primary/60 to-transparent will-change-transform"
          />

          <motion.div variants={cardChild} className="relative">
            <AmbientFloat className="inline-block" amplitude={7} duration={4.5}>
              <span className="relative inline-flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-gradient-to-br from-primary/30 to-primary/5">
                <motion.span
                  aria-hidden
                  animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute inset-0 rounded-2xl bg-primary/30 will-change-transform"
                />
                <ShieldCheck className="relative h-7 w-7 text-primary" />
              </span>
            </AmbientFloat>
          </motion.div>

          <motion.h2 variants={cardChild} className="relative h2 mt-6">
            Garantie 90 jours
          </motion.h2>

          <motion.p
            variants={riseChild}
            className="relative mt-4 text-body-lg font-medium text-foreground"
          >
            Le risque est de mon côté, pas du tien.
          </motion.p>

          <motion.p
            variants={riseChild}
            className="relative mx-auto mt-3 max-w-md text-body-md text-muted-foreground"
          >
            Tu appliques la méthode pendant 3 mois sans résultat ? Je te rends la totalité.
          </motion.p>

          {/* les 3 jalons de la garantie */}
          <motion.div
            variants={staggerParent(0.08)}
            className="relative mt-8 grid grid-cols-3 gap-2 sm:gap-3"
          >
            {['Tu appliques', "Tu n'obtiens rien", 'Je rembourse'].map((label, index) => (
              <motion.div
                key={label}
                variants={cardChild}
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                transition={spring.snappy}
                className="rounded-2xl border border-primary/25 bg-background/60 px-2 py-3 sm:px-4 sm:py-4"
              >
                <p className="text-[11px] uppercase tracking-[0.16em] text-primary/70">
                  0{index + 1}
                </p>
                <p className="mt-1.5 text-xs sm:text-sm font-medium text-foreground leading-snug">
                  {label}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}

export default Guarantee
