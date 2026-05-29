import { NextResponse } from "next/server";
import { readDB, writeDB, generateId } from "@/lib/storage/db";

export async function GET() {
  return NextResponse.json(readDB("orders"));
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const items = readDB("orders");
    const newItem = {
      id: generateId("orders", "ORD"),
      ...data,
      date: new Date().toISOString(),
    };
    items.push(newItem);
    writeDB("orders", items);
    return NextResponse.json(newItem);
  } catch (error) {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
