"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  Headphones,
  CreditCard,
  Sparkles,
  BadgeCheck,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

const features = [
  {
    icon: ShieldCheck,
    title: "Premium Warranty",
    description: "Trusted warranty coverage and quality assurance on every product.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Lightning-fast shipping and secure delivery across the country.",
  },
  {
    icon: Sparkles,
    title: "Latest Technology",
    description: "Access the newest premium gadgets and futuristic electronics.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Brands",
    description: "Authentic products from globally recognised tech companies.",
  },
];

// ─── Animation helpers ────────────────────────────────────────────────────────

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.55,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

// ─── Component ────────────────────────────────────────────────────────────────

export default function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-6 lg:px-12">

      {/* Glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-5%] top-[-10%] h-80 w-80 rounded-full bg-[#0066FF]/8 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-80 w-80 rounded-full bg-[#7DBBFF]/12 blur-[80px]" />
      </div>

      <div className="relative mx-auto max-w-280">

        {/* MAIN CONTAINER — left panel + right feature list */}
        <div className="overflow-hidden rounded-lg border border-[#7DBBFF]/15 bg-white shadow-[0_4px_40px_rgba(0,102,255,0.06)]">
          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr]">

            {/* LEFT PANEL — blue gradient with heading + stats */}
            <motion.div
              {...fadeUp(0)}
              className="relative flex flex-col justify-between overflow-hidden bg-linear-to-br from-[#0052CC] via-[#0066FF] to-[#7DBBFF] p-10"
            >
              {/* Decorative circles */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute -bottom-8 -right-8 h-40 w-40 rounded-full border border-white/10" />
              <div className="pointer-events-none absolute right-8 top-8 h-24 w-24 rounded-full border border-white/10" />
              {/* Dot grid */}
              <div
                className="pointer-events-none absolute inset-0 opacity-15"
                style={{
                  backgroundImage: "radial-gradient(circle, #ffffff22 1px, transparent 1px)",
                  backgroundSize: "24px 24px",
                }}
              />

              <div className="relative z-10">
                {/* Label */}
                <div className="inline-flex items-center gap-2 rounded-md border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm">
                  <Sparkles size={10} className="text-white/80" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                    Why Choose Us
                  </span>
                </div>

                {/* Heading */}
                <h2 className="mt-6 text-3xl font-black leading-tight tracking-tight text-white md:text-4xl">
                  <span className="block">Built For</span>
                  <span className="block opacity-80">Tech Lovers.</span>
                </h2>

                <p className="mt-5 text-sm leading-7 text-white/65">
                  We deliver a premium
                  products, trusted brands, fast service, and smarter shopping.
                </p>

                {/* CTA */}
                <Link href="/about">
                  <motion.span
                    whileHover={{ scale: 1.04, x: 3 }}
                    whileTap={{ scale: 0.97 }}
                    className="group mt-8 inline-flex cursor-pointer items-center gap-2 rounded-md border-2 border-white/30 bg-white/10 px-5 py-2.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/60 hover:bg-white/20"
                  >
                    About V2U
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            {/* ── RIGHT PANEL — 6 feature rows with separators ────────────── */}
            <div className="divide-y divide-[#7DBBFF]/10 bg-[#FAFCFF]">
              {features.map((f, i) => {
                const Icon = f.icon;
                return (
                  <motion.div
                    key={i}
                    {...fadeUp(0.05 + i * 0.055)}
                    whileHover={{ x: 6, backgroundColor: "#F0F6FF" }}
                    transition={{ duration: 0.22 }}
                    className="group flex items-start gap-5 px-16 py-6 transition-colors duration-200"
                  >
                    {/* Icon box */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#7DBBFF]/20 bg-white shadow-[0_2px_12px_rgba(0,102,255,0.08)] transition-all duration-300 group-hover:border-[#0066FF]/30 group-hover:shadow-[0_0_20px_rgba(0,102,255,0.15)]">
                      <Icon
                        size={20}
                        className="text-[#0066FF] transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>

                    {/* Text */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <h3 className="text-sm font-bold text-gray-900">
                          {f.title}
                        </h3>
                        {/* Animated line that grows on hover */}
                        <motion.div
                          initial={{ scaleX: 0 }}
                          whileInView={{ scaleX: 0 }}
                          className="h-px origin-left flex-1 bg-linear-to-r from-[#0066FF]/40 to-transparent opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scaleX-100"
                          style={{ transformOrigin: "left" }}
                        />
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-gray-500">
                        {f.description}
                      </p>
                    </div>

                    {/* Chevron indicator */}
                    <ArrowRight
                      size={14}
                      className="mt-0.5 shrink-0 text-transparent transition-all duration-200 group-hover:text-[#0066FF]"
                    />
                  </motion.div>
                );
              })}
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}