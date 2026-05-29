import { NextResponse } from "next/server";
import { readDB, writeDB, generateId } from "@/lib/storage/db";

export async function GET() {
  return NextResponse.json(readDB("categories"));
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const categories = readDB("categories");
    const newCategory = {
      id: generateId("categories", "CAT"),
      name: data.name,
      image: data.image || "",
    };
    categories.push(newCategory);
    writeDB("categories", categories);
    return NextResponse.json(newCategory);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
