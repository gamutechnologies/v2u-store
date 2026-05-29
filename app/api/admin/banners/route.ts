import { NextResponse } from "next/server";
import { readDB, writeDB, generateId } from "@/lib/storage/db";

export async function GET() {
  return NextResponse.json(readDB("banners"));
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const banners = readDB("banners");
    const newBanner = {
      id: generateId("banners", "BAN"),
      title: data.title || "",
      image: data.image || "",
      link: data.link || "",
      active: data.active ?? true,
    };
    banners.push(newBanner);
    writeDB("banners", banners);
    return NextResponse.json(newBanner);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
