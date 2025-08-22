import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { user_id, question_id, accuracy, point } = body;

    // Validate required fields
    if (
      !user_id ||
      !question_id ||
      accuracy === undefined ||
      point === undefined
    ) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: user_id, question_id, accuracy, point",
        },
        { status: 400 }
      );
    }

    // Validate accuracy range
    if (accuracy < 0 || accuracy > 100) {
      return NextResponse.json(
        { error: "Accuracy must be between 0 and 100" },
        { status: 400 }
      );
    }

    // Check if user already answered this question
    const existingAnswer = await sql`
      SELECT id FROM user_answers 
      WHERE user_id = ${user_id} AND question_id = ${question_id}
    `;

    if (existingAnswer.length > 0) {
      return NextResponse.json(
        { error: "User has already answered this question" },
        { status: 409 }
      );
    }

    // Insert the answer
    const result = await sql`
      INSERT INTO user_answers (user_id, question_id, accuracy, point)
      VALUES (${user_id}, ${question_id}, ${accuracy}, ${point})
      RETURNING *
    `;

    // Get question details for response
    const questionDetails = await sql`
      SELECT 
        q.number,
        q.text as question_text,
        c.name as category_name,
        d.name as difficulty_name
      FROM questions q
      INNER JOIN categories c ON q.cat_id = c.id
      INNER JOIN difficulties d ON q.difficulty_id = d.id
      WHERE q.id = ${question_id}
    `;

    return NextResponse.json({
      success: true,
      data: {
        answer: result[0],
        question: questionDetails[0],
      },
    });
  } catch (error) {
    console.error("Error saving answer:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");
    const limit = searchParams.get("limit") || "10";

    if (!user_id) {
      return NextResponse.json(
        { error: "Missing user_id parameter" },
        { status: 400 }
      );
    }

    // Get user's answer history
    const answers = await sql`
      SELECT 
        ua.id,
        ua.question_id,
        ua.accuracy,
        ua.point,
        ua.created_at,
        q.number,
        q.text as question_text,
        c.name as category_name,
        d.name as difficulty_name
      FROM user_answers ua
      INNER JOIN questions q ON ua.question_id = q.id
      INNER JOIN categories c ON q.cat_id = c.id
      INNER JOIN difficulties d ON q.difficulty_id = d.id
      WHERE ua.user_id = ${user_id}
      ORDER BY ua.created_at DESC
      LIMIT ${parseInt(limit)}
    `;

    return NextResponse.json({
      success: true,
      data: answers,
    });
  } catch (error) {
    console.error("Error fetching answer history:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
