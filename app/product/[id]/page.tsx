import ProductOverviewSection from "./sections/ProductOverviewSection";
import ProductTabsSection from "./sections/ProductTabsSection";
import RelatedProductsSection from "./sections/RelatedProductsSection";
import productsData from "@/data/products.json";
import { notFound } from "next/navigation";

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function generateStaticParams() {
  return productsData.flatMap((product) => [
    { id: product.id.toString() },
    { id: slugify(product.name) },
  ]);
}

export default async function ProductDetailPage(props: {
  params: Promise<{ id: string }>;
}) {
  const params = await props.params;
  const product = productsData.find(
    (p) => p.id.toString() === params.id || slugify(p.name) === params.id,
  );
  if (!product) return notFound();

  return (
    <div className="relative overflow-hidden bg-[#FAFCFF] pt-28 pb-16">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] h-150 w-150 rounded-full bg-[#0066FF]/5 blur-[120px]" />
        <div className="absolute top-[40%] right-[-5%] h-125 w-125 rounded-full bg-[#7DBBFF]/10 blur-[100px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <ProductOverviewSection product={product} />
        <ProductTabsSection product={product} />
        <RelatedProductsSection currentProductId={product.id} />
      </div>
    </div>
  );
}
