"use client";

import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

const schema = z.object({
  name: z.string().min(2, "At least 2 characters"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  service: z.string().min(1, "Select a service"),
  message: z.string().min(10, "At least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const mono: React.CSSProperties = {
  fontFamily: "var(--font-dm-mono, 'DM Mono', monospace)",
};

const inputBase: React.CSSProperties = {
  ...mono,
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(255,255,255,0.2)",
  color: "#fff",
  fontSize: "0.875rem",
  width: "100%",
  paddingBottom: "0.75rem",
  outline: "none",
  transition: "border-color 0.2s",
};

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef    = useRef<HTMLFormElement>(null);
  const infoRef    = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  useLayoutEffect(() => {
    const tl = gsap.timeline();
    if (headingRef.current) tl.from(headingRef.current, { y: 40, opacity: 0, duration: 1.2, ease: "expo.out" });
    if (formRef.current) tl.from(formRef.current, { y: 20, opacity: 0, duration: 0.8, ease: "expo.out" }, "-=0.8");
    if (infoRef.current) tl.from(infoRef.current, { y: 20, opacity: 0, duration: 0.8, ease: "expo.out" }, "-=0.7");
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

  const focusBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderBottomColor = "var(--accent)";
  };
  const blurBorder = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.target.style.borderBottomColor = "rgba(255,255,255,0.2)";
  };

  return (
    <main className="min-h-screen bg-black text-white pt-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-10 py-16 lg:py-24">
        {/* Header */}
        <div className="mb-16 lg:mb-24">
          <p className="text-xs opacity-50 mb-4 uppercase" style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}>
            CONTACT
          </p>
          <h1 ref={headingRef} className="text-5xl lg:text-7xl font-light leading-none" style={mono}>
            Start a project.
          </h1>
        </div>

        <div className="grid lg:grid-cols-[1fr_220px] gap-16 lg:gap-24">
          {/* Form */}
          <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-10">
            <div className="grid sm:grid-cols-2 gap-10">
              <div>
                <label className="block text-xs mb-3 uppercase opacity-50" style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}>
                  Name *
                </label>
                <input {...register("name")} placeholder="Your name"
                  style={inputBase} onFocus={focusBorder} onBlur={blurBorder}
                />
                {errors.name && <p className="mt-1 text-xs" style={{ ...mono, color: "var(--accent)" }}>{errors.name.message}</p>}
              </div>
              <div>
                <label className="block text-xs mb-3 uppercase opacity-50" style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}>
                  Email *
                </label>
                <input {...register("email")} type="email" placeholder="your@email.com"
                  style={inputBase} onFocus={focusBorder} onBlur={blurBorder}
                />
                {errors.email && <p className="mt-1 text-xs" style={{ ...mono, color: "var(--accent)" }}>{errors.email.message}</p>}
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-10">
              <div>
                <label className="block text-xs mb-3 uppercase opacity-50" style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}>
                  Phone
                </label>
                <input {...register("phone")} type="tel" placeholder="Optional"
                  style={inputBase} onFocus={focusBorder} onBlur={blurBorder}
                />
              </div>
              <div>
                <label className="block text-xs mb-3 uppercase opacity-50" style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}>
                  Service *
                </label>
                <select {...register("service")}
                  style={{ ...inputBase, cursor: "pointer", appearance: "none" as const }}
                  onFocus={focusBorder} onBlur={blurBorder}
                >
                  <option value="" style={{ background: "#000" }}>Select a service</option>
                  <option value="web" style={{ background: "#000" }}>Web Design & Development</option>
                  <option value="automation" style={{ background: "#000" }}>AI Automation</option>
                  <option value="seo" style={{ background: "#000" }}>SEO & Growth</option>
                  <option value="strategy" style={{ background: "#000" }}>Strategy & Consulting</option>
                  <option value="other" style={{ background: "#000" }}>Not sure yet</option>
                </select>
                {errors.service && <p className="mt-1 text-xs" style={{ ...mono, color: "var(--accent)" }}>{errors.service.message}</p>}
              </div>
            </div>

            <div>
              <label className="block text-xs mb-3 uppercase opacity-50" style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}>
                Message *
              </label>
              <textarea {...register("message")} rows={4} placeholder="Tell us about your project..."
                style={{ ...inputBase, resize: "none" }} onFocus={focusBorder} onBlur={blurBorder}
              />
              {errors.message && <p className="mt-1 text-xs" style={{ ...mono, color: "var(--accent)" }}>{errors.message.message}</p>}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="pill-btn pill-btn-accent"
              style={{ height: "44px", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}
            >
              {submitting ? "Sending..." : "Send message →"}
            </button>
          </form>

          {/* Contact info */}
          <div ref={infoRef} className="space-y-8">
            {[
              { label: "Email", value: "avarvarep@gmail.com", href: "mailto:avarvarep@gmail.com" },
              { label: "Phone", value: "0747 202 811", href: "tel:0747202811" },
              { label: "Location", value: "Iași, Romania", href: undefined },
              { label: "Hours", value: "Mon–Sun, 08:00–20:00", href: undefined },
              { label: "Instagram", value: "@ionvtpaul", href: "https://www.instagram.com/ionvtpaul/" },
            ].map(({ label, value, href }) => (
              <div key={label}>
                <p className="text-xs opacity-50 mb-2 uppercase" style={{ ...mono, letterSpacing: "var(--tracking-sm)" }}>
                  {label}
                </p>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-sm hover:opacity-70 transition-opacity duration-200"
                    style={mono}
                  >
                    {value}
                  </a>
                ) : (
                  <p className="text-sm opacity-80" style={mono}>{value}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
