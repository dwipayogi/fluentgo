"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sql from "@/lib/db";
import { Room } from "@/lib/types";

export async function createRoom(data: Room) {
  const { user_id, name, description, started_at, ended_at } = data;
  await sql`INSERT INTO rooms (name, description, user_id, started_at, ended_at) VALUES (${name}, ${description}, ${user_id}, ${started_at}, ${ended_at})`;
  revalidatePath("/rooms");
  return redirect(`/rooms/${name}`);
}

export async function joinRoom(name: string, password?: string) {
  const room = await sql`SELECT * FROM rooms WHERE name = ${name} AND password = ${password}`;
  if (room.length === 0) {
    throw new Error("Room not found");
  } else if (room[0].password !== password) {
    throw new Error("Incorrect password");
  }

  revalidatePath("/rooms");
  return redirect(`/rooms/${name}`);
}