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
    Printer,
    Headset,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { sendGeneralInquiry } from "@/app/actions/contact-general";

// General-inquiries-only validation schema
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
    subject: z
        .string()
        .min(2, "Please add a short subject")
        .max(120, "Subject is too long"),
    message: z
        .string()
        .min(5, "Message must be at least 5 characters")
        .max(1000, "Message is too long"),
    noMedicalInfoAck: z.boolean().refine((val) => val === true, {
        message:
            "Please confirm you will not include medical information in this form.",
    }),
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
        icon: Headset,
        label: "Toll Free",
        value: siteConfig.links.tollFree,
        href: `tel:${siteConfig.links.tollFree.replace(/[^0-9]/g, "")}`,
    },
    {
        icon: Printer,
        label: "Fax",
        value: siteConfig.links.fax,
        href: `tel:${siteConfig.links.fax.replace(/[^0-9]/g, "")}`,
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
        subValues: [
            siteConfig.hours.Monday,
            siteConfig.hours.Tuesday,
            siteConfig.hours.Wednesday,
            siteConfig.hours.Thursday,
            siteConfig.hours.Friday,
        ],
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
        defaultValues: {
            noMedicalInfoAck: false,
        },
    });

    const onSubmit = async (data: ContactFormData) => {
        // Honeypot spam protection
        if (data.honeypot) return;

        setSubmitStatus("loading");

        try {
            const formData = new FormData();
            formData.set("name", data.name);
            formData.set("email", data.email);
            formData.set("phone", data.phone);
            formData.set("subject", data.subject);
            formData.set("message", data.message);
            formData.set("honeypot", data.honeypot ?? "");

            // Checkbox: Server Action expects "on" or "true" (we handle both)
            if (data.noMedicalInfoAck) formData.set("noMedicalInfoAck", "on");

            const res = await sendGeneralInquiry(null, formData);

            if (!res?.success) {
                setSubmitStatus("error");
                return;
            }

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
                            Questions about our location, hours, services, or billing? Send a
                            general inquiry and our team will respond soon.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Content */}
            <Section className="bg-white py-8 md:py-10" animate={false}>
                <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-start">
                    {/* Contact Form */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Contact Us</h2>

                        {submitStatus === "success" ? (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="p-5 md:p-6 rounded-2xl bg-green-50 border border-green-200 text-center"
                            >
                                <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-500" />
                                <h3 className="text-lg font-bold text-green-800 mb-1">
                                    Message Sent Successfully!
                                </h3>
                                <p className="text-green-700 mb-4 text-sm">
                                    Thank you for reaching out. We&apos;ll get back to you as soon as possible.
                                </p>
                                <Button variant="outline" onClick={() => setSubmitStatus("idle")}>
                                    Send Another Message
                                </Button>
                            </motion.div>
                        ) : (
                            <>
                                {/* General inquiries notice (compact) */}
                                <div className="mb-4 p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-sm">
                                    <p className="font-semibold">General inquiries only.</p>
                                    <p className="mt-1">
                                        Please do not include medical details, insurance/member IDs, or SSNs.
                                        For appointments or urgent concerns, please call.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                    {/* Honeypot field for spam protection */}
                                    <input
                                        type="text"
                                        {...register("honeypot")}
                                        className="hidden"
                                        tabIndex={-1}
                                        autoComplete="off"
                                        aria-hidden="true"
                                    />

                                    {/* 2-col grid for compactness */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        {/* Name */}
                                        <div>
                                            <label
                                                htmlFor="name"
                                                className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1"
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
                                                className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1"
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
                                                className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1"
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

                                        {/* Subject */}
                                        <div>
                                            <label
                                                htmlFor="subject"
                                                className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1"
                                            >
                                                Subject *
                                            </label>
                                            <input
                                                type="text"
                                                id="subject"
                                                {...register("subject")}
                                                className={cn(
                                                    inputClasses,
                                                    errors.subject && errorInputClasses,
                                                    "border-[var(--color-neutral-300)]"
                                                )}
                                                placeholder="Hours, Location, Billing..."
                                                aria-invalid={errors.subject ? "true" : "false"}
                                            />
                                            {errors.subject && (
                                                <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                                    <AlertCircle className="w-4 h-4" />
                                                    {errors.subject.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label
                                            htmlFor="message"
                                            className="block text-sm font-medium text-[var(--color-neutral-700)] mb-1"
                                        >
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            {...register("message")}
                                            rows={4}
                                            className={cn(
                                                inputClasses,
                                                errors.message && errorInputClasses,
                                                "border-[var(--color-neutral-300)] resize-none"
                                            )}
                                            placeholder="Your question (general inquiries only—no medical details)."
                                            aria-invalid={errors.message ? "true" : "false"}
                                        />
                                        {errors.message && (
                                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.message.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Acknowledgement */}
                                    <div>
                                        <div className="flex items-start gap-3">
                                            <input
                                                id="noMedicalInfoAck"
                                                type="checkbox"
                                                {...register("noMedicalInfoAck")}
                                                className="mt-1"
                                            />
                                            <label
                                                htmlFor="noMedicalInfoAck"
                                                className="text-sm text-[var(--color-neutral-700)]"
                                            >
                                                I understand this form is for general inquiries only and I will not include
                                                medical information.
                                            </label>
                                        </div>
                                        {errors.noMedicalInfoAck && (
                                            <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                                                <AlertCircle className="w-4 h-4" />
                                                {errors.noMedicalInfoAck.message}
                                            </p>
                                        )}
                                    </div>

                                    {/* Error State */}
                                    {submitStatus === "error" && (
                                        <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 flex items-center gap-3">
                                            <AlertCircle className="w-5 h-5 shrink-0" />
                                            <p className="text-sm">
                                                Something went wrong. Please try again or call us directly.
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
                            </>
                        )}
                    </motion.div>

                    {/* Contact Info (sticky on desktop; no internal scrolling) */}
                    <motion.div
                        className="lg:sticky lg:top-24"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <h2 className="text-xl md:text-2xl font-bold mb-4">Get in Touch</h2>

                        <div className="space-y-3 mb-4">
                            {contactInfo.map((item, index) => {
                                const Icon = item.icon;

                                const content = (
                                    <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-[var(--color-neutral-50)] transition-colors">
                                        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[var(--color-primary-100)] shrink-0">
                                            <Icon className="w-5 h-5 text-[var(--color-primary-600)]" />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-xs font-medium text-[var(--color-neutral-500)] mb-0.5">
                                                {item.label}
                                            </p>
                                            <p className="font-medium text-[var(--color-neutral-900)] text-sm break-words">
                                                {item.value}
                                            </p>
                                            {item.subValues?.map((sub, idx) => (
                                                <p key={idx} className="text-xs text-[var(--color-neutral-600)]">
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
                                        rel={item.label === "Address" ? "noopener noreferrer" : undefined}
                                        className="block"
                                    >
                                        {content}
                                    </a>
                                ) : (
                                    <div key={index}>{content}</div>
                                );
                            })}
                        </div>

                        {/* Map (shorter) */}
                        <div className="rounded-2xl overflow-hidden border border-[var(--color-neutral-200)]">
                            <div className="aspect-[16/7] bg-[var(--color-neutral-100)] flex items-center justify-center">
                                <a
                                    href={`https://maps.google.com/?q=${encodeURIComponent(
                                        siteConfig.links.address.full
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center gap-2 text-[var(--color-neutral-500)] hover:text-[var(--color-primary-600)] transition-colors"
                                >
                                    <MapPin className="w-10 h-10" />
                                    <span className="font-medium text-sm">View on Google Maps</span>
                                </a>
                            </div>
                        </div>

                        {/* Service Area (compact) */}
                        <div className="mt-4 p-4 rounded-2xl bg-[var(--color-primary-50)]">
                            <h3 className="font-bold text-[var(--color-primary-800)] mb-1">
                                Service Area
                            </h3>
                            <p className="text-[var(--color-primary-700)] text-sm">
                                Proudly serving Livonia, Novi, Farmington, and all of Wayne & Oakland County.
                            </p>
                        </div>
                    </motion.div>
                </div>
            </Section>


        </>
    );
}
