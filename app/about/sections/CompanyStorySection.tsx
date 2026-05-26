"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Cpu,
  Globe,
  Rocket,
  ShieldCheck,
} from "lucide-react";

const highlights = [
  {
    icon: Cpu,
    title: "Innovation Driven",
    description:
      "Focused on delivering futuristic technology experiences.",
  },
  {
    icon: Globe,
    title: "Global Brands",
    description:
      "Partnering with internationally trusted tech companies.",
  },
  {
    icon: Rocket,
    title: "Modern Ecommerce",
    description:
      "Creating next-generation retail experiences for everyone.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted Platform",
    description:
      "Authentic products, premium support, and secure shopping.",
  },
];

export default function CompanyStorySection() {
  return (
    <section className="relative overflow-hidden px-6 py-28">

      {/* Background Glow */}
      <div className="absolute left-[-10%] top-[0%] h-[450px] w-[450px] rounded-full bg-[#0066FF]/10 blur-3xl" />

      <div className="absolute bottom-[-20%] right-[-10%] h-[450px] w-[450px] rounded-full bg-[#7DBBFF]/20 blur-3xl" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">

        {/* Left Image */}
        <motion.div
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="relative flex justify-center"
        >

          {/* Rotating Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              repeat: Infinity,
              duration: 30,
              ease: "linear",
            }}
            className="absolute h-[520px] w-[520px] rounded-full border border-[#0066FF]/10"
          />

          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: "linear",
            }}
            className="absolute h-[650px] w-[650px] rounded-full border border-[#7DBBFF]/10"
          />

          {/* Glow */}
          <div className="absolute h-[420px] w-[420px] rounded-full bg-[#0066FF]/15 blur-3xl" />

          {/* Image */}
          <motion.div
            animate={{
              y: [0, -15, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >

            <Image
              src="/images/about/company-story.png"
              alt="Company Story"
              width={750}
              height={750}
              className="object-contain drop-shadow-[0_40px_40px_rgba(0,102,255,0.2)]"
            />

          </motion.div>

          {/* Floating Card */}
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="absolute bottom-8 right-0 rounded-[30px] border border-white/20 bg-white/10 p-6 backdrop-blur-2xl"
          >

            <p className="text-sm font-medium text-gray-700">
              Trusted Worldwide
            </p>

            <h4 className="mt-2 text-3xl font-black text-[#0066FF]">
              50K+ Customers
            </h4>

          </motion.div>

        </motion.div>

        {/* Right Content */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7DBBFF]/20 bg-white/60 px-5 py-2 backdrop-blur-xl">

            <span className="text-sm font-medium text-[#0066FF]">
              Our Story
            </span>

          </div>

          {/* Heading */}
          <h2 className="mt-8 text-5xl font-black leading-[0.95] tracking-tight text-gray-900 md:text-6xl">

            Redefining
            <span className="block bg-gradient-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
              Modern Tech Retail
            </span>

          </h2>

          {/* Description */}
          <div className="mt-8 space-y-6 text-lg leading-8 text-gray-600">

            <p>
              Our journey started with a vision to transform traditional
              electronics shopping into a premium digital experience
              powered by innovation, modern design, and cutting-edge technology.
            </p>

            <p>
              Today, we continue building a futuristic retail ecosystem
              where customers can discover premium devices, trusted brands,
              and immersive shopping experiences all in one platform.
            </p>

          </div>

          {/* Highlights */}
          <div className="mt-12 grid gap-5 sm:grid-cols-2">

            {highlights.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -6,
                    scale: 1.02,
                  }}
                  className="group relative overflow-hidden rounded-[28px] border border-[#7DBBFF]/20 bg-white/50 p-5 backdrop-blur-2xl"
                >

                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

                    <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/10 blur-3xl" />

                  </div>

                  <div className="relative z-10">

                    {/* Icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#7DBBFF] text-white shadow-[0_0_20px_rgba(0,102,255,0.2)]">

                      <Icon size={26} />

                    </div>

                    {/* Text */}
                    <h3 className="mt-5 text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-sm leading-7 text-gray-600">
                      {item.description}
                    </p>

                  </div>

                </motion.div>
              );
            })}

          </div>

        </motion.div>

      </div>

    </section>
  );
}