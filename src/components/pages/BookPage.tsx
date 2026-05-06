"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import gsap from "gsap";

const schema = z.object({
  name:  z.string().min(2, "Minimum 2 characters"),
  email: z.string().email("Enter a valid email"),
  phone: z.string().optional(),
  topic: z.string().min(1, "Select a topic"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const timeSlots = ["09:00", "10:00", "11:00", "12:00", "14:00", "15:00", "16:00", "17:00", "18:00"];

const topics = [
  "I need a website",
  "I want to automate tasks in my business",
  "I need SEO help",
  "I have an existing site I want redesigned",
  "Not sure yet — just exploring",
];

const mono: React.CSSProperties = {
  fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
};

const inputCls =
  "w-full bg-transparent text-white text-sm pb-3 focus:outline-none placeholder:text-white/20 border-b border-white/15 focus:border-[var(--accent)] transition-colors duration-200";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        className="block text-xs uppercase mb-3"
        style={{ ...mono, letterSpacing: "var(--tracking-sm)", color: "rgba(255,255,255,0.45)" }}
      >
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs" style={{ ...mono, color: "var(--accent)" }}>{error}</p>}
    </div>
  );
}

export default function BookPage() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [done, setDone] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useLayoutEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    if (headingRef.current) tl.from(headingRef.current, { y: 40, opacity: 0, duration: 1.2 });
    if (contentRef.current) tl.from(contentRef.current, { y: 20, opacity: 0, duration: 0.8 }, "-=0.8");
    return () => { tl.kill(); };
  }, []);

  const today = new Date();
  const disabledDays = [
    { before: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1) },
  ];

  const onSubmit = async (data: FormData) => {
    if (!selectedDate || !selectedTime) {
      toast.error("Select a date and time first.");
      return;
    }
    setSubmitting(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          service: "booking",
          message: `Booking — ${selectedDate.toLocaleDateString("en-GB")} at ${selectedTime}\n\nTopic: ${data.topic}\n\nNotes: ${data.notes || "None"}`,
        }),
      });
      setDone(true);
    } catch {
      toast.error("Something went wrong. Call us: 0747 202 811");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-16 lg:py-24">

        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <p className="text-xs opacity-50 mb-4 uppercase" style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}>
            FREE CONSULTATION
          </p>
          <h1
            ref={headingRef}
            className="text-5xl lg:text-7xl font-light leading-none"
            style={mono}
          >
            Book a free call.
          </h1>
        </div>

        {done ? (
          /* Confirmation */
          <div
            className="max-w-lg"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            <div className="pt-12">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center mb-8"
                style={{ border: "1px solid var(--accent)", color: "var(--accent)" }}
              >
                <span style={{ fontSize: 16 }}>✓</span>
              </div>
              <p className="text-2xl lg:text-3xl font-light mb-4" style={mono}>
                We&apos;ve got your request.
              </p>
              <p className="text-sm leading-relaxed mb-2" style={{ ...mono, color: "rgba(255,255,255,0.55)" }}>
                We&apos;ll confirm your slot at{" "}
                <span style={{ color: "var(--accent)" }}>
                  {selectedDate?.toLocaleDateString("en-GB")} — {selectedTime}
                </span>{" "}
                by email within a few hours.
              </p>
              <p className="text-sm" style={{ ...mono, color: "rgba(255,255,255,0.4)" }}>
                Can&apos;t wait?{" "}
                <a href="tel:0747202811" className="hover:opacity-70 transition-opacity" style={{ color: "var(--accent)" }}>
                  0747 202 811
                </a>
              </p>
            </div>
          </div>
        ) : (
          <div
            ref={contentRef}
            className="grid lg:grid-cols-2 gap-16 lg:gap-24"
            style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}
          >
            {/* Calendar column */}
            <div className="pt-10 lg:pt-12">
              <p
                className="text-xs uppercase mb-6 opacity-40"
                style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}
              >
                1 — Pick a date
              </p>

              {/* DayPicker with dark overrides */}
              <style>{`
                .rdp-dark {
                  --rdp-accent-color: var(--accent);
                  --rdp-accent-background-color: rgba(0,255,135,0.12);
                  --rdp-background-color: rgba(0,255,135,0.06);
                  color: rgba(255,255,255,0.85);
                  font-family: var(--font-dm-mono, 'DM Mono', monospace);
                  font-size: 12px;
                }
                .rdp-dark .rdp-day_button { color: rgba(255,255,255,0.75); }
                .rdp-dark .rdp-day_button:hover { background: rgba(0,255,135,0.1); color: #fff; }
                .rdp-dark .rdp-selected .rdp-day_button { background: var(--accent); color: #000; }
                .rdp-dark .rdp-today .rdp-day_button { color: var(--accent); font-weight: 600; }
                .rdp-dark .rdp-disabled .rdp-day_button { opacity: 0.2; }
                .rdp-dark .rdp-chevron { fill: rgba(255,255,255,0.5); }
                .rdp-dark .rdp-nav button:hover .rdp-chevron { fill: #fff; }
                .rdp-dark .rdp-weekday { color: rgba(255,255,255,0.3); font-size: 10px; letter-spacing: 0.08em; }
                .rdp-dark .rdp-caption_label { color: rgba(255,255,255,0.85); font-weight: 400; letter-spacing: 0.08em; font-size: 12px; }
              `}</style>

              <DayPicker
                className="rdp-dark"
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                disabled={disabledDays}
              />

              {selectedDate && (
                <div className="mt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
                  <p
                    className="text-xs uppercase mb-4 mt-6 opacity-40"
                    style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}
                  >
                    2 — Pick a time
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className="text-xs py-3 transition-colors duration-200"
                        style={{
                          ...mono,
                          border: selectedTime === time
                            ? "1px solid var(--accent)"
                            : "1px solid rgba(255,255,255,0.15)",
                          color: selectedTime === time ? "var(--accent)" : "rgba(255,255,255,0.6)",
                          background: selectedTime === time ? "rgba(0,255,135,0.06)" : "transparent",
                          minHeight: "44px",
                        }}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* What to expect */}
              <div className="mt-10 space-y-3" style={{ borderTop: "1px solid rgba(255,255,255,0.08)", paddingTop: "2rem" }}>
                {[
                  "30 minutes",
                  "Google Meet or phone",
                  "Call: 0747 202 811",
                ].map((item) => (
                  <p key={item} className="text-xs opacity-40" style={mono}>{item}</p>
                ))}
              </div>
            </div>

            {/* Form column */}
            <div className="pt-10 lg:pt-12">
              <p
                className="text-xs uppercase mb-6 opacity-40"
                style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}
              >
                3 — Your details
              </p>

              {selectedDate && selectedTime && (
                <div
                  className="mb-8 px-4 py-3 text-xs"
                  style={{
                    ...mono,
                    border: "1px solid var(--accent-border)",
                    color: "var(--accent)",
                    background: "var(--accent-dim)",
                  }}
                >
                  {selectedDate.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })} — {selectedTime}
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                <div className="grid sm:grid-cols-2 gap-8">
                  <Field label="Name *" error={errors.name?.message}>
                    <input {...register("name")} placeholder="Your name" className={inputCls} style={mono} autoComplete="name" />
                  </Field>
                  <Field label="Email *" error={errors.email?.message}>
                    <input {...register("email")} type="email" placeholder="your@email.com" className={inputCls} style={mono} autoComplete="email" />
                  </Field>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <Field label="Phone">
                    <input {...register("phone")} type="tel" placeholder="Optional" className={inputCls} style={mono} autoComplete="tel" />
                  </Field>
                  <Field label="Topic *" error={errors.topic?.message}>
                    <select
                      {...register("topic")}
                      className={inputCls}
                      style={{ ...mono, appearance: "none", cursor: "pointer", background: "transparent" }}
                    >
                      <option value="" style={{ background: "#111" }}>What do you want to talk about?</option>
                      {topics.map((t) => (
                        <option key={t} value={t} style={{ background: "#111" }}>{t}</option>
                      ))}
                    </select>
                  </Field>
                </div>

                <Field label="Anything to add? (optional)">
                  <textarea
                    {...register("notes")}
                    rows={4}
                    placeholder="Brief context about your business or project..."
                    className={inputCls + " resize-none"}
                    style={mono}
                  />
                </Field>

                <button
                  type="submit"
                  disabled={submitting || !selectedDate || !selectedTime}
                  className="pill-btn pill-btn-accent"
                  style={{ height: "44px", paddingLeft: "1.5rem", paddingRight: "1.5rem", opacity: (submitting || !selectedDate || !selectedTime) ? 0.4 : 1 }}
                >
                  {submitting ? "Sending..." : "Confirm booking →"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
