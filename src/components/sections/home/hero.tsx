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
                J'ai généré +35k€ en 6 mois en vendant des produits digitaux sur TikTok,
                sans jamais montrer mon visage. Voici la méthode complète.
              </p>
            </AnimateOnView>

            <AnimateOnView delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href="#offre">Rejoindre la formation</a>
              </Button>
            </AnimateOnView>

            <AnimateOnView delay={0.4}>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary shadow-sm">
                🛡️ Satisfait ou remboursé sous 60 jours
              </div>
            </AnimateOnView>

          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default Hero;
