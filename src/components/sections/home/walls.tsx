import Container from '@/components/container'
import { AmbientBlob, AmbientFloat } from '@/components/ui/motion/ambient'
import { cardChild, spring, staggerParent, viewportOnce } from '@/components/ui/motion/springs'
import { motion } from 'framer-motion'
import { Banknote, CalendarClock, Layers3, PieChart } from 'lucide-react'

const walls = [
  {
    id: 1,
    icon: Banknote,
    title: 'Tester UN seul produit coûte 500 à 2000€',
    description:
      "Cet argent ne te rapporte rien : il sert uniquement à savoir si le produit tient la route. Et la majorité des tests finissent dans le rouge.",
  },
  {
    id: 2,
    icon: Layers3,
    title: "Quatre métiers à assumer d'un coup",
    description:
      "Acheteur, publicitaire, logisticien, service client. Quatre casquettes, quatre séries d'indicateurs à maîtriser. Et c'est ton argent qui paie ta formation sur chacune.",
  },
  {
    id: 3,
    icon: PieChart,
    title: 'Sur 100€ encaissés, tu en gardes 20',
    description:
      "Le reste part en fournisseur, en publicité, en commissions et en remboursements. Sans compter les 500€ de pub avancés pour déclencher ces 100€.",
  },
  {
    id: 4,
    icon: CalendarClock,
    title: 'La rentabilité arrive entre 6 et 12 mois',
    description:
      "Sur son premier semestre, un débutant perd de l'argent. Beaucoup jettent l'éponge avant, trésorerie à sec.",
  },
]

const Walls = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      {/* traitement visuel fort : halo + grille qui dérive */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--primary)/0.18),transparent_60%)]" />
      <motion.div
        aria-hidden
        animate={{ backgroundPosition: ['0px 0px', '56px 56px'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgb(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--foreground))_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <Container className="relative z-10 space-y-10 md:space-y-16">
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.h2 variants={cardChild} className="h2 md:mb-5 mb-3">
            Ce qui fait tomber 95% des débutants en e-commerce
          </motion.h2>
          <motion.p variants={cardChild} className="text-muted-foreground">
            Quatre obstacles qui se dressent avant même ta première vente.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerParent(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
        >
          {walls.map((wall, index) => (
            <motion.div
              key={wall.id}
              variants={cardChild}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.985 }}
              transition={spring.snappy}
              className="group relative h-full overflow-hidden rounded-[28px] border border-primary/25 bg-card/70 backdrop-blur-sm p-5 md:p-8"
            >
              <AmbientBlob
                className="-top-24 -right-16 h-52 w-52 bg-primary/22"
                duration={6.5}
                delay={index * 0.6}
              />
              <span className="pointer-events-none absolute -bottom-5 right-2 select-none text-[72px] md:text-[90px] font-semibold leading-none text-primary/10 transition-all duration-300 group-hover:text-primary/20">
                {String(index + 1).padStart(2, '0')}
              </span>

              <AmbientFloat amplitude={5} duration={4} delay={index * 0.4} className="relative w-fit">
                <span className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/25 to-primary/5">
                  <wall.icon className="h-5 w-5 text-primary" />
                </span>
              </AmbientFloat>

              <h3 className="relative h4 mt-4 md:mt-5">{wall.title}</h3>
              <p className="relative mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                {wall.description}
              </p>

              <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default Walls
