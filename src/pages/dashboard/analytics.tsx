import AdminGuard from "@/components/admin/admin-guard";
import BlogLayout from "@/components/admin/blog-layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import {
  type CheckoutAttempt,
  type EnvironmentFilter,
  type ResolvedStatus,
  useCheckoutAnalytics,
} from "@/hooks/use-analytics";
import {
  ExternalLink,
  Mail,
  ShoppingCart,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const euro = (value: number) =>
  new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: value % 1 === 0 ? 0 : 2,
  }).format(value);

const percent = (value: number) => `${value.toFixed(1).replace(".0", "")} %`;

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });

const STATUS_LABELS: Record<ResolvedStatus, { label: string; className: string }> = {
  paid: { label: "Payé", className: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" },
  abandoned: { label: "Abandonné", className: "bg-red-500/10 text-red-400 border-red-500/20" },
  presumed_abandoned: {
    label: "Abandonné (présumé)",
    className: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  },
  in_progress: {
    label: "En cours",
    className: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  },
};

interface StatCardProps {
  label: string;
  value: string;
  hint?: string;
  icon: React.ElementType;
  accent?: string;
}

const StatCard = ({ label, value, hint, icon: Icon, accent }: StatCardProps) => (
  <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
    <div className="flex items-start justify-between gap-4">
      <p className="text-sm text-muted-foreground">{label}</p>
      <Icon className={`h-5 w-5 shrink-0 ${accent ?? "text-muted-foreground"}`} />
    </div>
    <p className="mt-3 text-3xl font-semibold tracking-tight">{value}</p>
    {hint && <p className="mt-1 text-sm text-muted-foreground">{hint}</p>}
  </div>
);

/** Barre d'entonnoir : part des checkouts ouverts représentée par une étape. */
const FunnelStep = ({
  label,
  count,
  total,
  className,
}: {
  label: string;
  count: number;
  total: number;
  className: string;
}) => {
  const share = total ? (count / total) * 100 : 0;
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between text-sm">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-medium">
          {count}
          <span className="ml-2 text-muted-foreground">{percent(share)}</span>
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-white/5">
        <div
          className={`h-full rounded-full transition-all ${className}`}
          style={{ width: `${Math.max(share, count > 0 ? 2 : 0)}%` }}
        />
      </div>
    </div>
  );
};

