"use client";

import Link from "next/link";
import { ShoppingCart, Search, User } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { cartCount } = useCart();

  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  const lastYRef = useRef(0);
  const scrollDistanceRef = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastYRef.current;
    const difference = latest - previous;

    // scrolling down
    if (difference > 0) {
      scrollDistanceRef.current += difference;

      // only hide after enough downward scrolling
      if (scrollDistanceRef.current > 180 && latest > 120 && !hidden) {
        // small delay before hiding
        if (hideTimeoutRef.current) {
          clearTimeout(hideTimeoutRef.current);
        }

        hideTimeoutRef.current = setTimeout(() => {
          setHidden(true);
        }, 180);
      }
    }

    // scrolling up
    else {
      scrollDistanceRef.current = 0;

      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }

      setHidden(false);
    }

    lastYRef.current = latest;
  });

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      initial={false}
      animate={{
        y: hidden ? -140 : 0,
        opacity: hidden ? 0 : 1,
      }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="fixed top-6 left-1/2 z-50 w-full -translate-x-1/2 px-4"
    >
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.7,
          ease: [0.16, 1, 0.3, 1],
        }}
        className="mx-auto flex max-w-7xl items-center justify-between rounded-md border-2 border-white/20 bg-white/10 px-6 py-4 backdrop-blur-2xl"
      >
        {/* Logo */}
        <Link href="/">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-extrabold tracking-tight text-[#0066FF]"
          >
            V<span className="text-[#ffffff] text-3xl">2</span>U
          </motion.div>
        </Link>

        {/* Nav Links */}
        <div className="hidden items-center gap-2 md:flex">
          {navLinks.map((link) => (
            <motion.div
              key={link.name}
              whileHover={{ y: -2 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Link
                href={link.href}
                className="group relative flex items-center overflow-hidden rounded-md px-5 py-2.5 text-sm font-medium text-gray-200 transition-all duration-300"
              >
                {/* Hover Glow */}
                <span className="absolute inset-0 scale-0 rounded-md bg-[#0066FF]/10 transition-transform duration-300 group-hover:scale-100" />

                {/* Text */}
                <span className="relative z-10 transition-colors duration-300 group-hover:text-[#ffffff]">
                  {link.name}
                </span>

                {/* Underline */}
                <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-md bg-[#00ccff] transition-all duration-300 group-hover:w-8" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Right Icons */}
        <div className="flex items-center gap-2">
          {[
            { icon: Search, href: "/search" },
            { icon: ShoppingCart, href: "/cart" },
            { icon: User, href: "/profile" },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <Link key={index} href={item.href}>
                <motion.button
                  whileHover={{
                    scale: 1.08,
                    y: -2,
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white/20 backdrop-blur-xl transition-all duration-300"
                >
                  {/* Glow */}
                  <span className="absolute inset-0 scale-0 rounded-full bg-[#0066FF]/15 transition-transform duration-300 group-hover:scale-100" />

                  <Icon
                    size={18}
                    className="relative z-10 text-gray-700 transition-colors duration-300 group-hover:text-[#0066FF]"
                  />

                  {item.icon === ShoppingCart && cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#0066FF] text-[10px] font-bold text-white">
                      {cartCount}
                    </span>
                  )}
                </motion.button>
              </Link>
            );
          })}
        </div>
      </motion.nav>
    </motion.div>
  );
}
