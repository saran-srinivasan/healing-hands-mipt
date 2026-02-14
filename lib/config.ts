// Site-wide configuration constants

export const siteConfig = {
    name: "Healing Hands Physical Therapy Associates LLC",
    shortName: "Healing Hands Physical Therapy Associates LLC",
    description:
        "Stop Hurting. Start Healing. Personalized, evidence-based physical therapy care for Livonia, Novi, Farmington and all of Wayne & Oakland County.",
    url: "https://healinghandsmipt.com",
    ogImage: "/og-image.jpg",
    links: {
        phone: "248 560 7994",
        tollFree: "877 999 5885",
        email: "info@healinghandsmipt.com",
        address: {
            street: "20319 Farmington Road, Suite A",
            city: "Livonia",
            state: "MI",
            zip: "48152",
            full: "20319 Farmington Road, Suite A, Livonia, MI 48152",
        },
        fax: "(248) 617-2026"
    },
    hours: {
        Monday: "Monday: 9:30 AM - 7:00 PM",
        Tuesday: "Tuesday: 7:30 AM - 1:00 PM",
        Wednesday: "Wednesday: 7:30 AM - 7:00 PM",
        Thursday: "Thursday: 7:30 AM - 7:00 PM",
        Friday: "Friday: 7:30 AM - 1:00 PM",
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
            id: "recover-rebuild-return",
            title: "Recover Rebuild Return.",
            tagline: "Recover. Rebuild. Return.",
            shortDescription:
                "Regain movement and strength after injury with personalized plans using advanced tools like MSK ultrasound and BFR training.",
            description:
                "Regain movement, strength, and confidence after injury or surgery with care designed just for you. Our personalized therapy plans help you move better and feel stronger, treating a wide range of conditions—from sprains and tendon issues to joint replacements and neurological conditions—for kids, adults, and seniors alike. We incorporate advanced tools such as musculoskeletal (MSK) ultrasound, surface EMG biofeedback, and Blood Flow Restriction (BFR) training to enhance recovery, improve muscle performance, and support faster, more effective outcomes.",
            keyBenefits: [
                "Personalized therapy plans for all ages",
                "Treatment for sprains, tendonitis, and joint replacements",
                "Musculoskeletal (MSK) ultrasound imaging",
                "Surface EMG biofeedback",
                "Blood Flow Restriction (BFR) training",
            ],
            icon: "Dumbbell",
        },
        {
            id: "neck-back-care",
            title: "Neck and Back Care",
            tagline: "Move freely, live fully.",
            shortDescription:
                "Advanced care for neck and back pain combining hands-on therapy and education for long-term relief.",
            description:
                "Advanced care for neck and back pain designed to help you move comfortably and confidently again. Our personalized treatment plans combine hands-on therapy, targeted exercises, and education to address the root cause of pain and support long-term relief.",
            keyBenefits: [
                "Root cause pain assessment",
                "Hands-on manual therapy",
                "Targeted therapeutic exercises",
                "Spinal stabilization techniques",
                "Patient education for long-term management",
            ],
            icon: "Spine",
        },
        {
            id: "pelvic-health",
            title: "Male Pelvic Health Care",
            tagline: "Confident movement starts at your core.",
            shortDescription:
                "Discreet, specialized therapy for men treating pelvic pain and bladder control using biofeedback and ultrasound.",
            description:
                "We provide discreet, specialized physical therapy for men experiencing pelvic pain or bladder control concerns. Our care combines hands-on manual therapy, internal pelvic floor trigger point management, and dry needling with advanced tools such as biofeedback, musculoskeletal ultrasound, and EMG to better understand muscle function, reduce pain, improve control, and help you return to daily life with confidence.",
            keyBenefits: [
                "Discreet, specialized male pelvic care",
                "Internal pelvic floor trigger point management",
                "Dry needling for muscle tension",
                "Biofeedback and EMG analysis",
                "Musculoskeletal ultrasound",
            ],
            icon: "Heart",
        },
        {
            id: "vestibular-rehab",
            title: "Vestibular Rehab",
            tagline: "Science-Driven Solutions for Dizziness and Balance",
            shortDescription:
                "Stop the spinning with targeted therapy for BPPV and balance disorders using the latest neuro-scientific research.",
            description: "Dizziness, vertigo, and imbalance don't just affect your movement—they affect your confidence. At Healing Hands Physical Therapy Associates LLC, our Advanced Vestibular Rehab program is designed to help you regain control. By integrating the latest neuro-scientific research with the personalized attention you've trusted for over 25 years, we provide targeted therapy for BPPV, vestibular neuritis, and balance disorders. Using evidence-based maneuvers and habituation exercises, we tailor every session to your specific symptoms. Our goal is simple: to stop the spinning and get you back on steady ground with the expert, compassionate care you deserve.",
            keyBenefits: [
                "Treatment for BPPV and vestibular neuritis",
                "Balance disorder rehabilitation",
                "Evidence-based habituation exercises",
                "Neuro-scientific research integration",
                "Fall prevention strategies",
            ],
            icon: "Dizzy", // Dizziness isn't a standard icon, mapped to Activity in component
        },
        {
            id: "cervicogenic-headaches",
            title: "Cervicogenic headaches",
            tagline: "From Neck Strain to Brain Strain—We Help You Find Relief.",
            shortDescription:
                "Treat the root cause of headaches originating from the neck with manual therapy and posture restoration.",
            description: "If your headaches feel like they are radiating from the base of your skull or are triggered by neck movement, you may be experiencing Cervicogenic Headaches. Unlike typical migraines, these headaches originate from issues in the cervical spine, requiring specialized physical therapy to achieve lasting relief. At Healing Hands Physical Therapy Associates LLC, we combine cutting-edge manual therapy research with a personalized approach to treat the root cause of your pain. Drawing on over 25 years of clinical excellence, we utilize advanced mobilization techniques, dry needling, targeted muscle re-education, posture restoration, ergonomics, and exercises tailor-made to your specific needs. We don't just mask the symptoms; we work to restore your neck's natural function, helping you leave the tension behind and get back to living life with clarity and comfort.",
            keyBenefits: [
                "Advanced cervical mobilization techniques",
                "Dry needling for headache relief",
                "Targeted muscle re-education",
                "Posture restoration and ergonomics",
                "Root cause treatment (not just symptom masking)",
            ],
            icon: "Zap",
        },
        {
            id: "tmj-disorders",
            title: "TMJ Disorders",
            tagline: "Science-Backed Solutions for Jaw and Facial Pain.",
            shortDescription:
                "Relieve jaw pain and clicking with comprehensive therapy including intra-oral techniques and dry needling.",
            description: "Relieve jaw pain, tension, and clicking with specialized TMJ physical therapy designed to restore comfortable movement and function. Our comprehensive approach integrates hands-on manual therapy, intra-oral techniques, dry needling, targeted exercise, and posture correction to address both jaw and neck contributors to symptoms. Each treatment plan is individualized to reduce pain, improve mobility, and support long-term relief—helping you return to eating, speaking, and daily activities with confidence.",
            keyBenefits: [
                "Intra-oral manual therapy techniques",
                "Jaw and neck posture correction",
                "Dry needling for facial pain",
                "Clicking and tension reduction",
                "Restoration of comfortable eating and speaking",
            ],
            icon: "Activity",
        },
        {
            id: "foot-ankle-care",
            title: "Exercise Smarter, Not Harder. Consistency Over Intensity",
            tagline: "Your Path to Safe, Consistent Fitness.",
            shortDescription:
                "A personalized wellness roadmap focusing on movement patterns, injury prevention, and long-term fitness adherence.",
            description: "An individualized wellness program that includes education, movement assessment, and progressive exercise planning to optimize training load, minimize injury risk, and enhance long-term adherence and functional outcomes. Drawing on over 25 years of clinical insight, we understand that wellness isn't a race; it's a lifestyle. Our program provides a tailor-made roadmap that fits into your actual life, focusing on movement patterns that keep you feeling strong and mobile without the risk of burnout or injury. Whether you are returning to activity or looking to maintain your independence, we provide the personal touch and science-backed guidance needed to build a routine you can actually keep.",
            keyBenefits: [
                "Comprehensive movement assessment",
                "Progressive exercise planning",
                "Training load optimization",
                "Injury risk minimization",
                "Long-term adherence strategies",
            ],
            icon: "Dumbbell",
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
            "The Same Heart That Built Alternative Rehab—Now Continuing 25 Years of Excellence as Healing Hands Physical Therapy Associates",
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
