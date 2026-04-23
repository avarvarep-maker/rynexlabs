"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Check, Clock, Phone, VideoCamera } from "@phosphor-icons/react";

const schema = z.object({
  name: z.string().min(2, "Name required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  topic: z.string().min(1, "Please select a topic"),
  notes: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const timeSlots = [
  "09:00", "10:00", "11:00", "12:00",
  "14:00", "15:00", "16:00", "17:00", "18:00",
];

const topics = [
  "I need a website",
  "I want to automate tasks in my business",
  "I need SEO help",
  "I have an existing site I want redesigned",
  "Not sure yet — just exploring",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
};

export default function BookPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedTime, setSelectedTime] = useState<string>("");
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [submitting, setSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const today = new Date();
  const disabledDays = [
    { before: new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1) },
    { dayOfWeek: [0] }, // Sundays — closed (optional)
  ];

  const onSubmit = async (data: FormData) => {
    if (!selectedDate || !selectedTime) {
      toast.error("Please select a date and time.");
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
          message: `Booking request — Date: ${selectedDate.toLocaleDateString("en-GB")}, Time: ${selectedTime}\n\nTopic: ${data.topic}\n\nNotes: ${data.notes || "None"}`,
        }),
      });
      setStep(3);
    } catch {
      toast.error("Something went wrong. Call us directly: 0747 202 811");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="pt-32 pb-20 md:pt-40 md:pb-32">
      <div className="container-tight px-4 md:px-8">
        {/* Header */}
        <motion.div
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
          initial="hidden"
          animate="show"
          className="mb-12"
        >
          <motion.p variants={fadeUp} className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-4">
            Free consultation
          </motion.p>
          <motion.h1 variants={fadeUp} className="font-display text-[clamp(2.5rem,5vw,4rem)] font-bold text-[var(--brand-espresso)] mb-4">
            Book a free call
          </motion.h1>
          <motion.p variants={fadeUp} className="font-body text-base text-[var(--brand-warm-brown)] max-w-xl">
            30 minutes. No pitch. No pressure. We listen, ask some questions, and tell you honestly whether and how we can help.
          </motion.p>

          {/* What to expect */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mt-6">
            {[
              { icon: Clock, text: "30 minutes" },
              { icon: VideoCamera, text: "Google Meet or phone" },
              { icon: Phone, text: "Or call: 0747 202 811" },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2 bg-[var(--brand-surface)] border border-[var(--border)] rounded-full px-4 py-2">
                <Icon size={16} weight="light" className="text-[var(--brand-amber)]" />
                <span className="font-body text-sm text-[var(--brand-warm-brown)]">{text}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {step === 3 ? (
          /* Confirmation */
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[var(--brand-surface)] border border-[var(--border)] rounded-2xl p-8 md:p-12 text-center max-w-lg mx-auto"
          >
            <div className="w-16 h-16 rounded-full bg-[var(--brand-amber)]/15 flex items-center justify-center mx-auto mb-6">
              <Check size={32} weight="bold" className="text-[var(--brand-amber)]" />
            </div>
            <h2 className="font-display text-2xl font-bold text-[var(--brand-espresso)] mb-3">
              We&apos;ve got your request.
            </h2>
            <p className="font-body text-base text-[var(--brand-warm-brown)] leading-relaxed mb-2">
              We&apos;ll confirm your slot at{" "}
              <span className="font-semibold text-[var(--brand-espresso)]">
                {selectedDate?.toLocaleDateString("en-GB")} — {selectedTime}
              </span>{" "}
              by email within a few hours.
            </p>
            <p className="font-body text-sm text-[var(--brand-warm-brown)]">
              Can&apos;t wait? Call us at{" "}
              <a href="tel:0747202811" className="text-[var(--brand-amber)] font-semibold">
                0747 202 811
              </a>
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Calendar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="bg-[var(--brand-surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8"
            >
              <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-5">
                Pick a date
              </p>
              <DayPicker
                mode="single"
                selected={selectedDate}
                onSelect={(date) => { setSelectedDate(date); setStep(2); }}
                disabled={disabledDays}
                className="rdp-custom"
                classNames={{
                  root: "w-full",
                  months: "w-full",
                  month: "w-full",
                  table: "w-full",
                  head_cell: "font-body text-xs font-semibold text-[var(--brand-warm-brown)] uppercase pb-2",
                  cell: "p-0",
                  day: "w-10 h-10 font-body text-sm rounded-xl hover:bg-[var(--brand-amber)]/10 hover:text-[var(--brand-espresso)] transition-colors mx-auto flex items-center justify-center",
                  day_selected: "bg-[var(--brand-amber)] text-white hover:bg-[var(--brand-amber)]",
                  day_disabled: "text-[var(--border)] cursor-not-allowed",
                  day_today: "font-bold text-[var(--brand-amber)]",
                  nav_button: "w-8 h-8 rounded-full hover:bg-[var(--brand-surface)] flex items-center justify-center transition-colors",
                  caption: "flex items-center justify-between mb-4 font-body font-semibold text-[var(--brand-espresso)]",
                }}
              />

              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 pt-6 border-t border-[var(--border)]"
                >
                  <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-3">
                    Pick a time
                  </p>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`font-body text-sm py-3 rounded-xl border transition-colors min-h-[44px] ${
                          selectedTime === time
                            ? "bg-[var(--brand-amber)] text-white border-[var(--brand-amber)]"
                            : "border-[var(--border)] text-[var(--brand-espresso)] hover:border-[var(--brand-amber)] hover:text-[var(--brand-amber)]"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </motion.div>

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="bg-[var(--brand-surface)] border border-[var(--border)] rounded-2xl p-6 md:p-8"
            >
              <p className="font-body text-xs uppercase tracking-widest text-[var(--brand-amber)] mb-5">
                Your details
              </p>

              {selectedDate && selectedTime && (
                <div className="flex items-center gap-2 bg-[var(--brand-amber)]/10 border border-[var(--brand-amber)]/20 rounded-xl px-4 py-3 mb-5">
                  <Check size={16} weight="bold" className="text-[var(--brand-amber)] shrink-0" />
                  <p className="font-body text-sm text-[var(--brand-espresso)]">
                    {selectedDate.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}{" "}
                    at {selectedTime}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                  <label className="font-body text-xs font-semibold text-[var(--brand-espresso)] mb-1.5 block uppercase tracking-wide">
                    Name *
                  </label>
                  <input
                    {...register("name")}
                    placeholder="Your name"
                    className="w-full font-body text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-4 text-[var(--brand-espresso)] placeholder:text-[var(--brand-warm-brown)]/50 focus:outline-none focus:border-[var(--brand-amber)] transition-colors min-h-[52px]"
                  />
                  {errors.name && <p className="font-body text-xs text-red-500 mt-1">{errors.name.message}</p>}
                </div>

                <div>
                  <label className="font-body text-xs font-semibold text-[var(--brand-espresso)] mb-1.5 block uppercase tracking-wide">
                    Email *
                  </label>
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="your@email.com"
                    className="w-full font-body text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-4 text-[var(--brand-espresso)] placeholder:text-[var(--brand-warm-brown)]/50 focus:outline-none focus:border-[var(--brand-amber)] transition-colors min-h-[52px]"
                  />
                  {errors.email && <p className="font-body text-xs text-red-500 mt-1">{errors.email.message}</p>}
                </div>

                <div>
                  <label className="font-body text-xs font-semibold text-[var(--brand-espresso)] mb-1.5 block uppercase tracking-wide">
                    Topic *
                  </label>
                  <select
                    {...register("topic")}
                    className="w-full font-body text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-4 text-[var(--brand-espresso)] focus:outline-none focus:border-[var(--brand-amber)] transition-colors min-h-[52px] appearance-none"
                  >
                    <option value="">What do you want to talk about?</option>
                    {topics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                  {errors.topic && <p className="font-body text-xs text-red-500 mt-1">{errors.topic.message}</p>}
                </div>

                <div>
                  <label className="font-body text-xs font-semibold text-[var(--brand-espresso)] mb-1.5 block uppercase tracking-wide">
                    Anything to add? (optional)
                  </label>
                  <textarea
                    {...register("notes")}
                    rows={3}
                    placeholder="Brief context about your business or project..."
                    className="w-full font-body text-sm bg-[var(--background)] border border-[var(--border)] rounded-xl px-4 py-4 text-[var(--brand-espresso)] placeholder:text-[var(--brand-warm-brown)]/50 focus:outline-none focus:border-[var(--brand-amber)] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || !selectedDate || !selectedTime}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[var(--brand-espresso)] text-[var(--brand-cream)] font-body font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:bg-[var(--brand-amber)] disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
                >
                  {submitting ? "Sending..." : "Confirm booking request"}
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
