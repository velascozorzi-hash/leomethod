import Container from '@/components/container'
import ImagePlaceholder from '@/components/ui/image-placeholder'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { Check } from 'lucide-react'

const items = [
  'Ta niche validée avant que tu produises quoi que ce soit',
  'Ta sous-niche validée',
  'Ton produit validé avant publication',
  'Ton prix validé avant mise en vente',
]

/* PLACEHOLDERS — captures de conversations */
const conversations = [
  'validation-conversation-1',
  'validation-conversation-2',
  'validation-conversation-3',
  'validation-conversation-4',
  'validation-conversation-5',
  'validation-conversation-6',
]

const Validations = () => {
  return (
    <section className="relative overflow-hidden py-20 md:py-28 border-y border-primary/25">
      {/* traitement visuel fort */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgb(var(--primary)/0.22),transparent_60%)]" />
      <div className="pointer-events-none absolute -bottom-32 left-1/2 -translate-x-1/2 h-[380px] w-[620px] rounded-full bg-primary/15 blur-[120px] animate-glow-pulse" />

      <Container className="relative z-10 space-y-10 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2">Tu lances rien sans mon feu vert.</h2>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-[900px] mx-auto">
          {items.map((item, index) => (
            <AnimateOnView key={item} delay={index * 0.1} className="h-full">
              <div className="group flex h-full items-start gap-4 rounded-2xl border border-primary/30 bg-card/70 backdrop-blur-sm p-5 md:p-6 transition-transform duration-500 md:hover:-translate-y-1">
                <span className="shrink-0 mt-0.5 flex w-7 h-7 items-center justify-center rounded-full bg-primary/15 border border-primary/50 transition-transform duration-500 group-hover:scale-110">
                  <Check className="w-4 h-4 text-primary" />
                </span>
                <p className="text-body-sm md:text-body-md text-foreground">{item}</p>
              </div>
            </AnimateOnView>
          ))}
        </StaggerContainer>

        <StaggerContainer className="text-center space-y-4">
          <AnimateOnView blur>
            <p className="inline-flex items-center rounded-full border border-primary/50 bg-primary/10 px-6 py-3 text-base md:text-lg font-semibold text-primary">
              Réponse sous 12h. C'est moi, pas un assistant.
            </p>
          </AnimateOnView>
          <AnimateOnView blur delay={0.15}>
            <p className="text-muted-foreground">Quatre points où 90% se plantent seuls.</p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-[1062px] mx-auto">
          {conversations.map((id, index) => (
            <AnimateOnView key={id} delay={(index % 3) * 0.1}>
              <ImagePlaceholder id={id} ratio="3 / 4" />
            </AnimateOnView>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Validations
