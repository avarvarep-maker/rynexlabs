import type { Metadata } from "next";
import { DM_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import { Toaster } from "sonner";
import ClientBackground from "@/components/ClientBackground";

const dmMono = DM_Mono({
  subsets: ["latin"],
  variable: "--font-dm-mono",
  weight: ["300", "400", "500"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rynexlabs.com"),
  title: {
    default: "Rynex Labs — Websites & AI Automation",
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
    url: "https://rynexlabs.com",
    siteName: "Rynex Labs",
    title: "Rynex Labs — Websites & AI Automation",
    description:
      "We build websites that bring in clients and AI systems that handle the work you hate doing.",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Rynex Labs" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rynex Labs — Websites & AI Automation",
    description: "Websites that work. AI that saves time. Based in Iași.",
    images: ["/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Rynex Labs",
  url: "https://rynexlabs.com",
  description: "Web design, AI automation, and SEO agency based in Iași, Romania.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Iași",
    addressRegion: "Iași",
    addressCountry: "RO",
  },
  telephone: "0747202811",
  email: "avarvarep@gmail.com",
  openingHours: "Mo-Su 08:00-20:00",
  areaServed: { "@type": "Country", name: "Romania" },
  serviceType: ["Web Design", "AI Automation", "SEO"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ro" className={dmMono.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ClientBackground />
        <CustomCursor />
        <Navbar />
        <main className="page-layer">{children}</main>
        <Footer />
        <Toaster theme="dark" position="bottom-right" />
      </body>
    </html>
  );
}
