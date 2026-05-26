"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// ─── Slide data ───────────────────────────────────────────────────────────────
// Add / remove slides freely. bg is a CSS gradient string.

const slides = [
  {
    id: 0,
    label: "Limited Time Offer",
    title: "Upgrade Your\nTech Experience",
    subtitle: "Premium electronics with exclusive limited-time prices.",
    cta: "Shop Deals",
    href: "/shop",
    badge: "Up to 50% OFF",
    image: "/images/banners/promo-headphones.png",
    bg: "from-[#0052CC] via-[#0066FF] to-[#3B9FFF]",
    textAccent: "#D9EEFF",
    stats: [
      { value: "50%", label: "Discounts" },
      { value: "24H", label: "Flash Deals" },
      { value: "100+", label: "Products" },
    ],
  },
  {
    id: 1,
    label: "New Arrivals",
    title: "Next-Gen Gaming\nStarts Here",
    subtitle: "The latest consoles, peripherals & gaming setups.",
    cta: "Shop Gaming",
    href: "/shop",
    badge: "Just Landed",
    image: "/images/banners/promo-1.png",
    bg: "from-[#111827] via-[#1E293B] to-[#0F3460]",
    textAccent: "#7DBBFF",
    stats: [
      { value: "PS5", label: "In Stock" },
      { value: "RTX", label: "Gaming GPUs" },
      { value: "4K",  label: "Displays" },
    ],
  },
  {
    id: 2,
    label: "Weekend Flash Sale",
    title: "20% OFF All\nRazer Products",
    subtitle: "World-class gaming peripherals at exclusive member prices.",
    cta: "Grab the Deal",
    href: "/shop",
    badge: "Ends Sunday",
    image: "/images/banners/promo-2.png",
    bg: "from-[#003D1F] via-[#00572C] to-[#007A3D]",
    textAccent: "#86EFAC",
    stats: [
      { value: "20%", label: "Off Everything" },
      { value: "48H", label: "Remaining" },
      { value: "Free", label: "Shipping" },
    ],
  },
  {
    id: 3,
    label: "Premium Collection",
    title: "Future In\nYour Hands",
    subtitle: "Flagship smartphones from Apple, Samsung & more.",
    cta: "Shop Phones",
    href: "/shop",
    badge: "2026 Models",
    image: "/images/banners/promo-3.png",
    bg: "from-[#1A0533] via-[#2D0B55] to-[#4C1D95]",
    textAccent: "#C4B5FD",
    stats: [
      { value: "A19", label: "Pro Chip" },
      { value: "200MP", label: "Camera" },
      { value: "5G", label: "Ready" },
    ],
  },
];

const INTERVAL = 5000; // ms between auto-advance

// ─── Component ────────────────────────────────────────────────────────────────

