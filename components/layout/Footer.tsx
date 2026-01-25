import React from "react";
import Link from "next/link";
import { siteConfig } from "@/lib/config";
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from "lucide-react";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--color-neutral-900)] text-[var(--color-neutral-300)]">
            <div className="container py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
                    {/* Brand Column */}
                    <div className="lg:col-span-1">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 font-bold text-xl text-white mb-4"
                        >
                            <svg
                                className="w-8 h-8"
                                viewBox="0 0 32 32"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true"
                            >
                                <circle
                                    cx="16"
                                    cy="16"
                                    r="14"
                                    fill="url(#footerLogoGradient)"
                                    stroke="white"
                                    strokeWidth="1.5"
                                />
                                <path
                                    d="M16 8C18 12 20 14 22 14C20 14 18 16 16 20C14 16 12 14 10 14C12 14 14 12 16 8Z"
                                    fill="white"
                                    stroke="white"
                                    strokeWidth="1"
                                    strokeLinejoin="round"
                                />
                                <defs>
                                    <linearGradient
                                        id="footerLogoGradient"
                                        x1="2"
                                        y1="2"
                                        x2="30"
                                        y2="30"
                                        gradientUnits="userSpaceOnUse"
                                    >
                                        <stop stopColor="var(--color-primary-500)" />
                                        <stop offset="1" stopColor="var(--color-secondary-500)" />
                                    </linearGradient>
                                </defs>
                            </svg>
                            {siteConfig.shortName}
                        </Link>
                        <p className="text-sm leading-relaxed mb-4">
                            {siteConfig.description}
                        </p>
                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a
                                href={siteConfig.social.facebook}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Facebook"
                                className="p-2 bg-[var(--color-neutral-800)] rounded-full hover:bg-[var(--color-primary-600)] transition-colors"
                            >
                                <Facebook className="w-5 h-5" />
                            </a>
                            <a
                                href={siteConfig.social.instagram}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="p-2 bg-[var(--color-neutral-800)] rounded-full hover:bg-[var(--color-primary-600)] transition-colors"
                            >
                                <Instagram className="w-5 h-5" />
                            </a>
                            <a
                                href={siteConfig.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="LinkedIn"
                                className="p-2 bg-[var(--color-neutral-800)] rounded-full hover:bg-[var(--color-primary-600)] transition-colors"
                            >
                                <Linkedin className="w-5 h-5" />
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
                        <ul className="space-y-3">
                            {siteConfig.navigation.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        href={item.href}
                                        className="hover:text-white transition-colors"
                                    >
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Our Services</h3>
                        <ul className="space-y-3">
                            {siteConfig.services.slice(0, 4).map((service) => (
                                <li key={service.id}>
                                    <Link
                                        href={`/services#${service.id}`}
                                        className="hover:text-white transition-colors"
                                    >
                                        {service.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-4">Contact Us</h3>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 mt-0.5 shrink-0 text-[var(--color-primary-400)]" />
                                <span>{siteConfig.links.address.full}</span>
                            </li>
                            <li>
                                <a
                                    href={`tel:${siteConfig.links.phone.replace(/[^0-9]/g, "")}`}
                                    className="flex items-center gap-3 hover:text-white transition-colors"
                                >
                                    <Phone className="w-5 h-5 shrink-0 text-[var(--color-primary-400)]" />
                                    {siteConfig.links.phone}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={`mailto:${siteConfig.links.email}`}
                                    className="flex items-center gap-3 hover:text-white transition-colors"
                                >
                                    <Mail className="w-5 h-5 shrink-0 text-[var(--color-primary-400)]" />
                                    {siteConfig.links.email}
                                </a>
                            </li>
                        </ul>
                        <div className="mt-4 text-sm">
                            <p>{siteConfig.hours.weekdays}</p>
                            <p>{siteConfig.hours.saturday}</p>
                            <p>{siteConfig.hours.sunday}</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-[var(--color-neutral-800)] flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-center md:text-left">
                        © {currentYear} {siteConfig.companyInfo.fullName || siteConfig.name}. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link href="/privacy-policy" className="hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms" className="hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
