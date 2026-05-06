import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Selected projects from Rynex Labs — websites, AI automations, and SEO programs built for founders and businesses.",
};

export default function WorkPage() {
  return (
    <main style={{ minHeight: "100vh", paddingTop: "120px" }}>
      <section className="section">
        <div className="section-head">
          <div>
            <span className="eyebrow">[ 02 — Selected work ]</span>
            <h1 className="section-title reveal" style={{ marginTop: "18px" }}>
              Projects that <span className="serif-i">earn attention.</span>
            </h1>
          </div>
          <p className="meta reveal">
            A snapshot of recent engagements. Each one tied to a measurable
            outcome — traffic, leads, time saved, or all three.
          </p>
        </div>

        <div className="work-list">
          <div
            style={{
              padding: "96px 8px",
              textAlign: "center",
              borderTop: "1px solid var(--line)",
              borderBottom: "1px solid var(--line)",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.14em",
                color: "var(--bone-dim)",
                marginBottom: "16px",
              }}
            >
              [ No case studies published yet ]
            </p>
            <p
              style={{
                fontSize: "18px",
                color: "var(--bone-dim)",
                maxWidth: "40ch",
                margin: "0 auto 32px",
                lineHeight: 1.5,
              }}
            >
              Our first engagements are being documented.
              Come back soon — or start something with us.
            </p>
            <Link
              href="/contact"
              className="cta-btn"
              data-cursor="hover"
              data-cursor-label="start"
              style={{ display: "inline-flex", background: "var(--orange)", color: "var(--ink)" }}
            >
              Start a project
              <span className="arrow" style={{ borderColor: "var(--ink)" }} />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
