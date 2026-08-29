import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { Bot, Check, ChevronLeft, ChevronRight, Layers, Package, Rocket, Search, Sparkles, Target, Video, Workflow } from 'lucide-react'
import { useRef, useState } from 'react'

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

const ModuleCard = ({ module, index }: { module: (typeof modules)[number]; index: number }) => {
  return (
    <div className="group relative h-full flex flex-col">
      <div className="relative h-full overflow-hidden rounded-[28px] border border-border/60 bg-card/70 backdrop-blur-sm p-6 md:p-7 transition-transform duration-500 md:group-hover:-translate-y-1.5">
        <div className="pointer-events-none absolute -top-24 -right-16 h-52 w-52 rounded-full bg-primary/15 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <span className="pointer-events-none absolute -bottom-5 right-1 text-[80px] leading-none font-semibold text-primary/5 transition-all duration-500 group-hover:text-primary/10 select-none">
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="relative flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-2xl bg-primary/30 blur-md opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/25 to-primary/5 border border-primary/30 flex items-center justify-center transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
              <module.icon className="w-5 h-5 text-primary" />
            </div>
          </div>
          <div>
            <p className="text-[11px] uppercase tracking-[0.18em] text-primary/80">Module {index + 1}</p>
            <h3 className="text-lg md:text-xl font-medium mt-0.5">{module.title}</h3>
          </div>
        </div>

        <ul className="relative mt-5 space-y-2.5 flex-1">
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
  const scrollRef = useRef<HTMLDivElement>(null)
  const [activeIndex, setActiveIndex] = useState(0)

  const scrollTo = (direction: 'left' | 'right') => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.firstElementChild?.clientWidth || 320
    const gap = 16
    const newIndex = direction === 'left'
      ? Math.max(0, activeIndex - 1)
      : Math.min(modules.length - 1, activeIndex + 1)
    el.scrollTo({ left: newIndex * (cardWidth + gap), behavior: 'smooth' })
    setActiveIndex(newIndex)
  }

  const onScroll = () => {
    const el = scrollRef.current
    if (!el) return
    const cardWidth = el.firstElementChild?.clientWidth || 320
    const gap = 16
    const index = Math.round(el.scrollLeft / (cardWidth + gap))
    setActiveIndex(Math.min(index, modules.length - 1))
  }

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

        {/* Mobile carousel */}
        <div className="md:hidden relative">
          <div
            ref={scrollRef}
            onScroll={onScroll}
            className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 -mx-6 px-6 scrollbar-hide"
          >
            {modules.map((module, index) => (
              <div key={module.id} className="w-[82vw] shrink-0 snap-start">
                <ModuleCard module={module} index={index} />
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between px-2 mt-4">
            <button
              type="button"
              onClick={() => scrollTo('left')}
              disabled={activeIndex === 0}
              className="p-2 rounded-full border border-border/60 bg-card disabled:opacity-30 transition-opacity"
              aria-label="Module précédent"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex gap-2">
              {modules.map((_, i) => (
                <span
                  key={i}
                  className={`block h-1.5 rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 bg-primary' : 'w-1.5 bg-primary/30'}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => scrollTo('right')}
              disabled={activeIndex === modules.length - 1}
              className="p-2 rounded-full border border-border/60 bg-card disabled:opacity-30 transition-opacity"
              aria-label="Module suivant"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Desktop bento grid */}
        <StaggerContainer className="hidden md:block">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {modules.map((module, index) => (
              <AnimateOnView key={module.id} delay={index * 0.05} className="h-full">
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
