import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import ConditionsSection from "@/components/landing/ConditionsSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import LongHaulSection from "@/components/landing/LongHaulSection";
import AdvocacySection from "@/components/landing/AdvocacySection";
import FoundersSection from "@/components/landing/FoundersSection";
import FooterCTA from "@/components/landing/FooterCTA";
import SiteFooter from "@/components/SiteFooter";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ConditionsSection />
        <HowItWorksSection />
        <LongHaulSection />
        <AdvocacySection />
        <FoundersSection />
        <FooterCTA />
      </main>
      <SiteFooter />
    </div>
  );
};

export default Index;
