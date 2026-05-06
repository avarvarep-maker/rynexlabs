"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

function LiveClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const fmt = new Intl.DateTimeFormat("en-US", {
        timeZone: "Europe/Bucharest",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      });
      setTime(fmt.format(now) + " ROM");
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return <span className="val">{time || "— : —"}</span>;
}

const SERVICES = [
  {
    num: "— 01",
    title: <>Web design <em>&amp; build</em></>,
    desc: "Editorial websites and conversion-tuned landing pages. Custom design, fast static builds, CMS-driven where it matters.",
    tags: ["Design", "Webflow", "Next.js", "Shopify", "CMS"],
  },
  {
    num: "— 02",
    title: <>AI <em>automation</em></>,
    desc: "We replace your spreadsheets, manual handoffs and inbox triage with quiet, reliable AI agents that run in the background.",
    tags: ["Workflows", "Agents", "CRM", "Inbox", "RAG"],
  },
  {
    num: "— 03",
    title: <>SEO <em>&amp; visibility</em></>,
    desc: "Technical, content and local SEO programs. The unsexy, compounding work that gets your business found by the right people.",
    tags: ["Audits", "Content", "Local", "Linking", "GEO/AI"],
  },
  {
    num: "— 04",
    title: <>Brand <em>systems</em></>,
    desc: "Identity, voice, and design systems engineered to scale. Built so your team can ship without us in the room.",
    tags: ["Identity", "Voice", "Tokens", "Components", "Guidelines"],
  },
];

const PROCESS = [
  {
    step: "— 01 / Discover",
    title: "Listen.",
    desc: "A week of interviews, audits, and competitor teardowns. We arrive at a written brief you can argue with.",
  },
  {
    step: "— 02 / Define",
    title: "Frame.",
    desc: "One narrative, one positioning, one measurable target. No deliverable ships until those three are agreed.",
  },
  {
    step: "— 03 / Make",
    title: "Build.",
    desc: "Design, code, content, automation — assembled in tight loops with weekly Loom walkthroughs.",
  },
  {
    step: "— 04 / Compound",
    title: "Grow.",
    desc: "A monthly retainer that keeps SEO, content and automations compounding long after launch.",
  },
];

function W({ children }: { children: React.ReactNode }) {
  return (
    <span className="word-hover" data-cursor="hover" data-cursor-label="coding">
      {children}
    </span>
  );
}

const MARQUEE_1 =
  "★ Build &nbsp;·&nbsp; Automate &nbsp;·&nbsp; Get found &nbsp;·&nbsp; Available Q2 2026 &nbsp;·&nbsp; Based in Iași &nbsp;·&nbsp; Working globally &nbsp;·&nbsp;";
const MARQUEE_2 =
  "★ Available Q2 2026 &nbsp;·&nbsp; Booking engagements &nbsp;·&nbsp; Based in Iași, working globally &nbsp;·&nbsp;";

