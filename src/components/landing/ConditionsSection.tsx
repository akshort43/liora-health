import { motion } from "framer-motion";

const conditions = [
  "You're struggling to get a diagnosis",
  "You're unsure about a treatment plan",
  "You're tired of being bounced around the system",
  "You leave appointments feeling anxious, dismissed or confused",
];

const ConditionsSection = () => {
  return (
    <section className="py-20 px-6 bg-warm-peach">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-4xl text-foreground mb-4"
        >
          Complex conditions deserve more thoughtful care.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg mb-10"
        >
          LIORA advocates support you when:
        </motion.p>

        <div className="space-y-4 max-w-lg mx-auto">
          {conditions.map((condition, index) => (
            <motion.div
              key={condition}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="flex items-start gap-3 text-left"
            >
              <span className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
              <p className="text-foreground text-base">{condition}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ConditionsSection;
