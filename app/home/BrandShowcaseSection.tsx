"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";
import { ArrowRight } from "lucide-react";

const brands = [
  { name: "Apple",    logo: "/images/brands/apple.svg",    tag: "Phones · Laptops · Wearables",   color: "#555555" },
  { name: "Samsung",  logo: "/images/brands/samsung.svg",  tag: "Phones · TVs · Smart Devices",   color: "#1428A0" },
  { name: "Sony",     logo: "/images/brands/sony.svg",     tag: "Audio · Cameras · Gaming",       color: "#111111" },
  { name: "Asus",     logo: "/images/brands/asus.svg",     tag: "Laptops · Monitors · ROG Gear",  color: "#111111" },
  { name: "MSI",      logo: "/images/brands/msi.svg",      tag: "Gaming PCs · Laptops · GPUs",    color: "#D4001A" },
  { name: "JBL",      logo: "/images/brands/jbl.svg",      tag: "Speakers · Earbuds · Audio",     color: "#FF6B00" },
  { name: "Logitech", logo: "/images/brands/logitech.svg", tag: "Mice · Keyboards · Webcams",     color: "#00B4D8" },
  { name: "Razer",    logo: "/images/brands/razer.svg",    tag: "Gaming Gear · RGB · Peripherals",color: "#00D455" },
];

// Triple-duplicate — 3× ensures seamless loop at any viewport width
const ROW_A = [...brands, ...brands, ...brands];
const ROW_B = [
  ...brands.slice(4), ...brands.slice(0, 4),
  ...brands.slice(4), ...brands.slice(0, 4),
  ...brands.slice(4), ...brands.slice(0, 4),
];

const CARD_W = 200; // px — must match minWidth on BrandCard
const GAP    = 16;  // px — gap-4

function BrandCard({ brand }: { brand: (typeof brands)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -7, scale: 1.05 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
      className="group relative flex flex-col items-center overflow-hidden rounded-2xl border border-[#7DBBFF]/15 bg-white px-7 py-6 shadow-[0_2px_16px_rgba(0,102,255,0.05)] transition-shadow duration-300 hover:border-[#7DBBFF]/30 hover:shadow-[0_8px_32px_rgba(0,102,255,0.12)]"
      style={{ minWidth: CARD_W, width: CARD_W }}
    >
      {/* Brand-colored glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 70%, ${brand.color}12, transparent 65%)`,
        }}
      />

      {/* Logo */}
      <div className="relative flex h-12 w-full items-center justify-center">
        <Image
          src={brand.logo}
          alt={brand.name}
          width={100}
          height={44}
          className={`object-contain transition-all duration-500 ${
            hovered ? "grayscale-0 opacity-100" : "grayscale opacity-45"
          }`}
        />
      </div>

      {/* Tag — height-animates in on hover */}
      <motion.p
        initial={false}
        animate={
          hovered
            ? { opacity: 1, height: "auto", marginTop: 4 }
            : { opacity: 0, height: 0, marginTop: 0 }
        }
        transition={{ duration: 0.22, ease: "easeOut" }}
        className="overflow-hidden text-center text-[10px] font-medium leading-relaxed text-gray-400"
      >
        {brand.tag}
      </motion.p>
    </motion.div>
  );
}

function MarqueeRow({
  items,
  direction,
  duration,
}: {
  items: typeof brands;
  direction: "left" | "right";
  duration: number;
}) {
  const controls = useAnimationControls();

  const unitWidth    = CARD_W + GAP;
  const singleSetPx  = (items.length / 3) * unitWidth; // one-third of total = 1 set
  const fromX = direction === "left" ? 0                : -singleSetPx;
  const toX   = direction === "left" ? -singleSetPx     : 0;

  // Start animation immediately
  useEffect(() => {
    controls.start({
      x: [fromX, toX],
      transition: {
        duration,
        ease: "linear",
        repeat: Infinity,
        repeatType: "loop",
      },
    });
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => controls.stop()}
      onMouseLeave={() =>
        controls.start({
          x: [fromX, toX],
          transition: {
            duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          },
        })
      }
    >
      <motion.div
        animate={controls}
        className="flex gap-4 will-change-transform"
        style={{ width: "max-content" }}
      >
        {items.map((brand, i) => (
          <BrandCard key={`${brand.name}-${i}`} brand={brand} />
        ))}
      </motion.div>
    </div>
  );
}

export default function BrandShowcaseSection() {
  return (
    <section className="relative overflow-hidden bg-[#F8FBFF] py-14">

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-5%] top-[-10%] h-72 w-72 rounded-full bg-[#0066FF]/8 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-72 w-72 rounded-full bg-[#7DBBFF]/12 blur-[80px]" />
      </div>

      {/* Section header */}
      <div className="relative mb-10 flex flex-col items-start justify-between gap-4 px-8 sm:flex-row sm:items-end lg:px-16">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7DBBFF]/20 bg-white px-4 py-1.5">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0066FF]" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#0066FF]">
              Trusted Brands
            </span>
          </div>

        </motion.div>

        {/* Right: stat + CTA */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex shrink-0 items-center gap-5"
        >
          <div className="text-right">
            <p className="text-2xl font-black text-[#0066FF]">{brands.length}+</p>
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
              Global Brands
            </p>
          </div>

          <div className="h-10 w-px bg-[#7DBBFF]/20" />

          <Link href="/shop">
            <motion.span
              whileHover={{ scale: 1.04, x: 3 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-[#7DBBFF]/25 bg-white px-5 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-[#0066FF]/30 hover:text-[#0066FF]"
            >
              Shop All Brands
              <ArrowRight
                size={13}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </motion.span>
          </Link>
        </motion.div>
      </div>

      {/* Marquee container */}
      <div className="relative flex flex-col gap-4 overflow-hidden">

        {/* Left + right soft fade masks — creates the "infinite" illusion */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-linear-to-r from-[#F8FBFF] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-linear-to-l from-[#F8FBFF] to-transparent" />

        {/* Row 1: scrolls LEFT at 30s */}
        <MarqueeRow items={ROW_A} direction="left"  duration={30} />
      </div>

      {/* Footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.15 }}
        viewport={{ once: true }}
        className="mt-8 text-center text-xs text-gray-400"
      >
        Hover any brand to explore · All products are brand-certified and authentic
      </motion.p>
    </section>
  );
}