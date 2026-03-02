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
          "inline-flex items-center gap-2 rounded-full border border-[var(--color-neutral-200)] bg-white px-3 py-2",
          "text-sm font-semibold text-[var(--color-neutral-700)] shadow-sm transition",
          "hover:bg-[var(--color-neutral-50)] hover:text-[var(--color-primary-700)]",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
        )}
      >
        <Phone className="h-4 w-4" />
        <a href={`tel:${items[0].tel}`} className="hidden lg:inline">
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
    <header className="relative z-150 w-full bg-[var(--color-primary-50)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-primary-50)]/90">
      <div className="w-full max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex min-h-[80px] items-center justify-between gap-4 py-3 sm:min-h-[96px] sm:py-4 lg:min-h-[140px]">
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 lg:gap-4"
            aria-label={`${siteConfig.name} home`}
          >
            <Image
              src={HHPT_logo}
              alt="Healing Hands Physical Therapy Associates logo"
              width={168}
              height={140}
              priority
              className="h-auto w-[72px] shrink-0 sm:w-[96px] lg:w-[136px]"
            />
            <div className="leading-[1.1]">
              <p className="text-base font-semibold uppercase tracking-[0.09em] text-[var(--color-primary-800)] sm:text-lg lg:text-2xl xl:text-[32px] whitespace-nowrap">
                Healing Hands
              </p>
              <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.09em] text-[var(--color-secondary-700)] sm:text-xs lg:text-[16px] whitespace-nowrap">
                Physical Therapy Associates LLC
              </p>
            </div>
          </Link>

          {/* Desktop Nav - Center */}
          <nav
            className="hidden flex-1 justify-center lg:flex"
            aria-label="Primary navigation"
          >
            <ul className="flex items-center gap-6 xl:gap-10">
              {siteConfig.navigation.map((item) => {
                const active = isActive(item.href);
                const showChevron =
                  item.name === "About" || item.name === "Services";

                return (
                  <li key={item.name}>
                    <Link
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={cn(
                        "inline-flex items-center gap-1.5 text-lg font-medium text-[var(--color-neutral-700)] transition-colors xl:text-xl",
                        "hover:text-[var(--color-primary-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2",
                        active && "text-[var(--color-secondary-600)]",
                      )}
                    >
                      <span>{item.name}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Actions - Right */}
          <div className="flex items-center gap-3 shrink-0 lg:gap-4">
            <PhoneDropdown items={phoneItems} />

            <Link
              href="/contact"
              className="hidden items-center justify-center gap-1 rounded-md bg-[var(--color-primary-600)] px-5 py-3 text-base font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-700)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 lg:inline-flex xl:px-6 xl:py-3.5 xl:text-lg"
            >
              <CalendarDays className="h-5 w-5" />
              <span>Request an Appointment</span>
            </Link>

            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md p-2 text-[var(--color-neutral-700)] transition hover:bg-[var(--color-neutral-100)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-primary-500)] focus-visible:ring-offset-2 lg:hidden"
              onClick={() => setIsOpen((v) => !v)}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
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
              className="fixed inset-x-0 top-[80px] z-50 border-y border-[var(--color-neutral-200)] bg-[var(--color-primary-50)] shadow-xl sm:top-[96px] lg:hidden"
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
                        "rounded-lg px-4 py-3 text-lg font-medium text-[var(--color-neutral-700)] transition",
                        "hover:bg-[var(--color-neutral-100)] hover:text-[var(--color-primary-700)]",
                        active && "bg-white text-[var(--color-secondary-600)]",
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
                  <span className="text-[var(--color-neutral-500)]">
                    {siteConfig.links.phone}
                  </span>
                </a>

                <a
                  href={`tel:${tollFree}`}
                  className="flex justify-between rounded-lg px-4 py-3 text-base font-medium text-[var(--color-neutral-700)] hover:bg-[var(--color-neutral-50)]"
                >
                  Toll-free
                  <span className="text-[var(--color-neutral-500)]">
                    {siteConfig.links.tollFree}
                  </span>
                </a>

                <Link
                  href="/contact"
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--color-primary-600)] px-6 py-3 text-lg font-semibold text-white shadow-sm transition hover:bg-[var(--color-primary-700)]"
                >
                  <CalendarDays className="h-5 w-5" />
                  Request an Appointment
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