export default function HomePage() {
  return (
    <>
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-grid" />

        <div className="hero-meta">
          <div className="col">
            <span className="label">[ 01 / Studio ]</span>
            <span className="val">Rynex Labs — Independent</span>
          </div>
          <div className="col" style={{ textAlign: "center" }}>
            <span className="label">[ N 47.1° / E 27.6° ]</span>
            <LiveClock />
          </div>
          <div className="col" style={{ textAlign: "right" }}>
            <span className="label">[ 2026 — Available ]</span>
            <span className="val">Booking Q2 / Q3</span>
          </div>
        </div>

        <h1 className="hero-headline">
          <span className="line line-reveal d1">
            <span>
              <W>We</W> <W>build</W>
            </span>
          </span>
          <span className="line line-reveal d2 indent">
            <span>
              <W><em className="accent">websites</em></W>, <W>automate</W>
            </span>
          </span>
          <span className="line line-reveal d3">
            <span>
              <W>workflows</W> &amp; <W>make</W>
            </span>
          </span>
          <span className="line line-reveal d4 indent">
            <span>
              <W>brands</W>{" "}
              <W><span className="strike">invisible</span></W>{" "}
              <W><em className="accent">found</em></W>.
            </span>
          </span>
        </h1>

        <div className="hero-bottom">
          <p className="lede reveal">
            <strong>Rynex Labs</strong> is a small studio building fast, considered
            websites, AI-powered automations and SEO programs that turn quiet
            businesses into ones customers can actually find.{" "}
            <span className="serif-i" style={{ color: "var(--orange)" }}>
              Strategy, design, code, search.
            </span>
          </p>

          <Link
            href="/contact"
            className="reel"
            data-cursor="hover"
            data-cursor-label="start"
            aria-label="Start a project"
          >
            <div className="reel-rotor">
              <svg viewBox="0 0 100 100">
                <defs>
                  <path
                    id="reelCircle"
                    d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                  />
                </defs>
                <text>
                  <textPath href="#reelCircle">
                    START A PROJECT · 2026 · START A PROJECT · 2026 ·{" "}
                  </textPath>
                </text>
              </svg>
            </div>
            <span className="play-tri" />
          </Link>
        </div>
      </section>

      {/* ── MARQUEE 1 (orange) ── */}
      <div className="marquee orange">
        <div
          className="marquee-track"
          style={{ color: "var(--ink)" }}
          dangerouslySetInnerHTML={{
            __html: `<span>${MARQUEE_1}</span><span>${MARQUEE_1}</span>`,
          }}
        />
      </div>

      {/* ── WORK ── */}
      <section className="section" id="work">
        <div className="section-head">
          <div>
            <span className="eyebrow">[ 02 — Selected work ]</span>
            <h2
              className="section-title reveal"
              style={{ marginTop: "18px" }}
            >
              Projects that <span className="serif-i">earn attention.</span>
            </h2>
          </div>
          <p className="meta reveal">
            A snapshot of recent engagements. Each one tied to a measurable
            outcome — traffic, leads, time saved, or all three.
          </p>
        </div>

        <div className="work-list">
          <div
            style={{
              padding: "72px 8px",
              textAlign: "center",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <p
              style={{
                fontFamily:
                  "var(--font-jetbrains, 'JetBrains Mono', monospace)",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--bone-dim)",
                marginBottom: "12px",
              }}
            >
              [ No case studies published yet ]
            </p>
            <p
              style={{
                fontSize: "16px",
                color: "var(--bone-dim)",
                maxWidth: "40ch",
                margin: "0 auto",
                lineHeight: 1.55,
              }}
            >
              Our first engagements are being documented. Come back soon —
              or{" "}
              <Link
                href="/contact"
                style={{
                  color: "var(--orange)",
                  textDecoration: "underline",
                  textUnderlineOffset: "3px",
                }}
              >
                start something with us.
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* ── MARQUEE 2 (dark) ── */}
      <div className="marquee">
        <div
          className="marquee-track"
          style={{ color: "var(--bone-dim)" }}
          dangerouslySetInnerHTML={{
            __html: `<span>${MARQUEE_2}</span><span>${MARQUEE_2}</span>`,
          }}
        />
      </div>

      {/* ── SERVICES ── */}
      <section className="section services-section" id="services">
        <div>
          <div className="section-head">
            <div>
              <span
                className="eyebrow"
                style={{ color: "rgba(10,10,10,.6)" }}
              >
                [ 03 — What we do ]
              </span>
              <h2
                className="section-title reveal"
                style={{ marginTop: "18px" }}
              >
                Four practices,{" "}
                <span className="serif-i">one studio.</span>
              </h2>
            </div>
            <p
              className="meta reveal"
              style={{ color: "rgba(10,10,10,.7)" }}
            >
              We don&apos;t sell deliverables — we sell outcomes. Pick the
              practice that fits, or combine them into a retainer.
            </p>
          </div>

          <div className="service-grid reveal-stagger">
            {SERVICES.map((s, i) => (
              <div key={i} className="service" data-cursor="hover">
                <div className="s-num">{s.num}</div>
                <div>
                  <h3 className="s-title">{s.title}</h3>
                  <p className="s-desc">{s.desc}</p>
                  <ul className="s-list">
                    {s.tags.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* Process */}
          <div
            className="section-head"
            style={{
              marginTop: "120px",
              borderColor: "rgba(10,10,10,.15)",
            }}
          >
            <div>
              <span
                className="eyebrow"
                style={{ color: "rgba(10,10,10,.6)" }}
              >
                [ Process ]
              </span>
              <h2
                className="section-title reveal"
                style={{
                  marginTop: "18px",
                  fontSize: "clamp(36px,4.5vw,72px)",
                }}
              >
                A four-step rhythm.
              </h2>
            </div>
          </div>

          <div
            className="process reveal-stagger"
            style={{
              borderColor: "rgba(10,10,10,.15)",
              background: "var(--bone)",
              color: "var(--ink)",
            }}
          >
            {PROCESS.map((p, i) => (
              <div
                key={i}
                className="step"
                data-cursor="hover"
                style={{
                  borderColor: "rgba(10,10,10,.15)",
                  ...(i === 3 ? { borderRight: 0 } : {}),
                }}
              >
                <div className="step-n">{p.step}</div>
                <div>
                  <h3>{p.title}</h3>
                  <p style={{ color: "rgba(10,10,10,.7)" }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section" id="about">
        <div className="section-head">
          <div>
            <span className="eyebrow">[ 04 — Studio ]</span>
            <h2
              className="section-title reveal"
              style={{ marginTop: "18px" }}
            >
              Craft meets <span className="serif-i">strategy.</span>
            </h2>
          </div>
          <p className="meta reveal">
            No account managers. No layered pricing. You talk to the people
            doing the work — every week, every project.
          </p>
        </div>

        <div className="about">
          <div className="about-copy">
            <h2 className="reveal">
              We&apos;re builders who think like <em>operators.</em>
            </h2>
            <p className="reveal">
              Rynex Labs sits at the intersection of design, engineering and
              growth. Based in Iași, we work with founders and businesses
              across Romania and internationally who want their online
              presence to actually perform.
            </p>
            <p className="reveal">
              We&apos;re a deliberate practice — not an agency with rotating
              freelancers. We say no to projects we can&apos;t serve properly
              so that when we say yes, we mean it.
            </p>
            <p className="reveal">
              If your homepage is collecting dust, your inbox is on fire, and
              your competitors are showing up first on Google — we should
              probably talk.
            </p>
          </div>

          <div className="about-side reveal-stagger">
            <div className="about-card">
              <div className="k">Principles</div>
              <div className="v">
                Make the <em>boring</em> parts beautiful. Ship in weeks, not
                quarters. Measure everything. Bill honestly.
              </div>
            </div>

            <div className="about-card">
              <div className="k">Based in</div>
              <div className="v">
                Iași, România — working with clients in Romania and{" "}
                <em>across Europe.</em>
              </div>
            </div>

            <div className="about-card">
              <div className="k">Get in touch</div>
              <div className="v">
                <a
                  href="mailto:hello@rynexlabs.ro"
                  style={{ color: "var(--orange)" }}
                >
                  hello@rynexlabs.ro
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="cta-section">
        <h2 className="reveal">
          Let&apos;s make you <em>findable.</em>
        </h2>
        <a
          href="mailto:hello@rynexlabs.ro"
          className="cta-btn reveal"
          data-cursor="hover"
          data-cursor-label="email"
        >
          hello@rynexlabs.ro
          <span className="arrow" />
        </a>
        <div
          style={{
            marginTop: "48px",
            fontFamily:
              "var(--font-jetbrains, 'JetBrains Mono', monospace)",
            fontSize: "11px",
            letterSpacing: "0.16em",
            textTransform: "uppercase",
            color: "rgba(10,10,10,.65)",
          }}
        >
          Or book a 30-min intro call · Reply within 24h
        </div>
      </section>
    </>
  );
}
