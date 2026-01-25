"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Activity, Dumbbell, Heart, Zap, ArrowRight, type LucideIcon } from "lucide-react";
import { Button } from "./Button";

// Icon mapping for type safety
const iconMap: Record<string, LucideIcon> = {
    Activity,
    Dumbbell,
    Heart,
    Zap,
    Spine: Activity, // Fallback since Spine isn't a lucide icon
};

interface ServiceCardProps {
    title: string;
    tagline: string;
    description: string;
    icon: string;
    index?: number;
    onLearnMore?: () => void;
}

export function ServiceCard({
    title,
    tagline,
    description,
    icon,
    index = 0,
    onLearnMore,
}: ServiceCardProps) {
    // Get the icon component from our map, or default to Activity
    const IconComponent = iconMap[icon] || Activity;

    return (
        <motion.article
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={cn(
                "group relative flex flex-col p-6 md:p-8",
                "bg-white rounded-2xl border border-[var(--color-neutral-200)]",
                "shadow-sm hover:shadow-lg transition-all duration-300",
                "hover:border-[var(--color-primary-200)]"
            )}
        >
            {/* Icon */}
            <div
                className={cn(
                    "flex items-center justify-center w-14 h-14 mb-6",
                    "rounded-xl bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)]",
                    "group-hover:scale-110 transition-transform duration-300"
                )}
            >
                <IconComponent className="w-7 h-7 text-[var(--color-primary-600)]" />
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold mb-2 text-[var(--color-neutral-900)]">
                {title}
            </h3>
            <p className="text-sm font-medium text-[var(--color-primary-600)] mb-3">
                {tagline}
            </p>
            <p className="text-[var(--color-neutral-600)] mb-6 flex-grow leading-relaxed">
                {description}
            </p>

            {/* CTA */}
            <Button
                variant="ghost"
                size="sm"
                onClick={onLearnMore}
                className="self-start mt-auto"
                rightIcon={<ArrowRight className="w-4 h-4" />}
            >
                Learn More
            </Button>

            {/* Decorative gradient on hover */}
            <div
                className={cn(
                    "absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100",
                    "bg-gradient-to-br from-[var(--color-primary-50)] to-transparent",
                    "transition-opacity duration-300 -z-10"
                )}
            />
        </motion.article>
    );
}
