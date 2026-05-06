"use client";

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

export default function ServicesPage() {
  return (
    <main style={{ minHeight: "100vh", paddingTop: "120px" }}>
      <section className="section services-section">
        <div>
          <div className="section-head">
            <div>
              <span className="eyebrow" style={{ color: "rgba(10,10,10,.6)" }}>
                [ 03 — What we do ]
              </span>
              <h1
                className="section-title reveal"
                style={{ marginTop: "18px" }}
              >
                Four practices,{" "}
                <span className="serif-i">one studio.</span>
              </h1>
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

      <section className="cta-section">
        <h2 className="reveal">
          Let&apos;s build something <em>together.</em>
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
    </main>
  );
}
