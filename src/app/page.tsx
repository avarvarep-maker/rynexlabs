"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  ArrowRight,
  Shield,
  Zap,
  GitPullRequest,
  BarChart2,
  CheckCircle,
  Lock,
  AlertTriangle,
  Clock,
} from "lucide-react";
import CodeReviewMock from "@/components/CodeReviewMock";

const EASE = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const fw = (delay = 0) => ({
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: EASE, delay },
});

const FEATURES = [
  {
    Icon: Shield,
    label: "Security scanning",
    title: "Catch vulnerabilities before they hit production",
    body: "Rynex scans every PR for SQL injection, XSS, SSRF, exposed secrets, and 80+ other vulnerability patterns. Not after the fact — as the PR is opened.",
    tags: ["SQL Injection", "XSS", "SSRF", "Exposed secrets", "CVE matching"],
  },
  {
    Icon: Zap,
    label: "Performance analysis",
    title: "Find the slow code before your users do",
    body: "N+1 queries, blocking I/O, excessive re-renders, memory leaks. Rynex spots the patterns that make your app crawl — and suggests the exact fix.",
    tags: ["N+1 queries", "Memory leaks", "Bundle size", "React perf"],
  },
  {
    Icon: GitPullRequest,
    label: "Smart suggestions",
    title: "Not just what's wrong — exactly how to fix it",
    body: "Every finding comes with a code-level fix suggestion. Copy, paste, done. No Stack Overflow, no guessing — the right answer, in your codebase's own style.",
    tags: ["Inline fixes", "Context-aware", "Your code style"],
  },
  {
    Icon: BarChart2,
    label: "Team analytics",
    title: "Track engineering quality over time",
    body: "PR velocity, review time, bug frequency, security debt. Give engineering managers the signal to make good decisions — not gut feelings.",
    tags: ["PR velocity", "Review time", "Bug trends", "Security debt"],
  },
];

const STEPS = [
  {
    num: "01",
    title: "Connect your repo",
    body: "Install the GitHub app. That's it. No config files, no YAML, no DevOps ticket. 2 minutes to live reviews.",
  },
  {
    num: "02",
    title: "AI reviews every PR",
    body: "The moment a PR opens, Rynex reads the diff, understands the context, and posts a structured review within seconds.",
  },
  {
    num: "03",
    title: "Merge with confidence",
    body: "Ship knowing security, performance, and correctness have been checked. Senior devs review edge cases — Rynex handles the rest.",
  },
];

const TESTIMONIALS = [
  {
    body: "Caught a SQL injection that had been live in our auth service for six months. The team was mortified. I was just glad we found it before a researcher did.",
    name: "Sarah Chen",
    role: "CTO",
    company: "QuantumStack",
    rating: 5,
  },
  {
    body: "PR review time went from 45 minutes average to 8. Senior engineers are writing code again instead of babysitting every junior PR.",
    name: "Marcus Weber",
    role: "Lead Engineer",
    company: "DevPilot",
    rating: 5,
  },
  {
    body: "40,000 reviews in 90 days. Maybe 3 false positives. That accuracy — no noisy alerts — is what made us renew without a second thought.",
    name: "Priya Nair",
    role: "VP Engineering",
    company: "NexusIO",
    rating: 5,
  },
];

const PRICING = [
  {
    name: "Starter",
    price: "Free",
    sub: "Forever free, no card needed",
    features: [
      "5 repositories",
      "50 PR reviews / month",
      "Public repos only",
      "Core security checks",
      "Community support",
    ],
    cta: "Start free",
    href: "/#pricing",
    featured: false,
  },
  {
    name: "Pro",
    price: "$49",
    sub: "per month",
    features: [
      "Unlimited repositories",
      "Unlimited PR reviews",
      "Public + private repos",
      "Full security suite",
      "Performance analysis",
      "Smart fix suggestions",
      "Priority support",
    ],
    cta: "Start Pro trial",
    href: "/#pricing",
    featured: true,
  },
  {
    name: "Team",
    price: "$149",
    sub: "per month",
    features: [
      "Everything in Pro",
      "Team analytics dashboard",
      "SSO / SAML",
      "Custom lint rules",
      "Dedicated Slack channel",
      "99.9% SLA",
      "SOC 2 report",
    ],
    cta: "Contact sales",
    href: "/contact",
    featured: false,
  },
];

const Star = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#f59e0b" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

