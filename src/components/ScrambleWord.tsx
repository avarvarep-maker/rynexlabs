"use client";

import { useCallback, useRef, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

interface Props {
  children: React.ReactNode;
  text?: string;
  className?: string;
  "data-cursor"?: string;
  "data-cursor-label"?: string;
}

export default function ScrambleWord({ children, text, className, ...rest }: Props) {
  const [scrambled, setScrambled] = useState<string | null>(null);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const spanRef = useRef<HTMLSpanElement>(null);

  const getPlainText = useCallback(() => {
    if (text) return text;
    if (typeof children === "string") return children;
    return spanRef.current?.textContent || "";
  }, [children, text]);

  const runScramble = useCallback(() => {
    if (activeRef.current) return;
    activeRef.current = true;

    const plain = getPlainText();
    const TOTAL = 18;
    const chars = plain.split("");
    const starts = chars.map(() => Math.floor(Math.random() * TOTAL * 0.4));
    const ends = chars.map((_, i) =>
      Math.floor(starts[i] + Math.random() * (TOTAL - starts[i]) * 0.7 + TOTAL * 0.3)
    );
    let frame = 0;

    const tick = () => {
      if (!activeRef.current) return;
      const result = chars.map((ch, i) => {
        if (frame < starts[i]) return ch;
        if (frame >= ends[i]) return ch;
        if (Math.random() < 0.28) return CHARS[Math.floor(Math.random() * CHARS.length)];
        return ch;
      });
      setScrambled(result.join(""));
      frame++;
      if (frame <= TOTAL) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setScrambled(null);
        activeRef.current = false;
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [getPlainText]);

  const stopScramble = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    activeRef.current = false;
    setScrambled(null);
  }, []);

  return (
    <span
      ref={spanRef}
      className={`word-scramble${scrambled ? " scrambling" : ""}${className ? ` ${className}` : ""}`}
      onMouseEnter={runScramble}
      onMouseLeave={stopScramble}
      {...rest}
    >
      {scrambled !== null ? scrambled : children}
    </span>
  );
}
