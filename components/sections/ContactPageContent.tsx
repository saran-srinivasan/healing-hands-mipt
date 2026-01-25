"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/lib/config";
import { cn } from "@/lib/utils";
import {
    Phone,
    Mail,
    MapPin,
    Clock,
    Send,
    CheckCircle,
    AlertCircle,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// Form validation schema
const contactSchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 characters")
        .max(100, "Name is too long"),
    email: z.string().email("Please enter a valid email address"),
    phone: z
        .string()
        .min(10, "Please enter a valid phone number")
        .max(20, "Phone number is too long")
        .regex(/^[0-9()\-\s+]+$/, "Please enter a valid phone number"),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters")
        .max(1000, "Message is too long"),
    honeypot: z.string().max(0), // Spam protection
});

type ContactFormData = z.infer<typeof contactSchema>;

const contactInfo = [
    {
        icon: Phone,
        label: "Phone",
        value: siteConfig.links.phone,
        href: `tel:${siteConfig.links.phone.replace(/[^0-9]/g, "")}`,
    },
    {
        icon: Mail,
        label: "Email",
        value: siteConfig.links.email,
        href: `mailto:${siteConfig.links.email}`,
    },
    {
        icon: MapPin,
        label: "Address",
        value: siteConfig.links.address.full,
        href: `https://maps.google.com/?q=${encodeURIComponent(
            siteConfig.links.address.full
        )}`,
    },
    {
        icon: Clock,
        label: "Hours",
        value: siteConfig.hours.weekdays,
        subValues: [siteConfig.hours.saturday, siteConfig.hours.sunday],
    },
];

