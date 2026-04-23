import type { Metadata } from "next";
import BookPageClient from "@/components/pages/BookPage";

export const metadata: Metadata = {
  title: "Book a Call",
  description:
    "Book a free 30-minute call with RynexLabs. No pitch. No pressure. Just a conversation about your project.",
};

export default function Book() {
  return <BookPageClient />;
}
