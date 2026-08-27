import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";

const CTA = () => {
    return (
        <section className="relative overflow-hidden pt-20 md:pt-32 pb-16 md:pb-24">
            <div className="absolute inset-0 bg-background" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/15 via-background to-background pointer-events-none" />

            <Container className="relative z-10">
                <StaggerContainer className="text-center max-w-[640px] mx-auto">
                    <AnimateOnView blur>
                        <h2 className="h2 md:mb-5 mb-3">
                            Lance ton produit digital dès cette semaine
                        </h2>
                    </AnimateOnView>
                    <AnimateOnView blur delay={0.2}>
                        <p className='text-muted-foreground md:mb-10 mb-5'>
                            Rejoins la formation et applique exactement le système qui m'a permis de générer
                            +30 000€ en 3 mois et demi avec l'IA.
                        </p>
                    </AnimateOnView>
                    <AnimateOnView>
                        <Button asChild size="lg">
                            <a href="#offre">
                                Rejoindre la formation
                            </a>
                        </Button>
                    </AnimateOnView>
                </StaggerContainer>
            </Container>
        </section>
    );
};

export default CTA;
