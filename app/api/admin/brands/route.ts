import { NextResponse } from "next/server";
import { readDB, writeDB, generateId } from "@/lib/storage/db";

export async function GET() {
  return NextResponse.json(readDB("brands"));
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const brands = readDB("brands");
    const newBrand = {
      id: generateId("brands", "BRD"),
      name: data.name,
      image: data.image || "",
    };
    brands.push(newBrand);
    writeDB("brands", brands);
    return NextResponse.json(newBrand);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
