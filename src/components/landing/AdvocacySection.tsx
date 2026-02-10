import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const AdvocacySection = () => {
  return (
    <section id="advocacy" className="py-20 md:py-28 px-6 scroll-mt-20">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mx-auto mb-6"
        >
          <Heart className="w-6 h-6 text-primary" />
        </motion.div>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-3xl md:text-4xl text-foreground mb-6"
        >
          Advocacy the human way.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto"
        >
          Call us old-fashioned, but we believe the best care still comes from human connection. 
          The healthcare system is stretched thin, and while clinicians are trying their best, 
          time constraints and unreimbursed work can leave gaps in support.
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-base leading-relaxed max-w-2xl mx-auto mt-4"
        >
          At LIORA, the answer isn't another automated tool. It's women raising their hands to help other women. 
          Every advocate is a real person, trained and ready to provide empathy, guidance, and understanding.
        </motion.p>
      </div>
    </section>
  );
};

export default AdvocacySection;
