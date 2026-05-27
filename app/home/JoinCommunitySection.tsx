"use client";

import { motion } from "framer-motion";
import { Tag, Zap, Bell, Users } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faInstagram,
  faTiktok,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

const perks = [
  { icon: Tag, label: "Exclusive Deals" },
  { icon: Zap, label: "First to Know" },
  { icon: Bell, label: "New Arrivals" },
  { icon: Users, label: "10K+ Members" },
];

const WHATSAPP_GROUP = "https://chat.whatsapp.com/your-group-link";
const INSTAGRAM_URL = "https://instagram.com/v2uonline";
const TIKTOK_URL = "https://tiktok.com/@v2uonline";
const FACEBOOK_URL = "https://facebook.com/v2uonline";

export default function CommunitySection() {
  return (
    <section className="relative overflow-hidden">
      {/* Full-width gradient bg */}
      <div className="absolute inset-0 bg-linear-to-br from-[#0052cc50] via-[#0066ffc9] to-[#7dbcff57]" />

      {/* Dot grid overlay */}
      <div
        className="pointer-events-none absolute inset-0 opacity-15"
        style={{
          backgroundImage:
            "radial-gradient(circle, #ffffff20 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-360 px-8 py-16 lg:px-16">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1fr_480px]">
          {/* LEFT — Heading + perks */}
          <div>
            {/* Label pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-5 py-2 backdrop-blur-sm"
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="text-white text-sm"
              />
              <span className="text-xs font-bold uppercase tracking-widest text-white/80">
                V2U Online Community
              </span>
            </motion.div>

            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.07 }}
              viewport={{ once: true }}
              className="mt-5 text-4xl font-black leading-[1.05] tracking-tight text-white md:text-5xl lg:text-[52px]"
            >
              Join Our Social
              <span className="block opacity-85">Media Community</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.14 }}
              viewport={{ once: true }}
              className="mt-5 max-w-lg text-base leading-7 text-white/70"
            >
              Be the first to hear about new products, flash deals, and
              exclusive offers. Follow us across all platforms and join our
              WhatsApp group for the best tech drops from V2U.
            </motion.p>

            {/* Perks */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.2 }}
              viewport={{ once: true }}
              className="mt-8 flex flex-wrap gap-3"
            >
              {perks.map((perk, i) => {
                const Icon = perk.icon;
                return (
                  <motion.div
                    key={i}
                    whileHover={{ y: -3, scale: 1.04 }}
                    transition={{ duration: 0.18 }}
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
                  >
                    <Icon size={13} className="text-white/70" />
                    <span className="text-xs font-semibold text-white/85">
                      {perk.label}
                    </span>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* RIGHT — Join card */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.96 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            transition={{
              duration: 0.65,
              ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
            }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-3xl border border-white/20 bg-white p-6 shadow-[0_24px_64px_rgba(0,0,0,0.18)]"
          >
            {/* WhatsApp icon + title */}
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] shadow-[0_0_24px_rgba(37,211,102,0.35)]">
                <FontAwesomeIcon
                  icon={faWhatsapp}
                  className="text-2xl text-white"
                />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-900">
                  Join Our Community
                </h3>
                <p className="text-xs text-gray-400">
                  10,000+ members already inside
                </p>
              </div>
            </div>

            {/* What you'll get */}
            <div className="mt-6 flex flex-col gap-2.5 rounded-2xl bg-[#F8FBFF] p-4">
              {[
                "🔥  Flash sales before anyone else",
                "📦  New product drops every week",
                "🎁  Giveaways and community rewards",
              ].map((item, i) => (
                <p key={i} className="text-xs font-medium text-gray-600">
                  {item}
                </p>
              ))}
            </div>

            {/* Social buttons */}
            <div className="mt-2 grid grid-cols-3 gap-3">
              {/* Instagram */}
              <motion.a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 py-4 transition-all duration-200 hover:border-pink-200 hover:bg-pink-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-[#f09433] via-[#e6683c] to-[#bc1888] text-white shadow-sm">
                  <FontAwesomeIcon icon={faInstagram} className="text-base" />
                </div>
                <span className="text-[11px] font-bold text-gray-600 transition-colors duration-200 group-hover:text-pink-600">
                  Instagram
                </span>
              </motion.a>

              {/* TikTok */}
              <motion.a
                href={TIKTOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 py-4 transition-all duration-200 hover:border-gray-300 hover:bg-gray-100"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#010101] text-white shadow-sm">
                  <FontAwesomeIcon icon={faTiktok} className="text-base" />
                </div>
                <span className="text-[11px] font-bold text-gray-600 transition-colors duration-200 group-hover:text-gray-900">
                  TikTok
                </span>
              </motion.a>

              {/* Facebook */}
              <motion.a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group flex flex-col items-center gap-2 rounded-2xl border border-gray-100 bg-gray-50 py-4 transition-all duration-200 hover:border-blue-200 hover:bg-blue-50"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#1877F2] text-white shadow-sm">
                  <FontAwesomeIcon icon={faFacebookF} className="text-base" />
                </div>
                <span className="text-[11px] font-bold text-gray-600 transition-colors duration-200 group-hover:text-[#1877F2]">
                  Facebook
                </span>
              </motion.a>
            </div>

            {/* Divider */}
            <div className="mt-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-100" />
              <span className="text-[8px] font-semibold uppercase tracking-widest text-gray-400">
                Also follow us on
              </span>
              <div className="h-px flex-1 bg-gray-100" />
            </div>

            {/* WhatsApp CTA */}
            <motion.a
              href={WHATSAPP_GROUP}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="mt-5 flex w-full items-center justify-center gap-2.5 rounded-2xl bg-[#25D366] py-4 text-sm font-bold text-white shadow-[0_0_24px_rgba(37,211,102,0.3)] transition-shadow duration-200 hover:shadow-[0_0_32px_rgba(37,211,102,0.45)]"
            >
              <FontAwesomeIcon icon={faWhatsapp} className="text-base" />
              Join the WhatsApp Group
            </motion.a>

            <p className="mt-5 text-center text-[11px] text-gray-400">
              No spam. Follow for the latest deals and drops from V2U.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
