"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

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
    bg: "from-[#0052CC80] via-[#0066FF] to-[#3B9FFF80]",
    textAccent: "#D9EEFF",
    stats: [
      { value: "50%",  label: "Discounts"  },
      { value: "24H",  label: "Flash Deals" },
      { value: "100+", label: "Products"   },
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
    image: "/images/banners/promo-10.png",
    bg: "from-[#11182780] via-[#1E293B] to-[#0F346080]",
    textAccent: "#7DBBFF",
    stats: [
      { value: "PS5", label: "In Stock"    },
      { value: "RTX", label: "Gaming GPUs" },
      { value: "4K",  label: "Displays"   },
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
    image: "/images/banners/promo-20.png",
    bg: "from-[#003D1F80] via-[#00572C] to-[#007A3D80]",
    textAccent: "#86EFAC",
    stats: [
      { value: "20%",  label: "Off Everything" },
      { value: "48H",  label: "Remaining"      },
      { value: "Free", label: "Shipping"       },
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
    image: "/images/banners/promo-30.png",
    bg: "from-[#1A0533] via-[#2D0B55] to-[#4C1D95]",
    textAccent: "#C4B5FD",
    stats: [
      { value: "A19",   label: "Pro Chip" },
      { value: "200MP", label: "Camera"   },
      { value: "5G",    label: "Ready"    },
    ],
  },
];

const INTERVAL = 5000;

function useCarousel() {
  const [current,   setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused,    setPaused]    = useState(false);
  const [progress,  setProgress]  = useState(0);
  const timerRef    = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goTo = (idx: number, dir?: number) => {
    setDirection(dir ?? (idx > current ? 1 : -1));
    setCurrent(idx);
    setProgress(0);
  };
  const prev = () => goTo((current - 1 + slides.length) % slides.length, -1);
  const next = () => goTo((current + 1) % slides.length, 1);

  useEffect(() => {
    if (paused) {
      if (timerRef.current)    clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
      return;
    }
    setProgress(0);
    const tick  = 50;
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
      if (timerRef.current)    clearInterval(timerRef.current);
      if (progressRef.current) clearInterval(progressRef.current);
    };
  }, [current, paused]);

  return { current, direction, paused, progress, setPaused, goTo, prev, next };
}

const slideVariants = {
  enter:  (d: number) => ({ x: d > 0 ? "100%" : "-100%", opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } },
  exit:   (d: number) => ({ x: d > 0 ? "-60%" : "60%", opacity: 0, transition: { duration: 0.35 } }),
};

// ─── MOBILE + TABLET  (< lg) ──────────────────────────────────────────────────

