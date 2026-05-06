"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const NAV_LINKS = [
  { label: "Services", href: "/services" },
  { label: "Work",     href: "/#work" },
  { label: "Contact",  href: "/contact" },
];

const mono: React.CSSProperties = {
  fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
};

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false);
  const [menuOpen,   setMenuOpen]   = useState(false);
  const [mounted,    setMounted]    = useState(false);
  const pathname = usePathname();

  const isHome = pathname === "/";

  useEffect(() => {
    if (isHome) return;
    setMounted(true);
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, [isHome]);

  useEffect(() => { if (!isHome) setMenuOpen(false); }, [pathname, isHome]);

  useEffect(() => {
    if (isHome) return;
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, isHome]);

  if (isHome) return null;

  return (
    <>
      {/* ── Header ── */}
      <header
        className="fixed top-0 left-0 w-full px-4 lg:px-10 flex justify-between items-center z-[1003] py-6 lg:py-0 lg:h-20"
        style={{
          transform: mounted ? "translateY(0)" : "translateY(-100px)",
          transition: "transform 0.8s cubic-bezier(0,0,.2,1) 0.1s, background 0.3s, backdrop-filter 0.3s",
          background: scrolled ? "rgba(0,0,0,0.88)" : "transparent",
          backdropFilter: scrolled ? "blur(20px)" : "none",
        }}
      >
        {/* Logo */}
        <div className="flex-1 lg:w-3/12">
          <Link href="/" className="inline-flex gap-2 items-center hover:opacity-70 transition-opacity duration-300">
            <span className="text-xs font-black text-white" style={{ ...mono, letterSpacing: "var(--tracking-xs)" }}>
              RYNEX
            </span>
            <span className="text-xs font-medium text-white/50" style={{ ...mono, letterSpacing: "var(--tracking-xs)" }}>
              LABS
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden lg:flex flex-1 w-6/12 justify-center">
          <ul className="flex gap-8">
            {NAV_LINKS.map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  className="text-white/60 hover:text-white transition-colors duration-200 text-xs font-medium"
                  style={{ ...mono, letterSpacing: "var(--tracking-xs)" }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:flex flex-1 w-3/12 justify-end">
          <Link href="/contact" className="pill-btn">
            Start a project <span className="opacity-50">→</span>
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="lg:hidden w-6 h-6 flex flex-col justify-center items-center gap-[5px] z-[1004]"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          <span
            className="block w-4 bg-white"
            style={{
              height: "1px",
              transform: menuOpen ? "rotate(45deg) translateY(5px)" : "none",
              transition: "transform 0.3s ease-in-out",
            }}
          />
          <span
            className="block w-4 bg-white"
            style={{
              height: "1px",
              opacity: menuOpen ? 0 : 1,
              transition: "opacity 0.3s ease-in-out",
            }}
          />
          <span
            className="block w-4 bg-white"
            style={{
              height: "1px",
              transform: menuOpen ? "rotate(-45deg) translateY(-5px)" : "none",
              transition: "transform 0.3s ease-in-out",
            }}
          />
        </button>
      </header>

      {/* ── Mobile fullscreen overlay ── */}
      <div
        className="fixed inset-0 z-[1002] lg:hidden flex flex-col justify-center items-center"
        style={{
          backdropFilter: menuOpen ? "blur(40px)" : "none",
          background: menuOpen ? "rgba(0,0,0,0.92)" : "transparent",
          opacity: menuOpen ? 1 : 0,
          pointerEvents: menuOpen ? "auto" : "none",
          transition: "opacity 0.4s cubic-bezier(0,0,.2,1), backdrop-filter 0.4s",
        }}
      >
        <button
          className="absolute top-6 right-4 w-11 h-11 flex items-center justify-center"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={18} className="text-white" />
        </button>

        <nav>
          <ul className="flex flex-col text-center">
            {NAV_LINKS.map((l, i) => (
              <li key={l.href} className="my-4">
                <Link
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-3xl font-light block hover:opacity-50 transition-opacity duration-200"
                  style={{
                    transform: menuOpen ? "translateY(0)" : "translateY(24px)",
                    opacity: menuOpen ? 1 : 0,
                    transition: `transform 0.5s cubic-bezier(0,0,.2,1) ${0.08 + i * 0.06}s, opacity 0.5s cubic-bezier(0,0,.2,1) ${0.08 + i * 0.06}s`,
                  }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className="absolute bottom-10"
          style={{
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.5s 0.38s, transform 0.5s 0.38s",
          }}
        >
          <Link href="/contact" className="pill-btn" onClick={() => setMenuOpen(false)}>
            Start a project
          </Link>
        </div>
      </div>
    </>
  );
}
