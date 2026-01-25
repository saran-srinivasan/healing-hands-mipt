"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import {
    Activity,
    Dumbbell,
    Heart,
    Zap,
    ChevronDown,
    Check,
    type LucideIcon,
} from "lucide-react";

// Icon mapping
const iconMap: Record<string, LucideIcon> = {
    Activity,
    Dumbbell,
    Heart,
    Zap,
    Spine: Activity,
};

// Detailed service benefits
const serviceDetails: Record<string, string[]> = {
    "orthopedic-sports": [
        "Post-surgical rehabilitation programs",
        "Sports injury recovery and prevention",
        "Joint replacement rehabilitation",
        "Sprains, strains, and tendonitis treatment",
        "Return-to-sport performance optimization",
    ],
    "spine-extremity": [
        "Neck and back pain treatment",
        "Spinal stabilization exercises",
        "Manual therapy and manipulation",
        "Posture correction programs",
        "Shoulder, hip, knee, and ankle rehabilitation",
    ],
    "pelvic-health": [
        "Male pelvic pain treatment",
        "Pelvic floor coordination therapy",
        "Core stabilization programs",
        "Breathing and postural retraining",
        "Functional strength building",
    ],
    "wellness-performance": [
        "Core and postural training",
        "Functional movement screening",
        "Balance and fall prevention",
        "Ergonomic assessments",
        "Personalized home exercise plans",
    ],
    "specialized-treatments": [
        "Dry Needling for muscle tension relief",
        "Vestibular Rehab for dizziness and vertigo",
        "Blood Flow Restriction (BFR) Training",
        "IASTM & Cupping therapy",
        "Joint Manipulation & Mobilization",
    ],
};

interface ServiceType {
    id: string;
    title: string;
    tagline: string;
    description: string;
    icon: string;
}

interface ServiceAccordionProps {
    service: ServiceType;
    isOpen: boolean;
    onToggle: () => void;
    index: number;
}

function ServiceAccordion({
    service,
    isOpen,
    onToggle,
    index,
}: ServiceAccordionProps) {
    const IconComponent = iconMap[service.icon] || Activity;
    const details = serviceDetails[service.id] || [];

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            id={service.id}
            className="scroll-mt-24"
        >
            <div
                className={cn(
                    "bg-white rounded-2xl border transition-all duration-300",
                    isOpen
                        ? "border-[var(--color-primary-300)] shadow-lg"
                        : "border-[var(--color-neutral-200)] shadow-sm hover:shadow-md"
                )}
            >
                {/* Header */}
                <button
                    onClick={onToggle}
                    className="w-full p-6 md:p-8 flex items-start gap-4 md:gap-6 text-left"
                    aria-expanded={isOpen}
                    aria-controls={`service-content-${service.id}`}
                >
                    {/* Icon */}
                    <div
                        className={cn(
                            "flex items-center justify-center w-14 h-14 shrink-0",
                            "rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)]",
                            "transition-transform duration-300",
                            isOpen && "scale-110"
                        )}
                    >
                        <IconComponent className="w-7 h-7 text-[var(--color-primary-600)]" />
                    </div>

                    {/* Title and Tagline */}
                    <div className="flex-grow">
                        <h3 className="text-xl md:text-2xl font-bold text-[var(--color-neutral-900)] mb-1">
                            {service.title}
                        </h3>
                        <p className="text-[var(--color-primary-600)] font-medium">
                            {service.tagline}
                        </p>
                    </div>

                    {/* Toggle Icon */}
                    <div
                        className={cn(
                            "p-2 rounded-full bg-[var(--color-neutral-100)] transition-transform duration-300",
                            isOpen && "rotate-180"
                        )}
                    >
                        <ChevronDown className="w-5 h-5 text-[var(--color-neutral-600)]" />
                    </div>
                </button>

                {/* Expandable Content */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            id={`service-content-${service.id}`}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                        >
                            <div className="px-6 md:px-8 pb-6 md:pb-8 pt-0">
                                <div className="border-t border-[var(--color-neutral-200)] pt-6">
                                    {/* Description */}
                                    <p className="text-[var(--color-neutral-600)] mb-6 leading-relaxed max-w-3xl">
                                        {service.description}
                                    </p>

                                    {/* Benefits List */}
                                    {details.length > 0 && (
                                        <div>
                                            <h4 className="font-semibold text-[var(--color-neutral-800)] mb-4">
                                                What&apos;s Included:
                                            </h4>
                                            <ul className="grid sm:grid-cols-2 gap-3">
                                                {details.map((item, idx) => (
                                                    <li
                                                        key={idx}
                                                        className="flex items-start gap-3"
                                                    >
                                                        <div className="w-5 h-5 mt-0.5 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center shrink-0">
                                                            <Check className="w-3 h-3 text-[var(--color-primary-600)]" />
                                                        </div>
                                                        <span className="text-[var(--color-neutral-700)]">
                                                            {item}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
}

export function ServicesPageContent() {
    const [openServiceId, setOpenServiceId] = useState<string | null>(
        siteConfig.services[0]?.id || null
    );

    const handleToggle = (serviceId: string) => {
        setOpenServiceId((prev) => (prev === serviceId ? null : serviceId));
    };

    return (
        <>
            {/* Hero Banner */}
            <section className="relative py-16 md:py-24 bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)]">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h1 className="mb-6">
                            <span className="gradient-text">Our Services</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--color-neutral-600)]">
                            Comprehensive physical therapy services tailored to your unique
                            needs. Our board-certified specialists use evidence-based methods
                            to help you recover faster and prevent future injuries.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Services List */}
            <Section className="bg-[var(--color-neutral-50)]" animate={false}>
                <SectionHeading
                    title="Explore Our Specialties"
                    subtitle="Click on any service to learn more about how we can help you."
                />

                <div className="max-w-4xl mx-auto space-y-4">
                    {siteConfig.services.map((service, index) => (
                        <ServiceAccordion
                            key={service.id}
                            service={service}
                            isOpen={openServiceId === service.id}
                            onToggle={() => handleToggle(service.id)}
                            index={index}
                        />
                    ))}
                </div>
            </Section>
        </>
    );
}
