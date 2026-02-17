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
        <div
            role="alert"
            aria-live="polite"
            className="relative z-50 w-full bg-amber-50 border-b border-amber-200 text-amber-900"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
        >
            <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">

                {/* Left Side: Icon + Message */}
                <div className="flex flex-1 items-start sm:items-center gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-200/50">
                        <Info className="h-4 w-4 text-amber-700" />
                    </span>

                    <div className="flex-1 min-w-0">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={current.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="flex flex-wrap items-start sm:items-center gap-2 text-sm font-medium w-full"
                            >
                                <span className="break-words leading-snug sm:whitespace-nowrap">
                                    {current.message}
                                </span>

                                {current.link && (
                                    <Link
                                        href={current.link}
                                        className="shrink-0 whitespace-nowrap font-semibold underline decoration-amber-400 underline-offset-2 hover:text-amber-700"
                                    >
                                        Learn more &rarr;
                                    </Link>
                                )}
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>

                {/* Right Side: Controls */}
                <div className="flex shrink-0 items-center gap-2 pl-4">
                    {notifications.length > 1 && (
                        <div className="hidden sm:flex items-center gap-1 border-r border-amber-200 pr-2 mr-2">
                            <button
                                onClick={() =>
                                    setIndex((i) => (i === 0 ? notifications.length - 1 : i - 1))
                                }
                                aria-label="Previous notification"
                                className="rounded-full p-1 transition hover:bg-amber-200/50 text-amber-800"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </button>
                            <button
                                onClick={() => setIndex((i) => (i + 1) % notifications.length)}
                                aria-label="Next notification"
                                className="rounded-full p-1 transition hover:bg-amber-200/50 text-amber-800"
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
                        className="rounded-full p-1.5 transition hover:bg-amber-200/50 text-amber-800"
                    >
                        <X className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
