"use client";

import Link from "next/link";
import { ShoppingCart, Heart, User, Search } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { useEffect, useRef, useState } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

const iconLinks = [
  { icon: Search, href: "/search", label: "Search" },
  { icon: Heart, href: "/wishlist", label: "Wishlist" },
  { icon: User, href: "/account", label: "Account" },
  { icon: ShoppingCart, href: "/cart", label: "Cart" },
];

function HamburgerButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      aria-label={open ? "Close menu" : "Open menu"}
      className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.25 rounded-full border border-gray-200 bg-white md:hidden"
    >
      <motion.span
        animate={
          open
            ? { rotate: 45, y: 7, width: "18px" }
            : { rotate: 0, y: 0, width: "18px" }
        }
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="block h-0.5 rounded-full bg-gray-700 origin-center"
        style={{ width: 18 }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-0.5 rounded-full bg-gray-700"
        style={{ width: 14 }}
      />
      <motion.span
        animate={
          open
            ? { rotate: -45, y: -7, width: "18px" }
            : { rotate: 0, y: 0, width: "18px" }
        }
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="block h-0.5 rounded-full bg-gray-700 origin-center"
        style={{ width: 18 }}
      />
    </motion.button>
  );
}

const itemVariants = {
  hidden: { opacity: 0, x: 48, scale: 0.94 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      duration: 0.38,
      delay: i * 0.07,
      ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
    },
  }),
  exit: (i: number) => ({
    opacity: 0,
    x: 48,
    scale: 0.94,
    transition: {
      duration: 0.22,
      delay: (navLinks.length - 1 - i) * 0.05,
      ease: [0.4, 0, 1, 1] as [number, number, number, number],
    },
  }),
};

