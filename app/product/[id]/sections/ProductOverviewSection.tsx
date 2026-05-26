"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  Heart,
  Share2,
  Star,
  ShoppingCart,
  ShieldCheck,
  Truck,
  RotateCcw,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

export default function ProductOverviewSection({ product }: { product: any }) {
  const [activeColor, setActiveColor] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const images = product.colorOptions.map((c: any) => c.image) || [
    "/images/products/phone.png",
  ];
  const colors = product.colorOptions || [];
  const [activeImage, setActiveImage] = useState(0);

  const handleAddToCart = () => {
    setAdded(true);
    const parsedPrice = parseFloat(product.salePrice.replace(/[^0-9.]/g, ""));
    addToCart({
      productId: product.id,
      name: product.name,
      price: parsedPrice,
      image: colors[activeColor]?.image || images[activeImage],
      color: colors[activeColor]?.label,
      quantity,
    });
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="flex flex-col gap-6"
      >
        <div className="relative aspect-square w-full overflow-hidden rounded-[40px] border border-[#7DBBFF]/20 bg-white/70 p-8 shadow-[0_4px_30px_rgba(0,102,255,0.05)] backdrop-blur-2xl flex items-center justify-center group">
          <div className="absolute inset-0 bg-linear-to-tr from-[#0066FF]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.4 }}
              className="relative h-full w-full"
            >
              <Image
                src={images[activeImage]}
                alt="Product"
                fill
                className="object-contain"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-4 gap-4">
          {images.map((img: string, i: number) => (
            <button
              key={i}
              onClick={() => {
                setActiveImage(i);
                setActiveColor(i);
              }}
              className={`relative aspect-square overflow-hidden rounded-2xl border-2 transition-all ${
                activeImage === i
                  ? "border-[#0066FF] shadow-[0_0_15px_rgba(0,102,255,0.2)]"
                  : "border-transparent bg-white/50 hover:bg-white/80"
              }`}
            >
              <Image
                src={img}
                alt="Thumbnail"
                fill
                className="object-contain p-2"
              />
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
        className="flex flex-col"
      >
        {product.badge && (
          <div className="mb-2 inline-flex w-fit items-center gap-2 rounded-full border border-[#0066FF]/20 bg-[#0066FF]/10 px-3 py-1 text-xs font-semibold text-[#0066FF]">
            {product.badge}
          </div>
        )}

        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-gray-900 md:text-5xl">
          {product.name}
        </h1>

        <div className="mt-4 flex items-center gap-4">
          <div className="flex items-center gap-1 text-[#0066FF]">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                size={16}
                fill={
                  star <= Math.floor(product.rating) ? "currentColor" : "none"
                }
              />
            ))}
          </div>
          <span className="text-sm font-medium text-gray-500">
            ({product.reviewCount} Reviews)
          </span>
        </div>

        <div className="mt-6 flex items-end gap-3">
          <span className="text-4xl font-black text-[#0066FF]">
            {product.salePrice}
          </span>
          {product.originalPrice && (
            <span className="mb-1 text-xl font-medium text-gray-400 line-through">
              {product.originalPrice}
            </span>
          )}
        </div>

        <p className="mt-6 text-gray-600 leading-relaxed text-[15px]">
          {product.description}
        </p>

        {colors.length > 0 && (
          <div className="mt-8">
            <h3 className="text-sm font-bold text-gray-900">
              Color: {colors[activeColor]?.label}
            </h3>
            <div className="mt-3 flex gap-3">
              {colors.map((color: any, i: number) => (
                <button
                  key={color.label}
                  onClick={() => {
                    setActiveColor(i);
                    setActiveImage(Math.min(i, images.length - 1));
                  }}
                  className={`relative flex h-10 w-10 items-center justify-center rounded-full transition-all ${
                    activeColor === i
                      ? "scale-110 shadow-md ring-2 ring-[#0066FF] ring-offset-2"
                      : "hover:scale-105"
                  }`}
                  style={{
                    backgroundColor: color.swatch,
                    border: "1px solid #E5E5E5",
                  }}
                />
              ))}
            </div>
          </div>
        )}

        <div className="my-8 h-px w-full bg-linear-to-r from-transparent via-gray-200 to-transparent" />

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex h-14 items-center justify-between rounded-xl border border-gray-200 bg-white px-4 sm:w-32 shadow-sm">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="text-gray-500 hover:text-[#0066FF] text-xl font-medium"
            >
              -
            </button>
            <span className="font-semibold text-gray-900">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="text-gray-500 hover:text-[#0066FF] text-xl font-medium"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className={`group relative flex h-14 flex-1 items-center justify-center gap-2 overflow-hidden rounded-xl px-8 font-bold text-white shadow-[0_4px_20px_rgba(0,102,255,0.4)] transition-transform active:scale-95 ${added ? "bg-green-500" : "bg-[#0066FF]"}`}
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full transition-transform duration-300 group-hover:translate-y-[0%]" />
            <ShoppingCart size={20} className="relative z-10" />
            <span className="relative z-10">
              {added ? "Added!" : "Add to Cart"}
            </span>
          </button>

          <button className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-[#0066FF] hover:text-[#0066FF] active:scale-95">
            <Heart size={20} />
          </button>
          <button className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-500 shadow-sm transition-all hover:border-[#0066FF] hover:text-[#0066FF] active:scale-95">
            <Share2 size={20} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
