import { AnimateOnView } from '@/components/ui/motion/animate-on-view';
import { StaggerContainer } from '@/components/ui/motion/stagger';
import { motion } from 'framer-motion';
import { Bot, CalendarCheck, CreditCard, Mail, Play, TrendingUp } from 'lucide-react';
import Container from '../../container';

const ScriptsVisual = () => (
  <div className="space-y-2.5">
    {['Accroche : « Tu perds 3 h par semaine à… »', 'Problème : ce que ta niche vit vraiment', 'Solution : ton produit en 1 phrase'].map(
      (line, i) => (
        <motion.div
          key={line}
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 * i }}
          className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/60 px-3.5 py-3"
        >
          <Play className="w-3.5 h-3.5 text-primary shrink-0" />
          <span className="text-sm text-muted-foreground">{line}</span>
        </motion.div>
      )
    )}
  </div>
);

const AutomationVisual = () => {
  const steps = [
    { icon: CreditCard, label: 'Paiement' },
    { icon: Mail, label: 'Livraison' },
    { icon: CalendarCheck, label: 'Relance' },
  ];
  return (
    <div className="flex items-center justify-between gap-2">
      {steps.map((step, i) => (
        <motion.div
          key={step.label}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 * i }}
          className="flex-1 rounded-xl border border-border/60 bg-background/60 p-3 text-center"
        >
          <motion.div
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
            className="mx-auto mb-2 w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center"
          >
            <step.icon className="w-4 h-4 text-primary" />
          </motion.div>
          <span className="text-xs text-muted-foreground">{step.label}</span>
        </motion.div>
      ))}
    </div>
  );
};

const RevenueVisual = () => {
  const bars = [22, 38, 30, 55, 72, 100];
  return (
    <div>
      <div className="flex items-end gap-2 h-[104px]">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 * i, duration: 0.6 }}
            className="flex-1 rounded-t-md bg-primary/70"
          />
        ))}
      </div>
      <div className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
        <TrendingUp className="w-4 h-4 text-primary" />
        Semaine 1 → Semaine 6 : premières ventes
      </div>
    </div>
  );
};

const AvatarVisual = () => (
  <div className="flex items-center gap-3">
    {['Visage', 'Voix', 'Ton'].map((label, i) => (
      <motion.div
        key={label}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 * i }}
        className="flex-1 rounded-xl border border-border/60 bg-background/60 py-4 text-center"
      >
        <motion.div
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.35 }}
          className="mx-auto mb-2 w-8 h-8 rounded-full bg-primary/20 border border-primary/40"
        />
        <span className="text-xs text-muted-foreground">{label}</span>
      </motion.div>
    ))}
  </div>
);

const NicheVisual = () => (
  <div className="space-y-2.5">
    {['Niche repérée', 'Problème douloureux', 'Offre alignée'].map((line, i) => (
      <motion.div
        key={line}
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.15 * i }}
        className="flex items-center gap-3 rounded-xl border border-border/60 bg-background/60 px-3.5 py-3"
      >
        <Target className="w-3.5 h-3.5 text-primary shrink-0" />
        <span className="text-sm text-muted-foreground">{line}</span>
      </motion.div>
    ))}
  </div>
);

const ProductVisual = () => (
  <div className="grid grid-cols-3 gap-2">
    {[
      { icon: FileText, label: 'Ebook' },
      { icon: LayoutTemplate, label: 'Template' },
      { icon: GraduationCap, label: 'Formation' },
    ].map((item, i) => (
      <motion.div
        key={item.label}
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12 * i }}
        className="rounded-xl border border-border/60 bg-background/60 p-3 text-center"
      >
        <item.icon className="mx-auto mb-2 w-4 h-4 text-primary" />
        <span className="text-xs text-muted-foreground">{item.label}</span>
      </motion.div>
    ))}
  </div>
);

const features = [
  {
    id: 1,
    icon: Sparkles,
    title: 'Ton avatar IA prêt à publier',
    description: "Un personnage crédible, avec sa voix et son ton, qui parle à ta place sur TikTok.",
    visual: <AvatarVisual />,
  },
  {
    id: 2,
    icon: Target,
    title: 'Une niche et un problème précis',
    description: "Tu sais exactement à qui tu parles et quel problème payant tu viens résoudre.",
    visual: <NicheVisual />,
  },
  {
    id: 3,
    icon: Bot,
    title: 'Du contenu TikTok qui convertit',
    description: "Des scripts et formats testés, générés avec l'IA, sans jamais montrer ton visage.",
    visual: <ScriptsVisual />,
  },
  {
    id: 4,
    icon: FileText,
    title: 'Ton produit digital fini',
    description: "Ebook, template ou mini-formation : un produit réellement livrable, créé en quelques jours.",
    visual: <ProductVisual />,
  },
  {
    id: 5,
    icon: Mail,
    title: 'Une automatisation de A à Z',
    description: "Livraison, paiements et relances : ton produit se vend même quand tu n'es pas là.",
    visual: <AutomationVisual />,
  },
  {
    id: 6,
    icon: TrendingUp,
    title: 'Tes premiers euros en quelques semaines',
    description: "Un plan d'action jour par jour pour publier, tester, ajuster et encaisser tes premières ventes.",
    visual: <RevenueVisual />,
  },
];


const Content = () => {
  return (
    <section className="py-12 md:py-[60px]">
      <Container className="space-y-8 md:space-y-16">
        <StaggerContainer className="text-center">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">Ce que tu mets en place concrètement</h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              Un système simple, reproductible, et pensé pour être lancé en solo.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <AnimateOnView key={feature.id} delay={index * 0.1}>
                <div className="h-full rounded-[28px] border border-border/60 bg-card/50 p-6 md:p-7 flex flex-col gap-5">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <feature.icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="h4">{feature.title}</h3>
                  </div>
                  <p className="text-muted-foreground text-sm md:text-base">{feature.description}</p>
                  <div className="mt-auto pt-2">{feature.visual}</div>
                </div>
              </AnimateOnView>
            ))}
          </div>
        </StaggerContainer>
      </Container>
    </section>
  );
};

export default Content;
