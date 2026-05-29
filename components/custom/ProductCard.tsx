"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingCart, Check, X, ArrowRight } from "lucide-react";
import { useCart } from "@/context/CartContext";

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
  id: number | string;
  brand?: string;
  name: string;
  originalPrice?: string;
  salePrice: string;
  badge?: string;
  badgeColor?: string;
  description?: string;
  colorOptions: ColorOption[];
  storageOptions?: StorageOption[];
  onAddToCart?: (color: ColorOption, storage?: StorageOption) => void;
}

const DESC_LIMIT = 160;

function truncate(text: string) {
  if (text.length <= DESC_LIMIT) return { short: text, isTruncated: false };
  return {
    short: text.slice(0, DESC_LIMIT).trimEnd() + "…",
    isTruncated: true,
  };
}

function computePrice(basePrice: string, storage?: StorageOption): string {
  const base = parseFloat(basePrice.replace(/[$,]/g, ""));
  const offset = storage?.priceSuffix
    ? parseFloat(storage.priceSuffix.replace(/[+$,]/g, ""))
    : 0;
  const total = base + (Number.isNaN(offset) ? 0 : offset);
  return "$" + total.toLocaleString("en-US");
}

function computeNumericPrice(
  basePrice: string,
  storage?: StorageOption,
): number {
  const base = parseFloat(basePrice.replace(/[$,]/g, ""));
  const offset = storage?.priceSuffix
    ? parseFloat(storage.priceSuffix.replace(/[+$,]/g, ""))
    : 0;
  return base + (Number.isNaN(offset) ? 0 : offset);
}

