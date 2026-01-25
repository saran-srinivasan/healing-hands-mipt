"use client";

import React, { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

// Importing the 3 images
import HHPT1 from "@/public/images/HHPT_1.jpg";
import HHPT2 from "@/public/images/HHPT_2.jpg";
import HHPT3 from "@/public/images/HHPT_3.jpg";

const heroSlides = [
    {
        id: 1,
        headline: "Stop Hurting. Start Healing.",
        subheadline:
            "Personalized, evidence-based physical therapy care for Livonia, Novi, Farmington and all of Wayne & Oakland County.",
        cta: "Book Your Appointment",
        secondaryCta: "View Our Services",
        image: HHPT1,
    },
    {
        id: 2,
        headline: "Board Certified Specialists",
        subheadline:
            "Over 70 years of combined clinical experience delivering faster, superior functional outcomes.",
        cta: "Meet Our Team",
        secondaryCta: "Learn About Us",
        image: HHPT2,
    },
    {
        id: 3,
        headline: "One-on-One Care",
        subheadline:
            "Every patient receives personalized evaluation and treatment from fellowship-trained orthopedic physical therapists.",
        cta: "Start Your Recovery",
        secondaryCta: "Our Approach",
        image: HHPT3,
    },
];

export function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isPaused, setIsPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, []);

    const prevSlide = useCallback(() => {
        setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
    }, []);

    useEffect(() => {
        if (isPaused) return;
        const interval = setInterval(nextSlide, 6000);
        return () => clearInterval(interval);
    }, [isPaused, nextSlide]);

    return (
        <section
            className="relative min-h-[90vh] flex items-center overflow-hidden gradient-bg-hero"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-label="Hero section"
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-30">
                <svg
                    className="absolute top-0 right-0 w-1/2 h-full"
                    viewBox="0 0 400 800"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <circle
                        cx="400"
                        cy="200"
                        r="300"
                        fill="url(#heroCircle1)"
                        fillOpacity="0.3"
                    />
                    <circle
                        cx="350"
                        cy="600"
                        r="200"
                        fill="url(#heroCircle2)"
                        fillOpacity="0.2"
                    />
                    <defs>
                        <radialGradient id="heroCircle1">
                            <stop stopColor="var(--color-primary-300)" />
                            <stop offset="1" stopColor="transparent" />
                        </radialGradient>
                        <radialGradient id="heroCircle2">
                            <stop stopColor="var(--color-secondary-300)" />
                            <stop offset="1" stopColor="transparent" />
                        </radialGradient>
                    </defs>
                </svg>
            </div>

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-center">
                    {/* Text Content - left column */}
                    <div className="max-w-2xl lg:col-span-6">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentSlide}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.span
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2 }}
                                    className="inline-block px-4 py-2 mb-6 text-sm font-semibold text-[var(--color-primary-700)] bg-[var(--color-primary-100)] rounded-full"
                                >
                                    {siteConfig.companyInfo.credentials}
                                </motion.span>

                                <h1 className="mb-6 text-balance">
                                    <span className="gradient-text">
                                        {heroSlides[currentSlide].headline}
                                    </span>
                                </h1>

                                <p className="text-lg md:text-xl text-[var(--color-neutral-600)] pt-4 mt-3 mb-8 max-w-xl">
                                    {heroSlides[currentSlide].subheadline}
                                </p>

                                <div className="flex flex-col sm:flex-row mt-8 gap-4">
                                    <Button size="lg" rightIcon={<ArrowRight className="w-5 h-5" />}>
                                        <Link href="/contact">{heroSlides[currentSlide].cta}</Link>
                                    </Button>
                                    <Button variant="outline" size="lg">
                                        <Link href="/services">{heroSlides[currentSlide].secondaryCta}</Link>
                                    </Button>
                                </div>
                            </motion.div>
                        </AnimatePresence>

                        {/* Slide Indicators */}
                        <div className="flex items-center gap-4 mt-12">
                            <button
                                onClick={prevSlide}
                                className="p-2 rounded-full border border-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-100)] transition-colors"
                                aria-label="Previous slide"
                            >
                                <ChevronLeft className="w-5 h-5" />
                            </button>
                            <div className="flex gap-2">
                                {heroSlides.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentSlide(index)}
                                        className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide
                                            ? "bg-[var(--color-primary-600)] w-8"
                                            : "bg-[var(--color-neutral-300)]"
                                            }`}
                                        aria-label={`Go to slide ${index + 1}`}
                                        aria-current={index === currentSlide ? "true" : undefined}
                                    />
                                ))}
                            </div>
                            <button
                                onClick={nextSlide}
                                className="p-2 rounded-full border border-[var(--color-neutral-300)] hover:bg-[var(--color-neutral-100)] transition-colors"
                                aria-label="Next slide"
                            >
                                <ChevronRight className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    {/* Hero Illustration - right column */}
                    <div className="hidden md:block lg:col-span-6">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="relative h-[64vh] lg:h-[72vh] w-full rounded-2xl overflow-hidden shadow-2xl ring-1 ring-black/6"
                        >
                            <AnimatePresence>
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image
                                        src={heroSlides[currentSlide].image}
                                        alt={heroSlides[currentSlide].headline}
                                        fill
                                        sizes="(min-width:1024px) 40vw, 100vw"
                                        style={{ objectFit: "cover", objectPosition: "center right" }}
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Soft left gradient to blend image into the page background */}
                            <div
                                aria-hidden="true"
                                className="absolute inset-0 pointer-events-none z-10"
                            />

                            {/* Decorative subtle circles for depth (optional) */}
                            <svg
                                className="absolute -right-24 -bottom-20 w-96 h-96 opacity-30 z-20"
                                viewBox="0 0 400 400"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <circle cx="200" cy="200" r="200" fill="url(#g1)" />
                                <defs>
                                    <radialGradient id="g1">
                                        <stop offset="0" stopColor="rgba(45,138,116,0.12)" />
                                        <stop offset="1" stopColor="transparent" />
                                    </radialGradient>
                                </defs>
                            </svg>
                        </motion.div>
                    </div>

                    {/* On small screens show the image under text — optional fallback */}
                    <div className="block md:hidden mt-8">
                        <div className="relative h-56 w-full rounded-lg overflow-hidden shadow-md">
                            <AnimatePresence>
                                <motion.div
                                    key={currentSlide}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.5 }}
                                    className="absolute inset-0 w-full h-full"
                                >
                                    <Image
                                        src={heroSlides[currentSlide].image}
                                        alt={heroSlides[currentSlide].headline}
                                        fill
                                        sizes="100vw"
                                        style={{ objectFit: "cover", objectPosition: "center right" }}
                                        priority
                                    />
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
