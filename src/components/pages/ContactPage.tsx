"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
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

const mono: React.CSSProperties = {
  fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
};

function Field({
  label, error, children,
}: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label
        className="block text-xs uppercase mb-3"
        style={{ ...mono, letterSpacing: "var(--tracking-sm)", color: "rgba(255,255,255,0.45)" }}
      >
        {label}
      </label>
      {children}
      {error && (
        <p className="mt-1.5 text-xs" style={{ ...mono, color: "var(--accent)" }}>{error}</p>
      )}
    </div>
  );
}

const inputCls =
  "w-full bg-transparent text-white text-sm pb-3 focus:outline-none placeholder:text-white/20 border-b border-white/15 focus:border-[var(--accent)] transition-colors duration-200";

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useLayoutEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
    if (headingRef.current) tl.from(headingRef.current, { y: 40, opacity: 0, duration: 1.2 });
    if (formRef.current)    tl.from(formRef.current,    { y: 20, opacity: 0, duration: 0.8 }, "-=0.8");
    if (infoRef.current)    tl.from(infoRef.current,    { y: 20, opacity: 0, duration: 0.8 }, "-=0.7");
    return () => { tl.kill(); };
  }, []);

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
    <main className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-16 lg:py-24">

        {/* Header */}
        <div className="mb-16 lg:mb-20">
          <p className="text-xs uppercase mb-4" style={{ ...mono, letterSpacing: "var(--tracking-sm)", color: "rgba(255,255,255,0.45)" }}>
            CONTACT
          </p>
          <h1
            ref={headingRef}
            className="text-5xl lg:text-7xl font-light leading-none"
            style={mono}
          >
            Start a project.
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_220px] gap-16 lg:gap-24">

          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="grid sm:grid-cols-2 gap-10">
              <Field label="Name *" error={errors.name?.message}>
                <input {...register("name")} placeholder="Your name" className={inputCls} style={mono} autoComplete="name" />
              </Field>
              <Field label="Email *" error={errors.email?.message}>
                <input {...register("email")} type="email" placeholder="your@email.com" className={inputCls} style={mono} autoComplete="email" />
              </Field>
            </div>

            <div className="grid sm:grid-cols-2 gap-10">
              <Field label="Phone">
                <input {...register("phone")} type="tel" placeholder="Optional" className={inputCls} style={mono} autoComplete="tel" />
              </Field>
              <Field label="Service *" error={errors.service?.message}>
                <select
                  {...register("service")}
                  className={inputCls}
                  style={{ ...mono, appearance: "none", cursor: "pointer", background: "transparent" }}
                >
                  <option value=""   style={{ background: "#111" }}>Select a service</option>
                  <option value="web"       style={{ background: "#111" }}>Web Design & Development</option>
                  <option value="automation"style={{ background: "#111" }}>AI Automation</option>
                  <option value="seo"       style={{ background: "#111" }}>SEO & Growth</option>
                  <option value="strategy"  style={{ background: "#111" }}>Strategy & Consulting</option>
                  <option value="other"     style={{ background: "#111" }}>Not sure yet</option>
                </select>
              </Field>
            </div>

            <Field label="Message *" error={errors.message?.message}>
              <textarea
                {...register("message")}
                rows={5}
                placeholder="Tell us about your project..."
                className={inputCls + " resize-none"}
                style={mono}
              />
            </Field>

            <button
              type="submit"
              disabled={submitting}
              className="pill-btn pill-btn-accent"
              style={{ height: "44px", paddingLeft: "1.5rem", paddingRight: "1.5rem", opacity: submitting ? 0.6 : 1 }}
            >
              {submitting ? "Sending..." : "Send message →"}
            </button>
          </form>

          {/* Contact info */}
          <div ref={infoRef} className="space-y-8 pt-2">
            {[
              { label: "Email",    value: "avarvarep@gmail.com",           href: "mailto:avarvarep@gmail.com" },
              { label: "Phone",    value: "0747 202 811",                   href: "tel:0747202811" },
              { label: "Location", value: "Iași, Romania" },
              { label: "Hours",    value: "Mon–Sun, 08:00–20:00" },
              { label: "Instagram",value: "@ionvtpaul",                    href: "https://www.instagram.com/ionvtpaul/", external: true },
            ].map(({ label, value, href, external }) => (
              <div key={label}>
                <p className="text-xs uppercase mb-2" style={{ ...mono, letterSpacing: "var(--tracking-sm)", color: "rgba(255,255,255,0.4)" }}>
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="text-sm hover:opacity-60 transition-opacity duration-200"
                    style={{ ...mono, color: "rgba(255,255,255,0.85)" }}
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm" style={{ ...mono, color: "rgba(255,255,255,0.85)" }}>{value}</p>
                )}
              </div>
            ))}

            <div className="pt-8" style={{ borderTop: "1px solid rgba(255,255,255,0.08)" }}>
              <Link href="/services" className="text-xs hover:opacity-60 transition-opacity" style={{ ...mono, letterSpacing: "var(--tracking-xs)", color: "rgba(255,255,255,0.35)" }}>
                View our services →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
