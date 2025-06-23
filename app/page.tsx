"use client";
import HeroSection from "@/components/LandingPage/HeroSection";
import FeatureSection from "@/components/LandingPage/FeatureSection";
import HowItWorksSection from "@/components/LandingPage/HowItWorksSection";
import CTASection from "@/components/LandingPage/CTASection";
import FooterSection from "@/components/LandingPage/FooterSection";

export default function LandingPage() {
  return (
    <div className="bg-white text-gray-800">
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
      <CTASection />
      <FooterSection />
    </div>
  );
}
