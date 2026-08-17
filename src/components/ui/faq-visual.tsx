import { motion } from "framer-motion";
import { MessageCircleQuestion } from "lucide-react";

const messages = [
  { side: "q", text: "Je pars de zéro, c'est possible ?" },
  { side: "r", text: "Oui : ton avatar IA fait le contenu à ta place." },
  { side: "q", text: "Et si je ne veux pas montrer mon visage ?" },
  { side: "r", text: "Tu n'apparais jamais. Jamais." },
];

const FaqVisual = () => {
  return (
    <div className="relative w-full h-full p-6 md:p-8 flex flex-col justify-center gap-4">
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
        <MessageCircleQuestion className="w-4 h-4 text-primary" />
        Tes questions, nos réponses
      </div>

      {messages.map((m, i) => (
        <motion.div
          key={m.text}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 + i * 0.25 }}
          className={
            m.side === "q"
              ? "self-start max-w-[85%] rounded-2xl rounded-bl-sm border border-border/60 bg-background/70 px-4 py-3 text-sm"
              : "self-end max-w-[85%] rounded-2xl rounded-br-sm border border-primary/40 bg-primary/10 px-4 py-3 text-sm text-primary"
          }
        >
          {m.text}
        </motion.div>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.3 }}
        className="self-start flex items-center gap-1.5 rounded-full border border-border/60 bg-background/70 px-4 py-3"
      >
        {[0, 1, 2].map((d) => (
          <motion.span
            key={d}
            className="w-2 h-2 rounded-full bg-muted-foreground"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.2, repeat: Infinity, delay: d * 0.2 }}
          />
        ))}
      </motion.div>
    </div>
  );
};

export default FaqVisual;
