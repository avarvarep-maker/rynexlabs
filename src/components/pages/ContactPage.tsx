"use client";

import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useState } from "react";
import {
  Phone,
  EnvelopeSimple,
  MapPinLine,
  Clock,
  InstagramLogo,
  ArrowRight,
  PaperPlaneRight,
} from "@phosphor-icons/react";

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().optional(),
  service: z.string().min(1, "Please select a service"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof schema>;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function ContactPage() {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error();
      toast.success("Message sent! We'll reply within 24 hours.");
      reset();
    } catch {
      toast.error("Something went wrong. Try calling us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <section className="pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="container-wide px-4 md:px-8">
          <motion.div
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.09 } } }}
            initial="hidden"
            animate="show"
          >
            <motion.p variants={fadeUp} className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-4">
              Get in touch
            </motion.p>
            <motion.h1 variants={fadeUp} className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-bold text-[var(--brand-espresso)] mb-4">
              Contact
            </motion.h1>
            <motion.p variants={fadeUp} className="font-body text-base text-[var(--brand-warm-brown)] max-w-lg">
              We reply within 24 hours on business days. Usually faster.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Content grid */}
      <section className="pb-20 md:pb-32">
        <div className="container-wide px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-3"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-xs font-semibold text-[var(--brand-espresso)] mb-1.5 block uppercase tracking-wide">
                      Name *
                    </label>
                    <input
                      {...register("name")}
                      placeholder="Your name"
                      className="w-full font-body text-sm bg-[var(--brand-surface)] border border-[var(--border)] rounded-xl px-4 py-4 text-[var(--brand-espresso)] placeholder:text-[var(--brand-warm-brown)]/50 focus:outline-none focus:border-[var(--brand-amber)] transition-colors min-h-[52px]"
                    />
                    {errors.name && (
                      <p className="font-body text-xs text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-[var(--brand-espresso)] mb-1.5 block uppercase tracking-wide">
                      Email *
                    </label>
                    <input
                      {...register("email")}
                      type="email"
                      placeholder="your@email.com"
                      className="w-full font-body text-sm bg-[var(--brand-surface)] border border-[var(--border)] rounded-xl px-4 py-4 text-[var(--brand-espresso)] placeholder:text-[var(--brand-warm-brown)]/50 focus:outline-none focus:border-[var(--brand-amber)] transition-colors min-h-[52px]"
                    />
                    {errors.email && (
                      <p className="font-body text-xs text-red-500 mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="font-body text-xs font-semibold text-[var(--brand-espresso)] mb-1.5 block uppercase tracking-wide">
                      Phone
                    </label>
                    <input
                      {...register("phone")}
                      type="tel"
                      placeholder="Optional"
                      className="w-full font-body text-sm bg-[var(--brand-surface)] border border-[var(--border)] rounded-xl px-4 py-4 text-[var(--brand-espresso)] placeholder:text-[var(--brand-warm-brown)]/50 focus:outline-none focus:border-[var(--brand-amber)] transition-colors min-h-[52px]"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs font-semibold text-[var(--brand-espresso)] mb-1.5 block uppercase tracking-wide">
                      Service *
                    </label>
                    <select
                      {...register("service")}
                      className="w-full font-body text-sm bg-[var(--brand-surface)] border border-[var(--border)] rounded-xl px-4 py-4 text-[var(--brand-espresso)] focus:outline-none focus:border-[var(--brand-amber)] transition-colors min-h-[52px] appearance-none"
                    >
                      <option value="">Select a service</option>
                      <option value="web">Web Design & Development</option>
                      <option value="automation">AI Automation</option>
                      <option value="seo">SEO & Growth</option>
                      <option value="other">Not sure yet</option>
                    </select>
                    {errors.service && (
                      <p className="font-body text-xs text-red-500 mt-1">{errors.service.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="font-body text-xs font-semibold text-[var(--brand-espresso)] mb-1.5 block uppercase tracking-wide">
                    Message *
                  </label>
                  <textarea
                    {...register("message")}
                    rows={5}
                    placeholder="Tell us a bit about your project or what you need..."
                    className="w-full font-body text-sm bg-[var(--brand-surface)] border border-[var(--border)] rounded-xl px-4 py-4 text-[var(--brand-espresso)] placeholder:text-[var(--brand-warm-brown)]/50 focus:outline-none focus:border-[var(--brand-amber)] transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="font-body text-xs text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center gap-2 bg-[var(--brand-espresso)] text-[var(--brand-cream)] font-body font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:bg-[var(--brand-amber)] disabled:opacity-60 disabled:cursor-not-allowed w-full sm:w-auto min-h-[52px] group"
                >
                  {submitting ? "Sending..." : "Send message"}
                  <PaperPlaneRight size={18} weight="bold" className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </form>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-2 space-y-8"
            >
              {/* Contact details */}
              <div className="bg-[var(--brand-surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8 space-y-5">
                <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)]">
                  Direct contact
                </p>
                <a
                  href="tel:0747202811"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-amber)]/10 flex items-center justify-center shrink-0">
                    <Phone size={18} weight="light" className="text-[var(--brand-amber)]" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-[var(--brand-warm-brown)]">Phone</p>
                    <p className="font-body text-sm font-semibold text-[var(--brand-espresso)] group-hover:text-[var(--brand-amber)] transition-colors">
                      0747 202 811
                    </p>
                  </div>
                </a>
                <a
                  href="mailto:avarvarep@gmail.com"
                  className="flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-amber)]/10 flex items-center justify-center shrink-0">
                    <EnvelopeSimple size={18} weight="light" className="text-[var(--brand-amber)]" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-[var(--brand-warm-brown)]">Email</p>
                    <p className="font-body text-sm font-semibold text-[var(--brand-espresso)] group-hover:text-[var(--brand-amber)] transition-colors">
                      avarvarep@gmail.com
                    </p>
                  </div>
                </a>
                <a
                  href="https://www.google.com/maps/place/Mall+Moldova/@47.1671638,27.4743176,13z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-amber)]/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPinLine size={18} weight="light" className="text-[var(--brand-amber)]" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-[var(--brand-warm-brown)]">Location</p>
                    <p className="font-body text-sm font-semibold text-[var(--brand-espresso)] group-hover:text-[var(--brand-amber)] transition-colors">
                      Iași, Romania
                    </p>
                  </div>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-amber)]/10 flex items-center justify-center shrink-0">
                    <Clock size={18} weight="light" className="text-[var(--brand-amber)]" />
                  </div>
                  <div>
                    <p className="font-body text-xs text-[var(--brand-warm-brown)]">Hours</p>
                    <p className="font-body text-sm font-semibold text-[var(--brand-espresso)]">
                      Mon–Sun, 8:00–20:00
                    </p>
                  </div>
                </div>
              </div>

              {/* Social */}
              <div className="bg-[var(--brand-surface)] border border-[var(--border)] rounded-2xl p-6">
                <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-4">
                  Follow us
                </p>
                <a
                  href="https://www.instagram.com/ionvtpaul/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[var(--brand-amber)]/10 flex items-center justify-center">
                    <InstagramLogo size={20} weight="regular" className="text-[var(--brand-amber)]" />
                  </div>
                  <div>
                    <p className="font-body text-sm font-semibold text-[var(--brand-espresso)] group-hover:text-[var(--brand-amber)] transition-colors">
                      @ionvtpaul
                    </p>
                    <p className="font-body text-xs text-[var(--brand-warm-brown)]">Instagram</p>
                  </div>
                </a>
              </div>

              {/* Maps embed */}
              <div className="rounded-2xl overflow-hidden border border-[var(--border)] aspect-video">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d44456.6!2d27.474318!3d47.167164!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40cae4c97b7a29e1%3A0xaf41cbbbb78d6201!2sMall%20Moldova!5e0!3m2!1sen!2sro!4v1"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="RynexLabs location"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
