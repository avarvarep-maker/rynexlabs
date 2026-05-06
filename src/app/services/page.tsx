import type { Metadata } from "next";
import ServicesPage from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design, development, AI automation, and SEO services. Honest pricing, real results.",
};

export default function Services() {
  return <ServicesPage />;
}
