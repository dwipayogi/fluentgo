"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sql from "@/lib/db";
import { Room } from "@/lib/types";

export async function getRooms() {
  const rooms = await sql`
  SELECT 
    rooms.id,
    rooms.name,
    rooms.password,
    rooms.description,
    rooms.started_at,
    rooms.ended_at,
    users.username AS creator_name
  FROM rooms 
  INNER JOIN users ON rooms.user_id = users.id
  ORDER BY rooms.started_at DESC`;
  return rooms;
}

export async function createRoom(data: Room) {
  const { user_id, name, description, started_at, ended_at } = data;
  await sql`INSERT INTO rooms (name, description, user_id, started_at, ended_at) VALUES (${name}, ${description}, ${user_id}, ${started_at}, ${ended_at})`;
  revalidatePath("/rooms");
  revalidatePath("/dashboard/conference");
  return redirect(`/rooms/${name}`);
}

export async function joinRoom(name: string, password?: string) {
  password = password || "";
  const room =
    await sql`SELECT * FROM rooms WHERE name = ${name} AND (password = ${password} OR password IS NULL)`;
  if (room.length === 0) {
    throw new Error("Room not found");
  } else if (room[0].password !== password && room[0].password !== null) {
    throw new Error("Incorrect password");
  }

  revalidatePath("/rooms");
  return redirect(`/rooms/${name}`);
}
