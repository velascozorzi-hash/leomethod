import Container from '@/components/container'
import ImagePlaceholder from '@/components/ui/image-placeholder'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const paragraphs = [
  "2023, 17 ans. Je me lance en e-commerce. 1 500€ évaporés.",
  "2025, je remets ça pour de bon, accompagnement payant à l'appui. 5 000€ de plus sur la pile.",
  "6 500€ envolés en deux tentatives. Les deux fois, je me suis dit que le problème venait de moi.",
  "Il venait pas de moi. C'est le modèle qui ne convient pas quand on part sans rien.",
  "Je suis passé aux produits digitaux. Tout s'est débloqué à partir de là.",
]

/**
 * Les deux visuels de la section.
 * Dépose les fichiers dans public/images/story/ sous ces noms exacts.
 * Tant qu'un fichier est absent, l'emplacement reste affiché en placeholder.
 */
const visuals = [
  {
    id: 'histoire-echec-ecommerce',
    src: '/images/story/echec-ecommerce.jpg',
    alt: "Tableau de bord e-commerce à zéro : aucune vente, aucune visite",
  },
  {
    id: 'histoire-accompagnement',
    src: '/images/story/accompagnement.jpg',
    alt: "Message d'arrivée dans un accompagnement payant",
  },
]

const StoryImage = ({ visual }: { visual: (typeof visuals)[number] }) => {
  // On n'affiche l'image qu'une fois qu'elle a réellement été décodée.
  // Tant que le fichier est absent, l'emplacement reste un placeholder propre
  // (un serveur SPA renvoie souvent index.html en 200 sur un fichier manquant,
  // ce qui ne déclenche pas d'erreur mais n'affiche rien non plus).
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const probe = new Image()
    probe.onload = () => setLoaded(true)
    probe.src = visual.src
    return () => {
      probe.onload = null
    }
  }, [visual.src])

  if (!loaded) return <ImagePlaceholder id={visual.id} ratio="4 / 5" />

  return (
    <motion.div
      whileHover={{ y: -8, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22 }}
      className="group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 shadow-[0_20px_50px_-30px_rgb(0_0_0/0.9)]"
    >
      <img
        src={visual.src}
        alt={visual.alt}
        loading="lazy"
        className="w-full aspect-[4/5] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
      />
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-4 text-left text-xs text-foreground/90 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
        {visual.alt}
      </span>
    </motion.div>
  )
}

const Story = () => {
  return (
    <section className="py-14 md:py-24">
      <Container className="space-y-10 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">J'ai occupé exactement ta place.</h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Sans un euro, sans expérience, et deux échecs avant que ça fasse tilt.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <StaggerContainer className="relative max-w-[520px] mx-auto lg:mx-0">
            <motion.span
              aria-hidden
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-primary via-primary/40 to-transparent"
            />
            <div className="space-y-6 pl-8">
              {paragraphs.map((paragraph, index) => (
                <AnimateOnView key={paragraph} delay={index * 0.12} y={30} className="relative">
                  <motion.span
                    aria-hidden
                    animate={{ scale: [1, 1.25, 1] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: index * 0.35,
                    }}
                    className="absolute -left-8 top-2 block w-[15px] h-[15px] rounded-full border border-primary/50 bg-background"
                  >
                    <span className="absolute inset-[3px] rounded-full bg-primary" />
                  </motion.span>
                  <p className="text-body-md text-muted-foreground">{paragraph}</p>
                </AnimateOnView>
              ))}
            </div>
          </StaggerContainer>

          <StaggerContainer className="grid grid-cols-2 gap-4">
            {visuals.map((visual, index) => (
              <AnimateOnView key={visual.id} delay={index * 0.15} scale y={40}>
                <StoryImage visual={visual} />
              </AnimateOnView>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  )
}

export default Story
