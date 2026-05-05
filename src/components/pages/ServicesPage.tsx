"use client";

import { useLayoutEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { SERVICES } from "@/lib/services";

const mono: React.CSSProperties = {
  fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
};

export default function ServicesPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const rowsRef    = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    if (headingRef.current) tl.from(headingRef.current, { y: 40, opacity: 0, duration: 1.2 });
    if (rowsRef.current) {
      tl.from(Array.from(rowsRef.current.children), { y: 30, opacity: 0, duration: 0.7, stagger: 0.1 }, "-=0.8");
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
          <h1
            ref={headingRef}
            className="text-5xl lg:text-7xl font-light leading-none"
            style={mono}
          >
            What we build.
          </h1>
        </div>

        {/* Services — always visible */}
        <div ref={rowsRef} style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
          {SERVICES.map((service, i) => (
            <div
              key={service.slug}
              className="py-12 lg:py-16"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="grid lg:grid-cols-[40px_1fr_320px] gap-6 lg:gap-12 items-start">

                {/* Index */}
                <span
                  className="text-xs pt-2"
                  style={{ ...mono, letterSpacing: "var(--tracking-xs)", color: "rgba(255,255,255,0.3)" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Info */}
                <div>
                  <h2 className="text-3xl lg:text-5xl font-light mb-5" style={mono}>
                    {service.name}
                  </h2>
                  <p className="text-sm leading-relaxed mb-6 max-w-lg" style={{ ...mono, color: "rgba(255,255,255,0.6)" }}>
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

                {/* Image */}
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: "4/3" }}
                >
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover"
                    style={{ opacity: 0.55, filter: "grayscale(20%)" }}
                    sizes="(max-width: 1024px) 100vw, 320px"
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: "linear-gradient(135deg, rgba(0,255,135,0.06) 0%, transparent 60%)" }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-20 pt-12" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          <p className="text-xs opacity-40 uppercase mb-4" style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}>
            CUSTOM PROJECT?
          </p>
          <p className="text-2xl lg:text-3xl font-light mb-6 max-w-lg" style={mono}>
            Every project is different. Tell us what you need.
          </p>
          <Link href="/contact" className="pill-btn" style={{ borderColor: "rgba(255,255,255,0.4)" }}>
            Get in touch →
          </Link>
        </div>
      </div>
    </main>
  );
}
