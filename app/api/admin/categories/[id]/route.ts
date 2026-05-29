import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/storage/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedId = (await params).id;
  try {
    const data = await request.json();
    const items = readDB("categories");
    const index = items.findIndex((i: any) => i.id === resolvedId);
    if (index === -1)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    items[index] = { ...items[index], ...data };
    writeDB("categories", items);
    return NextResponse.json(items[index]);
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
    const items = readDB("categories");
    const products = readDB("products");
    const isUsed = products.some(
      (p: any) => p.categoryId === resolvedId || p.category === resolvedId,
    );
    if (isUsed) {
      return NextResponse.json(
        { error: "Cannot delete because products are using it" },
        { status: 400 },
      );
    }

    const filtered = items.filter((i: any) => i.id !== resolvedId);
    writeDB("categories", filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
