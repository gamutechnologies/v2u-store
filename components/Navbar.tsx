"use client";

import Link from "next/link";
import { ShoppingCart, X } from "lucide-react";
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

const iconLinks = [{ icon: ShoppingCart, href: "/cart", label: "Cart" }];

// ─── Hamburger ────────────────────────────────────────────────────────────────

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
      className="relative flex h-10 w-10 flex-col items-center justify-center gap-1.25 rounded-full border border-white/20 bg-white/20 backdrop-blur-xl md:hidden"
    >
      <motion.span
        animate={
          open
            ? { rotate: 45, y: 7, width: "18px" }
            : { rotate: 0, y: 0, width: "18px" }
        }
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="block h-0.5 rounded-full bg-white origin-center"
        style={{ width: 18 }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-0.5 rounded-full bg-white"
        style={{ width: 14 }}
      />
      <motion.span
        animate={
          open
            ? { rotate: -45, y: -7, width: "18px" }
            : { rotate: 0, y: 0, width: "18px" }
        }
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="block h-0.5 rounded-full bg-white origin-center"
        style={{ width: 18 }}
      />
    </motion.button>
  );
}

// ─── Item animation variants ──────────────────────────────────────────────────

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

// ─── Inline dropdown (mobile only) ───────────────────────────────────────────

function InlineMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
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
            <ul className="pointer-events-auto flex w-full flex-col gap-2">
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
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

export default function Navbar() {
  const { cartCount } = useCart();

  const [hidden, setHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const lastYRef = useRef(0);
  const scrollDistanceRef = useRef(0);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = lastYRef.current;
    const difference = latest - previous;

    if (difference > 0) {
      scrollDistanceRef.current += difference;
      if (scrollDistanceRef.current > 180 && latest > 120 && !hidden) {
        if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
        hideTimeoutRef.current = setTimeout(() => setHidden(true), 180);
      }
    } else {
      scrollDistanceRef.current = 0;
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      setHidden(false);
    }

    lastYRef.current = latest;
  });

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    if (hidden) setMobileOpen(false);
  }, [hidden]);

  return (
    <>
      {/* ── Floating pill navbar ─────────────────────────────────────────── */}
      <motion.div
        initial={false}
        animate={{ y: hidden ? -140 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-6 left-1/2 z-50 w-full -translate-x-1/2 px-4"
      >
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          // Navbar bg transitions to match menu item color when open on mobile
          className={`mx-auto flex max-w-7xl items-center justify-between rounded-md border-2 px-6 py-4 backdrop-blur-lg transition-colors duration-300 ${
            mobileOpen
              ? "border-white/10 bg-zinc-900/80"
              : "border-white/20 bg-zinc-900/30"
          }`}
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
                  className="group relative flex items-center overflow-hidden rounded-md px-5 py-2.5 text-md font-medium text-white transition-all duration-300"
                >
                  <span className="absolute inset-0 scale-0 rounded-md bg-[#0066FF]/10 transition-transform duration-300 group-hover:scale-100" />
                  <span className="relative z-10 transition-colors duration-300 group-hover:text-[#ffffff]">
                    {link.name}
                  </span>
                  <span className="absolute bottom-1 left-1/2 h-0.5 w-0 -translate-x-1/2 rounded-md bg-[#00ccff] transition-all duration-300 group-hover:w-8" />
                </Link>
              </motion.div>
            ))}
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
                    className="group relative flex h-11 w-11 items-center justify-center overflow-visible rounded-full border border-white/20 bg-white/20 backdrop-blur-xl transition-all duration-300"
                  >
                    <span className="absolute inset-0 scale-0 rounded-full bg-[#0066FF]/15 transition-transform duration-300 group-hover:scale-100" />
                    <Icon
                      size={18}
                      className="relative z-10 text-white transition-colors duration-300 group-hover:text-[#00eeff]"
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
              <Link href="/cart">
                <motion.div
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.93 }}
                  className="relative flex h-10 w-10 items-center justify-center overflow-visible rounded-full border border-white/20 bg-white/20 backdrop-blur-xl"
                >
                  <ShoppingCart size={17} className="text-white/80" />
                  {cartCount > 0 && (
                    <span className="absolute -top-1 -right-1 z-20 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#0066FF] px-0.5 text-[9px] font-bold leading-none text-white shadow-[0_0_8px_rgba(0,102,255,0.5)]">
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

      {/* ── Inline mobile dropdown ───────────────────────────────────────── */}
      <InlineMenu open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </>
  );
}
