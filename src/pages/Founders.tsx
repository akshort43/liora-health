import Header from "@/components/landing/Header";
import SiteFooter from "@/components/SiteFooter";
import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import courtneyPhoto from "@/assets/courtney-headshot.png";
import amandaPhoto from "@/assets/amanda-headshot.png";

const founders = [
  {
    name: "Courtney Sherbal",
    role: "Co-Founder & CEO",
    photo: courtneyPhoto,
    email: "courtney@liorahealth.io",
    linkedin: "https://www.linkedin.com/in/courtney-sherbal-b30650104/",
    background: "Vanderbilt University; Harvard Business School (MBA Candidate).",
    livedExperience: "Autoimmune conditions and dysautonomia (POTS).",
    journey: [
      "Courtney is the kind of person who brings calm to complexity.",
      "She's spent years at the intersection of consumer, technology, and health & wellness, and she's also lived the patient experience from the inside—navigating autoimmune disease and chronic illness across countless appointments.",
      "One of the most personal parts of Courtney's story is the way she learned to advocate: from her mom. She's described watching her mom show up prepared—bringing notes, asking questions, and pushing gently but persistently when answers weren't coming. Over time, that taught Courtney a powerful truth: the system often rewards the people who are organized, confident, and persistent… even when they shouldn't have to be.",
      "LIORA is Courtney's way of making that support available to more women—so you don't need to be an expert, or have a family member who can take off work, or know the \"right\" questions. You just need someone in your corner.",
    ],
  },
  {
    name: "Amanda Berk",
    role: "Co-Founder & COO",
    photo: amandaPhoto,
    email: "amanda@liorahealth.io",
    linkedin: "https://www.linkedin.com/in/amanda-berk/",
    background: "Vanderbilt University; MSW/MPH Candidate (University of Texas).",
    livedExperience: "Thyroid and neurological conditions, including chronic migraine and motor tics.",
    journey: [
      "Amanda leads with warmth, curiosity, and a systems-level understanding of what patients are up against.",
      "She studied health through both the personal and the structural lens—medicine, public health, social work, and women's & gender studies—because she's always been drawn to the \"why\" behind healthcare: why some people get believed quickly while others don't, and why the burden of coordination so often falls on the patient.",
      "Amanda has also shared her experience navigating chronic conditions, and how deeply it shaped what she values: clear communication, continuity of care, and human support that doesn't end when the appointment does.",
      "With LIORA, Amanda brings together those strengths—empathy, advocacy, and a practical understanding of healthcare systems—to help women feel more supported, more prepared, and more empowered.",
    ],
  },
];

const Founders = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16 md:pt-36 md:pb-24 px-6">
        <div className="container mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-display text-4xl md:text-5xl tracking-tight text-foreground mb-4">
              Our Story
            </h1>
            <p className="text-muted-foreground text-lg mb-16 leading-relaxed max-w-2xl">
              Cousins Courtney and Amanda created LIORA out of shared frustration with feeling dismissed and defeated after too many medical visits. Here are their journeys.
            </p>
          </motion.div>

          <div className="space-y-20">
            {founders.map((founder, index) => (
              <motion.article
                key={founder.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.1 * index }}
              >
                {/* Photo & title */}
                <div className="flex items-center gap-5 mb-6">
                  {founder.photo ? (
                    <img
                      src={founder.photo}
                      alt={`${founder.name} headshot`}
                      className="w-60 h-60 rounded-full object-cover shrink-0 border-2 border-primary/20"
                    />
                  ) : (
                    <div className="w-60 h-60 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                      <span className="font-display text-6xl text-primary">
                        {founder.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl text-foreground">{founder.name}</h2>
                    <p className="text-primary text-sm font-medium mb-1">{founder.role}</p>
                    {(founder.email || founder.linkedin) && (
                      <div className="flex items-center gap-3">
                        {founder.email && (
                          <a
                            href={`mailto:${founder.email}`}
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label={`Email ${founder.name}`}
                          >
                            <Mail className="w-4 h-4" />
                          </a>
                        )}
                        {founder.linkedin && (
                          <a
                            href={founder.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-primary transition-colors"
                            aria-label={`${founder.name}'s LinkedIn`}
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Journey */}
                <div className="space-y-4 mb-8">
                  {founder.journey.map((paragraph) => (
                    <p key={paragraph} className="text-foreground/85 leading-relaxed">{paragraph}</p>
                  ))}
                </div>

                {/* Details */}
                <div className="bg-warm-peach rounded-xl p-6 space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Background</p>
                    <p className="text-foreground text-sm leading-relaxed">{founder.background}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Lived Experience</p>
                    <p className="text-foreground text-sm">{founder.livedExperience}</p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Founders;
