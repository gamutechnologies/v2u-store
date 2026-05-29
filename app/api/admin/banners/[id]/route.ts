import { NextResponse } from "next/server";
import { readDB, writeDB } from "@/lib/storage/db";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const resolvedId = (await params).id;
  try {
    const data = await request.json();
    const banners = readDB("banners");
    const index = banners.findIndex((b: any) => b.id === resolvedId);
    if (index === -1)
      return NextResponse.json({ error: "Not found" }, { status: 404 });

    banners[index] = { ...banners[index], ...data };
    writeDB("banners", banners);
    return NextResponse.json(banners[index]);
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
    const banners = readDB("banners");
    const filtered = banners.filter((b: any) => b.id !== resolvedId);
    writeDB("banners", filtered);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
