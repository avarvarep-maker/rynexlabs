import type { Metadata } from "next";
import BlogPageClient from "@/components/pages/BlogPage";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Practical articles about web design, AI automation, and growing your business online. Written for business owners, not developers.",
};

export default function Blog() {
  return <BlogPageClient />;
}
