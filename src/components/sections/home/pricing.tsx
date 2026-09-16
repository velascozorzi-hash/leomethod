import { Button } from "@/components/ui/button";
import { AmbientBlob, AmbientSweep } from "@/components/ui/motion/ambient";
import {
  cardChild,
  growX,
  popIn,
  riseChild,
  slideChild,
  spring,
  staggerParent,
  viewportOnce,
} from "@/components/ui/motion/springs";
import { useStripeCheckout } from "@/hooks/useStripeCheckout";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { useEffect, useRef } from "react";
import Container from "../../container";

const stack = [
  { id: 1, label: "Les 9 modules intégraux (plus de 5h de vidéo)", price: "597€" },
  { id: 2, label: "Les 4 points de validation (niche, sous-niche, produit, tarif)", price: "397€" },
  { id: 3, label: "La sélection des niches les plus exploitables, actualisée tous les mois", price: "297€" },
  { id: 4, label: "Les modèles prêts à l'emploi : produit, page de vente, bio TikTok", price: "197€" },
  { id: 5, label: "L'entrée dans le groupe privé", price: "100€" },
  { id: 6, label: "Mon suivi personnel", price: "62€" },
];

const PRICE_ID = "formation_onetime";

const Pricing = () => {
  const { openCheckout, checkoutElement, isOpen } = useStripeCheckout();
  const checkoutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen && checkoutRef.current) {
      checkoutRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [isOpen]);

  const handleCheckout = () =>
    openCheckout({
      priceId: PRICE_ID,
      returnUrl: `${window.location.origin}/merci?session_id={CHECKOUT_SESSION_ID}`,
    });

  return (
    <section id="offre" className="relative overflow-hidden py-16 md:py-24 scroll-mt-24">
      <AmbientBlob className="-top-20 right-1/4 h-72 w-72 bg-primary/15" duration={10} />
      <AmbientBlob className="bottom-0 left-1/4 h-64 w-64 bg-primary/10" duration={12} delay={1.2} />

      <Container className="relative z-10 space-y-10 md:space-y-14">
        <motion.div
          variants={staggerParent(0.08)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="text-center"
        >
          <motion.h2 variants={cardChild} className="h2">
            Tout ce que tu reçois.
          </motion.h2>
        </motion.div>

        <motion.div
          variants={staggerParent(0.07)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mx-auto max-w-[720px]"
        >
          <motion.div
            variants={cardChild}
            className="relative overflow-hidden rounded-[30px] border border-white/10 bg-card bg-cover bg-center px-5 py-7 md:p-10"
            style={{ backgroundImage: "url(/images/pricing/pricing-bg.webp)" }}
          >
            <AmbientSweep duration={8} />

            {/* liseré de tête */}
            <motion.span
              aria-hidden
              variants={growX(1, 0.1)}
              className="pointer-events-none absolute left-0 top-0 h-[3px] w-full origin-left rounded-full bg-gradient-to-r from-primary via-primary/60 to-transparent will-change-transform"
            />

            <motion.ul variants={staggerParent(0.07)} className="relative z-10">
              {stack.map((item) => (
                <motion.li
                  key={item.id}
                  variants={slideChild}
                  whileHover={{ x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  transition={spring.snappy}
                  className="group flex items-start justify-between gap-3 border-b border-white/10 py-3.5 md:py-4"
                >
                  <span className="flex items-start gap-2.5 md:gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/40 bg-primary/10 transition-colors duration-300 group-hover:bg-primary/25">
                      <Check className="h-3 w-3 text-primary" />
                    </span>
                    <span className="text-sm md:text-base leading-snug text-white/85">
                      {item.label}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm md:text-lg font-medium text-foreground tabular-nums">
                    {item.price}
                  </span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={riseChild} className="relative z-10 mt-6 space-y-3">
              <div className="flex items-baseline justify-between gap-4">
                <span className="text-sm md:text-base text-muted-foreground">Valeur cumulée</span>
                <span className="relative text-xl md:text-2xl text-muted-foreground tabular-nums">
                  1 650€
                  {/* barré qui se trace au scroll */}
                  <motion.span
                    aria-hidden
                    variants={growX(1, 0.35)}
                    className="absolute left-0 top-1/2 h-[2px] w-full origin-left bg-muted-foreground will-change-transform"
                  />
                </span>
              </div>

              <div className="flex items-baseline justify-between gap-4">
                <span className="text-base md:text-body-lg font-medium text-foreground">
                  Ce que tu payes aujourd'hui
                </span>
                <motion.span
                  variants={popIn(0.45)}
                  className="h2 text-primary tabular-nums"
                >
                  197€
                </motion.span>
              </div>
            </motion.div>

            <motion.div variants={riseChild} className="relative z-10 mt-8">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={spring.snappy}
              >
                <Button variant="pricing" className="w-full" onClick={handleCheckout}>
                  Rejoindre l'accompagnement
                </Button>
              </motion.div>
            </motion.div>
          </motion.div>

          <motion.div variants={riseChild} className="flex justify-center pt-6">
            <motion.span
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary shadow-sm will-change-transform"
            >
              197€ · Paiement en 3× disponible
            </motion.span>
          </motion.div>
        </motion.div>
      </Container>
      <div ref={checkoutRef}>{checkoutElement}</div>
    </section>
  );
};

export default Pricing;
