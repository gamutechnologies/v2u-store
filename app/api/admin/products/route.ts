import { NextResponse } from "next/server";
import { readDB, writeDB, generateId } from "@/lib/storage/db";

const normalizePrice = (value: unknown) => {
  if (typeof value === "number") {
    return `$${value.toFixed(2)}`;
  }
  if (typeof value === "string" && value.trim()) {
    return value;
  }
  return "$0.00";
};

const ensureColorOptions = (payload: any) => {
  if (Array.isArray(payload.colorOptions) && payload.colorOptions.length > 0) {
    return payload.colorOptions;
  }

  if (Array.isArray(payload.images) && payload.images.length > 0) {
    return payload.images.map((image: string, index: number) => ({
      label: `Image ${index + 1}`,
      swatch: "#E5E7EB",
      image,
    }));
  }

  return [
    {
      label: "Default",
      swatch: "#E5E7EB",
      image: "/images/products/phone.png",
    },
  ];
};

const resolveBrand = (payload: any, brands: any[]) => {
  if (payload.brand) {
    return { brand: payload.brand, brandId: payload.brandId || "" };
  }
  const match = brands.find((b) => b.id === payload.brandId);
  return {
    brand: match?.name || "",
    brandId: match?.id || payload.brandId || "",
  };
};

const resolveCategory = (payload: any, categories: any[]) => {
  if (payload.category) {
    return { category: payload.category, categoryId: payload.categoryId || "" };
  }
  const match = categories.find((c) => c.id === payload.categoryId);
  return {
    category: match?.name || "",
    categoryId: match?.id || payload.categoryId || "",
  };
};

const nextProductId = (items: any[]) => {
  const numericIds = items
    .map((item) => (typeof item.id === "number" ? item.id : null))
    .filter((value) => typeof value === "number") as number[];
  if (numericIds.length > 0) {
    return Math.max(...numericIds) + 1;
  }
  return generateId("products", "PRD");
};

export async function GET() {
  return NextResponse.json(readDB("products"));
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const products = readDB("products");
    const brands = readDB("brands");
    const categories = readDB("categories");

    const newProduct = {
      id: nextProductId(products),
      name: data.name,
      description: data.description || "",
      badge: data.badge || "",
      status: data.status || "In Stock",
      originalPrice: normalizePrice(data.originalPrice),
      salePrice: normalizePrice(data.salePrice || data.originalPrice),
      rating: typeof data.rating === "number" ? data.rating : 0,
      reviewCount: typeof data.reviewCount === "number" ? data.reviewCount : 0,
      featured: Boolean(data.featured),
      images: Array.isArray(data.images) ? data.images : [],
      variants: Array.isArray(data.variants) ? data.variants : [],
      storageOptions: Array.isArray(data.storageOptions)
        ? data.storageOptions
        : [],
      specifications: Array.isArray(data.specifications)
        ? data.specifications
        : [],
      colorOptions: [],
      ...resolveBrand(data, brands),
      ...resolveCategory(data, categories),
    };

    newProduct.colorOptions = ensureColorOptions({
      ...data,
      images: newProduct.images,
    });

    products.push(newProduct);
    writeDB("products", products);
    return NextResponse.json(newProduct);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
