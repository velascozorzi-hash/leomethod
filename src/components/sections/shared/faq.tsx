import Container from "@/components/container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import FaqVisual from "@/components/ui/faq-visual";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "J'ai zéro expérience.",
    answer: "Mes élèves partent de zéro. Les 9 modules reprennent tout depuis le début, et je valide chaque étape avec toi.",
  },
  {
    question: "J'ai pas de budget.",
    answer: "C'est justement l'intérêt du modèle : 0€ de pub, 0€ de stock, plateforme gratuite. Ton seul investissement c'est l'accompagnement et ton temps.",
  },
  {
    question: "Les produits digitaux c'est saturé.",
    answer: "Aucune niche globale n'est saturée. Des sous-niches le sont, d'autres s'ouvrent chaque mois. C'est exactement pour ça que je mets la liste à jour tous les mois.",
  },
  {
    question: "Je peux pas le faire seul ?",
    answer: "Techniquement oui. Tout ce que je t'explique existe quelque part. La question c'est combien de temps tu vas mettre à trier le vrai du faux — et si tu tiendras jusque-là. Moi j'ai perdu 6 500€ à essayer seul.",
  },
  {
    question: "J'ai peur que ce soit encore une arnaque.",
    answer: "Je comprends. C'est pour ça qu'il y a une garantie résultat de 90 jours. Si tu appliques et que t'as pas de résultats, je rembourse.",
  },
  {
    question: "J'ai pas le temps, je bosse ou je suis en cours.",
    answer: "Le modèle est fait pour ça. Pas de logistique, pas de SAV, pas de caméra. Quelques heures par semaine suffisent pour produire et publier.",
  },
  {
    question: "Comment se passe l'accompagnement ?",
    answer: "Tu m'as en direct. Je réponds sous 12h maximum. Pas de support générique, pas de community manager.",
  },
];

const FAQ = () => {

  return (
    <section className="md:pt-20 xl:pt-32 pt-12 md:pb-20 xl:pb-32 pb-12">
      <Container>
        <AnimateOnView once blur>
          <div className="text-center mb-8 md:mb-24">
            <h2 className="h2">Questions fréquentes</h2>
          </div>
        </AnimateOnView>

        <div className="flex flex-col lg:flex-row gap-16 items-center justify-center">
          <AnimateOnView once className="max-w-[500px] w-full">
            <div className="relative aspect-square w-full rounded-3xl overflow-hidden bg-gradient-to-br from-card to-background border border-border/50 shadow-2xl">
              <FaqVisual />
            </div>
          </AnimateOnView>

          <div className="max-w-[500px] w-full">
            <AnimateOnView once y={40}>
              <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-b border-border/40 px-0">
                    <AccordionTrigger className="text-left py-6 hover:no-underline [&>svg]:hidden">
                      <span className="h4 pr-8">{faq.question}</span>
                      <div className="relative flex items-center justify-center w-6 h-6 shrink-0">
                        <Minus className="absolute w-5 h-5 transition-transform duration-300 scale-0 rotate-90 group-data-[state=open]:scale-100 group-data-[state=open]:rotate-0" />
                        <Plus className="absolute w-5 h-5 transition-transform duration-300 scale-100 rotate-0 group-data-[state=open]:scale-0 group-data-[state=open]:rotate-90" />
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pb-6 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimateOnView>
          </div>
        </div>

        <AnimateOnView once y={20} delay={0.2} className="">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 max-w-xl mx-auto md:mt-20 mt-8 md:py-2 md:pr-2 py-4 pr-4 pl-8 md:rounded-full rounded-md bg-card/50 border border-border/50 backdrop-blur-sm">
            <p className="text-lg font-medium text-center sm:text-left">
              Tu as encore une question ?
            </p>
            <Button asChild className="rounded-full px-6 bg-foreground text-background hover:bg-foreground/90 w-full sm:w-auto">
              <a href="#offre">
                Voir l'offre
              </a>
            </Button>
          </div>
        </AnimateOnView>
      </Container>
    </section>
  );
};

export default FAQ;

