"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import productsData from "@/data/products.json";

import ShopHeroSection from "@/app/shop/sections/ShopHeroSection";
import SortingBarSection from "@/app/shop/sections/SortingBarSection";
import ProductGridSection from "@/app/shop/sections/ProductGridSection";
import PaginationSection from "@/app/shop/sections/PaginationSection";
import FilterSidebarSection from "./sections/FilterSidebarSection";

/* ─── helpers (stable, defined at module level) ──────────────────────────── */

const parsePrice = (value: string | number | undefined): number => {
  if (typeof value === "number") return value;
  if (!value) return 0;
  const parsed = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isNaN(parsed) ? 0 : parsed;
};

const getCreatedTime = (value: string | number | undefined): number => {
  if (!value) return 0;
  if (typeof value === "number") return value;
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? parsePrice(value) : parsed;
};

/* ─── price ranges (static, defined at module level) ─────────────────────── */

type PriceRange = { id: string; label: string; min: number; max?: number };

const PRICE_RANGES: PriceRange[] = [
  { id: "under-100",  label: "Under $100",    min: 0,    max: 100  },
  { id: "100-300",    label: "$100 - $300",   min: 100,  max: 300  },
  { id: "300-600",    label: "$300 - $600",   min: 300,  max: 600  },
  { id: "600-1000",   label: "$600 - $1000",  min: 600,  max: 1000 },
  { id: "1000-plus",  label: "$1000+",        min: 1000            },
];

const PRODUCTS_PER_PAGE = 6;

/* ─── page ───────────────────────────────────────────────────────────────── */

export default function ShopPage() {
  const [currentPage,          setCurrentPage]          = useState(1);
  const [selectedCategories,   setSelectedCategories]   = useState<string[]>([]);
  const [selectedBrands,       setSelectedBrands]       = useState<string[]>([]);
  const [selectedPriceRangeId, setSelectedPriceRangeId] = useState<string | null>(null);
  const [sortBy,               setSortBy]               = useState("recommended");

  /* derived: unique categories & brands */
  const categories = useMemo(() => {
    const unique = new Set<string>();
    productsData.forEach((p: any) => { if (p.category) unique.add(p.category); });
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, []);

  const brands = useMemo(() => {
    const unique = new Set<string>();
    productsData.forEach((p: any) => { if (p.brand) unique.add(p.brand); });
    return Array.from(unique).sort((a, b) => a.localeCompare(b));
  }, []);

  /* filtered + sorted products */
  const filteredProducts = useMemo(() => {
    const activeRange = PRICE_RANGES.find((r) => r.id === selectedPriceRangeId);

    const filtered = (productsData as any[]).filter((product) => {
      const category   = product.category ?? "Uncategorized";
      const brand      = product.brand    ?? "Other";
      const price      = parsePrice(product.salePrice ?? product.originalPrice);

      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(category);
      const matchesBrand    = selectedBrands.length    === 0 || selectedBrands.includes(brand);
      const matchesPrice    =
        !activeRange ||
        (price >= activeRange.min && (activeRange.max !== undefined ? price <= activeRange.max : true));

      return matchesCategory && matchesBrand && matchesPrice;
    });

    if (sortBy === "recommended") return filtered;

    return [...filtered].sort((a: any, b: any) => {
      const priceA = parsePrice(a.salePrice ?? a.originalPrice);
      const priceB = parsePrice(b.salePrice ?? b.originalPrice);

      switch (sortBy) {
        case "price-asc":  return priceA - priceB;
        case "price-desc": return priceB - priceA;
        case "rating":     return (b.rating ?? 0) - (a.rating ?? 0);
        case "newest":
          return (
            getCreatedTime(b.createdAt ?? b.id) -
            getCreatedTime(a.createdAt ?? a.id)
          );
        default: return 0;
      }
    });
  }, [selectedCategories, selectedBrands, selectedPriceRangeId, sortBy]);

  /* reset to page 1 whenever filters / sort change */
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategories, selectedBrands, selectedPriceRangeId, sortBy]);

  /* pagination */
  const totalPages    = Math.max(1, Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE));
  const activePage    = Math.min(currentPage, totalPages);
  const startIndex    = (activePage - 1) * PRODUCTS_PER_PAGE;
  const currentProducts = filteredProducts.slice(startIndex, startIndex + PRODUCTS_PER_PAGE);
  const showingStart  = filteredProducts.length === 0 ? 0 : startIndex + 1;
  const showingEnd    = filteredProducts.length === 0 ? 0 : Math.min(startIndex + PRODUCTS_PER_PAGE, filteredProducts.length);

  /* stable callbacks */
  const handleToggleCategory = useCallback((value: string) => {
    setSelectedCategories((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  }, []);

  const handleToggleBrand = useCallback((value: string) => {
    setSelectedBrands((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value],
    );
  }, []);

  const handleClear = useCallback(() => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedPriceRangeId(null);
  }, []);

  return (
    <div className="relative overflow-hidden bg-[#FAFCFF]">
      {/* Decorative ambient background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] h-200 w-200 rounded-full bg-[#0066FF]/5 blur-[120px]" />
        <div className="absolute top-[40%] right-[-10%] h-150 w-150 rounded-full bg-[#7DBBFF]/10 blur-[100px]" />
      </div>

      <div className="relative z-10">
        <ShopHeroSection />

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-8">
          <SortingBarSection
            start={showingStart}
            end={showingEnd}
            total={filteredProducts.length}
            sortBy={sortBy}
            onSortChange={setSortBy}
          />

          <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-[280px_1fr] items-start">
            {/* Sidebar — desktop only */}
            <div className="hidden lg:block sticky top-32">
              <FilterSidebarSection
                categories={categories}
                brands={brands}
                priceRanges={PRICE_RANGES}
                selectedCategories={selectedCategories}
                selectedBrands={selectedBrands}
                selectedPriceRangeId={selectedPriceRangeId}
                onToggleCategory={handleToggleCategory}
                onToggleBrand={handleToggleBrand}
                onSelectPriceRange={setSelectedPriceRangeId}
                onClear={handleClear}
              />
            </div>

            {/* Product grid + pagination */}
            <div className="flex flex-col gap-12">
              <ProductGridSection products={currentProducts} />
              <PaginationSection
                currentPage={activePage}
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