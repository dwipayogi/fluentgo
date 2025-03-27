"use server";

import sql from "@/lib/db";
import { User } from "@/lib/types";

export async function createUser(user: User) {
  const { username, email } = user;
  const data = await sql`
    INSERT INTO users (username, email)
    VALUES (${username}, ${email})
    RETURNING *;
  `;
  return data[0];
}

export async function deleteUser(id: string) {
  const data = await sql`
    DELETE FROM users WHERE id = ${id};
  `;
}

export async function updateUser(id: string, user: User) {
  const { username, email } = user;
  const data = await sql`
    UPDATE users
    SET username = ${username}, email = ${email}
    WHERE id = ${id}
    RETURNING *;
  `;
}
