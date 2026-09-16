import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import StepVisual, { type StepVisualKind } from '@/components/ui/step-visual'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import Container from '../../container'
import {
  FeatureCard,
  FeatureCardContent,
  FeatureCardDescription,
  FeatureCardTitle
} from '../../ui/feature-card'

const cards: { id: number; title: string; description: string; visual: StepVisualKind }[] = [
  {
    id: 1,
    title: "Repérer un produit qui trouve déjà preneur",
    description: "Rien à inventer : tu regardes ce qui encaisse déjà. Sauf que regarder n'est pas scroller — ça demande une grille de lecture. Sans elle, tu prends l'illusion de traction pour de la traction.",
    visual: "niche",
  },
  {
    id: 2,
    title: "Fabriquer le produit",
    description: "Format, structure, valeur perçue. Le jugement se fait en 3 secondes, avant même l'ouverture. Sous un certain niveau de qualité, ça ne se vend pas — et beaucoup s'en aperçoivent trop tard.",
    visual: "avatar",
  },
  {
    id: 3,
    title: "Vendre via un avatar",
    description: "Personnage, voix, synchronisation, codes de la niche. Une seule variable mal réglée et le spectateur passe au suivant. Sans que tu comprennes pourquoi.",
    visual: "reseaux",
  }
]

const StepCard = ({ card, index }: { card: (typeof cards)[number]; index: number }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  // la carte respire en traversant l'écran
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.75, 1], [0.94, 1, 1, 0.96])
  const glow = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      style={{ scale }}
      className="md:sticky md:top-24 z-10 bg-background md:rounded-[30px] rounded-lg"
    >
      <motion.span
        aria-hidden
        style={{ opacity: glow }}
        className="pointer-events-none absolute -inset-x-6 -bottom-6 h-24 rounded-full bg-primary/20 blur-3xl"
      />

      <FeatureCard imagePosition="right" className="relative">
        {/* barre de progression de l'étape */}
        <motion.span
          aria-hidden
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: (index + 1) / cards.length }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.21, 0.47, 0.32, 0.98] }}
          className="pointer-events-none absolute left-0 top-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-primary to-primary/20"
        />

        <FeatureCardContent>
          <div className="mb-3 flex items-center gap-3">
            <motion.span
              aria-hidden
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: index * 0.4 }}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/40 bg-primary/10 text-sm font-medium text-primary"
            >
              {index + 1}
            </motion.span>
            <p className="text-[11px] uppercase tracking-[0.18em] text-primary/80">
              Étape {index + 1}
            </p>
          </div>
          <FeatureCardTitle>{card.title}</FeatureCardTitle>
          <FeatureCardDescription>{card.description}</FeatureCardDescription>
        </FeatureCardContent>

        <motion.div
          initial={{ opacity: 0, y: 40, rotate: index % 2 === 0 ? -2 : 2 }}
          whileInView={{ opacity: 1, y: 0, rotate: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98], delay: 0.15 }}
          className="w-full md:order-2 flex justify-center"
        >
          <StepVisual kind={card.visual} />
        </motion.div>
      </FeatureCard>
    </motion.div>
  )
}

const Features = () => {

  return (
    <section id="methode" className="py-12 md:py-[60px] bg-background">
      <Container className="space-y-8 md:space-y-20">
        <StaggerContainer className="text-center max-w-xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 mb-6">
              Trois étapes, et chacune obéit à ses propres règles.
            </h2>
          </AnimateOnView>
        </StaggerContainer>

        <div className='max-w-[1062px] mx-auto md:space-y-[60px] space-y-8'>
          {cards.map((card, index) => (
            <StepCard key={card.id} card={card} index={index} />
          ))}
        </div>

        {/* Bloc de conclusion — traitement visuel fort */}
        <AnimateOnView blur scale className="relative z-20 max-w-[1062px] mx-auto">
          <div className="relative overflow-hidden rounded-[30px] border border-primary/40 bg-card/80 backdrop-blur-sm p-8 md:p-14 text-center">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--primary)/0.2),transparent_70%)]" />
            <motion.div
              aria-hidden
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="pointer-events-none absolute -top-32 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full bg-primary/25 blur-3xl"
            />

            <p className="relative h3">Aucune étape ne tient sans celle d'avant.</p>
            <p className="relative mt-5 text-body-md text-muted-foreground max-w-xl mx-auto">
              C'est la niche qui impose l'avatar, l'avatar qui impose l'offre, l'offre qui impose le
              produit.
            </p>
            <motion.p
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
              className="relative mt-6 inline-flex items-center rounded-full border border-primary/50 bg-primary/10 px-5 py-2.5 text-sm md:text-base font-semibold text-primary"
            >
              Tu modifies un seul élément → tout le reste est à reprendre.
            </motion.p>
          </div>
        </AnimateOnView>
      </Container>
    </section>
  )
}

export default Features
