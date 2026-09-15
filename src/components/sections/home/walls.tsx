import Container from '@/components/container'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
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
    <section className="relative overflow-hidden py-14 md:py-24">
      {/* traitement visuel fort : halo + grille animée */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--primary)/0.18),transparent_60%)]" />
      <motion.div
        aria-hidden
        animate={{ backgroundPosition: ['0px 0px', '56px 56px'] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgb(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--foreground))_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]"
      />

      <Container className="relative z-10 space-y-10 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">
              Ce qui fait tomber 95% des débutants en e-commerce
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Quatre obstacles qui se dressent avant même ta première vente.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {walls.map((wall, index) => (
            <AnimateOnView
              key={wall.id}
              delay={index * 0.1}
              scale
              y={40}
              className="h-full"
            >
              <div className="group relative h-full overflow-hidden rounded-[28px] border border-primary/25 bg-card/70 backdrop-blur-sm p-6 md:p-8 transition-all duration-500 md:hover:-translate-y-2 md:hover:border-primary/60">
                <motion.div
                  aria-hidden
                  animate={{ opacity: [0.25, 0.55, 0.25], scale: [1, 1.15, 1] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.6 }}
                  className="pointer-events-none absolute -top-24 -right-16 h-52 w-52 rounded-full bg-primary/25 blur-3xl"
                />
                <span className="pointer-events-none absolute -bottom-6 right-2 text-[90px] leading-none font-semibold text-primary/10 transition-all duration-500 group-hover:text-primary/20 group-hover:-translate-y-1 select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <motion.div
                  aria-hidden
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
                  className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3"
                >
                  <wall.icon className="w-5 h-5 text-primary" />
                </motion.div>

                <h3 className="relative h4 mt-5">{wall.title}</h3>
                <p className="relative mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
                  {wall.description}
                </p>

                <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </AnimateOnView>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Walls
