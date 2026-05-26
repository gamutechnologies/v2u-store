"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";

export default function PaginationSection({
  currentPage,
  totalPages,
  setCurrentPage,
}: {
  currentPage: number;
  totalPages: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="flex items-center justify-center gap-2 py-10"
    >
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        className="group flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all hover:border-[#0066FF] hover:text-[#0066FF] active:scale-95 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
      >
        <ChevronLeft
          size={18}
          className="transition-transform group-hover:-translate-x-0.5"
        />
      </button>

      {pages.map((n) => (
        <button
          key={`page-${n}`}
          onClick={() => setCurrentPage(n)}
          className={`flex h-10 w-10 items-center justify-center rounded-xl border text-[15px] font-medium transition-all active:scale-95 ${
            n === currentPage
              ? "border-[#0066FF] bg-[#0066FF] text-white shadow-[0_4px_14px_rgba(0,102,255,0.3)]"
              : "border-gray-200 bg-white text-gray-600 hover:border-[#0066FF] hover:text-[#0066FF] shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
          }`}
        >
          {n}
        </button>
      ))}

      <button
        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
        className="group flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white transition-all hover:border-[#0066FF] hover:text-[#0066FF] active:scale-95 shadow-[0_2px_10px_rgba(0,0,0,0.02)]"
      >
        <ChevronRight
          size={18}
          className="transition-transform group-hover:translate-x-0.5"
        />
      </button>
    </motion.div>
  );
}
