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
    label: 'Module 1',
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
    label: 'Module 2',
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
    label: 'Module 3',
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
    label: 'Module 4',
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
    label: 'Module 5',
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
    label: 'Module 6',
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
    label: 'Module 7',
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
    label: 'Module 8',
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
    label: 'Module 9',
    title: "Automatiser et scaler avec l'IA",
    lessons: [
      'Les prompts d\'automatisation pour produire plus vite, du script à la publication',
      'Automatiser les tâches répétitives de A à Z',
      'Dupliquer le système sur une deuxième niche ou un deuxième avatar',
      'Les chiffres à suivre chaque semaine pour ajuster',
    ],
  },
]



const MOBILE_PREVIEW = 0

const ModuleCard = ({ module, index }: { module: (typeof modules)[number]; index: number }) => {
  const [open, setOpen] = useState(false)
  const hasMore = module.lessons.length > MOBILE_PREVIEW
  const visibleLessons = open ? module.lessons : module.lessons.slice(0, MOBILE_PREVIEW)

  return (
    <div className="group relative h-full">
      {/* halo animé */}
      <div className="pointer-events-none absolute -inset-px rounded-[26px] bg-gradient-to-br from-primary/50 via-primary/0 to-primary/30 opacity-40 blur-[2px] transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative h-full overflow-hidden rounded-[26px] border border-border/60 bg-card/70 backdrop-blur-sm p-6 md:p-8 transition-transform duration-500 md:group-hover:-translate-y-1.5">
        {/* lueur au survol */}
        <div className="pointer-events-none absolute -top-24 -right-16 h-52 w-52 rounded-full bg-primary/20 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        {/* numéro filigrane */}
        <span className="pointer-events-none absolute -bottom-6 right-2 text-[110px] leading-none font-semibold text-primary/5 transition-all duration-500 group-hover:text-primary/10 group-hover:-translate-y-1 select-none">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative flex items-start gap-4">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <module.icon className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-[11px] uppercase tracking-[0.18em] text-primary">{module.label}</p>
              <span className="h-px flex-1 bg-gradient-to-r from-primary/40 to-transparent" />
            </div>
            <h3 className="text-lg md:text-2xl font-medium mt-1.5">{module.title}</h3>
          </div>
        </div>

        <div className="relative mt-5 h-px w-full bg-border/60 overflow-hidden">
          <span className="absolute inset-y-0 left-0 w-0 bg-primary transition-all duration-700 group-hover:w-full" />
        </div>

        {/* Mobile : extrait + voir tout */}
        <ul className="md:hidden space-y-2 mt-4">
          {visibleLessons.map((lesson) => (
            <li key={lesson} className="flex items-start gap-2.5 text-muted-foreground text-sm">
              <Check className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <span className={open ? undefined : 'line-clamp-2'}>{lesson}</span>
            </li>
          ))}
        </ul>
        {hasMore && (
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="md:hidden mt-3 flex items-center gap-1.5 text-sm text-primary"
            aria-expanded={open}
          >
            {open ? 'Réduire' : `Voir les ${module.lessons.length} points`}
            <ChevronDown className={`w-4 h-4 transition-transform ${open ? 'rotate-180' : ''}`} />
          </button>
        )}

        {/* Desktop : liste complète */}
        <ul className="hidden md:block space-y-3 mt-5">
          {module.lessons.map((lesson) => (
            <li
              key={lesson}
              className="flex items-start gap-2.5 text-muted-foreground text-base transition-colors duration-300 group-hover:text-foreground/80"
            >
              <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
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
    <section id="programme" className="py-12 md:py-[60px] scroll-mt-24">
      <Container className="space-y-8 md:space-y-16">
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

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {modules.map((module, index) => (
              <AnimateOnView
                key={module.id}
                delay={(index % 2) * 0.1}
                className={index === modules.length - 1 && modules.length % 2 === 1 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : undefined}
              >
                <ModuleCard module={module} index={index} />
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
