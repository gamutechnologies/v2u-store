"use client";

import { motion } from "framer-motion";
import { SlidersHorizontal, ChevronDown, LayoutGrid, List } from "lucide-react";

export default function SortingBarSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between rounded-[24px] border border-[#7DBBFF]/20 bg-white/70 px-6 py-4 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,102,255,0.05)]"
    >
      <div className="flex items-center gap-2 text-[15px] text-gray-500">
        Showing <span className="font-semibold text-gray-900">1–12</span> of{" "}
        <span className="font-semibold text-gray-900">120</span> products
      </div>

      <div className="flex items-center gap-4">
        {/* View Toggle */}
        <div className="hidden items-center gap-2 border-r border-gray-200 pr-4 md:flex">
          <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0066FF] text-white shadow-sm transition-transform hover:scale-105 active:scale-95">
            <LayoutGrid size={18} />
          </button>
          <button className="flex h-9 w-9 items-center justify-center rounded-xl bg-gray-50 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600">
            <List size={18} />
          </button>
        </div>

        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-[15px] font-medium text-gray-700">
            <SlidersHorizontal size={18} className="text-[#0066FF]" />
            <span className="hidden sm:inline">Sort by:</span>
          </div>
          <div className="relative">
            <select className="peer h-10 appearance-none rounded-xl border border-gray-200 bg-white pl-4 pr-10 text-[15px] font-medium text-gray-900 outline-none transition-all hover:border-gray-300 focus:border-[#0066FF] focus:ring-4 focus:ring-[#0066FF]/10 cursor-pointer">
              <option>Recommended</option>
              <option>Newest Arrivals</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Customer Rating</option>
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 peer-focus:text-[#0066FF]"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
