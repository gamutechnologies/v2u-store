"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export default function AboutHeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-36">

      {/* Background Glow */}
      <div className="absolute left-[-10%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[#0066FF]/10 blur-3xl" />

      <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#7DBBFF]/20 blur-3xl" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">

        {/* Left Content */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
        >

          {/* Badge */}
          <motion.div
            whileHover={{ scale: 1.03 }}
            className="inline-flex items-center gap-2 rounded-full border border-[#7DBBFF]/20 bg-white/60 px-5 py-2 backdrop-blur-xl"
          >

            <Sparkles size={16} className="text-[#0066FF]" />

            <span className="text-sm font-medium text-[#0066FF]">
              About Our Brand
            </span>

          </motion.div>

          {/* Heading */}
          <h1 className="mt-8 text-5xl font-black leading-[0.95] tracking-tight text-gray-900 md:text-7xl">

            Building The
            <span className="block bg-gradient-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
              Future Of Tech
            </span>

          </h1>

          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
            We create a premium retail-tech experience by combining
            cutting-edge technology, luxury ecommerce design, and
            globally trusted electronics into one futuristic platform.
          </p>

          {/* Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">

            {/* Primary */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-3 rounded-full bg-gradient-to-r from-[#0066FF] to-[#7DBBFF] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_35px_rgba(0,102,255,0.25)]"
            >

              Explore Products

              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />

            </motion.button>

            {/* Secondary */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="rounded-full border border-[#7DBBFF]/20 bg-white/70 px-8 py-4 text-sm font-semibold text-gray-800 backdrop-blur-xl transition-all duration-300 hover:border-[#0066FF]/30 hover:bg-[#0066FF]/10 hover:text-[#0066FF]"
            >
              Learn More
            </motion.button>

          </div>

          {/* Feature Cards */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2">

            {/* Card 1 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[30px] border border-[#7DBBFF]/20 bg-white/50 p-6 backdrop-blur-2xl"
            >

              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

                <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/10 blur-3xl" />

              </div>

              <div className="relative z-10">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#7DBBFF] text-white">

                  <ShieldCheck size={26} />

                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  Trusted Products
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  Authentic premium electronics from globally trusted brands.
                </p>

              </div>

            </motion.div>

            {/* Card 2 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="group relative overflow-hidden rounded-[30px] border border-[#7DBBFF]/20 bg-white/50 p-6 backdrop-blur-2xl"
            >

              <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

                <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/10 blur-3xl" />

              </div>

              <div className="relative z-10">

                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#7DBBFF] text-white">

                  <Zap size={26} />

                </div>

                <h3 className="mt-5 text-xl font-bold text-gray-900">
                  Next-Gen Experience
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600">
                  A futuristic shopping platform designed for modern consumers.
                </p>

              </div>

            </motion.div>

          </div>

        </motion.div>

        {/* Right Image */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          className="relative flex justify-center"
        >

          {/* Rotating Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 25,
              ease: "linear",
            }}
            className="absolute h-[500px] w-[500px] rounded-full border border-[#0066FF]/10"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 35,
              ease: "linear",
            }}
            className="absolute h-[620px] w-[620px] rounded-full border border-[#7DBBFF]/10"
          />

          {/* Floating Glow */}
          <div className="absolute h-[400px] w-[400px] rounded-full bg-[#0066FF]/15 blur-3xl" />

          {/* Main Image */}
          <motion.div
            animate={{
              y: [0, -18, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >

            <Image
              src="/images/about/about-hero.png"
              alt="About Hero"
              width={750}
              height={750}
              className="object-contain drop-shadow-[0_40px_40px_rgba(0,102,255,0.2)]"
            />

          </motion.div>

          {/* Floating Glass Card */}
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="absolute bottom-10 left-0 rounded-[30px] border border-white/20 bg-white/10 p-5 backdrop-blur-2xl"
          >

            <p className="text-sm font-medium text-gray-700">
              Premium Experience
            </p>

            <h4 className="mt-2 text-3xl font-black text-[#0066FF]">
              Since 2018
            </h4>

          </motion.div>

        </motion.div>

      </div>

    </section>
  );
}