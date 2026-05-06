"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import Link from "next/link";

const schema = z.object({
  name:    z.string().min(2, "Minimum 2 characters"),
  email:   z.string().email("Enter a valid email"),
  phone:   z.string().optional(),
  service: z.string().min(1, "Select a service"),
  message: z.string().min(10, "Minimum 10 characters"),
});

type FormData = z.infer<typeof schema>;

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Message sent. We'll reply within 24h.");
      reset();
    } catch {
      toast.error("Something went wrong. Try calling us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="contact-page">
      <span className="eyebrow" style={{ marginBottom: "32px" }}>
        [ 04 — Contact ]
      </span>
      <h1
        className="section-title reveal"
        style={{ marginTop: "16px", marginBottom: "8px" }}
      >
        Let&apos;s make you <span className="serif-i">findable.</span>
      </h1>
      <p className="reveal" style={{ color: "var(--bone-dim)", fontSize: "16px", maxWidth: "48ch", marginTop: "16px" }}>
        Tell us what you&apos;re building. We&apos;ll reply within 24 hours.
      </p>

      <div className="contact-form-grid">
        {/* Form */}
        <form className="contact-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-field">
            <label>Name *</label>
            <input
              {...register("name")}
              placeholder="Your name"
              autoComplete="name"
            />
            {errors.name && (
              <span style={{ color: "var(--orange)", fontSize: "12px", fontFamily: "var(--font-jetbrains, monospace)" }}>
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="form-field">
            <label>Email *</label>
            <input
              {...register("email")}
              type="email"
              placeholder="your@email.com"
              autoComplete="email"
            />
            {errors.email && (
              <span style={{ color: "var(--orange)", fontSize: "12px", fontFamily: "var(--font-jetbrains, monospace)" }}>
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="form-field">
            <label>Phone</label>
            <input
              {...register("phone")}
              type="tel"
              placeholder="Optional"
              autoComplete="tel"
            />
          </div>

          <div className="form-field">
            <label>Service *</label>
            <select {...register("service")}>
              <option value="">Select a service</option>
              <option value="web">Web Design &amp; Development</option>
              <option value="automation">AI Automation</option>
              <option value="seo">SEO &amp; Growth</option>
              <option value="brand">Brand Systems</option>
              <option value="other">Not sure yet</option>
            </select>
            {errors.service && (
              <span style={{ color: "var(--orange)", fontSize: "12px", fontFamily: "var(--font-jetbrains, monospace)" }}>
                {errors.service.message}
              </span>
            )}
          </div>

          <div className="form-field">
            <label>Message *</label>
            <textarea
              {...register("message")}
              rows={5}
              placeholder="Tell us about your project..."
            />
            {errors.message && (
              <span style={{ color: "var(--orange)", fontSize: "12px", fontFamily: "var(--font-jetbrains, monospace)" }}>
                {errors.message.message}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="submit-btn"
          >
            {submitting ? "Sending..." : "Send message →"}
          </button>
        </form>

        {/* Aside */}
        <div className="contact-aside">
          <div className="contact-info-block">
            <div className="k">Email</div>
            <div className="v">
              <a href="mailto:hello@rynexlabs.ro">hello@rynexlabs.ro</a>
            </div>
          </div>

          <div className="contact-info-block">
            <div className="k">Phone</div>
            <div className="v">
              <a href="tel:0747202811">0747 202 811</a>
            </div>
          </div>

          <div className="contact-info-block">
            <div className="k">Location</div>
            <div className="v">Iași, România</div>
          </div>

          <div className="contact-info-block">
            <div className="k">Hours</div>
            <div className="v">Mon–Fri, 09:00–18:00 ROM</div>
          </div>

          <div className="contact-info-block">
            <div className="k">Instagram</div>
            <div className="v">
              <a
                href="https://www.instagram.com/ionvtpaul/"
                target="_blank"
                rel="noopener noreferrer"
              >
                @ionvtpaul ↗
              </a>
            </div>
          </div>

          <div style={{ marginTop: "24px", paddingTop: "24px", borderTop: "1px solid var(--line)" }}>
            <Link
              href="/services"
              style={{
                fontFamily: "var(--font-jetbrains, 'JetBrains Mono', monospace)",
                fontSize: "11px",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: "var(--bone-dim)",
                transition: "color 0.2s",
              }}
            >
              View our services →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
