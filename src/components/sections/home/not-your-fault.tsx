import Container from '@/components/container'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { Megaphone, PlaySquare, Puzzle } from 'lucide-react'

const reasons = [
  {
    id: 1,
    icon: Megaphone,
    title: 'Les gurus qui vendent du rêve',
    description:
      'Villa louée, "10k en 30 jours". Ils vendent la promesse, jamais le système. Tu payes, tu reçois du vent.',
  },
  {
    id: 2,
    icon: Puzzle,
    title: 'Le mythe de la simplicité',
    description:
      '"Fais un PDF et vends-le." C\'est ce qu\'on t\'a dit. Personne ne t\'a expliqué qu\'il y a six piliers derrière, et qu\'ils dépendent tous les uns des autres.',
  },
  {
    id: 3,
    icon: PlaySquare,
    title: "Les formations qui donnent l'info mais pas le cadre",
    description:
      'Tu reçois 40 vidéos. Personne regarde ce que tu produis. Personne te dit si ta niche est bonne avant que tu perdes 2 mois dessus.',
  },
]

const NotYourFault = () => {
  return (
    <section className="py-14 md:py-24">
      <Container className="space-y-10 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">Si t'as déjà échoué, c'est pas ta faute.</h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Voilà ce qui t'a vraiment fait perdre ton temps et ton argent.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {reasons.map((reason, index) => (
            <AnimateOnView key={reason.id} delay={index * 0.08} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-[28px] border border-border/60 bg-card/70 backdrop-blur-sm p-6 md:p-7 transition-transform duration-500 md:hover:-translate-y-1.5">
                <div className="pointer-events-none absolute -top-24 -right-16 h-52 w-52 rounded-full bg-primary/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  <reason.icon className="w-5 h-5 text-primary" />
                </div>

                <h3 className="relative h4 mt-5">{reason.title}</h3>
                <p className="relative mt-3 text-muted-foreground text-sm md:text-base leading-relaxed">
                  {reason.description}
                </p>
              </div>
            </AnimateOnView>
          ))}
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default NotYourFault
