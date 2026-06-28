import React from "react";
import Navbar from "@/components/landing/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import TrustBar from "@/components/landing/TrustBar";
import StatsSection from "@/components/landing/StatsSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import SolutionsSection from "@/components/landing/SolutionsSection";
import CustomerSaysSection from "@/components/landing/CustomerSaysSection";
import AboutSection from "@/components/landing/AboutSection";
import CtaSection from "@/components/landing/CtaSection";
import ContactForm from "@/components/landing/ContactForm";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-glass-neutral text-glass-primary selection:bg-glass-tertiary/20 selection:text-glass-tertiary">
      {/* Navigation */}
      <Navbar />

      {/* Main Content Sections */}
      <main>
        {/* Priority 1 Sections */}
        <HeroSection />
        <TrustBar />
        <StatsSection />

        {/* Priority 2 Sections */}
        <FeaturesSection />
        <HowItWorksSection />
        <SolutionsSection />

        {/* Priority 3 Sections */}
        <CustomerSaysSection />
        <AboutSection />
        <CtaSection />
        <ContactForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