function MobileCard({
  id,
  name,
  salePrice,
  badge,
  badgeColor = "#0066FF",
  colorOptions,
  storageOptions,
  onAddToCart,
}: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    colorOptions[0],
  );
  const [selectedStorage, setSelectedStorage] = useState<
    StorageOption | undefined
  >(storageOptions?.[0]);
  const [addedToCart, setAddedToCart] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/product/${id}`);
  };

  const handleAdd = () => {
    if (addedToCart) return;

    setAddedToCart(true);
    addToCart({
      productId: id,
      name,
      price: computeNumericPrice(salePrice, selectedStorage),
      image: selectedColor.image,
      color: selectedColor.label,
      storage: selectedStorage?.label,
      quantity: 1,
    });
    onAddToCart?.(selectedColor, selectedStorage);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const displayPrice = computePrice(salePrice, selectedStorage);

  return (
    <div
      role="link"
      tabIndex={0}
      onClick={handleNavigate}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleNavigate();
        }
      }}
      className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-shadow duration-200 active:shadow-md"
    >
      <div className="relative bg-[#F5F6FA]" style={{ paddingBottom: "100%" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedColor.label}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.22 }}
            className="absolute inset-0"
          >
            <Image
              src={selectedColor.image}
              alt={`${name} – ${selectedColor.label}`}
              fill
              className="object-contain p-5"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </motion.div>
        </AnimatePresence>

        {badge && (
          <span
            className="absolute left-2 top-2 z-10 rounded-md px-1.5 py-0.5 text-[9px] font-black uppercase tracking-wide text-white"
            style={{ backgroundColor: badgeColor }}
          >
            {badge}
          </span>
        )}

        {colorOptions.length > 1 && (
          <div className="absolute bottom-2 left-2 z-10 flex items-center gap-1">
            {colorOptions.map((color) => {
              const isActive = selectedColor.label === color.label;
              return (
                <motion.button
                  key={color.label}
                  whileTap={{ scale: 0.85 }}
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelectedColor(color);
                  }}
                  aria-label={color.label}
                  className="relative flex items-center justify-center rounded-full"
                  style={{
                    width: 18,
                    height: 18,
                    boxShadow: isActive
                      ? `0 0 0 1.5px white, 0 0 0 2.5px ${
                          color.swatch === "#FFFFFF" ||
                          color.swatch === "#F5F6FA"
                            ? "#aaa"
                            : color.swatch
                        }`
                      : "0 0 0 1px rgba(0,0,0,0.12)",
                  }}
                >
                  <span
                    className="block rounded-full"
                    style={{
                      width: 12,
                      height: 12,
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
                        transition={{ duration: 0.12 }}
                        className="pointer-events-none absolute inset-0 flex items-center justify-center"
                      >
                        <Check
                          size={7}
                          strokeWidth={3.5}
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

      <div className="flex h-24 items-center justify-between gap-1 px-2.5 py-2.5">
        <div className="min-w-0 flex-1">
          <p className="line-clamp-2 text-[11px] font-semibold leading-tight text-gray-800">
            {name}
          </p>
          <p className="mt-1 text-[13px] font-black text-gray-900">
            {displayPrice}
          </p>
        </div>

        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={(event) => {
            event.stopPropagation();
            handleAdd();
          }}
          aria-label="Add to cart"
          className={`ml-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-all duration-200 ${
            addedToCart
              ? "bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.35)]"
              : "bg-[#0066FF] shadow-[0_0_10px_rgba(0,102,255,0.25)]"
          }`}
        >
          <AnimatePresence mode="wait">
            {addedToCart ? (
              <motion.span
                key="check"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <Check size={13} strokeWidth={2.5} className="text-white" />
              </motion.span>
            ) : (
              <motion.span
                key="cart"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{ duration: 0.18 }}
              >
                <ShoppingCart size={13} className="text-white" />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}

export default function ProductCard(props: ProductCardProps) {
  const {
    id,
    brand,
    name,
    salePrice,
    badge,
    badgeColor = "#0066FF",
    description,
    colorOptions,
    storageOptions,
    onAddToCart,
  } = props;

  const [selectedColor, setSelectedColor] = useState<ColorOption>(
    colorOptions[0],
  );
  const [selectedStorage, setSelectedStorage] = useState<
    StorageOption | undefined
  >(storageOptions?.[0]);
  const [addedToCart, setAddedToCart] = useState(false);
  const [cardHovered, setCardHovered] = useState(false);
  const [imageHovered, setImageHovered] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const { addToCart } = useCart();
  const router = useRouter();

  const handleNavigate = () => {
    router.push(`/product/${id}`);
  };

  const handleAddToCart = () => {
    setAddedToCart(true);
    addToCart({
      productId: id,
      name,
      price: computeNumericPrice(salePrice, selectedStorage),
      image: selectedColor.image,
      color: selectedColor.label,
      storage: selectedStorage?.label,
      quantity: 1,
    });
    onAddToCart?.(selectedColor, selectedStorage);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const desc = description ? truncate(description) : null;
  const displayPrice = computePrice(salePrice, selectedStorage);

  return (
    <>
      <div className="block lg:hidden">
        <MobileCard {...props} />
      </div>

      <div
        className="hidden group lg:block"
        style={{ perspective: "1200px" }}
        onMouseEnter={() => setCardHovered(true)}
        onMouseLeave={() => setCardHovered(false)}
        onClick={handleNavigate}
      >
        <motion.div
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{
            duration: 0.55,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
          }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative h-full w-full"
        >
          <div
            className="relative flex h-full cursor-pointer flex-col overflow-hidden rounded-md border border-gray-100 bg-white transition-shadow duration-300 group-hover:shadow-[0_8px_32px_rgba(0,102,255,0.10)]"
            style={{ backfaceVisibility: "hidden" }}
          >
            <div
              className="relative overflow-hidden bg-[#F5F6FA]"
              style={{ paddingBottom: "100%" }}
              onMouseEnter={() => setImageHovered(true)}
              onMouseLeave={() => setImageHovered(false)}
            >
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
                    sizes="300px"
                  />
                </motion.div>
              </AnimatePresence>

              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: imageHovered ? 1 : 0 }}
                transition={{ duration: 0.18 }}
                onClick={(event) => {
                  event.stopPropagation();
                  setFlipped(true);
                }}
                aria-label="Quick view description"
                className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-gray-500 shadow-sm backdrop-blur-sm transition-colors hover:text-[#0066FF]"
              >
                <Eye size={16} />
              </motion.button>

              {colorOptions.length > 1 && (
                <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5">
                  {colorOptions.map((color) => {
                    const isActive = selectedColor.label === color.label;
                    return (
                      <motion.button
                        key={color.label}
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.88 }}
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedColor(color);
                        }}
                        aria-label={color.label}
                        title={color.label}
                        className="relative flex items-center justify-center rounded-full"
                        style={{
                          width: 22,
                          height: 22,
                          boxShadow: isActive
                            ? `0 0 0 1.5px white, 0 0 0 3px ${
                                color.swatch === "#FFFFFF" ||
                                color.swatch === "#F5F6FA"
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
                              color.swatch === "#FFFFFF" ||
                              color.swatch === "#F5F5F5"
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

            <div className="flex h-50 flex-1 flex-col gap-1.5 overflow-hidden p-4">
              {badge && (
                <span
                  className="text-xs font-bold"
                  style={{ color: badgeColor }}
                >
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

              {storageOptions && storageOptions.length > 0 && (
                <div className="mt-1 flex flex-wrap gap-1.5">
                  {storageOptions.map((opt) => {
                    const isActive = selectedStorage?.label === opt.label;
                    return (
                      <button
                        key={opt.label}
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedStorage(opt);
                        }}
                        className={`rounded-md border px-2.5 py-1 text-[11px] font-semibold transition-all duration-150 ${
                          isActive
                            ? "border-[#0066FF] bg-[#0066FF] text-white"
                            : "border-gray-200 bg-white text-gray-600 hover:border-[#0066FF] hover:text-[#0066FF]"
                        }`}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>
              )}

              <div className="mt-auto pt-3">
                <motion.button
                  type="button"
                  className="flex w-full cursor-pointer items-center justify-between rounded-lg px-0 py-1"
                  onClick={(event) => {
                    event.stopPropagation();
                    if (!addedToCart) handleAddToCart();
                  }}
                  aria-label="Add to cart"
                >
                  <motion.div
                    animate={{
                      opacity: cardHovered && !addedToCart ? 0.45 : 1,
                    }}
                    transition={{ duration: 0.2 }}
                    className="flex items-baseline gap-2"
                  >
                    <span className="text-[17px] font-bold text-gray-900">
                      {displayPrice}
                    </span>
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
                    ) : cardHovered ? (
                      <motion.span
                        key="cart"
                        initial={{ opacity: 0, x: 10, scale: 0.75 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, x: 10, scale: 0.75 }}
                        transition={{
                          duration: 0.22,
                          ease: [0.16, 1, 0.3, 1] as [
                            number,
                            number,
                            number,
                            number,
                          ],
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

          <div
            className="absolute inset-0 flex flex-col overflow-hidden rounded-md border border-[#7DBBFF]/25 bg-white"
            style={{
              backfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
          >
            <div className="flex items-start justify-between gap-3 border-b border-gray-100 px-5 py-4">
              <div className="min-w-0">
                {brand && (
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0066FF]/70">
                    {brand}
                  </p>
                )}
                <h3 className="mt-0.5 truncate text-[15px] font-bold text-gray-900">
                  {name}
                </h3>
              </div>
              <button
                onClick={(event) => {
                  event.stopPropagation();
                  setFlipped(false);
                }}
                aria-label="Close"
                className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-gray-200 text-gray-400 transition-colors hover:border-gray-300 hover:text-gray-600"
              >
                <X size={13} />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-4 overflow-hidden px-5 py-4">
              <div className="h-0.5 w-10 rounded-full bg-linear-to-r from-[#0066FF] to-[#7DBBFF]" />
              {desc ? (
                <>
                  <p className="text-[13px] leading-relaxed text-gray-600">
                    {desc.short}
                  </p>
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
                <p className="text-[13px] italic text-gray-400">
                  No description available.
                </p>
              )}
            </div>

            <div className="border-t border-gray-100 px-5 py-4">
              <Link href={`/product/${id}`} className="block">
                <motion.span
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.2 }}
                  className="group/link flex items-center justify-between rounded-md bg-linear-to-r from-[#0066FF] to-[#7DBBFF] px-5 py-3 text-[13px] font-bold text-white shadow-[0_0_18px_rgba(0,102,255,0.22)]"
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
    </>
  );
}
