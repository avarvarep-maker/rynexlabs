"use client";

import { useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { SERVICES } from "@/lib/services";

const mono: React.CSSProperties = {
  fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
};

export default function ServicesPage() {
  const [expanded, setExpanded] = useState<string | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const listRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    if (headingRef.current) tl.from(headingRef.current, { y: 40, opacity: 0, duration: 1.2, ease: "expo.out" });
    if (listRef.current) {
      tl.from(listRef.current.children, { y: 20, opacity: 0, duration: 0.6, stagger: 0.08, ease: "expo.out" }, "-=0.8");
    }
    return () => { tl.kill(); };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-16 lg:py-24">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <p className="text-xs opacity-50 mb-4 uppercase" style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}>
            SERVICES
          </p>
          <h1 ref={headingRef} className="text-5xl lg:text-7xl font-light leading-none" style={mono}>
            What we build.
          </h1>
        </div>

        {/* Service accordion */}
        <div ref={listRef} className="border-t" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
          {SERVICES.map((service, i) => {
            const isOpen = expanded === service.slug;
            return (
              <div key={service.slug} className="border-b" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <button
                  onClick={() => setExpanded(isOpen ? null : service.slug)}
                  className="w-full py-8 flex items-center justify-between gap-4 text-left group"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-center gap-6">
                    <span className="text-xs w-6 shrink-0" style={{ ...mono, letterSpacing: "var(--tracking-xs)", color: "rgba(255,255,255,0.3)" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className="text-2xl lg:text-4xl font-light transition-opacity duration-200 group-hover:opacity-70"
                      style={mono}
                    >
                      {service.name}
                    </span>
                  </div>
                  <span
                    className="text-2xl opacity-40 transition-transform duration-300 shrink-0"
                    style={{ display: "inline-block", transform: isOpen ? "rotate(45deg)" : "none" }}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-12 grid lg:grid-cols-2 gap-10 lg:gap-16 pl-12">
                    <div>
                      <p className="text-sm leading-relaxed mb-8" style={{ ...mono, color: "rgba(255,255,255,0.6)" }}>
                        {service.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-8">
                        {service.areas.map(area => (
                          <span
                            key={area}
                            className="text-xs px-3 py-1.5"
                            style={{
                              ...mono,
                              border: "1px solid rgba(255,255,255,0.2)",
                              letterSpacing: "var(--tracking-xs)",
                              color: "rgba(255,255,255,0.7)",
                            }}
                          >
                            {area}
                          </span>
                        ))}
                      </div>
                      <Link href="/contact" className="pill-btn pill-btn-accent">
                        Start a project →
                      </Link>
                    </div>
                    <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
                      <Image
                        src={service.image}
                        alt={service.name}
                        fill
                        className="object-cover"
                        style={{ opacity: 0.6 }}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 flex flex-col items-start gap-4">
          <p className="text-xs opacity-50 uppercase" style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}>
            CUSTOM PROJECT?
          </p>
          <p className="text-2xl lg:text-3xl font-light max-w-xl" style={mono}>
            Every project is different. Tell us what you need.
          </p>
          <Link href="/contact" className="pill-btn mt-2" style={{ color: "#fff", borderColor: "rgba(255,255,255,0.4)" }}>
            Get in touch →
          </Link>
        </div>
      </div>
    </main>
  );
}
