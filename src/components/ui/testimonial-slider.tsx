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
        title: "J'ai failli abandonner au bout de 11 vidéos",
        quote:
            "Mes 11 premières vidéos ont fait 200 vues chacune, j'étais prêt à tout lâcher. J'ai repris le module sur les scripts, changé mon accroche et la 14e vidéo est partie à 340 000 vues. Mon ebook sur la reprise du sport après 40 ans a fait 68 ventes en dix jours. Je bosse toujours à l'usine, mais plus pour longtemps.",
        author: "Lucas M.",
        context: "32 ans, Lille · niche fitness",
    },
    {
        id: 2,
        title: "Mon mari ne sait toujours pas que c'est un avatar",
        quote:
            "Je voulais un revenu en plus le soir, sans passer devant la caméra parce que je suis prof et que mes élèves me trouvent partout. L'avatar IA a réglé le problème en une soirée. Trois mois plus tard je suis à 1 400€ par mois avec un pack de fiches d'organisation. Ma seule erreur : avoir attendu deux ans avant de me lancer.",
        author: "Sarah B.",
        context: "38 ans, Nantes · niche organisation",
    },
    {
        id: 3,
        title: "Je vendais un truc que personne ne voulait",
        quote:
            "Avant, je proposais une formation « productivité » générale, zéro vente en deux mois. Le module sur la niche m'a forcé à aller lire 400 commentaires TikTok. Résultat : j'ai créé un template Notion pour les freelances qui oublient de facturer. 39€, 210 ventes depuis février. C'est le problème précis qui a tout changé, pas la technique.",
        author: "Mehdi K.",
        context: "27 ans, Lyon · niche freelance",
    },
    {
        id: 4,
        title: "Deux heures le dimanche, un mois de contenu",
        quote:
            "Je suis infirmière, je n'ai clairement pas le temps de filmer. Je bloque deux heures le dimanche : je génère les scripts, mon avatar les tourne, je programme 30 vidéos. Le reste de la semaine je ne touche à rien à part répondre aux commentaires. Mon dernier mois : 2 100€ de ventes sur une mini-formation sur le sommeil.",
        author: "Elena R.",
        context: "41 ans, Toulouse · niche sommeil",
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