export default function PromoBannerSection() {
  const [current, setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);   // 1 = forward, -1 = back
  const [paused, setPaused]     = useState(false);
  const [progress, setProgress] = useState(0);     // 0–100 for the progress bar
  const timerRef                = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef             = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number, dir?: number) => {
    setDirection(dir ?? (idx > current ? 1 : -1));
    setCurrent(idx);
    setProgress(0);
  };

  const prev = () => goTo((current - 1 + slides.length) % slides.length, -1);
  const next = () => goTo((current + 1) % slides.length, 1);

  // Auto-advance + progress bar
  useEffect(() => {
    if (paused) {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }

    setProgress(0);
    const tick = 50; // ms per progress tick
    const steps = INTERVAL / tick;

    progressRef.current = setInterval(() => {
      setProgress((p) => Math.min(100, p + 100 / steps));
    }, tick);

    timerRef.current = setInterval(() => {
      setDirection(1);
      setCurrent((c) => (c + 1) % slides.length);
      setProgress(0);
    }, INTERVAL);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current, paused]);

  const slide = slides[current];

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: (d: number) => ({
      x: d > 0 ? "-60%" : "60%",
      opacity: 0,
      transition: { duration: 0.35 },
    }),
  };

  return (
    <section className="relative w-full overflow-hidden bg-white">

      {/*
        ── CAROUSEL STRIP ──────────────────────────────────────────────────
        Fixed height — this is the actual banner strip like Amazon / Best Buy
      */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(360px, 44vw, 520px)" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >

        {/* ── Slides ───────────────────────────────────────────────────── */}
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className={`absolute inset-0 bg-linear-to-r ${slide.bg}`}
          >
            {/* Dot texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, #ffffff18 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />

            {/* Animated glow blobs */}
            <motion.div
              animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
              transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
              className="pointer-events-none absolute left-[5%] top-[10%] h-64 w-64 rounded-full bg-white/10 blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -40, 0], y: [0, 40, 0] }}
              transition={{ repeat: Infinity, duration: 11, ease: "easeInOut" }}
              className="pointer-events-none absolute bottom-[5%] right-[10%] h-72 w-72 rounded-full bg-white/8 blur-3xl"
            />

            {/* Content grid */}
            <div className="relative z-10 mx-auto flex h-full max-w-360 items-center gap-0 px-16 lg:px-24">

              {/* LEFT — text content */}
              <div className="flex flex-1 flex-col justify-center">

                {/* Badge pill */}
                <motion.div
                  initial={{ opacity: 0, y: -12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.08 }}
                  className="mb-5 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm"
                >
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                  <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                    {slide.label}
                  </span>
                  <span
                    className="ml-1 rounded-full px-2 py-0.5 text-[10px] font-black"
                    style={{ backgroundColor: "rgba(255,255,255,0.18)", color: slide.textAccent }}
                  >
                    {slide.badge}
                  </span>
                </motion.div>

                {/* Headline */}
                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 }}
                  className="whitespace-pre-line font-black leading-none tracking-tight text-white"
                  style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
                >
                  {slide.title}
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.18 }}
                  className="mt-3 max-w-md text-sm leading-relaxed text-white/65"
                >
                  {slide.subtitle}
                </motion.p>

                {/* Stats row */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.22 }}
                  className="mt-6 flex items-center gap-4"
                >
                  {slide.stats.map((s, i) => (
                    <div key={i} className="flex flex-col items-start">
                      <span
                        className="text-2xl font-black leading-none"
                        style={{ color: slide.textAccent }}
                      >
                        {s.value}
                      </span>
                      <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                        {s.label}
                      </span>
                    </div>
                  ))}
                  {/* Divider between stat items */}
                  {/* Already spaced by gap-4 */}
                </motion.div>

                {/* CTA buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.26 }}
                  className="mt-8 flex items-center gap-3"
                >
                  <Link href={slide.href}>
                    <motion.span
                      whileHover={{ scale: 1.04, y: -2 }}
                      whileTap={{ scale: 0.97 }}
                      className="group inline-flex cursor-pointer items-center gap-2 border-2 border-white bg-white px-7 py-3 text-sm font-bold text-gray-900 transition-all duration-200 hover:bg-transparent hover:text-white"
                    >
                      {slide.cta}
                      <ArrowRight
                        size={14}
                        className="transition-transform duration-200 group-hover:translate-x-1"
                      />
                    </motion.span>
                  </Link>
                  <Link href="/shop">
                    <motion.span
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex cursor-pointer items-center gap-2 border-2 border-white/25 px-7 py-3 text-sm font-semibold text-white/80 transition-all duration-200 hover:border-white/50 hover:text-white"
                    >
                      Explore All
                    </motion.span>
                  </Link>
                </motion.div>
              </div>

              {/* RIGHT — product image */}
              <div className="relative hidden h-full w-[42%] items-center justify-center lg:flex">
                {/* Glow */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ filter: "blur(60px)" }}
                >
                  <div
                    className="h-64 w-64 rounded-full opacity-40"
                    style={{ backgroundColor: slide.textAccent }}
                  />
                </div>

                {/* Product */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.88, x: 30 }}
                  animate={{ opacity: 1, scale: 1, x: 0 }}
                  transition={{ duration: 0.55, delay: 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                  className="relative z-10 h-[85%] w-full"
                >
                  <Image
                    src={slide.image}
                    alt={slide.title}
                    fill
                    className="object-contain drop-shadow-[0_20px_48px_rgba(0,0,0,0.35)]"
                    priority
                  />
                </motion.div>

                {/* Floating price chip */}
                <motion.div
                  animate={{ y: [0, -9, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="absolute bottom-10 left-4 z-20 rounded-2xl border border-white/15 bg-white/10 px-4 py-3 backdrop-blur-2xl"
                >
                  <p className="text-[10px] font-semibold text-white/50">Starting from</p>
                  <p className="mt-0.5 text-xl font-black text-white">$249</p>
                </motion.div>
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        {/* ── Arrow buttons ─────────────────────────────────────────────── */}
        <button
          onClick={prev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/40"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={next}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 z-20 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/20 text-white backdrop-blur-sm transition-all duration-200 hover:bg-black/40"
        >
          <ChevronRight size={20} />
        </button>

        {/* ── Slide counter top-right ──────────────────────────────────── */}
        <div className="absolute right-16 top-5 z-20 rounded-full border border-white/15 bg-black/20 px-3 py-1 backdrop-blur-sm">
          <span className="text-[11px] font-bold text-white/70">
            {String(current + 1).padStart(2, "0")} / {String(slides.length).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════════════
          BOTTOM STRIP — dots + progress bar
          ══════════════════════════════════════════════════════════════════ */}
      <div className="flex items-center justify-between gap-4 border-b border-[#7DBBFF]/10 bg-[#F8FBFF] px-16 py-3 lg:px-24">

        {/* Dot thumbnails — clicking jumps to slide */}
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Slide ${i + 1}`}
              className="group relative flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200 hover:bg-[#0066FF]/8"
            >
              <motion.span
                animate={{
                  backgroundColor: i === current ? "#0066FF" : "rgba(0,102,255,0.2)",
                  width: i === current ? 24 : 8,
                }}
                transition={{ duration: 0.3 }}
                className="block h-2 rounded-full"
                style={{ width: 8 }}
              />
              <span
                className={`hidden text-[11px] font-semibold transition-colors duration-200 sm:block ${
                  i === current ? "text-[#0066FF]" : "text-gray-400 group-hover:text-gray-600"
                }`}
              >
                {s.label}
              </span>
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex flex-1 items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#0066FF]/10">
            <motion.div
              animate={{ width: `${paused ? progress : progress}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
              className="h-full rounded-full bg-linear-to-r from-[#0066FF] to-[#7DBBFF]"
            />
          </div>
          {/* Pause / play indicator */}
          <span className="text-[10px] font-semibold text-gray-400">
            {paused ? "Paused" : "Auto"}
          </span>
        </div>

      </div>
    </section>
  );
}