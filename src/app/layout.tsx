import type { Metadata } from "next";
import { Syne, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MobileCTA from "@/components/MobileCTA";

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rynexlabs.com"),
  title: {
    default: "Rynex Labs — AI Code Review for Development Teams",
    template: "%s | Rynex Labs",
  },
  description:
    "AI-powered code review that catches bugs, security vulnerabilities, and bad patterns before they reach production. Integrates with GitHub, GitLab, Bitbucket in 2 minutes.",
  keywords: [
    "AI code review",
    "automated code review",
    "pull request review",
    "security vulnerability scanner",
    "GitHub code review",
    "developer tools",
    "code quality",
  ],
  authors: [{ name: "Rynex Labs" }],
  creator: "Rynex Labs",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rynexlabs.com",
    siteName: "Rynex Labs",
    title: "Rynex Labs — AI Code Review for Development Teams",
    description:
      "AI reviews every pull request automatically. Catches what humans miss. Install in 2 minutes.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rynex Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rynex Labs — AI Code Review",
    description: "Catches security vulnerabilities your team misses. Every PR, automatically.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Rynex Labs",
  applicationCategory: "DeveloperApplication",
  operatingSystem: "Web",
  url: "https://rynexlabs.com",
  description:
    "AI-powered code review tool that catches bugs, security vulnerabilities, and bad patterns before production.",
  offers: [
    { "@type": "Offer", price: "0", priceCurrency: "USD", name: "Starter" },
    { "@type": "Offer", price: "49", priceCurrency: "USD", name: "Pro", billingPeriod: "P1M" },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.9",
    ratingCount: "2400",
    bestRating: "5",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <MobileCTA />
      </body>
    </html>
  );
}