const AbandonedRow = ({ attempt }: { attempt: CheckoutAttempt }) => {
  const status = STATUS_LABELS[attempt.resolvedStatus];
  const relanceBody = [
    "Bonjour,",
    "",
    "Vous avez commencé une commande sans la finaliser. Elle vous attend toujours :",
    attempt.recovery_url ?? "",
    "",
    "À très vite,",
  ].join("\n");
  const relanceHref = attempt.email
    ? `mailto:${encodeURIComponent(attempt.email)}?subject=${encodeURIComponent(
        "Votre commande est toujours disponible",
      )}&body=${encodeURIComponent(relanceBody)}`
    : null;

  return (
    <tr className="border-b border-white/5 last:border-0">
      <td className="px-4 py-4">
        {attempt.email ? (
          <span className="font-medium">{attempt.email}</span>
        ) : (
          <span className="italic text-muted-foreground">Email non saisi</span>
        )}
        {attempt.full_name && (
          <p className="text-sm text-muted-foreground">{attempt.full_name}</p>
        )}
      </td>
      <td className="px-4 py-4 text-muted-foreground">{attempt.plan ?? "—"}</td>
      <td className="px-4 py-4 font-medium">
        {attempt.amount != null ? euro(attempt.amount) : "—"}
      </td>
      <td className="px-4 py-4 text-muted-foreground">{formatDate(attempt.started_at)}</td>
      <td className="px-4 py-4">
        <Badge variant="outline" className={status.className}>
          {status.label}
        </Badge>
      </td>
      <td className="px-4 py-4">
        <div className="flex justify-end gap-2">
          {attempt.recovery_url && (
            <Button asChild size="sm" variant="outline">
              <a href={attempt.recovery_url} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-1.5 h-3.5 w-3.5" />
                Panier
              </a>
            </Button>
          )}
          {relanceHref && (
            <Button asChild size="sm" variant="outline">
              <a href={relanceHref}>
                <Mail className="mr-1.5 h-3.5 w-3.5" />
                Relancer
              </a>
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};

const AnalyticsPage = () => {
  const [days, setDays] = useState(30);
  const [environment, setEnvironment] = useState<EnvironmentFilter>("all");

  const { data, isLoading, error } = useCheckoutAnalytics(days, environment);
  const totals = data?.totals;

  return (
    <AdminGuard>
      <BlogLayout>
        <div className="p-8">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="mb-1 text-3xl font-bold">Paniers &amp; conversions</h1>
              <p className="text-muted-foreground">
                Ce qui se passe entre l&apos;ouverture du paiement et l&apos;encaissement
              </p>
            </div>
            <div className="flex gap-3">
              <Select value={String(days)} onValueChange={(value) => setDays(Number(value))}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 derniers jours</SelectItem>
                  <SelectItem value="30">30 derniers jours</SelectItem>
                  <SelectItem value="90">90 derniers jours</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={environment}
                onValueChange={(value) => setEnvironment(value as EnvironmentFilter)}
              >
                <SelectTrigger className="w-36">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tout</SelectItem>
                  <SelectItem value="live">Réel</SelectItem>
                  <SelectItem value="sandbox">Test</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {error && (
            <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/5 p-6 text-red-400">
              Impossible de charger les données : {(error as Error).message}
            </div>
          )}

          {isLoading && (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-36 rounded-2xl" />
              ))}
            </div>
          )}

          {data?.isEmpty && (
            <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-10 text-center">
              <ShoppingCart className="mx-auto mb-4 h-10 w-10 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-semibold">Aucune tentative enregistrée</h2>
              <p className="mx-auto max-w-md text-muted-foreground">
                Le suivi vient d&apos;être activé. Dès qu&apos;un visiteur ouvrira le
                paiement, sa tentative apparaîtra ici — qu&apos;il aille au bout ou non.
              </p>
            </div>
          )}

          {data && !data.isEmpty && totals && (
            <>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                <StatCard
                  label="Checkouts ouverts"
                  value={String(totals.started)}
                  hint={
                    totals.inProgress
                      ? `dont ${totals.inProgress} encore en cours`
                      : "sur la période"
                  }
                  icon={ShoppingCart}
                />
                <StatCard
                  label="Payés"
                  value={String(totals.paid)}
                  hint={`${percent(totals.conversionRate)} de conversion`}
                  icon={TrendingUp}
                  accent="text-emerald-400"
                />
                <StatCard
                  label="Paniers abandonnés"
                  value={String(totals.abandoned)}
                  hint={`${percent(totals.abandonmentRate)} des paniers`}
                  icon={TrendingDown}
                  accent="text-red-400"
                />
                <StatCard
                  label="Chiffre d'affaires"
                  value={euro(totals.revenue)}
                  hint={
                    totals.paid
                      ? `${euro(totals.averageOrder)} de panier moyen`
                      : "aucune vente sur la période"
                  }
                  icon={Wallet}
                />
              </div>

              {totals.lostRevenue > 0 && (
                <div className="mt-4 rounded-2xl border border-orange-500/20 bg-orange-500/5 p-6">
                  <p className="font-medium text-orange-300">
                    {euro(totals.lostRevenue)} laissés dans des paniers abandonnés
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Sur {totals.abandoned} panier{totals.abandoned > 1 ? "s" : ""} non
                    finalisé{totals.abandoned > 1 ? "s" : ""} ces {days} derniers jours.
                  </p>
                </div>
              )}

              <div className="mt-8 grid gap-4 lg:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6 lg:col-span-2">
                  <h2 className="mb-6 font-semibold">Ouvertures et ventes par jour</h2>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data.daily}>
                        <defs>
                          <linearGradient id="startedGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#60a5fa" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#60a5fa" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="paidGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#34d399" stopOpacity={0.35} />
                            <stop offset="100%" stopColor="#34d399" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid
                          strokeDasharray="3 3"
                          stroke="currentColor"
                          className="text-white/5"
                          vertical={false}
                        />
                        <XAxis
                          dataKey="label"
                          tickLine={false}
                          axisLine={false}
                          minTickGap={24}
                          tick={{ fontSize: 12, fill: "currentColor" }}
                          className="text-muted-foreground"
                        />
                        <YAxis
                          allowDecimals={false}
                          tickLine={false}
                          axisLine={false}
                          width={32}
                          tick={{ fontSize: 12, fill: "currentColor" }}
                          className="text-muted-foreground"
                        />
                        <Tooltip
                          contentStyle={{
                            background: "hsl(var(--background))",
                            border: "1px solid rgba(255,255,255,0.1)",
                            borderRadius: "0.75rem",
                            fontSize: "0.875rem",
                          }}
                          labelStyle={{ color: "hsl(var(--foreground))" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="started"
                          name="Ouverts"
                          stroke="#60a5fa"
                          fill="url(#startedGradient)"
                          strokeWidth={2}
                        />
                        <Area
                          type="monotone"
                          dataKey="paid"
                          name="Payés"
                          stroke="#34d399"
                          fill="url(#paidGradient)"
                          strokeWidth={2}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                  <h2 className="mb-6 font-semibold">Entonnoir</h2>
                  <div className="space-y-5">
                    <FunnelStep
                      label="Checkout ouvert"
                      count={totals.started}
                      total={totals.started}
                      className="bg-blue-400"
                    />
                    <FunnelStep
                      label="Email saisi"
                      count={data.attempts.filter((a) => a.email).length}
                      total={totals.started}
                      className="bg-violet-400"
                    />
                    <FunnelStep
                      label="Payé"
                      count={totals.paid}
                      total={totals.started}
                      className="bg-emerald-400"
                    />
                    <FunnelStep
                      label="Abandonné"
                      count={totals.abandoned}
                      total={totals.started}
                      className="bg-red-400"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.02]">
                <div className="flex items-center justify-between border-b border-white/10 p-6">
                  <div>
                    <h2 className="font-semibold">Paniers abandonnés</h2>
                    <p className="text-sm text-muted-foreground">
                      Les personnes qui ont ouvert le paiement sans aller au bout
                    </p>
                  </div>
                  <Badge variant="outline">{data.abandoned.length}</Badge>
                </div>

                {data.abandoned.length === 0 ? (
                  <p className="p-10 text-center text-muted-foreground">
                    Aucun panier abandonné sur la période. Tout le monde est allé au bout.
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                      <thead className="text-muted-foreground">
                        <tr className="border-b border-white/10">
                          <th className="px-4 py-3 font-medium">Client</th>
                          <th className="px-4 py-3 font-medium">Offre</th>
                          <th className="px-4 py-3 font-medium">Montant</th>
                          <th className="px-4 py-3 font-medium">Ouvert le</th>
                          <th className="px-4 py-3 font-medium">Statut</th>
                          <th className="px-4 py-3" />
                        </tr>
                      </thead>
                      <tbody>
                        {data.abandoned.map((attempt) => (
                          <AbandonedRow key={attempt.id} attempt={attempt} />
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Stripe garde une session de paiement ouverte 24 h avant de la déclarer
                expirée. Les paniers marqués « présumés » ont dépassé une heure sans
                paiement et attendent encore la confirmation de Stripe.
              </p>
            </>
          )}
        </div>
      </BlogLayout>
    </AdminGuard>
  );
};

export default AnalyticsPage;
