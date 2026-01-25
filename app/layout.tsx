import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Personalized Physical Therapy in Livonia, MI`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "physical therapy",
    "Livonia",
    "Novi",
    "Farmington",
    "Wayne County",
    "Oakland County",
    "orthopedic rehabilitation",
    "sports rehabilitation",
    "pelvic health",
    "dry needling",
    "vestibular rehab",
    "Michigan physical therapy",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0d9488" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Structured Data - Local Business */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "PhysicalTherapy",
              name: siteConfig.name,
              description: siteConfig.description,
              url: siteConfig.url,
              telephone: siteConfig.links.phone,
              email: siteConfig.links.email,
              address: {
                "@type": "PostalAddress",
                streetAddress: siteConfig.links.address.street,
                addressLocality: siteConfig.links.address.city,
                addressRegion: siteConfig.links.address.state,
                postalCode: siteConfig.links.address.zip,
                addressCountry: "US",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 42.4225,
                longitude: -83.3733,
              },
              openingHoursSpecification: [
                {
                  "@type": "OpeningHoursSpecification",
                  dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                  opens: "08:00",
                  closes: "18:00",
                },
              ],
              sameAs: [
                siteConfig.social.facebook,
                siteConfig.social.instagram,
                siteConfig.social.linkedin,
              ],
              priceRange: "$$",
              areaServed: [
                { "@type": "City", name: "Livonia" },
                { "@type": "City", name: "Novi" },
                { "@type": "City", name: "Farmington" },
                { "@type": "AdministrativeArea", name: "Wayne County" },
                { "@type": "AdministrativeArea", name: "Oakland County" },
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        {/* Skip Link for Accessibility */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <Navbar />

        <main id="main-content" className="flex-grow pt-16 md:pt-20">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
