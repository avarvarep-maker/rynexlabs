"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Phone } from "@phosphor-icons/react";

export default function ContactCTA() {
  return (
    <section className="section-padding">
      <div className="container-wide px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
          className="relative rounded-3xl overflow-hidden"
          style={{
            background: `
              radial-gradient(ellipse 70% 80% at 80% 50%, oklch(0.60 0.12 55 / 0.25) 0%, transparent 60%),
              radial-gradient(ellipse 50% 60% at 20% 70%, oklch(0.82 0.08 75 / 0.15) 0%, transparent 50%),
              var(--brand-surface)
            `,
          }}
        >
          {/* Border */}
          <div className="absolute inset-0 rounded-3xl border border-[var(--brand-amber)]/20 pointer-events-none" />

          <div className="relative px-8 py-14 md:px-14 md:py-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
            <div className="max-w-xl">
              <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-4">
                Let&apos;s work together
              </p>
              <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-[var(--brand-espresso)] mb-4 leading-tight">
                You&apos;ve been putting it off long enough.
              </h2>
              <p className="font-body text-base text-[var(--brand-warm-brown)] leading-relaxed">
                Getting started costs nothing. Book a free call and let&apos;s figure out in 30 minutes whether we&apos;re a good fit — and what it would take to get your business where it should be online.
              </p>
            </div>

            <div className="flex flex-col gap-3 shrink-0 w-full md:w-auto">
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-[var(--brand-espresso)] text-[var(--brand-cream)] font-body font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:bg-[var(--brand-amber)] group min-h-[52px] w-full md:w-auto"
              >
                Book a free call
                <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <a
                href="tel:0747202811"
                className="inline-flex items-center justify-center gap-2 border border-[var(--border)] text-[var(--brand-espresso)] font-body font-medium px-8 py-4 rounded-full transition-all duration-200 hover:border-[var(--brand-amber)] hover:text-[var(--brand-amber)] min-h-[52px] w-full md:w-auto"
              >
                <Phone size={18} weight="light" />
                0747 202 811
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
