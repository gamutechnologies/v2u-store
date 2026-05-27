"use client";

import { motion } from "framer-motion";
import ProductCard from "@/components/custom/ProductCard";

const containerVariants = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export default function ProductGridSection({ products }: { products: any[] }) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid gap-3 grid-cols-2 sm:gap-4 md:grid-cols-3 lg:gap-6 lg:grid-cols-2 xl:grid-cols-3"
    >
      {products.map((product: any) => (
        <ProductCard key={product.id} {...product} />
      ))}
    </motion.div>
  );
}