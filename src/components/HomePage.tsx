"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { InstagramLogo, MapPin, Phone } from "@phosphor-icons/react";
import { PILLARS, SERVICES } from "@/lib/services";
import GeometricShapes from "@/components/GeometricShapes";

gsap.registerPlugin(SplitText);

const ROMAN = ["I", "II", "III", "IV", "V"];

const LAYOUT_ORDERS = [
  ["title", "image", "badge", "description"],
  ["image", "badge",  "description", "title"],
  ["badge", "description", "title", "image"],
  ["description", "title", "image", "badge"],
] as const;

const mono: React.CSSProperties = {
  fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
};

// Per-pillar base background color
const BG_COLORS = ["#000000", "#010408", "#050302", "#030303", "#ffffff"];

// Glass orb scenes per pillar
function GlassScene({ index, active }: { index: number; active: boolean }) {
  const opacity = active ? 1 : 0;
  const transition = "opacity 1.3s cubic-bezier(0.4,0,0.2,1)";

  if (index === 0) return (
    <div style={{ position: "absolute", inset: 0, opacity, transition, pointerEvents: "none" }}>
      {/* Hero photo — slow Ken Burns drift */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: "-10%", animation: "hero-drift 32s ease-in-out infinite" }}>
          <Image src="/p1-hero.jpg" alt="" fill className="object-cover" style={{ opacity: 0.52 }} sizes="120vw" priority />
        </div>
      </div>
      {/* Gradient overlay — keeps text readable */}
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(160deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.28) 50%, rgba(0,0,0,0.68) 100%)" }} />
      {/* Orange glow on top */}
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,43,0.11) 0%, transparent 68%)", filter: "blur(90px)", top: "-15%", right: "-10%", animation: "orb-drift-2 26s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,43,0.07) 0%, transparent 70%)", filter: "blur(70px)", bottom: "-10%", left: "-8%", animation: "orb-drift-3 34s ease-in-out infinite" }} />
    </div>
  );

  if (index === 1) return (
    <div style={{ position: "absolute", inset: 0, opacity, transition, pointerEvents: "none" }}>
      <div style={{ position: "absolute", width: 750, height: 750, borderRadius: "50%", background: "radial-gradient(circle, rgba(30,80,255,0.18) 0%, transparent 68%)", filter: "blur(100px)", top: "-20%", left: "-5%", animation: "orb-drift-1 28s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,140,255,0.12) 0%, transparent 70%)", filter: "blur(80px)", top: "10%", right: "-10%", animation: "orb-drift-2 22s ease-in-out infinite reverse" }} />
      <div style={{ position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,43,0.13) 0%, transparent 70%)", filter: "blur(70px)", bottom: "-5%", right: "20%", animation: "orb-drift-3 36s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 300, height: 300, borderRadius: "50%", background: "radial-gradient(circle, rgba(100,200,255,0.08) 0%, transparent 70%)", filter: "blur(50px)", bottom: "20%", left: "30%", animation: "orb-drift-1 18s ease-in-out infinite reverse" }} />
    </div>
  );

  if (index === 2) return (
    <div style={{ position: "absolute", inset: 0, opacity, transition, pointerEvents: "none" }}>
      <div style={{ position: "absolute", width: 800, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,43,0.22) 0%, transparent 65%)", filter: "blur(90px)", top: "-15%", left: "50%", transform: "translateX(-50%)", animation: "orb-drift-1 22s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,60,0,0.12) 0%, transparent 70%)", filter: "blur(80px)", top: "20%", right: "-12%", animation: "orb-drift-2 30s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,180,50,0.10) 0%, transparent 70%)", filter: "blur(60px)", bottom: "0%", left: "10%", animation: "orb-drift-3 26s ease-in-out infinite reverse" }} />
    </div>
  );

  if (index === 3) return (
    <div style={{ position: "absolute", inset: 0, opacity, transition, pointerEvents: "none" }}>
      <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,140,50,0.15) 0%, transparent 65%)", filter: "blur(100px)", top: "30%", left: "50%", transform: "translateX(-50%)", animation: "orb-drift-1 32s ease-in-out infinite" }} />
      <div style={{ position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(255,107,43,0.10) 0%, transparent 70%)", filter: "blur(60px)", bottom: "5%", right: "10%", animation: "orb-drift-2 24s ease-in-out infinite reverse" }} />
      <div style={{ position: "absolute", width: 280, height: 280, borderRadius: "50%", background: "radial-gradient(circle, rgba(200,80,20,0.08) 0%, transparent 70%)", filter: "blur(50px)", top: "10%", left: "15%", animation: "orb-drift-3 20s ease-in-out infinite" }} />
    </div>
  );

  return null; // scene 4 = white, handled by root bg
}

