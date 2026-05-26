"use client";

import { motion } from "framer-motion";

import {
  ShieldCheck,
  Truck,
  Headphones,
  CreditCard,
  Sparkles,
  BadgeCheck,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Premium Warranty",
    description:
      "All products include trusted warranty coverage and quality assurance.",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Lightning-fast shipping and secure delivery across the country.",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description:
      "Dedicated customer support for all your tech and order inquiries.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description:
      "Safe encrypted payments with trusted checkout protection systems.",
  },
  {
    icon: Sparkles,
    title: "Latest Technology",
    description:
      "Access the newest premium gadgets and futuristic electronics.",
  },
  {
    icon: BadgeCheck,
    title: "Trusted Brands",
    description:
      "Shop authentic products from globally recognized tech companies.",
  },
];

export default function WhyChooseUsSection() {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      {/* Background Glow */}
      <div className="absolute left-[-10%] top-[0%] h-112.5 w-112.5 rounded-full bg-[#0066FF]/10 blur-3xl" />
      <div className="absolute bottom-[-20%] right-[-10%] h-112.5 w-112.5 rounded-full bg-[#7DBBFF]/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <span className="rounded-full border border-[#7DBBFF]/20 bg-white/60 px-5 py-2 text-sm font-medium text-[#0066FF] backdrop-blur-xl">
            Why Choose Us
          </span>
          <h2 className="mt-6 text-4xl font-black tracking-tight text-gray-900 md:text-6xl">
            Premium Experience
            <span className="bg-linear-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
              {" "}Built For Tech Lovers
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            We deliver a next-generation retail experience with premium
            products, trusted brands, fast service, and futuristic shopping.
          </p>
        </motion.div>
        {/* Features Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                }}
                className="group relative overflow-hidden rounded-[38px] border border-[#7DBBFF]/20 bg-white/50 p-8 backdrop-blur-3xl"
              >
                {/* Glow */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/15 blur-3xl" />
                </div>
                {/* Shine */}
                <div className="absolute left-[-120%] top-0 h-full w-[120%] rotate-12 bg-white/30 blur-2xl transition-all duration-1000 group-hover:left-[120%]" />
                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: 6,
                      scale: 1.08,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-linear-to-br from-[#0066FF] to-[#7DBBFF] text-white shadow-[0_0_30px_rgba(0,102,255,0.25)]"
                  >
                    <Icon size={34} />
                  </motion.div>
                  {/* Text */}
                  <div className="mt-8">
                    <h3 className="text-3xl font-bold tracking-tight text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="mt-4 text-sm leading-8 text-gray-600">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}