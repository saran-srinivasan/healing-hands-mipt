"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Info } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import type { Notification } from "@/lib/notifications";

interface NotificationBannerProps {
  notifications: Notification[];
}

export function NotificationBanner({ notifications }: NotificationBannerProps) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem("clinic-banner-dismissed") === "true") {
      setVisible(false);
    }
  }, []);

  useEffect(() => {
    if (!visible || paused || notifications.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % notifications.length),
      6000,
    );
    return () => clearInterval(id);
  }, [visible, paused, notifications.length]);

  if (!visible || notifications.length === 0) return null;

  const current = notifications[index];

  return (
    <div
      role="alert"
      aria-live="polite"
      className="relative z-140 w-full bg-[var(--color-primary-50)]/95 backdrop-blur supports-[backdrop-filter]:bg-[var(--color-primary-50)]/90 pb-3 pt-1"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="mx-auto w-full max-w-screen-md px-3 sm:px-6">
        <div
          className={cn(
            "w-full rounded-2xl border border-amber-200/80",
            "bg-amber-50/95 text-amber-950 shadow-sm ring-1 ring-black/5",
          )}
        >
          <div className="flex items-center justify-between gap-3 px-4 py-3 sm:px-5">
            {/* Left: icon + message */}
            <div className="flex min-w-0 flex-1 items-start gap-3 sm:items-center">
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-amber-100 ring-1 ring-amber-200 sm:mt-0">
                <Info className="h-4 w-4 text-amber-700" />
              </span>

              <div className="min-w-0 flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                    className="flex min-w-0 flex-wrap items-start gap-x-2 gap-y-1 text-sm font-medium sm:items-center"
                  >
                    <span className="min-w-0 break-words leading-snug">
                      {current.message}
                    </span>

                    {current.link && (
                      <Link
                        href={current.link}
                        className="shrink-0 whitespace-nowrap font-semibold text-amber-800 underline decoration-amber-300 underline-offset-4 transition hover:text-amber-900 hover:decoration-amber-500"
                      >
                        Learn more &rarr;
                      </Link>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Right: controls */}
            <div className="flex shrink-0 items-center gap-1.5">
              {notifications.length > 1 && (
                <div className="hidden sm:flex items-center gap-1 pr-1">
                  <button
                    onClick={() =>
                      setIndex((i) =>
                        i === 0 ? notifications.length - 1 : i - 1,
                      )
                    }
                    aria-label="Previous notification"
                    className="rounded-full p-1.5 text-amber-800 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>

                  <button
                    onClick={() =>
                      setIndex((i) => (i + 1) % notifications.length)
                    }
                    aria-label="Next notification"
                    className="rounded-full p-1.5 text-amber-800 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}

              <button
                onClick={() => {
                  setVisible(false);
                  sessionStorage.setItem("clinic-banner-dismissed", "true");
                }}
                aria-label="Dismiss notification"
                className="rounded-full p-1.5 text-amber-800 transition hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
