import Container from '@/components/container'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { Infinity as InfinityIcon, EyeOff, Percent, Wallet } from 'lucide-react'

const blocks = [
  {
    id: 1,
    icon: InfinityIcon,
    title: "Tu crées une fois, tu vends à l'infini",
    description:
      'Pas de stock, pas de livraison, pas de fournisseur. Le client paie, il reçoit instantanément.',
  },
  {
    id: 2,
    icon: Percent,
    title: 'Marge quasi 100%',
    description:
      'Production 0€. Diffusion 0€. Plateforme gratuite. Tu vends à 19€, tu gardes 18€.',
  },
  {
    id: 3,
    icon: Wallet,
    title: '0€ pour démarrer',
    description:
      "Pas de budget pub, pas d'abonnement, pas de fournisseur. Un téléphone et une méthode.",
  },
  {
    id: 4,
    icon: EyeOff,
    title: 'Zéro caméra, zéro visage',
    description:
      'Tout le contenu passe par des avatars IA. Tu postes de n\'importe où, sans jamais te montrer.',
  },
]

const Inverse = () => {
  return (
    <section className="relative overflow-hidden py-14 md:py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgb(var(--primary)/0.14),transparent_65%)]" />

      <Container className="relative z-10 space-y-10 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">
              Les produits digitaux, c'est l'exact inverse.
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Zéro capital, marge maximale, aucune logistique.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {blocks.map((block, index) => (
            <AnimateOnView key={block.id} delay={index * 0.08} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-[28px] border border-primary/25 bg-card/70 backdrop-blur-sm p-6 md:p-8 transition-transform duration-500 md:hover:-translate-y-1.5">
                <div className="pointer-events-none absolute -top-24 -left-16 h-52 w-52 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative flex items-center gap-4">
                  <div className="relative shrink-0 w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">
                    <block.icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="h4">{block.title}</h3>
                </div>

                <p className="relative mt-4 text-muted-foreground text-sm md:text-base leading-relaxed">
                  {block.description}
                </p>
              </div>
            </AnimateOnView>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Inverse
