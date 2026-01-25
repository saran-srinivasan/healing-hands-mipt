import { Metadata } from "next";
import { ContactPageContent } from "@/components/sections/ContactPageContent";
import { siteConfig } from "@/lib/config";

export const metadata: Metadata = {
    title: "Contact Us",
    description:
        "Get in touch with Healing Hands Physical Therapy. Schedule your appointment, ask questions, or learn more about our services in Livonia, Novi, and surrounding areas.",
    openGraph: {
        title: `Contact Us | ${siteConfig.name}`,
        description:
            "Schedule your appointment or get in touch with our team. Serving Livonia, Novi, Farmington and all of Wayne & Oakland County.",
    },
};

export default function ContactPage() {
    return <ContactPageContent />;
}
