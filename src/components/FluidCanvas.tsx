"use client";

import { useEffect, useRef } from "react";

interface Point {
  x: number; y: number;
  age: number; radius: number;
  color: string;
}

const COLORS = [
  "hsla(180, 80%, 55%, 1)",
  "hsla(20,  95%, 52%, 1)",
  "hsla(15,  90%, 50%, 1)",
  "hsla(45,  90%, 60%, 1)",
  "hsla(280, 70%, 62%, 1)",
];

export default function FluidCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);

  useEffect(() => { activeRef.current = active; }, [active]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rafId: number;
    let points: Point[] = [];
    let colorIndex = 0;
    let lastMouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const onMove = (e: MouseEvent) => {
      if (!activeRef.current) return;
      const dx = e.clientX - lastMouse.x;
      const dy = e.clientY - lastMouse.y;
      const steps = Math.max(Math.hypot(dx, dy) / 5, 1);
      for (let i = 0; i < steps; i++) {
        points.push({
          x: lastMouse.x + (dx * i) / steps,
          y: lastMouse.y + (dy * i) / steps,
          age: 0,
          radius: Math.random() * 40 + 60,
          color: COLORS[colorIndex % COLORS.length],
        });
      }
      lastMouse = { x: e.clientX, y: e.clientY };
      colorIndex++;
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    const render = () => {
      // Fade trail — dark fill each frame creates the dissolve
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0,0,0,0.16)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalCompositeOperation = "screen";

      for (let i = points.length - 1; i >= 0; i--) {
        const p = points[i];
        p.age += 1.5;
        const alpha = Math.max(1 - p.age / 100, 0);
        const r = p.radius + p.age * 1.5;
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
        grad.addColorStop(0, p.color.replace("1)", `${alpha * 0.45})`));
        grad.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fill();
        if (p.age > 100) points.splice(i, 1);
      }

      ctx.globalCompositeOperation = "source-over";
      rafId = requestAnimationFrame(render);
    };
    render();

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        mixBlendMode: "screen",
      }}
    />
  );
}
