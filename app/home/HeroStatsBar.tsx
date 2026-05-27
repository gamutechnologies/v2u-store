"use client";

import {
  Star,
  ShieldCheck,
  Truck,
  Zap,
  Globe,
  Clock,
  RotateCcw,
  Award,
  Package,
  HeartHandshake,
} from "lucide-react";

const stats = [
  { icon: Star, value: "50K+", label: "Happy Customers" },
  { icon: ShieldCheck, value: "100%", label: "Authentic Products" },
  { icon: Truck, value: "1–3 Days", label: "Fast Delivery" },
  { icon: Zap, value: "10,000+", label: "Products In Stock" },
  { icon: Globe, value: "146+", label: "Countries Served" },
  { icon: Award, value: "8+", label: "Years in Business" },
  { icon: Star, value: "4.9★", label: "Average Rating" },
  { icon: Clock, value: "24/7", label: "Customer Support" },
  { icon: RotateCcw, value: "Free", label: "Easy Returns" },
  { icon: Package, value: "500+", label: "Daily Orders" },
  { icon: HeartHandshake, value: "8+", label: "Global Brands" },
];

// Triple duplicate for seamless loop
const ITEMS = [...stats, ...stats, ...stats];

export default function HeroStatsBar() {
  return (
    <section className="relative overflow-hidden border-t border-[#7DBBFF]/12 bg-white">
      {/* Top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#0066FF]/25 to-transparent" />

      <div className="mx-auto flex max-w-7xl flex-col px-4 sm:px-6 lg:px-8">
        {/* Small top heading */}
        <div className="pt-3 pb-2 text-center">
          <p className="text-sm font-medium tracking-wide text-zinc-400">
            Trusted by customers worldwide
          </p>
        </div>

        {/* Ticker */}
        <div
          className="relative overflow-hidden"
          style={{ height: "58px" }}
        >
          {/* Edge fade masks */}
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-16 bg-linear-to-r from-white to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-16 bg-linear-to-l from-white to-transparent" />

          {/* Marquee track */}
          <div className="flex h-full items-center overflow-hidden">
            <div
              className="flex shrink-0 items-center will-change-transform"
              style={{
                animation: "statsMarquee 38s linear infinite",
                width: "max-content",
              }}
            >
              {ITEMS.map((s, i) => {
                const Icon = s.icon;

                return (
                  <div
                    key={i}
                    className="flex shrink-0 items-center gap-2 px-5"
                  >
                    {/* Icon */}
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-[#7DBBFF]/20 bg-[#F0F6FF]">
                      <Icon size={14} className="text-[#0066FF]" />
                    </div>

                    {/* Text */}
                    <div className="flex items-baseline gap-1.5 whitespace-nowrap">
                      <span className="text-sm font-bold leading-none text-gray-900">
                        {s.value}
                      </span>

                      <span className="text-xs font-medium text-gray-400">
                        {s.label}
                      </span>
                    </div>

                    {/* Divider */}
                    <span className="ml-3 h-1 w-1 rounded-full bg-[#7DBBFF]/40" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#7DBBFF]/15 to-transparent" />

      <style>{`
        @keyframes statsMarquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(calc(-100% / 3));
          }
        }
      `}</style>
    </section>
  );
}