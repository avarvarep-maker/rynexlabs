"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Globe, Robot, ChartLineUp, ArrowUpRight } from "@phosphor-icons/react";

const services = [
  {
    icon: Globe,
    label: "Web Design & Development",
    description:
      "A site that actually earns its keep. We design around your customer journey, not just how it looks. Built fast. Built right.",
    href: "/services#development",
    tag: "Most popular",
  },
  {
    icon: Robot,
    label: "AI Automation",
    description:
      "Repetitive tasks, lead follow-ups, customer responses, data entry — automated. You hire less, do more, sleep better.",
    href: "/services#automation",
    tag: "High ROI",
  },
  {
    icon: ChartLineUp,
    label: "SEO & Growth",
    description:
      "Getting found by the right people, not just more people. Technical SEO, content strategy, and local visibility.",
    href: "/services#seo",
    tag: null,
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function Services() {
  return (
    <section className="section-padding bg-[var(--brand-espresso)]">
      <div className="container-wide px-4 md:px-8">
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.p
            variants={fadeUp}
            className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-4"
          >
            What we build
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-[var(--brand-cream)] mb-4 max-w-xl"
          >
            Three things. Done properly.
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-base text-white/50 max-w-lg mb-14"
          >
            We don&apos;t try to do everything. We focus on three services and do each one better than anyone else in the region.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.label}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
              >
                <Link
                  href={service.href}
                  className="group block h-full bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8 hover:bg-white/10 hover:border-[var(--brand-amber)]/30 transition-all duration-300"
                >
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-xl bg-[var(--brand-amber)]/15 flex items-center justify-center">
                      <service.icon size={24} weight="duotone" className="text-[var(--brand-amber)]" />
                    </div>
                    {service.tag && (
                      <span className="font-body text-[10px] uppercase tracking-widest bg-[var(--brand-amber)]/20 text-[var(--brand-amber)] px-2.5 py-1 rounded-full">
                        {service.tag}
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-xl font-semibold text-[var(--brand-cream)] mb-3 group-hover:text-[var(--brand-amber)] transition-colors">
                    {service.label}
                  </h3>
                  <p className="font-body text-sm text-white/50 leading-relaxed mb-6">
                    {service.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-[var(--brand-amber)] font-body text-sm font-medium">
                    Learn more
                    <ArrowUpRight size={16} weight="bold" className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
