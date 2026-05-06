"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

type Phase = "idle" | "covered" | "entering";

export default function PageTransition() {
  const pathname = usePathname();
  const prevPath = useRef<string | null>(null);
  const [phase, setPhase] = useState<Phase>("idle");

  useEffect(() => {
    if (prevPath.current === null) {
      prevPath.current = pathname;
      return;
    }
    if (prevPath.current === pathname) return;
    prevPath.current = pathname;

    setPhase("covered");

    let raf: number;
    const t1 = setTimeout(() => {
      raf = requestAnimationFrame(() => setPhase("entering"));
    }, 40);
    const t2 = setTimeout(() => setPhase("idle"), 1800);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      cancelAnimationFrame(raf);
    };
  }, [pathname]);

  if (phase === "idle") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        pointerEvents: "none",
      }}
    >
      {[0, 1, 2, 3, 4].map((i) => (
        <div
          key={i}
          style={{
            flex: 1,
            background: "var(--orange)",
            ...(phase === "covered"
              ? { transform: "translateY(0)", animation: "none", transition: "none" }
              : {
                  animation: `panelEnter 1.2s cubic-bezier(.7,0,.2,1) ${i * 0.05}s both`,
                }),
          }}
        />
      ))}
      {phase === "entering" && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
            fontSize: "14px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--ink)",
            display: "flex",
            alignItems: "center",
            gap: "14px",
            zIndex: 1,
          }}
        >
          <span
            style={{
              width: "14px",
              height: "14px",
              borderRadius: "50%",
              background: "var(--ink)",
              display: "inline-block",
            }}
          />
          RYNEX LABS
        </div>
      )}
    </div>
  );
}
