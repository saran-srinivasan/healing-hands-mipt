import { HeroSection } from "@/components/sections/HeroSection";
import { WhyUsSection } from "@/components/sections/WhyUsSection";
import { ServicesPreviewSection } from "@/components/sections/ServicesPreviewSection";
import { AboutPreviewSection } from "@/components/sections/AboutPreviewSection";
import { CTASection } from "@/components/sections/CTASection";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <ServicesPreviewSection />
      <AboutPreviewSection />
      <CTASection />
    </>
  );
}
