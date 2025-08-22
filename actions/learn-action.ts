"use server";

import sql from "@/lib/db";

export async function getNextUnansweredQuestion(
  userId: number,
  type: "listening" | "speaking"
) {
  try {
    const result = await sql`
      SELECT q.*, d.name AS difficulty 
      FROM questions q
      INNER JOIN categories c ON q.cat_id = c.id
      INNER JOIN difficulties d ON q.difficulty_id = d.id
      WHERE c.name = ${type}
      AND NOT EXISTS (
        SELECT 1 FROM user_answers ua
        WHERE ua.question_id = q.id AND ua.user_id = ${userId}
      )
      ORDER BY q.number ASC
      LIMIT 1
    `;

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error fetching next unanswered question:", error);
    throw new Error("Failed to fetch next question");
  }
}

export async function getUserAnsweredQuestions(
  userId: number,
  type: "listening" | "speaking"
) {
  try {
    const result = await sql`
      SELECT DISTINCT ua.question_id 
      FROM user_answers ua
      INNER JOIN questions q ON ua.question_id = q.id
      INNER JOIN categories c ON q.cat_id = c.id
      WHERE ua.user_id = ${userId}
      AND c.name = ${type}
    `;

    return result.map((row) => row.question_id);
  } catch (error) {
    console.error("Error fetching user answered questions:", error);
    throw new Error("Failed to fetch answered questions");
  }
}

export async function getUserQuestionHistory(
  userId: number,
  limit: number = 5
) {
  try {
    const result = await sql`
      SELECT 
        ua.id,
        ua.question_id,
        q.text AS question_text,
        ua.accuracy,
        ua.point,
        ua.created_at,
        c.name AS category_name,
        d.name AS difficulty_name
      FROM user_answers ua
      INNER JOIN questions q ON ua.question_id = q.id
      INNER JOIN categories c ON q.cat_id = c.id
      INNER JOIN difficulties d ON q.difficulty_id = d.id
      WHERE ua.user_id = ${userId}
      ORDER BY ua.created_at DESC
      LIMIT ${limit}
    `;

    return result;
  } catch (error) {
    console.error("Error fetching user question history:", error);
    throw new Error("Failed to fetch question history");
  }
}

export async function getQuestionByNumber(
  type: "listening" | "speaking",
  number: number
) {
  try {
    const result = await sql`
      SELECT q.*, d.name AS difficulty
      FROM questions q
      INNER JOIN categories c ON q.cat_id = c.id
      INNER JOIN difficulties d ON q.difficulty_id = d.id
      WHERE c.name = ${type}
      AND q.number = ${number}
      LIMIT 1
    `;

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("Error fetching question by number:", error);
    throw new Error("Failed to fetch question by number");
  }
}

export async function getTotalQuestions(type: "listening" | "speaking") {
  try {
    const result = await sql`
      SELECT COUNT(*) AS total
      FROM questions q
      INNER JOIN categories c ON q.cat_id = c.id
      WHERE c.name = ${type}
    `;

    // sql library may return count as string/BigInt depending on driver
    const total = result[0]?.total ?? 0;
    return Number(total);
  } catch (error) {
    console.error("Error fetching total questions:", error);
    throw new Error("Failed to fetch total questions");
  }
}

export async function getQuestionPosition(
  type: "listening" | "speaking",
  number: number
) {
  try {
    const result = await sql`
      SELECT COUNT(*) AS position
      FROM questions q
      INNER JOIN categories c ON q.cat_id = c.id
      WHERE c.name = ${type}
      AND q.number <= ${number}
    `;

    const position = result[0]?.position ?? 0;
    // convert to zero-based index
    return Math.max(0, Number(position) - 1);
  } catch (error) {
    console.error("Error fetching question position:", error);
    throw new Error("Failed to fetch question position");
  }
}

export async function saveUserAnswer(
  userId: number,
  questionId: number,
  accuracy: number,
  point: number
) {
  try {
    // Check if user already answered this question
    const existingAnswer = await sql`
      SELECT id FROM user_answers 
      WHERE user_id = ${userId} AND question_id = ${questionId}
    `;

    if (existingAnswer.length > 0) {
      throw new Error("User has already answered this question");
    }

    // Insert the answer
    const result = await sql`
      INSERT INTO user_answers (user_id, question_id, accuracy, point)
      VALUES (${userId}, ${questionId}, ${accuracy}, ${point})
      RETURNING *
    `;

    return result[0];
  } catch (error) {
    console.error("Error saving user answer:", error);
    throw new Error("Failed to save user answer");
  }
}
