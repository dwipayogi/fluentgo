"use server";
import { revalidatePath } from "next/cache";
import sql from "@/lib/db";
import { validateEmail, validateUsername, validatePassword, sanitizeInput } from "@/lib/settings-utils";
import bcrypt from "bcryptjs";

export async function getUserPoint(userId: number) {
  const result = await sql`SELECT * FROM users WHERE id = ${userId}`;
  return result[0];
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

export async function updateUserProfile(
  userId: number,
  username: string,
  email: string
) {
  try {
    // Sanitize inputs
    const cleanUsername = sanitizeInput(username);
    const cleanEmail = sanitizeInput(email);

    // Validate inputs
    if (!validateUsername(cleanUsername)) {
      return { success: false, error: "Username must be 3-30 characters long and contain only letters, numbers, and underscores" };
    }

    if (!validateEmail(cleanEmail)) {
      return { success: false, error: "Please enter a valid email address" };
    }

    // Check if username already exists for other users
    const usernameCheck = await sql`
      SELECT id FROM users WHERE username = ${cleanUsername} AND id != ${userId}
    `;
    if (usernameCheck.length > 0) {
      return { success: false, error: "Username already exists" };
    }

    // Check if email already exists for other users
    const emailCheck = await sql`
      SELECT id FROM users WHERE email = ${cleanEmail} AND id != ${userId}
    `;
    if (emailCheck.length > 0) {
      return { success: false, error: "Email already exists" };
    }

    await sql`
      UPDATE users 
      SET username = ${cleanUsername}, email = ${cleanEmail}, updated_at = ${new Date()}
      WHERE id = ${userId}
    `;

    revalidatePath("/dashboard/settings");
    return { success: true, message: "Profile updated successfully" };
  } catch (error) {
    console.error("Error updating profile:", error);
    return { success: false, error: "Failed to update profile" };
  }
}

export async function updateUserPassword(
  userId: number,
  currentPassword: string,
  newPassword: string
) {
  try {
    // Validate new password
    const passwordValidation = validatePassword(newPassword);
    if (!passwordValidation.isValid) {
      return { success: false, error: passwordValidation.errors.join(", ") };
    }
    
    // Get current password hash
    const userResult = await sql`
      SELECT password FROM users WHERE id = ${userId}
    `;
    
    if (userResult.length === 0) {
      return { success: false, error: "User not found" };
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(currentPassword, userResult[0].password);
    if (!isValidPassword) {
      return { success: false, error: "Current password is incorrect" };
    }

    // Hash new password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await sql`
      UPDATE users 
      SET password = ${hashedPassword}, updated_at = ${new Date()}
      WHERE id = ${userId}
    `;

    revalidatePath("/dashboard/settings");
    return { success: true, message: "Password updated successfully" };
  } catch (error) {
    console.error("Error updating password:", error);
    return { success: false, error: "Failed to update password" };
  }
}

export async function deleteUserAccount(userId: number) {
  try {
    // Delete user answers first (foreign key constraint)
    await sql`DELETE FROM user_answers WHERE user_id = ${userId}`;
    
    // Delete user rooms
    await sql`DELETE FROM rooms WHERE user_id = ${userId}`;
    
    // Delete user account
    await sql`DELETE FROM users WHERE id = ${userId}`;

    return { success: true, message: "Account deleted successfully" };
  } catch (error) {
    console.error("Error deleting account:", error);
    return { success: false, error: "Failed to delete account" };
  }
}

export async function getUserById(userId: number) {
  try {
    const result = await sql`
      SELECT id, username, email, listening_point, speaking_point, created_at, updated_at 
      FROM users WHERE id = ${userId}
    `;
    
    if (result.length === 0) {
      return { success: false, error: "User not found" };
    }
    
    return { success: true, user: result[0] };
  } catch (error) {
    console.error("Error fetching user:", error);
    return { success: false, error: "Failed to fetch user data" };
  }
}

export async function exportUserData(userId: number) {
  try {
    // Get user profile
    const userResult = await sql`
      SELECT id, username, email, listening_point, speaking_point, created_at, updated_at 
      FROM users WHERE id = ${userId}
    `;

    if (userResult.length === 0) {
      return { success: false, error: "User not found" };
    }

    // Get user answers history
    const answersResult = await sql`
      SELECT ua.*, q.text as question_text, q.number as question_number,
             d.name as difficulty_name, c.name as category_name
      FROM user_answers ua
      JOIN questions q ON ua.question_id = q.id
      JOIN difficulties d ON q.difficulty_id = d.id
      JOIN categories c ON q.cat_id = c.id
      WHERE ua.user_id = ${userId}
      ORDER BY ua.created_at DESC
    `;

    // Get user rooms
    const roomsResult = await sql`
      SELECT id, name, description, created_at, started_at, ended_at
      FROM rooms WHERE user_id = ${userId}
      ORDER BY created_at DESC
    `;

    const exportData = {
      profile: userResult[0],
      answers: answersResult,
      rooms: roomsResult,
      exportDate: new Date().toISOString(),
      totalAnswers: answersResult.length,
      totalRooms: roomsResult.length,
      averageAccuracy: answersResult.length > 0 
        ? answersResult.reduce((sum, answer) => sum + answer.accuracy, 0) / answersResult.length 
        : 0
    };

    return { success: true, data: exportData };
  } catch (error) {
    console.error("Error exporting user data:", error);
    return { success: false, error: "Failed to export user data" };
  }
}
