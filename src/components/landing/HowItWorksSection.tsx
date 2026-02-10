import { motion } from "framer-motion";
import { Calendar, Headphones, ClipboardCheck } from "lucide-react";

const steps = [
  {
    icon: Calendar,
    title: "Before your appointment",
    description:
      "Connect with your advocate to map your health journey and plan key goals/questions for your upcoming appointment.",
  },
  {
    icon: Headphones,
    title: "During your appointment",
    description:
      "Your advocate joins you virtually to take notes and ask clarifying questions.",
  },
  {
    icon: ClipboardCheck,
    title: "After your appointment",
    description:
      "Debrief what was said, clarify next steps, and create a care plan that aligns with your goals and needs.",
  },
];

const HowItWorksSection = () => {
  return (
    <section id="how-it-works" className="py-20 md:py-28 px-6 scroll-mt-20">
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-4xl text-foreground text-center mb-16"
        >
          How LIORA Works
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/15 flex items-center justify-center mx-auto mb-5 group-hover:bg-primary/25 transition-colors duration-300">
                <step.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-display text-xl text-foreground mb-3">
                {step.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-muted-foreground text-sm text-center mt-12 max-w-2xl mx-auto leading-relaxed"
        >
          You'll be matched with an advocate based on your intake survey. Our advocates include nurses, social workers, dietitians, physical therapists, psychologists, medical students, and trained peer supporters with lived experience.
        </motion.p>
      </div>
    </section>
  );
};

export default HowItWorksSection;
