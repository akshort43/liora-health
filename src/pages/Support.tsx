import Header from "@/components/landing/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SiteFooter from "@/components/SiteFooter";
import { motion } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";

const conditionCategories: Record<string, string[]> = {
  "Neuro / Headache Disorders": [
    "Migraine",
    "Chronic migraine",
    "Vestibular migraine",
    "Tension-type headache",
    "Chronic daily headache",
    "Medication-overuse headache",
    "POTS / dysautonomia",
    "Temporomandibular disorder (TMD)",
    "Epilepsy",
  ],
  "Gynecologic Structural / Anatomic": [
    "Uterine fibroids (leiomyomas)",
    "Ovarian cysts (functional cysts)",
    "Endometrial polyps",
    "Cervical polyps",
    "Adenomyosis",
    "Congenital uterine anomalies",
    "Uterine adhesions (Asherman syndrome)",
    "Endometrial hyperplasia",
    "Hydrosalpinx",
  ],
  "Gynecologic Inflammatory / Infectious": [
    "Endometriosis",
    "Pelvic inflammatory disease (PID)",
    "Chronic endometritis",
    "Cervicitis (chronic/recurrent)",
    "Recurrent bacterial vaginosis (BV)",
    "Recurrent vulvovaginal candidiasis",
    "Genital herpes (HSV)",
    "Lichen sclerosus",
    "Lichen planus (vulvovaginal)",
  ],
  "Endocrine / Metabolic": [
    "PCOS (polycystic ovary syndrome)",
    "Hypothyroidism",
    "Hashimoto's thyroiditis",
    "Graves' disease",
    "Hyperthyroidism",
    "Type 1 diabetes",
    "Type 2 diabetes / prediabetes",
    "Hyperprolactinemia",
    "Premature ovarian insufficiency (POI)",
  ],
  "Autoimmune / Immune-Mediated": [
    "Autoimmune thyroiditis (Hashimoto's)",
    "Graves' disease",
    "Rheumatoid arthritis",
    "Psoriasis",
    "Type 1 diabetes",
    "Celiac disease",
    "Systemic lupus erythematosus (SLE)",
    "Multiple sclerosis (MS)",
    "Sjögren's syndrome",
  ],
  "Gastrointestinal": [
    "Irritable bowel syndrome (IBS)",
    "Gastroesophageal reflux disease (GERD)",
    "Functional dyspepsia",
    "Chronic constipation",
    "Chronic diarrhea / functional diarrhea",
    "Celiac disease",
    "Crohn's disease",
    "Ulcerative colitis",
    "Gastroparesis",
  ],
  "Urologic / Pelvic Bladder": [
    "Recurrent urinary tract infection (rUTI)",
    "Overactive bladder (OAB)",
    "Stress urinary incontinence",
    "Urge urinary incontinence",
    "Mixed urinary incontinence",
    "Interstitial cystitis / bladder pain syndrome",
    "Nephrolithiasis (kidney stones)",
    "Urethral pain syndrome",
    "Chronic pelvic floor–related voiding dysfunction",
  ],
  "Vulvar / Sexual Pain": [
    "Vulvodynia",
    "Vestibulodynia",
    "Genito-pelvic pain/penetration disorder",
    "Dyspareunia",
    "Lichen sclerosus",
    "Lichen planus",
    "Provoked vestibulodynia",
    "Recurrent vulvovaginal candidiasis",
    "Recurrent bacterial vaginosis",
  ],
  "Reproductive Mental Health": [
    "Premenstrual dysphoric disorder (PMDD)",
    "Premenstrual syndrome (PMS)",
    "Major depressive disorder",
    "Persistent depressive disorder (dysthymia)",
    "Generalized anxiety disorder",
    "Panic disorder",
    "Postpartum depression",
    "Postpartum anxiety",
    "Postpartum OCD",
  ],
};

const categoryKeys = Object.keys(conditionCategories);

const symptoms = [
  "Period changes / heavy bleeding",
  "Pelvic pain",
  "Pain with sex / intimacy",
  "Bladder/urinary symptoms",
  "Digestive/bowel symptoms",
  "Hormone/endocrine symptoms",
  "Headache/neurologic symptoms",
  "Fatigue/whole-body symptoms",
  "Mood/sleep/cycle-linked symptoms",
  "Vaginal/vulvar symptoms",
  "Fertility/pregnancy/postpartum concerns",
  "Musculoskeletal/pelvic floor function",
  "Something else / not sure",
];

