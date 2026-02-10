import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const LongHaulSection = () => {
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
          LIORA is with you for the long haul.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-muted-foreground text-lg mb-8 max-w-lg mx-auto"
        >
          Your advocate doesn't just show up for one appointment — they stay by your side throughout your care journey.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button variant="hero" size="lg" className="px-10 py-6 text-base" asChild>
            <Link to="/support">Match with an Advocate</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default LongHaulSection;
