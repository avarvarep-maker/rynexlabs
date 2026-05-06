"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";

const posts = [
  {
    slug: "why-your-business-needs-a-real-website",
    title: "Why your business needs a real website (and what a real website actually means)",
    excerpt:
      "A Facebook page is not a website. A Google listing is not a website. Here is what separates a digital presence that works from one that is just there.",
    category: "Business",
    readTime: "4 min",
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
    readTime: "6 min",
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
    readTime: "5 min",
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
    readTime: "7 min",
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
    readTime: "5 min",
    date: "February 2025",
    image: "https://images.unsplash.com/photo-1593720219276-0b1eacd0aef4?w=1600&auto=format&fit=crop&q=90",
    featured: false,
  },
];

const mono: React.CSSProperties = {
  fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
};

export default function BlogPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const featuredRef = useRef<HTMLAnchorElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    if (headingRef.current) tl.from(headingRef.current, { y: 40, opacity: 0, duration: 1.2 });
    if (featuredRef.current) tl.from(featuredRef.current, { y: 24, opacity: 0, duration: 0.8 }, "-=0.8");
    if (gridRef.current) {
      tl.from(Array.from(gridRef.current.children), { y: 20, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.5");
    }
    return () => { tl.kill(); };
  }, []);

  const featured = posts.find((p) => p.featured)!;
  const rest = posts.filter((p) => !p.featured);

  return (
    <main className="min-h-screen text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-16 lg:py-24">

        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <p className="text-xs opacity-50 mb-4 uppercase" style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}>
            BLOG
          </p>
          <h1
            ref={headingRef}
            className="text-5xl lg:text-7xl font-light leading-none"
            style={mono}
          >
            Useful stuff,<br />plainly written.
          </h1>
        </div>

        {/* Featured */}
        <Link
          ref={featuredRef}
          href={`/blog/${featured.slug}`}
          className="group block mb-16"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          <div className="grid lg:grid-cols-2 gap-0 pt-10 lg:pt-12">
            <div className="pr-0 lg:pr-12 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <span
                    className="text-xs uppercase"
                    style={{ ...mono, letterSpacing: "var(--tracking-sm)", color: "var(--accent)" }}
                  >
                    {featured.category}
                  </span>
                  <span className="text-xs opacity-30" style={mono}>{featured.readTime} read</span>
                  <span className="text-xs opacity-30" style={mono}>{featured.date}</span>
                </div>
                <h2
                  className="text-2xl lg:text-4xl font-light leading-tight mb-5 group-hover:opacity-70 transition-opacity duration-300"
                  style={mono}
                >
                  {featured.title}
                </h2>
                <p className="text-sm leading-relaxed max-w-lg" style={{ ...mono, color: "rgba(255,255,255,0.55)" }}>
                  {featured.excerpt}
                </p>
              </div>
              <div className="mt-8">
                <span
                  className="text-xs uppercase"
                  style={{ ...mono, letterSpacing: "var(--tracking-sm)", color: "var(--accent)" }}
                >
                  Read article →
                </span>
              </div>
            </div>

            <div
              className="relative w-full overflow-hidden mt-8 lg:mt-0"
              style={{ aspectRatio: "16/9" }}
            >
              <Image
                src={featured.image}
                alt={featured.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                style={{ opacity: 0.6, filter: "grayscale(15%)" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
              />
              <div
                className="absolute inset-0"
                style={{ background: "linear-gradient(135deg, rgba(0,255,135,0.05) 0%, transparent 60%)" }}
              />
            </div>
          </div>
        </Link>

        {/* Grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0"
          style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
        >
          {rest.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block py-10 pr-8"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.08)" }}
            >
              <div
                className="relative w-full overflow-hidden mb-5"
                style={{ aspectRatio: "3/2" }}
              >
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  style={{ opacity: 0.5, filter: "grayscale(25%)" }}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>

              <div className="flex items-center gap-3 mb-3">
                <span
                  className="text-xs uppercase"
                  style={{ ...mono, letterSpacing: "var(--tracking-xs)", color: "var(--accent)", fontSize: "10px" }}
                >
                  {post.category}
                </span>
                <span className="text-xs opacity-25" style={{ ...mono, fontSize: "10px" }}>{post.readTime}</span>
              </div>

              <h3
                className="text-base font-light leading-snug mb-3 group-hover:opacity-60 transition-opacity duration-300"
                style={mono}
              >
                {post.title}
              </h3>

              <p
                className="text-xs leading-relaxed line-clamp-2"
                style={{ ...mono, color: "rgba(255,255,255,0.4)" }}
              >
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>

        {/* Newsletter */}
        <div
          className="mt-20 pt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div>
            <p className="text-xs opacity-40 uppercase mb-4" style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}>
              NEWSLETTER
            </p>
            <p className="text-2xl lg:text-3xl font-light mb-2" style={mono}>
              One useful thing per month.
            </p>
            <p className="text-sm opacity-40" style={mono}>No fluff. Unsubscribe any time.</p>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              const el = (e.currentTarget.elements.namedItem("email") as HTMLInputElement);
              fetch("/api/subscribe", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: el.value }),
              });
              e.currentTarget.reset();
            }}
            className="flex gap-3 items-end"
          >
            <div>
              <label
                className="block text-xs uppercase mb-3 opacity-40"
                style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}
              >
                Your email
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="w-64 bg-transparent text-white text-sm pb-3 focus:outline-none placeholder:text-white/20 border-b border-white/15 focus:border-[var(--accent)] transition-colors duration-200"
                style={mono}
              />
            </div>
            <button type="submit" className="pill-btn pill-btn-accent mb-0.5">
              Subscribe →
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
