"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Tag, Gift } from "lucide-react";

// ─── Config ───────────────────────────────────────────────────────────────────
// Change SESSION_KEY to reset popup for all users (e.g. for new campaigns)
const SESSION_KEY = "v2u_popup_seen_v1";

// Delay before popup appears (ms)
const POPUP_DELAY = 2200;

// ─── Component ────────────────────────────────────────────────────────────────

export default function HomePopup() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail]     = useState("");
  const [agreed, setAgreed]   = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError]     = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError("Please enter your email."); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Enter a valid email address.");
      return;
    }
    if (!agreed) { setError("Please agree to receive offers."); return; }
    setError("");
    setLoading(true);

    // ── Replace with your real email service call ──
    await new Promise((r) => setTimeout(r, 1200));
    // e.g. await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) })
    // ──────────────────────────────────────────────

    setLoading(false);
    setSubmitted(true);
    sessionStorage.setItem(SESSION_KEY, "1");
    setTimeout(() => setVisible(false), 2800);
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          {/* ── Backdrop ─────────────────────────────────────────────────── */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-100 bg-black/60 backdrop-blur-sm"
            onClick={handleClose}
          />

          {/* ── Modal ────────────────────────────────────────────────────── */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.88, y: 40 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={  { opacity: 0, scale: 0.92, y: 20  }}
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

            {/* ── Top offer banner ───────────────────────────────────────── */}
            <div className="relative overflow-hidden bg-linear-to-br from-[#0066FF] to-[#7DBBFF] px-8 pb-10 pt-10">
              {/* Background dots */}
              <div
                className="pointer-events-none absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "radial-gradient(circle, #ffffff28 1px, transparent 1px)",
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
                  Sign Up & Save
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
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
                    className="relative flex w-36 flex-col items-center rounded-2xl border-2 border-white/30 bg-white/20 py-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-sm"
                  >
                    <Tag size={18} className="text-white/80" />
                    <p className="mt-2 text-3xl font-black text-white">15%</p>
                    <p className="text-xs font-semibold text-white/70">Off First Order</p>
                  </motion.div>

                  {/* Card 2 */}
                  <motion.div
                    initial={{ rotate: 5, y: 0 }}
                    animate={{ rotate: 5, y: [0, 8, 0] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
                    className="relative flex w-36 flex-col items-center rounded-2xl border-2 border-white/30 bg-white/25 py-5 shadow-[0_8px_32px_rgba(0,0,0,0.15)] backdrop-blur-sm"
                  >
                    <Gift size={18} className="text-white/80" />
                    <p className="mt-2 text-3xl font-black text-white">Free</p>
                    <p className="text-xs font-semibold text-white/70">Shipping Always</p>
                  </motion.div>
                </div>
              </div>
            </div>

            {/* ── Form ───────────────────────────────────────────────────── */}
            <div className="px-8 py-7">
              {submitted ? (
                // ── Success state ──
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center gap-3 py-4 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}
                    className="flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-br from-[#0066FF] to-[#7DBBFF]"
                  >
                    <Zap size={28} className="text-white" />
                  </motion.div>
                  <h3 className="text-xl font-black text-gray-900">You're In!</h3>
                  <p className="text-sm text-gray-500">
                    Check your inbox — your 15% off code is on its way.
                  </p>
                </motion.div>
              ) : (
                // ── Default form state ──
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
                  {/* Email input */}
                  <div className="flex overflow-hidden rounded-xl border border-gray-200 bg-gray-50 transition-all focus-within:border-[#0066FF]/40 focus-within:ring-4 focus-within:ring-[#0066FF]/10">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(""); }}
                      placeholder="Enter your email address"
                      className="h-13 flex-1 bg-transparent px-5 text-sm outline-none placeholder:text-gray-400"
                    />
                  </div>

                  {error && (
                    <p className="text-xs text-red-500">{error}</p>
                  )}

                  {/* Checkboxes */}
                  <div className="flex flex-col gap-2.5">
                    <label className="flex cursor-pointer items-start gap-3 text-xs text-gray-500">
                      <input
                        type="checkbox"
                        checked={agreed}
                        onChange={(e) => setAgreed(e.target.checked)}
                        className="mt-0.5 h-4 w-4 cursor-pointer accent-[#0066FF]"
                      />
                      <span>
                        I agree to V2U's{" "}
                        <a href="/privacy" className="text-[#0066FF] underline underline-offset-2">
                          Terms of Use
                        </a>{" "}
                        and{" "}
                        <a href="/privacy" className="text-[#0066FF] underline underline-offset-2">
                          Privacy Policy
                        </a>.
                      </span>
                    </label>
                    <label className="flex cursor-pointer items-start gap-3 text-xs text-gray-500">
                      <input
                        type="checkbox"
                        defaultChecked
                        className="mt-0.5 h-4 w-4 cursor-pointer accent-[#0066FF]"
                      />
                      <span>
                        Send me news, product drops, and exclusive deals. Unsubscribe anytime.
                      </span>
                    </label>
                  </div>

                  {/* Submit button */}
                  <motion.button
                    type="submit"
                    whileHover={loading ? {} : { scale: 1.02, y: -1 }}
                    whileTap={loading ? {} : { scale: 0.98 }}
                    disabled={loading}
                    className={`flex h-13 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold text-white transition-all duration-200 ${
                      loading
                        ? "cursor-not-allowed bg-[#0066FF]/60"
                        : "bg-linear-to-r from-[#0066FF] to-[#7DBBFF] shadow-[0_0_24px_rgba(0,102,255,0.3)] hover:shadow-[0_0_32px_rgba(0,102,255,0.4)]"
                    }`}
                  >
                    {loading ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                        Signing up…
                      </>
                    ) : (
                      "Sign Up & Get 15% Off"
                    )}
                  </motion.button>

                  {/* Dismiss */}
                  <button
                    type="button"
                    onClick={handleClose}
                    className="text-center text-xs text-gray-400 underline-offset-2 transition-colors hover:text-gray-600 hover:underline"
                  >
                    No thanks, I'll pay full price
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}