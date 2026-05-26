"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

// ─── Data ─────────────────────────────────────────────────────────────────────
// Update image paths to your own banner assets

const panels = [
  {
    eyebrow: "New Arrivals",
    title: "Smart Gaming Gear\nFor Every Pro",
    subtitle: "Top-rated peripherals from Razer, Logitech & more",
    cta: "Shop Gaming",
    href: "/shop",
    image: "/images/banners/promo-1.png",
  },
  {
    eyebrow: "Exclusive Collection",
    title: "The Tech They\nDon't Tell You",
    subtitle: "Discover the most talked-about devices of 2026",
    cta: "Explore Now",
    href: "/shop",
    image: "/images/banners/promo-2.png",
  },
];

const metrics = [
  { value: "146+", label: "Countries Served" },
  { value: "8+",   label: "Global Brands"    },
  { value: "10K+", label: "Products Listed"  },
];

export default function HeroEditorialGrid() {
  return (
    <section className="relative overflow-hidden bg-[#F5F7FA]">

      {/* Top blue glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-8%] top-[-10%] h-100 w-100 rounded-full bg-[#0066FF]/8 blur-[100px]" />
        <div className="absolute bottom-[-10%] left-[-5%] h-87.5 w-87.5 rounded-full bg-[#7DBBFF]/12 blur-[80px]" />
      </div>

      <div className="relative w-full px-8 py-16 lg:px-16">

        {/* Header row */}
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl font-black leading-tight tracking-tight text-gray-900 md:text-5xl"
          >
            Premium Tech.
            <span className="block bg-linear-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
              Every Category.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12 }}
            viewport={{ once: true }}
            className="flex items-center gap-8"
          >
            {metrics.map((m, i) => (
              <div key={i} className="text-right">
                <p className="text-2xl font-black text-[#0066FF]">{m.value}</p>
                <p className="mt-0.5 text-xs text-gray-500">{m.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 2-col panels */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {panels.map((panel, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.13 }}
              viewport={{ once: true }}
              className="group relative overflow-hidden rounded-md border border-[#7DBBFF]/15"
              style={{ minHeight: 580 }}
            >
              {/* Background image */}
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />

              {/* Gradient overlay — top lighter, bottom darker for text */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/5" />

              {/* Blue tint glow */}
              <div className="absolute inset-0 bg-linear-to-br from-[#0066FF]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 z-10 p-8 md:p-10">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 + 0.2 }}
                  viewport={{ once: true }}
                  className="text-xs font-bold uppercase tracking-[0.18em] text-[#7DBBFF]"
                >
                  {panel.eyebrow}
                </motion.p>

                <h3 className="mt-3 whitespace-pre-line text-3xl font-black leading-tight text-white md:text-[36px]">
                  {panel.title}
                </h3>

                <p className="mt-2 text-sm text-white/60">{panel.subtitle}</p>

                <Link href={panel.href}>
                  <motion.span
                    whileHover={{ scale: 1.03, x: 4 }}
                    whileTap={{ scale: 0.97 }}
                    className="group/btn mt-6 inline-flex cursor-pointer items-center gap-2.5 rounded-md border border-white/25 bg-white/15 px-6 py-3 text-sm font-bold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:bg-white/25"
                  >
                    {panel.cta}
                    <ArrowRight
                      size={14}
                      className="transition-transform duration-200 group-hover/btn:translate-x-1"
                    />
                  </motion.span>
                </Link>
              </div>

              {/* Corner badge */}
              <div className="absolute right-5 top-5 z-10 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white/70 backdrop-blur-sm">
                {i === 0 ? "New In" : "Featured"}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}