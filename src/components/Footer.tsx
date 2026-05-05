"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const mono: React.CSSProperties = {
  fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
};

export default function Footer() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <footer className="bg-black page-layer" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <Link href="/" className="flex gap-2 items-center hover:opacity-70 transition-opacity duration-300">
            <span className="text-xs font-black text-white" style={{ ...mono, letterSpacing: "var(--tracking-xs)" }}>RYNEX</span>
            <span className="text-xs font-medium" style={{ ...mono, letterSpacing: "var(--tracking-xs)", color: "rgba(255,255,255,0.5)" }}>LABS</span>
          </Link>

          <nav className="flex flex-wrap gap-6">
            {[["Services", "/services"], ["Contact", "/contact"], ["Blog", "/blog"]].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className="text-xs transition-colors duration-200 hover:text-white"
                style={{ ...mono, letterSpacing: "var(--tracking-xs)", color: "rgba(255,255,255,0.5)" }}
              >
                {label}
              </Link>
            ))}
          </nav>

          <p className="text-xs" style={{ ...mono, letterSpacing: "var(--tracking-xs)", color: "rgba(255,255,255,0.3)" }}>
            IAȘI, ROMANIA
          </p>
        </div>

        <div
          className="mt-8 pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs" style={{ ...mono, letterSpacing: "var(--tracking-xs)", color: "rgba(255,255,255,0.25)" }}>
            © {new Date().getFullYear()} RYNEX LABS
          </p>
          <a
            href="mailto:avarvarep@gmail.com"
            className="text-xs transition-colors duration-200 hover:text-white/50"
            style={{ ...mono, letterSpacing: "var(--tracking-xs)", color: "rgba(255,255,255,0.25)" }}
          >
            avarvarep@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
