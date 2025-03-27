"use server";

import { revalidatePath } from "next/cache";
import sql from "@/lib/db";

export async function getSpeakingPoint() {
  const data = await sql`
      SELECT speaking_point FROM users
    `;
  return data;
}

export async function updateSpeakingPoint(speaking_point: string) {
  const currentPoints = await getSpeakingPoint();

  const data = await sql`
      UPDATE users
      SET speaking_point = ${currentPoints[0].speaking_point} + ${speaking_point}
      RETURNING *;
    `;
  revalidatePath("/dashboard");
  return data[0];
}

export async function getListeningPoint() {
  const data = await sql`
      SELECT listening_point FROM users
    `;
  return data;
}

export async function updateListeningPoint(listening_point: string) {
  const currentPoints = await getListeningPoint();
  const data = await sql`
      UPDATE users
      SET listening_point = ${currentPoints[0].listening_point} + ${listening_point}
      RETURNING *;
    `;
  revalidatePath("/dashboard");
  return data[0];
}

export async function getTotalPoint() {
  const listeningPoints = await getListeningPoint();
  const speakingPoints = await getSpeakingPoint();
  const totalPoint =
    parseInt(listeningPoints[0].listening_point) +
    parseInt(speakingPoints[0].speaking_point);
  return totalPoint;
}
