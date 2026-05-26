"use client";

import { Star, ShieldCheck, Truck, Zap, Globe, Clock, RotateCcw, Award, Package, HeartHandshake } from "lucide-react";

const stats = [
  { icon: Star,          value: "50K+",     label: "Happy Customers"    },
  { icon: ShieldCheck,   value: "100%",     label: "Authentic Products" },
  { icon: Truck,         value: "1–3 Days", label: "Fast Delivery"      },
  { icon: Zap,           value: "10,000+",  label: "Products In Stock"  },
  { icon: Globe,         value: "146+",     label: "Countries Served"   },
  { icon: Award,         value: "8+",       label: "Years in Business"  },
  { icon: Star,          value: "4.9★",     label: "Average Rating"     },
  { icon: Clock,         value: "24/7",     label: "Customer Support"   },
  { icon: RotateCcw,     value: "Free",     label: "Easy Returns"       },
  { icon: Package,       value: "500+",     label: "Daily Orders"       },
  { icon: HeartHandshake,value: "8+",       label: "Global Brands"      },
];

// Triple-duplicate for seamless loop
const ITEMS = [...stats, ...stats, ...stats];

export default function HeroStatsBar() {
  return (
    <section
      className="relative w-full overflow-hidden border-t border-[#7DBBFF]/12 bg-white"
      style={{ height: "10vh", minHeight: 64 }}
    >
      {/* Top glow line */}
      <div className="absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-[#0066FF]/25 to-transparent" />

      {/* Edge fade masks */}
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-linear-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-linear-to-l from-white to-transparent" />

      {/* Marquee track */}
      <div className="flex h-full items-center overflow-hidden">
        <div
          className="flex shrink-0 items-center gap-0 will-change-transform"
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
                className="flex shrink-0 items-center gap-3 px-7"
              >
                {/* Icon pill */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#7DBBFF]/20 bg-[#F0F6FF]">
                  <Icon size={18} className="text-[#0066FF]" />
                </div>

                {/* Text */}
                <div className="flex items-baseline gap-1.5">
                  <span className="text-lg font-black leading-none text-gray-900">
                    {s.value}
                  </span>
                  <span className="text-md font-medium text-gray-400">
                    {s.label}
                  </span>
                </div>

                {/* Divider dot */}
                <span className="ml-4 h-1 w-1 rounded-full bg-[#7DBBFF]/40" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-linear-to-r from-transparent via-[#7DBBFF]/15 to-transparent" />

      <style>{`
        @keyframes statsMarquee {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(-100% / 3)); }
        }
      `}</style>
    </section>
  );
}