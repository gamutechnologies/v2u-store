"use client";

import { useState } from "react";
import productsData from "@/data/products.json";

import ShopHeroSection from "@/app/shop/sections/ShopHeroSection";
import SortingBarSection from "@/app/shop/sections/SortingBarSection";
import ProductGridSection from "@/app/shop/sections/ProductGridSection";
import PaginationSection from "@/app/shop/sections/PaginationSection";
import FilterSidebarSection from "./sections/FilterSidebarSection";

export default function ShopPage() {
  const PRODUCTS_PER_PAGE = 6;

  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(productsData.length / PRODUCTS_PER_PAGE);

  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;

  const currentProducts = productsData.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE,
  );

  return (
    <div className="relative overflow-hidden bg-[#FAFCFF]">
      {/* Decorative ambient background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-200 w-200 rounded-full bg-[#0066FF]/5 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] h-150 w-150 rounded-full bg-[#7DBBFF]/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <ShopHeroSection />

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-8">
          <SortingBarSection />

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] items-start">
            <div className="hidden lg:block sticky top-32">
              <FilterSidebarSection />
            </div>
            <div className="flex flex-col gap-12">
              <ProductGridSection products={currentProducts} />

              <PaginationSection
                currentPage={currentPage}
                totalPages={totalPages}
                setCurrentPage={setCurrentPage}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
