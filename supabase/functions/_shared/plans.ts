// Formules vendues sur la page d'accueil. Les montants sont définis côté serveur
// uniquement : le client ne peut jamais choisir son prix.
export const PLANS = {
  formation: {
    id: "formation",
    label: "Formation complète",
    amount: "0.10",
  },
  accompagnement: {
    id: "accompagnement",
    label: "Formation + accompagnement",
    amount: "136.00",
  },
} as const;

export type PlanId = keyof typeof PLANS;

export const isPlanId = (value: unknown): value is PlanId =>
  typeof value === "string" && Object.prototype.hasOwnProperty.call(PLANS, value);

// Lien vers l'espace de la formation envoyé au client après paiement.
export const COURSE_ACCESS_URL =
  Deno.env.get("COURSE_ACCESS_URL") ?? "https://www.skool.com/leo-avatar-method-9184";
