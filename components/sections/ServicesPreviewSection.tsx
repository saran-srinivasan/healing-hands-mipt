"use client";

import React from "react";
import Link from "next/link";
import { Section, SectionHeading } from "@/components/ui/Section";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { siteConfig } from "@/lib/config";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ServicesPreviewSection() {
    // Show first 4 services on the homepage
    const previewServices = siteConfig.services.slice(0, 4);

    return (
        <Section
            className="bg-gradient-to-b from-[var(--color-neutral-50)] to-white"
            id="services-preview"
        >
            <SectionHeading
                title="Our Services"
                subtitle="Comprehensive physical therapy services tailored to your unique needs. From sports injuries to chronic pain, we've got you covered."
            />

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-12">
                {previewServices.map((service, index) => (
                    <ServiceCard
                        key={service.id}
                        title={service.title}
                        tagline={service.tagline}
                        description={service.description}
                        icon={service.icon}
                        index={index}
                        onLearnMore={() => {
                            window.location.href = `/services#${service.id}`;
                        }}
                    />
                ))}
            </div>

            <div className="text-center">
                <Link
                    href="/services"
                    className={cn(
                        "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 ease-in-out",
                        "px-8 py-4 text-lg",
                        "border-2 border-[var(--color-primary-600)] text-[var(--color-primary-600)] bg-transparent hover:bg-[var(--color-primary-50)]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--color-primary-500)]",
                        "shadow-sm hover:shadow-md active:scale-[0.98]"
                    )}
                >
                    View All Services
                    <span className="ml-2">
                        <ArrowRight className="w-5 h-5" />
                    </span>
                </Link>
            </div>
        </Section>
    );
}
