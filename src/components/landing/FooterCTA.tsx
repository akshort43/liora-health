import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const FooterCTA = () => {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="container mx-auto max-w-3xl text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-4xl md:text-5xl text-foreground mb-6"
        >
          We believe it really is that deep.
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button variant="hero" size="lg" className="px-10 py-6 text-base" asChild>
            <Link to="/support">Join the LIORA Community</Link>
          </Button>
        </motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-muted-foreground text-sm mt-6"
        >
          Whether you're looking for support, want to become an advocate, or just want to stay connected.
        </motion.p>
      </div>
    </section>
  );
};

export default FooterCTA;
