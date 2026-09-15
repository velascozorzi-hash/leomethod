import Container from '@/components/container'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'

const MonthTwoWall = () => {
  return (
    <section className="relative w-full overflow-hidden py-20 md:py-32 border-y border-border/60">
      {/* traitement visuel fort : mur de briques + halo */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background via-card/60 to-background" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:linear-gradient(to_right,rgb(var(--foreground))_1px,transparent_1px),linear-gradient(to_bottom,rgb(var(--foreground))_1px,transparent_1px)] [background-size:120px_44px] [mask-image:linear-gradient(to_bottom,transparent,black_35%,black_65%,transparent)]" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[420px] w-[620px] rounded-full bg-destructive/15 blur-[120px] animate-glow-pulse" />

      <Container className="relative z-10">
        <StaggerContainer className="max-w-3xl mx-auto text-center">
          <AnimateOnView blur>
            <h2 className="h2 mb-8 md:mb-12">Le vrai mur, il arrive au mois 2.</h2>
          </AnimateOnView>

          <AnimateOnView blur delay={0.15}>
            <div className="rounded-2xl border border-border/60 bg-background/70 backdrop-blur-sm px-6 py-5 text-left md:text-center">
              <p className="text-body-md text-muted-foreground">
                <span className="font-semibold text-foreground">Mois 1 :</span> tu postes, t'es
                motivé, les vues montent.
              </p>
            </div>
          </AnimateOnView>

          <AnimateOnView blur delay={0.25}>
            <div className="mt-4 rounded-2xl border border-destructive/40 bg-background/70 backdrop-blur-sm px-6 py-5 text-left md:text-center">
              <p className="text-body-md text-muted-foreground">
                <span className="font-semibold text-foreground">Mois 2 :</span> les vues retombent,
                les ventes stagnent, tu doutes. Tu changes de niche. Tu recommences à zéro.
              </p>
            </div>
          </AnimateOnView>

          <AnimateOnView blur delay={0.35}>
            <p className="mt-10 md:mt-14 h1 text-destructive">90%</p>
            <p className="mt-2 text-body-lg font-medium text-foreground">
              s'arrêtent exactement là.
            </p>
          </AnimateOnView>

          <AnimateOnView blur delay={0.45}>
            <p className="mt-10 md:mt-12 text-body-md text-muted-foreground max-w-xl mx-auto">
              Ce mur n'a rien à voir avec la méthode. Il tombe quand personne n'est là pour te dire
              que c'est normal.
            </p>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default MonthTwoWall
