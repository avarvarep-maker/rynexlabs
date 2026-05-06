import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import Intro from "@/components/Intro";
import PageTransition from "@/components/PageTransition";
import ScrollReveal from "@/components/ScrollReveal";
import { Toaster } from "sonner";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  weight: ["400", "500", "600"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  variable: "--font-instrument",
  weight: ["400"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rynexlabs.ro"),
  title: {
    default: "Rynex Labs — Build. Automate. Get found.",
    template: "%s | Rynex Labs",
  },
  description:
    "We build websites that bring in clients and AI systems that handle the work you hate doing. Based in Iași, working worldwide.",
  keywords: [
    "web design Iași",
    "AI automation Romania",
    "website development Iași",
    "digital agency Romania",
    "web development",
    "AI automation",
    "SEO Romania",
  ],
  authors: [{ name: "Rynex Labs" }],
  creator: "Rynex Labs",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://rynexlabs.ro",
    siteName: "Rynex Labs",
    title: "Rynex Labs — Build. Automate. Get found.",
    description:
      "We build websites that bring in clients and AI systems that handle the work you hate doing.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rynex Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rynex Labs — Build. Automate. Get found.",
    description: "Websites that work. AI that saves time. Based in Iași.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rynex Labs",
  url: "https://rynexlabs.ro",
  description: "Web design, AI automation, and SEO studio based in Iași, Romania.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Iași",
    addressRegion: "Iași",
    addressCountry: "RO",
  },
  telephone: "0747202811",
  email: "hello@rynexlabs.ro",
  openingHours: "Mo-Su 08:00-20:00",
  areaServed: { "@type": "Country", name: "Romania" },
  serviceType: ["Web Design", "AI Automation", "SEO", "Brand Systems"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ro"
      className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <Intro />
        <PageTransition />
        <CustomCursor />
        <ScrollReveal />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
