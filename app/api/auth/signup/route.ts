import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();

  const hashed = await bcrypt.hash(password, 10);

  try {
    const existing = await sql`SELECT * FROM users WHERE email = ${email}`;
    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Email already registered" },
        { status: 400 }
      );
    }

    await sql`INSERT INTO users (username, email, password) VALUES (${username}, ${email}, ${hashed})`;

    return NextResponse.json({ message: "Registration successful" });
  } catch (err: any) {
    return NextResponse.json(
      { message: "Error during registration", error: err.message },
      { status: 500 }
    );
  }
}
