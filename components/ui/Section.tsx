"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface SectionProps {
    children: React.ReactNode;
    className?: string;
    id?: string;
    containerClassName?: string;
    animate?: boolean;
}

export function Section({
    children,
    className,
    id,
    containerClassName,
    animate = true,
}: SectionProps) {
    if (animate) {
        return (
            <motion.section
                id={id}
                className={cn("py-16 md:py-24", className)}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5 }}
            >
                <div className={cn("container", containerClassName)}>{children}</div>
            </motion.section>
        );
    }

    return (
        <section
            id={id}
            className={cn("py-16 md:py-24", className)}
        >
            <div className={cn("container", containerClassName)}>{children}</div>
        </section>
    );
}

interface SectionHeadingProps {
    title: string;
    subtitle?: string;
    align?: "left" | "center" | "right";
    className?: string;
}

export function SectionHeading({
    title,
    subtitle,
    align = "center",
    className,
}: SectionHeadingProps) {
    const alignClass = {
        left: "text-left",
        center: "text-center mx-auto",
        right: "text-right",
    };

    return (
        <div className={cn("max-w-3xl mb-12 md:mb-16", alignClass[align], className)}>
            <h2 className="text-balance mb-4">{title}</h2>
            {subtitle && (
                <p className="text-lg md:text-xl text-[var(--color-neutral-600)] text-balance">
                    {subtitle}
                </p>
            )}
        </div>
    );
}
