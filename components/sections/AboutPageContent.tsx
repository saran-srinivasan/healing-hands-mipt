"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import { Award, Users, Target, Heart, Check } from "lucide-react";
import { TeamSection } from "./TeamSection";

const values = [
    {
        icon: Users,
        title: "Patient-Centered Care",
        description:
            "Every treatment plan is personalized to your unique needs, goals, and lifestyle.",
    },
    {
        icon: Award,
        title: "Clinical Excellence",
        description:
            "Board-certified, fellowship-trained therapists using evidence-based methods.",
    },
    {
        icon: Target,
        title: "Results-Driven",
        description:
            "We measure success by your outcomes, consistently exceeding state and national benchmarks.",
    },
    {
        icon: Heart,
        title: "Compassionate Approach",
        description:
            "We treat the whole person, not just the injury, with empathy and understanding.",
    },
];

export function AboutPageContent() {
    return (
        <>
            <section className="relative py-16 md:py-24 bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)]">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h1 className="mb-6">
                            <span className="gradient-text">Meet Our Expert Team</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--color-neutral-600)]">
                            Board-certified specialists with decades of experience dedicated to your recovery
                        </p>
                    </motion.div>
                </div>
            </section>

            <section>
                <TeamSection />
            </section>
            {/* Hero Banner */}
            <section id="about-us" className="relative py-16 md:py-24 bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)]">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h1 className="mb-6">
                            <span className="gradient-text">About Us</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--color-neutral-600)]">
                            {siteConfig.companyInfo.mission}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Main About Section */}
            <Section className="bg-white">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Illustration */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="relative"
                    >
                        <div className="relative aspect-square max-w-lg mx-auto">
                            {/* Background */}
                            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)]" />

                            {/* Illustration */}
                            <svg
                                viewBox="0 0 400 400"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="relative z-10 w-full h-full p-8"
                                aria-hidden="true"
                            >
                                {/* Team illustration */}
                                <g transform="translate(50, 60)">
                                    {/* Person 1 */}
                                    <g transform="translate(0, 50)">
                                        <circle cx="50" cy="30" r="25" fill="var(--color-primary-400)" />
                                        <rect x="30" y="60" width="40" height="60" rx="15" fill="var(--color-primary-500)" />
                                        <rect x="35" y="120" width="12" height="50" rx="6" fill="var(--color-primary-600)" />
                                        <rect x="53" y="120" width="12" height="50" rx="6" fill="var(--color-primary-600)" />
                                    </g>

                                    {/* Person 2 (center, larger) */}
                                    <g transform="translate(100, 20)">
                                        <circle cx="50" cy="35" r="30" fill="var(--color-secondary-400)" />
                                        <rect x="25" y="70" width="50" height="70" rx="18" fill="var(--color-secondary-500)" />
                                        <rect x="32" y="140" width="14" height="60" rx="7" fill="var(--color-secondary-600)" />
                                        <rect x="54" y="140" width="14" height="60" rx="7" fill="var(--color-secondary-600)" />
                                        {/* Stethoscope */}
                                        <circle cx="50" cy="90" r="8" fill="var(--color-accent-400)" />
                                    </g>

                                    {/* Person 3 */}
                                    <g transform="translate(200, 50)">
                                        <circle cx="50" cy="30" r="25" fill="var(--color-primary-400)" />
                                        <rect x="30" y="60" width="40" height="60" rx="15" fill="var(--color-primary-500)" />
                                        <rect x="35" y="120" width="12" height="50" rx="6" fill="var(--color-primary-600)" />
                                        <rect x="53" y="120" width="12" height="50" rx="6" fill="var(--color-primary-600)" />
                                    </g>
                                </g>

                                {/* Decorative elements */}
                                <circle cx="50" cy="50" r="6" fill="var(--color-accent-400)" opacity="0.5" />
                                <circle cx="350" cy="80" r="8" fill="var(--color-primary-300)" opacity="0.4" />
                                <circle cx="320" cy="350" r="10" fill="var(--color-secondary-300)" opacity="0.4" />

                                {/* Plus signs */}
                                <g fill="var(--color-primary-500)" opacity="0.3">
                                    <rect x="80" y="320" width="16" height="4" rx="2" />
                                    <rect x="86" y="314" width="4" height="16" rx="2" />
                                    <rect x="300" y="40" width="16" height="4" rx="2" />
                                    <rect x="306" y="34" width="4" height="16" rx="2" />
                                </g>
                            </svg>

                            {/* Stats Badge */}
                            <motion.div
                                initial={{ scale: 0, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4, type: "spring" }}
                                className="absolute bottom-4 right-4 bg-white rounded-2xl shadow-xl p-5 text-center"
                            >
                                <p className="text-4xl font-bold text-[var(--color-primary-600)]">
                                    70+
                                </p>
                                <p className="text-sm text-[var(--color-neutral-600)]">
                                    Years Combined<br />Experience
                                </p>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-[var(--color-primary-700)] bg-[var(--color-primary-100)] rounded-full">
                            Our Story
                        </span>

                        <h2 className="mb-6">{siteConfig.companyInfo.fullName}</h2>

                        <div className="space-y-4 text-[var(--color-neutral-600)] leading-relaxed">
                            <p>
                                At Healing Hands Physical Therapy Associates LLC, we believe that true recovery happens where science meets sincerity. We don't just treat symptoms; we treat people.
                            </p>
                            <p>Our practice is built on a foundation of cutting-edge research and evidence-based techniques, ensuring you receive the most advanced care available today. However, we know that data is only half the story. That's why we combine our clinical expertise with a personal touch, crafting a tailor-made recovery plan designed specifically for your unique goals and lifestyle.</p>
                            <p>When you walk through our doors, you can expect the same exceptional quality of service that you have known and trusted at Alternative Rehab for over 25 years. We are carrying forward that legacy of excellence, commitment, and community—now enhanced by modern innovations to help you move better, feel stronger, and live pain-free.</p>
                        </div>

                        {/* Credentials */}
                        {/* <div className="mt-8 p-6 bg-[var(--color-neutral-50)] rounded-2xl">
                            <h3 className="font-bold text-[var(--color-neutral-900)] mb-4">
                                Our Specializations
                            </h3>
                            <ul className="grid sm:grid-cols-2 gap-3">
                                {siteConfig.companyInfo.specializations.map((item, index) => (
                                    <li key={index} className="flex items-start gap-3">
                                        <div className="w-5 h-5 mt-0.5 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center shrink-0">
                                            <Check className="w-3 h-3 text-[var(--color-primary-600)]" />
                                        </div>
                                        <span className="text-sm text-[var(--color-neutral-700)]">
                                            {item}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div> */}
                    </motion.div>
                </div>
            </Section>



            {/* Values Section */}
            <Section className="bg-[var(--color-neutral-50)]">
                <SectionHeading
                    title="Our Core Values"
                    subtitle="The principles that guide everything we do"
                />

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {values.map((value, index) => {
                        const Icon = value.icon;
                        return (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.4, delay: index * 0.1 }}
                                className={cn(
                                    "p-6 rounded-2xl bg-white border border-[var(--color-neutral-200)]",
                                    "hover:shadow-lg hover:border-[var(--color-primary-200)] transition-all duration-300"
                                )}
                            >
                                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-[var(--color-primary-500)] to-[var(--color-secondary-500)] text-white">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-lg font-bold mb-2 text-[var(--color-neutral-900)]">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-[var(--color-neutral-600)] leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </Section>
        </>
    );
}
