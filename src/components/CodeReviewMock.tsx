"use client";
import { motion } from "framer-motion";

export default function CodeReviewMock() {
  return (
    <div style={{ maxWidth: "560px", margin: "0 auto" }}>
      {/* PR header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-3 flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
      >
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "var(--green)" }} />
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate" style={{ color: "var(--text)" }}>
            feat/user-auth-refactor → main
          </p>
          <p className="text-xs" style={{ color: "var(--muted)" }}>PR #142 · opened 3 min ago</p>
        </div>
        <div className="flex items-center gap-1.5">
          <div
            className="w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
            style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", color: "#fff", fontFamily: "var(--font-syne), sans-serif" }}
          >
            AI
          </div>
          <span className="text-xs" style={{ color: "var(--text-dim)" }}>Rynex AI</span>
        </div>
      </motion.div>

      {/* Code diff */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.25 }}
        className="code-block mb-3"
      >
        <div
          className="flex items-center gap-2 px-4 py-2.5"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}
        >
          <div className="flex gap-1.5">
            {["#f43f5e55", "#f59e0b55", "#22c55e55"].map((c, i) => (
              <div key={i} className="w-2.5 h-2.5 rounded-full" style={{ background: c }} />
            ))}
          </div>
          <span className="text-xs ml-1" style={{ color: "#1e3a5a" }}>auth/utils.ts</span>
        </div>

        <div className="py-2">
          <div className="line">
            <span className="line-num">1</span>
            <span>
              <span className="code-keyword">export async function</span>{" "}
              <span className="code-fn">getUserById</span>
              (<span className="code-var">id</span>: <span className="code-keyword">string</span>) {"{"}
            </span>
          </div>
          <div className="line">
            <span className="line-num">2</span>
            <span>
              {"  "}<span className="code-keyword">const</span>{" "}
              <span className="code-var">q</span> ={" "}
              <span className="code-string">`SELECT * FROM users`</span>
            </span>
          </div>
          <div className="line hl-red">
            <span className="line-num">3</span>
            <span>
              {"  "}<span className="code-op">−</span>{"  "}
              <span className="code-string">{"`WHERE id = ${id}`"}</span>
            </span>
          </div>
          <div className="line hl-red">
            <span className="line-num">4</span>
            <span>
              {"  "}<span className="code-keyword">return</span>{" "}
              <span className="code-fn">db</span>.<span className="code-fn">raw</span>(<span className="code-var">q</span>)
            </span>
          </div>
          <div className="line hl-green">
            <span className="line-num">5</span>
            <span>
              {"  "}<span className="code-op">+</span>{"  "}
              <span className="code-keyword">return</span>{" "}
              <span className="code-fn">db</span>.<span className="code-fn">query</span>(
              <span className="code-string">"SELECT * FROM users WHERE id = ?"</span>,{" "}
              [<span className="code-var">id</span>])
            </span>
          </div>
          <div className="line">
            <span className="line-num">6</span>
            <span>{"}"}</span>
          </div>
        </div>
      </motion.div>

      {/* AI comment */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.75 }}
        className="mb-2"
        style={{
          background: "rgba(244,63,94,0.04)",
          border: "1px solid rgba(244,63,94,0.22)",
          borderRadius: "10px",
          padding: "14px 16px",
        }}
      >
        <div className="flex items-start gap-3">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-bold"
            style={{ background: "linear-gradient(135deg, #3b82f6, #8b5cf6)", color: "#fff", fontFamily: "var(--font-syne), sans-serif" }}
          >
            AI
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-xs font-semibold" style={{ color: "var(--text)" }}>Rynex AI</span>
              <span className="badge badge-critical">Critical · Security</span>
            </div>
            <p className="text-xs" style={{ color: "var(--text-dim)", lineHeight: 1.7 }}>
              <span style={{ color: "#fb7185", fontWeight: 600 }}>SQL Injection (CWE-89)</span> on lines 3–4.
              {" "}User input is concatenated directly into the query string — use parameterized queries as shown on line 5.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Status row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: 1.25 }}
        className="flex items-center gap-2"
      >
        <div
          className="flex-1 flex items-center justify-between px-3.5 py-2.5 rounded-lg"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <span className="text-xs" style={{ color: "var(--text-dim)" }}>1 critical · 0 warnings</span>
          <span
            className="text-xs font-semibold px-2 py-0.5 rounded"
            style={{ background: "rgba(244,63,94,0.12)", color: "#fb7185", border: "1px solid rgba(244,63,94,0.2)" }}
          >
            Block merge
          </span>
        </div>
        <div
          className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg flex-shrink-0"
          style={{ background: "var(--surface)", border: "1px solid var(--border)" }}
        >
          <div className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--green)" }} />
          <span className="text-xs font-medium" style={{ color: "var(--text-dim)" }}>0.8s</span>
        </div>
      </motion.div>
    </div>
  );
}
