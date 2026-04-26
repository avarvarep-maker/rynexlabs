"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function MobileCTA() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const fn = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="mobile-cta-bar md:hidden"
        >
          <Link
            href="/#pricing"
            className="btn-primary w-full py-3.5 text-sm gap-2"
          >
            Start free — no credit card
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
