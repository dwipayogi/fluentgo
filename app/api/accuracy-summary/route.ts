import { NextRequest, NextResponse } from "next/server";
import sql from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");

    if (!user_id) {
      return NextResponse.json(
        { error: "Missing user_id parameter" },
        { status: 400 }
      );
    }

    // Get today's date
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayEnd = new Date(today);
    todayEnd.setHours(23, 59, 59, 999);

    // Get start of current week (Monday)
    const now = new Date();
    const dayOfWeek = now.getDay();
    const diff = now.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust when day is Sunday
    const monday = new Date(now.setDate(diff));
    monday.setHours(0, 0, 0, 0);

    // Get today's accuracy
    const todayResult = await sql`
      SELECT 
        COALESCE(ROUND(AVG(accuracy::numeric), 0), 0) as today_accuracy,
        COUNT(*) as today_questions
      FROM user_answers 
      WHERE user_id = ${parseInt(user_id)}
        AND created_at >= ${today.toISOString()}
        AND created_at <= ${todayEnd.toISOString()}
    `;

    // Get this week's accuracy
    const weeklyResult = await sql`
      SELECT 
        COALESCE(ROUND(AVG(accuracy::numeric), 0), 0) as weekly_accuracy,
        COUNT(*) as weekly_questions
      FROM user_answers 
      WHERE user_id = ${parseInt(user_id)}
        AND created_at >= ${monday.toISOString()}
    `;

    const summary = {
      today_accuracy: todayResult[0]?.today_accuracy || 0,
      today_questions: todayResult[0]?.today_questions || 0,
      weekly_accuracy: weeklyResult[0]?.weekly_accuracy || 0,
      weekly_questions: weeklyResult[0]?.weekly_questions || 0,
    };

    return NextResponse.json({
      success: true,
      data: summary,
    });
  } catch (error) {
    console.error("Error fetching accuracy summary:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
