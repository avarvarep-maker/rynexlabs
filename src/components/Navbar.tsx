"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";

const NAV_LINKS = [
  { num: "01", label: "Work",     href: "/work" },
  { num: "02", label: "Services", href: "/services" },
  { num: "03", label: "About",    href: "/#about" },
  { num: "04", label: "Contact",  href: "/contact" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => { setMenuOpen(false); }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      {/* Desktop nav */}
      <nav className="nav" data-cursor="hover">
        <Link href="/" className="logo" data-cursor-label="home">
          <span className="logo-mark" />
          <span>Rynex Labs</span>
        </Link>

        <div className="nav-links">
          {NAV_LINKS.map((l) => (
            <Link key={l.href} href={l.href} data-cursor-label="view">
              <span className="num">{l.num}</span>
              <span>{l.label}</span>
            </Link>
          ))}
        </div>

        <Link href="/contact" className="nav-cta" data-cursor-label="book">
          <span className="dot" />
          Book a call
        </Link>
      </nav>

      {/* Mobile burger */}
      <button
        className={`nav-burger${menuOpen ? " open" : ""}`}
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>

      {/* Mobile overlay */}
      <div className={`mobile-overlay${menuOpen ? " open" : ""}`}>
        <button
          className="mobile-overlay-close"
          onClick={() => setMenuOpen(false)}
          aria-label="Close menu"
        >
          <X size={18} color="var(--bone)" />
        </button>

        <div className="mobile-nav-links">
          {NAV_LINKS.map((l, i) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMenuOpen(false)}
              style={{
                transform: menuOpen ? "translateY(0)" : "translateY(32px)",
                opacity: menuOpen ? 1 : 0,
                transition: `transform 0.5s cubic-bezier(0,0,.2,1) ${0.08 + i * 0.07}s, opacity 0.5s cubic-bezier(0,0,.2,1) ${0.08 + i * 0.07}s`,
              }}
            >
              <span className="num">{l.num}</span>
              {l.label}
            </Link>
          ))}
        </div>

        <Link
          href="/contact"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: "40px",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 24px",
            border: "1px solid var(--line-strong)",
            borderRadius: "999px",
            fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
            fontSize: "11px",
            textTransform: "uppercase" as const,
            letterSpacing: "0.12em",
            color: "var(--bone)",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.5s 0.38s, transform 0.5s 0.38s",
          }}
        >
          <span
            style={{
              width: "6px", height: "6px", borderRadius: "50%",
              background: "var(--orange)", display: "inline-block",
            }}
          />
          Book a call
        </Link>
      </div>
    </>
  );
}
