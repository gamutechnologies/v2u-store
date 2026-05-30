"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Tag, Gift } from "lucide-react";

// Change SESSION_KEY to reset popup for all users (e.g. for new campaigns)
const SESSION_KEY = "v2u_popup_seen_v1";

// Delay before popup appears (ms)
const POPUP_DELAY = 2200;

export default function HomePopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show once per session
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const t = setTimeout(() => setVisible(true), POPUP_DELAY);
    return () => clearTimeout(t);
  }, []);

  const handleClose = () => {
    sessionStorage.setItem(SESSION_KEY, "1");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-4 top-1/2 z-101 mx-auto max-w-lg -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-[0_32px_80px_rgba(0,0,0,0.25)]"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-gray-500 backdrop-blur-sm transition-colors hover:bg-gray-100 hover:text-gray-800"
            >
              <X size={16} />
            </button>

            {/* Top offer banner */}
            <div className="relative overflow-hidden bg-linear-to-br from-[#0066FF] to-[#7DBBFF] px-8 pb-10 pt-10">
              {/* Background dots */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #ffffff28 1px, transparent 1px)",
                  backgroundSize: "28px 28px",
                }}
              />
              {/* Glow orbs */}
              <div className="absolute -left-8 -top-8 h-40 w-40 rounded-full bg-white/15 blur-3xl" />
              <div className="absolute -bottom-8 -right-8 h-40 w-40 rounded-full bg-white/10 blur-3xl" />

              <div className="relative z-10 text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-white/70">
                  Welcome to V2U
                </p>
                <h2 className="mt-2 text-3xl font-black leading-tight text-white md:text-4xl">
                  Join & Save
                </h2>
                <p className="mt-1.5 text-base text-white/80">
                  Get exclusive offers & new arrivals first
                </p>

                {/* Voucher cards */}
                <div className="mt-7 flex items-center justify-center gap-4">
                  {/* Card 1 */}
                  <motion.div
                    initial={{ rotate: -6, y: 8 }}
                    animate={{ rotate: -6, y: [8, 0, 8] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative flex w-36 flex-col items-center rounded-2xl border-2 border-white/30 bg-white/20 py-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-sm"
                  >
                    <Tag size={18} className="text-white/80" />
                    <p className="mt-2 text-3xl font-black text-white">15%</p>
                    <p className="text-xs font-semibold text-white/70">
                      Off First Order
                    </p>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div
                    initial={{ rotate: 5, y: 0 }}
                    animate={{ rotate: 5, y: [0, 8, 0] }}
                    transition={{
                      duration: 3.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.4,
                    }}
                    className="relative flex w-36 flex-col items-center rounded-2xl border-2 border-white/30 bg-white/25 py-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-sm"
                  >
                    <Gift size={18} className="text-white/80" />
                    <p className="mt-2 text-3xl font-black text-white">Free</p>
                    <p className="text-xs font-semibold text-white/70">
                      Shipping
                    </p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="px-8 py-7 flex flex-col gap-4 text-center">
              <p className="text-sm text-gray-500 font-medium px-2">
                Join our WhatsApp or follow our social media groups for a chance
                to win a{" "}
                <span className="font-bold text-gray-800">
                  15% off promo code
                </span>
                !
              </p>

              {/* Submit button */}
              <motion.a
                href="https://chat.whatsapp.com/your-group-link"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleClose}
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="flex h-13 mt-3 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-all duration-200 bg-linear-to-r from-[#0066FF] to-[#7DBBFF] shadow-[0_0_24px_rgba(0,102,255,0.3)] hover:shadow-[0_0_32px_rgba(0,102,255,0.4)]"
              >
                Join WhatsApp Group
              </motion.a>

              {/* Dismiss */}
              <button
                type="button"
                onClick={handleClose}
                className="mt-2 text-center text-xs text-gray-400 underline-offset-2 transition-colors hover:text-gray-600 hover:underline"
              >
                No thanks, I'll pay full price
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
