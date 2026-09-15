import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import { StaggerContainer } from "@/components/ui/motion/stagger";

/* [X] = placeholders à remplir */
const counters = [
  { value: "+[X]", label: "ans dans les produits digitaux" },
  { value: "+[X]", label: "élèves accompagnés" },
  { value: "9", label: "modules + accompagnement" },
];

const Hero = () => {
  return (
    <section className="relative flex items-center justify-center overflow-hidden hero-padding-top pb-16 md:pb-28 bg-[url(/images/home/hero-bg.webp)] bg-cover bg-center">
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <StaggerContainer>

            <AnimateOnView blur delay={0.1}>
              <h1 className="h1 text-foreground mb-4">
                Je crée des produits digitaux et je les vends sur TikTok sans jamais montrer mon visage.
              </h1>
            </AnimateOnView>

            <AnimateOnView blur delay={0.2}>
              <p className="text-body-md max-w-2xl mx-auto mb-8 text-muted-foreground">
                Sans stock · Sans budget pub · Sans caméra
              </p>
            </AnimateOnView>

            <AnimateOnView delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg">
                <a href="#offre">Rejoindre l'accompagnement</a>
              </Button>
            </AnimateOnView>

            <AnimateOnView delay={0.4}>
              <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary shadow-sm">
                197€ · Paiement en 3× disponible
              </div>
            </AnimateOnView>

            <AnimateOnView delay={0.5}>
              <div className="mt-10 md:mt-14 grid grid-cols-3 gap-2 sm:gap-5 max-w-2xl mx-auto">
                {counters.map((counter) => (
                  <div
                    key={counter.label}
                    className="rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm px-3 py-4 sm:px-5 sm:py-6"
                  >
                    <p className="text-2xl sm:text-4xl font-medium text-foreground leading-none">
                      {counter.value}
                    </p>
                    <p className="mt-2 text-[11px] sm:text-sm leading-snug text-muted-foreground">
                      {counter.label}
                    </p>
                  </div>
                ))}
              </div>
            </AnimateOnView>

          </StaggerContainer>
        </div>
      </div>
    </section>
  );
};

export default Hero;
