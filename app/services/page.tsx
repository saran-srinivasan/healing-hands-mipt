import { Metadata } from "next";
import { ServicesPageContent } from "@/components/sections/ServicesPageContent";
import { CTASection } from "@/components/sections/CTASection";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
    title: "Our Services",
    description:
        "Comprehensive physical therapy services including orthopedic rehabilitation, sports therapy, spine care, pelvic health, and specialized treatments like dry needling and vestibular rehab.",
    openGraph: {
        title: `Our Services | ${siteConfig.name}`,
        description:
            "Comprehensive physical therapy services including orthopedic rehabilitation, sports therapy, spine care, pelvic health, and specialized treatments.",
    },
};

export default function ServicesPage() {
    return (
        <>
            <ServicesPageContent />
            <CTASection />
        </>
    );
}
