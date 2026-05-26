"use client";

import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

export default function FilterSidebarSection() {
  const categories = [
    "Laptops",
    "Smartphones",
    "Gaming",
    "Audio",
    "Tablets",
    "Wearables",
  ];
  const brands = ["Apple", "Samsung", "Sony", "Dell", "Asus", "HP"];
  const prices = ["Under $100", "$100 - $500", "$500 - $1,000", "Over $1,000"];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-full flex-col gap-6 rounded-[32px] border border-[#7DBBFF]/20 bg-white/70 p-6 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,102,255,0.05)]"
    >
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">Filters</h3>
        <button className="text-sm font-medium text-[#0066FF] hover:underline">
          Clear All
        </button>
      </div>

      {/* Categories */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between cursor-pointer group">
          <p className="font-semibold text-gray-900 transition-colors group-hover:text-[#0066FF]">
            Category
          </p>
          <ChevronDown
            size={16}
            className="text-gray-400 group-hover:text-[#0066FF] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2 mt-1">
          {categories.map((item, i) => (
            <label
              key={item}
              className="group flex items-center gap-3 cursor-pointer"
            >
              <div className="relative flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-white transition-all group-hover:border-[#0066FF] focus-within:ring-2 focus-within:ring-[#0066FF]/20">
                <input
                  type="checkbox"
                  className="peer absolute opacity-0"
                  defaultChecked={i === 0 || i === 1}
                />
                <div className="pointer-events-none opacity-0 transition-opacity peer-checked:opacity-100 absolute inset-0 rounded-md bg-[#0066FF] flex items-center justify-center">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </div>
              </div>
              <span className="text-[15px] text-gray-600 transition-colors group-hover:text-gray-900 group-has-checked:font-medium group-has-checked:text-[#0066FF]">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-gray-100" />

      {/* Brands */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between cursor-pointer group">
          <p className="font-semibold text-gray-900 transition-colors group-hover:text-[#0066FF]">
            Brand
          </p>
          <ChevronDown
            size={16}
            className="text-gray-400 group-hover:text-[#0066FF] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2 mt-1">
          {brands.map((item, i) => (
            <label
              key={item}
              className="group flex items-center gap-3 cursor-pointer"
            >
              <div className="relative flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-white transition-all group-hover:border-[#0066FF] focus-within:ring-2 focus-within:ring-[#0066FF]/20">
                <input
                  type="checkbox"
                  className="peer absolute opacity-0"
                  defaultChecked={i === 0}
                />
                <div className="pointer-events-none opacity-0 transition-opacity peer-checked:opacity-100 absolute inset-0 rounded-md bg-[#0066FF] flex items-center justify-center">
                  <Check size={12} className="text-white" strokeWidth={3} />
                </div>
              </div>
              <span className="text-[15px] text-gray-600 transition-colors group-hover:text-gray-900 group-has-checked:font-medium group-has-checked:text-[#0066FF]">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div className="h-px w-full bg-gray-100" />

      {/* Price */}
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between cursor-pointer group">
          <p className="font-semibold text-gray-900 transition-colors group-hover:text-[#0066FF]">
            Price Range
          </p>
          <ChevronDown
            size={16}
            className="text-gray-400 group-hover:text-[#0066FF] transition-colors"
          />
        </div>
        <div className="flex flex-col gap-2 mt-1">
          {prices.map((item) => (
            <label
              key={item}
              className="group flex items-center gap-3 cursor-pointer"
            >
              <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white transition-all group-hover:border-[#0066FF] focus-within:ring-2 focus-within:ring-[#0066FF]/20">
                <input
                  type="radio"
                  name="price"
                  className="peer absolute opacity-0"
                />
                <div className="pointer-events-none opacity-0 transition-opacity peer-checked:opacity-100 absolute inset-0 flex items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#0066FF]" />
                </div>
                <div className="pointer-events-none opacity-0 transition-opacity peer-checked:opacity-100 absolute inset-0 rounded-full border-2 border-[#0066FF]" />
              </div>
              <span className="text-[15px] text-gray-600 transition-colors group-hover:text-gray-900 group-has-checked:font-medium group-has-checked:text-[#0066FF]">
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