export function ContactPageContent() {
    const [submitStatus, setSubmitStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<ContactFormData>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormData) => {
        // Check honeypot
        if (data.honeypot) {
            return;
        }

        setSubmitStatus("loading");

        // Simulate form submission
        // In production, replace with actual API call
        try {
            await new Promise((resolve) => setTimeout(resolve, 1500));
            console.log("Form submitted:", data);
            setSubmitStatus("success");
            reset();
        } catch {
            setSubmitStatus("error");
        }
    };

    const inputClasses = cn(
        "w-full px-4 py-3 rounded-xl border transition-all duration-200",
        "bg-white text-[var(--color-neutral-900)]",
        "placeholder:text-[var(--color-neutral-400)]",
        "focus:outline-none focus:ring-2 focus:ring-[var(--color-primary-500)] focus:border-transparent"
    );

    const errorInputClasses = "border-red-500 focus:ring-red-500";

    return (
        <>
            {/* Hero Banner */}
            <section className="relative py-16 md:py-24 bg-gradient-to-br from-[var(--color-primary-50)] to-[var(--color-secondary-50)]">
                <div className="container">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="max-w-3xl mx-auto text-center"
                    >
                        <h1 className="mb-6">
                            <span className="gradient-text">Contact Us</span>
                        </h1>
                        <p className="text-lg md:text-xl text-[var(--color-neutral-600)]">
                            Ready to start your recovery journey? Get in touch with our team
                            to schedule an appointment or ask any questions.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <Section className="bg-white" animate={false}>
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            Send Us a Message
                        </h2>

                        {submitStatus === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-8 rounded-2xl bg-green-50 border border-green-200 text-center"
                            >
                                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-500" />
                                <h3 className="text-xl font-bold text-green-800 mb-2">
                                    Message Sent Successfully!
                                </h3>
                                <p className="text-green-700 mb-6">
                                    Thank you for reaching out. We&apos;ll get back to you within 24
                                    hours.
                                </p>
                                <Button
                                    variant="outline"
                                    onClick={() => setSubmitStatus("idle")}
                                >
                                    Send Another Message
                                </Button>
                            </motion.div>
                        ) : (
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                                {/* Honeypot field for spam protection */}
                                <input
                                    type="text"
                                    {...register("honeypot")}
                                    className="hidden"
                                    tabIndex={-1}
                                    autoComplete="off"
                                    aria-hidden="true"
                                />

                                {/* Name */}
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-[var(--color-neutral-700)] mb-2"
                                    >
                                        Full Name *
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        {...register("name")}
                                        className={cn(
                                            inputClasses,
                                            errors.name && errorInputClasses,
                                            "border-[var(--color-neutral-300)]"
                                        )}
                                        placeholder="John Doe"
                                        aria-invalid={errors.name ? "true" : "false"}
                                    />
                                    {errors.name && (
                                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-[var(--color-neutral-700)] mb-2"
                                    >
                                        Email Address *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        {...register("email")}
                                        className={cn(
                                            inputClasses,
                                            errors.email && errorInputClasses,
                                            "border-[var(--color-neutral-300)]"
                                        )}
                                        placeholder="john@example.com"
                                        aria-invalid={errors.email ? "true" : "false"}
                                    />
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Phone */}
                                <div>
                                    <label
                                        htmlFor="phone"
                                        className="block text-sm font-medium text-[var(--color-neutral-700)] mb-2"
                                    >
                                        Phone Number *
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        {...register("phone")}
                                        className={cn(
                                            inputClasses,
                                            errors.phone && errorInputClasses,
                                            "border-[var(--color-neutral-300)]"
                                        )}
                                        placeholder="(248) 555-0123"
                                        aria-invalid={errors.phone ? "true" : "false"}
                                    />
                                    {errors.phone && (
                                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.phone.message}
                                        </p>
                                    )}
                                </div>

                                {/* Message */}
                                <div>
                                    <label
                                        htmlFor="message"
                                        className="block text-sm font-medium text-[var(--color-neutral-700)] mb-2"
                                    >
                                        Message *
                                    </label>
                                    <textarea
                                        id="message"
                                        {...register("message")}
                                        rows={5}
                                        className={cn(
                                            inputClasses,
                                            errors.message && errorInputClasses,
                                            "border-[var(--color-neutral-300)] resize-none"
                                        )}
                                        placeholder="Tell us about your condition and how we can help..."
                                        aria-invalid={errors.message ? "true" : "false"}
                                    />
                                    {errors.message && (
                                        <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                            <AlertCircle className="w-4 h-4" />
                                            {errors.message.message}
                                        </p>
                                    )}
                                </div>

                                {/* Error State */}
                                {submitStatus === "error" && (
                                    <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
                                        <AlertCircle className="w-5 h-5 shrink-0" />
                                        <p>
                                            Something went wrong. Please try again or call us
                                            directly.
                                        </p>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="w-full"
                                    isLoading={submitStatus === "loading"}
                                    rightIcon={<Send className="w-5 h-5" />}
                                >
                                    Send Message
                                </Button>
                            </form>
                        )}
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-2xl md:text-3xl font-bold mb-6">
                            Get in Touch
                        </h2>

                        <div className="space-y-6 mb-8">
                            {contactInfo.map((item, index) => {
                                const Icon = item.icon;
                                const content = (
                                    <div className="flex items-start gap-4 p-4 rounded-xl hover:bg-[var(--color-neutral-50)] transition-colors">
                                        <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-[var(--color-primary-100)] shrink-0">
                                            <Icon className="w-6 h-6 text-[var(--color-primary-600)]" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-[var(--color-neutral-500)] mb-1">
                                                {item.label}
                                            </p>
                                            <p className="font-medium text-[var(--color-neutral-900)]">
                                                {item.value}
                                            </p>
                                            {item.subValues?.map((sub, idx) => (
                                                <p
                                                    key={idx}
                                                    className="text-sm text-[var(--color-neutral-600)]"
                                                >
                                                    {sub}
                                                </p>
                                            ))}
                                        </div>
                                    </div>
                                );

                                return item.href ? (
                                    <a
                                        key={index}
                                        href={item.href}
                                        target={item.label === "Address" ? "_blank" : undefined}
                                        rel={
                                            item.label === "Address"
                                                ? "noopener noreferrer"
                                                : undefined
                                        }
                                        className="block"
                                    >
                                        {content}
                                    </a>
                                ) : (
                                    <div key={index}>{content}</div>
                                );
                            })}
                        </div>

                        {/* Map Placeholder */}
                        <div className="rounded-2xl overflow-hidden border border-[var(--color-neutral-200)]">
                            <div className="aspect-video bg-[var(--color-neutral-100)] flex items-center justify-center">
                                <a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(
                                        siteConfig.links.address.full
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-3 text-[var(--color-neutral-500)] hover:text-[var(--color-primary-600)] transition-colors"
                                >
                                    <MapPin className="w-12 h-12" />
                                    <span className="font-medium">View on Google Maps</span>
                                </a>
                            </div>
                        </div>

                        {/* Service Area */}
                        <div className="mt-8 p-6 rounded-2xl bg-[var(--color-primary-50)]">
                            <h3 className="font-bold text-[var(--color-primary-800)] mb-2">
                                Service Area
                            </h3>
                            <p className="text-[var(--color-primary-700)]">
                                Proudly serving Livonia, Novi, Farmington, and all of Wayne &
                                Oakland County.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Section>
        </>
    );
}
