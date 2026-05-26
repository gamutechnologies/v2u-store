"use client";

import { motion } from "framer-motion";

import { MapPin, Phone, Mail, Clock3 } from "lucide-react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import {
  faFacebookF,
  faInstagram,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const contactCards = [
  {
    icon: MapPin,
    title: "Visit Our Store",
    description: "123 Tech Avenue, Colombo, Sri Lanka",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+94 77 123 4567",
  },
  {
    icon: Mail,
    title: "Email Support",
    description: "support@yourstore.com",
  },
  {
    icon: Clock3,
    title: "Working Hours",
    description: "Mon - Sat • 9AM - 8PM",
  },
];

const socials = [
  {
    icon: faFacebookF,
    href: "#",
    hover: "hover:bg-[#1877F2]",
  },
  {
    icon: faInstagram,
    href: "#",
    hover:
      "hover:bg-gradient-to-br hover:from-pink-500 hover:via-red-500 hover:to-yellow-500",
  },
  {
    icon: faXTwitter,
    href: "#",
    hover: "hover:bg-black",
  },
];

export default function ContactInfoSection() {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      {/* Background Glow */}
      <div className="absolute left-[-10%] top-[0%] h-[450px] w-[450px] rounded-full bg-[#0066FF]/10 blur-3xl" />

      <div className="absolute bottom-[-20%] right-[-10%] h-[450px] w-[450px] rounded-full bg-[#7DBBFF]/20 blur-3xl" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,102,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,102,255,0.03)_1px,transparent_1px)] bg-[size:70px_70px]" />

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
            Contact Information
          </span>

          <h2 className="mt-6 text-5xl font-black tracking-tight text-gray-900 md:text-6xl">
            Connect With
            <span className="bg-gradient-to-r from-[#0066FF] to-[#7DBBFF] bg-clip-text text-transparent">
              {" "}
              Our Team
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            Reach out through any of our support channels and experience premium
            customer service.
          </p>
        </motion.div>

        {/* Info Grid */}
        <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
          {contactCards.map((item, index) => {
            const Icon = item.icon;

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
                  <div className="absolute left-1/2 top-1/2 h-52 w-52 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]/15 blur-3xl" />
                </div>

                {/* Shine */}
                <div className="absolute left-[-120%] top-0 h-full w-[120%] rotate-12 bg-white/30 blur-2xl transition-all duration-1000 group-hover:left-[120%]" />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: 8,
                      scale: 1.08,
                    }}
                    transition={{ duration: 0.3 }}
                    className="flex h-20 w-20 items-center justify-center rounded-[26px] bg-gradient-to-br from-[#0066FF] to-[#7DBBFF] text-white shadow-[0_0_30px_rgba(0,102,255,0.25)]"
                  >
                    <Icon size={34} />
                  </motion.div>

                  {/* Title */}
                  <h3 className="mt-8 text-2xl font-bold text-gray-900">
                    {item.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-4 text-sm leading-8 text-gray-600">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Social Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-24 flex flex-col items-center justify-center"
        >
          <div className="rounded-full border border-[#7DBBFF]/20 bg-white/60 px-6 py-3 backdrop-blur-xl">
            <p className="text-sm font-medium text-[#0066FF]">
              Follow Our Social Platforms
            </p>
          </div>

          {/* Social Icons */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5">
            {socials.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{
                  y: -6,
                  scale: 1.08,
                }}
                whileTap={{ scale: 0.95 }}
                className={`group flex h-20 w-20 items-center justify-center rounded-[28px] border border-[#7DBBFF]/20 bg-white/60 text-gray-700 backdrop-blur-2xl transition-all duration-300 ${social.hover} hover:text-white hover:shadow-[0_0_30px_rgba(0,102,255,0.2)]`}
              >
                <FontAwesomeIcon
                  icon={social.icon}
                  className="text-[30px] transition-transform duration-300 group-hover:scale-110"
                />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
