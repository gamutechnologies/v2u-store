import { NextResponse } from "next/server";
import { readDB } from "@/lib/storage/db";
import { signToken } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();
    const users = readDB("users");

    const user = users.find(
      (u: any) => u.username === username && u.password === password,
    );

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 },
      );
    }

    const token = signToken({ username });

    return NextResponse.json({ token, username });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
