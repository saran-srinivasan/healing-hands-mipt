"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { siteConfig } from "@/lib/config";

export function AboutPreviewSection() {
    return (
        <Section className="bg-white" id="about-preview">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                {/* Illustration Side */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative order-2 lg:order-1"
                >
                    <div className="relative aspect-square max-w-md mx-auto">
                        {/* Background Circle */}
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)]" />

                        {/* Main Illustration */}
                        <svg
                            viewBox="0 0 400 400"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className="relative z-10 w-full h-full p-8"
                            aria-hidden="true"
                        >
                            {/* Therapist and Patient Scene */}
                            <g transform="translate(50, 80)">
                                {/* Treatment Table */}
                                <rect
                                    x="30"
                                    y="180"
                                    width="240"
                                    height="20"
                                    rx="4"
                                    fill="var(--color-primary-600)"
                                />
                                <rect
                                    x="50"
                                    y="200"
                                    width="10"
                                    height="40"
                                    fill="var(--color-primary-700)"
                                />
                                <rect
                                    x="240"
                                    y="200"
                                    width="10"
                                    height="40"
                                    fill="var(--color-primary-700)"
                                />

                                {/* Patient Laying Down */}
                                <ellipse
                                    cx="150"
                                    cy="160"
                                    rx="80"
                                    ry="25"
                                    fill="var(--color-secondary-200)"
                                />
                                <circle cx="80" cy="155" r="20" fill="var(--color-secondary-300)" />

                                {/* Therapist Standing */}
                                <g transform="translate(220, 40)">
                                    <circle cx="30" cy="20" r="18" fill="var(--color-primary-300)" />
                                    <rect
                                        x="15"
                                        y="40"
                                        width="30"
                                        height="50"
                                        rx="10"
                                        fill="var(--color-primary-400)"
                                    />
                                    <rect
                                        x="20"
                                        y="90"
                                        width="8"
                                        height="35"
                                        rx="4"
                                        fill="var(--color-primary-500)"
                                    />
                                    <rect
                                        x="32"
                                        y="90"
                                        width="8"
                                        height="35"
                                        rx="4"
                                        fill="var(--color-primary-500)"
                                    />
                                    {/* Healing Hands */}
                                    <circle cx="0" cy="65" r="10" fill="var(--color-accent-400)" />
                                    <circle cx="0" cy="65" r="18" fill="var(--color-accent-300)" opacity="0.4" />
                                </g>

                                {/* Motion Lines */}
                                <path
                                    d="M100 140 Q 120 130, 140 140"
                                    stroke="var(--color-accent-400)"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                                <path
                                    d="M110 130 Q 130 120, 150 130"
                                    stroke="var(--color-accent-400)"
                                    strokeWidth="2"
                                    fill="none"
                                    strokeLinecap="round"
                                />
                            </g>

                            {/* Decorative Plus Signs */}
                            <g fill="var(--color-primary-400)" opacity="0.3">
                                <rect x="50" y="45" width="12" height="4" rx="2" />
                                <rect x="54" y="41" width="4" height="12" rx="2" />
                                <rect x="320" y="100" width="12" height="4" rx="2" />
                                <rect x="324" y="96" width="4" height="12" rx="2" />
                                <rect x="70" y="300" width="12" height="4" rx="2" />
                                <rect x="74" y="296" width="4" height="12" rx="2" />
                            </g>
                        </svg>

                        {/* Stats Badge */}
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4, type: "spring" }}
                            className="absolute -bottom-4 -right-4 lg:bottom-8 lg:right-0 bg-white rounded-2xl shadow-xl p-4 md:p-6"
                        >
                            <p className="text-3xl md:text-4xl font-bold text-[var(--color-primary-600)]">
                                25+
                            </p>
                            <p className="text-sm text-[var(--color-neutral-600)]">
                                Years of Excellence
                            </p>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="order-1 lg:order-2"
                >
                    <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-[var(--color-primary-700)] bg-[var(--color-primary-100)] rounded-full">
                        About Us
                    </span>

                    <h2 className="mb-6">{siteConfig.companyInfo.fullName}</h2>

                    <p className="text-lg text-[var(--color-neutral-600)] mb-6 leading-relaxed">
                        {siteConfig.companyInfo.mission}
                    </p>

                    <p className="text-[var(--color-neutral-600)] mb-8 leading-relaxed">
                        {siteConfig.companyInfo.history}
                    </p>

                    {/* Key Points */}
                    <div className="space-y-4">
                        {siteConfig.companyInfo.specializations.slice(0, 4).map((item, index) => (
                            <div key={index} className="flex items-start gap-3">
                                <div className="w-5 h-5 mt-0.5 rounded-full bg-[var(--color-primary-100)] flex items-center justify-center shrink-0">
                                    <svg
                                        className="w-3 h-3 text-[var(--color-primary-600)]"
                                        viewBox="0 0 12 12"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2 6L5 9L10 3"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </div>
                                <p className="text-[var(--color-neutral-700)]">{item}</p>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </Section>
    );
}
