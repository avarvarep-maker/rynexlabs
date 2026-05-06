"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      ".reveal, .reveal-stagger, .line-reveal"
    );

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");

            // Trigger strike animation on children after line finishes
            const strikes = (e.target as HTMLElement).querySelectorAll<HTMLElement>(".strike");
            if (strikes.length) {
              setTimeout(() => strikes.forEach((s) => s.classList.add("animated")), 1500);
            }

            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    elements.forEach((el) => io.observe(el));

    return () => io.disconnect();
  }, [pathname]);

  return null;
}
