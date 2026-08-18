import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden hero-padding-top pb-16 md:pb-28 bg-[url(/images/home/hero-bg.webp)] bg-cover bg-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <StaggerContainer>

            <AnimateOnView blur>
              <h1 className="h1 text-foreground mb-4">
                Bienvenue dans l'ère de l'IA
              </h1>
            </AnimateOnView>

            <AnimateOnView blur delay={0.2}>
              <p className="text-body-md max-w-2xl mx-auto mb-8 text-muted-foreground">
                Crée un avatar IA, publie chaque jour sur TikTok pour résoudre le problème d'une niche,
                et vends ton ebook, ton template ou ta formation — sans jamais montrer ton visage.
                +50 000€ en 6 mois avec ce système : voici la méthode complète.
              </p>
            </AnimateOnView>

            <AnimateOnView delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href="#offre">Rejoindre la formation</a>
              </Button>
              <a
                href="#methode"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Découvrir la méthode
              </a>
            </AnimateOnView>

            <AnimateOnView delay={0.4}>
              <p className="mt-5 text-xs text-muted-foreground/70">
                Satisfait ou remboursé sous 30 jours (voir conditions)
              </p>
            </AnimateOnView>
          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default Hero;
