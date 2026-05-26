"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

const awards = [
  {
    title: "Best Gaming Store 2026",
    image: "/images/awards/award-1.webp",
  },
  {
    title: "Top Tech Retail Brand",
    image: "/images/awards/award-2.webp",
  },
  {
    title: "Innovation Excellence",
    image: "/images/awards/award-3.webp",
  },
  {
    title: "Trusted Electronics Partner",
    image: "/images/awards/award-4.webp",
  },
  {
    title: "Customer Choice Award",
    image: "/images/awards/award-5.webp",
  },
];

export default function AwardsSection() {
  const isCarousel = awards.length > 5;

  return (
    <section className="relative overflow-hidden px-6 py-20">
      {/* Ambient Glow */}
      <div className="absolute left-[10%] top-[10%] h-72 w-72 rounded-full bg-[#0066FF]/10 blur-3xl" />
      <div className="absolute bottom-0 right-[10%] h-72 w-72 rounded-full bg-[#7DBBFF]/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-14 text-center"
        >
          <span className="rounded-full border border-[#0066FF]/10 bg-[#0066FF]/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#0066FF]">
            Recognition
          </span>

          <h2 className="mt-5 text-4xl font-black tracking-tight text-gray-900 md:text-6xl">
            Awards &{" "}
            <span className="bg-linear-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
              Achievements
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-gray-600 md:text-lg">
            Recognized globally for innovation, customer experience,
            and premium technology excellence.
          </p>
        </motion.div>

        {/* STATIC GRID */}
        {!isCarousel && (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-5">
            {awards.map((award, index) => (
              <AwardCard key={index} award={award} />
            ))}
          </div>
        )}

        {/* CAROUSEL */}
        {isCarousel && (
          <div className="relative">
            {/* Left Fade */}
            <div className="pointer-events-none absolute left-0 top-0 z-20 h-full w-32 bg-linear-to-r from-white to-transparent" />

            {/* Right Fade */}
            <div className="pointer-events-none absolute right-0 top-0 z-20 h-full w-32 bg-linear-to-l from-white to-transparent" />

            <Swiper
              modules={[Autoplay]}
              loop
              speed={5000}
              allowTouchMove={false}
              slidesPerView={2}
              spaceBetween={20}
              autoplay={{
                delay: 0,
                disableOnInteraction: false,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 4,
                },
                1280: {
                  slidesPerView: 5,
                },
              }}
              className="overflow-visible!"
            >
              {awards.map((award, index) => (
                <SwiperSlide key={index}>
                  <AwardCard award={award} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}
      </div>
    </section>
  );
}

/* Award Card */
function AwardCard({
  award,
}: {
  award: {
    title: string;
    image: string;
  };
}) {
  return (
    <motion.div
      whileHover={{
        y: -8,
      }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-[32px] border border-white/30 bg-white/60 p-6 backdrop-blur-3xl"
    >
      {/* Glow */}
      <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/15 blur-3xl" />
      </div>

      {/* Gradient Border */}
      <div className="absolute inset-0 rounded-[32px] border border-transparent bg-linear-to-b from-[#0066FF]/0 via-[#0066FF]/0 to-[#7DBBFF]/0 opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:from-[#0066FF]/20 group-hover:to-[#7DBBFF]/10" />

      <div className="relative z-10 flex flex-col items-center">
        {/* Award Image */}
        <div className="relative flex h-44 w-full items-center justify-center">
          <Image
            src={award.image}
            alt={award.title}
            width={180}
            height={180}
            className="object-contain drop-shadow-[0_20px_30px_rgba(0,102,255,0.15)] transition-all duration-500 group-hover:scale-105"
          />
        </div>

        {/* Divider */}
        <div className="mt-2 h-px w-12 bg-linear-to-r from-transparent via-[#0066FF]/40 to-transparent transition-all duration-500 group-hover:w-20" />

        {/* Title */}
        <h3 className="mt-5 text-center text-sm font-bold leading-6 tracking-wide text-gray-800 transition-colors duration-300 group-hover:text-[#0066FF] md:text-base">
          {award.title}
        </h3>
      </div>

      {/* Bottom Glow */}
      <div className="absolute -bottom-10 left-1/2 h-24 w-24 -translate-x-1/2 rounded-full bg-[#7DBBFF]/10 blur-3xl" />
    </motion.div>
  );
}