"use client";

import { useEffect, useRef } from "react";

const CODE_LINES = [
  `<span class="com">// rynex-labs — boot sequence</span>`,
  `<span class="tag">&lt;!doctype</span> <span class="attr">html</span><span class="tag">&gt;</span>`,
  `<span class="tag">&lt;html</span> <span class="attr">lang</span>=<span class="str">"ro"</span> <span class="attr">data-theme</span>=<span class="str">"ink+orange"</span><span class="tag">&gt;</span>`,
  `  <span class="tag">&lt;head&gt;</span>`,
  `    <span class="tag">&lt;title&gt;</span><span class="text">Rynex Labs — Build. Automate. Get found.</span><span class="tag">&lt;/title&gt;</span>`,
  `    <span class="tag">&lt;meta</span> <span class="attr">name</span>=<span class="str">"studio"</span> <span class="attr">content</span>=<span class="str">"Rynex Labs · Iași"</span><span class="tag">/&gt;</span>`,
  `  <span class="tag">&lt;/head&gt;</span>`,
  `  <span class="tag">&lt;body&gt;</span>`,
  `    <span class="key">const</span> <span class="text">studio</span> = {`,
  `      <span class="attr">name</span>: <span class="str">"Rynex Labs"</span>,`,
  `      <span class="attr">services</span>: [<span class="str">"web"</span>, <span class="str">"ai"</span>, <span class="str">"seo"</span>, <span class="str">"brand"</span>],`,
  `      <span class="attr">mission</span>: <span class="str">"make quiet businesses findable."</span>`,
  `    };`,
  `    <span class="key">await</span> <span class="text">render</span>(<span class="text">studio</span>);`,
  `    <span class="com">// → handing off to live site...</span>`,
  `  <span class="tag">&lt;/body&gt;</span>`,
  `<span class="tag">&lt;/html&gt;</span>`,
];

function stripTags(s: string) {
  return s.replace(/<[^>]+>/g, "");
}

type Token = { type: "tag" | "char"; str: string };

function tokenize(html: string): Token[] {
  const out: Token[] = [];
  let i = 0;
  while (i < html.length) {
    if (html[i] === "<") {
      const end = html.indexOf(">", i);
      if (end === -1) break;
      out.push({ type: "tag", str: html.slice(i, end + 1) });
      i = end + 1;
    } else if (html[i] === "&") {
      const end = html.indexOf(";", i);
      if (end === -1) { out.push({ type: "char", str: html[i] }); i++; }
      else { out.push({ type: "char", str: html.slice(i, end + 1) }); i = end + 1; }
    } else {
      out.push({ type: "char", str: html[i] });
      i++;
    }
  }
  return out;
}

