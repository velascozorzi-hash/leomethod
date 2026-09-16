import Container from "@/components/container";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";

interface JoinCtaProps {
  /** Phrase courte affichée au-dessus du bouton, pour varier selon l'emplacement. */
  label?: string;
}

/**
 * Rappel d'action discret inséré entre les sections de contenu pour limiter
 * le scroll avant d'atteindre l'offre. Pointe vers #offre.
 */
const JoinCta = ({ label = "Prêt à passer à l'action ?" }: JoinCtaProps) => {
  return (
    <section className="py-10 md:py-14">
      <Container className="flex flex-col items-center gap-4 text-center">
        <AnimateOnView blur>
          <p className="text-body-sm font-semibold uppercase tracking-wide text-muted-foreground">
            {label}
          </p>
        </AnimateOnView>
        <AnimateOnView blur delay={0.1}>
          <Button asChild size="lg">
            <a href="#offre">Rejoindre l'accompagnement</a>
          </Button>
        </AnimateOnView>
        <AnimateOnView delay={0.2}>
          <span className="text-sm font-medium text-muted-foreground">
            199€ · Paiement en 3× disponible
          </span>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default JoinCta;