function MobileCarousel() {
  const { current, direction, paused, progress, setPaused, goTo, prev, next } = useCarousel();
  const slide = slides[current];

  return (
    <section className="relative w-full overflow-hidden bg-white lg:hidden">

      {/* Banner area — swipe left/right to change slide */}
      <motion.div
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: "clamp(380px, 100vw, 480px)" }}
        onTouchStart={() => setPaused(true)}
        onTouchEnd={() => setPaused(false)}
        onPanEnd={(_e, info) => {
          if (info.offset.x < -40) next();
          else if (info.offset.x > 40) prev();
        }}
      >
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={current}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className={`absolute inset-0 bg-linear-to-br ${slide.bg}`}
          >
            {/* Dot texture */}
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, #ffffff18 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            {/* Animated glow blobs */}
            <motion.div
              animate={{ x: [0, 40, 0], y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
              className="pointer-events-none absolute left-[5%] top-[5%] h-48 w-48 rounded-full bg-white/10 blur-3xl"
            />

            {/* Product image — top-right, partial crop for style */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
              className="absolute right-0 top-0 h-[65%] w-[55%]"
            >
              {/* Accent glow behind product */}
              <div
                className="absolute inset-0"
                style={{ background: `radial-gradient(ellipse at 60% 40%, ${slide.textAccent}30 0%, transparent 70%)` }}
              />
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-contain object-top-right drop-shadow-[0_16px_40px_rgba(0,0,0,0.3)]"
                priority
              />
            </motion.div>

            {/* Bottom fade so product blends into content area */}
            <div className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-black/40 to-transparent" />

            {/* Content — bottom-left */}
            <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-6">

              {/* Badge pill */}
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
                className="mb-3 flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 backdrop-blur-sm"
              >
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
                <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                  {slide.label}
                </span>
                <span
                  className="ml-0.5 rounded-full px-2 py-0.5 text-[9px] font-black"
                  style={{ backgroundColor: "rgba(255,255,255,0.15)", color: slide.textAccent }}
                >
                  {slide.badge}
                </span>
              </motion.div>

              {/* Headline */}
              <motion.h2
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.42, delay: 0.13 }}
                className="whitespace-pre-line text-[1.75rem] font-black leading-none tracking-tight text-white"
              >
                {slide.title}
              </motion.h2>

              {/* Stats row */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.18 }}
                className="mt-3 flex items-center gap-5"
              >
                {slide.stats.map((s, i) => (
                  <div key={i} className="flex flex-col">
                    <span className="text-[17px] font-black leading-none" style={{ color: slide.textAccent }}>
                      {s.value}
                    </span>
                    <span className="mt-0.5 text-[9px] font-semibold uppercase tracking-wider text-white/50">
                      {s.label}
                    </span>
                  </div>
                ))}
              </motion.div>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.38, delay: 0.22 }}
                className="mt-4 flex items-center gap-2"
              >
                <Link href={slide.href}>
                  <motion.span
                    whileTap={{ scale: 0.96 }}
                    className="group inline-flex cursor-pointer items-center gap-1.5 border-2 rounded-md border-white bg-white px-5 py-2.5 text-[13px] font-bold text-gray-900 transition-all duration-200 hover:bg-transparent hover:text-white"
                  >
                    {slide.cta}
                    <ArrowRight size={12} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </motion.span>
                </Link>
                <Link href="/shop">
                  <motion.span
                    whileTap={{ scale: 0.96 }}
                    className="inline-flex cursor-pointer items-center border-2 rounded-md border-white/25 px-5 py-2.5 text-[13px] font-semibold text-white/80 transition-all duration-200 hover:border-white/50 hover:text-white"
                  >
                    Explore All
                  </motion.span>
                </Link>
              </motion.div>
            </div>

          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Bottom strip — dots only, no text labels, compact */}
      <div className="flex items-center justify-between gap-3 border-b border-[#7DBBFF]/10 bg-[#F8FBFF] px-4 py-2.5">
        {/* Dots */}
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`}>
              <motion.span
                animate={{
                  backgroundColor: i === current ? "#0066FF" : "rgba(0,102,255,0.2)",
                  width: i === current ? 20 : 7,
                }}
                transition={{ duration: 0.28 }}
                className="block h-2 rounded-full"
                style={{ width: 7 }}
              />
            </button>
          ))}
        </div>

        {/* Progress bar */}
        <div className="flex flex-1 items-center gap-2">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#0066FF]/10">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
              className="h-full rounded-full bg-linear-to-r from-[#0066FF] to-[#7DBBFF]"
            />
          </div>
          <span className="text-[10px] font-semibold text-gray-400">{paused ? "Paused" : "Auto"}</span>
        </div>
      </div>
    </section>
  );
}

// ─── DESKTOP  (≥ lg) — COMPLETELY UNCHANGED ───────────────────────────────────

function DesktopCarousel() {
  const { current, direction, paused, progress, setPaused, goTo, prev, next } = useCarousel();
  const slide = slides[current];

  return (
    <section className="relative hidden w-full overflow-hidden bg-white lg:block">
      <motion.div
        className="relative w-full overflow-hidden cursor-grab active:cursor-grabbing"
        style={{ height: "clamp(360px, 44vw, 520px)" }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onPanEnd={(_e, info) => {
          if (info.offset.x < -60) next();
          else if (info.offset.x > 60) prev();
        }}
      >
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
            <div
              className="pointer-events-none absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, #ffffff18 1px, transparent 1px)",
                backgroundSize: "28px 28px",
              }}
            />
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

            <div className="relative z-10 mx-auto flex h-full max-w-360 items-center gap-0 px-16 lg:px-24">
              <div className="flex flex-1 flex-col justify-center">
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

                <motion.h2
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.45, delay: 0.12 }}
                  className="whitespace-pre-line font-black leading-none tracking-tight text-white"
                  style={{ fontSize: "clamp(2rem, 3.8vw, 3.2rem)" }}
                >
                  {slide.title}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.18 }}
                  className="mt-3 max-w-md text-sm leading-relaxed text-white/65"
                >
                  {slide.subtitle}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.22 }}
                  className="mt-6 flex items-center gap-4"
                >
                  {slide.stats.map((s, i) => (
                    <div key={i} className="flex flex-col items-start">
                      <span className="text-2xl font-black leading-none" style={{ color: slide.textAccent }}>
                        {s.value}
                      </span>
                      <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-wider text-white/50">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </motion.div>

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
                      className="group inline-flex cursor-pointer items-center gap-2 border-2 rounded-md border-white bg-white px-7 py-3 text-sm font-bold text-gray-900 transition-all duration-200 hover:bg-transparent hover:text-white"
                    >
                      {slide.cta}
                      <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                    </motion.span>
                  </Link>
                  <Link href="/shop">
                    <motion.span
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      className="inline-flex cursor-pointer items-center gap-2 border-2 rounded-md border-white/25 px-7 py-3 text-sm font-semibold text-white/80 transition-all duration-200 hover:border-white/50 hover:text-white"
                    >
                      Explore All
                    </motion.span>
                  </Link>
                </motion.div>
              </div>

              <div className="relative hidden h-full w-[42%] items-center justify-center lg:flex">
                <div className="absolute inset-0 flex items-center justify-center" style={{ filter: "blur(60px)" }}>
                  <div className="h-64 w-64 rounded-full opacity-40" style={{ backgroundColor: slide.textAccent }} />
                </div>
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
      </motion.div>

      <div className="flex items-center justify-between gap-4 border-b border-[#7DBBFF]/10 bg-[#F8FBFF] px-16 py-3 lg:px-24">
        <div className="flex items-center gap-2">
          {slides.map((s, i) => (
            <button key={i} onClick={() => goTo(i)} aria-label={`Slide ${i + 1}`} className="group relative flex items-center gap-2 rounded-full px-3 py-1.5 transition-all duration-200 hover:bg-[#0066FF]/8">
              <motion.span
                animate={{
                  backgroundColor: i === current ? "#0066FF" : "rgba(0,102,255,0.2)",
                  width: i === current ? 24 : 8,
                }}
                transition={{ duration: 0.3 }}
                className="block h-2 rounded-full"
                style={{ width: 8 }}
              />
              <span className={`hidden text-[11px] font-semibold transition-colors duration-200 sm:block ${i === current ? "text-[#0066FF]" : "text-gray-400 group-hover:text-gray-600"}`}>
                {s.label}
              </span>
            </button>
          ))}
        </div>
        <div className="flex flex-1 items-center gap-3">
          <div className="h-1 flex-1 overflow-hidden rounded-full bg-[#0066FF]/10">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.05, ease: "linear" }}
              className="h-full rounded-full bg-linear-to-r from-[#0066FF] to-[#7DBBFF]"
            />
          </div>
          <span className="text-[10px] font-semibold text-gray-400">{paused ? "Paused" : "Auto"}</span>
        </div>
      </div>
    </section>
  );
}

// ─── Exports ──────────────────────────────────────────────────────────────────

export default function PromoBannerSection() {
  return (
    <>
      <MobileCarousel />
      <DesktopCarousel />
    </>
  );
}