"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { PILLARS, SERVICES } from "@/lib/services";

gsap.registerPlugin(SplitText);

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

const LAYOUT_ORDERS = [
  ["title", "image", "badge", "description"],
  ["image", "badge",  "description", "title"],
  ["badge", "description", "title", "image"],
  ["description", "title", "image", "badge"],
] as const;

const mono: React.CSSProperties = {
  fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
};

export default function HomePage() {
  const [pillarIndex, setPillarIndex]           = useState(0);
  const [hoveredService, setHoveredService]     = useState<number | null>(null);
  const [selectedService, setSelectedService]   = useState<string | null>(null);
  const [overlayOpen, setOverlayOpen]           = useState(false);
  const [circleVisible, setCircleVisible]       = useState(false);
  const [mounted, setMounted]                   = useState(false);

  const isLastPillar = pillarIndex === PILLARS.length - 1;

  const headerRef          = useRef<HTMLDivElement>(null);
  const bottomLeftRef      = useRef<HTMLDivElement>(null);
  const bottomRightRef     = useRef<HTMLDivElement>(null);
  const pillarTextRef      = useRef<HTMLParagraphElement>(null);
  const romanBadgeRef      = useRef<HTMLDivElement>(null);
  const circleRef          = useRef<SVGCircleElement>(null);
  const circleContainerRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const overlayRef         = useRef<HTMLDivElement>(null);
  const overlayBtnRef      = useRef<HTMLButtonElement>(null);
  const rippleRef          = useRef<HTMLDivElement>(null);
  const detailRef          = useRef<HTMLDivElement>(null);

  // Internal advance state
  const accumulated        = useRef(0);
  const cooldown           = useRef(false);
  const resetTimer         = useRef<ReturnType<typeof setTimeout> | null>(null);
  const splitInstance      = useRef<InstanceType<typeof SplitText> | null>(null);
  const pillarTl           = useRef<gsap.core.Timeline | null>(null);

  // ─── Init circle stroke ───────────────────────────────────────────
  useLayoutEffect(() => {
    const el = circleRef.current;
    if (!el) return;
    const circumference = 2 * Math.PI * 23;
    el.style.strokeDasharray = `${circumference}`;
    el.style.strokeDashoffset = `${circumference}`;
  }, []);

  // ─── Entry animation ─────────────────────────────────────────────
  useLayoutEffect(() => {
    setMounted(true);
    const tl = gsap.timeline();
    if (headerRef.current) {
      tl.to(headerRef.current, { y: 0, duration: 1, ease: "expo.out", delay: 0.2 });
    }
    if (bottomLeftRef.current) {
      tl.to(bottomLeftRef.current, { y: 0, duration: 1, ease: "expo.out" }, "<");
    }
    if (bottomRightRef.current) {
      tl.to(bottomRightRef.current, { y: 0, duration: 1, ease: "expo.out" }, "<");
    }
    if (romanBadgeRef.current) {
      tl.to(romanBadgeRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power4.out" }, "<0.2");
    }
    return () => { tl.kill(); };
  }, []);

  // ─── Pillar text animation ────────────────────────────────────────
  useEffect(() => {
    const el = pillarTextRef.current;
    if (!el) return;

    let cancelled = false;
    (async () => {
      await document.fonts.ready;
      if (cancelled) return;

      pillarTl.current?.kill();
      splitInstance.current?.revert();

      el.textContent = PILLARS[pillarIndex];
      splitInstance.current = new SplitText(el, {
        type: "words",
        wordsClass: "pillar-text",
      });

      const words = splitInstance.current.words;
      const textColor = isLastPillar ? "#000000" : "#ffffff";
      const delay = mounted ? 0 : 1;

      pillarTl.current = gsap.timeline();
      pillarTl.current.fromTo(
        words,
        { opacity: 0, y: 10 },
        {
          opacity: 1, y: 0,
          duration: 1.2,
          ease: "power4.out",
          stagger: (mounted ? 1.0 : 1.6) / Math.max(words.length, 1),
          delay,
          color: textColor,
        },
      );
      if (romanBadgeRef.current && mounted) {
        pillarTl.current.fromTo(
          romanBadgeRef.current,
          { autoAlpha: 0 },
          { autoAlpha: 1, duration: 2, ease: "power4.out" },
          `-=${delay > 0 ? 0.8 : 0.6}`,
        );
      }
    })();

    return () => {
      cancelled = true;
      pillarTl.current?.kill();
      splitInstance.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pillarIndex]);

  // ─── Update circle progress ───────────────────────────────────────
  const setCircleProgress = useCallback((progress: number) => {
    const el = circleRef.current;
    const ind = scrollIndicatorRef.current;
    if (!el) return;
    const circumference = 2 * Math.PI * 23;
    gsap.to(el, { strokeDashoffset: circumference * (1 - progress), duration: 0.2, ease: "power2.out" });
    if (ind) gsap.to(ind, { y: 10 - 100 * progress, duration: 0.2, ease: "power2.out" });
  }, []);

  // ─── Advance pillar ───────────────────────────────────────────────
  const advance = useCallback((delta: number, isDragging = false) => {
    if (cooldown.current) return;

    accumulated.current = Math.min(accumulated.current + delta, 200);
    const progress = accumulated.current / 200;
    setCircleProgress(progress);
    setCircleVisible(true);

    if (progress >= 1) {
      accumulated.current = 0;
      setCircleProgress(0);
      if (resetTimer.current) clearTimeout(resetTimer.current);
      if (!isDragging) setCircleVisible(false);

      cooldown.current = true;
      setPillarIndex(prev => (prev + 1) % PILLARS.length);
      setTimeout(() => { cooldown.current = false; }, 1000);
      return;
    }

    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => {
      accumulated.current = 0;
      setCircleProgress(0);
      if (!isDragging) setCircleVisible(false);
    }, 1000);
  }, [setCircleProgress]);

  // ─── Wheel handler ────────────────────────────────────────────────
  useEffect(() => {
    const el = document.getElementById("home-root");
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) advance(2);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [advance]);

  // ─── Drag/pointer handler ─────────────────────────────────────────
  useEffect(() => {
    const el = document.getElementById("home-root");
    if (!el) return;
    let startY = 0;
    let active = false;
    const onPointerDown = (e: PointerEvent) => { startY = e.clientY; active = true; };
    const onPointerMove = (e: PointerEvent) => {
      if (!active) return;
      const deltaY = e.clientY - startY;
      if (deltaY < -5) advance(4, true);
    };
    const onPointerUp = () => { active = false; };
    el.addEventListener("pointerdown", onPointerDown);
    el.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    return () => {
      el.removeEventListener("pointerdown", onPointerDown);
      el.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
    };
  }, [advance]);

  // ─── Service overlay animation ────────────────────────────────────
  const openOverlay = useCallback(() => {
    const overlay = overlayRef.current;
    const btn = overlayBtnRef.current;
    const ripple = rippleRef.current;
    if (!overlay || !btn) return;

    const rect = btn.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const maxR = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));

    gsap.set(overlay, { clipPath: `circle(0px at ${cx}px ${cy}px)`, visibility: "visible" });
    if (ripple) gsap.set(ripple, { x: cx, y: cy, scale: 0, opacity: 0.5, visibility: "visible" });

    const tl = gsap.timeline();
    if (ripple) tl.to(ripple, { scale: 10, opacity: 0, duration: 0.3, ease: "power1.in" });
    tl.to(overlay, { clipPath: `circle(${maxR}px at ${cx}px ${cy}px)`, duration: 0.8, ease: "power2.inOut" }, "-=0.2");
    tl.fromTo(".service-btn-item", { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.3, stagger: 0.05, ease: "power2.out" }, "-=0.6");

    setOverlayOpen(true);
  }, []);

  const closeOverlay = useCallback(() => {
    const overlay = overlayRef.current;
    if (!overlay) return;
    gsap.to(overlay, { clipPath: "circle(0% at 100% 0%)", duration: 0.5, ease: "power2.inOut", onComplete: () => {
      gsap.set(overlay, { visibility: "hidden" });
      setOverlayOpen(false);
    }});
  }, []);

  // ─── Service detail panel ─────────────────────────────────────────
  const openDetail = useCallback((slug: string) => {
    setSelectedService(slug);
    const detail = detailRef.current;
    if (detail) {
      gsap.fromTo(detail, { xPercent: 100, autoAlpha: 1, visibility: "visible" }, { xPercent: 0, autoAlpha: 1, visibility: "visible", duration: 0.6, ease: "expo.out" });
    }
  }, []);

  const closeDetail = useCallback(() => {
    const detail = detailRef.current;
    if (detail) {
      gsap.to(detail, { xPercent: 100, autoAlpha: 1, duration: 0.6, ease: "expo.in", onComplete: () => {
        setSelectedService(null);
        gsap.set(detail, { visibility: "hidden" });
      }});
    }
  }, []);

  const activeService = SERVICES.find(s => s.slug === selectedService);

  return (
    <div
      id="home-root"
      className={`home-page ${isLastPillar ? "cursor-invert bg-white text-black" : "cursor-force-white bg-black text-white"}`}
      style={{ transition: "background 0.8s, color 0.8s" }}
    >
      {/* ── Custom cursor dot ── */}
      <div
        className="hidden lg:block fixed w-16 h-16 rounded-full pointer-events-none z-[9999]"
        id="cursor-dot"
        style={{ background: isLastPillar ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)", transform: "translate(-50%, -50%)", willChange: "left, top", mixBlendMode: "difference" }}
      />

      {/* ── Header ── */}
      <div
        ref={headerRef}
        style={{ transform: "translateY(-100px)", ...mono }}
        className="absolute top-0 left-0 w-full px-4 lg:px-10 flex justify-between items-center z-[1003] py-6 lg:h-20"
      >
        <Link href="/" className="flex gap-2 items-center hover:opacity-70 transition-opacity duration-300">
          <span className="text-xs font-black" style={{ letterSpacing: "var(--tracking-xs)" }}>RYNEX</span>
          <span className="text-xs font-medium opacity-50" style={{ letterSpacing: "var(--tracking-xs)" }}>LABS</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex gap-8">
          {["Services", "Work", "Blog", "Contact"].map((l, i) => (
            <Link key={l} href={["#services", "/#work", "/blog", "/contact"][i]}
              className="text-xs font-medium opacity-60 hover:opacity-100 transition-opacity duration-200"
              style={{ letterSpacing: "var(--tracking-xs)" }}>
              {l}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="pill-btn hidden lg:inline-flex">
          Start a project <span className="opacity-50">→</span>
        </Link>
      </div>

      {/* ── Main content: center text + bottom bar ── */}
      <div className="w-screen h-screen flex flex-col justify-between">
        {/* Spacer */}
        <div />

        {/* Center — Roman counter + pillar text */}
        <div className="flex flex-col items-center justify-center gap-4 px-4">
          {/* Roman counter badge */}
          <div ref={romanBadgeRef} className="roman-counter opacity-0" style={{ background: isLastPillar ? "rgba(0,0,0,0.15)" : "rgba(255,255,255,0.15)" }}>
            <div className="flex gap-1 items-center" style={{ color: isLastPillar ? "#000" : "#fff" }}>
              <span>{ROMAN[pillarIndex]}</span>
              <span>•</span>
              <span className="opacity-50">{ROMAN[PILLARS.length - 1]}</span>
              <span style={{ letterSpacing: "var(--tracking-sm)", fontSize: "10px", marginLeft: "4px" }}>PILLARS</span>
            </div>
          </div>

          {/* Pillar text */}
          <p
            ref={pillarTextRef}
            className="px-2 text-3xl md:text-[3.25rem] leading-[115%] md:leading-[120%] text-center max-w-[800px] text-balance font-light"
            style={mono}
          >
            {PILLARS[0]}
          </p>
        </div>

        {/* Bottom bar */}
        <div className="absolute bottom-0 h-dvh pb-10 left-0 w-full px-4 lg:px-10 flex flex-row gap-4 justify-between items-end pointer-events-none">

          {/* Bottom left — mobile: service btn | desktop: service list */}
          <div ref={bottomLeftRef} style={{ transform: "translateY(100px)" }} className="pointer-events-auto">

            {/* Mobile service button */}
            <div className="lg:hidden">
              <button
                ref={overlayBtnRef}
                onClick={overlayOpen ? closeOverlay : openOverlay}
                className="pill-btn"
                style={{ borderColor: overlayOpen ? "rgba(255,255,255,0.3)" : undefined }}
              >
                {overlayOpen ? "Hide services" : "Our services"}
                <span style={{ display: "inline-block", transform: overlayOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>↑</span>
              </button>
            </div>

            {/* Desktop service list */}
            <div className="hidden lg:flex flex-col items-start justify-end pointer-events-auto">
              {SERVICES.map((s, i) => (
                <button
                  key={s.slug}
                  onMouseEnter={() => setHoveredService(i)}
                  onMouseLeave={() => setHoveredService(null)}
                  onClick={() => window.location.href = `/services`}
                  className="transition-all duration-200 font-semibold py-1 cursor-none"
                  style={{
                    ...mono,
                    fontSize: "0.625rem",
                    letterSpacing: "var(--tracking-sm)",
                    color: isLastPillar ? "#000" : "#fff",
                    opacity: hoveredService !== null && hoveredService !== i ? 0.3 : 1,
                    filter: hoveredService !== null && hoveredService !== i ? "blur(2px)" : "none",
                  }}
                >
                  {s.name.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          {/* Center — circular progress button */}
          <div
            ref={circleContainerRef}
            className="absolute left-1/2 -translate-x-1/2 bottom-10 w-[50px] h-[50px] transition-opacity rounded-full backdrop-blur-sm pointer-events-auto"
            style={{ opacity: circleVisible ? 1 : 0 }}
          >
            <svg width="50" height="50" viewBox="0 0 50 50" className="absolute">
              <circle
                ref={circleRef}
                cx="25" cy="25" r="23"
                stroke={isLastPillar ? "#000" : "#fff"}
                strokeWidth="1"
                fill="none"
                style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
              />
            </svg>
            <div className="w-full h-full flex items-center justify-center text-white text-xl overflow-hidden">
              <div ref={scrollIndicatorRef} className="transition-all duration-300 ease-out">
                <svg viewBox="0 0 48 48" className="w-12 h-12 pointer-events-none fill-none" style={{ stroke: isLastPillar ? "#000" : "#fff" }}>
                  <g transform="translate(34, 12) scale(0.67) rotate(90)">
                    <path d="M 9 15 L 27.45 15" fill="none" strokeWidth="1" />
                    <path d="M 27 15 L 21 9" fill="none" strokeWidth="1" />
                    <path d="M 27 15 L 21 21" fill="none" strokeWidth="1" />
                  </g>
                </svg>
              </div>
            </div>
          </div>

          {/* Bottom right — CTA */}
          <div ref={bottomRightRef} style={{ transform: "translateY(100px)" }} className="pointer-events-auto">
            <Link
              href="/contact"
              className="pill-btn"
              style={{ color: isLastPillar ? "#000" : "#fff", borderColor: isLastPillar ? "#000" : "rgba(255,255,255,0.6)" }}
            >
              <span className="hidden lg:block">Start a project</span>
              <span className="lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"/>
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Desktop service hover panels ── */}
      {SERVICES.map((service, i) => {
        const order = LAYOUT_ORDERS[i % LAYOUT_ORDERS.length];
        return (
          <div
            key={service.slug}
            className="text-white pointer-events-none lg:fixed inset-0 flex justify-end items-end z-[100] overflow-hidden"
            style={{
              backdropFilter: hoveredService === i ? "blur(12px)" : "none",
              opacity: hoveredService === i ? 1 : 0,
              transition: "opacity 0.4s, backdrop-filter 0.4s",
            }}
          >
            <div className="absolute inset-0 z-10 w-full h-full pointer-events-none bg-black/60" />
            <div className="relative z-20 w-full h-full max-w-[calc(100vw-300px)] max-h-[90dvh]">
              <div className="grid w-full h-full grid-cols-2 grid-rows-2 gap-20 p-4">
                {order.map((section, idx) => (
                  <div
                    key={section}
                    className={`relative flex w-full h-full p-4 ${
                      idx === 0 ? "items-end justify-end" :
                      idx === 1 ? "items-end justify-start" :
                      idx === 2 ? "items-start justify-end" :
                      "items-start justify-start"
                    }`}
                  >
                    {section === "image" && (
                      <div className="relative w-full max-h-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                        <Image src={service.image} alt={service.name} fill className="object-cover" sizes="40vw" />
                      </div>
                    )}
                    {section === "title" && (
                      <h2 className="font-mono text-4xl xl:text-5xl text-left max-w-[500px] xl:leading-18" style={mono}>
                        {service.name}
                      </h2>
                    )}
                    {section === "badge" && (
                      <p className="font-mono tracking-widest max-w-sm text-sm text-left opacity-60" style={mono}>
                        {service.areas.join(", ")}
                      </p>
                    )}
                    {section === "description" && (
                      <p className="max-w-sm text-sm text-left pl-3 text-white/70 leading-relaxed">
                        {service.description}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* ── Mobile service overlay ── */}
      <div ref={overlayRef} className="service-overlay">
        {/* Ripple element */}
        <div ref={rippleRef} className="fixed w-16 h-16 rounded-full bg-white/30 pointer-events-none z-[99]" style={{ transform: "translate(-50%, -50%)", visibility: "hidden", willChange: "transform, opacity" }} />

        {/* Close button */}
        <button onClick={closeOverlay} className="absolute top-6 right-4 w-11 h-11 flex flex-col justify-center items-center gap-[5px]" aria-label="Close">
          <span className="block w-4 bg-white rotate-45 translate-y-[5px]" style={{ height: "1px" }} />
          <span className="block w-4 bg-white -rotate-45" style={{ height: "1px" }} />
        </button>

        {/* Service grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 justify-center items-center gap-2">
          {SERVICES.map((s) => (
            <button
              key={s.slug}
              onClick={() => { closeOverlay(); openDetail(s.slug); }}
              className="service-btn-item service-button text-white"
            >
              <span style={{ ...mono, fontSize: "0.625rem", letterSpacing: "var(--tracking-sm)", fontWeight: 600 }}>
                {s.name.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Mobile service detail panel ── */}
      <div ref={detailRef} className="service-detail pt-20 pb-6 flex flex-col gap-10 justify-between items-start">
        {activeService && (
          <>
            <div className="relative z-10 p-4 lg:p-8 h-full min-w-[80vw]">
              <div className="flex flex-col max-w-4xl mx-auto h-full justify-center">
                <div className="flex flex-col gap-6 lg:flex-row justify-between items-center">
                  <h2 className="max-w-[370px] text-2xl text-center lg:text-left lg:text-5xl" style={mono}>{activeService.name}</h2>
                  <p className="tracking-widest max-w-sm text-sm text-left opacity-60" style={mono}>{activeService.areas.join(", ")}</p>
                </div>
                <div className="w-full mt-10 relative aspect-video overflow-hidden rounded-xl">
                  <Image src={activeService.image} alt={activeService.name} fill className="object-cover" sizes="90vw" />
                </div>
                <p className="mt-8 text-sm text-white/70 leading-relaxed max-w-lg">{activeService.description}</p>
              </div>
            </div>

            <div className="flex justify-between w-full px-4">
              <button onClick={closeDetail} className="pill-btn" style={{ transform: "rotate(180deg)" }}>
                <span style={{ display: "inline-block", transform: "rotate(180deg)" }}>→</span>
              </button>
              <Link href="/services" className="pill-btn mr-4">View service</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
