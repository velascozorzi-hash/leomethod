import { motion } from "framer-motion";
import { memo } from "react";

import { cn } from "@/lib/utils";

/**
 * Animations perpétuelles, isolées dans des composants mémoïsés pour
 * qu'elles ne soient jamais relancées par un rendu du parent.
 * On n'anime que `transform` et `opacity`.
 */

interface BlobProps {
  className?: string;
  duration?: number;
  delay?: number;
}

/** Halo qui dérive lentement en arrière-plan. */
export const AmbientBlob = memo(({ className, duration = 9, delay = 0 }: BlobProps) => (
  <motion.span
    aria-hidden
    animate={{ opacity: [0.35, 0.75, 0.35], scale: [1, 1.14, 1] }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    className={cn("pointer-events-none absolute rounded-full blur-3xl will-change-transform", className)}
  />
));
AmbientBlob.displayName = "AmbientBlob";

/** Balayage lumineux qui traverse une carte en boucle. */
export const AmbientSweep = memo(({ className, duration = 6, delay = 0 }: BlobProps) => (
  <motion.span
    aria-hidden
    animate={{ x: ["-130%", "230%"] }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut", repeatDelay: 2.5, delay }}
    className={cn(
      "pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-primary/10 to-transparent will-change-transform",
      className
    )}
  />
));
AmbientSweep.displayName = "AmbientSweep";

/** Élément qui lévite en continu (icônes, badges). */
export const AmbientFloat = memo(
  ({
    children,
    className,
    amplitude = 6,
    duration = 4,
    delay = 0,
  }: {
    children: React.ReactNode;
    className?: string;
    amplitude?: number;
    duration?: number;
    delay?: number;
  }) => (
    <motion.div
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
      className={cn("will-change-transform", className)}
    >
      {children}
    </motion.div>
  )
);
AmbientFloat.displayName = "AmbientFloat";

/** Point de statut qui respire. */
export const AmbientPulse = memo(({ className, duration = 2.4, delay = 0 }: BlobProps) => (
  <motion.span
    aria-hidden
    animate={{ scale: [1, 1.5, 1], opacity: [0.7, 0, 0.7] }}
    transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    className={cn("pointer-events-none absolute inset-0 rounded-full bg-primary/50 will-change-transform", className)}
  />
));
AmbientPulse.displayName = "AmbientPulse";
