"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

const brands = [
  {
    name: "Apple",
    logo: "/images/brands/apple.svg",
    tag: "Phones · Laptops · Wearables",
    color: "#555555",
  },
  {
    name: "Samsung",
    logo: "/images/brands/samsung.svg",
    tag: "Phones · TVs · Smart Devices",
    color: "#1428A0",
  },
  {
    name: "Sony",
    logo: "/images/brands/sony.svg",
    tag: "Audio · Cameras · Gaming",
    color: "#111111",
  },
  {
    name: "Asus",
    logo: "/images/brands/asus.svg",
    tag: "Laptops · Monitors · ROG Gear",
    color: "#111111",
  },
  {
    name: "MSI",
    logo: "/images/brands/msi.svg",
    tag: "Gaming PCs · Laptops · GPUs",
    color: "#D4001A",
  },
  {
    name: "JBL",
    logo: "/images/brands/jbl.svg",
    tag: "Speakers · Earbuds · Audio",
    color: "#FF6B00",
  },
  {
    name: "Logitech",
    logo: "/images/brands/logitech.svg",
    tag: "Mice · Keyboards · Webcams",
    color: "#00B4D8",
  },
  {
    name: "Razer",
    logo: "/images/brands/razer.svg",
    tag: "Gaming Gear · RGB . Peripherals",
    color: "#00D455",
  },
];

// Triple-duplicate — 3× ensures seamless loop at any viewport width
const ROW_A = [...brands, ...brands, ...brands];
const ROW_B = [
  ...brands.slice(4),
  ...brands.slice(0, 4),
  ...brands.slice(4),
  ...brands.slice(0, 4),
  ...brands.slice(4),
  ...brands.slice(0, 4),
];

const CARD_W = 160; // px — reduced from 200
const GAP = 12; // px — reduced from 16

function BrandCard({ brand }: { brand: (typeof brands)[0] }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{ y: -4, scale: 1.03 }}
      transition={{
        duration: 0.25,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      }}
      className="group relative flex flex-col items-center overflow-hidden rounded-xl border border-[#7DBBFF]/15 bg-white px-5 py-4 shadow-[0_1px_12px_rgba(0,102,255,0.04)] transition-shadow duration-300 hover:border-[#7DBBFF]/30 hover:shadow-[0_4px_20px_rgba(0,102,255,0.1)]"
      style={{ minWidth: CARD_W, width: CARD_W }}
    >
      {/* Brand-colored glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-xl opacity-0 transition-opacity duration-400 group-hover:opacity-100"
        style={{
          background: `radial-gradient(circle at 50% 70%, ${brand.color}10, transparent 65%)`,
        }}
      />

      {/* Logo - smaller height */}
      <div className="relative flex h-9 w-full items-center justify-center">
        <Image
          src={brand.logo}
          alt={brand.name}
          width={80}
          height={36}
          className={`object-contain transition-all duration-400 ${
            hovered ? "grayscale-0 opacity-100" : "grayscale opacity-50"
          }`}
        />
      </div>

      {/* Tag — height-animates in on hover */}
      <motion.p
        initial={false}
        animate={
          hovered
            ? { opacity: 1, height: "auto", marginTop: 2 }
            : { opacity: 0, height: 0, marginTop: 0 }
        }
        transition={{ duration: 0.18, ease: "easeOut" }}
        className="overflow-hidden text-center text-[9px] font-medium leading-relaxed text-gray-400"
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

  const unitWidth = CARD_W + GAP;
  const singleSetPx = (items.length / 3) * unitWidth;
  const fromX = direction === "left" ? 0 : -singleSetPx;
  const toX = direction === "left" ? -singleSetPx : 0;

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
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        className="flex gap-3 will-change-transform"
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
    <section className="relative overflow-hidden bg-[#F8FBFF] py-8">
      {/* Ambient glows - reduced intensity and size */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-5%] top-[-10%] h-48 w-48 rounded-full bg-[#0066FF]/6 blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-5%] h-48 w-48 rounded-full bg-[#7DBBFF]/10 blur-[60px]" />
      </div>

      {/* Marquee container */}
      <div className="relative flex flex-col gap-3 overflow-hidden">
        {/* Left + right soft fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-[#F8FBFF] to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-[#F8FBFF] to-transparent" />

        {/* Scrolls LEFT at 25s - slightly faster */}
        <MarqueeRow items={ROW_A} direction="left" duration={25} />
      </div>
    </section>
  );
}