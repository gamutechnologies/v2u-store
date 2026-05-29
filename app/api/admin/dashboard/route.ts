import { NextResponse } from "next/server";
import { readDB } from "@/lib/storage/db";

export async function GET() {
  try {
    const products = readDB("products");
    const categories = readDB("categories");
    const brands = readDB("brands");
    const orders = readDB("orders");

    const parsePrice = (value: unknown) => {
      if (typeof value === "number") return value;
      if (typeof value === "string") {
        const parsed = parseFloat(value.replace(/[^0-9.]/g, ""));
        return Number.isNaN(parsed) ? 0 : parsed;
      }
      return 0;
    };

    const stats = {
      totalProducts: products.length,
      totalCategories: categories.length,
      totalBrands: brands.length,
      totalOrders: orders.length,
    };

    const recentProducts = products
      .slice(-5)
      .reverse()
      .map((product: any) => ({
        id: product.id,
        name: product.name,
        price: parsePrice(
          product.salePrice ?? product.originalPrice ?? product.price,
        ),
      }));
    const recentOrders = orders.slice(-5).reverse();

    return NextResponse.json({ stats, recentProducts, recentOrders });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
