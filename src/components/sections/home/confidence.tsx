import lottieData from '@/assets/lottie/side glow strokes.json'
import { Button } from '@/components/ui/button'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import Lottie from 'lottie-react'
import Container from '../../container'

const Confidence = () => {
  return (
    <section
      className="relative bg-background overflow-hidden lg:pt-[218px] lg:pb-[291px] md:pt-[60px] md:pb-[60px] pt-12 pb-12">
      {/* Lottie Background */}
      <div className="absolute inset-x-0 top-0 z-0 pointer-events-none md:block hidden">
        <div className='max-w-[1440px] mx-auto aspect-[1200/650] w-full'>
          <Lottie
            animationData={lottieData}
            loop={true}
            className="w-full h-full"
            style={{
              width: '100%',
              height: '100%',
            }}
          />
        </div>
      </div>

      {/* Content */}
      <Container className="relative z-10">
        <StaggerContainer className="text-center max-w-[600px] mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">
              Et si l'IA travaillait pour toi pendant que tu dors ?
            </h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className='text-muted-foreground md:mb-10 mb-5'>
              Pas besoin d'équipe, ni de caméra, ni de budget pub. Juste une bonne offre, les bons outils d'IA
              et un système de contenu qui tourne tous les jours à ta place.
            </p>
          </AnimateOnView>
          <AnimateOnView>
            <Button asChild>
              <a href="#offre">
                Commencer maintenant
              </a>
            </Button>
          </AnimateOnView>
        </StaggerContainer>
      </Container>
    </section>
  )
}

export default Confidence
