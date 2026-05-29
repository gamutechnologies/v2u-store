"use client";

import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/custom/ProductCard";
import productsData from "@/data/products.json";

interface ColorOption   { label: string; swatch: string; image: string }
interface StorageOption { label: string; priceSuffix?: string }
interface Product {
  id: number | string;
  brand: string;
  name: string;
  originalPrice: string;
  salePrice: string;
  badge?: string;
  description?: string;
  category?: string;
  featured?: boolean;
  colorOptions: ColorOption[];
  storageOptions?: StorageOption[];
}

const ALL_PRODUCTS: Product[] = productsData as Product[];
const CATEGORIES = ["All", "Phones", "Laptops", "Audio", "Gaming", "Wearables"];

// ─── Responsive cards-per-page hook ──────────────────────────────────────────
// Returns the number of columns (= cards per page) for the current viewport.
// Matches the grid: grid-cols-2 md:grid-cols-3 lg:grid-cols-4
// Showing exactly 1 row per page means ALL visible cards are always the same height.

function useCardsPerPage(): number {
  const [n, setN] = useState(4); // SSR-safe default (avoids layout flash on desktop)
  useEffect(() => {
    const update = () => {
      const w = window.innerWidth;
      if      (w >= 1024) setN(4); // lg → 4 columns
      else if (w >= 768)  setN(3); // md → 3 columns
      else                setN(2); // mobile → 2 columns
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return n;
}

// ─── Animation variants ───────────────────────────────────────────────────────

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  },
};
const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FeaturedProductsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [page,           setPage]           = useState(0);
  const [direction,      setDirection]      = useState(1);

  // Dynamic — matches the CSS grid columns exactly
  const cardsPerPage = useCardsPerPage();

  // Filtered list
  const visibleProducts = useMemo<Product[]>(() => {
    const featured = ALL_PRODUCTS.filter((p) => p.featured);
    return activeCategory === "All"
      ? featured
      : featured.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  // Clamp page when cardsPerPage changes (e.g. resize)
  const totalPages = Math.ceil(visibleProducts.length / cardsPerPage);
  const clampedPage = Math.min(page, Math.max(0, totalPages - 1));

  const pageProducts = useMemo<Product[]>(() => {
    const start = clampedPage * cardsPerPage;
    return visibleProducts.slice(start, start + cardsPerPage);
  }, [visibleProducts, clampedPage, cardsPerPage]);

  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(0);
  };

  const goTo = (next: number) => {
    setDirection(next > clampedPage ? 1 : -1);
    setPage(next);
  };

  const countFor = (cat: string) => {
    const featured = ALL_PRODUCTS.filter((p) => p.featured);
    return cat === "All"
      ? featured.length
      : featured.filter((p) => p.category === cat).length;
  };

  const slideVariants: Variants = {
    enter:  (d: number) => ({ opacity: 0, x: d * 40 }),
    center: {
      opacity: 1, x: 0,
      transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
    exit: (d: number) => ({
      opacity: 0, x: d * -30,
      transition: { duration: 0.22 },
    }),
  };

  return (
    <section className="relative overflow-hidden bg-[#F0F6FF] py-16">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6%] top-[0%]     h-80 w-80 rounded-full bg-[#0066FF]/10 blur-3xl" />
        <div className="absolute bottom-[-5%] right-[-6%] h-80 w-80 rounded-full bg-[#7DBBFF]/18 blur-3xl" />
      </div>

      <div className="relative w-full px-8 lg:px-16">

        {/* ── Header row — UNCHANGED ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex items-center gap-6">
            <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
              Hand-Picked{" "}
              <span className="bg-linear-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
                For You
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {totalPages > 1 && (
              <span className="text-xs font-semibold text-gray-400">
                {clampedPage + 1} / {totalPages}
              </span>
            )}

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => goTo(Math.max(0, clampedPage - 1))}
              disabled={clampedPage === 0}
              aria-label="Previous"
              className="group flex h-9 w-9 items-center justify-center rounded-xl border border-[#7DBBFF]/20 bg-white shadow-sm transition-all duration-200 hover:border-[#0066FF]/30 hover:bg-[#F0F6FF] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft size={15} className="text-gray-500 transition-colors duration-200 group-hover:text-[#0066FF]" />
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => goTo(Math.min(totalPages - 1, clampedPage + 1))}
              disabled={clampedPage >= totalPages - 1}
              aria-label="Next"
              className="group flex h-9 w-9 items-center justify-center rounded-xl border border-[#7DBBFF]/20 bg-white shadow-sm transition-all duration-200 hover:border-[#0066FF]/30 hover:bg-[#F0F6FF] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight size={15} className="text-gray-500 transition-colors duration-200 group-hover:text-[#0066FF]" />
            </motion.button>

            <div className="h-5 w-px bg-[#7DBBFF]/25" />

            <Link href="/shop">
              <motion.span
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="group hidden items-center gap-2 rounded-xl border border-[#7DBBFF]/25 bg-white px-5 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-[#0066FF]/30 hover:bg-[#F0F6FF] hover:text-[#0066FF] sm:inline-flex"
              >
                View All
                <ArrowRight size={13} className="transition-transform duration-200 group-hover:translate-x-1" />
              </motion.span>
            </Link>
          </div>
        </motion.div>

        {/* ── Category tabs — UNCHANGED ─────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
        >
          {CATEGORIES.map((cat) => {
            const count    = countFor(cat);
            if (count === 0) return null;
            const isActive = activeCategory === cat;
            return (
              <motion.button
                key={cat}
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => handleCategoryChange(cat)}
                className={`flex shrink-0 items-center gap-1.5 rounded-md px-4 py-2 text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-linear-to-r from-[#0066FF] to-[#7DBBFF] text-white shadow-[0_0_16px_rgba(0,102,255,0.25)]"
                    : "border border-[#7DBBFF]/20 bg-white/70 text-gray-600 hover:border-[#0066FF]/30 hover:text-[#0066FF]"
                }`}
              >
                {cat}
                <span className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${isActive ? "bg-white/20 text-white" : "bg-[#0066FF]/10 text-[#0066FF]"}`}>
                  {count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* ── Cards grid ────────────────────────────────────────────────── */}
        {/*
          Grid always shows exactly 1 row at a time (cardsPerPage === column count).
          Because it's 1 row, CSS grid makes every cell the same height automatically.
          The tallest card in the set drives the row height; all others stretch to match.
        */}
        <div className="relative mt-6 overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            {visibleProducts.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${clampedPage}-${cardsPerPage}`}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="show"
                  className="grid grid-cols-2 items-stretch gap-4 md:grid-cols-3 lg:grid-cols-4"
                >
                  {pageProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={cardVariants}
                      className="h-full min-h-0"
                    >
                      <ProductCard
                        id={product.id}
                        brand={product.brand}
                        name={product.name}
                        originalPrice={product.originalPrice}
                        salePrice={product.salePrice}
                        badge={product.badge}
                        description={product.description}
                        colorOptions={product.colorOptions}
                        storageOptions={product.storageOptions}
                        onAddToCart={(color, storage) => {
                          console.log(`[Cart] ${product.name} — ${color.label}${storage ? ` / ${storage.label}` : ""}`);
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center gap-3 rounded-3xl border border-dashed border-[#7DBBFF]/25 bg-white/40 py-16 backdrop-blur-xl"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-[#0066FF] to-[#7DBBFF] text-white">
                  <Sparkles size={22} />
                </div>
                <p className="text-sm font-bold text-gray-700">No featured products here</p>
                <button
                  onClick={() => handleCategoryChange("All")}
                  className="rounded-full bg-linear-to-r from-[#0066FF] to-[#7DBBFF] px-6 py-2.5 text-xs font-semibold text-white"
                >
                  View All
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── Dot pagination — UNCHANGED ────────────────────────────────── */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => goTo(i)} aria-label={`Page ${i + 1}`}>
                <motion.span
                  animate={{
                    width:           i === clampedPage ? 24 : 7,
                    backgroundColor: i === clampedPage ? "#0066FF" : "rgba(0,102,255,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="block h-2 rounded-full"
                  style={{ width: 7 }}
                />
              </button>
            ))}
          </div>
        )}

        {/* ── Bottom CTA — UNCHANGED ────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#7DBBFF]/15 bg-white/50 px-7 py-5 backdrop-blur-xl sm:flex-row"
        >
          <div>
            <p className="text-sm font-bold text-gray-900">Didn't find what you're looking for?</p>
            <p className="text-xs text-gray-400">Browse 10,000+ products across every category.</p>
          </div>
          <Link href="/shop">
            <motion.span
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-linear-to-r from-[#3585fc] to-[#63aefd] px-7 py-3 text-sm font-bold text-white shadow-[0_0_22px_rgba(0,102,255,0.25)]"
            >
              Explore Full Shop
              <ArrowRight size={15} className="transition-transform duration-200 group-hover:translate-x-1" />
            </motion.span>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}