function InlineMenu({
  open,
  onClose,
  cartCount,
}: {
  open: boolean;
  onClose: () => void;
  cartCount: number;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Backdrop — blurs behind, navbar sits above at z-50 */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            onClick={onClose}
            className="fixed inset-0 z-40 backdrop-blur-md bg-black/55"
          />
        )}
      </AnimatePresence>

      {/* Dropdown — anchored just below the navbar pill */}
      <div
        className="pointer-events-none fixed left-1/2 z-50 w-full -translate-x-1/2 px-4 md:hidden"
        style={{ top: "calc(1.5rem + 80px)" }}
      >
        <AnimatePresence>
          {open && (
            <>
              <ul className="pointer-events-auto flex w-full flex-col gap-2 pb-24">
                {navLinks.map((link, i) => (
                  <motion.li
                    key={link.name}
                    custom={i}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="w-full"
                  >
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="group flex w-full items-center justify-center rounded-md border border-white/10 bg-zinc-900/80 px-6 py-4 backdrop-blur-xl transition-all duration-200 hover:border-[#0066FF]/40 hover:bg-[#0066FF]/15"
                    >
                      <span className="text-[17px] font-bold tracking-tight text-white/80 transition-colors duration-200 group-hover:text-white">
                        {link.name}
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>

              <div className="fixed bottom left-4 right-4 z-60 flex gap-2">
                <Link
                  href="/search"
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center rounded-md border border-white/10 bg-zinc-900/80 py-4 backdrop-blur-xl"
                >
                  <Search size={22} className="text-white/80" />
                </Link>

                <Link
                  href="/wishlist"
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center rounded-md border border-white/10 bg-zinc-900/80 py-4 backdrop-blur-xl"
                >
                  <Heart size={22} className="text-white/80" />
                </Link>

                <Link
                  href="/account"
                  onClick={onClose}
                  className="flex-1 flex items-center justify-center rounded-md border border-white/10 bg-zinc-900/80 py-4 backdrop-blur-xl"
                >
                  <User size={22} className="text-white/80" />
                </Link>

                <Link
                  href="/cart"
                  onClick={onClose}
                  className="relative flex-1 flex items-center justify-center rounded-md border border-white/10 bg-zinc-900/80 py-4 backdrop-blur-xl"
                >
                  <ShoppingCart size={22} className="text-white/80" />

                  {cartCount > 0 && (
                    <span className="absolute top-2 right-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0066FF] px-0.5 text-[9px] font-bold leading-none text-white">
                      {cartCount}
                    </span>
                  )}
                </Link>
              </div>
            </>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default function Navbar() {
  const { cartCount } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Floating pill navbar */}
      <motion.div className="fixed top-0 left-0 z-50 w-full">
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex h-20 w-full items-center justify-between bg-white border-b border-gray-200 px-6 lg:px-12 shadow-sm"
        >
          {/* Logo */}
          <Link href="/">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-extrabold tracking-tight text-[#0066FF]"
            >
              V<span className="text-gray-900 text-3xl">2</span>U
            </motion.div>
          </Link>

          {/* Desktop nav links */}
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
                  className="group relative flex items-center overflow-hidden rounded-md px-5 py-2.5 text-md font-medium text-gray-700 transition-all duration-300"
                >
                  <span className="absolute inset-0 scale-0 rounded-md bg-[#0066FF]/10 transition-transform duration-300 group-hover:scale-100" />

                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#0066FF]">
                    {link.name}
                  </span>

                  <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-md bg-[#0066FF] transition-all duration-300 group-hover:w-8" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="hidden lg:flex items-center">
            <div className="flex items-center border border-gray-300 rounded-lg px-3 py-2 w-80">
              <Search size={18} className="text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                className="ml-2 w-full outline-none text-sm"
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Desktop icon buttons */}
            {iconLinks.map((item, index) => {
              const Icon = item.icon;
              return (
                <Link key={index} href={item.href} className="hidden md:block">
                  <motion.button
                    whileHover={{ scale: 1.08, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative flex h-11 w-11 items-center justify-center overflow-visible rounded-full border border-gray-200 bg-white transition-all duration-300 hover:border-[#0066FF]/30"
                  >
                    <span className="absolute inset-0 scale-0 rounded-full bg-[#0066FF]/15 transition-transform duration-300 group-hover:scale-100" />
                    <Icon
                      size={18}
                      className="relative z-10 text-gray-700 transition-colors duration-300 group-hover:text-[#0066FF]"
                    />
                    {item.icon === ShoppingCart && cartCount > 0 && (
                      <span className="absolute -top-1 -right-1 z-20 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0066FF] px-0.5 text-[10px] font-bold leading-none text-white shadow-[0_0_8px_rgba(0,102,255,0.5)]">
                        {cartCount}
                      </span>
                    )}
                  </motion.button>
                </Link>
              );
            })}

            {/* Mobile: cart + hamburger */}
            <div className="flex items-center gap-2 md:hidden">
              <Link href="/search">
                <motion.div
                  whileTap={{ scale: 0.93 }}
                  className="relative flex h-10 w-10 items-center justify-center overflow-visible rounded-full border border-gray-200 bg-white"
                >
                  <Search size={17} className="text-gray-700" />
                </motion.div>
              </Link>

              <Link href="/cart">
                <motion.div
                  whileTap={{ scale: 0.93 }}
                  className="relative flex h-10 w-10 items-center justify-center overflow-visible rounded-full border border-gray-200 bg-white"
                >
                  <ShoppingCart size={17} className="text-gray-700" />

                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 z-20 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0066FF] px-0.5 text-[9px] font-bold leading-none text-white">
                      {cartCount}
                    </span>
                  )}
                </motion.div>
              </Link>

              <HamburgerButton
                open={mobileOpen}
                onClick={() => setMobileOpen((v) => !v)}
              />
            </div>
          </div>
        </motion.nav>
      </motion.div>

      {/* Inline mobile dropdown */}
      <InlineMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        cartCount={cartCount}
      />
    </>
  );
}
