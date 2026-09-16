import type { Transition, Variants } from "framer-motion";

/**
 * Ressorts partagés par toute la landing page.
 * Aucune easing linéaire : tout passe par de la physique.
 */
export const spring = {
  /** Éléments de contenu qui entrent à l'écran. */
  soft: { type: "spring", stiffness: 120, damping: 18 } as Transition,
  /** Éléments lourds : cartes pleine largeur, panneaux. */
  heavy: { type: "spring", stiffness: 80, damping: 22 } as Transition,
  /** Retour tactile : boutons, lignes cliquables. */
  snappy: { type: "spring", stiffness: 400, damping: 28 } as Transition,
};

/** Fenêtre de déclenchement commune aux révélations au scroll. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

/** Conteneur de liste / grille : les enfants arrivent en cascade. */
export const staggerParent = (staggerChildren = 0.07): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren, delayChildren: 0.05 } },
});

/** Enfant d'une liste : montée verticale. */
export const riseChild: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: spring.soft },
};

/** Enfant d'une liste : arrivée latérale (lignes, timelines). */
export const slideChild: Variants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: spring.soft },
};

/** Carte : montée + léger zoom. */
export const cardChild: Variants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: spring.soft },
};

/** Réaction au survol / à l'appui, commune aux cartes. */
export const tactileCard = {
  whileHover: { y: -4 },
  whileTap: { scale: 0.985 },
  transition: spring.snappy,
} as const;

/**
 * Traits / barres qui se remplissent.
 * IMPORTANT : à l'intérieur d'un arbre de variants, un enfant doit lui aussi
 * déclarer ses variants — sinon le parent lui impose l'état "hidden" et
 * l'animation reste bloquée à zéro.
 */
export const growX = (to = 1, delay = 0): Variants => ({
  hidden: { scaleX: 0 },
  visible: { scaleX: to, transition: { ...spring.heavy, delay } },
})

/** Apparition avec léger zoom, utilisable dans un arbre de variants. */
export const popIn = (delay = 0): Variants => ({
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { ...spring.soft, delay } },
})
