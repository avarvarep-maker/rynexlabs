import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Clock } from "@phosphor-icons/react/dist/ssr";
import ContactCTA from "@/components/sections/ContactCTA";

const posts: Record<string, {
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  image: string;
  content: string;
}> = {
  "why-your-business-needs-a-real-website": {
    title: "Why your business needs a real website (and what a real website actually means)",
    excerpt: "A Facebook page is not a website. A Google listing is not a website. Here is what separates a digital presence that works from one that is just there.",
    category: "Business",
    readTime: "4 min read",
    date: "April 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80",
    content: `
A lot of business owners tell us they have "an online presence." They have a Facebook page. Maybe a Google Business profile. Sometimes a page on a directory site from 2018.

That is not an online presence. That is renting space on someone else's platform, where you have no control, where you can be suspended without warning, and where you are competing for attention with ads for your competitors.

**What a real website actually gives you**

Ownership. A website on your own domain is yours. Google cannot deactivate it. Meta cannot reduce your reach to 3% of your followers. It does not disappear when a platform shuts down.

Credibility. A professional website is still, in 2025, a trust signal. Research consistently shows people trust businesses with their own website more than those without. That is not changing.

A 24/7 salesperson. Your website works while you sleep. It answers questions, shows your work, collects leads, and does the first job of selling — before a human ever gets involved.

Data. You own your analytics. You know who visits, what they look at, where they come from, and what they do. On a Facebook page, Meta owns all of that.

**What makes a website actually work**

Speed. More than half of users abandon a site that takes longer than 3 seconds to load. A slow website is an invisible website.

Mobile design. Not "mobile-friendly" — mobile-designed. Two-thirds of web traffic is on phones. If your site is hard to use on a phone, you're losing most of your potential clients before they even read a sentence.

Clear purpose. Every good website knows one thing it is trying to make visitors do. One. Not five things, not "just browse around." The whole site points at that one action.

SEO foundations. Being findable on Google for searches your customers actually make. This is not optional.

**What to do next**

If you do not have a website: start here. It is the most important investment you can make in your online presence.

If you have a website that is not working: it might be a design problem, a speed problem, an SEO problem, or all three. We do free audits — just get in touch and we'll tell you what we see.
    `,
  },
  "3-repetitive-tasks-ai-can-handle-today": {
    title: "3 repetitive tasks in your business that AI can handle starting today",
    excerpt: "Most AI automation talk is abstract. Here are three concrete things — with specific tools — that most small businesses can automate this week.",
    category: "AI Automation",
    readTime: "6 min read",
    date: "March 2025",
    image: "https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&auto=format&fit=crop&q=80",
    content: `
AI automation sounds complicated. And most articles about it are full of buzzwords and hypothetical scenarios that have nothing to do with running an actual business.

Here are three specific, practical things most small businesses can automate this week — with the tools to do it.

**1. Lead follow-up emails**

When someone fills out your contact form, they want a response fast. Research shows response within 5 minutes is eight times more likely to result in a meeting than responding after 30 minutes.

Most business owners respond within hours or days. That gap costs clients.

What to build: an automation that triggers the moment a form is submitted, sends a personalised email acknowledging their inquiry, sets expectations for when they'll hear from you, and notifies you immediately on your phone.

Tools: Make.com (free up to 1000 operations/month) + your existing email. Setup time: 2-3 hours.

**2. Appointment reminders**

Missed appointments are expensive. A no-show costs you not just the revenue from that slot but the opportunity cost of someone you could have scheduled in their place.

SMS reminders 24 hours before an appointment reduce no-shows by 40-50% in most industries.

What to build: an automation connected to your booking calendar that sends SMS reminders automatically at 24h and 2h before each appointment.

Tools: Calendly or Google Calendar + Twilio (SMS) + Make.com. Monthly cost: under €15. Setup time: 3-4 hours.

**3. Customer review requests**

Most happy clients never leave a review. Not because they don't want to — because no one asked at the right moment.

The right moment is 24-48 hours after a job is completed or a service is delivered, when the experience is fresh.

What to build: an automation that sends a short, personal-feeling email asking for a Google review, with a direct link so there are no extra steps to navigate.

Tools: Make.com + Gmail + your CRM or job management software. Setup time: 2 hours.

**The pattern**

These three things share something: they all happen at predictable trigger points (form submission, booking, job completion) and they all require the same action every time. That is exactly what automation is good at.

If you want help setting any of these up — or want us to identify what else in your business could be automated — book a call. The assessment is free.
    `,
  },
  "how-much-should-a-website-cost": {
    title: "How much should a website actually cost in Romania in 2025?",
    excerpt: "The honest breakdown — why prices vary so much, what you get at each level, and when it makes sense to spend more.",
    category: "Pricing",
    readTime: "5 min read",
    date: "March 2025",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200&auto=format&fit=crop&q=80",
    content: `
Website pricing in Romania is all over the place. You can get a website for €100 or €10,000. The difference is real — but it is not always obvious what you are actually paying for.

Here is the honest breakdown.

**€0–200: DIY or template**

Wix, Squarespace, or a cheap freelancer using a template. Good for: a simple personal page, a hobby project, or testing an idea.

Not good for: a real business that needs to rank on Google, look professional, or convert visitors.

**€300–800: Budget freelancer or agency**

Usually a WordPress site using a premium theme. Can look decent. The problems: often slow, security issues over time, hard to update without breaking things, and the freelancer might not be around when you need changes.

**€800–2,500: Quality custom site**

This is where a well-built business site lives. Custom design (not a template), proper code, fast performance, SEO foundations, mobile-first. This is where we operate.

At this range, you get a site that actually works as a business tool — not just a digital brochure.

**€2,500+: Complex projects**

E-commerce with custom functionality, booking systems, user accounts, integrations with external systems, CMS for large content operations. Justified when the complexity demands it.

**What you are actually paying for**

Time: a good site takes 40-120 hours of skilled work. There is no shortcut.

Strategy: knowing what makes a site convert, not just how to make it look nice.

Technical quality: performance, security, SEO architecture — things that save you money long-term.

**The question to ask**

Not "how cheap can I get this?" but "what is a client worth to me, and how many clients will this site need to bring in before it pays for itself?"

If one client is worth €500 to your business, a €1,500 site needs to bring in three clients to pay for itself. Most decent sites do that in the first month.
    `,
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [post.image],
    },
  };
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = posts[slug];

  if (!post) {
    return (
      <div className="pt-40 pb-20 text-center">
        <h1 className="font-display text-3xl font-bold text-[var(--brand-espresso)]">Post not found</h1>
        <Link href="/blog" className="mt-4 inline-block font-body text-[var(--brand-amber)]">Back to blog</Link>
      </div>
    );
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.date,
    author: { "@type": "Organization", name: "RynexLabs" },
    publisher: { "@type": "Organization", name: "RynexLabs", url: "https://rynexlabs.com" },
  };

  const paragraphs = post.content
    .trim()
    .split("\n\n")
    .filter(Boolean);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="pt-32 pb-10 md:pt-40">
        <div className="container-tight px-4 md:px-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 font-body text-sm text-[var(--brand-warm-brown)] hover:text-[var(--brand-amber)] transition-colors mb-8 group"
          >
            <ArrowLeft size={16} weight="bold" className="transition-transform group-hover:-translate-x-0.5" />
            All articles
          </Link>

          <div className="flex items-center gap-4 mb-5">
            <span className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] bg-[var(--brand-amber)]/10 px-3 py-1 rounded-full">
              {post.category}
            </span>
            <span className="flex items-center gap-1 font-body text-xs text-[var(--brand-warm-brown)]">
              <Clock size={12} weight="regular" />
              {post.readTime}
            </span>
            <span className="font-body text-xs text-[var(--brand-warm-brown)]">{post.date}</span>
          </div>

          <h1 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-[var(--brand-espresso)] leading-tight mb-8">
            {post.title}
          </h1>

          <div className="relative aspect-[16/7] rounded-2xl overflow-hidden mb-12">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container-tight px-4 md:px-8">
          <div className="max-w-[68ch] mx-auto">
            {paragraphs.map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) {
                return (
                  <h2 key={i} className="font-display text-xl md:text-2xl font-bold text-[var(--brand-espresso)] mt-8 mb-4">
                    {para.replace(/\*\*/g, "")}
                  </h2>
                );
              }
              const parsed = para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
              return (
                <p
                  key={i}
                  className="font-body text-base text-[var(--brand-warm-brown)] leading-relaxed mb-5"
                  dangerouslySetInnerHTML={{ __html: parsed }}
                />
              );
            })}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
