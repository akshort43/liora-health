import { motion } from "framer-motion";
import { Linkedin, Mail } from "lucide-react";
import courtneyPhoto from "@/assets/courtney-headshot.png";
import amandaPhoto from "@/assets/amanda-headshot.png";

const founders = [
  {
    name: "Courtney",
    role: "Co-Founder & Chief Executive Officer",
    photo: courtneyPhoto,
    email: "courtney@liorahealth.io",
    linkedin: "https://www.linkedin.com/in/courtney-sherbal-b30650104/",
    education: [
      "BS: Human & Organizational Development, Vanderbilt University",
      "MBA Candidate: Harvard Business School",
    ],
    conditions: "Dysautonomia (POTS); Uveitis",
    initials: "CS",
  },
  {
    name: "Amanda",
    role: "Co-Founder & Chief Operating Officer",
    photo: amandaPhoto,
    email: "amanda@liorahealth.io",
    linkedin: "https://www.linkedin.com/in/amanda-berk/",
    education: [
      "BA: Medicine, Health & Society; Women's & Gender Studies, Vanderbilt University",
      "MSW, MPH Candidate: University of Texas",
    ],
    conditions: "Hypothyroidism (Hashimoto's); Chronic migraine",
    initials: "AB",
  },
];

const FoundersSection = () => {
  return (
    <section id="founders" className="py-20 px-6 bg-warm-peach scroll-mt-20">
      <div className="container mx-auto max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-display text-3xl md:text-4xl text-foreground text-center mb-4"
        >
          Meet the Founders
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-muted-foreground text-base text-center max-w-2xl mx-auto mb-14"
        >
          Cousins Courtney and Amanda created LIORA out of shared frustration with feeling dismissed and defeated after too many medical visits. Together, they're on a mission to build the support they wished they had.
        </motion.p>

        <div className="grid md:grid-cols-2 gap-10">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 * index }}
              className="bg-card rounded-2xl p-8 shadow-sm border border-border/50 text-center"
            >
              {founder.photo ? (
                <img
                  src={founder.photo}
                  alt={`${founder.name} headshot`}
                  className="w-60 h-60 rounded-full object-cover mx-auto mb-5 border-2 border-primary/20"
                />
              ) : (
                <div className="w-60 h-60 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-5">
                  <span className="font-display text-6xl text-primary">{founder.initials}</span>
                </div>
              )}
              <h3 className="font-display text-2xl text-foreground mb-1">
                {founder.name}
              </h3>
              <p className="text-primary text-sm font-medium mb-2">
                {founder.role}
              </p>
              {(founder.email || founder.linkedin) && (
                <div className="flex items-center justify-center gap-3 mb-5">
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
              <div className="text-left space-y-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Education</p>
                  {founder.education.map((edu) => (
                    <p key={edu} className="text-foreground text-sm leading-relaxed">{edu}</p>
                  ))}
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1">Chronic Health Conditions</p>
                  <p className="text-foreground text-sm">{founder.conditions}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FoundersSection;
