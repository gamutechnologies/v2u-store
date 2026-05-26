"use client";

import { useState } from "react";

import { motion, AnimatePresence } from "framer-motion";

import {
  Plus,
  Minus,
  Sparkles,
} from "lucide-react";

const faqs = [
  {
    question: "How long does delivery take?",
    answer:
      "Most orders are delivered within 1–3 business days depending on your location and product availability.",
  },
  {
    question: "Are your products authentic?",
    answer:
      "Yes. All products are 100% authentic and sourced directly from trusted global brands and authorized distributors.",
  },
  {
    question: "Do you provide warranty coverage?",
    answer:
      "Absolutely. Most products include official manufacturer warranty along with our premium customer support.",
  },
  {
    question: "Can I return or exchange products?",
    answer:
      "Yes. We provide an easy return and exchange process for eligible products under our return policy.",
  },
  {
    question: "Do you offer technical support?",
    answer:
      "Our support team is available to help with setup assistance, troubleshooting, and product guidance.",
  },
  {
    question: "Which payment methods do you accept?",
    answer:
      "We support secure card payments, bank transfers, and multiple trusted digital payment solutions.",
  },
];

export default function FAQSection() {
  const [active, setActive] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setActive(active === index ? null : index);
  };

  return (
    <section className="relative overflow-hidden px-6 py-28">

      {/* Background Glow */}
      <div className="absolute left-[-10%] top-[0%] h-[500px] w-[500px] rounded-full bg-[#0066FF]/10 blur-3xl" />

      <div className="absolute bottom-[-20%] right-[-10%] h-[500px] w-[500px] rounded-full bg-[#7DBBFF]/20 blur-3xl" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

      <div className="relative mx-auto max-w-5xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#7DBBFF]/20 bg-white/60 px-5 py-2 backdrop-blur-xl">

            <Sparkles size={16} className="text-[#0066FF]" />

            <span className="text-sm font-medium text-[#0066FF]">
              Frequently Asked Questions
            </span>

          </div>

          {/* Title */}
          <h2 className="mt-6 text-5xl font-black tracking-tight text-gray-900 md:text-6xl">

            Questions About
            <span className="bg-gradient-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
              {" "}Our Platform
            </span>

          </h2>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Everything you need to know about orders, support,
            warranty, shipping, and our premium tech experience.
          </p>

        </motion.div>

        {/* FAQ Container */}
        <div className="space-y-6">

          {faqs.map((faq, index) => {
            const isActive = active === index;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: index * 0.06,
                }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-[34px] border border-[#7DBBFF]/20 bg-white/50 backdrop-blur-3xl"
              >

                {/* Glow */}
                <div className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">

                  <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/10 blur-3xl" />

                </div>

                {/* Shine */}
                <div className="absolute left-[-120%] top-0 h-full w-[120%] rotate-12 bg-white/20 blur-2xl transition-all duration-1000 group-hover:left-[120%]" />

                {/* Question */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="relative z-10 flex w-full items-center justify-between gap-6 px-8 py-7 text-left"
                >

                  <h3 className="text-xl font-bold text-gray-900">
                    {faq.question}
                  </h3>

                  <motion.div
                    animate={{
                      rotate: isActive ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0066FF] to-[#7DBBFF] text-white shadow-[0_0_20px_rgba(0,102,255,0.2)]"
                  >

                    {isActive ? (
                      <Minus size={20} />
                    ) : (
                      <Plus size={20} />
                    )}

                  </motion.div>

                </button>

                {/* Answer */}
                <AnimatePresence initial={false}>

                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: "auto",
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                      transition={{
                        duration: 0.35,
                      }}
                      className="overflow-hidden"
                    >

                      <div className="relative z-10 px-8 pb-8">

                        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#7DBBFF]/30 to-transparent" />

                        <p className="mt-6 text-sm leading-8 text-gray-600">
                          {faq.answer}
                        </p>

                      </div>

                    </motion.div>
                  )}

                </AnimatePresence>

              </motion.div>
            );
          })}

        </div>

      </div>

    </section>
  );
}