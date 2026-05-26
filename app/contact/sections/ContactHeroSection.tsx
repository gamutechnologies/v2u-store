"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import {
  Headphones,
  MessageCircle,
  Phone,
  ArrowRight,
  Sparkles,
  Mail,
} from "lucide-react";

const quickActions = [
  {
    icon: MessageCircle,
    title: "Live Chat",
    subtitle: "Instant support",
  },
  {
    icon: Phone,
    title: "Call Support",
    subtitle: "+94 77 123 4567",
  },
  {
    icon: Mail,
    title: "Email Us",
    subtitle: "support@yourstore.com",
  },
];

export default function ContactHeroSection() {
  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-36">
      {/* Massive Background Glow */}
      <div className="absolute left-[-10%] top-[-10%] h-150 w-150 rounded-full bg-[#0066FF]/10 blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] h-150 w-150 rounded-full bg-[#7DBBFF]/20 blur-3xl" />
      {/* Futuristic Grid */}
      <div className="absolute inset-0 bg-[linear-linear(rgba(0,102,255,0.04)_1px,transparent_1px),linear-linear(90deg,rgba(0,102,255,0.04)_1px,transparent_1px)] bg-size-[80px_80px]" />
      {/* Floating Orbs */}
      <motion.div
        animate={{
          y: [0, -30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 7,
          ease: "easeInOut",
        }}
        className="absolute left-[8%] top-[20%] h-20 w-20 rounded-full bg-[#0066FF]/20 blur-2xl"
      />
      <motion.div
        animate={{
          y: [0, 30, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 8,
          ease: "easeInOut",
        }}
        className="absolute bottom-[15%] right-[10%] h-28 w-28 rounded-full bg-[#7DBBFF]/20 blur-2xl"
      />
      <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-2">
        {/* LEFT CONTENT */}
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
              24/7 Premium Support
            </span>
          </motion.div>
          {/* Heading */}
          <h1 className="mt-8 text-5xl font-black leading-[0.95] tracking-tight text-gray-900 md:text-7xl">
            Let’s Build Your
            <span className="block bg-linear-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
              Tech Experience
            </span>
          </h1>
          {/* Description */}
          <p className="mt-8 max-w-2xl text-lg leading-8 text-gray-600">
            Whether you need product guidance, technical support,
            order assistance, or partnership inquiries, our team is
            ready to deliver a premium experience.
          </p>
          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            {/* Primary */}
            <motion.button
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="group flex items-center gap-3 rounded-full bg-linear-to-r from-[#0066FF] to-[#7DBBFF] px-8 py-4 text-sm font-semibold text-white shadow-[0_0_40px_rgba(0,102,255,0.3)]"
            >
              Start Conversation
              <ArrowRight
                size={18}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </motion.button>
            {/* Secondary */}
            <Link href="/shop">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="rounded-full border border-[#7DBBFF]/20 bg-white/70 px-8 py-4 text-sm font-semibold text-gray-800 backdrop-blur-xl transition-all duration-300 hover:border-[#0066FF]/30 hover:bg-[#0066FF]/10 hover:text-[#0066FF]"
              >
                Explore Products
              </motion.button>
            </Link>
          </div>
          {/* Quick Contact Cards */}
          <div className="mt-14 grid gap-5 sm:grid-cols-3">
            {quickActions.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  whileHover={{
                    y: -8,
                    scale: 1.02,
                  }}
                  className="group relative overflow-hidden rounded-[30px] border border-[#7DBBFF]/20 bg-white/50 p-5 backdrop-blur-2xl"
                >
                  {/* Glow */}
                  <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                    <div className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/15 blur-3xl" />
                  </div>
                  {/* Content */}
                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#0066FF] to-[#7DBBFF] text-white shadow-[0_0_25px_rgba(0,102,255,0.25)]">
                      <Icon size={24} />
                    </div>
                    {/* Text */}
                    <h3 className="mt-5 text-lg font-bold text-gray-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {item.subtitle}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
        {/* RIGHT SIDE */}
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
              duration: 30,
              ease: "linear",
            }}
            className="absolute h-135 w-135 rounded-full border border-[#0066FF]/10"
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              repeat: Infinity,
              duration: 40,
              ease: "linear",
            }}
            className="absolute h-170 w-170 rounded-full border border-[#7DBBFF]/10"
          />
          {/* Glow */}
          <div className="absolute h-112.5 w-112.5 rounded-full bg-[#0066FF]/15 blur-3xl" />
          {/* Main Image */}
          <motion.div
            animate={{
              y: [0, -20, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
            }}
            className="relative z-10"
          >
            <Image
              src="/images/contact/contact-hero.png"
              alt="Contact Support"
              width={780}
              height={780}
              className="object-contain drop-shadow-[0_40px_40px_rgba(0,102,255,0.2)]"
            />
          </motion.div>
          {/* Floating Support Card */}
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              repeat: Infinity,
              duration: 4,
              ease: "easeInOut",
            }}
            className="absolute bottom-10 left-0 rounded-[30px] border border-white/20 bg-white/10 p-6 backdrop-blur-2xl"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-linear-to-br from-[#0066FF] to-[#7DBBFF] text-white">
                <Headphones size={28} />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700">
                  Average Reply Time
                </p>
                <h4 className="mt-1 text-3xl font-black text-[#0066FF]">
                  Under 5 Min
                </h4>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}