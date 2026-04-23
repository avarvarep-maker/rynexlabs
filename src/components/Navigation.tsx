"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { List, X, ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

const links = [
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-[oklch(0.955_0.015_82/0.95)] backdrop-blur-md border-b border-[var(--brand-amber-light)]/30 py-3"
            : "bg-transparent py-5"
        )}
      >
        <div className="container-wide px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-1 group"
          >
            <span className="font-display text-xl font-bold tracking-tight text-[var(--brand-espresso)]">
              Rynex
            </span>
            <span className="font-display text-xl font-light tracking-tight text-[var(--brand-amber)]">
              Labs
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-body text-sm font-medium transition-colors duration-200 relative group",
                  pathname === link.href
                    ? "text-[var(--brand-amber)]"
                    : "text-[var(--brand-warm-brown)] hover:text-[var(--brand-espresso)]"
                )}
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 h-px w-0 bg-[var(--brand-amber)] transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[var(--brand-espresso)] text-[var(--brand-cream)] font-body text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-200 hover:bg-[var(--brand-amber)] group"
            >
              Book a Call
              <ArrowRight size={14} weight="bold" className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full text-[var(--brand-espresso)] hover:bg-[var(--brand-surface)] transition-colors"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? <X size={22} weight="bold" /> : <List size={22} weight="bold" />}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-[var(--brand-espresso)]/40 backdrop-blur-sm md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[80vw] max-w-xs bg-[var(--brand-cream)] shadow-2xl md:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
                <span className="font-display text-lg font-bold text-[var(--brand-espresso)]">
                  Rynex<span className="text-[var(--brand-amber)]">Labs</span>
                </span>
                <button
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-[var(--brand-surface)] transition-colors"
                  aria-label="Close menu"
                >
                  <X size={20} weight="bold" className="text-[var(--brand-espresso)]" />
                </button>
              </div>

              <nav className="flex flex-col gap-1 p-4 flex-1">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                  >
                    <Link
                      href={link.href}
                      className={cn(
                        "flex items-center gap-3 px-4 py-4 rounded-xl font-body text-base font-medium transition-colors",
                        pathname === link.href
                          ? "bg-[var(--brand-amber)] text-[var(--brand-cream)]"
                          : "text-[var(--brand-espresso)] hover:bg-[var(--brand-surface)]"
                      )}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="p-6 border-t border-[var(--border)] space-y-3">
                <Link
                  href="/book"
                  className="flex items-center justify-center gap-2 w-full bg-[var(--brand-espresso)] text-[var(--brand-cream)] font-body font-semibold py-4 px-6 rounded-xl text-base transition-colors hover:bg-[var(--brand-amber)]"
                >
                  Book a Call
                  <ArrowRight size={18} weight="bold" />
                </Link>
                <a
                  href="tel:0747202811"
                  className="flex items-center justify-center gap-2 w-full border border-[var(--border)] text-[var(--brand-espresso)] font-body font-medium py-4 px-6 rounded-xl text-base transition-colors hover:bg-[var(--brand-surface)]"
                >
                  0747 202 811
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
