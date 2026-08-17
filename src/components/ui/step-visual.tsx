import { motion } from "framer-motion";
import { Bot, Heart, MessageCircle, Search, Sparkles, Target } from "lucide-react";

const shell =
  "relative w-full max-w-[494px] aspect-square rounded-[24px] border border-border/60 bg-card/60 backdrop-blur-sm overflow-hidden p-6 flex flex-col justify-center gap-4";

const float = (delay = 0) => ({
  animate: { y: [0, -8, 0] },
  transition: { duration: 4, repeat: Infinity, ease: "easeInOut", delay },
});

const AudienceVisual = () => (
  <div className={shell}>
    <div className="flex items-center gap-2 text-sm text-muted-foreground">
      <Search className="w-4 h-4 text-primary" />
      Recherche de niche
    </div>
    {[
      { label: "Perte de poids après 40 ans", score: "92" },
      { label: "Anxiété au travail", score: "87" },
      { label: "Apprendre à investir", score: "78" },
    ].map((row, i) => (
      <motion.div
        key={row.label}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 + i * 0.15 }}
        className="rounded-xl border border-border/60 bg-background/60 p-4"
      >
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-foreground">{row.label}</span>
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
      {...float(0.5)}
      className="self-end flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1.5 text-xs text-primary"
    >
      <Target className="w-3.5 h-3.5" /> Problème identifié
    </motion.div>
  </div>
);

const OfferVisual = () => (
  <div className={shell}>
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="rounded-2xl border border-primary/40 bg-background/70 p-6"
    >
      <div className="flex items-center gap-2 text-xs text-primary mb-4">
        <Sparkles className="w-3.5 h-3.5" /> Ton offre
      </div>
      <p className="text-lg font-medium mb-4">
        « Perds 5 kg en 30 jours sans salle de sport »
      </p>
      <div className="space-y-2">
        {["Promesse claire", "Résultat mesurable", "Prix juste"].map((item, i) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 + i * 0.15 }}
            className="flex items-center gap-2 text-sm text-muted-foreground"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            {item}
          </motion.div>
        ))}
      </div>
    </motion.div>
    <div className="flex items-center gap-3">
      <motion.div
        {...float(0.2)}
        className="rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm"
      >
        <span className="text-muted-foreground line-through mr-2">200 €</span>
        <span className="text-primary font-semibold">97 €</span>
      </motion.div>
      <motion.div
        {...float(0.6)}
        className="rounded-xl border border-border/60 bg-background/60 px-4 py-3 text-sm text-muted-foreground"
      >
        Livraison automatique
      </motion.div>
    </div>
  </div>
);

const AvatarVisual = () => (
  <div className={shell}>
    <div className="relative mx-auto w-[190px] h-[300px] rounded-[26px] border border-border/60 bg-background/70 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/25 to-transparent" />
      <motion.div
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 3, repeat: Infinity }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-primary/20 border border-primary/50 flex items-center justify-center"
      >
        <Bot className="w-7 h-7 text-primary" />
      </motion.div>
      <div className="absolute bottom-16 left-4 right-4">
        <p className="text-xs text-muted-foreground mb-1">Avatar IA · Léa</p>
        <p className="text-sm">« 3 erreurs qui bloquent ta perte de poids »</p>
      </div>
      <div className="absolute bottom-4 left-4 right-4 flex items-center gap-4 text-xs text-muted-foreground">
        <motion.span
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex items-center gap-1"
        >
          <Heart className="w-3.5 h-3.5 text-primary" /> 12,4k
        </motion.span>
        <span className="flex items-center gap-1">
          <MessageCircle className="w-3.5 h-3.5" /> 384
        </span>
      </div>
    </div>
    <motion.div
      {...float(0.4)}
      className="self-center rounded-full border border-primary/40 bg-primary/10 px-4 py-1.5 text-xs text-primary"
    >
      Jamais ton visage à l'écran
    </motion.div>
  </div>
);

const visuals = {
  audience: AudienceVisual,
  offre: OfferVisual,
  avatar: AvatarVisual,
};

export type StepVisualKind = keyof typeof visuals;

export const StepVisual = ({ kind }: { kind: StepVisualKind }) => {
  const Component = visuals[kind];
  return <Component />;
};

export default StepVisual;
