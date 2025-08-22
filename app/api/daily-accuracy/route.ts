import { NextRequest, NextResponse } from "next/server";
import { getDailyAccuracy } from "@/actions/learn-action";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const user_id = searchParams.get("user_id");
    const days = searchParams.get("days") || "5";

    if (!user_id) {
      return NextResponse.json(
        { error: "Missing user_id parameter" },
        { status: 400 }
      );
    }

    const dailyAccuracy = await getDailyAccuracy(
      parseInt(user_id),
      parseInt(days)
    );

    return NextResponse.json({
      success: true,
      data: dailyAccuracy,
    });
  } catch (error) {
    console.error("Error fetching daily accuracy:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
