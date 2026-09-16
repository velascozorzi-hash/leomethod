import Container from '@/components/container'
import { AmbientBlob, AmbientFloat } from '@/components/ui/motion/ambient'
import { cardChild, spring, staggerParent, viewportOnce } from '@/components/ui/motion/springs'
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
    <section className="relative overflow-hidden py-16 md:py-24">
      <AmbientBlob className="top-10 right-1/3 h-72 w-72 bg-primary/12" duration={12} />

      <Container className="relative z-10 space-y-10 md:space-y-16">
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.h2 variants={cardChild} className="h2 md:mb-5 mb-3">
            Tes échecs passés ne viennent pas de toi.
          </motion.h2>
          <motion.p variants={cardChild} className="text-muted-foreground">
            Voici ce qui t'a réellement coûté du temps et de l'argent.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5"
        >
          {reasons.map((reason, index) => (
            <motion.div
              key={reason.id}
              variants={cardChild}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.985 }}
              transition={spring.snappy}
              className="group relative h-full overflow-hidden rounded-[28px] border border-border/60 bg-card/70 backdrop-blur-sm p-5 md:p-7"
            >
              <AmbientBlob
                className="-top-24 -right-16 h-52 w-52 bg-primary/20"
                duration={6}
                delay={index * 0.7}
              />

              <AmbientFloat amplitude={5} duration={4.2} delay={index * 0.35} className="relative w-fit">
                <span className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/25 to-primary/5">
                  <reason.icon className="h-5 w-5 text-primary" />
                </span>
              </AmbientFloat>

              <h3 className="relative h4 mt-4 md:mt-5">{reason.title}</h3>
              <p className="relative mt-3 text-sm md:text-base leading-relaxed text-muted-foreground">
                {reason.description}
              </p>

              <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default NotYourFault