export default function HomePage() {
  const [pillarIndex, setPillarIndex]         = useState(0);
  const [hoveredService, setHoveredService]   = useState<number | null>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [overlayOpen, setOverlayOpen]         = useState(false);
  const [circleVisible, setCircleVisible]     = useState(false);
  const [mounted, setMounted]                 = useState(false);
  const [hoveredNav, setHoveredNav]           = useState<number | null>(null);

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
    if (headerRef.current)      tl.to(headerRef.current,      { y: 0, duration: 1, ease: "expo.out", delay: 0.2 });
    if (bottomLeftRef.current)  tl.to(bottomLeftRef.current,  { y: 0, duration: 1, ease: "expo.out" }, "<");
    if (bottomRightRef.current) tl.to(bottomRightRef.current, { y: 0, duration: 1, ease: "expo.out" }, "<");
    if (romanBadgeRef.current)  tl.to(romanBadgeRef.current,  { autoAlpha: 1, y: 0, duration: 0.8, ease: "power4.out" }, "<0.2");
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
    const onWheel = (e: WheelEvent) => { e.preventDefault(); if (e.deltaY > 0) advance(40); };
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

  // Nav links — Contact (index 2) never blurs
  const NAV = [
    { label: "Services", href: "/services" },
    { label: "Work",     href: "/services" },
    { label: "Contact",  href: "/contact" },
  ];

  return (
    <div
      id="home-root"
      className={`home-page ${isLastPillar ? "cursor-invert" : "cursor-force-white"}`}
      style={{
        background: BG_COLORS[pillarIndex],
        color: isLastPillar ? "#000" : "#fff",
        transition: "background 1.2s cubic-bezier(0.4,0,0.2,1), color 0.8s",
      }}
    >
      {/* ── Background layer ──────────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>

        {/* Per-pillar glass scenes */}
        {[0, 1, 2, 3].map(i => (
          <GlassScene key={i} index={i} active={pillarIndex === i} />
        ))}

        {/* Mouse-tracking glow */}
        <div
          ref={glowRef}
          className="absolute pointer-events-none"
          style={{
            width: 700, height: 700, borderRadius: "50%",
            background: isLastPillar
              ? "radial-gradient(circle, rgba(0,0,0,0.04) 0%, transparent 70%)"
              : "radial-gradient(circle, rgba(255,107,43,0.07) 0%, transparent 70%)",
            transform: "translate(-50%, -50%)",
            left: "50%", top: "50%",
            transition: "left 0.38s cubic-bezier(0,0,.2,1), top 0.38s cubic-bezier(0,0,.2,1), background 0.8s",
            willChange: "left, top",
          }}
        />

        {/* Blob clusters */}
        <div style={{ position: "absolute", bottom: -100, right: -60, opacity: isLastPillar ? 0 : 0.44, transition: "opacity 0.8s" }}>
          <div className="blobs-wrap" style={{ width: 320, height: 320 }}>
            <div className="blob blob-left"       style={{ width: 72, height: 72 }} />
            <div className="blob blob-right"      style={{ width: 72, height: 72 }} />
            <div className="blob-accent blob-up"  style={{ width: 58, height: 58 }} />
            <div className="blob blob-down"       style={{ width: 62, height: 62 }} />
          </div>
        </div>
        <div style={{ position: "absolute", top: -70, left: -50, opacity: isLastPillar ? 0 : 0.22, transition: "opacity 0.8s" }}>
          <div className="blobs-wrap" style={{ width: 230, height: 230, animationDuration: "32s" }}>
            <div className="blob blob-right"       style={{ width: 46, height: 46 }} />
            <div className="blob-accent blob-down" style={{ width: 40, height: 40 }} />
          </div>
        </div>
        <div style={{ position: "absolute", top: -50, right: -40, opacity: isLastPillar ? 0 : 0.16, transition: "opacity 0.8s" }}>
          <div className="blobs-wrap" style={{ width: 190, height: 190, animationDuration: "27s" }}>
            <div className="blob-accent blob-left" style={{ width: 38, height: 38 }} />
            <div className="blob blob-up"          style={{ width: 32, height: 32 }} />
          </div>
        </div>

        {/* Dot grid */}
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.048) 1px, transparent 1px)",
          backgroundSize: "42px 42px",
          opacity: isLastPillar ? 0 : 1,
          transition: "opacity 0.8s",
        }} />

        {/* Rotating rings */}
        <div className="absolute pointer-events-none" style={{
          width: 480, height: 480, borderRadius: "50%",
          border: isLastPillar ? "1px solid rgba(0,0,0,0.04)" : "1px solid rgba(255,107,43,0.06)",
          left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          animation: "rotate-blobs 60s linear infinite", transition: "border-color 1.2s",
        }} />
        <div className="absolute pointer-events-none" style={{
          width: 780, height: 780, borderRadius: "50%",
          border: isLastPillar ? "1px solid rgba(0,0,0,0.03)" : "1px solid rgba(255,255,255,0.025)",
          left: "50%", top: "50%", transform: "translate(-50%,-50%)",
          animation: "rotate-blobs 90s linear infinite reverse", transition: "border-color 1.2s",
        }} />

        {/* Geometric shapes — cursor parallax */}
        <GeometricShapes isLastPillar={isLastPillar} />
      </div>

      {/* ── Header ───────────────────────────────────────────── */}
      <div
        ref={headerRef}
        style={{ transform: "translateY(-100px)", ...mono, zIndex: 1003 }}
        className="absolute top-0 left-0 w-full px-4 lg:px-10 flex justify-between items-center py-6 lg:h-20"
        onMouseLeave={() => setHoveredNav(null)}
      >
        <Link href="/" className="flex gap-2 items-center hover:opacity-70 transition-opacity duration-300">
          <span className="text-xs font-black" style={{ letterSpacing: "var(--tracking-xs)", color: isLastPillar ? "#000" : "#fff" }}>RYNEX</span>
          <span className="text-xs font-medium" style={{ letterSpacing: "var(--tracking-xs)", color: isLastPillar ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.4)" }}>LABS</span>
        </Link>

        <nav className="hidden lg:flex gap-8">
          {NAV.map((l, i) => {
            const isContact = i === 2;
            const dimmed = hoveredNav !== null && hoveredNav !== i && !isContact;
            return (
              <Link
                key={l.href + i}
                href={l.href}
                onMouseEnter={() => setHoveredNav(i)}
                className="text-xs font-medium transition-all duration-200"
                style={{
                  letterSpacing: "var(--tracking-xs)",
                  color: isLastPillar ? "rgba(0,0,0,0.7)" : "rgba(255,255,255,0.65)",
                  opacity: dimmed ? 0.2 : 1,
                  filter: dimmed ? "blur(1.5px)" : "none",
                  transition: "opacity 0.25s, filter 0.25s, color 0.4s",
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className={`hidden lg:inline-flex glass-btn ${isLastPillar ? "glass-btn-dark" : ""}`}
        >
          Start a project <span className="opacity-50">→</span>
        </Link>
      </div>

      {/* ── Center: badge + text + per-pillar CTA ────────────── */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <div
          ref={romanBadgeRef}
          className="roman-counter"
          style={{
            opacity: 0,
            background: isLastPillar ? "rgba(0,0,0,0.10)" : "rgba(255,255,255,0.10)",
            color: isLastPillar ? "#000" : "#fff",
          }}
        >
          <div className="flex gap-1 items-center">
            <span>{ROMAN[pillarIndex]}</span>
            <span>•</span>
            <span className="opacity-50">{ROMAN[PILLARS.length - 1]}</span>
            <span style={{ letterSpacing: "var(--tracking-sm)", fontSize: 10, marginLeft: 4 }}>PILLARS</span>
          </div>
        </div>

        <p
          ref={pillarTextRef}
          className="px-2 text-3xl md:text-[3.25rem] leading-[115%] md:leading-[120%] text-center max-w-[800px] text-balance font-light"
          style={mono}
        >
          {PILLARS[0]}
        </p>

        {/* ── Per-pillar CTA slot ───── */}
        <div className="relative h-14 flex items-center justify-center" style={{ marginTop: "0.75rem", minWidth: 260 }}>

          {/* Pillar 1: sub-hook label */}
          <div className="absolute" style={{
            opacity: pillarIndex === 0 ? 1 : 0,
            transition: "opacity 0.5s 0.5s",
            pointerEvents: pillarIndex === 0 ? "auto" : "none",
          }}>
            <span className="text-xs opacity-30" style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}>
              — SCROLL TO EXPLORE —
            </span>
          </div>

          {/* Pillar 2: "Press me" → services */}
          <div className="absolute pointer-events-auto" style={{
            opacity: pillarIndex === 1 ? 1 : 0,
            transform: pillarIndex === 1 ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.6s 0.5s, transform 0.6s 0.5s",
            pointerEvents: pillarIndex === 1 ? "auto" : "none",
          }}>
            <Link href="/services" className="btn-p2 glass-btn glass-btn-accent">
              Press me →
            </Link>
          </div>

          {/* Pillar 3: "See the work" → services */}
          <div className="absolute pointer-events-auto" style={{
            opacity: pillarIndex === 2 ? 1 : 0,
            transform: pillarIndex === 2 ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.6s 0.5s, transform 0.6s 0.5s",
            pointerEvents: pillarIndex === 2 ? "auto" : "none",
          }}>
            <Link href="/services" className="btn-p3 glass-btn glass-btn-accent">
              See the work →
            </Link>
          </div>

          {/* Pillar 4: "C'mon, talk to us" → contact */}
          <div className="absolute pointer-events-auto" style={{
            opacity: pillarIndex === 3 ? 1 : 0,
            transform: pillarIndex === 3 ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.6s 0.5s, transform 0.6s 0.5s",
            pointerEvents: pillarIndex === 3 ? "auto" : "none",
          }}>
            <Link href="/contact" className="btn-p4 glass-btn glass-btn-accent">
              C&apos;mon, talk to us →
            </Link>
          </div>

          {/* Pillar 5 (last / white): map + socials */}
          <div className="absolute pointer-events-auto flex flex-col items-center gap-4" style={{
            opacity: pillarIndex === 4 ? 1 : 0,
            transform: pillarIndex === 4 ? "translateY(0)" : "translateY(8px)",
            transition: "opacity 0.6s 0.5s, transform 0.6s 0.5s",
            pointerEvents: pillarIndex === 4 ? "auto" : "none",
          }}>
            <a
              href="https://maps.google.com/?q=Iași,Romania"
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn glass-btn-dark"
            >
              <MapPin size={14} weight="bold" />
              Find us on the map
            </a>
            <div className="flex items-center gap-5" style={{ ...mono, fontSize: 10, letterSpacing: "var(--tracking-sm)" }}>
              <a
                href="https://www.instagram.com/ionvtpaul/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity duration-200"
                style={{ color: "#000" }}
              >
                <InstagramLogo size={14} weight="bold" />
                @ionvtpaul
              </a>
              <span className="opacity-20">·</span>
              <a
                href="tel:0747202811"
                className="flex items-center gap-1.5 opacity-50 hover:opacity-100 transition-opacity duration-200"
                style={{ color: "#000" }}
              >
                <Phone size={14} weight="bold" />
                0747 202 811
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────────── */}
      <div
        className="absolute bottom-0 left-0 w-full pb-10 px-4 lg:px-10 flex flex-row justify-between items-end pointer-events-none"
        style={{ zIndex: 50 }}
      >
        {/* Bottom-left: service list */}
        <div ref={bottomLeftRef} style={{ transform: "translateY(100px)" }} className="pointer-events-auto">
          <div className="lg:hidden">
            <button
              ref={overlayBtnRef}
              onClick={overlayOpen ? closeOverlay : openOverlay}
              className="glass-btn"
            >
              {overlayOpen ? "Hide services" : "Our services"}
              <span style={{ display: "inline-block", transform: overlayOpen ? "rotate(180deg)" : "none", transition: "transform 0.3s" }}>↑</span>
            </button>
          </div>

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
                  color: isLastPillar ? "#000" : "#fff",
                  opacity: hoveredService !== null && hoveredService !== i ? 0.25 : isLastPillar ? 0.7 : 1,
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
            className={`glass-btn ${isLastPillar ? "glass-btn-dark" : ""}`}
          >
            <span className="hidden lg:block">Start a project</span>
            <span className="lg:hidden text-xs" style={mono}>Contact</span>
          </Link>
        </div>
      </div>

      {/* ── Desktop service hover panels ─────────────────────── */}
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
                      <h2 className="text-4xl xl:text-5xl text-left max-w-[500px] xl:leading-18" style={mono}>{service.name}</h2>
                    )}
                    {section === "badge" && (
                      <p className="tracking-widest max-w-sm text-sm text-left opacity-60" style={mono}>{service.areas.join(", ")}</p>
                    )}
                    {section === "description" && (
                      <p className="max-w-sm text-sm text-left pl-3 text-white/70 leading-relaxed">{service.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })}

      {/* ── Mobile service overlay ────────────────────────────── */}
      <div ref={overlayRef} className="service-overlay">
        <div ref={rippleRef} className="fixed w-16 h-16 rounded-full bg-white/30 pointer-events-none" style={{ transform: "translate(-50%,-50%)", visibility: "hidden" }} />
        <button onClick={closeOverlay} className="absolute top-6 right-4 w-11 h-11 flex flex-col justify-center items-center gap-[5px]" aria-label="Close">
          <span className="block w-4 bg-white rotate-45 translate-y-[5px]"  style={{ height: 1 }} />
          <span className="block w-4 bg-white -rotate-45"                   style={{ height: 1 }} />
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

      {/* ── Mobile service detail ─────────────────────────────── */}
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
              <button onClick={closeDetail} className="glass-btn">← Back</button>
              <Link href="/services" className="glass-btn mr-4">View service</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
