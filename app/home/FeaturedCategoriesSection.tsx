"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css/pagination";
import "swiper/css";

const categories = [
  {
    title: "Laptops",
    image: "/images/categories/laptops.webp",
    href: "/shop?cat=laptops",
  },
  {
    title: "Smartphones",
    image: "/images/categories/phones.webp",
    href: "/shop?cat=smartphones",
  },
  {
    title: "Gaming",
    image: "/images/categories/gaming.webp",
    href: "/shop?cat=gaming",
  },
  {
    title: "Audio",
    image: "/images/categories/audio.webp",
    href: "/shop?cat=audio",
  },
  {
    title: "Smartwatches",
    image: "/images/categories/smartwatch.webp",
    href: "/shop?cat=smartwatches",
  },
  {
    title: "Accessories",
    image: "/images/categories/accessories.webp",
    href: "/shop?cat=accessories",
  },
  {
    title: "Monitors",
    image: "/images/categories/laptops.webp",
    href: "/shop?cat=monitors",
  },
];

export default function FeaturedCategoriesSection() {
  const swiperRef = useRef<SwiperType | null>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  return (
    <section className="relative overflow-hidden bg-[#F5F7FA] py-16">
      {/* Glow line top */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#0066FF]/20 to-transparent" />

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[5%] top-[-10%] h-80 w-80 rounded-full bg-[#0066FF]/7 blur-[110px]" />
        <div className="absolute bottom-[-10%] right-[5%] h-72 w-72 rounded-full bg-[#7DBBFF]/10 blur-[90px]" />
      </div>

      <div className="relative w-full px-8 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          viewport={{ once: true }}
          className="mb-10 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
        >
          {/* Left */}
          <div>
            <h2 className="mt-4 text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
              Shop By{" "}
              <span className="bg-linear-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
                Technology
              </span>
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Browse our most popular product categories
            </p>
          </div>

          {/* Right: nav + view all */}
          <div className="hidden md:flex items-center gap-3">
            {/* Prev */}
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={isBeginning}
              className={`group flex h-9 w-9 items-center justify-center rounded-xl border shadow-sm transition-all duration-200 ${
                isBeginning
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 opacity-50"
                  : "border-[#7DBBFF]/20 bg-white hover:border-[#0066FF]/30 hover:bg-[#F0F6FF]"
              }`}
            >
              <ArrowLeft
                size={15}
                className={`transition-colors duration-200 ${
                  isBeginning
                    ? "text-gray-300"
                    : "text-gray-500 group-hover:text-[#0066FF]"
                }`}
              />
            </button>

            {/* Next */}
            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={isEnd}
              className={`group flex h-9 w-9 items-center justify-center rounded-xl border shadow-sm transition-all duration-200 ${
                isEnd
                  ? "cursor-not-allowed border-gray-200 bg-gray-100 opacity-50"
                  : "border-[#7DBBFF]/20 bg-white hover:border-[#0066FF]/30 hover:bg-[#F0F6FF]"
              }`}
            >
              <ArrowRight
                size={15}
                className={`transition-colors duration-200 ${
                  isEnd
                    ? "text-gray-300"
                    : "text-gray-500 group-hover:text-[#0066FF]"
                }`}
              />
            </button>

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

        {/* Carousel */}
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={14}
          slidesPerView={1.3}
          grabCursor={true}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          onSwiper={(swiper) => {
            swiperRef.current = swiper;
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          onSlideChange={(swiper) => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
          }}
          breakpoints={{
            480: { slidesPerView: 2.2 },
            768: { slidesPerView: 4 },
            1024: { slidesPerView: 5 },
            1280: { slidesPerView: 6 },
          }}
        >
          {categories.map((cat, i) => (
            <SwiperSlide key={i}>
              <motion.div
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                viewport={{ once: true }}
              >
                <Link href={cat.href}>
                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="group relative flex cursor-pointer flex-col items-center overflow-hidden rounded-2xl bg-sky-200/15 transition-shadow duration-300 hover:bg-white"
                  >
                    {/* Image area */}
                    <div className="flex w-full items-center justify-center px-4 pt-8 pb-6 transition-colors duration-300">
                      <div className="relative flex h-44 w-full items-center justify-center">
                        <Image
                          src={cat.image}
                          alt={cat.title}
                          width={180}
                          height={176}
                          className="object-contain drop-shadow-sm transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                    </div>

                    {/* Label area */}
                    <div className="flex w-full items-center justify-between px-4 py-3">
                      <span className="text-sm font-bold text-gray-800 transition-colors duration-200 group-hover:text-[#0066FF]">
                        {cat.title}
                      </span>
                      <ArrowRight
                        size={13}
                        className="shrink-0 text-gray-300 opacity-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-[#0066FF] group-hover:opacity-100"
                      />
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <style jsx global>{`
        .swiper-pagination {
          position: relative !important;
          margin-top: 20px;
        }

        .swiper-pagination-bullet {
          width: 8px;
          height: 8px;
        }

        .swiper-pagination-bullet-active {
          transform: scale(1.2);
        }

        @media (min-width: 768px) {
          .swiper-pagination {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
