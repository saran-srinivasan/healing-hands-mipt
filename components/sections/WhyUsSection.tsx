"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { Award, Users, Stethoscope, Clock } from "lucide-react";

const features = [
    {
        icon: Award,
        title: "Board Certified Specialists",
        description:
            "Featuring Board Certified Specialists and Fellowship-trained orthopedic physical therapists dedicated to the highest standard of clinical excellence.",
    },
    {
        icon: Users,
        title: "One-on-One Care",
        description:
            "Every session is personalized—no aides, no group sessions, just dedicated attention.",
    },
    {
        icon: Stethoscope,
        title: "Evidence-Based Approach",
        description:
            "Biopsychosocial methods that consistently deliver faster, superior outcomes compared to benchmarks, with approaches that are continually updated as new evidence and clinical knowledge emerge.",
    },
    {
        icon: Clock,
        title: "70+ Years Experience",
        description:
            "Decades of combined clinical experience treating complex conditions.",
    },
];

const containerVariants: Variants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
};

const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
};

export function WhyUsSection() {
    return (
        <Section className="bg-white" id="why-us">
            <SectionHeading
                title="Why Choose Healing Hands Physical Therapy?"
                subtitle="We're not just another PT clinic. We're your partners in recovery, committed to exceptional care that gets results."
            />

            <motion.div
                className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
            >
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            className="group relative p-6 md:p-8 rounded-2xl bg-[var(--color-neutral-50)] border border-[var(--color-neutral-100)] hover:border-[var(--color-primary-200)] hover:shadow-lg transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="flex items-center justify-center w-14 h-14 mb-5 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-white group-hover:scale-110 transition-transform duration-300">
                                <Icon className="w-7 h-7" />
                            </div>

                            {/* Content */}
                            <h3 className="text-lg font-bold mb-2 text-[var(--color-neutral-900)]">
                                {feature.title}
                            </h3>
                            <p className="text-[var(--color-neutral-600)] leading-relaxed">
                                {feature.description}
                            </p>

                            {/* Decorative accent line */}
                            <div className="absolute bottom-0 left-6 right-6 h-1 bg-gradient-to-r from-[var(--color-primary-500)] to-[var(--color-secondary-500)] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </motion.div>
                    );
                })}
            </motion.div>
        </Section>
    );
}
