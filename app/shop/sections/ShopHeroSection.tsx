"use client";

import { motion } from "framer-motion";

export default function ShopHeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-12 pt-28">
      <div className="absolute left-[10%] top-[-20%] h-75 w-125 rounded-full bg-[#0066FF]/20 blur-[100px]" />
      <div className="absolute bottom-[-10%] right-[10%] h-75 w-125 rounded-full bg-[#7DBBFF]/20 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#0066FF]/20 bg-[#0066FF]/5 px-4 py-1.5 text-sm font-medium text-[#0066FF]"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#0066FF] opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#0066FF]"></span>
          </span>
          Next-Gen Collection 2026
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="text-5xl font-black tracking-tight text-gray-900 md:text-7xl lg:text-[80px]"
        >
          Shop{" "}
          <span className="bg-linear-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
            Premium Tech
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 md:text-xl"
        >
          Explore the finest selection of cutting-edge gadgets, powerful
          electronics, competitive gaming gear, and smart lifestyle devices.
        </motion.p>
      </div>
    </section>
  );
}
