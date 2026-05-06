"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number; y: number;
  vx: number; vy: number;
  baseVx: number; baseVy: number;
  size: number;
  accent: boolean;
  opacity: number;
  pulseOffset: number;
}

const N              = 52;
const CONNECT_DIST   = 140;
const REPEL_DIST     = 120;
const REPEL_FORCE    = 0.55;
const ACCENT_RATIO   = 0.14;
const ACCENT_RGB     = "255,107,43";
const WHITE_RGB      = "255,255,255";

function initParticles(w: number, h: number): Particle[] {
  return Array.from({ length: N }, () => {
    const vx = (Math.random() - 0.5) * 0.32;
    const vy = (Math.random() - 0.5) * 0.32;
    return {
      x: Math.random() * w,
      y: Math.random() * h,
      vx, vy, baseVx: vx, baseVy: vy,
      size:        Math.random() * 1.5 + 0.4,
      accent:      Math.random() < ACCENT_RATIO,
      opacity:     Math.random() * 0.32 + 0.07,
      pulseOffset: Math.random() * Math.PI * 2,
    };
  });
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef  = useRef({ x: -9999, y: -9999 });
  const glowRef   = useRef<HTMLDivElement>(null);
  const rafRef    = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = window.innerWidth;
    let H = window.innerHeight;
    canvas.width  = W;
    canvas.height = H;

    // Reduce particle count on mobile
    const isMobile = W < 768;
    const count    = isMobile ? 26 : N;
    let particles  = initParticles(W, H).slice(0, count);
    let frame      = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width  = W;
      canvas.height = H;
      particles     = initParticles(W, H).slice(0, isMobile ? 26 : N);
    };

    const onMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      const g = glowRef.current;
      if (g) { g.style.left = `${e.clientX}px`; g.style.top = `${e.clientY}px`; }
    };

    window.addEventListener("resize",    resize, { passive: true });
    window.addEventListener("mousemove", onMove,  { passive: true });

    const tick = () => {
      frame++;
      ctx.clearRect(0, 0, W, H);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const t  = frame * 0.008;

      // ── Update + draw dots ────────────────────────────
      for (const p of particles) {
        const dx   = p.x - mx;
        const dy   = p.y - my;
        const dist = Math.hypot(dx, dy);

        if (dist < REPEL_DIST && dist > 0.5) {
          const f = ((REPEL_DIST - dist) / REPEL_DIST) * REPEL_FORCE;
          p.vx += (dx / dist) * f;
          p.vy += (dy / dist) * f;
        }

        // Spring back to base velocity
        p.vx += (p.baseVx - p.vx) * 0.007;
        p.vy += (p.baseVy - p.vy) * 0.007;

        // Damping + clamp
        p.vx *= 0.984;
        p.vy *= 0.984;
        const spd = Math.hypot(p.vx, p.vy);
        if (spd > 1.8) { p.vx = (p.vx / spd) * 1.8; p.vy = (p.vy / spd) * 1.8; }

        p.x += p.vx;
        p.y += p.vy;

        // Soft wrap
        if (p.x < -12)    p.x = W + 12;
        if (p.x > W + 12) p.x = -12;
        if (p.y < -12)    p.y = H + 12;
        if (p.y > H + 12) p.y = -12;

        const pulse = Math.sin(t * 1.4 + p.pulseOffset) * 0.08;
        const a     = Math.max(0.03, p.opacity + pulse);
        const rgb   = p.accent ? ACCENT_RGB : WHITE_RGB;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${rgb},${a})`;
        ctx.fill();
      }

      // ── Connection lines ──────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a  = particles[i];
          const b  = particles[j];
          const d  = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < CONNECT_DIST) {
            const alpha   = (1 - d / CONNECT_DIST) * 0.09;
            const hasAccent = a.accent || b.accent;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `rgba(${hasAccent ? ACCENT_RGB : WHITE_RGB},${alpha})`;
            ctx.lineWidth   = 0.5;
            ctx.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize",    resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      aria-hidden="true"
      style={{ zIndex: 1 }}
    >
      {/* Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" style={{ opacity: 0.8 }} />

      {/* Drifting orb 1 — orange, top-left quadrant */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "580px", height: "580px",
          background: "radial-gradient(circle, rgba(255,107,43,0.052) 0%, transparent 68%)",
          animation: "orb-drift-1 23s ease-in-out infinite",
          top: "18%", left: "22%",
          transform: "translate(-50%,-50%)",
        }}
      />

      {/* Drifting orb 2 — white, top-right */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "420px", height: "420px",
          background: "radial-gradient(circle, rgba(255,255,255,0.020) 0%, transparent 70%)",
          animation: "orb-drift-2 31s ease-in-out infinite",
          top: "12%", right: "18%",
          transform: "translate(50%,-50%)",
        }}
      />

      {/* Drifting orb 3 — orange, bottom center */}
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "680px", height: "680px",
          background: "radial-gradient(circle, rgba(255,107,43,0.030) 0%, transparent 70%)",
          animation: "orb-drift-3 40s ease-in-out infinite",
          bottom: "0%", left: "55%",
          transform: "translate(-50%,40%)",
        }}
      />

      {/* Mouse glow */}
      <div
        ref={glowRef}
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "640px", height: "640px",
          background: "radial-gradient(circle, rgba(255,107,43,0.062) 0%, transparent 68%)",
          transform: "translate(-50%,-50%)",
          left: "50%", top: "50%",
          transition: "left 0.42s cubic-bezier(0,0,.2,1), top 0.42s cubic-bezier(0,0,.2,1)",
          willChange: "left, top",
        }}
      />

      {/* Subtle vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 50%, rgba(0,0,0,0.35) 100%)",
        }}
      />
    </div>
  );
}
