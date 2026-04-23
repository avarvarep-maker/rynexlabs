import type { Metadata } from "next";
import { Metadata as MetadataType } from "next";
import ServicesPage from "@/components/pages/ServicesPage";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Web design, development, AI automation, and SEO services for businesses in Iași and across Romania. Honest pricing, real results.",
};

export default function Services() {
  return <ServicesPage />;
}
