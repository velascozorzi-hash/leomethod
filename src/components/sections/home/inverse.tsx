import Container from '@/components/container'
import { AmbientBlob, AmbientFloat } from '@/components/ui/motion/ambient'
import { cardChild, spring, staggerParent, viewportOnce } from '@/components/ui/motion/springs'
import { motion } from 'framer-motion'
import { Infinity as InfinityIcon, EyeOff, Percent, Wallet } from 'lucide-react'

const blocks = [
  {
    id: 1,
    icon: InfinityIcon,
    title: 'Un seul travail de création, des ventes illimitées',
    description:
      "Rien à stocker, rien à expédier, aucun fournisseur à gérer. Le paiement passe, la livraison est immédiate.",
  },
  {
    id: 2,
    icon: Percent,
    title: 'Une marge proche de 100%',
    description:
      "Fabrication : 0€. Diffusion : 0€. La plateforme ne te coûte rien. Sur une vente à 19€, tu encaisses 18€.",
  },
  {
    id: 3,
    icon: Wallet,
    title: 'Démarrer ne coûte rien',
    description:
      "Aucune pub à financer, aucun abonnement, aucun fournisseur à payer. Un téléphone et un cadre de travail suffisent.",
  },
  {
    id: 4,
    icon: EyeOff,
    title: 'Ni caméra, ni visage',
    description:
      "Les avatars IA portent l'intégralité de ton contenu. Tu publies d'où tu veux sans jamais apparaître.",
  },
]

const Inverse = () => {
  return (
    <section className="relative overflow-hidden py-16 md:py-24">
      <AmbientBlob className="top-0 left-1/3 h-80 w-80 bg-primary/14" duration={11} />
      <AmbientBlob className="bottom-10 right-1/4 h-64 w-64 bg-primary/10" duration={13} delay={1.4} />

      <Container className="relative z-10 space-y-10 md:space-y-16">
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center max-w-2xl mx-auto"
        >
          <motion.h2 variants={cardChild} className="h2 md:mb-5 mb-3">
            Le digital fonctionne exactement à l'envers.
          </motion.h2>
          <motion.p variants={cardChild} className="text-muted-foreground">
            Aucune mise de départ, une marge maximale, zéro logistique.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerParent(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5"
        >
          {blocks.map((block, index) => (
            <motion.div
              key={block.id}
              variants={cardChild}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.985 }}
              transition={spring.snappy}
              className="group relative h-full overflow-hidden rounded-[28px] border border-primary/25 bg-card/70 backdrop-blur-sm p-5 md:p-8"
            >
              <AmbientBlob
                className="-top-24 -left-16 h-52 w-52 bg-primary/20"
                duration={7}
                delay={index * 0.5}
              />

              <div className="relative flex items-start gap-3.5 md:gap-4">
                <AmbientFloat amplitude={5} duration={4.5} delay={index * 0.3} className="shrink-0">
                  <span className="flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/25 to-primary/5">
                    <block.icon className="h-5 w-5 text-primary" />
                  </span>
                </AmbientFloat>
                <h3 className="h4 pt-1.5">{block.title}</h3>
              </div>

              <p className="relative mt-4 text-sm md:text-base leading-relaxed text-muted-foreground">
                {block.description}
              </p>

              <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            </motion.div>
          ))}
        </motion.div>
      </Container>
    </section>
  )
}

export default Inverse
