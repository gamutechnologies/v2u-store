"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  Truck,
  Headphones,
  CreditCard,
} from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faInstagram,
  faXTwitter,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";

// ─── Data ─────────────────────────────────────────────────────────────────────

const footerNav = {
  Shop: [
    { label: "Laptops", href: "/shop" },
    { label: "Phones", href: "/shop" },
    { label: "Gaming", href: "/shop" },
    { label: "Audio", href: "/shop" },
    { label: "Wearables", href: "/shop" },
    { label: "Accessories", href: "/shop" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Contact Us", href: "/contact" },
    { label: "Shop", href: "/shop" },
  ],
  Support: [
    { label: "Help Center", href: "/" },
    { label: "Track Order", href: "/" },
    { label: "Shipping Info", href: "/" },
    { label: "Returns", href: "/" },
    { label: "Privacy Policy", href: "/" },
  ],
};

const socialLinks = [
  { icon: faFacebookF, label: "Facebook", href: "/", color: "#1877F2" },
  { icon: faInstagram, label: "Instagram", href: "/", color: "#E1306C" },
  { icon: faXTwitter, label: "X", href: "/", color: "#111827" },
  { icon: faYoutube, label: "YouTube", href: "/", color: "#FF0000" },
  { icon: faTiktok, label: "TikTok", href: "/", color: "#111827" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subStatus, setSubStatus] = useState<"idle" | "loading" | "done">(
    "idle",
  );
  const ref = useRef(null);
  useInView(ref, { once: true, margin: "-80px" });

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubStatus("loading");
    await new Promise((r) => setTimeout(r, 1100));
    // Replace with: await fetch("/api/newsletter", { method: "POST", body: JSON.stringify({ email }) })
    setSubStatus("done");
    setEmail("");
  };

  return (
    <footer ref={ref} className="relative overflow-hidden bg-white">
      {/* ── Blue glow orbs (light theme) ───────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-8%] top-[-5%] h-125 w-125 rounded-full bg-[#0066FF]/8 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-112.5 w-112.5 rounded-full bg-[#7DBBFF]/15 blur-[100px]" />
        <div className="absolute left-[40%] top-[30%] h-75 w-75 rounded-full bg-[#0066FF]/5 blur-[80px]" />
      </div>

      {/* Subtle dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "radial-gradient(circle, #0066FF14 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />

      {/* NEWSLETTER STRIP */}
      <div className="relative border-b border-[#7DBBFF]/15">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-10 md:flex-row md:items-center">
          <motion.div {...fadeUp(0.05)}>
            <p className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">
              Stay in the loop
            </p>
            <h3 className="mt-1.5 text-2xl font-black text-gray-900 md:text-3xl">
              Get the latest drops &amp; deals
            </h3>
          </motion.div>

          <motion.form
            {...fadeUp(0.15)}
            onSubmit={handleSubscribe}
            className="flex w-full max-w-md items-center overflow-hidden rounded-full border border-[#7DBBFF]/25 bg-[#F0F6FF] p-1.5 shadow-[0_0_24px_rgba(0,102,255,0.07)] transition-all duration-300 focus-within:border-[#0066FF]/40 focus-within:shadow-[0_0_32px_rgba(0,102,255,0.12)]"
          >
            <Mail size={15} className="ml-4 shrink-0 text-[#0066FF]/50" />
            {subStatus === "done" ? (
              <p className="flex-1 px-4 text-sm font-semibold text-[#0066FF]">
                Thanks! Check your inbox.
              </p>
            ) : (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="flex-1 bg-transparent px-4 text-sm text-gray-700 outline-none placeholder:text-gray-400"
              />
            )}
            <motion.button
              type="submit"
              disabled={subStatus !== "idle"}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="flex shrink-0 items-center gap-2 rounded-full bg-linear-to-r from-[#0066FF] to-[#7DBBFF] px-6 py-2.5 text-sm font-bold text-white shadow-[0_0_18px_rgba(0,102,255,0.28)]"
            >
              {subStatus === "loading" ? (
                <svg
                  className="h-4 w-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8z"
                  />
                </svg>
              ) : (
                <>
                  <Send size={13} /> Subscribe
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          MAIN BODY
          ══════════════════════════════════════════════════════════════════════ */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-16 md:grid-cols-2 lg:grid-cols-[2.2fr_1fr_1fr_1fr]">
        {/* Brand col */}
        <motion.div {...fadeUp(0)}>
          <Link href="/">
            <motion.span
              whileHover={{ scale: 1.04 }}
              className="inline-block text-4xl font-extrabold tracking-tight text-gray-900"
            >
              V2U
              <span className="text-[#0066FF]">.</span>
            </motion.span>
          </Link>

          <p className="mt-5 max-w-xs text-sm leading-7 text-gray-500">
            A next-generation premium tech store delivering cutting-edge
            electronics, gaming devices, and smart accessories worldwide.
          </p>

          {/* Contact info */}
          <div className="mt-8 flex flex-col gap-3">
            {[
              { icon: MapPin, text: "Dubai, UAE & Colombo, Sri Lanka" },
              { icon: Phone, text: "+94 77 123 4567" },
              { icon: Mail, text: "support@v2ustore.com" },
            ].map((c, i) => {
              const Icon = c.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 text-sm text-gray-500"
                >
                  <Icon size={14} className="shrink-0 text-[#0066FF]" />
                  <span>{c.text}</span>
                </div>
              );
            })}
          </div>

          {/* Social icons */}
          <div className="mt-8 flex items-center gap-2.5">
            {socialLinks.map((s, i) => (
              <motion.a
                key={i}
                href={s.href}
                aria-label={s.label}
                whileHover={{ y: -4, scale: 1.1 }}
                whileTap={{ scale: 0.92 }}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#7DBBFF]/20 bg-[#F0F6FF] text-gray-400 transition-all duration-300"
                onMouseEnter={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = `${s.color}50`;
                  el.style.backgroundColor = `${s.color}12`;
                  el.style.color = s.color;
                  el.style.boxShadow = `0 0 16px ${s.color}25`;
                }}
                onMouseLeave={(e) => {
                  const el = e.currentTarget as HTMLElement;
                  el.style.borderColor = "";
                  el.style.backgroundColor = "";
                  el.style.color = "";
                  el.style.boxShadow = "";
                }}
              >
                <FontAwesomeIcon icon={s.icon} className="text-xs" />
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Nav columns */}
        {Object.entries(footerNav).map(([title, links], colIdx) => (
          <motion.div key={title} {...fadeUp(0.07 + colIdx * 0.06)}>
            <h4 className="mb-5 text-xs font-bold uppercase tracking-[0.18em] text-gray-400">
              {title}
            </h4>
            <ul className="flex flex-col gap-3.5">
              {links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>
                    <motion.span
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.18 }}
                      className="group flex w-fit items-center gap-2 text-sm text-gray-500 transition-colors duration-200 hover:text-[#0066FF]"
                    >
                      <span className="h-px w-0 rounded-full bg-[#0066FF] transition-all duration-200 group-hover:w-3" />
                      {link.label}
                    </motion.span>
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* ══════════════════════════════════════════════════════════════════════
          BOTTOM BAR
          ══════════════════════════════════════════════════════════════════════ */}
      <motion.div
        {...fadeUp(0.18)}
        className="relative border-t border-[#7DBBFF]/15"
      >
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-gray-400 md:flex-row">
          <p>
            © {new Date().getFullYear()} V2U Tech Store. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {["Terms", "Privacy", "Cookies", "Sitemap"].map((item) => (
              <Link
                key={item}
                href="/"
                className="transition-colors hover:text-[#0066FF]"
              >
                {item}
              </Link>
            ))}
          </div>

          <motion.button
            whileHover={{ y: -3, scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 rounded-full border border-[#7DBBFF]/20 bg-[#F0F6FF] px-4 py-2 text-gray-500 transition-all duration-200 hover:border-[#0066FF]/30 hover:text-[#0066FF]"
          >
            Back to top
            <ArrowRight size={12} className="-rotate-90" />
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
}
