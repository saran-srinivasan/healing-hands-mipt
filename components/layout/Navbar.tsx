"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import HHPT_logo from "@/public/images/HHPT_logo.png";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/lib/config";

type PhoneItem = { label: string; display: string; tel: string };

function PhoneDropdown({ items }: { items: PhoneItem[] }) {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        if (!open) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [open]);

    React.useEffect(() => {
        const onPointerDown = (e: MouseEvent | TouchEvent) => {
            if (!ref.current) return;
            if (!ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", onPointerDown);
        document.addEventListener("touchstart", onPointerDown, { passive: true });
        return () => {
            document.removeEventListener("mousedown", onPointerDown);
            document.removeEventListener("touchstart", onPointerDown);
        };
    }, []);

    return (
        <div ref={ref} className="relative">
            <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
                className={cn(
                    "inline-flex items-center gap-2 rounded-full border border-[var(--color-neutral-200)] bg-white px-3 py-2",
                    "text-sm font-semibold text-[var(--color-neutral-700)] shadow-sm transition",
                    "hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-primary-700)]",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2"
                )}
            >
                <Phone className="h-4 w-4" />
                <a href={`tel:${items[0].tel}`} className="hidden lg:inline">{items[0].display}</a>
                <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
            </button>

            <AnimatePresence>
                {open && (
                    <motion.div
                        key="phone-menu"
                        role="menu"
                        initial={{ opacity: 0, y: -6, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.98 }}
                        transition={{ duration: 0.14, ease: "easeOut" }}
                        className="absolute right-0 mt-2 w-64 overflow-hidden rounded-xl border border-[var(--color-neutral-200)] bg-white shadow-lg"
                    >
                        <div className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--color-neutral-500)]">
                            Call us
                        </div>
                        <div className="h-px w-full bg-[var(--color-neutral-100)]" />
                        {items.map((n) => (
                            <a
                                key={n.label}
                                role="menuitem"
                                href={`tel:${n.tel}`}
                                onClick={() => setOpen(false)}
                                className={cn(
                                    "flex items-start justify-between gap-4 px-4 py-3 text-sm",
                                    "text-[var(--color-neutral-700)] transition hover:bg-[var(--color-neutral-50)]"
                                )}
                            >
                                <span className="font-medium">{n.label}</span>
                                <span className="text-[var(--color-neutral-500)]">{n.display}</span>
                            </a>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

export function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = React.useState(false);

    React.useEffect(() => {
        setIsOpen(false);
    }, [pathname]);

    React.useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    React.useEffect(() => {
        if (!isOpen) return;
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsOpen(false);
        };
        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [isOpen]);

    const phone = siteConfig.links.phone.replace(/[^0-9]/g, "");
    const tollFree = siteConfig.links.tollFree.replace(/[^0-9]/g, "");

    const phoneItems: PhoneItem[] = [
        { label: "Main", display: siteConfig.links.phone, tel: phone },
        { label: "Toll-free", display: siteConfig.links.tollFree, tel: tollFree },
    ];

    const isActive = (href: string) => {
        if (!pathname) return false;
        if (href === "/") return pathname === "/";
        return pathname === href || pathname.startsWith(`${href}/`);
    };

    return (
        <header className="sticky top-0 z-150 w-full border-b border-[var(--color-neutral-100)] bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70">

            {/* Top bar */}
            <div className="mx-auto grid h-[84px] grid-cols-[auto_1fr_auto] items-center gap-x-4 px-4 sm:h-[100px] sm:px-6 lg:px-8">

                {/* BRAND BLOCK — ENHANCED */}
                <Link
                    href="/"
                    className="flex items-center gap-3 sm:gap-4 justify-self-start group"
                    aria-label={`${siteConfig.shortName} home`}
                >
                    <Image
                        src={HHPT_logo}
                        alt="Healing Hands Physical Therapy Associates Logo"
                        width={84}
                        height={84}
                        priority
                        className="w-16 sm:w-20 lg:w-24 h-auto transition-transform duration-300 group-hover:scale-[1.04]"
                    />

                    <span className="
                        font-bold
                        leading-tight
                        text-[var(--color-primary-700)]
                        text-xl
                        sm:text-2xl
                        lg:text-3xl
                        tracking-tight
                        transition-colors
                        whitespace-nowrap
                        group-hover:text-[var(--color-primary-800)]
                    ">
                        {siteConfig.shortName}
                    </span>
                </Link>


                {/* Desktop nav */}
                <nav className="hidden md:flex justify-self-center" aria-label="Primary navigation">
                    <div className="flex items-center gap-6 lg:gap-8">
                        {siteConfig.navigation.map((item) => {
                            const active = isActive(item.href);

                            return (
                                <Link
                                    key={item.name}
                                    href={item.href}
                                    aria-current={active ? "page" : undefined}
                                    className={cn(
                                        "relative rounded-md px-3 py-2 font-semibold text-[var(--color-neutral-700)] transition-colors",
                                        "hover:text-[var(--color-primary-600)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
                                        "after:absolute after:inset-x-3 after:-bottom-0.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-[var(--color-primary-500)] after:transition-transform",
                                        "hover:after:scale-x-100",
                                        active && "text-[var(--color-primary-700)] after:scale-x-100"
                                    )}
                                >
                                    {item.name}
                                </Link>
                            );
                        })}
                    </div>
                </nav>


                {/* Right side */}
                <div className="justify-self-end">
                    <div className="hidden md:flex items-center gap-3 lg:gap-4">

                        <div className="hidden lg:block">
                            <PhoneDropdown items={phoneItems} />
                        </div>

                        <Link
                            href="/contact"
                            className="inline-flex items-center justify-center rounded-full bg-[var(--color-primary-600)] px-5 py-2.5 text-base font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 active:scale-[0.98]"
                        >
                            Book Appointment
                        </Link>
                    </div>

                    {/* Mobile toggle */}
                    <button
                        type="button"
                        className="inline-flex items-center justify-center rounded-md p-2 text-[var(--color-neutral-700)] transition hover:bg-[var(--color-neutral-50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 md:hidden"
                        onClick={() => setIsOpen((v) => !v)}
                        aria-expanded={isOpen}
                        aria-controls="mobile-menu"
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            {/* MOBILE PANEL (unchanged logic) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            className="fixed inset-0 z-40 bg-black/20 md:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        <motion.div
                            id="mobile-menu"
                            className="fixed inset-x-0 top-[84px] sm:top-[100px] z-50 border-b border-[var(--color-neutral-100)] bg-white md:hidden"
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                        >
                            <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-4 sm:px-6">
                                {siteConfig.navigation.map((item) => {
                                    const active = isActive(item.href);
                                    return (
                                        <Link
                                            key={item.name}
                                            href={item.href}
                                            aria-current={active ? "page" : undefined}
                                            className={cn(
                                                "rounded-lg px-4 py-3 text-lg font-semibold text-[var(--color-neutral-700)] transition",
                                                "hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-primary-600)]",
                                                active && "bg-[var(--color-neutral-50)] text-[var(--color-primary-700)]"
                                            )}
                                        >
                                            {item.name}
                                        </Link>
                                    );
                                })}

                                <div className="mt-2 h-px w-full bg-[var(--color-neutral-200)]" />

                                <a
                                    href={`tel:${phone}`}
                                    className="flex justify-between rounded-lg px-4 py-3 text-base font-medium text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-50)]"
                                >
                                    Main
                                    <span className="text-[var(--color-neutral-500)]">{siteConfig.links.phone}</span>
                                </a>

                                <a
                                    href={`tel:${tollFree}`}
                                    className="flex justify-between rounded-lg px-4 py-3 text-base font-medium text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-50)]"
                                >
                                    Toll-free
                                    <span className="text-[var(--color-neutral-500)]">{siteConfig.links.tollFree}</span>
                                </a>

                                <Link
                                    href="/contact"
                                    className="mt-2 inline-flex w-full justify-center rounded-full bg-[var(--color-primary-600)] px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-700)]"
                                >
                                    Book Appointment
                                </Link>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}

