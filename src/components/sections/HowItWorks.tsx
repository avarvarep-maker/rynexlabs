"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    title: "We talk — really talk",
    description:
      "Not a pitch. A conversation. We listen to what your business actually needs before suggesting anything. 30 minutes, no obligation, no sales pressure.",
  },
  {
    number: "02",
    title: "We plan it out",
    description:
      "A clear proposal: what gets built, why it matters, what it costs, and when it ships. No hidden fees. No \"we'll figure it out later.\"",
  },
  {
    number: "03",
    title: "We build it",
    description:
      "You see progress regularly. We don't disappear for weeks and send you something finished. You stay involved as much or as little as you want.",
  },
  {
    number: "04",
    title: "You grow — we stick around",
    description:
      "Launch is not the finish line. We monitor, improve, and support the work. Your success is how we get our next client.",
  },
];

export default function HowItWorks() {
  return (
    <section className="section-padding">
      <div className="container-wide px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left sticky */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
            className="lg:sticky lg:top-32"
          >
            <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-4">
              The process
            </p>
            <h2 className="font-display text-[clamp(2rem,4vw,3.5rem)] font-bold text-[var(--brand-espresso)] mb-5">
              Simple.<br />
              <span className="italic font-light">Honest.</span><br />
              Predictable.
            </h2>
            <p className="font-body text-base text-[var(--brand-warm-brown)] leading-relaxed">
              Most agencies are a black box. You send money, something comes back eventually. We work differently — you know exactly what is happening and when.
            </p>
          </motion.div>

          {/* Right steps */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-7 top-0 bottom-0 w-px bg-gradient-to-b from-[var(--brand-amber)] via-[var(--border)] to-transparent hidden md:block" />

            <div className="space-y-8 md:space-y-10">
              {steps.map((step, i) => (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, x: 24 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className="relative flex gap-5 md:gap-7"
                >
                  {/* Number bubble */}
                  <div className="relative shrink-0 w-14 h-14 rounded-full border-2 border-[var(--brand-amber)] bg-[var(--background)] flex items-center justify-center z-10">
                    <span className="font-display text-xs font-bold text-[var(--brand-amber)]">
                      {step.number}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="pt-3 pb-2">
                    <h3 className="font-display text-lg md:text-xl font-semibold text-[var(--brand-espresso)] mb-2">
                      {step.title}
                    </h3>
                    <p className="font-body text-sm text-[var(--brand-warm-brown)] leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
