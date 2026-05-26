"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const panels = [
  {
    id: 1,
    image: "/images/banners/promo-1.png",
    label: "Gaming",
    title: "Built for the\nNext Level",
    subtitle: "Premium gaming gear from top brands",
    cta: "Shop Gaming",
    href: "/shop",
  },
  {
    id: 2,
    image: "/images/banners/promo-2.png",
    label: "On the Go",
    title: "Power Every\nJourney",
    subtitle: "Keep your devices charged anywhere",
    cta: "Learn More",
    href: "/shop",
  },
  {
    id: 3,
    image: "/images/banners/promo-3.png",
    label: "Smartphones",
    title: "Future In\nYour Hands",
    subtitle: "The world's best phones, all in one place",
    cta: "Shop Phones",
    href: "/shop",
  },
  {
    id: 4,
    image: "/images/banners/promo-4.png",
    label: "Workspaces",
    title: "Minimal\nProductivity",
    subtitle: "Smart gear for smart professionals",
    cta: "Shop Setups",
    href: "/shop",
  },
];

// ─── flex-grow values ─────────────────────────────────────────────────────────
// active panel gets GROW_ACTIVE, all others share GROW_INACTIVE
const GROW_ACTIVE   = 5.5;
const GROW_INACTIVE = 1;

// ─── Component ────────────────────────────────────────────────────────────────

export default function ExpandingShowcaseSection() {
  // Default active panel is index 1 (like the screenshot's center panel)
  const [active, setActive] = useState(1);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 lg:px-16">

      {/* ── Section heading ──────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-8"
      >
        <h2 className="text-4xl font-black tracking-tight text-gray-900 md:text-5xl">
          Tech for Every Moment
        </h2>
        <p className="mt-2 text-sm text-gray-400">
          Explore our curated collections — something for every lifestyle
        </p>
      </motion.div>

      {/* ── Expanding panels container ───────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="flex gap-2 overflow-hidden rounded-md"
        style={{ height: "clamp(320px, 48vw, 560px)" }}
      >
        {panels.map((panel) => {
          const isActive = panel.id === active;

          return (
            <motion.div
              key={panel.id}
              animate={{ flexGrow: isActive ? GROW_ACTIVE : GROW_INACTIVE }}
              transition={{
                duration: 0.55,
                ease: [0.16, 1, 0.3, 1],
              }}
              onMouseEnter={() => setActive(panel.id)}
              className="relative shrink-0 cursor-pointer overflow-hidden"
              style={{
                flexGrow: panel.id === 1 ? GROW_ACTIVE : GROW_INACTIVE,
                flexBasis: 0,
                minWidth: 52,
              }}
            >
              {/* ── Background image ─────────────────────────────────────── */}
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              {/* ── Gradient overlay ─────────────────────────────────────── */}
              {/* Active: bottom-heavy dark scrim for text */}
              {/* Inactive: full dark tint so the strip label shows */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: isActive
                    ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.05) 100%)"
                    : "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.6) 100%)",
                }}
              />

              {/* ── Blue tint glow on active ──────────────────────────────── */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-linear-to-br from-[#0066FF]/15 to-transparent"
              />

              {/* ── COLLAPSED STATE: vertical label ──────────────────────── */}
              <motion.div
                animate={{ opacity: isActive ? 0 : 1 }}
                transition={{ duration: 0.25 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <p
                  className="whitespace-nowrap text-sm font-bold text-white/80"
                  style={{ writingMode: "vertical-rl", textOrientation: "mixed", transform: "rotate(180deg)" }}
                >
                  {panel.label}
                </p>
              </motion.div>

              {/* EXPANDED STATE: full content */}
              <motion.div
                animate={{
                  opacity: isActive ? 1 : 0,
                  y: isActive ? 0 : 12,
                }}
                transition={{ duration: 0.35, delay: isActive ? 0.18 : 0 }}
                className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-7 md:p-9"
              >
                {/* Left: text */}
                <div className="flex flex-col gap-1">
                  <h3
                    className="whitespace-pre-line font-black leading-tight text-white"
                    style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)" }}
                  >
                    {panel.title}
                  </h3>
                  <p className="text-sm text-white/65">{panel.subtitle}</p>
                </div>

                {/* Right: CTA button */}
                <Link href={panel.href} className="shrink-0">
                  <motion.span
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group ml-6 inline-flex cursor-pointer items-center gap-2 rounded-md border-2 border-white bg-white px-5 py-2.5 text-sm font-bold text-gray-900 transition-all duration-200 hover:border-[#0066FF] hover:bg-[#0066FF] hover:text-white"
                  >
                    {panel.cta}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover:translate-x-1"
                    />
                  </motion.span>
                </Link>
              </motion.div>

              {/* Top-left eyebrow label (visible on active) */}
              <motion.div
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : -8 }}
                transition={{ duration: 0.3, delay: isActive ? 0.15 : 0 }}
                className="absolute left-7 top-7 z-10 flex items-center gap-2 md:left-9 md:top-9"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#7DBBFF]" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/70">
                  {panel.label}
                </span>
              </motion.div>

            </motion.div>
          );
        })}
      </motion.div>

      {/* Dot indicators */}
      <div className="mt-5 flex items-center justify-center gap-2.5">
        {panels.map((p) => (
          <button
            key={p.id}
            onClick={() => setActive(p.id)}
            aria-label={`View ${p.label}`}
          >
            <motion.span
              animate={{
                width: p.id === active ? 24 : 7,
                backgroundColor:
                  p.id === active ? "#0066FF" : "rgba(0,102,255,0.2)",
              }}
              transition={{ duration: 0.3 }}
              className="block h-2 rounded-full"
              style={{ width: 7 }}
            />
          </button>
        ))}
      </div>

    </section>
  );
}