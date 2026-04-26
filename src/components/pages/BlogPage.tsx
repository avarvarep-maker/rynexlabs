"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "@phosphor-icons/react";

const posts = [
  {
    slug: "why-your-business-needs-a-real-website",
    title: "Why your business needs a real website (and what a real website actually means)",
    excerpt:
      "A Facebook page is not a website. A Google listing is not a website. Here is what separates a digital presence that works from one that is just there.",
    category: "Business",
    readTime: "4 min read",
    date: "April 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1600&auto=format&fit=crop&q=90",
    featured: true,
  },
  {
    slug: "3-repetitive-tasks-ai-can-handle-today",
    title: "3 repetitive tasks in your business that AI can handle starting today",
    excerpt:
      "Most AI automation talk is abstract. Here are three concrete things — with specific tools — that most small businesses can automate this week.",
    category: "AI Automation",
    readTime: "6 min read",
    date: "March 2025",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&auto=format&fit=crop&q=90",
    featured: false,
  },
  {
    slug: "how-much-should-a-website-cost",
    title: "How much should a website actually cost in Romania in 2025?",
    excerpt:
      "The honest breakdown — why prices vary so much, what you get at each level, and when it makes sense to spend more.",
    category: "Pricing",
    readTime: "5 min read",
    date: "March 2025",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&auto=format&fit=crop&q=90",
    featured: false,
  },
  {
    slug: "local-seo-guide-iasi",
    title: "Local SEO for businesses in Iași: what actually moves the needle",
    excerpt:
      "Google Maps rankings, local search, and getting found by people in your city. A practical guide with no SEO jargon.",
    category: "SEO",
    readTime: "7 min read",
    date: "February 2025",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?w=1600&auto=format&fit=crop&q=90",
    featured: false,
  },
  {
    slug: "why-wordpress-might-be-wrong-for-you",
    title: "Why WordPress might be wrong for your business (and what to use instead)",
    excerpt:
      "WordPress powers 40% of the web, which also means it is the most hacked platform on the web. There are better options depending on what you need.",
    category: "Technology",
    readTime: "5 min read",
    date: "February 2025",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=1600&auto=format&fit=crop&q=90",
    featured: false,
  },
];

const categories = ["All", "Business", "AI Automation", "SEO", "Pricing", "Technology"];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function BlogPage() {
  const featured = posts.find((p) => p.featured);
  const rest = posts.filter((p) => !p.featured);

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-wide px-4 md:px-8">
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={fadeUp} className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-4">
              From the blog
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--brand-espresso)] mb-4">
              Useful stuff,<br className="hidden sm:block" /> plainly written.
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-base text-[var(--brand-warm-brown)] max-w-xl">
              Practical articles about web design, AI automation, and online growth. Written for business owners, not developers.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="pb-10 md:pb-14">
          <div className="container-wide px-4 md:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <Link
                href={`/blog/${featured.slug}`}
                className="group grid grid-cols-1 lg:grid-cols-2 gap-0 bg-[var(--brand-surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--brand-amber)]/40 transition-all duration-300"
              >
                <div className="relative aspect-[16/9] lg:aspect-auto lg:min-h-[340px]">
                  <Image
                    src={featured.image}
                    alt={featured.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                </div>
                <div className="p-7 md:p-10 flex flex-col justify-center">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-body text-[10px] uppercase tracking-widest text-[var(--brand-amber)] bg-[var(--brand-amber)]/10 px-3 py-1 rounded-full">
                      {featured.category}
                    </span>
                    <span className="flex items-center gap-1 font-body text-xs text-[var(--brand-warm-brown)]">
                      <Clock size={12} weight="regular" />
                      {featured.readTime}
                    </span>
                  </div>
                  <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--brand-espresso)] mb-3 group-hover:text-[var(--brand-amber)] transition-colors leading-snug">
                    {featured.title}
                  </h2>
                  <p className="font-body text-sm text-[var(--brand-warm-brown)] leading-relaxed mb-6">
                    {featured.excerpt}
                  </p>
                  <div className="flex items-center gap-2 font-body text-sm font-medium text-[var(--brand-amber)]">
                    Read article
                    <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Link>
            </motion.div>
          </div>
        </section>
      )}

      {/* All posts */}
      <section className="pb-20 md:pb-32">
        <div className="container-wide px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {rest.map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group block bg-[var(--brand-surface)] border border-[var(--border)] rounded-2xl overflow-hidden hover:border-[var(--brand-amber)]/40 transition-all duration-300 h-full"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-5 md:p-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="font-body text-[10px] uppercase tracking-widest text-[var(--brand-amber)]">
                        {post.category}
                      </span>
                      <span className="flex items-center gap-1 font-body text-[10px] text-[var(--brand-warm-brown)]">
                        <Clock size={11} weight="regular" />
                        {post.readTime}
                      </span>
                    </div>
                    <h3 className="font-display text-base font-semibold text-[var(--brand-espresso)] mb-2 group-hover:text-[var(--brand-amber)] transition-colors leading-snug">
                      {post.title}
                    </h3>
                    <p className="font-body text-xs text-[var(--brand-warm-brown)] leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 bg-[var(--brand-espresso)] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-2">
                Newsletter
              </p>
              <h2 className="font-display text-xl md:text-2xl font-bold text-[var(--brand-cream)] mb-1">
                One useful thing per month.
              </h2>
              <p className="font-body text-sm text-white/50">
                No fluff. Unsubscribe any time.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const email = (form.elements.namedItem("email") as HTMLInputElement).value;
                fetch("/api/subscribe", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email }),
                });
                form.reset();
              }}
              className="flex gap-2 w-full md:w-auto"
            >
              <input
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="flex-1 md:w-64 font-body text-sm bg-white/10 border border-white/15 rounded-full px-5 py-3 text-white placeholder:text-white/40 focus:outline-none focus:border-[var(--brand-amber)] transition-colors min-h-[44px]"
              />
              <button
                type="submit"
                className="bg-[var(--brand-amber)] text-white font-body font-semibold px-6 py-3 rounded-full hover:bg-opacity-90 transition-colors min-h-[44px] shrink-0"
              >
                Subscribe
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </>
  );
}
