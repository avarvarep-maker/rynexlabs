import type { Metadata } from "next";
import ContactPageClient from "@/components/pages/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with RynexLabs. We reply within 24 hours on business days.",
};

export default function Contact() {
  return <ContactPageClient />;
}
