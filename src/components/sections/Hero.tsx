"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChatsTeardrop } from "@phosphor-icons/react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      {/* Background warm gradient */}
      <div
        className="absolute inset-0 -z-10"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 70% 40%, oklch(0.82 0.08 75 / 0.35) 0%, transparent 60%),
            radial-gradient(ellipse 60% 80% at 10% 80%, oklch(0.60 0.12 55 / 0.12) 0%, transparent 50%),
            var(--background)
          `,
        }}
      />

      {/* Warm circle accent */}
      <div
        className="absolute top-24 right-8 md:right-24 w-64 h-64 md:w-96 md:h-96 rounded-full opacity-20 -z-10 blur-3xl"
        style={{ background: "var(--brand-amber)" }}
      />

      <div className="container-wide px-4 md:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left — copy */}
          <motion.div variants={stagger} initial="hidden" animate="show">
            <motion.div variants={fadeUp} className="inline-flex items-center gap-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-[var(--brand-amber)]" />
              <span className="font-body text-xs uppercase tracking-widest text-[var(--brand-warm-brown)]">
                Based in Iași, working worldwide
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="font-display text-[clamp(2.5rem,6vw,5rem)] font-bold leading-[1.05] text-[var(--brand-espresso)] mb-6"
            >
              Your business,{" "}
              <span className="italic font-light text-[var(--brand-amber)]">finally</span>
              <br />
              online — and{" "}
              <span className="italic font-light">working</span>.
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="font-body text-base md:text-lg text-[var(--brand-warm-brown)] leading-relaxed max-w-lg mb-8"
            >
              We build websites that bring in clients and AI systems that handle
              the work you hate doing. So you can focus on what you&apos;re actually
              good at.
            </motion.p>

            <motion.div
              variants={fadeUp}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-10"
            >
              <Link
                href="/book"
                className="inline-flex items-center justify-center gap-2 bg-[var(--brand-espresso)] text-[var(--brand-cream)] font-body font-semibold px-7 py-4 rounded-full transition-all duration-200 hover:bg-[var(--brand-amber)] group w-full sm:w-auto min-h-[52px]"
              >
                Book a free call
                <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center gap-2 border border-[var(--border)] text-[var(--brand-espresso)] font-body font-medium px-7 py-4 rounded-full transition-all duration-200 hover:border-[var(--brand-amber)] hover:text-[var(--brand-amber)] w-full sm:w-auto min-h-[52px]"
              >
                See what we do
              </Link>
            </motion.div>

            {/* Social proof */}
            <motion.div variants={fadeUp} className="flex items-center gap-4">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="w-9 h-9 rounded-full border-2 border-[var(--background)] overflow-hidden bg-[var(--brand-surface)]"
                  >
                    <Image
                      src={`https://picsum.photos/seed/person${i}/36/36`}
                      alt="Client"
                      width={36}
                      height={36}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div>
                <p className="font-body text-sm font-semibold text-[var(--brand-espresso)]">
                  Trusted by local businesses
                </p>
                <p className="font-body text-xs text-[var(--brand-warm-brown)]">
                  in Iași and across Romania
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right — visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="relative hidden lg:block"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&auto=format&fit=crop&q=90"
                alt="Modern workspace"
                fill
                className="object-cover"
                sizes="(max-width: 1280px) 40vw, 600px"
                priority
              />
              {/* Warm overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-espresso)]/40 to-transparent" />
            </div>

            {/* Floating card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="absolute -left-10 bottom-16 bg-[var(--brand-cream)] border border-[var(--border)] rounded-2xl p-4 shadow-xl max-w-[220px]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-8 h-8 rounded-full bg-[var(--brand-amber)]/15 flex items-center justify-center">
                  <ChatsTeardrop size={18} weight="duotone" className="text-[var(--brand-amber)]" />
                </div>
                <div>
                  <p className="font-body text-xs font-semibold text-[var(--brand-espresso)]">New lead</p>
                  <p className="font-body text-[10px] text-[var(--brand-warm-brown)]">via your website</p>
                </div>
              </div>
              <p className="font-body text-xs text-[var(--brand-warm-brown)]">
                &ldquo;I need a website for my restaurant...&rdquo;
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-body text-[10px] uppercase tracking-widest text-[var(--brand-warm-brown)]/60">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-[var(--brand-amber)] to-transparent"
        />
      </motion.div>
    </section>
  );
}
