// Formule vendue sur la page d'accueil.
// ATTENTION : ce montant ne sert QU'À l'enregistrement en base et aux e-mails.
// Le montant réellement débité vient du prix Stripe portant le lookup key
// "formation_onetime". Les deux doivent rester alignés.
export const PLANS = {
  formation: {
    id: "formation",
    label: "Formation complète",
    amount: "197.00",
  },
} as const;

export type PlanId = keyof typeof PLANS;

export const isPlanId = (value: unknown): value is PlanId =>
  typeof value === "string" && Object.prototype.hasOwnProperty.call(PLANS, value);

// Lien vers l'espace de la formation envoyé au client après paiement.
export const COURSE_ACCESS_URL =
  Deno.env.get("COURSE_ACCESS_URL") ?? "https://www.skool.com/leo-avatar-method-9184";
