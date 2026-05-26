"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ProductTabsSection({ product }: { product: any }) {
  const [activeTab, setActiveTab] = useState("description");

  const tabs = [
    { id: "description", label: "Description" },
    { id: "specifications", label: "Specifications" },
    { id: "reviews", label: `Reviews (${product.reviewCount})` },
  ];

  return (
    <div className="mt-24">
      <div className="flex border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`relative pb-4 pl-1 pr-6 text-lg font-semibold transition-colors md:px-8 ${
              activeTab === tab.id
                ? "text-[#0066FF]"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute -bottom-px left-0 right-0 h-0.5 bg-[#0066FF]"
              />
            )}
          </button>
        ))}
      </div>

      <div className="relative min-h-75 py-10">
        <AnimatePresence mode="wait">
          {activeTab === "description" && (
            <motion.div
              key="description"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="text-gray-600 prose max-w-none"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {product.name} Overview
              </h3>
              <p className="mb-6">{product.description}</p>
            </motion.div>
          )}

          {activeTab === "specifications" && (
            <motion.div
              key="specifications"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="rounded-3xl border border-gray-100 bg-white p-8 max-w-3xl"
            >
              <table className="w-full text-sm">
                <tbody>
                  {product.specifications?.map((row: any, i: number) => (
                    <tr
                      key={i}
                      className="border-b border-gray-100 last:border-0"
                    >
                      <td className="py-4 font-semibold text-gray-900 w-1/3">
                        {row.label}
                      </td>
                      <td className="py-4 text-gray-600">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </motion.div>
          )}

          {activeTab === "reviews" && (
            <motion.div
              key="reviews"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              Reviews placeholder
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
