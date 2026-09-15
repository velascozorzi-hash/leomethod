import Container from '@/components/container'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { motion } from 'framer-motion'
import { Megaphone, PlaySquare, Puzzle } from 'lucide-react'

const reasons = [
  {
    id: 1,
    icon: Megaphone,
    title: 'Les gourous qui vendent du vent',
    description:
      'Villa de location, promesse de "10k en 30 jours". Ils te vendent le rêve et jamais la mécanique. Tu payes, tu repars les mains vides.',
  },
  {
    id: 2,
    icon: Puzzle,
    title: "L'illusion que c'est simple",
    description:
      '"Écris un PDF et vends-le", voilà le discours. Personne ne précise qu\'il y a six piliers derrière, et qu\'aucun ne tient sans les autres.',
  },
  {
    id: 3,
    icon: PlaySquare,
    title: "Les formations qui livrent l'info sans le cadre",
    description:
      "40 vidéos et puis plus rien. Aucun retour sur ce que tu produis. Aucun avertissement sur ta niche avant que tu y aies laissé 2 mois.",
  },
]

const NotYourFault = () => {
  return (
    <section className="py-14 md:py-24">
      <Container className="space-y-10 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">Tes échecs passés ne viennent pas de toi.</h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Voici ce qui t'a réellement coûté du temps et de l'argent.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
          {reasons.map((reason, index) => (
            <AnimateOnView key={reason.id} delay={index * 0.12} scale y={40} className="h-full">
              <div className="group relative h-full overflow-hidden rounded-[28px] border border-border/60 bg-card/70 backdrop-blur-sm p-6 md:p-7 transition-all duration-500 md:hover:-translate-y-2 md:hover:border-primary/50">
                <motion.div
                  aria-hidden
                  animate={{ opacity: [0.15, 0.4, 0.15] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: index * 0.7 }}
                  className="pointer-events-none absolute -top-24 -right-16 h-52 w-52 rounded-full bg-primary/25 blur-3xl"
                />

                <motion.div
                  aria-hidden
                  animate={{ rotate: [0, 4, 0, -4, 0] }}
                  transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: index * 0.5 }}
                  className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                >
                  <reason.icon className="w-5 h-5 text-primary" />
                </motion.div>

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
