import Container from '@/components/container'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'

const steps = [
  { id: 1, month: 'Mois 1', label: 'Niche validée, produit créé, compte lancé' },
  { id: 2, month: 'Mois 2', label: 'Tes premières ventes' },
  { id: 3, month: 'Mois 3', label: 'Un système qui tourne' },
  { id: 4, month: 'Mois 6', label: 'Tu scales sur plusieurs comptes' },
]

const Trajectory = () => {
  return (
    <section className="py-14 md:py-24">
      <Container className="space-y-10 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2">Voilà ta trajectoire réaliste.</h2>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="relative max-w-[1062px] mx-auto">
          {/* ligne de trajectoire */}
          <span className="absolute left-[15px] top-3 bottom-3 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent md:hidden" />
          <span className="hidden md:block absolute left-0 right-0 top-[15px] h-px bg-gradient-to-r from-primary via-primary/40 to-transparent" />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-5">
            {steps.map((step, index) => (
              <AnimateOnView key={step.id} delay={index * 0.12} className="relative pl-12 md:pl-0">
                <span className="absolute left-0 top-1 md:relative md:top-0 md:mb-6 block w-8 h-8 rounded-full border border-primary/50 bg-background">
                  <span className="absolute inset-[6px] rounded-full bg-primary" />
                </span>
                <p className="text-[11px] uppercase tracking-[0.18em] text-primary/80">
                  {step.month}
                </p>
                <p className="mt-2 text-body-md text-foreground md:pr-6">{step.label}</p>
              </AnimateOnView>
            ))}
          </div>
        </StaggerContainer>

        <AnimateOnView delay={0.2}>
          <p className="max-w-[1062px] mx-auto text-xs md:text-sm text-muted-foreground/80">
            * Résultats non garantis : dépendent de la niche choisie, du volume de contenu produit et
            du travail fourni.
          </p>
        </AnimateOnView>
      </Container>
    </section>
  )
}

export default Trajectory
