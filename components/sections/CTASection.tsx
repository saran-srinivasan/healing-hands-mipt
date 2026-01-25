"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";

export function CTASection() {
    const buttonBaseStyles = cn(
        "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 ease-in-out",
        "px-8 py-4 text-lg",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "shadow-sm hover:shadow-md active:scale-[0.98]"
    );

    return (
        <section className="relative py-20 md:py-28 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-primary-600)] via-[var(--color-primary-700)] to-[var(--color-secondary-700)]" />

            {/* Pattern Overlay */}
            <div className="absolute inset-0 opacity-10">
                <svg
                    className="w-full h-full"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    aria-hidden="true"
                >
                    <defs>
                        <pattern
                            id="ctaPattern"
                            x="0"
                            y="0"
                            width="20"
                            height="20"
                            patternUnits="userSpaceOnUse"
                        >
                            <circle cx="10" cy="10" r="1.5" fill="white" />
                        </pattern>
                    </defs>
                    <rect width="100" height="100" fill="url(#ctaPattern)" />
                </svg>
            </div>

            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-3xl mx-auto text-center text-white"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-balance">
                        Ready to Start Your Recovery Journey?
                    </h2>
                    <p className="text-lg md:text-xl mb-10 text-white/90 max-w-2xl mx-auto">
                        Don&apos;t let pain hold you back. Our expert team is ready to help you
                        move better, feel stronger, and return to the life you love.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                        <Link
                            href="/contact"
                            className={cn(
                                buttonBaseStyles,
                                "w-full sm:w-auto",
                                "bg-[var(--color-accent-500)] text-white hover:bg-[var(--color-accent-600)] focus-visible:ring-[var(--color-accent-400)]"
                            )}
                        >
                            Book Your Appointment
                            <span className="ml-2">
                                <ArrowRight className="w-5 h-5" />
                            </span>
                        </Link>
                        <a
                            href={`tel:${siteConfig.links.phone.replace(/[^0-9]/g, "")}`}
                            className={cn(
                                buttonBaseStyles,
                                "w-full sm:w-auto",
                                "border-2 border-white text-white bg-transparent hover:bg-white/10 focus-visible:ring-white"
                            )}
                        >
                            <span className="mr-2">
                                <Phone className="w-5 h-5" />
                            </span>
                            Call {siteConfig.links.phone}
                        </a>
                    </div>

                    <p className="text-sm text-white/70">
                        Most insurances accepted · Same-week appointments available
                    </p>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div
                className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl"
                aria-hidden="true"
            />
            <div
                className="absolute -top-20 -right-20 w-80 h-80 bg-white/5 rounded-full blur-3xl"
                aria-hidden="true"
            />
        </section>
    );
}
