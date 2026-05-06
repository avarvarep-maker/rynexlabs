"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE =
  "a, button, [data-cursor='hover'], .work-item, .service, .step, .reel, .nav-cta";

export default function CustomCursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dot  = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!dot || !ring) return;

    let mx = -200, my = -200;
    let rx = -200, ry = -200;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
      if (!visible) setVisible(true);
    };

    const loop = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    loop();

    const onOver = (e: MouseEvent) => {
      const t = (e.target as Element).closest(INTERACTIVE);
      if (t) {
        ring.classList.add("hover");
        dot.classList.add("hover");
        const txt = (t as HTMLElement).dataset.cursorLabel ?? "";
        if (label) label.textContent = txt;
      }
    };

    const onOut = (e: MouseEvent) => {
      const t = (e.target as Element).closest(INTERACTIVE);
      if (t && !(e.relatedTarget as Element | null)?.closest(INTERACTIVE)) {
        ring.classList.remove("hover");
        dot.classList.remove("hover");
        if (label) label.textContent = "";
      }
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [visible]);

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: visible ? 1 : 0 }}
      >
        <span ref={labelRef} className="cursor-label" />
      </div>
    </>
  );
}
