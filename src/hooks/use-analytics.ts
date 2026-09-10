import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

export type EnvironmentFilter = "all" | "live" | "sandbox";

/** Statut réel d'une tentative, une fois l'ancienneté prise en compte. */
export type ResolvedStatus = "paid" | "abandoned" | "presumed_abandoned" | "in_progress";

/**
 * Rangée de la table `checkout_sessions`. Cette table n'est pas encore couverte
 * par les types Supabase générés (`src/integrations/supabase/types.ts`), on la
 * déclare donc localement pour conserver la sûreté de typage côté hook.
 */
type CheckoutSessionRow = {
  id: string;
  stripe_session_id: string;
  environment: string;
  email: string | null;
  full_name: string | null;
  plan: string | null;
  amount: number | null;
  currency: string;
  status: string;
  recovery_url: string | null;
  started_at: string;
  paid_at: string | null;
  abandoned_at: string | null;
};

type SessionsListResult = { data: CheckoutSessionRow[] | null; error: unknown };
type SessionsSingleResult = { data: CheckoutSessionRow | null; error: unknown };

type SessionsQuery = SessionsBuilder & PromiseLike<SessionsListResult>;

type SessionsBuilder = {
  select: (columns?: string) => SessionsQuery;
  gte: (column: string, value: string) => SessionsQuery;
  eq: (column: string, value: string) => SessionsQuery;
  order: (column: string, options?: { ascending?: boolean }) => SessionsQuery;
  limit: (count: number) => { maybeSingle: () => PromiseLike<SessionsSingleResult> };
};

const sessionsTable = (): SessionsBuilder =>
  (supabase as unknown as { from: (table: "checkout_sessions") => SessionsBuilder }).from(
    "checkout_sessions"
  );

export interface CheckoutAttempt {
  id: string;
  stripe_session_id: string;
  environment: string;
  email: string | null;
  full_name: string | null;
  plan: string | null;
  amount: number | null;
  currency: string;
  status: string;
  recovery_url: string | null;
  started_at: string;
  paid_at: string | null;
  abandoned_at: string | null;
  resolvedStatus: ResolvedStatus;
}

// Stripe laisse une session de paiement ouverte 24h avant d'envoyer
// `checkout.session.expired`. Passé ce délai sans nouvelle, la tentative est
// abandonnée même si le webhook n'est pas encore passé.
const EXPIRY_MS = 24 * 60 * 60 * 1000;
// En dessous de ce délai, la personne est peut-être encore en train de payer.
const IN_PROGRESS_MS = 60 * 60 * 1000;

function resolveStatus(row: { status: string; started_at: string }): ResolvedStatus {
  if (row.status === "paid") return "paid";
  if (row.status === "abandoned") return "abandoned";
  const age = Date.now() - new Date(row.started_at).getTime();
  if (age < IN_PROGRESS_MS) return "in_progress";
  return "presumed_abandoned";
}

export const isAbandoned = (status: ResolvedStatus) =>
  status === "abandoned" || status === "presumed_abandoned";

export interface DailyPoint {
  date: string;
  label: string;
  started: number;
  paid: number;
  abandoned: number;
  revenue: number;
}

export interface AnalyticsSummary {
  attempts: CheckoutAttempt[];
  abandoned: CheckoutAttempt[];
  totals: {
    started: number;
    paid: number;
    abandoned: number;
    inProgress: number;
    revenue: number;
    lostRevenue: number;
    averageOrder: number;
    conversionRate: number;
    abandonmentRate: number;
  };
  daily: DailyPoint[];
  /** Vrai tant qu'aucune tentative n'a jamais été enregistrée. */
  isEmpty: boolean;
  /** Date de la plus ancienne tentative connue, pour signaler un suivi récent. */
  trackingSince: string | null;
}

function dayKey(iso: string) {
  return iso.slice(0, 10);
}

export function useCheckoutAnalytics(days: number, environment: EnvironmentFilter) {
  return useQuery<AnalyticsSummary>({
    queryKey: ["checkout-analytics", days, environment],
    queryFn: async () => {
      const since = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString();

      let query = sessionsTable()
        .select("*")
        .gte("started_at", since)
        .order("started_at", { ascending: false });

      if (environment !== "all") query = query.eq("environment", environment);

      const recent = await query;
      const oldest = await sessionsTable()
        .select("started_at")
        .order("started_at", { ascending: true })
        .limit(1)
        .maybeSingle();

      const { data, error } = recent;

      if (error) throw error;

      const attempts: CheckoutAttempt[] = (data ?? []).map((row) => ({
        ...row,
        resolvedStatus: resolveStatus(row),
      }));

      const abandoned = attempts.filter((a) => isAbandoned(a.resolvedStatus));
      const paid = attempts.filter((a) => a.resolvedStatus === "paid");
      const inProgress = attempts.filter((a) => a.resolvedStatus === "in_progress");

      const revenue = paid.reduce((sum, a) => sum + (a.amount ?? 0), 0);
      const lostRevenue = abandoned.reduce((sum, a) => sum + (a.amount ?? 0), 0);

      // On exclut les tentatives encore en cours du dénominateur : elles ne sont
      // ni converties ni perdues, les compter fausserait le taux vers le bas.
      const decided = paid.length + abandoned.length;

      // Squelette de jours pour que la courbe reste continue même sans trafic.
      const skeleton = new Map<string, DailyPoint>();
      for (let i = days - 1; i >= 0; i--) {
        const d = new Date(Date.now() - i * 24 * 60 * 60 * 1000);
        const key = d.toISOString().slice(0, 10);
        skeleton.set(key, {
          date: key,
          label: d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short" }),
          started: 0,
          paid: 0,
          abandoned: 0,
          revenue: 0,
        });
      }

      for (const attempt of attempts) {
        const point = skeleton.get(dayKey(attempt.started_at));
        if (!point) continue;
        point.started += 1;
        if (attempt.resolvedStatus === "paid") {
          point.paid += 1;
          point.revenue += attempt.amount ?? 0;
        } else if (isAbandoned(attempt.resolvedStatus)) {
          point.abandoned += 1;
        }
      }

      return {
        attempts,
        abandoned,
        totals: {
          started: attempts.length,
          paid: paid.length,
          abandoned: abandoned.length,
          inProgress: inProgress.length,
          revenue,
          lostRevenue,
          averageOrder: paid.length ? revenue / paid.length : 0,
          conversionRate: decided ? (paid.length / decided) * 100 : 0,
          abandonmentRate: decided ? (abandoned.length / decided) * 100 : 0,
        },
        daily: [...skeleton.values()],
        isEmpty: !oldest.data,
        trackingSince: oldest.data?.started_at ?? null,
      };
    },
    // Les paniers abandonnés arrivent par webhook : un rafraîchissement
    // périodique évite d'avoir à recharger la page à la main.
    refetchInterval: 60_000,
  });
}

export const EXPIRY_DELAY_MS = EXPIRY_MS;
