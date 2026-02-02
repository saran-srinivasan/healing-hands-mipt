"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Info } from "lucide-react";
import Link from "next/link";
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
            6000
        );
        return () => clearInterval(id);
    }, [visible, paused, notifications.length]);

    if (!visible || notifications.length === 0) return null;

    const current = notifications[index];

    return (
        <section
            role="alert"
            aria-live="polite"
            className="
      fixed top-25 left-1/2 z-40
      -translate-x-1/2
      w-full px-3
      max-w-[640px] lg:max-w-[50%]
      flex justify-center
    "
        >
            <div
                className="
        flex flex-wrap items-center gap-2 sm:gap-3
        rounded-2xl sm:rounded-full
        bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100
        border border-amber-200
        px-4 py-2 sm:px-5
        text-xs sm:text-sm text-amber-900
        shadow-[0_6px_24px_-10px_rgba(251,191,36,0.5)]
        backdrop-blur
        w-full
      "
            >
                {/* Icon */}
                <Info className="w-4 h-4 text-amber-700 flex-shrink-0" />

                {/* Message */}
                <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current.id}
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.2 }}
                            className="
              leading-snug
              break-words
              sm:whitespace-nowrap
            "
                        >
                            <span className="font-medium">
                                {current.message}
                            </span>

                            {current.link && (
                                <Link
                                    href={current.link}
                                    className="ml-1 underline underline-offset-4 font-semibold hover:text-amber-700"
                                >
                                    Details →
                                </Link>
                            )}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Controls */}
                <div className="flex items-center gap-1 ml-auto">
                    {notifications.length > 1 && (
                        <>
                            <button
                                onClick={() =>
                                    setIndex((i) =>
                                        i === 0 ? notifications.length - 1 : i - 1
                                    )
                                }
                                aria-label="Previous notification"
                                className="p-1 rounded-full hover:bg-amber-200/60"
                            >
                                <ChevronLeft className="w-3.5 h-3.5" />
                            </button>

                            <button
                                onClick={() =>
                                    setIndex((i) => (i + 1) % notifications.length)
                                }
                                aria-label="Next notification"
                                className="p-1 rounded-full hover:bg-amber-200/60"
                            >
                                <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                        </>
                    )}

                    <button
                        onClick={() => {
                            setVisible(false);
                            sessionStorage.setItem("clinic-banner-dismissed", "true");
                        }}
                        aria-label="Dismiss notification"
                        className="p-1 rounded-full hover:bg-amber-200/60"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </section>
    );

}
