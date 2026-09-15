import Container from '@/components/container'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { Banknote, CalendarClock, Layers3, PieChart } from 'lucide-react'

const walls = [
  {
    id: 1,
    icon: Banknote,
    title: '500 à 2000€ pour tester UN produit',
    description:
      'Pas pour vendre. Juste pour savoir si ça marche. Et la plupart des tests sont perdants.',
  },
  {
    id: 2,
    icon: Layers3,
    title: 'Tu exerces 4 métiers en même temps',
    description:
      'Acheteur, publicitaire, logisticien, SAV. Chacun avec ses propres métriques. Et tu les apprends tous les 4 avec ton propre argent.',
  },
  {
    id: 3,
    icon: PieChart,
    title: 'Sur 100€ de vente, il te reste 20€',
    description:
      "Fournisseur, pub, plateforme, remboursements. Et t'as avancé 500€ de pub pour générer ces 100€.",
  },
  {
    id: 4,
    icon: CalendarClock,
    title: "6 à 12 mois avant d'être rentable",
    description:
      'Le ROI d\'un débutant sur ses 6 premiers mois est négatif. La plupart lâchent avant, cash grillé.',
  },
]

const Walls = () => {
  return (
    <section className="relative overflow-hidden py-14 md:py-24">
      {/* traitement visuel fort : halo rouge + grille */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--destructive)/0.18),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.07] [background-image:linear-gradient(to_right,rgb(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--foreground))_1px,transparent_1px)] [background-size:56px_56px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      <Container className="relative z-10 space-y-10 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">
              Pourquoi 95% des débutants se plantent en e-commerce
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Voilà les 4 murs, avant même ta première vente.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
          {walls.map((wall, index) => (
            <AnimateOnView key={wall.id} delay={index * 0.08} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-[28px] border border-destructive/25 bg-card/70 backdrop-blur-sm p-6 md:p-8 transition-transform duration-500 md:hover:-translate-y-1.5">
                <div className="pointer-events-none absolute -top-24 -right-16 h-52 w-52 rounded-full bg-destructive/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="pointer-events-none absolute -bottom-6 right-2 text-[90px] leading-none font-semibold text-destructive/10 transition-all duration-500 group-hover:text-destructive/20 select-none">
                  {String(index + 1).padStart(2, '0')}
                </span>

                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-destructive/25 to-destructive/5 border border-destructive/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <wall.icon className="w-5 h-5 text-destructive" />
                </div>

                <h3 className="relative h4 mt-5">{wall.title}</h3>
                <p className="relative mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
                  {wall.description}
                </p>

                <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-destructive/50 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </div>
            </AnimateOnView>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Walls
