import { cookies } from "next/headers";
import { jwtVerify } from "jose";
import jwt from "jsonwebtoken";

export function getUserFromCookie(): {
  id: string;
  username: string;
  email: string;
} | null {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
      username: string;
      email: string;
    };
    return decoded;
  } catch (err) {
    return null;
  }
}

export async function verifyJWT(token: string) {
  if (!token) return null;
  
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);
  try {
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (err) {
    console.error("JWT verification failed:", err);
    return null;
  }
}