export default function Intro() {
  const introRef    = useRef<HTMLDivElement>(null);
  const codeRef     = useRef<HTMLDivElement>(null);
  const gutterRef   = useRef<HTMLDivElement>(null);
  const phaseRef    = useRef<HTMLSpanElement>(null);
  const countRef    = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLElement>(null);
  const pctRef      = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const intro    = introRef.current;
    const code     = codeRef.current;
    const gutter   = gutterRef.current;
    const phaseEl  = phaseRef.current;
    const countEl  = countRef.current;
    const progressEl = progressRef.current;
    const pctEl    = pctRef.current;
    if (!intro || !code || !gutter) return;

    document.body.classList.add("intro-active");

    const tokenizedLines = CODE_LINES.map(tokenize);
    const totalChars = CODE_LINES.reduce((s, l) => s + stripTags(l).length, 0);

    let lineIdx = 0;
    let tIdx = 0;
    let typedChars = 0;
    let renderedHTML = "";
    let currentLineHTML = "";
    let skipped = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    function updateGutter() {
      if (!gutter) return;
      let g = "";
      for (let i = 1; i <= lineIdx + 1; i++) g += `<span>${String(i).padStart(2, "0")}</span>`;
      gutter.innerHTML = g;
    }

    function updateProgress() {
      if (!progressEl || !pctEl || !countEl) return;
      const p = Math.min(100, Math.round((typedChars / totalChars) * 100));
      progressEl.style.width = p + "%";
      pctEl.textContent = p + "%";
      countEl.textContent = typedChars + " / " + totalChars;
    }

    function render() {
      if (!code) return;
      code.innerHTML = renderedHTML + currentLineHTML + '<span class="caret"></span>';
    }

    function finishTyping() {
      if (phaseEl) phaseEl.textContent = "Rendering";
      const t1 = setTimeout(() => {
        introRef.current?.classList.add("rendering");
        if (phaseEl) phaseEl.textContent = "Live preview";
        if (progressEl) progressEl.style.width = "100%";
        if (pctEl) pctEl.textContent = "100%";
        const t2 = setTimeout(() => {
          if (phaseEl) phaseEl.textContent = "Launching";
          introRef.current?.classList.add("zooming");
          const t3 = setTimeout(() => {
            introRef.current?.classList.add("fade-out");
            document.body.classList.remove("intro-active");
            const t4 = setTimeout(() => introRef.current?.remove(), 500);
            timers.push(t4);
          }, 900);
          timers.push(t3);
        }, 450);
        timers.push(t2);
      }, 150);
      timers.push(t1);
    }

    function typeStep() {
      if (skipped) return;
      if (lineIdx >= tokenizedLines.length) { finishTyping(); return; }

      const tokens = tokenizedLines[lineIdx];
      if (tIdx >= tokens.length) {
        renderedHTML += currentLineHTML + "\n";
        currentLineHTML = "";
        lineIdx++;
        tIdx = 0;
        updateGutter();
        render();
        const t = setTimeout(typeStep, 25);
        timers.push(t);
        return;
      }

      const tok = tokens[tIdx];
      currentLineHTML += tok.str;
      if (tok.type === "char") typedChars++;
      tIdx++;
      render();
      updateProgress();

      const delay = tok.type === "tag" ? 1 : Math.random() * 6 + 3;
      const t = setTimeout(typeStep, delay);
      timers.push(t);
    }

    function skipIntro() {
      if (skipped) return;
      skipped = true;
      timers.forEach(clearTimeout);
      introRef.current?.classList.add("fade-out");
      document.body.classList.remove("intro-active");
      setTimeout(() => introRef.current?.remove(), 600);
    }

    const skipBtn = intro.querySelector<HTMLButtonElement>(".intro-skip");
    skipBtn?.addEventListener("click", skipIntro);

    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") skipIntro(); };
    document.addEventListener("keydown", onKey);

    updateGutter();
    const initTimer = setTimeout(typeStep, 150);
    timers.push(initTimer);

    return () => {
      timers.forEach(clearTimeout);
      document.removeEventListener("keydown", onKey);
      document.body.classList.remove("intro-active");
    };
  }, []);

  return (
    <div className="intro" id="intro" ref={introRef}>
      {/* Title bar */}
      <div className="intro-bar">
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          <div className="lights">
            <span /><span /><span />
          </div>
          <span className="file"><b>rynex-labs.html</b> &nbsp;—&nbsp; /studio/build</span>
        </div>
        <div className="right">main · ⌥ ⌘ ↩ &nbsp;·&nbsp; build #042</div>
      </div>

      {/* Code body */}
      <div className="intro-body">
        <div className="intro-gutter" ref={gutterRef} />
        <div className="intro-code" ref={codeRef} />
        <div className="intro-render">
          <div className="intro-preview" id="introPreview">
            <div className="mini-site">
              <div className="mhead">
                <span className="mlogo">
                  <span className="d" />
                  Rynex Labs
                </span>
                <span className="mnav">
                  <span>01 Work</span>
                  <span>02 Services</span>
                  <span>03 About</span>
                  <span>04 Contact</span>
                </span>
                <span>⌥ ⌘ ↩</span>
              </div>
              <div className="mhero">
                We build <em>websites</em>,<br />
                automate workflows<br />
                &amp; make brands <em>found</em>.
              </div>
              <div className="mfoot">
                <span>
                  <span className="pulse" />
                  Available Q2 / Q3 — 2026
                </span>
                <span>Iași · 47.1° N</span>
                <span>Build OK ✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status bar */}
      <div className="intro-status">
        <div className="left">
          <span>
            <span className="pip" />
            <span ref={phaseRef}>Compiling</span>
          </span>
          <span ref={countRef}>0 / 0</span>
        </div>
        <div className="left">
          <span className="progress">
            <i ref={progressRef} />
          </span>
          <span ref={pctRef}>0%</span>
        </div>
      </div>

      <button className="intro-skip">Skip intro →</button>
    </div>
  );
}
