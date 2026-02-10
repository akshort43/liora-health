import Header from "@/components/landing/Header";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import SiteFooter from "@/components/SiteFooter";
import { motion } from "framer-motion";

const faqs = [
  {
    question: "What is LIORA?",
    answer: "LIORA is a patient advocacy platform designed to support women living with chronic conditions. We pair you with trained advocates who help you prepare for medical appointments, navigate complex care, and confidently understand your next steps.",
  },
  {
    question: "Who are LIORA advocates?",
    answer: "Our advocates are trained professionals with backgrounds in healthcare navigation, social work, and patient support. Many have personal experience with chronic conditions and understand the unique challenges women face in the healthcare system.",
  },
  {
    question: "What conditions does LIORA support?",
    answer: "We support women with a wide range of chronic conditions including endometriosis, PCOS, autoimmune disorders, chronic pain, long COVID, mental health conditions, and more. If you're unsure whether we can help, reach out — we're here for you.",
  },
  {
    question: "How does the advocacy process work?",
    answer: "After you submit an intake form, we match you with an advocate based on your needs. Your advocate helps you prepare questions before appointments, can attend visits with you (virtually or in person), and follows up afterward to help you understand your care plan.",
  },
  {
    question: "How much does LIORA cost?",
    answer: "We offer a range of support tiers to fit different needs and budgets. We also work to ensure that financial constraints never prevent someone from accessing advocacy. Contact us for details on pricing and any available assistance programs.",
  },
  {
    question: "Can my advocate attend my doctor's appointment?",
    answer: "Yes! One of our core services is during-visit advocacy. Your advocate can join your appointment virtually or in person to take notes, ask clarifying questions, and ensure your concerns are heard.",
  },
  {
    question: "Is my information kept confidential?",
    answer: "Absolutely. Your privacy is our top priority. All personal and medical information shared with LIORA is kept strictly confidential and is never shared without your explicit consent.",
  },
  {
    question: "How quickly will I be matched with an advocate?",
    answer: "Most people are matched within 48 hours of submitting their intake form. We'll reach out via email to introduce you to your advocate and schedule your first session.",
  },
];

const FAQs = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 pb-16 md:pt-36 md:pb-24 px-6">
        <div className="container mx-auto max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="font-display text-4xl md:text-5xl tracking-tight text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Everything you need to know about LIORA's advocacy services.
            </p>

            <Accordion type="single" collapsible className="space-y-3">
              {faqs.map((faq) => (
                <AccordionItem
                  key={faq.question}
                  value={faq.question}
                  className="border border-border/50 rounded-lg px-5 bg-card shadow-sm"
                >
                  <AccordionTrigger className="text-left font-display text-lg hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default FAQs;
