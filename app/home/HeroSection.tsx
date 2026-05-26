"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const slides = [
  {
    id: 1,
    series: "PlayStation 5 Slim",
    title: "Next-Gen Gaming\nStarts Here",
    subtitle: "Eid Special — Limited Stock",
    cta: "Shop Now",
    ctaHref: "/shop",
    bg: "/images/banners/promo-1.png",
    accent: "#0066FF",
  },
  {
    id: 2,
    series: "Razer Collection",
    title: "20% OFF All\nRazer Products",
    subtitle: "Weekend Flash Sale",
    cta: "Shop Now",
    ctaHref: "/shop",
    bg: "/images/banners/promo-2.png",
    accent: "#7DBBFF",
  },
  {
    id: 3,
    series: "Luxury Smartphones",
    title: "Future In\nYour Hands",
    subtitle: "New Arrivals 2026",
    cta: "Shop Now",
    ctaHref: "/shop",
    bg: "/images/banners/promo-3.png",
    accent: "#7DBBFF",
  },
  {
    id: 4,
    series: "Smart Workspaces",
    title: "Minimal\nProductivity",
    subtitle: "Premium Setup Collection",
    cta: "Shop Now",
    ctaHref: "/shop",
    bg: "/images/banners/promo-4.png",
    accent: "#0066FF",
  },
];

export default function HeroSection() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = slides[active];

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setActive((p) => (p + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [paused]);

  return (
    /*
      90vh — pairs with HeroStatsBar at 10vh to fill 100vh exactly.
      No separate white spacer div needed; navbar is fixed+floating so
      it overlays the top of this section. pt-24 inside the content
      clears the navbar comfortably.
    */
    <section
      className="relative w-full overflow-hidden"
      style={{ height: "90vh", minHeight: 520 }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ── Full-bleed background image crossfade ───────────────────────── */}
      <AnimatePresence>
        <motion.div
          key={`bg-${active}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.85, ease: "easeInOut" }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={slide.bg}
            alt=""
            fill
            className="object-cover object-center"
            priority
          />
          {/* Left scrim: keeps text readable; fades out right so product shows */}
          <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/50 to-transparent" />
          {/* Bottom fade: softens into the HeroStatsBar below */}
          <div className="absolute bottom-0 inset-x-0 h-28 bg-linear-to-t from-black/30 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* ── Glow orbs ───────────────────────────────────────────────────── */}
      <div className="pointer-events-none absolute inset-0 z-1">
        <div className="absolute left-[-4%] top-[10%] h-95 w-95 rounded-full bg-[#0066FF]/15 blur-[100px]" />
        <div className="absolute bottom-[5%] right-[-4%] h-75 w-75 rounded-full bg-[#7DBBFF]/15 blur-[80px]" />
      </div>

      {/* ── Content ─────────────────────────────────────────────────────── */}
      <div className="relative z-10 h-full w-full">
        <div className="mx-auto grid h-full max-w-360 grid-cols-1 items-center px-8 lg:grid-cols-2 lg:px-16">

          {/* LEFT — text */}
          <div className="flex flex-col justify-center pt-24 pb-10">

            {/* Series badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`badge-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
                className="flex w-fit items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-1.5 backdrop-blur-sm"
              >
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full"
                  style={{ backgroundColor: slide.accent }}
                />
                <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/70">
                  {slide.series}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Headline */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={`title-${active}`}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -22 }}
                transition={{
                  duration: 0.48,
                  delay: 0.05,
                  ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                }}
                className="mt-4 whitespace-pre-line font-black leading-none tracking-tight text-white"
                style={{ fontSize: "clamp(2.6rem, 5.5vw, 4.2rem)" }}
              >
                {slide.title}
              </motion.h1>
            </AnimatePresence>

            {/* Blue accent line */}
            <motion.div
              key={`line-${active}`}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              style={{ originX: 0, width: 64 }}
              className="mt-4 h-1 rounded-full bg-linear-to-r from-[#0066FF] to-[#7DBBFF]"
            />

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`sub-${active}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, delay: 0.12 }}
                className="mt-4 text-sm font-medium text-white/55"
              >
                {slide.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.2 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href={slide.ctaHref}>
                <motion.span
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex cursor-pointer items-center gap-2 rounded-md border-2 border-white bg-white px-7 py-3.5 text-sm font-bold text-gray-900 transition-all duration-200 hover:border-[#0066FF] hover:bg-[#0066FF] hover:text-white"
                >
                  {slide.cta}
                  <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                </motion.span>
              </Link>
              <Link href="/shop">
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex cursor-pointer items-center gap-2 rounded-md border-2 border-white/30 px-7 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:border-white hover:bg-white/10"
                >
                  Learn More
                </motion.span>
              </Link>
            </motion.div>

            {/* Trust micro-badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-2.5"
            >
              {[
                { value: "100%", label: "Authentic" },
                { value: "4.9★", label: "Rated"     },
                { value: "8+",   label: "Years"     },
              ].map((b, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 rounded-lg border border-white/12 bg-white/8 px-3 py-1.5 backdrop-blur-sm"
                >
                  <span className="text-sm font-black text-white">{b.value}</span>
                  <span className="text-[11px] font-medium text-white/50">{b.label}</span>
                </div>
              ))}
            </motion.div>

            {/* Slide dots */}
            <div className="mt-8 flex items-center gap-2.5">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <motion.span
                    animate={{
                      width: i === active ? 28 : 7,
                      backgroundColor:
                        i === active ? "#fff" : "rgba(255,255,255,0.28)",
                    }}
                    transition={{ duration: 0.3 }}
                    className="block h-1 rounded-full"
                    style={{ width: 7 }}
                  />
                </button>
              ))}
              <span className="ml-1.5 text-[11px] font-semibold text-white/35">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(slides.length).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* RIGHT — glow only (bg image IS the product visual) */}
          <div className="relative hidden h-full items-center justify-center lg:flex">
            <AnimatePresence>
              <motion.div
                key={`glow-${active}`}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div
                  className="h-80 w-80 rounded-full blur-[90px]"
                  style={{ backgroundColor: `${slide.accent}22` }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}