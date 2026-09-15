import { motion } from "framer-motion";
import {
  Bot,
  Check,
  FileText,
  Heart,
  MessageCircle,
  Search,
  Send,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";

const shell =
  "relative w-full max-w-[494px] aspect-square rounded-[24px] border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden p-6 flex flex-col justify-center gap-4";

/**
 * Enveloppe animée commune aux trois visuels :
 * halo qui respire, balayage lumineux et liseré qui pulse.
 */
const VisualShell = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.96 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, margin: "-60px" }}
    transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
    whileHover={{ scale: 1.015 }}
    className={shell}
  >
    <motion.span
      aria-hidden
      animate={{ opacity: [0.25, 0.6, 0.25], scale: [1, 1.15, 1] }}
      transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute -top-20 -right-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl"
    />
    <motion.span
      aria-hidden
      animate={{ x: ["-120%", "220%"] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
      className="pointer-events-none absolute inset-y-0 w-1/3 -skew-x-12 bg-gradient-to-r from-transparent via-primary/10 to-transparent"
    />
    <motion.span
      aria-hidden
      animate={{ opacity: [0.2, 0.7, 0.2] }}
      transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      className="pointer-events-none absolute inset-0 rounded-[24px] ring-1 ring-inset ring-primary/30"
    />
    <div className="relative flex flex-1 flex-col justify-center gap-4">{children}</div>
  </motion.div>
);

const float = (delay = 0) => ({
  animate: { y: [0, -8, 0] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut" as const, delay },
});

/* 1 — Choisis ta niche, ton positionnement, ton offre */
const NicheVisual = () => (
  <VisualShell>
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Search className="w-4 h-4 text-primary" />
      Choix de ta niche
    </div>

    {[
      { label: "Perte de poids après 40 ans", score: 92, picked: true },
      { label: "Anxiété au travail", score: 74, picked: false },
      { label: "Apprendre à investir", score: 61, picked: false },
    ].map((row, i) => (
      <motion.div
        key={row.label}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + i * 0.15 }}
        className={`rounded-xl border p-3.5 ${
          row.picked
            ? "border-primary/60 bg-primary/10"
            : "border-border/60 bg-background/60 opacity-60"
        }`}
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-foreground flex items-center gap-2">
            {row.picked && <Check className="w-3.5 h-3.5 text-primary" />}
            {row.label}
          </span>
          <span className="text-xs text-primary">{row.score} / 100</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-muted overflow-hidden">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            whileInView={{ width: `${row.score}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3 + i * 0.15 }}
          />
        </div>
      </motion.div>
    ))}

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.7 }}
      className="rounded-xl border border-primary/40 bg-background/70 p-4"
    >
      <div className="flex items-center gap-2 text-xs text-primary mb-2">
        <Target className="w-3.5 h-3.5" /> Ton positionnement · ton offre
      </div>
      <p className="text-sm">
        « Perds 5 kg en 30 jours, sans salle de sport »
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {["Promesse claire", "Prix juste"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-border/60 bg-muted/40 px-3 py-1 text-xs text-muted-foreground"
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  </VisualShell>
);

/* 2 — Crée ton avatar IA et ton produit digital */
const AvatarVisual = () => (
  <VisualShell>
    <div className="flex items-center justify-center gap-4">
      <div className="relative w-[150px] h-[240px] shrink-0 rounded-[22px] border border-border/60 bg-background/70 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/25 to-transparent" />
        <motion.div
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-8 left-1/2 -translate-x-1/2 w-14 h-14 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center"
        >
          <Bot className="w-6 h-6 text-primary" />
        </motion.div>
        <div className="absolute bottom-4 left-3 right-3">
          <p className="text-xs text-muted-foreground mb-1">Avatar IA · Léa</p>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.span
                key={i}
                animate={{ scaleY: [0.4, 1, 0.4] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.12 }}
                className="h-4 w-1 origin-bottom rounded-full bg-primary/70"
              />
            ))}
          </div>
        </div>
      </div>

      <motion.div
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="text-primary"
      >
        <Sparkles className="w-5 h-5" />
      </motion.div>

      <motion.div
        {...float(0.3)}
        className="w-[130px] shrink-0 rounded-2xl border border-primary/40 bg-background/70 p-4"
      >
        <FileText className="w-6 h-6 text-primary mb-3" />
        <p className="text-sm font-medium leading-tight">Ton produit digital</p>
        <p className="mt-2 text-xs text-muted-foreground">Ebook · Template · Mini-formation</p>
      </motion.div>
    </div>

    <div className="flex flex-wrap justify-center gap-2">
      {["Voix clonée", "Visage généré", "Contenu prêt"].map((tag, i) => (
        <motion.span
          key={tag}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.15 }}
          className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs text-primary"
        >
          {tag}
        </motion.span>
      ))}
    </div>
  </VisualShell>
);

/* 3 — Utilise les réseaux sans jamais montrer ta tête, vends en automatique */
const SocialVisual = () => (
  <VisualShell>
    <div className="flex items-start justify-center gap-3">
      {[
        { title: "3 erreurs qui bloquent ta perte de poids", likes: "12,4k", delay: 0 },
        { title: "La routine de 10 min qui change tout", likes: "8,9k", delay: 0.2 },
      ].map((post) => (
        <motion.div
          key={post.title}
          {...float(post.delay)}
          className="w-[132px] rounded-[18px] border border-border/60 bg-background/70 p-3 overflow-hidden"
        >
          <div className="h-20 rounded-xl bg-gradient-to-b from-primary/25 to-transparent flex items-center justify-center">
            <Bot className="w-5 h-5 text-primary" />
          </div>
          <p className="mt-2 text-xs leading-snug">{post.title}</p>
          <div className="mt-2 flex items-center gap-3 text-[11px] text-muted-foreground">
            <motion.span
              animate={{ scale: [1, 1.15, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="flex items-center gap-1"
            >
              <Heart className="w-3 h-3 text-primary" /> {post.likes}
            </motion.span>
            <span className="flex items-center gap-1">
              <MessageCircle className="w-3 h-3" /> 384
            </span>
          </div>
        </motion.div>
      ))}
    </div>

    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: 0.3 }}
      className="rounded-xl border border-primary/40 bg-background/70 p-4 space-y-2.5"
    >
      <div className="flex items-center gap-2 text-xs text-primary">
        <Zap className="w-3.5 h-3.5" /> Vente en automatique
      </div>
      {[
        { icon: Send, label: "Le client clique sur ton lien" },
        { icon: Check, label: "Paiement encaissé" },
        { icon: FileText, label: "Produit livré par e-mail" },
      ].map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.15 }}
          className="flex items-center gap-2 text-sm text-muted-foreground"
        >
          <step.icon className="w-3.5 h-3.5 text-primary" />
          {step.label}
        </motion.div>
      ))}
    </motion.div>

    <motion.div
      {...float(0.5)}
      className="self-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs text-primary"
    >
      Jamais ton visage à l'écran
    </motion.div>
  </VisualShell>
);

const visuals = {
  niche: NicheVisual,
  avatar: AvatarVisual,
  reseaux: SocialVisual,
};

export type StepVisualKind = keyof typeof visuals;

export const StepVisual = ({ kind }: { kind: StepVisualKind }) => {
  const Component = visuals[kind];
  return <Component />;
};

export default StepVisual;
