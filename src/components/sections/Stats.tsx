"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { value: 48, suffix: "h", label: "Average time to first draft", description: "Not weeks. Two days." },
  { value: 3, suffix: "x", label: "Average ROI within 6 months", description: "Based on client revenue growth." },
  { value: 100, suffix: "%", label: "Projects delivered on time", description: "We set dates we can keep." },
  { value: 0, suffix: " PDFs", label: "Unreadable mobile menus shipped", description: "HTML only. Always." },
];

function Counter({
  target,
  suffix,
  duration = 1.5,
}: {
  target: number;
  suffix: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const end = start + duration * 1000;
    const step = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / (duration * 1000), 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (now < end) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  return (
    <section className="section-padding">
      <div className="container-wide px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-3">
            By the numbers
          </p>
          <h2 className="font-display text-[clamp(1.8rem,3vw,2.8rem)] font-bold text-[var(--brand-espresso)]">
            Numbers don&apos;t lie.
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="bg-[var(--brand-surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8 text-center"
            >
              <p className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-[var(--brand-amber)] mb-1 leading-none">
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="font-body text-sm font-semibold text-[var(--brand-espresso)] mb-1">
                {stat.label}
              </p>
              <p className="font-body text-xs text-[var(--brand-warm-brown)]">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
