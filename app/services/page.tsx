import { Metadata } from "next";
import { ServicesPageContent } from "@/components/sections/ServicesPageContent";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
    title: "Our Services",
    description:
        "Your Path to Recovery Starts Here No two injuries are the same, and neither is our approach. Whether you are sidelined by a sports injury or struggling with persistent pain, we provide personalized, evidence-based treatments that address the root cause of your symptoms. We don't just treat the injury—we treat the individual",
    openGraph: {
        title: `Our Services | ${siteConfig.name}`,
        description:
            "Your Path to Recovery Starts Here No two injuries are the same, and neither is our approach. Whether you are sidelined by a sports injury or struggling with persistent pain, we provide personalized, evidence-based treatments that address the root cause of your symptoms. We don't just treat the injury—we treat the individual",
    },
};

export default function ServicePage() {
    return (
        <>
            <ServicesPageContent />
            <CTASection />
        </>
    );
}
