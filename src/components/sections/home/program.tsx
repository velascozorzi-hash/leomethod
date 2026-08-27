import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { Bot, Check, ChevronDown, Layers, Package, Rocket, Search, Sparkles, Target, Video, Workflow } from 'lucide-react'
import { useState } from 'react'

const modules = [
  {
    id: 1,
    icon: Search,
    title: 'Cibler une niche et son problème',
    lessons: [
      'Trouver une niche à fort potentiel, même en partant de zéro',
      "Identifier le problème que ton audience veut vraiment résoudre",
      'Le prompt d\'analyse de niche : il lit les commentaires TikTok et te sort les mots exacts de ta cible',
      'Valider la demande avant de créer quoi que ce soit',
    ],
  },
  {
    id: 2,
    icon: Bot,
    title: 'Créer ton avatar IA',
    lessons: [
      "Un personnage qui incarne ta marque à ta place : visage généré, voix clonée, mascotte",
      'Les outils de génération, réglages et configuration pas à pas',
      'Rendre ton avatar crédible : regard, gestuelle, lip-sync, ton de voix',
      "Créer plusieurs avatars pour tester des angles sans jamais montrer ta tête",
    ],
  },
  {
    id: 3,
    icon: Sparkles,
    title: 'Trouver ton idée de produit digital',
    lessons: [
      'Trouver une idée adaptée à ta niche et à son problème',
      'Choisir le bon format : ebook, template, pack ou mini-formation',
      "Le prompt de validation d'idée : il te dit si ton produit est vendable avant de le produire",
      "S'inspirer de ce qui marche déjà sans copier",
    ],
  },
  {
    id: 4,
    icon: Target,
    title: 'Stratégie de contenu',
    lessons: [
      'Savoir quoi poster et dans quelle direction aller',
      'Trouver ton angle et poser les bases de ton compte',
      'Les piliers de contenu qui attirent des acheteurs, pas des curieux',
      "Le prompt calendrier : un mois d'idées de vidéos généré en quelques minutes",
    ],
  },
  {
    id: 5,
    icon: Video,
    title: 'Utiliser TikTok pour vendre',
    lessons: [
      'Attirer une audience qualifiée et promouvoir ton produit',
      'Les prompts de scripts TikTok qui retiennent au-delà de 3 secondes',
      'Montage, sous-titres, sons : le format qui passe dans l\'algorithme',
      'Publier vite : plusieurs vidéos par jour en moins d\'une heure',
    ],
  },
  {
    id: 6,
    icon: Layers,
    title: 'Structurer ton offre',
    lessons: [
      'Construire une offre claire et irrésistible',
      'Une promesse forte, un prix cohérent, des preuves',
      "Le prompt de rédaction d'offre : promesse, bonus et arguments rédigés pour toi",
      'Positionner ton offre face aux alternatives de ta niche',
    ],
  },
  {
    id: 7,
    icon: Package,
    title: 'Créer ton produit digital',
    lessons: [
      'Transformer ton savoir-faire en produit vendable : structure et contenu',
      "Le prompt ebook : un ebook complet rédigé avec Claude en un week-end",
      'Construire un template ou un pack Notion qui se vend seul',
      'Enregistrer une mini-formation avec ton avatar, sans caméra',
    ],
  },
  {
    id: 8,
    icon: Workflow,
    title: 'Construire ton système de vente',
    lessons: [
      'Un système simple pour présenter ton offre et convaincre',
      'Page de vente, paiement et livraison automatique',
      'Lier ta bio TikTok à ton tunnel sans te faire brider',
      "Le prompt emails de vente : des relances écrites pour toi qui récupèrent les ventes perdues",
    ],
  },
  {
    id: 9,
    icon: Rocket,
    title: "Automatiser et scaler avec l'IA",
    lessons: [
      'Les prompts d\'automatisation pour produire plus vite, du script à la publication',
      'Automatiser les tâches répétitives de A à Z',
      'Dupliquer le système sur une deuxième niche ou un deuxième avatar',
      'Les chiffres à suivre chaque semaine pour ajuster',
    ],
  },
]

const ModuleRow = ({ module, index }: { module: (typeof modules)[number]; index: number }) => {
  const [open, setOpen] = useState(false)

  return (
    <div className="group relative pl-12 md:pl-0">
      {/* timeline dot + number */}
      <div className="absolute left-0 top-0 md:left-1/2 md:-translate-x-1/2 flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full bg-card border border-border/80 shadow-[0_0_0_4px_hsl(var(--background))] z-10 transition-transform duration-500 group-hover:scale-110">
        <module.icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-primary" />
      </div>

      {/* card */}
      <div className={`
        relative overflow-hidden rounded-2xl border border-border/60 bg-card/70 backdrop-blur-sm p-5 md:p-6
        transition-all duration-500
        ${index % 2 === 0 ? 'md:mr-[calc(50%+24px)]' : 'md:ml-[calc(50%+24px)]'}
      `}>
        <div className="pointer-events-none absolute -top-16 -right-12 h-32 w-32 rounded-full bg-primary/10 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative flex items-start gap-3">
          <span className="text-xs font-medium text-primary/70 uppercase tracking-wider">Module {String(index + 1).padStart(2, '0')}</span>
        </div>

        <h3 className="relative text-lg md:text-xl font-medium mt-2 pr-10">{module.title}</h3>

        {/* mobile: toggle list */}
        <ul className={`md:hidden space-y-2 mt-3 overflow-hidden transition-all duration-300 ${open ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {module.lessons.map((lesson) => (
            <li key={lesson} className="flex items-start gap-2.5 text-muted-foreground text-sm">
              <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>{lesson}</span>
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden mt-2 flex items-center gap-1.5 text-sm text-primary"
        >
          {open ? 'Réduire' : 'Voir les points'}
          <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>

        {/* desktop: always show */}
        <ul className="hidden md:block space-y-2.5 mt-4">
          {module.lessons.map((lesson) => (
            <li key={lesson} className="flex items-start gap-2.5 text-muted-foreground text-sm transition-colors duration-300 group-hover:text-foreground/80">
              <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span>{lesson}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

const Program = () => {
  return (
    <section id="programme" className="py-14 md:py-24 scroll-mt-24 overflow-hidden">
      <Container className="space-y-10 md:space-y-16">
        <StaggerContainer className="text-center max-w-2xl mx-auto">
          <AnimateOnView blur>
            <h2 className="h2 md:mb-5 mb-3">Le contenu détaillé de la formation</h2>
          </AnimateOnView>
          <AnimateOnView blur delay={0.2}>
            <p className="text-muted-foreground">
              9 modules et plus de 5 h de vidéo, pas à pas : de la niche à ton avatar IA, jusqu'à un
              système de vente automatisé qui tourne sans toi.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer className="relative max-w-4xl mx-auto">
          {/* central line */}
          <div className="absolute left-4 top-3 bottom-3 w-px bg-border/60 md:left-1/2 md:-translate-x-1/2" />
          <div className="absolute left-4 top-3 w-px bg-gradient-to-b from-primary via-primary/50 to-transparent h-1/3 md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-6 md:space-y-8">
            {modules.map((module, index) => (
              <AnimateOnView
                key={module.id}
                delay={index * 0.06}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <ModuleRow module={module} index={index} />
              </AnimateOnView>
            ))}
          </div>
        </StaggerContainer>

        <AnimateOnView className="text-center">
          <Button asChild size="lg">
            <a href="#offre">Accéder au programme complet</a>
          </Button>
        </AnimateOnView>
      </Container>
    </section>
  )
}

export default Program
