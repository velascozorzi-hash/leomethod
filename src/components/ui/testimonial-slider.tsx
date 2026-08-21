import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import * as React from "react"

interface Testimonial {
    id: number
    title: string
    quote: string
    author: string
    context: string
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        title: "Première vente 9 jours après avoir commencé",
        quote:
            "Je suis parti de zéro, aucune audience. J'ai suivi les modules dans l'ordre, sorti mon avatar et publié tous les jours. Neuf jours plus tard, première vente de mon ebook à 29€, puis 12 autres dans la foulée.",
        author: "Lucas M.",
        context: "24 ans, Lille",
    },
    {
        id: 2,
        title: "Simple et clair",
        quote: "Formation carrée, rien de superflu. J'ai suivi les étapes dans l'ordre, mon avatar était prêt en deux soirs.",
        author: "Sarah B.",
        context: "22 ans, Nantes",
    },
    {
        id: 3,
        title: "210 ventes sur mon template",
        quote:
            "Avant je vendais un truc trop général, zéro vente. Le module niche m'a forcé à lire des centaines de commentaires TikTok. Résultat : un template Notion à 39€ qui part tout seul.",
        author: "Mehdi K.",
        context: "26 ans, Lyon",
    },
    {
        id: 4,
        title: "Je poste sans montrer ma tête",
        quote: "C'était mon seul blocage. Réglé en une soirée avec l'avatar. Je publie 2 vidéos par jour depuis.",
        author: "Enzo T.",
        context: "20 ans, Bordeaux",
    },
    {
        id: 5,
        title: "Rentabilisée en 3 semaines",
        quote: "J'ai récupéré le prix de la formation en trois semaines. Rien à dire.",
        author: "Camille D.",
        context: "25 ans, Rennes",
    },
    {
        id: 6,
        title: "Les prompts valent le prix à eux seuls",
        quote: "Je génère 30 scripts en une soirée avec les prompts fournis. Ça m'a enlevé la partie que je détestais.",
        author: "Yanis A.",
        context: "23 ans, Marseille",
    },
    {
        id: 7,
        title: "Étudiante, 2 h par semaine",
        quote: "Je bosse dessus le dimanche entre deux partiels. Premier mois : 640€ avec un pack de fiches.",
        author: "Léa P.",
        context: "21 ans, Montpellier",
    },
    {
        id: 8,
        title: "Enfin du concret",
        quote: "J'avais déjà acheté deux formations vagues. Là c'est du pas-à-pas, tu ouvres l'outil et tu fais.",
        author: "Théo R.",
        context: "27 ans, Paris",
    },
    {
        id: 9,
        title: "Mon tunnel tourne tout seul",
        quote: "Paiement, livraison, relances : tout est automatisé. Je me réveille avec des ventes, c'est bizarre au début.",
        author: "Inès B.",
        context: "28 ans, Strasbourg",
    },
    {
        id: 10,
        title: "Top",
        quote: "Clair, rapide, français. Je recommande à ceux qui veulent tester sans se filmer.",
        author: "Noah L.",
        context: "19 ans, Toulouse",
    },
]


const TestimonialSlider = () => {
    const [currentIndex, setCurrentIndex] = React.useState(0)
    const [direction, setDirection] = React.useState(0)

    const next = () => {
        setDirection(1)
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }

    const prev = () => {
        setDirection(-1)
        setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    }

    const active = testimonials[currentIndex]

    return (
        <div className="w-full max-w-4xl mx-auto overflow-hidden">
            <div className="relative min-h-[340px] md:min-h-[300px] flex items-center">
                <motion.div
                    key={active.id}
                    className="w-full rounded-[28px] border border-border/60 bg-card/50 p-6 md:p-10"
                    initial={{ opacity: 0, x: direction > 0 ? 60 : -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ type: "spring", damping: 25, stiffness: 200 }}
                >
                    <Quote className="w-8 h-8 text-primary mb-5" />
                    <h3 className="h4 mb-4">{active.title}</h3>
                    <p className="text-base md:text-lg text-muted-foreground mb-6">{active.quote}</p>
                    <div>
                        <p className="font-medium">{active.author}</p>
                        <p className="text-sm text-muted-foreground">{active.context}</p>
                    </div>
                </motion.div>
            </div>

            {/* Contrôles */}
            <div className="flex flex-col-reverse md:flex-row items-center md:justify-between justify-center gap-4 md:gap-0 mt-8">
                <div className="flex gap-4">
                    <button
                        onClick={prev}
                        className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors group"
                        aria-label="Témoignage précédent"
                    >
                        <ChevronLeft className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </button>
                    <button
                        onClick={next}
                        className="w-12 h-12 rounded-full border border-border flex items-center justify-center hover:bg-muted transition-colors group"
                        aria-label="Témoignage suivant"
                    >
                        <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </button>
                </div>

                <div className="text-muted-foreground font-medium tabular-nums">
                    <span className="text-foreground">{currentIndex + 1}</span>
                    <span className="mx-1">/</span>
                    <span>{testimonials.length}</span>
                </div>
            </div>
        </div>
    )
}

export default TestimonialSlider
