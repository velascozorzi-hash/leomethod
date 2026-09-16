import Container from '@/components/container'
import { AmbientPulse } from '@/components/ui/motion/ambient'
import { cardChild, spring, staggerParent, viewportOnce } from '@/components/ui/motion/springs'
import ImagePlaceholder from '@/components/ui/image-placeholder'
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
 * Les deux visuels de la section, dans leurs proportions réelles.
 * Fichiers : public/images/story/
 */
const visuals = [
  {
    id: 'histoire-echec-ecommerce',
    src: '/images/story/echec-ecommerce.jpg',
    alt: 'Mon tableau de bord e-commerce : 0,00 € de ventes, 0 visite, 0 commande',
    caption: 'Janvier 2025 — tout à zéro',
    ratio: '1600 / 1050',
    className: 'w-full',
  },
  {
    id: 'histoire-accompagnement',
    src: '/images/story/accompagnement.jpg',
    alt: "Mon message d'arrivée dans un accompagnement payant",
    caption: "L'accompagnement payant à 5 000€",
    ratio: '900 / 824',
    className: 'w-[82%] ml-auto',
  },
]

type Visual = (typeof visuals)[number]

const StoryImage = ({ visual, index }: { visual: Visual; index: number }) => {
  // L'image n'est affichée qu'une fois réellement décodée : si le fichier
  // manque, l'emplacement reste un placeholder propre au lieu d'un cadre vide.
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const probe = new Image()
    probe.onload = () => setLoaded(true)
    probe.src = visual.src
    return () => {
      probe.onload = null
    }
  }, [visual.src])

  if (!loaded) {
    return (
      <div className={visual.className}>
        <ImagePlaceholder id={visual.id} ratio={visual.ratio} />
      </div>
    )
  }

  return (
    <motion.figure
      variants={cardChild}
      whileHover={{ y: -6, rotate: index === 0 ? -0.6 : 0.6 }}
      whileTap={{ scale: 0.985 }}
      transition={spring.snappy}
      className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-card/50 shadow-[0_24px_60px_-32px_rgb(0_0_0/0.95)] ${visual.className}`}
    >
      <img
        src={visual.src}
        alt={visual.alt}
        loading="lazy"
        style={{ aspectRatio: visual.ratio }}
        className="w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
      />
      <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/80 to-transparent px-4 pb-3 pt-10 text-left text-[11px] md:text-xs font-medium text-foreground/90">
        {visual.caption}
      </figcaption>
    </motion.figure>
  )
}

const Story = () => {
  return (
    <section className="py-16 md:py-24">
      <Container className="space-y-10 md:space-y-16">
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.h2 variants={cardChild} className="h2 md:mb-5 mb-3">
            J'ai occupé exactement ta place.
          </motion.h2>
          <motion.p variants={cardChild} className="text-muted-foreground">
            Sans un euro, sans expérience, et deux échecs avant que ça fasse tilt.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <motion.div
            variants={staggerParent(0.09)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="relative max-w-[520px] mx-auto lg:mx-0 w-full"
          >
            <motion.span
              aria-hidden
              variants={{
                hidden: { scaleY: 0 },
                visible: { scaleY: 1, transition: { ...spring.heavy, delay: 0.1 } },
              }}
              className="absolute left-[7px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-primary via-primary/40 to-transparent will-change-transform"
            />
            <div className="space-y-5 md:space-y-6 pl-8">
              {paragraphs.map((paragraph, index) => (
                <motion.div key={paragraph} variants={cardChild} className="relative">
                  <span className="absolute -left-8 top-2 flex h-[15px] w-[15px] items-center justify-center rounded-full border border-primary/50 bg-background">
                    <AmbientPulse delay={index * 0.4} />
                    <span className="relative block h-[7px] w-[7px] rounded-full bg-primary" />
                  </span>
                  <p className="text-body-md text-muted-foreground">{paragraph}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={staggerParent(0.12)}
            initial="hidden"
            whileInView="visible"
            viewport={viewportOnce}
            className="mx-auto w-full max-w-[520px] space-y-4 lg:mx-0"
          >
            {visuals.map((visual, index) => (
              <StoryImage key={visual.id} visual={visual} index={index} />
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  )
}

export default Story
