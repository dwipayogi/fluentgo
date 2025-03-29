"use server";
import { revalidatePath } from "next/cache";
import sql from "@/lib/db";

export async function getUserPoint(userId: number) {
  const result = await sql`SELECT * FROM users WHERE id = ${userId}`;
  return result.length > 0 ? result[0] : null;
}

export async function updateUserListeningPoints(
  id: number,
  points: number,
  updated_at: Date
) {
  await sql`UPDATE users SET listening_point = listening_point + ${points}, updated_at = ${updated_at} WHERE id = ${id}`;
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/learning");
}

export async function updateUserSpeakingPoints(
  id: number,
  points: number,
  updated_at: Date
) {
  await sql`UPDATE users SET speaking_point = speaking_point + ${points}, updated_at = ${updated_at} WHERE id = ${id}`;
  revalidatePath("/dashboard");
  revalidatePath("/dashboard/learning");
}

export async function getTopUsersByTotal() {
  const result =
    await sql`SELECT * FROM users ORDER BY (speaking_point + listening_point) DESC LIMIT 10`;
  return result;
}

export async function getTopUsersBySpeaking() {
  const result =
    await sql`SELECT * FROM users ORDER BY speaking_point DESC LIMIT 10`;
  return result;
}

export async function getTopUsersByListening() {
  const result =
    await sql`SELECT * FROM users ORDER BY listening_point DESC LIMIT 10`;
  return result;
}
