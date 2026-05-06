"use client";

import Link from "next/link";

const SITEMAP = [
  { label: "Work",     href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About",    href: "/#about" },
  { label: "Contact",  href: "/contact" },
];

const ELSEWHERE = [
  { label: "Instagram ↗", href: "https://www.instagram.com/ionvtpaul/", external: true },
  { label: "LinkedIn ↗",  href: "#" },
  { label: "GitHub ↗",   href: "#" },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top reveal">
        Rynex<em>Labs</em>
        <span style={{ color: "var(--orange)" }}>®</span>
      </div>

      <div className="footer-grid">
        <div>
          <h4>The studio</h4>
          <p>
            An independent design and engineering studio building websites,
            automations and search programs that compound.
          </p>
          <p style={{ marginTop: "14px" }}>
            <span className="status-dot" />
            Available Q2 / Q3 — 2026
          </p>
        </div>

        <div>
          <h4>Sitemap</h4>
          <ul>
            {SITEMAP.map((l) => (
              <li key={l.href}>
                <Link href={l.href} data-cursor="hover">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Elsewhere</h4>
          <ul>
            {ELSEWHERE.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  target={l.external ? "_blank" : undefined}
                  rel={l.external ? "noopener noreferrer" : undefined}
                  data-cursor="hover"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contact</h4>
          <ul>
            <li>
              <a href="mailto:hello@rynexlabs.ro" data-cursor="hover">
                hello@rynexlabs.ro
              </a>
            </li>
            <li>
              <a href="tel:0747202811" data-cursor="hover">
                0747 202 811
              </a>
            </li>
            <li>Iași, România</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2025–2026 Rynex Labs · All rights reserved</span>
        <span>Made in Iași 🜂</span>
      </div>
    </footer>
  );
}
