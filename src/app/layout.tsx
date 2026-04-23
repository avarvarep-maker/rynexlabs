import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from "sonner";

const display = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["300", "400", "500", "600", "700", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rynexlabs.com"),
  title: {
    default: "RynexLabs — Web Design, Development & AI Automation",
    template: "%s | RynexLabs",
  },
  description:
    "RynexLabs builds high-quality websites and AI automation systems for businesses in Iași and beyond. Get online. Work less. Grow faster.",
  keywords: [
    "web design",
    "web development",
    "AI automation",
    "Iași",
    "Romania",
    "landing page",
    "business website",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rynexlabs.com",
    siteName: "RynexLabs",
    title: "RynexLabs — Web Design, Development & AI Automation",
    description:
      "We build websites and AI tools that make your business run better.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RynexLabs — Web Design & AI Automation",
    description: "Websites and AI automation for businesses that mean business.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col grain-overlay">
        <Navigation />
        <main className="flex-1">{children}</main>
        <Footer />
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "var(--brand-espresso)",
              color: "var(--brand-cream)",
              border: "1px solid rgba(255,255,255,0.1)",
            },
          }}
        />
      </body>
    </html>
  );
}
