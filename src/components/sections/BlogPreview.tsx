"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Clock } from "@phosphor-icons/react";

const posts = [
  {
    slug: "why-your-business-needs-a-real-website",
    title: "Why your business needs a real website (and what a real website actually means)",
    excerpt:
      "A Facebook page is not a website. A Google listing is not a website. A website is something you own, control, and that works for you 24/7.",
    category: "Business",
    readTime: "4 min read",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=80",
  },
  {
    slug: "3-repetitive-tasks-ai-can-handle-today",
    title: "3 repetitive tasks in your business that AI can handle starting today",
    excerpt:
      "Most AI automation talk is abstract. Here are three concrete things — with specific tools — that most small businesses can automate this week.",
    category: "AI Automation",
    readTime: "6 min read",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=600&auto=format&fit=crop&q=80",
  },
  {
    slug: "how-much-should-a-website-cost",
    title: "How much should a website actually cost in Romania in 2025?",
    excerpt:
      "The honest breakdown — why prices vary so much, what you get at each level, and when it makes sense to spend more.",
    category: "Pricing",
    readTime: "5 min read",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&auto=format&fit=crop&q=80",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function BlogPreview() {
  return (
    <section className="section-padding bg-[var(--brand-espresso)]">
      <div className="container-wide px-4 md:px-8">
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10 md:mb-14">
            <div>
              <motion.p variants={fadeUp} className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-3">
                From the blog
              </motion.p>
              <motion.h2 variants={fadeUp} className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-[var(--brand-cream)]">
                Useful stuff, plainly written.
              </motion.h2>
            </div>
            <motion.div variants={fadeUp}>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 font-body text-sm font-medium text-[var(--brand-amber)] hover:text-white transition-colors group"
              >
                All articles
                <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
              </Link>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {posts.map((post, i) => (
              <motion.div key={post.slug} variants={fadeUp} transition={{ delay: i * 0.07 }}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-[var(--brand-amber)]/30 transition-all duration-300 h-full"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 400px"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-body text-[10px] uppercase tracking-widest text-[var(--brand-amber)]">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 font-body text-[10px] text-white/40">
                        <Clock size={11} weight="regular" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-semibold text-[var(--brand-cream)] leading-snug mb-3 group-hover:text-[var(--brand-amber)] transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-body text-xs text-white/40 leading-relaxed line-clamp-2">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
