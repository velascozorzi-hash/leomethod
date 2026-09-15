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
                    <AnimateOnView>
                        <Button asChild size="lg">
                            <a href="#offre">
                                Rejoindre l'accompagnement — 197€
                            </a>
                        </Button>
                    </AnimateOnView>
                    <AnimateOnView delay={0.2}>
                        <p className="mt-6 text-sm md:text-base text-muted-foreground">
                            Garantie 90 jours · Règlement en 3× possible
                        </p>
                    </AnimateOnView>
                </StaggerContainer>
            </Container>
        </section>
    );
};

export default CTA;
