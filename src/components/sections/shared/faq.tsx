import Container from "@/components/container";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { AnimateOnView } from "@/components/ui/motion/animate-on-view";
import FaqVisual from "@/components/ui/faq-visual";
import { Minus, Plus } from "lucide-react";

const faqs = [
  {
    question: "À qui s'adresse cette formation ?",
    answer: "À toute personne qui veut créer un revenu en ligne avec l'IA, même en partant de zéro : pas besoin d'audience, de compétence technique ni de montrer son visage.",
  },
  {
    question: "Combien de temps par jour dois-je y consacrer ?",
    answer: "Une à deux heures par jour suffisent pour avancer sérieusement. Le plan d'action est découpé en étapes courtes que tu peux faire à ton rythme.",
  },
  {
    question: "Faut-il un budget publicitaire ?",
    answer: "Non. Toute la méthode repose sur du contenu organique sur TikTok, généré et optimisé avec l'IA. Zéro euro de pub nécessaire pour démarrer.",
  },
  {
    question: "Est-ce que j'ai un accès à vie ?",
    answer: "Oui. Tu gardes l'accès à la formation et à toutes ses mises à jour futures, sans abonnement ni frais cachés.",
  }
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
                {faqs.slice(0, 4).map((faq, index) => (
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

