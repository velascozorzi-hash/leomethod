import Container from '@/components/container'
import { Button } from '@/components/ui/button'
import { AnimateOnView } from '@/components/ui/motion/animate-on-view'
import { StaggerContainer } from '@/components/ui/motion/stagger'
import { Bot, Check, Search, ShoppingBag, Video, Wrench } from 'lucide-react'

const modules = [
  {
    id: 1,
    icon: Search,
    label: 'Module 1',
    title: 'Trouver la niche et le problème à résoudre',
    duration: '8 leçons · 1 h 10',
    lessons: [
      'Les 12 niches les plus rentables en 2026 et pourquoi',
      'La méthode pour repérer un problème douloureux et payant',
      "Analyser les commentaires TikTok pour trouver les mots exacts de l'audience",
      'Vérifier la demande avant de créer quoi que ce soit',
    ],
  },
  {
    id: 2,
    icon: Bot,
    label: 'Module 2',
    title: "Créer ton avatar IA (le cœur du système)",
    duration: '10 leçons · 1 h 40',
    lessons: [
      "Choisir le visage, la voix et la personnalité de ton avatar IA",
      'Les outils de génération : configuration pas à pas, réglages inclus',
      "Rendre ton avatar crédible : regard, gestuelle, lip-sync, ton de voix",
      "Créer 2 ou 3 avatars pour tester plusieurs angles sans jamais montrer ta tête",
    ],
  },
  {
    id: 3,
    icon: Video,
    label: 'Module 3',
    title: 'Le contenu TikTok qui capte et qui vend',
    duration: '12 leçons · 2 h',
    lessons: [
      'Les 7 structures de script qui retiennent au-delà de 3 secondes',
      "Les prompts prêts à copier pour générer 30 scripts en une soirée",
      'Montage, sous-titres, sons : le format qui passe dans l\'algorithme',
      'Le calendrier de publication : 2 vidéos par jour en 45 minutes de travail',
    ],
  },
  {
    id: 4,
    icon: ShoppingBag,
    label: 'Module 4',
    title: 'Ton produit digital : ebook, template ou mini-formation',
    duration: '9 leçons · 1 h 30',
    lessons: [
      'Choisir le bon format selon ton problème et ton prix',
      "Écrire un ebook complet avec l'IA en un week-end",
      'Construire un template ou un pack Notion qui se vend seul',
      "Enregistrer une mini-formation sans caméra, uniquement avec ton avatar",
    ],
  },
  {
    id: 5,
    icon: Wrench,
    label: 'Module 5',
    title: 'Vendre et automatiser de A à Z',
    duration: '8 leçons · 1 h 20',
    lessons: [
      'Page de vente en 1 heure : structure, mots-clés, preuves',
      'Paiement, livraison automatique et emails de relance',
      'Lier ta bio TikTok à ton tunnel sans te faire brider',
      'Les chiffres à suivre chaque semaine pour ajuster',
    ],
  },
]


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
              5 modules, 47 leçons et plus de 7 heures de vidéo : de la niche à ton premier avatar IA,
              jusqu'aux ventes automatisées.
            </p>
          </AnimateOnView>
        </StaggerContainer>

        <StaggerContainer>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {modules.map((module, index) => (
              <AnimateOnView
                key={module.id}
                delay={(index % 2) * 0.1}
                className={index === modules.length - 1 && modules.length % 2 === 1 ? 'md:col-span-2 md:w-1/2 md:mx-auto' : undefined}
              >
                <div className="h-full rounded-[28px] border border-border/60 bg-card/50 p-6 md:p-8">

                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center">
                      <module.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-wide text-primary">{module.label}</p>
                      <p className="text-xs text-muted-foreground">{module.duration}</p>
                    </div>
                  </div>
                  <h3 className="h4 mb-4">{module.title}</h3>
                  <ul className="space-y-2.5">
                    {module.lessons.map((lesson) => (
                      <li key={lesson} className="flex items-start gap-2.5 text-muted-foreground text-sm md:text-base">
                        <Check className="w-4 h-4 text-primary mt-1 shrink-0" />
                        <span>{lesson}</span>
                      </li>
                    ))}
                  </ul>
                </div>
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
