import { Button } from "@/components/ui/button";
import ChatMockup from "./ChatMockup";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="pt-28 pb-16 md:pt-36 md:pb-24 px-6">
      <div className="container mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-xl"
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] tracking-tight text-foreground mb-6">
              You shouldn't have to navigate the healthcare system alone.
            </h1>
            <p className="text-muted-foreground text-lg mb-4 leading-relaxed">
              Meet <span className="text-primary font-semibold">LIORA</span>, a patient advocacy platform that supports women living with chronic conditions before, during, and after medical appointments.
            </p>

            <Button variant="hero" size="lg" className="mt-4 px-10 py-6 text-base" asChild>
              <Link to="/support">Get Support</Link>
            </Button>

            <p className="text-muted-foreground text-sm mt-8 max-w-md leading-relaxed">
              We pair women with trained advocates who help her prepare for visits, navigate complex care, ask informed questions, and confidently understand next steps.
            </p>
          </motion.div>

          {/* Right - Chat Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            <ChatMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
