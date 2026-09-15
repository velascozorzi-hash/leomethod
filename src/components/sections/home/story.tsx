import Container from '@/components/container'
import ImagePlaceholder from '@/components/ui/image-placeholder'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'

const paragraphs = [
  "2023, j'ai 17 ans. Premier test e-commerce. 1 500€ partis.",
  "2025, je reprends sérieusement. Avec un accompagnement payant cette fois. 5 000€ de plus.",
  "6 500€ perdus. Deux fois. Et à chaque fois je pensais que le problème c'était moi.",
  "C'était pas moi. Le modèle était juste mauvais pour quelqu'un qui démarre à zéro.",
  "J'ai basculé sur les produits digitaux. Et c'est ce qui a tout changé.",
]

/* PLACEHOLDERS IMAGES — à remplacer (2 à 3 visuels) */
const placeholders = [
  { id: 'histoire-image-1', ratio: '4 / 5' },
  { id: 'histoire-image-2', ratio: '4 / 5' },
  { id: 'histoire-image-3', ratio: '4 / 5' },
]

const Story = () => {
  return (
    <section className="py-14 md:py-24">
      <Container className="space-y-10 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">J'étais exactement là où t'es.</h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Zéro budget, zéro expérience, et deux échecs avant de comprendre.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <StaggerContainer className="relative max-w-[520px] mx-auto lg:mx-0">
            <span className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary/60 via-primary/25 to-transparent" />
            <div className="space-y-6 pl-8">
              {paragraphs.map((paragraph, index) => (
                <AnimateOnView key={paragraph} delay={index * 0.1} className="relative">
                  <span className="absolute -left-8 top-2 block w-[15px] h-[15px] rounded-full border border-primary/50 bg-background">
                    <span className="absolute inset-[3px] rounded-full bg-primary" />
                  </span>
                  <p className="text-body-md text-muted-foreground">{paragraph}</p>
                </AnimateOnView>
              ))}
            </div>
          </StaggerContainer>

          <StaggerContainer className="grid grid-cols-2 gap-4">
            {placeholders.map((placeholder, index) => (
              <AnimateOnView
                key={placeholder.id}
                delay={index * 0.1}
                className={index === 2 ? 'col-span-2' : undefined}
              >
                <ImagePlaceholder
                  id={placeholder.id}
                  ratio={index === 2 ? '16 / 9' : placeholder.ratio}
                />
              </AnimateOnView>
            ))}
          </StaggerContainer>
        </div>
      </Container>
    </section>
  )
}

export default Story
