"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

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

const GROW_ACTIVE   = 5.5;
const GROW_INACTIVE = 1;

function MobileCarousel() {
  const [current, setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const dragStartX = useRef(0);

  const goTo = (index: number) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  const prev = () => { if (current > 0) goTo(current - 1); };
  const next = () => { if (current < panels.length - 1) goTo(current + 1); };

  const panel = panels[current];

  const variants = {
    enter:  (d: number) => ({ x: d > 0 ? "60%" : "-60%", opacity: 0, scale: 0.92 }),
    center: {               x: 0,                          opacity: 1, scale: 1      },
    exit:   (d: number) => ({ x: d > 0 ? "-60%" : "60%",  opacity: 0, scale: 0.92 }),
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-md"
        style={{ height: "clamp(300px, 62vw, 440px)" }}
        onPointerDown={(e) => { dragStartX.current = e.clientX; }}
        onPointerUp={(e) => {
          const delta = e.clientX - dragStartX.current;
          if (delta < -40 && current < panels.length - 1) next();
          if (delta >  40 && current > 0)                 prev();
        }}
      >
        <AnimatePresence custom={direction} mode="popLayout">
          <motion.div
            key={panel.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            {/* Image */}
            <Image
              src={panel.image}
              alt={panel.title}
              fill
              className="object-cover object-center"
              sizes="100vw"
              priority
            />

            {/* Gradient scrim */}
            <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-black/10" />

            {/* Blue tint */}
            <div className="absolute inset-0 bg-linear-to-br from-[#0066FF]/12 to-transparent" />

            {/* Top label pill */}
            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-[#7DBBFF]" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/80">
                {panel.label}
              </span>
            </div>

            {/* Counter top-right */}
            <div className="absolute right-5 top-5 rounded-full border border-white/15 bg-black/30 px-3 py-1 backdrop-blur-sm">
              <span className="text-[11px] font-bold text-white/60">
                {String(current + 1).padStart(2, "0")}&nbsp;/&nbsp;{String(panels.length).padStart(2, "0")}
              </span>
            </div>

            {/* Bottom content */}
            <div className="absolute bottom-0 inset-x-0 p-5">
              <h3 className="whitespace-pre-line text-[1.75rem] font-black leading-tight tracking-tight text-white">
                {panel.title}
              </h3>
              <p className="mt-1.5 text-[13px] text-white/60">{panel.subtitle}</p>

              <Link href={panel.href}>
                <motion.span
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.96 }}
                  className="group mt-4 inline-flex cursor-pointer items-center gap-2 rounded-md border-2 border-white bg-white px-5 py-2.5 text-[13px] font-bold text-gray-900 transition-all duration-200 hover:border-[#0066FF] hover:bg-[#0066FF] hover:text-white"
                >
                  {panel.cta}
                  <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
                </motion.span>
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls row: prev / dots / next */}
      <div className="flex items-center justify-between px-1">
        {/* Prev arrow */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          onClick={prev}
          disabled={current === 0}
          aria-label="Previous"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:border-[#0066FF]/40 hover:text-[#0066FF] disabled:pointer-events-none disabled:opacity-25"
        >
          <ChevronLeft size={16} />
        </motion.button>

        {/* Dot indicators */}
        <div className="flex items-center gap-2">
          {panels.map((p, i) => (
            <button key={p.id} onClick={() => goTo(i)} aria-label={`Go to ${p.label}`}>
              <motion.span
                animate={{
                  width:           i === current ? 24 : 7,
                  backgroundColor: i === current ? "#0066FF" : "rgba(0,102,255,0.18)",
                }}
                transition={{ duration: 0.28 }}
                className="block h-2 rounded-full"
                style={{ width: 7 }}
              />
            </button>
          ))}
        </div>

        {/* Next arrow */}
        <motion.button
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.93 }}
          onClick={next}
          disabled={current === panels.length - 1}
          aria-label="Next"
          className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-400 shadow-sm transition-all hover:border-[#0066FF]/40 hover:text-[#0066FF] disabled:pointer-events-none disabled:opacity-25"
        >
          <ChevronRight size={16} />
        </motion.button>
      </div>

      {/* Category strip — all 4 as tappable thumb tabs below */}
      <div className="grid grid-cols-4 gap-2">
        {panels.map((p, i) => (
          <motion.button
            key={p.id}
            whileTap={{ scale: 0.94 }}
            onClick={() => goTo(i)}
            className={`relative overflow-hidden rounded-md border transition-all duration-200 ${
              i === current
                ? "border-[#0066FF]/40 shadow-[0_0_14px_rgba(0,102,255,0.15)]"
                : "border-gray-100"
            }`}
            style={{ paddingBottom: "75%" }}
          >
            <Image
              src={p.image}
              alt={p.label}
              fill
              className="object-cover object-center"
              sizes="25vw"
            />
            <div
              className={`absolute inset-0 transition-all duration-200 ${
                i === current
                  ? "bg-linear-to-t from-[#0066FF]/70 to-[#0066FF]/20"
                  : "bg-linear-to-t from-black/60 to-black/20"
              }`}
            />
            <span className="absolute inset-x-0 bottom-1.5 text-center text-[9px] font-bold uppercase tracking-wider text-white/90">
              {p.label}
            </span>
          </motion.button>
        ))}
      </div>
    </div>
  );
}

export default function ExpandingShowcaseSection() {
  const [active, setActive] = useState(1);

  return (
    <section className="relative overflow-hidden bg-white px-6 py-16 lg:px-16">

      {/* Section heading */}
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

      {/* MOBILE + TABLET  (< lg) */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="block lg:hidden"
      >
        <MobileCarousel />
      </motion.div>

      {/* DESKTOP  (≥ lg) — UNCHANGED */}
      <motion.div
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.1 }}
        className="hidden lg:flex gap-2 overflow-hidden rounded-md"
        style={{ height: "clamp(320px, 48vw, 560px)" }}
      >
        {panels.map((panel) => {
          const isActive = panel.id === active;

          return (
            <motion.div
              key={panel.id}
              animate={{ flexGrow: isActive ? GROW_ACTIVE : GROW_INACTIVE }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={() => setActive(panel.id)}
              className="relative shrink-0 cursor-pointer overflow-hidden"
              style={{
                flexGrow:  panel.id === 1 ? GROW_ACTIVE : GROW_INACTIVE,
                flexBasis: 0,
                minWidth:  52,
              }}
            >
              <Image
                src={panel.image}
                alt={panel.title}
                fill
                className="object-cover object-center transition-transform duration-700 hover:scale-[1.03]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />

              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: isActive
                    ? "linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.05) 100%)"
                    : "linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.6) 100%)",
                }}
              />

              <motion.div
                animate={{ opacity: isActive ? 1 : 0 }}
                transition={{ duration: 0.4 }}
                className="absolute inset-0 bg-linear-to-br from-[#0066FF]/15 to-transparent"
              />

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

              <motion.div
                animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 12 }}
                transition={{ duration: 0.35, delay: isActive ? 0.18 : 0 }}
                className="absolute bottom-0 left-0 right-0 z-10 flex items-end justify-between p-7 md:p-9"
              >
                <div className="flex flex-col gap-1">
                  <h3
                    className="whitespace-pre-line font-black leading-tight text-white"
                    style={{ fontSize: "clamp(1.4rem, 2.4vw, 2rem)" }}
                  >
                    {panel.title}
                  </h3>
                  <p className="text-sm text-white/65">{panel.subtitle}</p>
                </div>

                <Link href={panel.href} className="shrink-0">
                  <motion.span
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    className="group ml-6 inline-flex cursor-pointer items-center gap-2 rounded-md border-2 border-white bg-white px-5 py-2.5 text-sm font-bold text-gray-900 transition-all duration-200 hover:border-[#0066FF] hover:bg-[#0066FF] hover:text-white"
                  >
                    {panel.cta}
                    <ArrowRight size={14} className="transition-transform duration-200 group-hover:translate-x-1" />
                  </motion.span>
                </Link>
              </motion.div>

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

      {/* Desktop dot indicators */}
      <div className="mt-5 hidden items-center justify-center gap-2.5 lg:flex">
        {panels.map((p) => (
          <button key={p.id} onClick={() => setActive(p.id)} aria-label={`View ${p.label}`}>
            <motion.span
              animate={{
                width:           p.id === active ? 24 : 7,
                backgroundColor: p.id === active ? "#0066FF" : "rgba(0,102,255,0.2)",
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