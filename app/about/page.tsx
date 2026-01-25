import { Metadata } from "next";
import { AboutPageContent } from "@/components/sections/AboutPageContent";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
    title: "About Us",
    description:
        "Learn about Healing Hands Physical Therapy Associates - board-certified specialists with over 70 years of combined experience providing exceptional, personalized physical therapy care.",
    openGraph: {
        title: `About Us | ${siteConfig.name}`,
        description:
            "Board-certified specialists with over 70 years of combined experience providing exceptional, personalized physical therapy care.",
    },
};

export default function AboutPage() {
    return (
        <>
            <AboutPageContent />
            <CTASection />
        </>
    );
}
