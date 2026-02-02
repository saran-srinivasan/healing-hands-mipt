"use client";

import React from "react";
import { motion } from "framer-motion";
import { Section, SectionHeading } from "@/components/ui/Section";
import { cn } from "@/lib/utils";
import { Award, GraduationCap, BookOpen, Users } from "lucide-react";
import Image from "next/image";
import DrRaghu from "@/public/images/Dr_Raghu_Chovvath.jpg";
import DrRamesh from "@/public/images/Dr_Ramesh_Malladi.jpg";
import { StaticImageData } from "next/image";

interface TeamMember {
    name: string;
    credentials: string;
    role: string;
    bio: string[];
    highlights: string[];
    image: StaticImageData;
}

const teamMembers: TeamMember[] = [
    {
        name: "Dr. Raghu Chovvath",
        credentials: "PT, DPT, OCS, FAAOMPT, AVPT, Cert D.N",
        role: "Founder & Clinical Director",
        bio: [
            "Dr. Raghu Chovvath graduated from the College of Physiotherapy in Chennai, India, in 1988. He began his career by establishing and leading the physical therapy services at a major hospital, where he also taught entry-level physiotherapy students for seven years.",
            "After relocating to the United States, Dr. Chovvath initially practiced in geriatrics before developing a deep interest in orthopedic and manual therapy. He pursued extensive post-graduate training, became Board-Certified in Orthopedic Physical Therapy, and completed the Orthopedic Physical Therapy Residency Program at the Institute of Manual Physical Therapy. He later earned his Doctor of Physical Therapy (DPT) degree from A.T. Still University in Arizona.",
            "Dr. Chovvath is a Fellow of the American Academy of Orthopaedic Manual Physical Therapists (AAOMPT), completing his fellowship training through Regis University in Denver, Colorado. He is also certified in dry needling for musculoskeletal disorders and an Advanced Vestibular Therapist, trained through the University of Pittsburgh.",
        ],
        highlights: [
            "Board-Certified Orthopedic Clinical Specialist (OCS)",
            "Fellow of AAOMPT (Regis University)",
            "Advanced Vestibular Therapist (University of Pittsburgh)",
            "Certified in Dry Needling",
            "Clinical Instructor at Wayne State University",
            "Visiting Faculty at Sri Ramachandra Institute, Chennai",
        ],
        image: DrRaghu,
    },
    {
        name: "Dr. Ramesh Malladi",
        credentials: "PT, DPT, OCS, FAAOMPT",
        role: "Lead Physical Therapist",
        bio: [
            "Dr. Ramesh Malladi delivers the highest caliber of care in orthopedic manual physical therapy right here in Wayne and Oakland County. As a Board-Certified Orthopedic Clinical Specialist (OCS) and a distinguished Fellow of the American Academy of Orthopaedic Manual Physical Therapists (FAAOMPT), Dr. Malladi has achieved the most advanced clinical credentials available, assuring patients they are receiving elite, evidence-based treatment.",
            "Dr. Malladi is highly sought after for his combination of clinical mastery and specialized techniques. He is expertly trained in cutting-edge methods like Dry Needling for rapid relief of chronic muscle pain, specialized Vestibular Rehabilitation to resolve dizziness and balance issues, and focused care for sensitive Male Pelvic Pain issues.",
            "Beyond the clinic and classroom, Dr. Malladi is dedicated to academic excellence, with his orthopedic research published in peer-reviewed scientific journals. He also shares his knowledge by teaching spinal manipulation nationally and internationally. This deep commitment to teaching, clinical research, and a diverse background guarantees that every patient receives a comprehensive, holistic, and truly expert treatment plan tailored to their specific needs.",
        ],
        highlights: [
            "Board-Certified Orthopedic Clinical Specialist (OCS)",
            "Fellow of AAOMPT",
            "Dry Needling Specialist",
            "Vestibular Rehabilitation Expert",
            "Male Pelvic Pain Specialist",
            "Clinical Instructor at Wayne State University",
            "Published Researcher & International Educator",
        ],
        image: DrRamesh,
    },
];

function TeamMemberCard({
    member,
    index,
}: {
    member: TeamMember;
    index: number;
}) {
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            className={cn(
                "grid lg:grid-cols-5 gap-8 items-start",
                !isEven && "lg:direction-rtl"
            )}
        >
            {/* Avatar / Placeholder */}
            <div
                className={cn(
                    "lg:col-span-2",
                    !isEven && "lg:order-2"
                )}
            >
                <div className="relative aspect-[4/5] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-gradient-to-br from-[var(--color-primary-100)] to-[var(--color-secondary-100)]">
                    {/* Professional Avatar Illustration */}
                    <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                    />
                    {/* Credential Badge */}
                    <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg text-center">
                        <p className="font-bold text-[var(--color-neutral-900)] text-sm">
                            {member.credentials}
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div
                className={cn(
                    "lg:col-span-3 space-y-6",
                    !isEven && "lg:order-1"
                )}
            >
                <div>
                    {/* <span className="inline-block px-3 py-1 mb-3 text-xs font-semibold text-[var(--color-primary-700)] bg-[var(--color-primary-100)] rounded-full">
                        {member.role}
                    </span> */}
                    <h3 className="text-2xl md:text-3xl font-bold text-[var(--color-neutral-900)]">
                        {member.name}
                    </h3>
                </div>

                {/* Bio */}
                <div className="space-y-4 text-[var(--color-neutral-600)] leading-relaxed">
                    {member.bio.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                    ))}
                </div>

                {/* Highlights */}
                <div className="p-5 bg-[var(--color-neutral-50)] rounded-xl">
                    <h4 className="font-semibold text-[var(--color-neutral-800)] mb-3 flex items-center gap-2">
                        <Award className="w-5 h-5 text-[var(--color-primary-600)]" />
                        Credentials & Expertise
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-2">
                        {member.highlights.map((highlight, idx) => (
                            <li
                                key={idx}
                                className="flex items-start gap-2 text-sm text-[var(--color-neutral-700)]"
                            >
                                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-[var(--color-primary-500)] shrink-0" />
                                {highlight}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </motion.div>
    );
}

export function TeamSection() {
    return (
        <Section className="bg-white" id="team">
            <SectionHeading
                title="Meet Our Expert Team"
                subtitle="Board-certified specialists with decades of experience dedicated to your recovery"
            />

            <div className="space-y-16 md:space-y-24">
                {teamMembers.map((member, index) => (
                    <TeamMemberCard key={member.name} member={member} index={index} />
                ))}
            </div>

            {/* Team Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                {[
                    { icon: Award, label: "Board Certifications", value: "Multiple OCS" },
                    { icon: GraduationCap, label: "Combined Experience", value: "70+ Years" },
                    { icon: BookOpen, label: "Published Research", value: "Peer-Reviewed" },
                    { icon: Users, label: "Students Mentored", value: "100+" },
                ].map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={index}
                            className="text-center p-6 rounded-xl bg-[var(--color-primary-50)]"
                        >
                            <Icon className="w-8 h-8 mx-auto mb-3 text-[var(--color-primary-600)]" />
                            <p className="text-xl font-bold text-[var(--color-primary-700)]">
                                {stat.value}
                            </p>
                            <p className="text-sm text-[var(--color-neutral-600)]">
                                {stat.label}
                            </p>
                        </div>
                    );
                })}
            </motion.div>
        </Section>
    );
}
