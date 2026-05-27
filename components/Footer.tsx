"use client";

import Link from "next/link";
import { useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWhatsapp,
  faInstagram,
  faTiktok,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";

const companyLinks = [
  { label: "About",      href: "/about"   },
  { label: "Shop",       href: "/shop"    },
  { label: "Contact Us", href: "/contact" },
];

const socialPlatforms = [
  { icon: faWhatsapp,  label: "WhatsApp",  href: "https://chat.whatsapp.com/your-group-link", color: "#25D366", glow: "rgba(37,211,102,0.22)"  },
  { icon: faInstagram, label: "Instagram", href: "https://instagram.com/v2uonline",            color: "#E1306C", glow: "rgba(225,48,108,0.22)"  },
  { icon: faTiktok,    label: "TikTok",    href: "https://tiktok.com/@v2uonline",              color: "#111827", glow: "rgba(17,24,39,0.15)"    },
  { icon: faFacebookF, label: "Facebook",  href: "https://facebook.com/v2uonline",             color: "#1877F2", glow: "rgba(24,119,242,0.22)"  },
];

const contactInfo = [
  { icon: MapPin, text: "Dubai, UAE & Colombo, Sri Lanka" },
  { icon: Phone,  text: "+94 77 123 4567"                 },
  { icon: Mail,   text: "support@v2ustore.com"            },
];

const fadeUp = (delay = 0) => ({
  initial:     { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0  },
  viewport:    { once: true        },
  transition:  { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

export default function Footer() {
  const ref = useRef(null);

  return (
    <footer ref={ref} className="relative overflow-hidden bg-white">

      {/* Ambient glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute left-[-6%] top-[-8%]      h-125 w-125 rounded-full bg-[#0066FF]/6  blur-[130px]" />
        <div className="absolute bottom-[-10%] right-[-4%] h-105 w-105 rounded-full bg-[#7DBBFF]/10 blur-[110px]" />
      </div>

      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-20"
        style={{
          backgroundImage: "radial-gradient(circle, #0066FF18 1px, transparent 1px)",
          backgroundSize:  "34px 34px",
        }}
      />

      {/* MAIN BODY — 3 columns: Brand | Contact+Socials | Company */}
      <div className="relative z-10 mx-auto max-w-7xl px-8 py-14 lg:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1.6fr_1.1fr_0.7fr] lg:items-start">

          {/* COL 1 — Brand */}
          <motion.div {...fadeUp(0)}>
            <Link href="/" className="block w-fit">
              <motion.h2
                whileHover={{ scale: 1.012 }}
                transition={{ duration: 0.2 }}
                className="select-none text-[130px] font-black leading-none tracking-tighter text-gray-900 lg:text-[160px]"
              >
                V
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #0066FF 0%, #7DBBFF 100%)" }}
                >
                  2
                </span>
                U
                <span
                  className="bg-clip-text text-transparent"
                  style={{ backgroundImage: "linear-gradient(135deg, #0066FF 0%, #7DBBFF 100%)" }}
                >
                  .
                </span>
              </motion.h2>
            </Link>

            <p className="mt-5 max-w-67.5 text-[13px] leading-6 text-gray-500">
              A next-generation premium tech store delivering cutting-edge
              electronics and smart accessories worldwide.
            </p>
          </motion.div>

          {/* COL 2 — Contact info + Social icons */}
          <motion.div {...fadeUp(0.09)} className="flex flex-col gap-5 lg:pt-1">

            {/* Contact rows */}
            {contactInfo.map((c, i) => {
              const Icon = c.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.38, delay: 0.12 + i * 0.07 }}
                  className="flex items-center gap-3 text-[13px] text-gray-500"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-[#7DBBFF]/25 bg-[#F0F6FF]">
                    <Icon size={12} className="text-[#0066FF]" />
                  </div>
                  <span>{c.text}</span>
                </motion.div>
              );
            })}

            {/* Divider */}
            <div className="h-px w-full bg-linear-to-r from-[#0066FF]/12 via-[#7DBBFF]/18 to-transparent" />

            {/* Follow Us + social icons */}
            <div className="flex flex-col gap-3">
              <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400">
                Follow Us
              </p>
              <div className="flex items-center gap-2">
                {socialPlatforms.map((platform, i) => (
                  <motion.a
                    key={platform.label}
                    href={platform.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={platform.label}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.32, delay: 0.25 + i * 0.06 }}
                    whileHover={{ y: -4, scale: 1.1 }}
                    whileTap={{ scale: 0.93 }}
                    className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#7DBBFF]/20 bg-[#F8FBFF] text-gray-400 shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200"
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.backgroundColor = platform.color;
                      el.style.borderColor     = platform.color;
                      el.style.color           = "#ffffff";
                      el.style.boxShadow       = `0 6px 18px ${platform.glow}`;
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement;
                      el.style.backgroundColor = "";
                      el.style.borderColor     = "";
                      el.style.color           = "";
                      el.style.boxShadow       = "";
                    }}
                  >
                    <FontAwesomeIcon icon={platform.icon} className="text-xs" />
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* COL 3 — Company nav */}
          <motion.div {...fadeUp(0.17)} className="lg:pt-1">
            <div className="mb-4 flex items-center gap-2">
              <div className="h-3 w-1 rounded-full bg-linear-to-b from-[#0066FF] to-[#7DBBFF]" />
              <h4 className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400">
                Company
              </h4>
            </div>

            <ul className="flex flex-col gap-3">
              {companyLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.32, delay: 0.22 + i * 0.07 }}
                >
                  <Link href={link.href}>
                    <motion.span
                      whileHover={{ x: 4 }}
                      transition={{ duration: 0.15 }}
                      className="group flex w-fit items-center gap-1.5 text-[13px] font-medium text-gray-500 transition-colors duration-200 hover:text-[#0066FF]"
                    >
                      <span className="h-px w-0 rounded-full bg-[#0066FF] transition-all duration-200 group-hover:w-2.5" />
                      {link.label}
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

        </div>
      </div>

      {/* BOTTOM BAR */}
      <div className="relative z-10">
        <div className="h-px w-full bg-linear-to-r from-transparent via-[#0066FF]/20 to-transparent" />

        <motion.div
          {...fadeUp(0.2)}
          className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-8 py-5 text-[11px] text-gray-400 md:flex-row lg:px-16"
        >
          <p className="font-medium">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-gray-600">V2U Tech Store</span>.{" "}
            All rights reserved.
          </p>

          <div className="flex items-center gap-1">
            {["Terms", "Privacy", "Cookies", "Sitemap"].map((item, i, arr) => (
              <span key={item} className="flex items-center gap-1">
                <Link
                  href="/"
                  className="rounded-md px-2.5 py-1 font-semibold transition-colors hover:bg-[#F0F6FF] hover:text-[#0066FF]"
                >
                  {item}
                </Link>
                {i < arr.length - 1 && <span className="text-gray-200">·</span>}
              </span>
            ))}
          </div>

          <motion.button
            whileHover={{ y: -3, scale: 1.06 }}
            whileTap={{ scale: 0.94 }}
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-2 rounded-full border border-[#7DBBFF]/25 bg-[#F0F6FF] px-4 py-2 font-semibold text-gray-500 transition-all duration-200 hover:border-[#0066FF]/30 hover:text-[#0066FF]"
          >
            Back to top
            <ArrowRight size={11} className="-rotate-90" />
          </motion.button>
        </motion.div>
      </div>

    </footer>
  );
}