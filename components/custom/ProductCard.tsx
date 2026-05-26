"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingCart, Check, X, ArrowRight } from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ColorOption {
  label: string;
  swatch: string;
  image: string;
}

export interface StorageOption {
  label: string;
  priceSuffix?: string;
}

export interface ProductCardProps {
  id: number | string;           // ← needed for /product/[id] link
  brand?: string;
  name: string;
  originalPrice?: string;
  salePrice: string;
  badge?: string;
  badgeColor?: string;
  description?: string;          // ← shown on the back of the card
  colorOptions: ColorOption[];
  storageOptions?: StorageOption[];
  onAddToCart?: (color: ColorOption, storage?: StorageOption) => void;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Max characters before we truncate and show "View Details" link
const DESC_LIMIT = 160;

function truncate(text: string) {
  if (text.length <= DESC_LIMIT) return { short: text, isTruncated: false };
  return { short: text.slice(0, DESC_LIMIT).trimEnd() + "…", isTruncated: true };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProductCard({
  id,
  brand,
  name,
  originalPrice,
  salePrice,
  badge,
  badgeColor = "#0066FF",
  description,
  colorOptions,
  storageOptions,
  onAddToCart,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor]     = useState<ColorOption>(colorOptions[0]);
  const [selectedStorage, setSelectedStorage] = useState<StorageOption | undefined>(storageOptions?.[0]);
  const [addedToCart, setAddedToCart]         = useState(false);
  const [priceHovered, setPriceHovered]       = useState(false);
  const [imageHovered, setImageHovered]       = useState(false);
  const [flipped, setFlipped]                 = useState(false);

  const handleAddToCart = () => {
    setAddedToCart(true);
    onAddToCart?.(selectedColor, selectedStorage);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const desc = description ? truncate(description) : null;

  return (
    /*
      Perspective wrapper — must have a fixed height so both faces
      stack in the same space. We use min-h to let the card grow but
      stay consistent within a grid row via items-stretch.
    */
    <div className="group" style={{ perspective: "1200px" }}>
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{
          duration: 0.55,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative h-full w-full"
      >

        {/* ════════════════════════════════════════════════════════════
            FRONT FACE
            ════════════════════════════════════════════════════════════ */}
        <div
          className="relative flex h-full flex-col overflow-hidden rounded-xl border border-gray-100 bg-white transition-shadow duration-300 group-hover:shadow-[0_8px_32px_rgba(0,102,255,0.10)]"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* ── Image block ──────────────────────────────────────────── */}
          <div
            className="relative overflow-hidden bg-[#F5F6FA]"
            style={{ paddingBottom: "100%" }}
            onMouseEnter={() => setImageHovered(true)}
            onMouseLeave={() => setImageHovered(false)}
          >
            {/* Product image — crossfades on color change */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedColor.label}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.26, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Image
                  src={selectedColor.image}
                  alt={`${name} – ${selectedColor.label}`}
                  fill
                  className="object-contain p-8"
                  sizes="(max-width: 640px) 100vw, 300px"
                />
              </motion.div>
            </AnimatePresence>

            {/* Eye icon — top right, triggers flip */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: imageHovered ? 1 : 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setFlipped(true)}
              aria-label="Quick view description"
              className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm backdrop-blur-sm transition-colors hover:text-[#0066FF]"
            >
              <Eye size={16} />
            </motion.button>

            {/* Color swatches — bottom left, always clickable (z-10 ensures nothing sits on top) */}
            {colorOptions.length > 1 && (
              <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5">
                {colorOptions.map((color) => {
                  const isActive = selectedColor.label === color.label;
                  return (
                    <motion.button
                      key={color.label}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.88 }}
                      onClick={() =>
                        selectedColor.label !== color.label && setSelectedColor(color)
                      }
                      aria-label={color.label}
                      title={color.label}
                      className="relative flex items-center justify-center rounded-full"
                      style={{
                        width: 22,
                        height: 22,
                        boxShadow: isActive
                          ? `0 0 0 1.5px white, 0 0 0 3px ${
                              color.swatch === "#FFFFFF" || color.swatch === "#F5F6FA"
                                ? "#aaa"
                                : color.swatch
                            }`
                          : "0 0 0 1px rgba(0,0,0,0.12)",
                      }}
                    >
                      <span
                        className="block rounded-full"
                        style={{
                          width: 16,
                          height: 16,
                          backgroundColor: color.swatch,
                          border:
                            color.swatch === "#FFFFFF" || color.swatch === "#F5F5F5"
                              ? "1px solid #e0e0e0"
                              : "none",
                        }}
                      />
                      <AnimatePresence>
                        {isActive && (
                          <motion.span
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0 }}
                            transition={{ duration: 0.15 }}
                            className="pointer-events-none absolute inset-0 flex items-center justify-center"
                          >
                            <Check
                              size={9}
                              strokeWidth={3}
                              style={{
                                color:
                                  color.swatch === "#FFFFFF" ||
                                  color.swatch === "#F5F5F5" ||
                                  color.swatch === "#F5F6FA"
                                    ? "#555"
                                    : "white",
                              }}
                            />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ── Text block ───────────────────────────────────────────── */}
          <div className="flex flex-1 flex-col gap-1.5 p-4">
            {badge && (
              <span className="text-xs font-bold" style={{ color: badgeColor }}>
                {badge}
              </span>
            )}
            {brand && (
              <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400">
                {brand}
              </p>
            )}
            <h3 className="line-clamp-2 text-[14px] font-semibold leading-snug text-gray-900">
              {name}
            </h3>

            {/* Storage pills */}
            {storageOptions && storageOptions.length > 0 && (
              <div className="mt-1 flex flex-wrap gap-1.5">
                {storageOptions.map((opt) => {
                  const isActive = selectedStorage?.label === opt.label;
                  return (
                    <button
                      key={opt.label}
                      onClick={() => setSelectedStorage(opt)}
                      className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold transition-all duration-150 ${
                        isActive
                          ? "border-[#0066FF] bg-[#0066FF] text-white"
                          : "border-gray-200 bg-white text-gray-600 hover:border-[#0066FF] hover:text-[#0066FF]"
                      }`}
                    >
                      {opt.label}
                      {opt.priceSuffix && (
                        <span
                          className={`ml-1 text-[10px] ${isActive ? "text-white/70" : "text-gray-400"}`}
                        >
                          {opt.priceSuffix}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Price row — hover triggers add to cart */}
            <div className="mt-auto pt-3">
              <motion.button
                className="flex w-full cursor-pointer items-center justify-between rounded-lg px-0 py-1"
                onHoverStart={() => setPriceHovered(true)}
                onHoverEnd={() => setPriceHovered(false)}
                onClick={() => !addedToCart && handleAddToCart()}
                aria-label="Add to cart"
              >
                <motion.div
                  animate={{ opacity: priceHovered && !addedToCart ? 0.45 : 1 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="text-[17px] font-bold text-gray-900">{salePrice}</span>
                  {originalPrice && (
                    <span className="text-[12px] text-gray-400 line-through">
                      {originalPrice}
                    </span>
                  )}
                </motion.div>

                <AnimatePresence mode="wait">
                  {addedToCart ? (
                    <motion.span
                      key="confirmed"
                      initial={{ opacity: 0, x: 8, scale: 0.8 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 8, scale: 0.8 }}
                      transition={{ duration: 0.22 }}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-green-500 text-white shadow-[0_0_12px_rgba(34,197,94,0.35)]"
                    >
                      <Check size={14} strokeWidth={2.5} />
                    </motion.span>
                  ) : priceHovered ? (
                    <motion.span
                      key="cart"
                      initial={{ opacity: 0, x: 10, scale: 0.75 }}
                      animate={{ opacity: 1, x: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 10, scale: 0.75 }}
                      transition={{
                        duration: 0.22,
                        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0066FF] text-white shadow-[0_0_14px_rgba(0,102,255,0.3)]"
                    >
                      <ShoppingCart size={14} />
                    </motion.span>
                  ) : null}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>

        {/* ════════════════════════════════════════════════════════════
            BACK FACE
            — rotated 180deg so it starts hidden
            — shown when flipped === true
            ════════════════════════════════════════════════════════════ */}
        <div
          className="absolute inset-0 flex flex-col overflow-hidden rounded-xl border border-[#7DBBFF]/25 bg-white"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Top bar: brand + name + close */}
          <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4">
            <div className="min-w-0">
              {brand && (
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0066FF]/70">
                  {brand}
                </p>
              )}
              <h3 className="mt-0.5 truncate text-[15px] font-bold text-gray-900">{name}</h3>
            </div>
            {/* Close / flip back */}
            <button
              onClick={() => setFlipped(false)}
              aria-label="Close"
              className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-600"
            >
              <X size={13} />
            </button>
          </div>

          {/* Description body */}
          <div className="flex flex-1 flex-col gap-4 overflow-hidden px-5 py-4">
            {/* Decorative accent line */}
            <div className="h-0.5 w-10 rounded-full bg-linear-to-r from-[#0066FF] to-[#7DBBFF]" />

            {desc ? (
              <>
                <p className="text-[13px] leading-relaxed text-gray-600">{desc.short}</p>

                {/* If truncated, show the "View Full Details" CTA */}
                {desc.isTruncated && (
                  <p className="text-[12px] text-gray-400">
                    
                    <Link
                      href={`/product/${id}`}
                      className="font-semibold text-[#0066FF] underline-offset-2 hover:underline"
                    >
                      See full details
                    </Link>
                  </p>
                )}
              </>
            ) : (
              <p className="text-[13px] italic text-gray-400">No description available.</p>
            )}
          </div>

          {/* Bottom CTA — View Product Page */}
          <div className="border-t border-gray-100 px-5 py-4">
            <Link href={`/product/${id}`} className="block">
              <motion.span
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
                className="group/link flex items-center justify-between rounded-xl bg-linear-to-r from-[#0066FF] to-[#7DBBFF] px-5 py-3 text-[13px] font-bold text-white shadow-[0_0_18px_rgba(0,102,255,0.22)]"
              >
                View Full Product
                <ArrowRight
                  size={15}
                  className="transition-transform duration-200 group-hover/link:translate-x-1"
                />
              </motion.span>
            </Link>
          </div>
        </div>

      </motion.div>
    </div>
  );
}