"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/custom/ProductCard";
import productsData from "@/data/products.json";

export default function RelatedProductsSection({
  currentProductId,
}: {
  currentProductId: number;
}) {
  const related = productsData
    .filter((p) => p.id !== currentProductId)
    .slice(0, 4);

  if (related.length === 0) return null;

  return (
    <div className="mt-16 pb-12">
      <div className="mb-10 flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
            Related Products
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            You might also like these
          </p>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className="h-full"
          >
            {/* Map props explicitly — never spread raw JSON into a typed component */}
            <ProductCard
              id={product.id}
              brand={product.brand}
              name={product.name}
              originalPrice={product.originalPrice}
              salePrice={product.salePrice}
              badge={product.badge}
              description={product.description}
              colorOptions={product.colorOptions.map((c) => ({
                label: c.label,
                swatch: c.swatch,
                image: c.image,
              }))}
              storageOptions={product.storageOptions?.map((s) => ({
                label: s.label,
                priceSuffix: s.priceSuffix,
              }))}
              onAddToCart={(color, storage) => {
                console.log(
                  `[Cart] ${product.name} — ${color.label}${storage ? ` / ${storage.label}` : ""}`,
                );
              }}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}