"use client";

import { motion } from "framer-motion";
import {
  ShieldCheck,
  Truck,
  Sparkles,
  BadgeCheck,
  ArrowRight,
  Star,
  Globe,
  Package,
} from "lucide-react";
import Link from "next/link";

const features = [
  {
    num: "01",
    icon: ShieldCheck,
    title: "Premium Warranty",
    description:
      "Every product ships with trusted warranty coverage and rigorous quality checks before it reaches you.",
    accent: "#0066FF",
    glowColor: "rgba(0,102,255,0.12)",
  },
  {
    num: "02",
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Lightning-fast dispatch and door-to-door tracking so your tech arrives exactly when promised.",
    accent: "#0066FF",
    glowColor: "rgba(0,102,255,0.10)",
  },
  {
    num: "03",
    icon: Sparkles,
    title: "Latest Technology",
    description:
      "We curate only the newest flagship devices — from day-one launches to exclusive limited editions.",
    accent: "#0066FF",
    glowColor: "rgba(0,102,255,0.12)",
  },
  {
    num: "04",
    icon: BadgeCheck,
    title: "Trusted Brands",
    description:
      "100 % authentic products sourced directly from Apple, Samsung, Sony, Razer, and 8+ global brands.",
    accent: "#0066FF",
    glowColor: "rgba(0,102,255,0.10)",
  },
];

const stats = [
  { icon: Package, value: "10K+", label: "Products" },
  { icon: Globe, value: "146+", label: "Countries Served" },
  { icon: Star, value: "4.9★", label: "Average Rating" },
];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
  },
});

export default function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden bg-linear-to-b from-[#ffffff] via-[#f8fbff] to-[#7bb0ff] px-5 py-16 sm:px-8 lg:px-16 lg:py-24">
      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6%] top-[-8%]      h-105 w-105 rounded-full bg-[#0066FF]/6  blur-[120px]" />
        <div className="absolute bottom-[-8%] right-[-4%]  h-95 w-95 rounded-full bg-[#7DBBFF]/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* HEADER ROW*/}
        <div className="mb-12 flex flex-col gap-8 md:flex-row md:items-end md:justify-between lg:mb-16">
          {/* Left */}
          <motion.div {...fadeUp(0)} className="max-w-xl">
            {/* Label pill */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#7DBBFF]/30 bg-[#F0F6FF] px-4 py-1.5">
              <Sparkles size={11} className="text-[#0066FF]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0066FF]">
                Why Choose V2U
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl font-black leading-[1.05] tracking-tight text-gray-900 sm:text-5xl lg:text-[56px]">
              Built for
              <span className="relative ml-3 inline-block">
                <span className="bg-linear-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
                  Tech
                </span>
              </span>
              <span className="block mt-1 text-gray-900">Lovers.</span>
            </h2>

            <p className="mt-5 max-w-sm text-[14px] leading-7 text-gray-500">
              From day-one product launches to lightning-fast delivery — we set
              the standard for premium tech retail.
            </p>

            <Link href="/about">
              <motion.span
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.97 }}
                className="group mt-7 inline-flex cursor-pointer items-center gap-2 text-[13px] font-bold text-[#0066FF] transition-all duration-200"
              >
                Discover Our Story
                <ArrowRight
                  size={14}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </motion.span>
            </Link>
          </motion.div>

          {/* Right — stat chips */}
          <motion.div
            {...fadeUp(0.12)}
            className="flex flex-col gap-3 md:items-end"
          >
            {stats.map((s, i) => {
              const Icon = s.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                  className="flex w-full items-center gap-3 rounded-2xl border border-[#7DBBFF]/20 bg-[#F8FBFF] px-5 py-3 shadow-[0_2px_12px_rgba(0,102,255,0.05)] md:w-55"
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-linear-to-br from-[#0066FF] to-[#7DBBFF]">
                    <Icon size={14} className="text-white" />
                  </div>
                  <div>
                    <p className="text-[15px] font-black leading-none text-gray-900">
                      {s.value}
                    </p>
                    <p className="mt-0.5 text-[10px] font-semibold text-gray-400">
                      {s.label}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* FEATURE CARDS GRID */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => {
            const Icon = f.icon;
            return (
              <motion.div
                key={i}
                {...fadeUp(0.08 + i * 0.08)}
                whileHover={{ y: -6, scale: 1.015 }}
                transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#7DBBFF]/15 bg-[#F8FBFF] p-6 shadow-[0_2px_16px_rgba(0,102,255,0.04)] transition-shadow duration-300 hover:border-[#0066FF]/25 hover:shadow-[0_12px_36px_rgba(0,102,255,0.12)]"
              >
                {/* Watermark number */}
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute right-4 top-3 select-none text-[72px] font-black leading-none text-[#0066FF]/5 transition-all duration-300 group-hover:text-[#0066FF]/9"
                >
                  {f.num}
                </span>

                {/* Icon orb */}
                <div className="relative mb-5 flex h-12 w-12 items-center justify-center rounded-2xl">
                  {/* linear bg */}
                  <div className="absolute inset-0 rounded-2xl bg-linear-to-br from-[#0066FF] to-[#7DBBFF] opacity-90 shadow-[0_0_20px_rgba(0,102,255,0.25)] transition-all duration-300 group-hover:shadow-[0_0_28px_rgba(0,102,255,0.4)]" />
                  <Icon size={21} className="relative z-10 text-white" />
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-black leading-tight text-gray-900">
                  {f.title}
                </h3>

                {/* Accent rule */}
                <div className="mt-2.5 h-0.5 w-8 rounded-full bg-linear-to-r from-[#0066FF] to-[#7DBBFF] transition-all duration-300 group-hover:w-14" />

                {/* Description */}
                <p className="mt-3 text-[12.5px] leading-6 text-gray-500">
                  {f.description}
                </p>

                {/* Bottom hover indicator */}
                <div className="mt-auto pt-5">
                  <motion.span
                    initial={{ opacity: 0, x: -6 }}
                    whileInView={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-[11px] font-bold text-[#0066FF] opacity-0 transition-opacity duration-200 group-hover:opacity-100"
                  >
                    <span className="h-px w-4 rounded-full bg-[#0066FF]" />
                    Learn more
                  </motion.span>
                </div>

                {/* Bottom Gradient edge — appears on hover */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 rounded-b-2xl bg-linear-to-r from-[#0066FF] to-[#7DBBFF] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
