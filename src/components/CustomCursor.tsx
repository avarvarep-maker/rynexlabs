"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [clicking, setClicking] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    let raf: number;
    let mouseX = -100, mouseY = -100;
    let currentX = -100, currentY = -100;

    const onMove = (e: MouseEvent) => { mouseX = e.clientX; mouseY = e.clientY; };
    const onEnter = () => { el.style.opacity = "1"; };
    const onLeave = () => { el.style.opacity = "0"; };
    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const animate = () => {
      currentX += (mouseX - currentX) * 0.12;
      currentY += (mouseY - currentY) * 0.12;
      el.style.left = `${currentX}px`;
      el.style.top = `${currentY}px`;
      raf = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter);
    document.addEventListener("mouseleave", onLeave);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("mouseup", onUp);
    raf = requestAnimationFrame(animate);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter);
      document.removeEventListener("mouseleave", onLeave);
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("mouseup", onUp);
      cancelAnimationFrame(raf);
    };
  }, []);

  const R = 14;
  const circumference = 2 * Math.PI * R;

  return (
    <div
      ref={containerRef}
      className="hidden lg:block fixed pointer-events-none z-[9999] opacity-0"
      style={{
        transform: "translate(-50%, -50%)",
        willChange: "left, top",
        left: "-100px",
        top: "-100px",
        mixBlendMode: "difference",
      }}
    >
      <svg width="36" height="36" viewBox="0 0 36 36">
        {/* Ghost ring — always visible */}
        <circle
          cx="18" cy="18" r={R}
          fill="none"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1"
        />
        {/* Progress ring — fills clockwise on click */}
        <circle
          cx="18" cy="18" r={R}
          fill="none"
          stroke="rgba(255,255,255,0.95)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={clicking ? 0 : circumference}
          style={{
            transform: "rotate(-90deg)",
            transformOrigin: "18px 18px",
            transition: clicking
              ? "stroke-dashoffset 0.38s cubic-bezier(0.4,0,0.2,1)"
              : "stroke-dashoffset 0.18s ease-out",
          }}
        />
        {/* Center dot */}
        <circle
          cx="18" cy="18" r="2.5"
          fill="#fff"
          style={{
            transform: `scale(${clicking ? 1.4 : 1})`,
            transformOrigin: "18px 18px",
            transition: "transform 0.2s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </svg>
    </div>
  );
}
