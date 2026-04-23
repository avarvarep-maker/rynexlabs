import Link from "next/link";
import {
  Phone,
  EnvelopeSimple,
  MapPinLine,
  Clock,
  InstagramLogo,
  ArrowRight,
} from "@phosphor-icons/react/dist/ssr";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Book a Call", href: "/book" },
];

const services = [
  { label: "Web Design", href: "/services#design" },
  { label: "Web Development", href: "/services#development" },
  { label: "AI Automation", href: "/services#automation" },
  { label: "SEO & Performance", href: "/services#seo" },
];

export default function Footer() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "RynexLabs",
    description: "Web design, development, and AI automation company based in Iași, Romania.",
    url: "https://rynexlabs.com",
    telephone: "+40747202811",
    email: "avarvarep@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Iași",
      addressRegion: "Iași",
      addressCountry: "RO",
    },
    openingHours: "Mo-Su 08:00-20:00",
    sameAs: ["https://www.instagram.com/ionvtpaul/"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <footer className="bg-[var(--brand-espresso)] text-[var(--brand-cream)]">
        {/* CTA band */}
        <div className="border-b border-white/10">
          <div className="container-wide px-4 md:px-8 py-12 md:py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-2">
                Ready to start?
              </p>
              <h2 className="font-display text-2xl md:text-3xl font-semibold leading-tight">
                Your business deserves<br className="hidden sm:block" /> a proper online presence.
              </h2>
            </div>
            <Link
              href="/book"
              className="inline-flex items-center gap-2 bg-[var(--brand-amber)] text-[var(--brand-cream)] font-body font-semibold px-7 py-4 rounded-full transition-all duration-200 hover:bg-opacity-90 shrink-0 group min-w-[44px] min-h-[44px]"
            >
              Book a free call
              <ArrowRight size={18} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="container-wide px-4 md:px-8 py-12 md:py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="inline-block mb-4">
              <span className="font-display text-2xl font-bold tracking-tight">
                Rynex<span className="text-[var(--brand-amber)]">Labs</span>
              </span>
            </Link>
            <p className="font-body text-sm text-white/60 leading-relaxed max-w-xs">
              We build websites and AI systems that put your business to work — even while you sleep.
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://www.instagram.com/ionvtpaul/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-10 h-10 rounded-full border border-white/15 text-white/60 hover:text-[var(--brand-amber)] hover:border-[var(--brand-amber)] transition-colors"
                aria-label="Instagram"
              >
                <InstagramLogo size={18} weight="regular" />
              </a>
            </div>
          </div>

          {/* Nav */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-4">
              Navigation
            </p>
            <ul className="space-y-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-4">
              Services
            </p>
            <ul className="space-y-3">
              {services.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="font-body text-sm text-white/60 hover:text-white transition-colors"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-4">
              Contact
            </p>
            <ul className="space-y-3">
              <li>
                <a
                  href="tel:0747202811"
                  className="flex items-center gap-2.5 font-body text-sm text-white/60 hover:text-white transition-colors group"
                >
                  <Phone size={16} weight="light" className="text-[var(--brand-amber)] shrink-0" />
                  0747 202 811
                </a>
              </li>
              <li>
                <a
                  href="mailto:avarvarep@gmail.com"
                  className="flex items-center gap-2.5 font-body text-sm text-white/60 hover:text-white transition-colors"
                >
                  <EnvelopeSimple size={16} weight="light" className="text-[var(--brand-amber)] shrink-0" />
                  avarvarep@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://www.google.com/maps/place/Mall+Moldova/@47.1671638,27.4743176,13z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2.5 font-body text-sm text-white/60 hover:text-white transition-colors"
                >
                  <MapPinLine size={16} weight="light" className="text-[var(--brand-amber)] shrink-0 mt-0.5" />
                  Iași, Romania
                </a>
              </li>
              <li>
                <span className="flex items-center gap-2.5 font-body text-sm text-white/60">
                  <Clock size={16} weight="light" className="text-[var(--brand-amber)] shrink-0" />
                  Mon–Sun, 8:00–20:00
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/10">
          <div className="container-wide px-4 md:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-body text-xs text-white/40">
              © {new Date().getFullYear()} RynexLabs. All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              <Link href="/privacy" className="font-body text-xs text-white/40 hover:text-white/70 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="font-body text-xs text-white/40 hover:text-white/70 transition-colors">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
