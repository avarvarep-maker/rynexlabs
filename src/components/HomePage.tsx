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
  const [pillarIndex, setPillarIndex]         = useState(0);
  const [hoveredService, setHoveredService]   = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [overlayOpen, setOverlayOpen]         = useState(false);
  const [circleVisible, setCircleVisible]     = useState(false);
  const [mounted, setMounted]                 = useState(false);

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
  const glowRef            = useRef<HTMLDivElement>(null);

  const accumulated   = useRef(0);
  const cooldown      = useRef(false);
  const resetTimer    = useRef<ReturnType<typeof setTimeout> | null>(null);
  const splitInstance = useRef<InstanceType<typeof SplitText> | null>(null);
  const pillarTl      = useRef<gsap.core.Timeline | null>(null);

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
    if (headerRef.current)     tl.to(headerRef.current,     { y: 0, duration: 1, ease: "expo.out", delay: 0.2 });
    if (bottomLeftRef.current) tl.to(bottomLeftRef.current, { y: 0, duration: 1, ease: "expo.out" }, "<");
    if (bottomRightRef.current)tl.to(bottomRightRef.current,{ y: 0, duration: 1, ease: "expo.out" }, "<");
    if (romanBadgeRef.current) tl.to(romanBadgeRef.current, { autoAlpha: 1, y: 0, duration: 0.8, ease: "power4.out" }, "<0.2");
    return () => { tl.kill(); };
  }, []);

  // ─── Mouse glow ───────────────────────────────────────────────────
  useEffect(() => {
    const el = glowRef.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      el.style.left = `${e.clientX}px`;
      el.style.top  = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
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
      splitInstance.current = new SplitText(el, { type: "words", wordsClass: "pillar-text" });
      const words     = splitInstance.current.words;
      const textColor = isLastPillar ? "#000000" : "#ffffff";
      const delay     = mounted ? 0 : 1;
      pillarTl.current = gsap.timeline();
      pillarTl.current.fromTo(words, { opacity: 0, y: 10 }, {
        opacity: 1, y: 0,
        duration: 1.2, ease: "power4.out",
        stagger: (mounted ? 1.0 : 1.6) / Math.max(words.length, 1),
        delay, color: textColor,
      });
      if (romanBadgeRef.current && mounted) {
        pillarTl.current.fromTo(romanBadgeRef.current,
          { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power4.out" },
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

  // ─── Circle progress ─────────────────────────────────────────────
  const setCircleProgress = useCallback((progress: number) => {
    const el  = circleRef.current;
    const ind = scrollIndicatorRef.current;
    if (!el) return;
    const circumference = 2 * Math.PI * 23;
    gsap.to(el,  { strokeDashoffset: circumference * (1 - progress), duration: 0.2, ease: "power2.out" });
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

  // ─── Wheel ───────────────────────────────────────────────────────
  useEffect(() => {
    const el = document.getElementById("home-root");
    if (!el) return;
    const onWheel = (e: WheelEvent) => { e.preventDefault(); if (e.deltaY > 0) advance(2); };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [advance]);

  // ─── Drag ────────────────────────────────────────────────────────
  useEffect(() => {
    const el = document.getElementById("home-root");
    if (!el) return;
    let startY = 0; let active = false;
    const onDown = (e: PointerEvent) => { startY = e.clientY; active = true; };
    const onMove = (e: PointerEvent) => { if (!active) return; if (e.clientY - startY < -5) advance(4, true); };
    const onUp   = () => { active = false; };
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, [advance]);

  // ─── Overlay ─────────────────────────────────────────────────────
  const openOverlay = useCallback(() => {
    const overlay = overlayRef.current;
    const btn     = overlayBtnRef.current;
    const ripple  = rippleRef.current;
    if (!overlay || !btn) return;
    const rect  = btn.getBoundingClientRect();
    const cx    = rect.left + rect.width / 2;
    const cy    = rect.top  + rect.height / 2;
    const maxR  = Math.hypot(Math.max(cx, window.innerWidth - cx), Math.max(cy, window.innerHeight - cy));
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

  // ─── Detail panel ─────────────────────────────────────────────────
  const openDetail = useCallback((slug: string) => {
    setSelectedService(slug);
    const detail = detailRef.current;
    if (detail) gsap.fromTo(detail, { xPercent: 100, visibility: "visible" }, { xPercent: 0, autoAlpha: 1, visibility: "visible", duration: 0.6, ease: "expo.out" });
  }, []);

  const closeDetail = useCallback(() => {
    const detail = detailRef.current;
    if (detail) gsap.to(detail, { xPercent: 100, duration: 0.6, ease: "expo.in", onComplete: () => {
      setSelectedService(null);
      gsap.set(detail, { visibility: "hidden" });
    }});
  }, []);

  const activeService = SERVICES.find(s => s.slug === selectedService);

  return (
    <div
      id="home-root"
      className={`home-page ${isLastPillar ? "cursor-invert" : "cursor-force-white"}`}
      style={{
        background: isLastPillar ? "#fff" : "#000",
        color: isLastPillar ? "#000" : "#fff",
        transition: "background 0.8s, color 0.8s",
      }}
    >
      {/* ── Custom cursor dot ── */}
      <div
        className="hidden lg:block fixed w-16 h-16 rounded-full pointer-events-none z-[9999]"
        id="cursor-dot"
        style={{
          background: isLastPillar ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)",
          transform: "translate(-50%, -50%)",
          willChange: "left, top",
          mixBlendMode: "difference",
        }}
      />

      {/* ── Background layer ─────────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
        {/* Mouse-tracking glow */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none"
          style={{
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background: isLastPillar
              ? "radial-gradient(circle, rgba(0,0,0,0.06) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(0,255,135,0.07) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            transition: "left 0.5s cubic-bezier(0,0,.2,1), top 0.5s cubic-bezier(0,0,.2,1), background 0.8s",
            willChange: "left, top",
          }}
        />

        {/* Bottom-right blob cluster */}
        <div
          style={{
            position: "absolute",
            bottom: "-100px",
            right: "-60px",
            opacity: isLastPillar ? 0 : 0.45,
            transition: "opacity 0.8s",
          }}
        >
          <div className="blobs-wrap" style={{ width: "300px", height: "300px" }}>
            <div className="blob blob-left"  style={{ width: "70px",  height: "70px" }} />
            <div className="blob blob-right" style={{ width: "70px",  height: "70px" }} />
            <div className="blob-accent blob-up"   style={{ width: "55px",  height: "55px" }} />
            <div className="blob blob-down"  style={{ width: "60px",  height: "60px" }} />
          </div>
        </div>

        {/* Top-left blob cluster */}
        <div
          style={{
            position: "absolute",
            top: "-70px",
            left: "-50px",
            opacity: isLastPillar ? 0 : 0.22,
            transition: "opacity 0.8s",
          }}
        >
          <div className="blobs-wrap" style={{ width: "220px", height: "220px", animationDuration: "32s" }}>
            <div className="blob blob-right" style={{ width: "45px", height: "45px" }} />
            <div className="blob-accent blob-down"  style={{ width: "38px", height: "38px" }} />
          </div>
        </div>

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
            opacity: isLastPillar ? 0 : 1,
            transition: "opacity 0.8s",
          }}
        />
      </div>

      {/* ── Header ─────────────────────────────────────────────────── */}
      <div
        ref={headerRef}
        style={{ transform: "translateY(-100px)", ...mono, zIndex: 1003 }}
        className="absolute top-0 left-0 w-full px-4 lg:px-10 flex justify-between items-center py-6 lg:h-20"
      >
        <Link href="/" className="flex gap-2 items-center hover:opacity-70 transition-opacity duration-300">
          <span className="text-xs font-black" style={{ letterSpacing: "var(--tracking-xs)" }}>RYNEX</span>
          <span className="text-xs font-medium opacity-50" style={{ letterSpacing: "var(--tracking-xs)" }}>LABS</span>
        </Link>

        <nav className="hidden lg:flex gap-8">
          {["Services", "Work", "Blog", "Contact"].map((l, i) => (
            <Link key={l} href={["/services", "/#work", "/blog", "/contact"][i]}
              className="text-xs font-medium opacity-60 hover:opacity-100 transition-opacity duration-200"
              style={{ letterSpacing: "var(--tracking-xs)" }}
            >
              {l}
            </Link>
          ))}
        </nav>

        <Link href="/contact" className="pill-btn hidden lg:inline-flex">
          Start a project <span className="opacity-50">→</span>
        </Link>
      </div>

      {/* ── Center: Roman badge + pillar text ──────────────────────── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div
          ref={romanBadgeRef}
          className="roman-counter"
          style={{
            opacity: 0,
            background: isLastPillar ? "rgba(0,0,0,0.12)" : "rgba(255,255,255,0.12)",
          }}
        >
          <div className="flex gap-1 items-center">
            <span>{ROMAN[pillarIndex]}</span>
            <span>•</span>
            <span className="opacity-50">{ROMAN[PILLARS.length - 1]}</span>
            <span style={{ letterSpacing: "var(--tracking-sm)", fontSize: "10px", marginLeft: "4px" }}>PILLARS</span>
          </div>
        </div>

        <p
          ref={pillarTextRef}
          className="px-2 text-3xl md:text-[3.25rem] leading-[115%] md:leading-[120%] text-center max-w-[800px] text-balance font-light"
          style={mono}
        >
          {PILLARS[0]}
        </p>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 w-full pb-10 px-4 lg:px-10 flex flex-row justify-between items-end pointer-events-none"
        style={{ zIndex: 50 }}
      >
        {/* Bottom-left: service list */}
        <div ref={bottomLeftRef} style={{ transform: "translateY(100px)" }} className="pointer-events-auto">
          {/* Mobile */}
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

          {/* Desktop */}
          <div className="hidden lg:flex flex-col items-start">
            {SERVICES.map((s, i) => (
              <button
                key={s.slug}
                onMouseEnter={() => setHoveredService(i)}
                onMouseLeave={() => setHoveredService(null)}
                onClick={() => { window.location.href = "/services"; }}
                className="transition-all duration-200 font-semibold py-1 cursor-none"
                style={{
                  ...mono,
                  fontSize: "0.625rem",
                  letterSpacing: "var(--tracking-sm)",
                  opacity: hoveredService !== null && hoveredService !== i ? 0.3 : 1,
                  filter: hoveredService !== null && hoveredService !== i ? "blur(2px)" : "none",
                }}
              >
                {s.name.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Center: circular progress */}
        <div
          ref={circleContainerRef}
          className="absolute left-1/2 -translate-x-1/2 bottom-8 w-[50px] h-[50px] transition-opacity duration-300 rounded-full pointer-events-auto"
          style={{ opacity: circleVisible ? 1 : 0 }}
        >
          <svg width="50" height="50" viewBox="0 0 50 50" className="absolute inset-0">
            <circle
              ref={circleRef}
              cx="25" cy="25" r="23"
              stroke={isLastPillar ? "#000" : "#fff"}
              strokeWidth="1"
              fill="none"
              style={{ transform: "rotate(-90deg)", transformOrigin: "center" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div ref={scrollIndicatorRef}>
              <svg viewBox="0 0 48 48" width="28" height="28" fill="none" style={{ stroke: isLastPillar ? "#000" : "#fff" }}>
                <g transform="translate(34,12) scale(0.67) rotate(90)">
                  <path d="M 9 15 L 27.45 15" strokeWidth="1.5" />
                  <path d="M 27 15 L 21 9"    strokeWidth="1.5" />
                  <path d="M 27 15 L 21 21"   strokeWidth="1.5" />
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom-right: CTA */}
        <div ref={bottomRightRef} style={{ transform: "translateY(100px)" }} className="pointer-events-auto">
          <Link
            href="/contact"
            className="pill-btn"
            style={{
              borderColor: isLastPillar ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.6)",
              color: isLastPillar ? "#000" : "#fff",
            }}
          >
            <span className="hidden lg:block">Start a project</span>
            <span className="lg:hidden text-xs" style={mono}>Contact</span>
          </Link>
        </div>
      </div>

      {/* ── Desktop service hover panels ─────────────────────────────── */}
      {SERVICES.map((service, i) => {
        const order = LAYOUT_ORDERS[i % LAYOUT_ORDERS.length];
        return (
          <div
            key={service.slug}
            className="text-white pointer-events-none lg:fixed inset-0 flex justify-end items-end overflow-hidden"
            style={{
              zIndex: 100,
              backdropFilter: hoveredService === i ? "blur(12px)" : "none",
              opacity: hoveredService === i ? 1 : 0,
              transition: "opacity 0.4s, backdrop-filter 0.4s",
            }}
          >
            <div className="absolute inset-0 z-10 w-full h-full bg-black/60" />
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
                      <div className="relative w-full overflow-hidden" style={{ aspectRatio: "16/9" }}>
                        <Image src={service.image} alt={service.name} fill className="object-cover" sizes="40vw" />
                      </div>
                    )}
                    {section === "title" && (
                      <h2 className="text-4xl xl:text-5xl text-left max-w-[500px] xl:leading-18" style={mono}>
                        {service.name}
                      </h2>
                    )}
                    {section === "badge" && (
                      <p className="tracking-widest max-w-sm text-sm text-left opacity-60" style={mono}>
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

      {/* ── Mobile service overlay ─────────────────────────────────── */}
      <div ref={overlayRef} className="service-overlay">
        <div ref={rippleRef} className="fixed w-16 h-16 rounded-full bg-white/30 pointer-events-none" style={{ transform: "translate(-50%,-50%)", visibility: "hidden" }} />
        <button onClick={closeOverlay} className="absolute top-6 right-4 w-11 h-11 flex flex-col justify-center items-center gap-[5px]" aria-label="Close">
          <span className="block w-4 bg-white rotate-45 translate-y-[5px]"  style={{ height: "1px" }} />
          <span className="block w-4 bg-white -rotate-45"                   style={{ height: "1px" }} />
        </button>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {SERVICES.map((s) => (
            <button key={s.slug} onClick={() => { closeOverlay(); openDetail(s.slug); }}
              className="service-btn-item service-button text-white">
              <span style={{ ...mono, fontSize: "0.625rem", letterSpacing: "var(--tracking-sm)", fontWeight: 600 }}>
                {s.name.toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* ── Mobile service detail ─────────────────────────────────── */}
      <div ref={detailRef} className="service-detail pt-20 pb-6 flex flex-col gap-10 justify-between items-start" style={{ visibility: "hidden" }}>
        {activeService && (
          <>
            <div className="relative z-10 p-4 lg:p-8 h-full min-w-[80vw]">
              <div className="flex flex-col max-w-4xl mx-auto h-full justify-center">
                <div className="flex flex-col gap-6 lg:flex-row justify-between items-center">
                  <h2 className="max-w-[370px] text-2xl text-center lg:text-left lg:text-5xl" style={mono}>{activeService.name}</h2>
                  <p className="tracking-widest max-w-sm text-sm opacity-60" style={mono}>{activeService.areas.join(", ")}</p>
                </div>
                <div className="w-full mt-10 relative overflow-hidden rounded-xl" style={{ aspectRatio: "16/9" }}>
                  <Image src={activeService.image} alt={activeService.name} fill className="object-cover" sizes="90vw" />
                </div>
                <p className="mt-8 text-sm text-white/70 leading-relaxed max-w-lg">{activeService.description}</p>
              </div>
            </div>
            <div className="flex justify-between w-full px-4">
              <button onClick={closeDetail} className="pill-btn">← Back</button>
              <Link href="/services" className="pill-btn mr-4">View service</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
