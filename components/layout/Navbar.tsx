"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

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
          "inline-flex items-center gap-1.5 rounded-full border border-[var(--color-neutral-200)] bg-white px-3 py-2",
          "text-sm font-semibold text-[var(--color-neutral-700)] shadow-sm transition",
          "hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-primary-700)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
        )}
      >
        <Phone className="h-4 w-4" />
        <a
          href={`tel:${items[0].tel}`}
          className="whitespace-nowrap hidden lg:inline"
        >
          {items[0].display}
        </a>
        <ChevronDown
          className={cn("h-4 w-4 transition-transform", open && "rotate-180")}
        />
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
            className="absolute right-0 mt-2 w-56 sm:w-64 overflow-hidden rounded-xl border border-[var(--color-neutral-200)] bg-white shadow-lg"
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
                  "text-[var(--color-neutral-700)] transition hover:bg-[var(--color-neutral-50)]",
                )}
              >
                <span className="font-medium">{n.label}</span>
                <span className="text-[var(--color-neutral-500)]">
                  {n.display}
                </span>
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
    <header className="relative z-150 w-full bg-[var(--color-primary-50)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-primary-50)]/90 border-b border-[var(--color-primary-100)]/50">
      <div className="mx-auto w-full max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* 
          NEW GRID LAYOUT 
          Mobile: 2 columns (Logo span full row, Buttons under it right aligned)
          Large: 3 equal-width columns (Logo Left, Nav Center, Buttons Right)
        */}
        <div className="grid grid-cols-2 lg:grid-cols-3 items-center gap-y-3 py-3 lg:min-h-[120px]">
          {/* 1. LOGO SECTION (Left side on Desktop, Full width on Mobile) */}
          <div className="col-span-2 flex justify-center lg:justify-start lg:col-span-1">
            <Link
              href="/"
              className="flex items-center gap-3 shrink-0"
              aria-label={`${siteConfig.name} home`}
            >
              <Image
                src={HHPT_logo}
                alt="Healing Hands Physical Therapy Associates logo"
                width={168}
                height={140}
                priority
                className="h-auto w-[72px] shrink-0 sm:w-[96px] lg:w-[136px] xl:w-[148px]"
              />
              <div className="leading-[1.1]">
                <p className="text-[17px] sm:text-[22px] lg:text-[28px] xl:text-[30px] font-bold uppercase tracking-[0.08em] text-[var(--color-primary-800)] whitespace-nowrap">
                  Healing Hands
                </p>
                <p className="mt-1 text-[11px] sm:text-[13px] lg:text-[16px] xl:text-[14px] font-semibold uppercase tracking-[0.1em] text-[var(--color-secondary-700)] whitespace-nowrap">
                  Physical Therapy Associates LLC
                </p>
              </div>
            </Link>
          </div>

          {/* 2. NAVIGATION SECTION (Center on Desktop, Hidden on Mobile) */}
          <nav
            className="hidden lg:flex justify-center"
            aria-label="Primary navigation"
          >
            <ul className="flex items-center gap-6 xl:gap-8">
              {siteConfig.navigation.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex items-center text-[17px] xl:text-[19px] font-medium text-[var(--color-neutral-700)] transition-colors",
                        "hover:text-[var(--color-primary-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
                        active &&
                          "text-[var(--color-secondary-600)] font-semibold",
                      )}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* 3. ACTION SECTION (Right side on Desktop, Right side bottom row on Mobile) */}
          <div className="col-span-2 flex items-center justify-center sm:justify-end gap-3 lg:col-span-1 lg:justify-end">
            <PhoneDropdown items={phoneItems} />

            <Link
              href="/contact"
              className="hidden lg:inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primary-600)] px-5 py-3 text-base xl:text-[17px] font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2"
            >
              <CalendarDays className="h-5 w-5 text-white" />
              <span className="text-white whitespace-nowrap">
                Request an Appointment
              </span>
            </Link>

            <button
              type="button"
              className="inline-flex lg:hidden items-center justify-center rounded-lg border border-[var(--color-neutral-200)] bg-white p-2 text-[var(--color-neutral-700)] shadow-sm transition hover:bg-[var(--color-neutral-50)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-black/25 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              id="mobile-menu"
              // Adjusted top placement to account for stacked header
              className="fixed inset-x-0 top-[130px] sm:top-[140px] z-50 border-y border-[var(--color-neutral-200)] bg-[var(--color-primary-50)] shadow-2xl lg:hidden"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
            >
              <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 flex flex-col gap-2 py-4">
                {siteConfig.navigation.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "rounded-xl px-4 py-3.5 text-lg font-semibold text-[var(--color-neutral-700)] transition",
                        "hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-primary-700)]",
                        active &&
                          "bg-white text-[var(--color-secondary-600)] shadow-sm",
                      )}
                    >
                      {item.name}
                    </Link>
                  );
                })}

                <div className="my-2 h-px w-full bg-[var(--color-primary-200)]" />

                <a
                  href={`tel:${phone}`}
                  className="flex justify-between rounded-xl px-4 py-3 text-base font-semibold text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-50)] transition"
                >
                  Main
                  <span className="text-[var(--color-neutral-500)]">
                    {siteConfig.links.phone}
                  </span>
                </a>

                <a
                  href={`tel:${tollFree}`}
                  className="flex justify-between rounded-xl px-4 py-3 text-base font-semibold text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-50)] transition"
                >
                  Toll-free
                  <span className="text-[var(--color-neutral-500)]">
                    {siteConfig.links.tollFree}
                  </span>
                </a>

                <Link
                  href="/contact"
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary-600)] px-6 py-4 text-[17px] font-bold text-white shadow-sm transition hover:bg-[var(--color-primary-700)]"
                >
                  <CalendarDays className="h-5 w-5" />
                  <span className="text-white">Request an Appointment</span>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
