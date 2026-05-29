"use client";

import Link from "next/link";
import { useState, useMemo, useRef } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { ArrowRight, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "@/components/custom/ProductCard";
import productsData from "@/data/products.json";

interface ColorOption {
  label: string;
  swatch: string;
  image: string;
}

interface StorageOption {
  label: string;
  priceSuffix?: string;
}

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

// ─── Config ───────────────────────────────────────────────────────────────────

const CATEGORIES = ["All", "Phones", "Laptops", "Audio", "Gaming", "Wearables"];
const CARDS_PER_PAGE = 4; // always show exactly 4

// ─── Variants ─────────────────────────────────────────────────────────────────

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

// ─── Section ──────────────────────────────────────────────────────────────────

export default function FeaturedProductsSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [page, setPage] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const constraintsRef = useRef(null);

  // Filtered product list
  const visibleProducts = useMemo(() => {
    const featured = ALL_PRODUCTS.filter((p) => p.featured);
    const filtered =
      activeCategory === "All"
        ? featured
        : featured.filter((p) => p.category === activeCategory);
    return filtered;
  }, [activeCategory]);

  // Reset page when category changes
  const handleCategoryChange = (cat: string) => {
    setActiveCategory(cat);
    setPage(0);
  };

  const totalPages = Math.ceil(visibleProducts.length / CARDS_PER_PAGE);
  const pageProducts = visibleProducts.slice(
    page * CARDS_PER_PAGE,
    page * CARDS_PER_PAGE + CARDS_PER_PAGE,
  );

  const goTo = (next: number) => {
    setDirection(next > page ? 1 : -1);
    setPage(next);
  };

  const countFor = (cat: string) => {
    const featured = ALL_PRODUCTS.filter((p) => p.featured);
    return cat === "All"
      ? featured.length
      : featured.filter((p) => p.category === cat).length;
  };

  // Slide variants for page transitions
  const slideVariants: Variants = {
    enter: (d: number) => ({ opacity: 0, x: d * 40 }),
    center: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.38,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
    exit: (d: number) => ({
      opacity: 0,
      x: d * -30,
      transition: { duration: 0.22 },
    }),
  };

  return (
    <section className="relative overflow-hidden bg-[#F0F6FF] py-16">
      {/* Glow orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-6%] top-[0%] h-80 w-80 rounded-full bg-[#0066FF]/10 blur-3xl" />
        <div className="absolute bottom-[-5%] right-[-6%] h-80 w-80 rounded-full bg-[#7DBBFF]/18 blur-3xl" />
      </div>

      <div className="relative w-full px-8 lg:px-16">
        {/* ── Header row ──────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          {/* Left */}
          <div className="flex items-center gap-6">
            <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
              Hand-Picked{" "}
              <span className="bg-linear-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
                For You
              </span>
            </h2>
          </div>

          {/* Right: arrows + view all */}
          <div className="flex items-center gap-3">
            {/* Page indicator */}
            {totalPages > 1 && (
              <span className="text-xs font-semibold text-gray-400">
                {page + 1} / {totalPages}
              </span>
            )}

            {/* Prev */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => goTo(Math.max(0, page - 1))}
              disabled={page === 0}
              aria-label="Previous"
              className="group flex h-9 w-9 items-center justify-center rounded-xl border border-[#7DBBFF]/20 bg-white shadow-sm transition-all duration-200 hover:border-[#0066FF]/30 hover:bg-[#F0F6FF] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronLeft
                size={15}
                className="text-gray-500 transition-colors duration-200 group-hover:text-[#0066FF]"
              />
            </motion.button>

            {/* Next */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => goTo(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              aria-label="Next"
              className="group flex h-9 w-9 items-center justify-center rounded-xl border border-[#7DBBFF]/20 bg-white shadow-sm transition-all duration-200 hover:border-[#0066FF]/30 hover:bg-[#F0F6FF] disabled:cursor-not-allowed disabled:opacity-30"
            >
              <ChevronRight
                size={15}
                className="text-gray-500 transition-colors duration-200 group-hover:text-[#0066FF]"
              />
            </motion.button>

            <div className="h-5 w-px bg-[#7DBBFF]/25" />

            {/* View all */}
            <Link href="/shop">
              <motion.span
                whileHover={{ scale: 1.04, y: -1 }}
                whileTap={{ scale: 0.97 }}
                className="group hidden items-center gap-2 rounded-xl border border-[#7DBBFF]/25 bg-white px-5 py-2.5 text-xs font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-[#0066FF]/30 hover:bg-[#F0F6FF] hover:text-[#0066FF] sm:inline-flex"
              >
                View All
                <ArrowRight
                  size={13}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </motion.span>
            </Link>
          </div>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="mt-5 flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none"
        >
          {CATEGORIES.map((cat) => {
            const count = countFor(cat);
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
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold leading-none ${
                    isActive
                      ? "bg-white/20 text-white"
                      : "bg-[#0066FF]/10 text-[#0066FF]"
                  }`}
                >
                  {count}
                </span>
              </motion.button>
            );
          })}
        </motion.div>

        {/* Carousel */}
        <div className="relative mt-6 overflow-hidden" ref={constraintsRef}>
          <AnimatePresence mode="wait" custom={direction}>
            {visibleProducts.length > 0 ? (
              <motion.div
                key={`${activeCategory}-${page}`}
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
                  className="grid grid-cols-2 gap-4 xl:grid-cols-4"
                >
                  {pageProducts.map((product) => (
                    <motion.div
                      key={product.id}
                      variants={cardVariants}
                      className="h-full"
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
                          console.log(
                            `[Cart] ${product.name} — ${color.label}${storage ? ` / ${storage.label}` : ""}`,
                          );
                        }}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              /* Empty state */
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
                <p className="text-sm font-bold text-gray-700">
                  No featured products here
                </p>
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

        {/* Dot pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                aria-label={`Page ${i + 1}`}
              >
                <motion.span
                  animate={{
                    width: i === page ? 24 : 7,
                    backgroundColor:
                      i === page ? "#0066FF" : "rgba(0,102,255,0.2)",
                  }}
                  transition={{ duration: 0.3 }}
                  className="block h-2 rounded-full"
                  style={{ width: 7 }}
                />
              </button>
            ))}
          </div>
        )}

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#7DBBFF]/15 bg-white/50 px-7 py-5 backdrop-blur-xl sm:flex-row"
        >
          <div>
            <p className="text-sm font-bold text-gray-900">
              Didn't find what you're looking for?
            </p>
            <p className="text-xs text-gray-400">
              Browse 10,000+ products across every category.
            </p>
          </div>
          <Link href="/shop">
            <motion.span
              whileHover={{ scale: 1.04, y: -1 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex shrink-0 items-center gap-2 rounded-md bg-linear-to-r from-[#0066FF] to-[#7DBBFF] px-7 py-3 text-sm font-bold text-white shadow-[0_0_22px_rgba(0,102,255,0.25)]"
            >
              Explore Full Shop
              <ArrowRight
                size={15}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
