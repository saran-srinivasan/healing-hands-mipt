// Site-wide configuration constants

export const siteConfig = {
    name: "Healing Hands Physical Therapy",
    shortName: "Healing Hands PT",
    description:
        "Stop Hurting. Start Healing. Personalized, evidence-based physical therapy care for Livonia, Novi, Farmington and all of Wayne & Oakland County.",
    url: "https://healinghandsmipt.com",
    ogImage: "/og-image.jpg",
    links: {
        phone: "(248) 555-0123",
        email: "info@healinghandsmipt.com",
        address: {
            street: "12345 Middlebelt Road",
            city: "Livonia",
            state: "MI",
            zip: "48154",
            full: "12345 Middlebelt Road, Livonia, MI 48154",
        },
    },
    hours: {
        weekdays: "Monday - Friday: 8:00 AM - 6:00 PM",
        saturday: "Saturday: By Appointment",
        sunday: "Sunday: Closed",
    },
    social: {
        facebook: "https://facebook.com/healinghandspt",
        instagram: "https://instagram.com/healinghandspt",
        linkedin: "https://linkedin.com/company/healinghandspt",
    },
    navigation: [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ],
    services: [
        {
            id: "orthopedic-sports",
            title: "Orthopedic & Sports Rehabilitation",
            tagline: "Recover. Rebuild. Return.",
            description:
                "Restore mobility and strength after injury or surgery with customized programs for sprains, strains, tendonitis, and joint replacements. Ideal for athletes and active individuals looking to return to peak performance.",
            icon: "Dumbbell",
        },
        {
            id: "spine-extremity",
            title: "Spine & Extremity Care",
            tagline: "Move freely, live fully.",
            description:
                "Specialized care for the neck, mid-back, and low back, along with shoulder, hip, knee, and ankle issues. Includes spinal stabilization, manual therapy, and posture correction.",
            icon: "Spine",
        },
        {
            id: "pelvic-health",
            title: "Pelvic Health & Core Rehabilitation",
            tagline: "Confident movement starts at your core.",
            description:
                "Targeted therapy for male pelvic pain and dysfunction, pelvic floor coordination, and core stabilization. Focus on posture, breathing, and functional strength for long-term comfort and control.",
            icon: "Heart",
        },
        {
            id: "wellness-performance",
            title: "Wellness & Performance Programs",
            tagline: "Beyond recovery — stay active for life.",
            description:
                "Optimize your movement and prevent re-injury through core and postural training, functional movement screening, balance and fall prevention, ergonomic assessments, and personalized home exercise and wellness plans.",
            icon: "Activity",
        },
        {
            id: "specialized-treatments",
            title: "Specialized Treatments",
            tagline: "Advanced techniques for faster recovery.",
            description:
                "Dry Needling to relieve muscle tension and trigger point pain. Vestibular Rehab to treat dizziness, vertigo, and imbalance. Blood Flow Restriction (BFR) Training for safe strength building. IASTM & Cupping to enhance tissue mobility. Joint Manipulation & Mobilization to restore motion and reduce pain.",
            icon: "Zap",
        },
    ],
    companyInfo: {
        tagline: "Stop Hurting. Start Healing.",
        fullName: "Healing Hands Physical Therapy Associates LLC",
        credentials: "Board Certified Specialists",
        experience: "70+ years of combined clinical experience",
        approach:
            "Evidence-based biopsychosocial approach that consistently delivers faster, superior functional outcomes compared to state and national benchmarks.",
        mission:
            "We are committed to providing exceptional, high-level care that helps you move better, recover faster, and return to the life you love.",
        history:
            "Experience the same exceptional quality and comprehensive rehabilitation services provided by us at Alternative Rehab in Livonia for over 25 years.",
        specializations: [
            "One-on-one evaluation and personalized treatment",
            "Board-certified, fellowship-trained orthopedic physical therapists",
            "Cervicogenic headaches",
            "TMJ disorders",
            "Chronic postural and pain syndromes",
            "Male pelvic pain",
            "Vestibular rehabilitation",
            "Dry needling",
        ],
    },
} as const;

export type SiteConfig = typeof siteConfig;
