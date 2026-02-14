"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { siteConfig } from "@/lib/config";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServicesPreviewSection() {
    const router = useRouter();
    // Show first 4 services on the homepage
    const previewServices = siteConfig.services.slice(0, 4);

    const handleServiceClick = (serviceId: string) => {
        // Navigate to services page with hash
        router.push(`/services#${serviceId}`);
    };

    return (
        <Section id="services" className="py-20 bg-[var(--color-neutral-50)]">
            <SectionHeading
                title="Our Services"
                subtitle="Comprehensive care designed to get you back to what you love"
            />

            <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
                {previewServices.map((service, index) => (
                    <ServiceCard
                        key={service.id}
                        title={service.title}
                        tagline={service.tagline}
                        // Use shortDescription for the preview card
                        description={service.shortDescription}
                        icon={service.icon}
                        index={index}
                        onLearnMore={() => handleServiceClick(service.id)}
                    />
                ))}
            </div>

            <div className="mt-12 text-center">
                <Link
                    href="/services"
                    scroll={true} // Explicitly ensures scroll to top
                    className={cn(
                        "inline-flex items-center gap-2 text-[var(--color-primary-600)] hover:text-[var(--color-primary-700)]",
                        "font-semibold text-lg transition-colors duration-200 group"
                    )}
                >
                    View All Services
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>
        </Section>
    );
}
