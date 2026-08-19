import Container from '@/components/container';
import { AnimateOnView } from '@/components/ui/motion/animate-on-view';
import { StaggerContainer } from '@/components/ui/motion/stagger';
import img1 from '@/assets/proof/image1.jpg.asset.json';
import img2 from '@/assets/proof/image2.jpg.asset.json';
import img3 from '@/assets/proof/image3.jpg.asset.json';
import img4 from '@/assets/proof/image4.jpg.asset.json';
import img5 from '@/assets/proof/image5.jpg.asset.json';
import img7 from '@/assets/proof/image7_1.jpg.asset.json';
import img8 from '@/assets/proof/image8.jpg.asset.json';

const proofs = [
  { src: img8.url, alt: "Résultat d'un élève : 1 000 € générés en une semaine" },
  { src: img7.url, alt: 'Première vente à 97 € en 3 jours' },
  { src: img3.url, alt: "Résultat après un mois : plus de 2 500 $ de ventes" },
  { src: img2.url, alt: 'Chiffres sur deux semaines : 140 € puis 350 €' },
  { src: img1.url, alt: 'Journée à 700 € de volume brut' },
  { src: img5.url, alt: 'Élève ayant dépassé la barre des 2 000 $' },
  { src: img4.url, alt: 'Élève ayant dépassé la barre des 3 000 €' },
];

const Proof = () => {
  return (
    <section className="py-12 md:py-[60px]">
      <Container className="space-y-8 md:space-y-12">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">Les résultats réels des élèves</h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Des captures brutes partagées par ceux qui appliquent la méthode : premières ventes,
              premiers milliers d'euros, sans jamais montrer leur visage.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        {/* Mobile : carrousel d'images recadrées */}
        <div className="sm:hidden -mx-6">
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-6 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {proofs.map((proof) => (
              <div
                key={proof.src}
                className="snap-center shrink-0 w-[78%] overflow-hidden rounded-xl border border-border/60 bg-card/50"
              >
                <img
                  src={proof.src}
                  alt={proof.alt}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover object-top"
                />
              </div>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Fais glisser pour voir les {proofs.length} captures →
          </p>
        </div>

        {/* Desktop : mosaïque */}
        <StaggerContainer className="hidden sm:block">
          <div className="columns-2 lg:columns-3 gap-5 [column-fill:_balance]">
            {proofs.map((proof, index) => (
              <AnimateOnView key={proof.src} delay={(index % 3) * 0.1}>
                <div className="mb-5 break-inside-avoid overflow-hidden rounded-2xl border border-border/60 bg-card/50">
                  <img
                    src={proof.src}
                    alt={proof.alt}
                    loading="lazy"
                    className="w-full h-auto"
                  />
                </div>
              </AnimateOnView>
            ))}
          </div>
        </StaggerContainer>

      </Container>
    </section>
  );
};

export default Proof;
