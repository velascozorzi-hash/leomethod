import Container from '@/components/container'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { motion } from 'framer-motion'
import { Infinity as InfinityIcon, EyeOff, Percent, Wallet } from 'lucide-react'

const blocks = [
  {
    id: 1,
    icon: InfinityIcon,
    title: 'Un seul travail de création, des ventes illimitées',
    description:
      "Rien à stocker, rien à expédier, aucun fournisseur à gérer. Le paiement passe, la livraison est immédiate.",
  },
  {
    id: 2,
    icon: Percent,
    title: 'Une marge proche de 100%',
    description:
      "Fabrication : 0€. Diffusion : 0€. La plateforme ne te coûte rien. Sur une vente à 19€, tu encaisses 18€.",
  },
  {
    id: 3,
    icon: Wallet,
    title: 'Démarrer ne coûte rien',
    description:
      "Aucune pub à financer, aucun abonnement, aucun fournisseur à payer. Un téléphone et un cadre de travail suffisent.",
  },
  {
    id: 4,
    icon: EyeOff,
    title: 'Ni caméra, ni visage',
    description:
      "Les avatars IA portent l'intégralité de ton contenu. Tu publies d'où tu veux sans jamais apparaître.",
  },
]

const Inverse = () => {
  return (
    <section className="relative overflow-hidden py-14 md:py-24">
      <motion.div
        aria-hidden
        animate={{ opacity: [0.7, 1, 0.7], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--primary)/0.14),transparent_65%)]"
      />

      <Container className="relative z-10 space-y-10 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">
              Le digital fonctionne exactement à l'envers.
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Aucune mise de départ, une marge maximale, zéro logistique.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {blocks.map((block, index) => (
            <AnimateOnView key={block.id} delay={index * 0.1} scale y={40} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-[28px] border border-primary/25 bg-card/70 backdrop-blur-sm p-6 md:p-8 transition-all duration-500 md:hover:-translate-y-2 md:hover:border-primary/60">
                <motion.div
                  aria-hidden
                  animate={{ opacity: [0.2, 0.5, 0.2], x: [0, 12, 0] }}
                  transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
                  className="pointer-events-none absolute -top-24 -left-16 h-52 w-52 rounded-full bg-primary/25 blur-3xl"
                />

                <div className="relative flex items-center gap-4">
                  <motion.div
                    aria-hidden
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: index * 0.3 }}
                    className="relative shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3"
                  >
                    <block.icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <h3 className="h4">{block.title}</h3>
                </div>

                <p className="relative mt-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                  {block.description}
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

export default Inverse
