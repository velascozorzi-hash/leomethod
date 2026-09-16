import { useState } from 'react';
import Container from '@/components/container';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AnimateOnView } from '@/components/ui/motion/animate-on-view';
import { StaggerContainer } from '@/components/ui/motion/stagger';
import img1 from '@/assets/proof/image1.jpg.asset.json';
import img4 from '@/assets/proof/image4.jpg.asset.json';
import img5 from '@/assets/proof/image5.jpg.asset.json';
import img8 from '@/assets/proof/albert-evan-result.png.asset.json';
import imgA from '@/assets/proof/image0_2.jpeg.asset.json';
import imgB from '@/assets/proof/image1_3.png.asset.json';
import imgC from '@/assets/proof/image2_1.jpeg.asset.json';
import imgD from '@/assets/proof/image3_1.jpeg.asset.json';
import imgE from '@/assets/proof/image4_2.png.asset.json';

const proofs = [
  { src: img8.url, alt: "Résultat d'un élève : 1 000 € générés en une semaine" },
  { src: imgC.url, alt: "Élève à 2 000 € en une semaine (2 043 $ de payouts)" },
  { src: imgA.url, alt: 'Première vente à 97 € reçue sur PayPal' },
  { src: imgB.url, alt: "510 $ de revenus au bout d'une semaine" },
  { src: img1.url, alt: 'Journée à 700 € de volume brut' },
  { src: imgE.url, alt: '6 ventes en une semaine et demie : 674 $ de payouts' },
  { src: img5.url, alt: 'Élève ayant dépassé la barre des 2 000 $' },
  { src: img4.url, alt: 'Élève ayant dépassé la barre des 3 000 €' },
  { src: imgD.url, alt: "Première vente dès l'arrivée : 102 $ de revenus" },
];


const Proof = () => {
  const [active, setActive] = useState<{ src: string; alt: string } | null>(null);

  return (
    <section className="py-12 md:py-[60px]">
      <Container className="space-y-8 md:space-y-12">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">Ce que les élèves obtiennent vraiment</h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Captures non retouchées, envoyées par ceux qui appliquent la méthode.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        {/* Mobile : carrousel d'images recadrées */}
        <div className="sm:hidden -mx-4">
          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {proofs.map((proof) => (
              <button
                type="button"
                key={proof.src}
                onClick={() => setActive(proof)}
                aria-label={`Agrandir : ${proof.alt}`}
                className="snap-center shrink-0 w-[78%] overflow-hidden rounded-xl border border-border/60 bg-card/50"
              >
                <img
                  src={proof.src}
                  alt={proof.alt}
                  loading="lazy"
                  className="w-full aspect-[4/3] object-cover object-top"
                />
              </button>
            ))}
          </div>
          <p className="mt-2 text-center text-xs text-muted-foreground">
            Fais glisser pour voir les {proofs.length} captures → touche une image pour l'agrandir
          </p>
        </div>

        {/* Desktop : grille alignée */}
        <StaggerContainer className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-5">
          {proofs.map((proof, index) => (
            <AnimateOnView key={proof.src} delay={(index % 3) * 0.1}>
              <button
                type="button"
                onClick={() => setActive(proof)}
                aria-label={`Agrandir : ${proof.alt}`}
                className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl border border-border/60 bg-card/50 shadow-sm transition-all duration-500 ease-out hover:-translate-y-1.5 hover:border-primary/50 hover:shadow-[0_20px_50px_-20px_rgb(var(--primary)/0.6)]"
              >
                <img
                  src={proof.src}
                  alt={proof.alt}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                />
                <span className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <span className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-4 text-left text-xs text-foreground/90 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  {proof.alt}
                </span>
              </button>
            </AnimateOnView>
          ))}
        </StaggerContainer>

      </Container>

      <Dialog open={!!active} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent className="max-w-[95vw] sm:max-w-2xl p-2 bg-background">
          {active && (
            <img src={active.src} alt={active.alt} className="w-full h-auto rounded-lg" />
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default Proof;
