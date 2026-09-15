import Container from '@/components/container'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { ShieldCheck } from 'lucide-react'

const Guarantee = () => {
  return (
    <section className="py-14 md:py-24">
      <Container>
        <StaggerContainer className="relative max-w-[720px] mx-auto overflow-hidden rounded-[30px] border border-primary/40 bg-card/70 backdrop-blur-sm p-8 md:p-12 text-center">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--primary)/0.18),transparent_70%)]" />

          <AnimateOnView blur>
            <span className="relative inline-flex w-14 h-14 items-center justify-center rounded-2xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/30">
              <ShieldCheck className="w-6 h-6 text-primary" />
            </span>
          </AnimateOnView>

          <AnimateOnView blur delay={0.1}>
            <h2 className="relative h2 mt-6">Garantie 90 jours</h2>
          </AnimateOnView>

          <AnimateOnView blur delay={0.2}>
            <p className="relative mt-5 text-body-lg font-medium text-foreground">
              Le risque, c'est moi qui le prends. Pas toi.
            </p>
          </AnimateOnView>

          <AnimateOnView blur delay={0.3}>
            <p className="relative mt-4 text-body-md text-muted-foreground">
              Si tu ne fais pas de résultats en 3 mois en appliquant la méthode, je te rembourse
              intégralement.
            </p>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Guarantee
