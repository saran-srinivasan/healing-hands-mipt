"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import HHPT_logo from "@/public/images/HHPT_logo.png";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const buttonStyles = cn(
        "inline-flex items-center justify-center font-semibold rounded-full transition-all duration-200 ease-in-out",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "shadow-sm hover:shadow-md active:scale-[0.98]"
    );

    return (
        <header className="sticky top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-[var(--color-neutral-100)]">
            <nav className="container flex items-center justify-between h-20 md:h-24 pl-6 md:pl-16">
                {/* Logo */}
                <Link
                    href="/"
                    className="flex items-center gap-3 font-bold text-[var(--color-primary-700)]"
                    aria-label={`${siteConfig.shortName} - Home`}
                >
                    <Image src={HHPT_logo} alt="Healing Hands Physical Therapy Associates Logo" width={70} height={70} />
                    <span className="text-sm sm:text-xl leading-tight">{siteConfig.shortName}</span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {siteConfig.navigation.map((item) => (
                        <Link
                            key={item.name}
                            href={item.href}
                            className={cn(
                                "text-[var(--color-neutral-700)] font-medium transition-colors",
                                "hover:text-[var(--color-primary-600)]",
                                "relative after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-0.5",
                                "after:bg-[var(--color-primary-500)] after:transition-all hover:after:w-full"
                            )}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Desktop CTA */}
                <div className="hidden md:flex items-center gap-4">
                    <a
                        href={`tel:${siteConfig.links.phone.replace(/[^0-9]/g, "")}`}
                        className="flex items-center gap-2 text-sm font-medium text-[var(--color-neutral-600)] hover:text-[var(--color-primary-600)] transition-colors"
                    >
                        <Phone className="w-4 h-4" />
                        {siteConfig.links.phone}
                    </a>
                    <Link
                        href="/contact"
                        className={cn(
                            buttonStyles,
                            "px-4 py-2 text-sm",
                            "bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)] focus-visible:ring-[var(--color-primary-500)]"
                        )}
                    >
                        Book Appointment
                    </Link>
                </div>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="md:hidden p-2 -mr-2 text-[var(--color-neutral-700)]"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-expanded={isOpen}
                    aria-label={isOpen ? "Close menu" : "Open menu"}
                >
                    {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="md:hidden bg-white border-b border-[var(--color-neutral-100)]"
                    >
                        <div className="container py-4 flex flex-col gap-4">
                            {siteConfig.navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    className="py-2 text-lg font-medium text-[var(--color-neutral-700)] hover:text-[var(--color-primary-600)]"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.name}
                                </Link>
                            ))}
                            <hr className="border-[var(--color-neutral-200)]" />
                            <a
                                href={`tel:${siteConfig.links.phone.replace(/[^0-9]/g, "")}`}
                                className="flex items-center gap-2 py-2 text-[var(--color-neutral-600)]"
                            >
                                <Phone className="w-5 h-5" />
                                {siteConfig.links.phone}
                            </a>
                            <Link
                                href="/contact"
                                className={cn(
                                    buttonStyles,
                                    "w-full px-6 py-3 text-base",
                                    "bg-[var(--color-primary-600)] text-white hover:bg-[var(--color-primary-700)] focus-visible:ring-[var(--color-primary-500)]"
                                )}
                                onClick={() => setIsOpen(false)}
                            >
                                Book Appointment
                            </Link>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