export default function Home() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="film-grain relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 grid-bg" style={{ zIndex: 0 }} />
        <div
          className="absolute pointer-events-none"
          style={{
            top: "-10%",
            left: "20%",
            width: "600px",
            height: "600px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(59,130,246,0.13) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: "5%",
            right: "15%",
            width: "400px",
            height: "400px",
            borderRadius: "50%",
            background: "radial-gradient(ellipse, rgba(139,92,246,0.09) 0%, transparent 70%)",
            zIndex: 0,
          }}
        />

        <div className="max-w-6xl mx-auto px-5 w-full" style={{ position: "relative", zIndex: 2 }}>
          <div className="grid lg:grid-cols-[1fr_1.15fr] gap-12 xl:gap-16 items-center">
            {/* Left */}
            <div>
              <motion.div {...fw(0.05)} className="mb-5">
                <span className="section-label">Trusted by 2,400+ engineering teams</span>
              </motion.div>

              <motion.h1
                {...fw(0.1)}
                style={{
                  fontFamily: "var(--font-syne), sans-serif",
                  fontSize: "clamp(2.2rem, 5vw, 3.6rem)",
                  fontWeight: 800,
                  lineHeight: 1.08,
                  letterSpacing: "-0.02em",
                  color: "var(--text)",
                  marginBottom: "20px",
                }}
              >
                AI code review that catches what{" "}
                <span className="gradient-text">humans miss</span>
              </motion.h1>

              <motion.p
                {...fw(0.15)}
                style={{
                  color: "var(--text-dim)",
                  fontSize: "16px",
                  lineHeight: 1.75,
                  maxWidth: "420px",
                  marginBottom: "32px",
                }}
              >
                Every pull request, automatically reviewed for security vulnerabilities, performance issues, and bad patterns.
                Integrates with GitHub in 2 minutes.
              </motion.p>

              <motion.div {...fw(0.2)} className="flex flex-col sm:flex-row gap-3 mb-8">
                <Link
                  href="/#pricing"
                  className="btn-primary gap-2 px-6 py-3.5"
                  style={{ fontSize: "15px" }}
                >
                  Start free — no credit card
                  <ArrowRight size={15} />
                </Link>
                <Link
                  href="/#how-it-works"
                  className="btn-ghost gap-2 px-6 py-3.5"
                  style={{ fontSize: "15px", border: "1px solid var(--border-strong)" }}
                >
                  See how it works
                  <ArrowRight size={14} />
                </Link>
              </motion.div>

              <motion.div {...fw(0.25)} className="flex items-center flex-wrap gap-3">
                {["GitHub", "GitLab", "Bitbucket"].map((name) => (
                  <div
                    key={name}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md"
                    style={{
                      background: "var(--surface)",
                      border: "1px solid var(--border)",
                      color: "var(--text-dim)",
                      fontSize: "12px",
                      fontWeight: 500,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)" }} />
                    {name}
                  </div>
                ))}
                <span style={{ color: "var(--muted)", fontSize: "12px" }}>+ 3 more</span>
              </motion.div>
            </div>

            {/* Right — animated code mock */}
            <motion.div
              initial={{ opacity: 0, x: 28 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="hidden lg:block"
            >
              <CodeReviewMock />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRUST STRIP ── */}
      <div className="section-divider" />
      <div style={{ background: "var(--bg2)" }}>
        <div className="max-w-6xl mx-auto px-5 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p style={{ color: "var(--muted)", fontSize: "12px", fontWeight: 500, flexShrink: 0 }}>
              Loved by teams at
            </p>
            <div className="flex items-center gap-6 flex-wrap justify-center">
              {["Stripe", "Vercel", "Linear", "Resend", "Planetscale", "Clerk"].map((c) => (
                <span
                  key={c}
                  style={{ color: "var(--text-dim)", fontSize: "13px", fontWeight: 600, opacity: 0.45 }}
                >
                  {c}
                </span>
              ))}
            </div>
            <div className="flex items-center gap-1.5 flex-shrink-0">
              {[...Array(5)].map((_, i) => <Star key={i} />)}
              <span style={{ color: "var(--text-dim)", fontSize: "12px", fontWeight: 600, marginLeft: "4px" }}>
                4.9 on Product Hunt
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider" />

      {/* ── PROBLEM ── */}
      <section id="features" className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <motion.div {...fw()}>
            <span className="section-label">The problem</span>
          </motion.div>
          <motion.h2
            {...fw(0.05)}
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              color: "var(--text)",
              maxWidth: "580px",
              lineHeight: 1.18,
              marginBottom: "16px",
            }}
          >
            Manual code review is the last bottleneck
          </motion.h2>
          <motion.p
            {...fw(0.1)}
            style={{
              color: "var(--text-dim)",
              maxWidth: "460px",
              lineHeight: 1.75,
              fontSize: "15px",
              marginBottom: "52px",
            }}
          >
            Your team is fast. Your QA is automated. Your deploys are instant. Code review still takes an hour — and still misses the important stuff.
          </motion.p>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                Icon: AlertTriangle,
                color: "var(--red)",
                bg: "rgba(244,63,94,0.06)",
                border: "rgba(244,63,94,0.12)",
                title: "Bugs reach production",
                body: "52% of production incidents trace back to PRs that were reviewed — but approved. Humans are fast, not thorough.",
              },
              {
                Icon: Lock,
                color: "var(--amber)",
                bg: "rgba(245,158,11,0.06)",
                border: "rgba(245,158,11,0.12)",
                title: "Security holes stay hidden",
                body: "The average security vulnerability lives in a codebase for 6 months before discovery. Most start as a bad PR.",
              },
              {
                Icon: Clock,
                color: "var(--blue-bright)",
                bg: "rgba(59,130,246,0.06)",
                border: "rgba(59,130,246,0.12)",
                title: "Senior devs reviewing, not building",
                body: "Engineers spend 30% of their time on code review. That's 12 hours a week of your best people on work AI does better.",
              },
            ].map(({ Icon, color, bg, border, title, body }, i) => (
              <motion.div
                key={title}
                {...fw(i * 0.08)}
                className="feature-card p-6"
                style={{ background: bg, borderColor: border }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${color}20`, border: `1px solid ${color}25` }}
                >
                  <Icon size={20} strokeWidth={1.5} style={{ color }} />
                </div>
                <h3
                  className="font-semibold mb-2 text-base"
                  style={{ color: "var(--text)", fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {title}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-dim)", lineHeight: 1.7 }}>
                  {body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── HOW IT WORKS ── */}
      <section id="how-it-works" className="py-24" style={{ background: "var(--bg2)" }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-16">
            <motion.div {...fw()}>
              <span className="section-label">How it works</span>
            </motion.div>
            <motion.h2
              {...fw(0.05)}
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--text)",
                lineHeight: 1.18,
                marginTop: "4px",
              }}
            >
              Live in 2 minutes. No YAML required.
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {STEPS.map((step, i) => (
              <motion.div key={step.num} {...fw(i * 0.1)} className="relative">
                {i < STEPS.length - 1 && (
                  <div
                    className="absolute hidden md:block"
                    style={{
                      top: "22px",
                      left: "calc(50% + 30px)",
                      right: "-1rem",
                      height: "1px",
                      background: "var(--border-strong)",
                    }}
                  />
                )}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 font-bold"
                  style={{
                    background: "linear-gradient(135deg, rgba(59,130,246,0.15) 0%, rgba(139,92,246,0.15) 100%)",
                    border: "1px solid rgba(59,130,246,0.2)",
                    color: "var(--blue-bright)",
                    fontFamily: "var(--font-syne), sans-serif",
                    fontSize: "13px",
                  }}
                >
                  {step.num}
                </div>
                <h3
                  className="font-semibold mb-2 text-base"
                  style={{ color: "var(--text)", fontFamily: "var(--font-syne), sans-serif" }}
                >
                  {step.title}
                </h3>
                <p className="text-sm" style={{ color: "var(--text-dim)", lineHeight: 1.7 }}>
                  {step.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FEATURES ── */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <div className="mb-14">
            <motion.div {...fw()}>
              <span className="section-label">Features</span>
            </motion.div>
            <motion.h2
              {...fw(0.05)}
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--text)",
                maxWidth: "500px",
                lineHeight: 1.18,
                marginTop: "4px",
              }}
            >
              Everything your team needs. Nothing it doesn&apos;t.
            </motion.h2>
          </div>

          <div className="flex flex-col gap-4">
            {FEATURES.map(({ Icon, label, title, body, tags }, i) => (
              <motion.div
                key={title}
                {...fw(0.04)}
                className="feature-card p-6 grid md:grid-cols-[auto_1fr_auto] items-start gap-6"
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--surface2)", border: "1px solid var(--border-strong)" }}
                >
                  <Icon size={20} strokeWidth={1.5} style={{ color: "var(--blue-bright)" }} />
                </div>
                <div>
                  <p
                    className="text-xs font-semibold uppercase tracking-widest mb-1"
                    style={{ color: "var(--blue-bright)" }}
                  >
                    {label}
                  </p>
                  <h3
                    className="font-semibold text-base mb-2"
                    style={{ color: "var(--text)", fontFamily: "var(--font-syne), sans-serif" }}
                  >
                    {title}
                  </h3>
                  <p className="text-sm" style={{ color: "var(--text-dim)", lineHeight: 1.7, maxWidth: "480px" }}>
                    {body}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 md:justify-end" style={{ maxWidth: "220px" }}>
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md"
                      style={{
                        background: "var(--surface2)",
                        border: "1px solid var(--border)",
                        color: "var(--text-dim)",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── TESTIMONIALS ── */}
      <section className="py-24" style={{ background: "var(--bg2)" }}>
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <motion.div {...fw()}>
              <span className="section-label">Testimonials</span>
            </motion.div>
            <motion.h2
              {...fw(0.05)}
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--text)",
                lineHeight: 1.18,
                marginTop: "4px",
              }}
            >
              Teams who ship faster
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={t.name} {...fw(i * 0.08)} className="testimonial-card p-6">
                <div className="flex items-center gap-0.5 mb-4">
                  {[...Array(t.rating)].map((_, j) => <Star key={j} />)}
                </div>
                <p
                  className="text-sm mb-5"
                  style={{ color: "var(--text-dim)", lineHeight: 1.75, fontStyle: "italic" }}
                >
                  &ldquo;{t.body}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, var(--blue), var(--purple))",
                      color: "#fff",
                      fontFamily: "var(--font-syne), sans-serif",
                    }}
                  >
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "var(--text)" }}>{t.name}</p>
                    <p className="text-xs" style={{ color: "var(--muted)" }}>{t.role}, {t.company}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── PRICING ── */}
      <section id="pricing" className="py-24">
        <div className="max-w-6xl mx-auto px-5">
          <div className="text-center mb-14">
            <motion.div {...fw()}>
              <span className="section-label">Pricing</span>
            </motion.div>
            <motion.h2
              {...fw(0.05)}
              style={{
                fontFamily: "var(--font-syne), sans-serif",
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                fontWeight: 700,
                color: "var(--text)",
                lineHeight: 1.18,
                marginTop: "4px",
                marginBottom: "10px",
              }}
            >
              Start free. Scale when you&apos;re ready.
            </motion.h2>
            <motion.p {...fw(0.1)} style={{ color: "var(--text-dim)", fontSize: "14px" }}>
              No credit card required. Cancel anytime.
            </motion.p>
          </div>

          <div className="grid md:grid-cols-3 gap-5 items-start">
            {PRICING.map((plan, i) => (
              <motion.div
                key={plan.name}
                {...fw(i * 0.08)}
                className={`pricing-card p-7 ${plan.featured ? "featured" : ""}`}
              >
                {plan.featured && (
                  <div className="mb-4">
                    <span className="badge badge-blue">Most popular</span>
                  </div>
                )}
                <p
                  className="font-semibold mb-1 text-sm"
                  style={{
                    color: plan.featured ? "var(--blue-bright)" : "var(--text-dim)",
                    fontFamily: "var(--font-syne), sans-serif",
                  }}
                >
                  {plan.name}
                </p>
                <p
                  className="font-bold mb-0.5"
                  style={{
                    fontFamily: "var(--font-syne), sans-serif",
                    fontSize: "2.1rem",
                    color: "var(--text)",
                    lineHeight: 1.1,
                  }}
                >
                  {plan.price}
                </p>
                <p className="text-xs mb-6" style={{ color: "var(--muted)" }}>
                  {plan.sub}
                </p>

                <ul className="space-y-3 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-dim)" }}>
                      <CheckCircle size={15} strokeWidth={2} style={{ color: "var(--green)", flexShrink: 0, marginTop: "2px" }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`${plan.featured ? "btn-primary" : "btn-outline"} w-full py-3 text-sm gap-2`}
                >
                  {plan.cta}
                  <ArrowRight size={14} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── FINAL CTA ── */}
      <section className="py-28" style={{ background: "var(--bg2)" }}>
        <div className="max-w-6xl mx-auto px-5 text-center">
          <motion.div {...fw()}>
            <span className="section-label">Get started</span>
          </motion.div>
          <motion.h2
            {...fw(0.05)}
            style={{
              fontFamily: "var(--font-syne), sans-serif",
              fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
              fontWeight: 800,
              color: "var(--text)",
              lineHeight: 1.1,
              marginTop: "4px",
              marginBottom: "16px",
              letterSpacing: "-0.02em",
            }}
          >
            Ship faster starting today
          </motion.h2>
          <motion.p
            {...fw(0.1)}
            style={{
              color: "var(--text-dim)",
              fontSize: "16px",
              maxWidth: "420px",
              margin: "0 auto 32px",
              lineHeight: 1.75,
            }}
          >
            Join 2,400+ engineering teams who automatically review every pull request — without slowing down.
          </motion.p>
          <motion.div {...fw(0.15)} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/#pricing"
              className="btn-primary gap-2 px-7 py-3.5"
              style={{ fontSize: "15px" }}
            >
              Start free — no credit card
              <ArrowRight size={15} />
            </Link>
            <p style={{ color: "var(--muted)", fontSize: "13px" }}>
              2-minute setup · Cancel anytime
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
