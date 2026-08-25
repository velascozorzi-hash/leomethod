import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";
import { ShieldCheck } from "lucide-react";

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
                J'ai fait plus de 30 000€ en 3 mois et demi en vendant des produits digitaux sur TikTok,
                sans jamais montrer mon visage. Voici la méthode complète.
              </p>
            </AnimateOnView>

            <AnimateOnView delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href="#offre">Rejoindre la formation</a>
              </Button>
            </AnimateOnView>

            <AnimateOnView delay={0.4}>
              <div className="mt-6 flex flex-col items-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-4 py-2 text-sm text-foreground">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Satisfait ou remboursé sous 30 jours
                </div>
              </div>
            </AnimateOnView>



          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default Hero;
