"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Globe,
  Robot,
  ChartLineUp,
  Check,
  ArrowRight,
} from "@phosphor-icons/react";
import ContactCTA from "@/components/sections/ContactCTA";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const services = [
  {
    id: "development",
    icon: Globe,
    title: "Web Design & Development",
    tagline: "A website that actually earns its place.",
    description:
      "We design and build custom websites from scratch. No templates, no \"page builders\", no shortcuts that come back to bite you in six months. Every site we build is fast, mobile-first, SEO-ready, and built to convert visitors into clients.",
    includes: [
      "Custom design — no templates",
      "Mobile-first, responsive across all devices",
      "Next.js + TypeScript (fast, secure, scalable)",
      "SEO foundations built in from day one",
      "Contact forms with real email delivery",
      "Google Analytics + Search Console setup",
      "3 rounds of revisions included",
      "Handover + documentation",
    ],
    price: "Starting from €800",
    delivery: "2–4 weeks",
  },
  {
    id: "automation",
    icon: Robot,
    title: "AI Automation",
    tagline: "Work less. Do more. Stop doing the same thing twice.",
    description:
      "We identify the tasks in your business that repeat themselves — lead responses, appointment follow-ups, data entry, report generation — and we build systems that handle them automatically. You stay in control. The system does the work.",
    includes: [
      "Process audit — we find what to automate",
      "Custom automation workflows (Make, Zapier, n8n)",
      "AI-powered email and message drafting",
      "Lead capture and follow-up sequences",
      "CRM integration and data sync",
      "Appointment reminders and booking automation",
      "Monthly review and optimization",
      "Full documentation and training",
    ],
    price: "Starting from €500/month",
    delivery: "1–2 weeks setup",
  },
  {
    id: "seo",
    icon: ChartLineUp,
    title: "SEO & Growth",
    tagline: "Found by people who are actually looking for you.",
    description:
      "We do SEO that works — technical, local, and content. No tricks that stop working when Google updates. No vague \"we're working on it\" reports. Clear actions, clear results, clear monthly reporting.",
    includes: [
      "Technical SEO audit and fixes",
      "Local SEO and Google Business optimization",
      "Keyword research and content strategy",
      "On-page optimization (titles, descriptions, structure)",
      "Schema markup (LocalBusiness, FAQ, Article)",
      "Core Web Vitals improvements",
      "Monthly performance reports",
      "Link building strategy",
    ],
    price: "Starting from €300/month",
    delivery: "Results in 60–90 days",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-20 section-padding">
        <div className="container-tight px-4 md:px-8">
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={fadeUp} className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-4">
              What we offer
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--brand-espresso)] mb-5">
              Services
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-lg text-[var(--brand-warm-brown)] leading-relaxed max-w-2xl">
              Three services. Each one done properly. We don&apos;t spread thin — we go deep on what we know works.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Services detail */}
      <section className="pb-16 md:pb-24">
        <div className="container-tight px-4 md:px-8 space-y-8">
          {services.map((service, i) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="bg-[var(--brand-surface)] border border-[var(--border)] rounded-2xl p-6 md:p-10"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left */}
                <div>
                  <div className="w-14 h-14 rounded-xl bg-[var(--brand-amber)]/10 flex items-center justify-center mb-5">
                    <service.icon size={28} weight="duotone" className="text-[var(--brand-amber)]" />
                  </div>
                  <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-2">
                    {service.tagline}
                  </p>
                  <h2 className="font-display text-2xl md:text-3xl font-bold text-[var(--brand-espresso)] mb-4">
                    {service.title}
                  </h2>
                  <p className="font-body text-base text-[var(--brand-warm-brown)] leading-relaxed mb-6">
                    {service.description}
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div>
                      <p className="font-display text-xl font-bold text-[var(--brand-espresso)]">{service.price}</p>
                      <p className="font-body text-xs text-[var(--brand-warm-brown)]">{service.delivery}</p>
                    </div>
                    <Link
                      href="/book"
                      className="inline-flex items-center gap-2 bg-[var(--brand-espresso)] text-[var(--brand-cream)] font-body font-semibold px-6 py-3 rounded-full transition-colors hover:bg-[var(--brand-amber)] group min-h-[44px]"
                    >
                      Get started
                      <ArrowRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </div>
                </div>

                {/* Right — includes */}
                <div>
                  <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-warm-brown)] mb-4">
                    What&apos;s included
                  </p>
                  <ul className="space-y-3">
                    {service.includes.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-[var(--brand-amber)]/15 flex items-center justify-center shrink-0 mt-0.5">
                          <Check size={12} weight="bold" className="text-[var(--brand-amber)]" />
                        </div>
                        <span className="font-body text-sm text-[var(--brand-espresso)]">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
