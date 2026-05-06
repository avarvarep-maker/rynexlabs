"use client";

import { useEffect, useRef } from "react";

interface ShapeConfig {
  x: number;   // base position as fraction of viewport width
  y: number;   // base position as fraction of viewport height
  size: number;
  parallax: number; // multiplier for cursor offset
  phase: number;    // sine wave phase offset
  speed: number;    // float animation speed
  amp: number;      // float amplitude in px
  rotSpeed: number; // slow rotation speed
  accent: boolean;
  opacity: number;
  path: string;     // SVG path (viewBox assumed 0 0 100 100)
}

const CONFIGS: ShapeConfig[] = [
  {
    x: 0.08, y: 0.22, size: 60, parallax: 0.016, phase: 0,   speed: 0.00055, amp: 14, rotSpeed: 0.00008, accent: false, opacity: 0.13,
    path: "M 50,4 L 96,86 L 4,86 Z",
  },
  {
    x: 0.78, y: 0.14, size: 46, parallax: 0.030, phase: 1.4, speed: 0.00072, amp: 11, rotSpeed: 0.00012, accent: true,  opacity: 0.11,
    path: "M 50,3 L 93,27 L 93,73 L 50,97 L 7,73 L 7,27 Z",
  },
  {
    x: 0.90, y: 0.48, size: 40, parallax: 0.044, phase: 2.6, speed: 0.00065, amp: 16, rotSpeed: 0.00015, accent: false, opacity: 0.09,
    path: "M 10,10 L 90,10 L 90,90 L 10,90 Z",
  },
  {
    x: 0.11, y: 0.68, size: 76, parallax: 0.010, phase: 0.9, speed: 0.00042, amp: 9,  rotSpeed: 0.00006, accent: false, opacity: 0.07,
    path: "M 50,4 A 46,46 0 1 1 49.9,4 Z",
  },
  {
    x: 0.52, y: 0.82, size: 50, parallax: 0.034, phase: 2.0, speed: 0.00080, amp: 12, rotSpeed: 0.00010, accent: true,  opacity: 0.12,
    path: "M 50,4 L 96,50 L 50,96 L 4,50 Z",
  },
  {
    x: 0.84, y: 0.80, size: 54, parallax: 0.024, phase: 3.2, speed: 0.00058, amp: 15, rotSpeed: 0.00007, accent: false, opacity: 0.09,
    path: "M 50,96 L 4,14 L 96,14 Z",
  },
  {
    x: 0.64, y: 0.07, size: 34, parallax: 0.040, phase: 0.5, speed: 0.00090, amp: 10, rotSpeed: 0.00018, accent: true,  opacity: 0.10,
    path: "M 50,3 L 93,27 L 93,73 L 50,97 L 7,73 L 7,27 Z",
  },
  {
    x: 0.24, y: 0.90, size: 38, parallax: 0.028, phase: 1.7, speed: 0.00068, amp: 11, rotSpeed: 0.00011, accent: false, opacity: 0.10,
    path: "M 50,4 L 96,50 L 50,96 L 4,50 Z",
  },
  {
    x: 0.38, y: 0.30, size: 28, parallax: 0.050, phase: 4.1, speed: 0.00095, amp: 8,  rotSpeed: 0.00020, accent: true,  opacity: 0.08,
    path: "M 50,4 L 57,37 L 93,37 L 64,58 L 75,93 L 50,72 L 25,93 L 36,58 L 7,37 L 43,37 Z",
  },
];

export default function GeometricShapes({ isLastPillar }: { isLastPillar: boolean }) {
  const elemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });
  const rafRef   = useRef<number>(0);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const tick = (t: number) => {
      const mx = (mouseRef.current.x - 0.5) * window.innerWidth;
      const my = (mouseRef.current.y - 0.5) * window.innerHeight;

      CONFIGS.forEach((cfg, i) => {
        const el = elemsRef.current[i];
        if (!el) return;
        const floatY = Math.sin(t * cfg.speed + cfg.phase) * cfg.amp;
        const floatX = Math.cos(t * cfg.speed * 0.7 + cfg.phase) * (cfg.amp * 0.4);
        const rot    = t * cfg.rotSpeed;
        const tx     = mx * cfg.parallax + floatX;
        const ty     = my * cfg.parallax + floatY;
        el.style.transform = `translate(${tx}px, ${ty}px) rotate(${rot}rad)`;
      });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {CONFIGS.map((cfg, i) => {
        const color = cfg.accent
          ? `rgba(0,255,135,${isLastPillar ? 0 : cfg.opacity})`
          : `rgba(255,255,255,${isLastPillar ? 0 : cfg.opacity})`;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: `${cfg.x * 100}%`,
              top:  `${cfg.y * 100}%`,
              width: `${cfg.size}px`,
              height: `${cfg.size}px`,
              marginLeft: `-${cfg.size / 2}px`,
              marginTop:  `-${cfg.size / 2}px`,
              pointerEvents: "none",
              transition: "opacity 0.8s",
            }}
          >
            <div
              ref={el => { elemsRef.current[i] = el; }}
              style={{ width: "100%", height: "100%", willChange: "transform" }}
            >
              <svg
                width={cfg.size} height={cfg.size}
                viewBox="0 0 100 100"
                fill="none"
                stroke={color}
                strokeWidth={cfg.accent ? "2" : "1.5"}
                style={{ display: "block", transition: "stroke 0.8s" }}
              >
                <path d={cfg.path} />
              </svg>
            </div>
          </div>
        );
      })}
    </>
  );
}
