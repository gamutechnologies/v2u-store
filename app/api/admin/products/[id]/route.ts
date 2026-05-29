import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/storage/db";

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

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedId = (await params).id;
  try {
    const data = await request.json();
    const products = readDB("products");
    const brands = readDB("brands");
    const categories = readDB("categories");
    const index = products.findIndex(
      (item: any) => item.id.toString() === resolvedId,
    );
    if (index === -1)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    const updated = {
      ...products[index],
      ...data,
      originalPrice: normalizePrice(
        data.originalPrice ?? products[index].originalPrice,
      ),
      salePrice: normalizePrice(data.salePrice ?? products[index].salePrice),
      rating:
        typeof data.rating === "number"
          ? data.rating
          : (products[index].rating ?? 0),
      reviewCount:
        typeof data.reviewCount === "number"
          ? data.reviewCount
          : (products[index].reviewCount ?? 0),
      featured: data.featured ?? products[index].featured ?? false,
      images: Array.isArray(data.images)
        ? data.images
        : (products[index].images ?? []),
      variants: Array.isArray(data.variants)
        ? data.variants
        : (products[index].variants ?? []),
      storageOptions: Array.isArray(data.storageOptions)
        ? data.storageOptions
        : (products[index].storageOptions ?? []),
      specifications: Array.isArray(data.specifications)
        ? data.specifications
        : (products[index].specifications ?? []),
      ...resolveBrand({ ...products[index], ...data }, brands),
      ...resolveCategory({ ...products[index], ...data }, categories),
    };

    updated.colorOptions = ensureColorOptions({
      ...updated,
      images: updated.images,
    });

    products[index] = updated;
    writeDB("products", products);
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedId = (await params).id;
  try {
    const products = readDB("products");
    const filtered = products.filter(
      (item: any) => item.id.toString() !== resolvedId,
    );
    writeDB("products", filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
