"use client";

import { motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

type PriceRange = {
  id: string;
  label: string;
  min: number;
  max?: number;
};

export default function FilterSidebarSection({
  categories,
  brands,
  priceRanges,
  selectedCategories,
  selectedBrands,
  selectedPriceRangeId,
  onToggleCategory,
  onToggleBrand,
  onSelectPriceRange,
  onClear,
}: {
  categories: string[];
  brands: string[];
  priceRanges: PriceRange[];
  selectedCategories: string[];
  selectedBrands: string[];
  selectedPriceRangeId: string | null;
  onToggleCategory: (value: string) => void;
  onToggleBrand: (value: string) => void;
  onSelectPriceRange: (value: string | null) => void;
  onClear: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="flex w-full flex-col gap-6 rounded-[32px] border border-[#7DBBFF]/20 bg-white/70 p-6 backdrop-blur-2xl shadow-[0_4px_24px_rgba(0,102,255,0.05)]"
    >
      <div className="flex items-center justify-between pb-4 border-b border-gray-100">
        <h3 className="text-xl font-bold text-gray-900">Filters</h3>
        <button
          onClick={onClear}
          className="text-sm font-medium text-[#0066FF] hover:underline"
        >
          Clear All
        </button>
      </div>

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
          {categories.map((item) => (
            <label
              key={item}
              className="group flex items-center gap-3 cursor-pointer"
            >
              <div className="relative flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-white transition-all group-hover:border-[#0066FF] focus-within:ring-2 focus-within:ring-[#0066FF]/20">
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(item)}
                  onChange={() => onToggleCategory(item)}
                  className="peer absolute opacity-0"
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
          {brands.map((item) => (
            <label
              key={item}
              className="group flex items-center gap-3 cursor-pointer"
            >
              <div className="relative flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-white transition-all group-hover:border-[#0066FF] focus-within:ring-2 focus-within:ring-[#0066FF]/20">
                <input
                  type="checkbox"
                  checked={selectedBrands.includes(item)}
                  onChange={() => onToggleBrand(item)}
                  className="peer absolute opacity-0"
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
          {priceRanges.map((item) => (
            <label
              key={item.id}
              className="group flex items-center gap-3 cursor-pointer"
            >
              <div className="relative flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 bg-white transition-all group-hover:border-[#0066FF] focus-within:ring-2 focus-within:ring-[#0066FF]/20">
                <input
                  type="radio"
                  name="price"
                  checked={selectedPriceRangeId === item.id}
                  onChange={() => onSelectPriceRange(item.id)}
                  className="peer absolute opacity-0"
                />
                <div className="pointer-events-none opacity-0 transition-opacity peer-checked:opacity-100 absolute inset-0 flex items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#0066FF]" />
                </div>
                <div className="pointer-events-none opacity-0 transition-opacity peer-checked:opacity-100 absolute inset-0 rounded-full border-2 border-[#0066FF]" />
              </div>
              <span className="text-[15px] text-gray-600 transition-colors group-hover:text-gray-900 group-has-checked:font-medium group-has-checked:text-[#0066FF]">
                {item.label}
              </span>
            </label>
          ))}
          <button
            type="button"
            onClick={() => onSelectPriceRange(null)}
            className="text-left text-xs font-medium text-gray-400 hover:text-[#0066FF]"
          >
            Reset price filter
          </button>
        </div>
      </div>
    </motion.div>
  );
}
