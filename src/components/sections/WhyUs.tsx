"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { HandshakeIcon, Lightbulb, Timer, Translate } from "@phosphor-icons/react";

const reasons = [
  {
    icon: HandshakeIcon,
    title: "We treat your money like our own",
    description:
      "We build what you need, not what makes the invoice bigger. Scope creep is not in our vocabulary.",
  },
  {
    icon: Lightbulb,
    title: "Strategy before execution",
    description:
      "Pretty is nice. Effective is better. We design around how your customers think, not just how things look.",
  },
  {
    icon: Timer,
    title: "We actually deliver on time",
    description:
      "Radical concept, we know. Clear timelines, clear milestones, no surprises.",
  },
  {
    icon: Translate,
    title: "We speak human",
    description:
      "No jargon. No \"synergistic digital ecosystems.\" We explain what we're doing and why, plainly.",
  },
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function WhyUs() {
  return (
    <section className="section-padding bg-[var(--brand-surface)]">
      <div className="container-wide px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden max-w-md mx-auto lg:mx-0">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=700&auto=format&fit=crop&q=80"
                alt="Team working together"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 90vw, (max-width: 1280px) 40vw, 480px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--brand-espresso)]/30 to-transparent" />
            </div>

            {/* Stat card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="absolute -right-4 md:-right-8 top-12 bg-[var(--brand-amber)] text-[var(--brand-cream)] rounded-2xl p-5 shadow-xl"
            >
              <p className="font-display text-4xl font-bold mb-1">100%</p>
              <p className="font-body text-xs leading-tight opacity-80">
                of clients would<br />recommend us
              </p>
            </motion.div>
          </motion.div>

          {/* Right */}
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
          >
            <motion.p variants={fadeUp} className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-4">
              Why RynexLabs
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="font-display text-[clamp(1.8rem,3.5vw,3rem)] font-bold text-[var(--brand-espresso)] mb-4"
            >
              Not another agency that disappears after the invoice.
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="font-body text-base text-[var(--brand-warm-brown)] leading-relaxed mb-10"
            >
              We are a small team. That means you talk to the people actually building your project — not an account manager relaying messages to someone you&apos;ll never meet.
            </motion.p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {reasons.map((reason) => (
                <motion.div key={reason.title} variants={fadeUp} className="flex gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-amber)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <reason.icon size={20} weight="duotone" className="text-[var(--brand-amber)]" />
                  </div>
                  <div>
                    <h3 className="font-body text-sm font-semibold text-[var(--brand-espresso)] mb-1">
                      {reason.title}
                    </h3>
                    <p className="font-body text-xs text-[var(--brand-warm-brown)] leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