const supportTypes = [
  "Appointment preparation",
  "During-visit advocacy",
  "Post-visit follow-up",
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL?.replace(/\/+$/, "") ?? "";

const Support = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [subconditionSelections, setSubconditionSelections] = useState<Record<string, string>>({});
  const [subconditionOtherText, setSubconditionOtherText] = useState<Record<string, string>>({});
  const [otherCondition, setOtherCondition] = useState("");
  const [dontKnow, setDontKnow] = useState(false);
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [selectedSupportTypes, setSelectedSupportTypes] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const toggleSymptom = (symptom: string) => {
    setSelectedSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };

  const handleSubconditionChange = (category: string, value: string) => {
    setSubconditionSelections((prev) => ({ ...prev, [category]: value }));
    if (value !== "__other__") {
      setSubconditionOtherText((prev) => ({ ...prev, [category]: "" }));
    }
  };

  const clearIntakeSelections = () => {
    setSelectedCategories([]);
    setSubconditionSelections({});
    setSubconditionOtherText({});
    setOtherCondition("");
    setDontKnow(false);
    setSelectedSymptoms([]);
    setSelectedSupportTypes([]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isSubmitting) {
      return;
    }

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      firstName: String(formData.get("firstName") ?? "").trim(),
      lastName: String(formData.get("lastName") ?? "").trim(),
      email: String(formData.get("email") ?? "").trim(),
      phone: String(formData.get("phone") ?? "").trim(),
      message: String(formData.get("message") ?? "").trim(),
      selectedCategories,
      subconditionSelections,
      subconditionOtherText,
      otherCondition: otherCondition.trim(),
      dontKnow,
      selectedSymptoms,
      selectedSupportTypes,
    };

    setIsSubmitting(true);

    try {
      const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/support-submissions` : "/api/support-submissions";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error("Unable to save submission");
      }

      form.reset();
      clearIntakeSelections();
      toast.success("Thank you! We'll be in touch within 48 hours.");
    } catch (error) {
      console.error("Failed to submit support form:", error);
      toast.error("We couldn't save your form just now. Please try again in a moment.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
              Get Support
            </h1>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Fill out this form and we'll pair you with an advocate who understands your needs.
            </p>

            <Card className="border-border/50 shadow-md">
              <CardContent className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First name</Label>
                      <Input id="firstName" name="firstName" required maxLength={100} placeholder="Jane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last name</Label>
                      <Input id="lastName" name="lastName" required maxLength={100} placeholder="Doe" />
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        maxLength={255}
                        placeholder="jane@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone (optional)</Label>
                      <Input id="phone" name="phone" type="tel" maxLength={20} placeholder="(555) 123-4567" />
                    </div>
                  </div>

                  {/* Conditions */}
                  <div className="space-y-3">
                    <Label>Which conditions apply to you?</Label>
                    <div className="space-y-3">
                      {categoryKeys.map((category) => (
                        <div key={category}>
                          <label className="flex items-center gap-2 cursor-pointer">
                            <Checkbox
                              checked={selectedCategories.includes(category)}
                              onCheckedChange={() => toggleCategory(category)}
                            />
                            <span className="text-sm font-medium text-foreground">{category}</span>
                          </label>

                          {selectedCategories.includes(category) && (
                            <div className="ml-6 mt-2 space-y-2">
                              <Select
                                value={subconditionSelections[category] || ""}
                                onValueChange={(val) => handleSubconditionChange(category, val)}
                              >
                                <SelectTrigger className="w-full bg-card">
                                  <SelectValue placeholder="Select a specific condition..." />
                                </SelectTrigger>
                                <SelectContent className="bg-card z-50">
                                  {conditionCategories[category].map((sub) => (
                                    <SelectItem key={sub} value={sub}>
                                      {sub}
                                    </SelectItem>
                                  ))}
                                  <SelectItem value="__other__">Other</SelectItem>
                                </SelectContent>
                              </Select>

                              {subconditionSelections[category] === "__other__" && (
                                <Input
                                  placeholder="Please specify..."
                                  value={subconditionOtherText[category] || ""}
                                  onChange={(e) =>
                                    setSubconditionOtherText((prev) => ({
                                      ...prev,
                                      [category]: e.target.value,
                                    }))
                                  }
                                  maxLength={200}
                                />
                              )}
                            </div>
                          )}
                        </div>
                      ))}

                      {/* Other (top-level) */}
                      <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={selectedCategories.includes("Other")}
                            onCheckedChange={() => toggleCategory("Other")}
                          />
                          <span className="text-sm font-medium text-foreground">Other</span>
                        </label>
                        {selectedCategories.includes("Other") && (
                          <div className="ml-6 mt-2">
                            <Input
                              placeholder="Please specify your condition..."
                              value={otherCondition}
                              onChange={(e) => setOtherCondition(e.target.value)}
                              maxLength={200}
                            />
                          </div>
                        )}
                      </div>

                      {/* I don't know */}
                      <div>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={dontKnow}
                            onCheckedChange={(checked) => setDontKnow(checked === true)}
                          />
                          <span className="text-sm font-medium text-foreground">I don't know</span>
                        </label>

                        {dontKnow && (
                          <div className="ml-6 mt-3 p-4 bg-warm-peach rounded-lg space-y-3">
                            <p className="text-sm font-medium text-foreground">
                              That's okay! Select any symptoms you're experiencing:
                            </p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                              {symptoms.map((symptom) => (
                                <label
                                  key={symptom}
                                  className="flex items-start gap-2 cursor-pointer"
                                >
                                  <Checkbox
                                    checked={selectedSymptoms.includes(symptom)}
                                    onCheckedChange={() => toggleSymptom(symptom)}
                                    className="mt-0.5"
                                  />
                                  <span className="text-sm text-foreground">{symptom}</span>
                                </label>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Support type */}
                  <div className="space-y-3">
                    <Label>What kind of support are you looking for?</Label>
                    <div className="space-y-2">
                      {supportTypes.map((option) => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                          <Checkbox
                            checked={selectedSupportTypes.includes(option)}
                            onCheckedChange={() =>
                              setSelectedSupportTypes((prev) =>
                                prev.includes(option)
                                  ? prev.filter((t) => t !== option)
                                  : [...prev, option]
                              )
                            }
                          />
                          <span className="text-sm text-foreground">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message">Tell us more about your situation (optional)</Label>
                    <Textarea
                      id="message"
                      name="message"
                      maxLength={1000}
                      placeholder="Share anything that would help us match you with the right advocate..."
                      className="min-h-[120px]"
                    />
                  </div>

                  <Button variant="hero" size="lg" type="submit" className="w-full py-6 text-base" disabled={isSubmitting}>
                    {isSubmitting ? "Saving..." : "Request an Advocate"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
};

export default Support;
